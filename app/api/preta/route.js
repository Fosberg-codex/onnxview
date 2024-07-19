// /app/api/predict/route.js

import { NextResponse } from 'next/server';
import * as ort from 'onnxruntime-node';
import path from 'path';
import fs from 'fs';

export async function POST(request) {
  // Parse the request body
  const { age, gender } = await request.json();

  // Validate input
  if (typeof age !== 'number' || (typeof gender !== 'number' && ![0, 1].includes(gender))) {
    return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
  }

  try {
    // Load the ONNX model
    const modelPath = path.join(process.cwd(), 'public', 'uploads', 'nownew.onnx');
    if (!fs.existsSync(modelPath)) {
      throw new Error('Model file not found');
    }

    const session = await ort.InferenceSession.create(modelPath);

    // Prepare input tensor
    const input = new Float32Array([age, gender]);
    const tensor = new ort.Tensor('float32', input, [1, 2]); // Shape: [1, 2] since we have two input features

    // Run the model
    const feeds = { float_input: tensor };
    const results = await session.run(feeds);

    // Assuming the model output is named 'output'
    const prediction = results.output.data;

    // Return the prediction
    return NextResponse.json({ prediction });
  } catch (error) {
    console.error('Error running the model:', error);
    return NextResponse.json({ error: 'Error running the model' }, { status: 500 });
  }
}
