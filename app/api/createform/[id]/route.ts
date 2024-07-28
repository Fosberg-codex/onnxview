import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb';
import { deleteFromAzure, uploadFileToBlob } from '@/app/lib/azureBlob';
import form from '@/app/models/mlmodel';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  try {
    const id = params.id;
    const formData = await form.findById(id);

    if (!formData) {
      return NextResponse.json({ success: false, error: 'FormData not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: formData });
  } catch (error) {
    console.error('Error fetching formData:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Invalid ID provided' }, { status: 400 });
    }

    const formData = await request.formData();
    const updatedFields: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
      if (key === 'featureNames' && typeof value === 'string') {
        updatedFields[key] = value.split(',').map((s) => s.trim());
      } else if (key !== 'onnxFile') {
        updatedFields[key] = value;
      }
    }

    const onnxFile = formData.get('onnxFile') as File | null;
    if (onnxFile) {
      const oldForm = await form.findById(id);
      if (!oldForm) {
        return NextResponse.json({ success: false, error: 'Form not found' }, { status: 404 });
      }

      const fileName = `${Date.now()}-${onnxFile.name}`;
      const fileBuffer = await onnxFile.arrayBuffer();
      const fileUrl = await uploadFileToBlob(Buffer.from(fileBuffer), fileName);

      updatedFields.fileName = fileName;
      updatedFields.fileUrl = fileUrl;

      if (oldForm.fileName && oldForm.fileName !== fileName) {
        await deleteFromAzure(oldForm.fileName);
      }
    }

    const updatedForm = await form.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedForm) {
      return NextResponse.json({ success: false, error: 'Form not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedForm });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
  }
}