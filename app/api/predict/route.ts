import { NextResponse } from 'next/server';
// import { readFileFromBlob } from '@/app/lib/azureBlob';
// import { connectMongoDB } from '@/app/lib/mongodb';
// import form from '@/app/models/mlmodel';
// import { runOnnxInference } from '@/app/utils/onnxUtils';


let readFileFromBlob;
let connectMongoDB;
let modelform;
let runOnnxInference;

async function importDependencies() {
  const azureBlobModule = await import('@/app/lib/azureBlob');
  const mongodbModule = await import('@/app/lib/mongodb');
  const form = await import('@/app/models/mlmodel');
  const onnxUtilsModule = await import('@/app/utils/onnxUtils');

  readFileFromBlob = azureBlobModule.readFileFromBlob;
  connectMongoDB = mongodbModule.connectMongoDB;
  modelform = form.default;
  runOnnxInference = onnxUtilsModule.runOnnxInference;
}

export async function POST(request: any) {
  await importDependencies();
  await connectMongoDB();

  try {
    const { formId, inputValues } = await request.json();

    const formData = await modelform.findById(formId);

    if (!formData) {
      return NextResponse.json({ success: false, error: 'Form not found check formId' }, { status: 404 });
    }

    if (!formData.fileName) {
      return NextResponse.json({ success: false, error: 'such file name does not exist' }, { status: 404 });
    }

    const modelBuffer = await readFileFromBlob(formData.fileName);

    const result = await runOnnxInference(modelBuffer, inputValues, formData.numberOfFeatures);
    console.log(result)

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('Error making prediction:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal Server Error', 
      details: error.message 
    }, { status: 500 });
  }
}










