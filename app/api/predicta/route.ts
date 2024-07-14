// /app/api/predict/route.js

import { NextResponse } from 'next/server';
import { InferenceSession, Tensor } from 'onnxruntime-node';
import { promises as fs } from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(request:any) {
  try {
    const { age, gender } = await request.json();

    // Load the ONNX model
    const modelPath = path.join(process.cwd(), 'public/model/nownew.onnx');
    const modelData = await fs.readFile(modelPath);

    const session = await InferenceSession.create(modelData);

    // Log the input names and output names to debug
    console.log('Model input names:', session.inputNames);
    console.log('Model output names:', session.outputNames);

    // Assuming the input name is the first one listed in session.inputNames
    const inputName = session.inputNames[0];

    //convert the gender from string to Number
    const gend = gender === 'male' ? 1 : 0;

    // Prepare the input tensor
    const inputTensor = new Tensor('float32', new Float32Array([age, gend]), [1, 2]);

    // Run the model
    const feeds = { [inputName]: inputTensor };
    const results = await session.run(feeds);

    // Assuming the output name is the first one listed in session.outputNames
    const outputName = session.outputNames[0];

    const output = results[outputName].data;

    return NextResponse.json({ prediction: output });
  } catch (error:any) {
    console.error('Error during prediction:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
