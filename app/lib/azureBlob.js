import { BlobServiceClient } from '@azure/storage-blob';

let blobServiceClient;
let containerName;

function initializeBlobService() {
  if (!blobServiceClient) {
    blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
  }
}

export const uploadFileToBlob = async (fileBuffer, fileName) => {
  initializeBlobService();
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.uploadData(fileBuffer);
  return blockBlobClient.url;
};

export const readFileFromBlob = async (fileName) => {
  initializeBlobService();
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  const downloadBlockBlobResponse = await blockBlobClient.download();
  const downloadedContent = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
  return downloadedContent;
};

export const deleteFromAzure = async (fileName) => {
  initializeBlobService();
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    await blockBlobClient.delete();
    console.log(`Blob ${fileName} deleted successfully`);
  } catch (error) {
    console.error(`Failed to delete blob ${fileName}`, error.message);
    throw new Error(`Failed to delete blob ${fileName}: ${error.message}`);
  }
};

const streamToBuffer = async (readableStream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data);
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
};