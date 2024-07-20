import { NextResponse } from 'next/server';
import * as ort from 'onnxruntime-node';
import path from 'path';
import fs from 'fs';

export async function POST(request:any) {
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
    const tensor = new ort.Tensor('float32', input, [1, 2]);

    // Run the model
    const feeds = { float_input: tensor };
    const results:any = await session.run(feeds);

    // Debug: Log the entire results object
    console.log('Model output:', JSON.stringify(results, null, 2));

    // Get the output tensor (assuming there's only one output)
    const outputTensor:any = Object.values(results)[0];

    if (!outputTensor || !outputTensor.data) {
      throw new Error('Invalid model output structure');
    }

    // Convert the output tensor to a regular array
    const prediction = Array.from(outputTensor.data);

    // Return the prediction
    return NextResponse.json({ prediction, outputShape: outputTensor.dims });
  } catch (error:any) {
    console.error('Error running the model:', error);
    return NextResponse.json({ 
      error: 'Error running the model', 
      details: error.message,
      // modelOutput: JSON.stringify(results, null, 2)  // Include the full model output in the error response
    }, { status: 500 });
  }
}