import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb';
import Sample from '@/app/models/sample'
import { uploadFileToBlob, readFileFromBlob } from '@/app/lib/azureBlob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req:any) {
  const formData = await req.formData();
  const name = formData.get('name');
  const age = formData.get('age');
  const file = formData.get('file');

  if (!name || !age || !file) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {

    const fileName = `${Date.now()}-${file.name}`;

    const fileBuffer = await file.arrayBuffer();
    // const fileUrl = await uploadFileToBlob(await Buffer.from(fileBuffer), file.name);

    const samp = await Sample.create({
      name,
      age,
      fileName,
    });

    // await newSample.save();

    const fileContentBuffer = await readFileFromBlob(file.name);
    const fileContent = fileContentBuffer.toString();

    return NextResponse.json({
      name,
      age,
      fileName,
      samp,
      fileContent,
    });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}