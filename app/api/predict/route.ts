import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb';
import mlModel from '@/app/models/mlmodel';
import { runOnnxPrediction, validateInput } from '@/app/lib/onnxruntime';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request:any) {
  try {
    const { modelId, inputData } = await request.json();

    await connectMongoDB();
    
    const model = await mlModel.findById(modelId);
    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }

    // Validate input data
    try {
      validateInput(inputData, model.numberOfFeatures);
    } catch (validationError:any) {
      return NextResponse.json({ error: validationError.message }, { status: 400 });
    }

    // Construct the full path to the ONNX file
    const onnxFilePath = path.join(process.cwd(), 'public', model.onnxFilePath);

    // Read the ONNX file as a Buffer
    const modelBuffer = await fs.readFile(onnxFilePath);

    // Run prediction
    const prediction = await runOnnxPrediction(modelBuffer, inputData, model.typeCase);

    return NextResponse.json({ prediction });
  } catch (error:any) {
    console.error('Prediction error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}