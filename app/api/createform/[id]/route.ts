import { NextResponse } from 'next/server';
import {connectMongoDB} from '@/app/lib/mongodb';
import form from '@/app/models/mlmodel'// Import the Mongoose model

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
    await connectMongoDB()
  try {
    const id = params.id;

    const formData = await form.findById(id);

    if (!formData) {
      return NextResponse.json({ success: false, error: 'FormData not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, formData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching formData:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}