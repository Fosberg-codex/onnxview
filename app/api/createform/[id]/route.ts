import { NextResponse } from 'next/server';
import {connectMongoDB} from '@/app/lib/mongodb';
import { deleteFromAzure, uploadFileToBlob } from '@/app/lib/azureBlob';
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

    return NextResponse.json(formData);
  } catch (error) {
    console.error('Error fetching formData:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

//delete form page

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const id = params.id;
//     const formData = await form.findById(id);

//     if (!formData) {
//       return NextResponse.json({ success: false, error: 'Form not found' }, { status: 404 });
//     }

//     // Delete the ONNX file from Azure Blob Storage
//     if (formData.fileName) {
//       await deleteFromAzure(formData.fileName);
//     }

//     // Delete the form from MongoDB
//     await form.findOneAndDelete({ _id: id });

//     return NextResponse.json({ success: true, message: 'Form deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting form:', error);
//     return NextResponse.json({ success: false, error: 'Failed to delete form' }, { status: 500 });
//   }
// }


//update model form
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      throw new Error('Invalid ID provided');
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (error) {
      console.error('Error parsing form data:', error);
      return NextResponse.json({ success: false, error: 'Invalid form data' }, { status: 400 });
    }

    const updatedFields: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (key === 'featureNames') {
        updatedFields[key] = (value as string).split(',').map((s) => s.trim());
      } else if (key !== 'onnxFile') {
        updatedFields[key] = value;
      }
    }


    const onnxFile = formData.get('onnxFile') as File | null;
    if (onnxFile) {
      try {
        const oldForm = await form.findById(id);
        if (!oldForm) {
          return NextResponse.json({ success: false, error: 'Form not found' }, { status: 404 });
        }

        const fileName = `${Date.now()}-${onnxFile.name}`;
        const fileBuffer = await onnxFile.arrayBuffer();
        const fileUrl = await uploadFileToBlob(Buffer.from(fileBuffer), fileName);

        // Update the form with the new file information
        updatedFields.fileName = fileName;
        updatedFields.fileUrl = fileUrl;

        // Only delete the old file if the upload of the new file was successful
        if (oldForm.fileName && oldForm.fileName !== fileName) {
          await deleteFromAzure(oldForm.fileName);
        }
      } catch (error) {
        console.error('Error handling file upload:', error);
        return NextResponse.json({ success: false, error: 'Failed to process file upload' }, { status: 500 });
      }
    }

    let updatedForm;
    try {
      updatedForm = await form.findOneAndUpdate(
        { _id: id },
        { $set: updatedFields },
        { new: true }
      );
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ success: false, error: 'Database operation failed' }, { status: 500 });
    }

    if (!updatedForm) {
      return NextResponse.json({ success: false, error: 'Form not found' }, { status: 404 });
    }

    return NextResponse.json(updatedForm);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
  }
}

