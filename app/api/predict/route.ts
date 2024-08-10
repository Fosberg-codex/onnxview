import { NextResponse } from 'next/server';

let readFileFromBlob;
let connectMongoDB;
let form;
let runOnnxInference;

async function importDependencies() {
  const azureBlobModule = await import('@/app/lib/azureBlob');
  const mongodbModule = await import('@/app/lib/mongodb');
  const formModel = await import('@/app/models/mlmodel');
  const onnxUtilsModule = await import('@/app/utils/onnxUtils');

  readFileFromBlob = azureBlobModule.readFileFromBlob;
  connectMongoDB = mongodbModule.connectMongoDB;
  form = formModel.default;
  runOnnxInference = onnxUtilsModule.runOnnxInference;
}

export async function POST(request: any) {
  await importDependencies();
  await connectMongoDB();

  try {
    const { formId, inputValues } = await request.json();

    const formData = await form.findById(formId);

    if (!formData) {
      return NextResponse.json({ success: false, error: 'Form not found check formId' }, { status: 404 });
    }

    if (!formData.fileName) {
      return NextResponse.json({ success: false, error: 'such file name does not exist' }, { status: 404 });
    }

    const modelBuffer = await readFileFromBlob(formData.fileName);

    const result = await runOnnxInference(modelBuffer, inputValues, formData.numberOfFeatures);

    return NextResponse.json({ 
      success: true, 
      ...result
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error making prediction:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal Server Error', 
      details: error.message 
    }, { status: 500 });
  }
}



















// import { NextResponse } from 'next/server';
// import { uploadFileToBlob, readFileFromBlob } from '@/app/lib/azureBlob';
// import { connectMongoDB } from '@/app/lib/mongodb';
// import form from '@/app/models/mlmodel'; // Ensure correct import
// import * as ort from 'onnxruntime-node';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request: any) {
//   await connectMongoDB();

//   try {
//     const { formId, inputValues } = await request.json();

//     // Fetch form data using Mongoose model
//     const formData = await form.findById(formId);

//     if (!formData) {
//       return NextResponse.json({ success: false, error: 'Form not found' }, { status: 404 });
//     }

//     // Download ONNX model from Azure Blob Storage
//     const modelFilePath = await readFileFromBlob(formData.onnxFileName);

//     // Read the ONNX model file as an ArrayBuffer
//     const modelArrayBuffer:any = fs.readFileSync(path.resolve(modelFilePath)).buffer;

//     // Create ONNX session from the ArrayBuffer
//     const session = await ort.InferenceSession.create(modelArrayBuffer);

//     // Prepare input tensor
//     const inputTensor = new ort.Tensor('float32', Float32Array.from(inputValues), [1, formData.numberOfFeatures]);

//     // Run inference
//     const feeds = { input: inputTensor };
//     const outputMap = await session.run(feeds);
//     const outputTensor:any = outputMap.output;
//     const predictions = Array.from(outputTensor.data);

//     return NextResponse.json({ success: true, predictions }, { status: 200 });
//   } catch (error) {
//     console.error('Error making prediction:', error);
//     return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
//   }
// }
