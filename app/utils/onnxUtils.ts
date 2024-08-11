import * as ort from 'onnxruntime-node';

export async function runOnnxInference(modelBuffer: any, inputValues: number[], numberOfFeatures: number) {
  const session = await ort.InferenceSession.create(modelBuffer);

  const inputTensor = new ort.Tensor('float32', Float32Array.from(inputValues), [1, numberOfFeatures]);

  const feeds = { float_input: inputTensor };
  const results = await session.run(feeds);

  const outputTensor = Object.values(results)[0];

  if (!outputTensor || !outputTensor.data) {
    throw new Error('Invalid model output structure');
  }

  const predictions = Array.from(outputTensor.data as Float32Array);
  console.log(predictions)

  return {
    predictions,
    outputShape: outputTensor.dims
  };
}