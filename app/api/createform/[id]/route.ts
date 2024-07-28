import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb';
import { deleteFromAzure, uploadFileToBlob } from '@/app/lib/azureBlob';
import form from '@/app/models/mlmodel';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  try {
    const { id } = params;
    console.log('GET request received with ID:', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid ID format' }, { status: 400 });
    }

    const formData = await form.findById(id);
    console.log('Fetched formData:', formData);

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
    const { id } = params;
    console.log('PATCH request received with ID:', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid ID format' }, { status: 400 });
    }

    const formData = await request.formData();
    console.log('Received formData:', formData);
    const updatedFields: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (key === 'featureNames' && typeof value === 'string') {
        updatedFields[key] = value.split(',').map((s) => s.trim());
      } else if (key !== 'onnxFile') {
        updatedFields[key] = value;
      }
    });

    const onnxFile = formData.get('onnxFile') as File | null;
    console.log('onnxFile:', onnxFile);
    if (onnxFile) {
      const oldForm = await form.findById(id);
      console.log('Fetched oldForm:', oldForm);

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
    console.log('Updated form:', updatedForm);

    if (!updatedForm) {
      return NextResponse.json({ success: false, error: 'Form not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedForm });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
  }
}
