import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb';
import mlModel from '@/app/models/mlmodel';
import { writeFile } from 'fs/promises';
import path from 'path';



// GET
export async function GET() {
  try {
    await connectMongoDB();
    const models = await mlModel.find({});
    return Response.json(models);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST
export async function POST(request:any) {
  try {
    await connectMongoDB();

    const formData = await request.formData();
    const name = formData.get('name');
    const numberOfFeatures = formData.get('numberOfFeatures');
    const featureNames = formData.get('featureNames').split(',').map((name:any) => name.trim());
    const typeCase = formData.get('typeCase');
    const framework = formData.get('framework');
    const description = formData.get('description');
    const onnxFile = formData.get('onnxFile');

    if (!onnxFile) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await onnxFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save the file to /public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const fileName = `${Date.now()}_${onnxFile.name}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Save relative path to database
    const onnxFilePath = `/uploads/${fileName}`;

    const model = await mlModel.create({
      name,
      numberOfFeatures,
      featureNames,
      onnxFilePath,
      typeCase,
      framework,
      description
    });

    return NextResponse.json(model);
  } catch (error) {
    console.error("Error from route:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}