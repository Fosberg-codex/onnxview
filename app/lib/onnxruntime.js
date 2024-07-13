import * as onnxruntime from 'onnxruntime-node';

export async function runOnnxPrediction(modelBuffer, inputData, typeCase) {
  try {
    const session = await onnxruntime.InferenceSession.create(modelBuffer);
    const inputName = session.inputNames[0];
    const outputName = session.outputNames[0];

    let inputTensor;
    if (typeCase === 'Tabular') {
      inputTensor = new onnxruntime.Tensor('float32', inputData, [1, inputData.length]);
    } else if (typeCase === 'Image') {
      // Assume inputData is a flat array of pixel values
      inputTensor = new onnxruntime.Tensor('float32', inputData, [1, 3, 224, 224]); // Example for a 224x224 RGB image
    } else {
      throw new Error('Unsupported type case');
    }

    const feeds = { [inputName]: inputTensor };
    const outputMap = await session.run(feeds);
    const output = outputMap[outputName];

    return Array.from(output.data);
  } catch (error) {
    console.error('ONNX Runtime error:', error);
    throw new Error('Failed to run ONNX prediction: ' + error.message);
  }
}

export function validateInput(inputData, expectedFeatures) {
  if (inputData.length !== expectedFeatures) {
    throw new Error(`Input data should have ${expectedFeatures} features, but got ${inputData.length}`);
  }
}