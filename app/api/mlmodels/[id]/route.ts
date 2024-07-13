
import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb';
import mlModel from '@/app/models/mlmodel';
import { deleteModel } from 'mongoose';
import mongoose from 'mongoose';

export async function GET(request:any,context:any) {
  try {
    await connectMongoDB();
    const {params} = context
   
    const modelid = params.id
    const model = await mlModel.findById(modelid);

    if (!model) {
      return NextResponse.json({ error: 'mlModel not found' }, { status: 404 });
    }
    return Response.json(model);

  } catch (error:any) {
    console.log("error from route", error);
    return new NextResponse("Error check code");
  }
}


export async function PATCH(request:any, context:any) {
  try {
    await connectMongoDB();
    const { params } = context;

    const updateId = params.id;
    if (!mongoose.Types.ObjectId.isValid(updateId)) {
      return NextResponse.json({ error: 'Invalid model ID' }, { status: 400 });
    }

    const data = await request.json(); // Get the data from the request body

    const updatedModel = await mlModel.findByIdAndUpdate(
      updateId,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedModel) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    return NextResponse.json(updatedModel);
  } catch (error:any) {
    console.log("error from route", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



export async function DELETE(request:any, context:any) {
  try {
    await connectMongoDB ();
    const {params} = context

    const delid = params.id
    const delmodel = await mlModel.findByIdAndDelete({_id:delid});
    if (!delmodel) {
      return NextResponse.json({ error: 'mlModel not found' }, { status: 404 });
    }
    return Response.json(deleteModel);
  } catch (error:any) {
    console.log("error from route", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}