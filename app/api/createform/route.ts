import { NextResponse } from 'next/server';

let uploadFileToBlob: (buffer: Buffer, fileName: string) => Promise<string>;
let connectMongoDB: () => Promise<void>;
let form: any;

async function importDependencies() {
  const { uploadFileToBlob: uploadFile } = await import('@/app/lib/azureBlob');
  const { connectMongoDB: connect } = await import('@/app/lib/mongodb');
  const { default: formModel } = await import('@/app/models/mlmodel');
  
  uploadFileToBlob = uploadFile;
  connectMongoDB = connect;
  form = formModel;
}

export async function POST(request: Request) {
  await importDependencies();
  await connectMongoDB();
  
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const numberOfFeatures = parseInt(formData.get('numberOfFeatures') as string);
    const featureNames = (formData.get('featureNames') as string).split(',').map(name => name.trim());
    const onnxFile = formData.get('onnxFile') as File;
    const typeCase = formData.get('typeCase') as string;
    const framework = formData.get('framework') as string;
    const description = formData.get('description') as string;

    const fileName = `${Date.now()}-${onnxFile.name}`;
    const fileBuffer = await onnxFile.arrayBuffer();
    const fileUrl = await uploadFileToBlob(Buffer.from(fileBuffer), fileName);

    const newForm = await form.create({
      name,
      numberOfFeatures,
      featureNames,
      fileName,
      fileUrl,
      typeCase,
      framework,
      description
    });

    return NextResponse.json(newForm, { status: 201 });
  } catch (error) {
    console.error('Error creating form:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  await importDependencies();
  await connectMongoDB();

  try {
    const models = await form.find({});
    return NextResponse.json(models);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}