import { NextRequest, NextResponse } from 'next/server';
import { readFileFromBlob } from '@/app/lib/azureBlob';
import { connectMongoDB } from '@/app/lib/mongodb';
import form from '@/app/models/mlmodel';

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
  }

  const formId = request.nextUrl.searchParams.get('formId');
  console.log('Requested formId:', formId);

  if (!formId) {
    console.error('Missing formId parameter');
    return NextResponse.json({ error: 'Missing formId parameter' }, { status: 400 });
  }

  try {
    const formData = await form.findById(formId);

    if (!formData) {
      console.error(`Form not found for formId: ${formId}`);
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    if (!formData.fileName) {
      console.error(`Model file not found for formId: ${formId}`);
      return NextResponse.json({ error: 'Model file not found' }, { status: 404 });
    }

    console.log(`Attempting to read file: ${formData.fileName}`);
    const modelBuffer = await readFileFromBlob(formData.fileName);

    console.log(`Successfully retrieved model for formId: ${formId}`);
    return new NextResponse(modelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${formData.fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error retrieving model:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}