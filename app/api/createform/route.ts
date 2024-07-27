import { NextResponse } from 'next/server';
import { uploadFileToBlob, readFileFromBlob } from '@/app/lib/azureBlob';
import {connectMongoDB} from '@/app/lib/mongodb';
import form from '@/app/models/mlmodel'// Import the Mongoose model


export const config = {
    api: {
      bodyParser: false,
    },
  };
  
export async function POST(request: Request) {
     
    await connectMongoDB(); // Ensure the database connection is established

  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const numberOfFeatures = parseInt(formData.get('numberOfFeatures') as string);
    const featureNames = (formData.get('featureNames') as string).split(',').map(name => name.trim());
    const onnxFile = formData.get('onnxFile') as File;
    // const typeCase = formData.getAll('typeCase') as string[];
    const typeCase = formData.get('typeCase') as string;
    const framework = formData.get('framework') as string;
    const description = formData.get('description') as string;

    // Upload ONNX file to Azure Blob Storage
    const fileName = `${Date.now()}-${onnxFile.name}`;
    const fileBuffer = await onnxFile.arrayBuffer();
    const fileUrl = await uploadFileToBlob(Buffer.from(fileBuffer), fileName);

    // await uploadFileToBlob(onnxFile, fileName);

    // Create document using Mongoose model
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

    // return NextResponse.json({ success: true, formId: newForm._id }, { status: 201 });
    return NextResponse.json(newForm, { status: 201 });
  } catch (error) {
    console.error('Error creating form:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req:any){

  try{
    const models = await form.find({})

    return NextResponse.json(models)
  } catch(error:any){
    return NextResponse.json({error:error.mesaage},{status: 500})
  }

}