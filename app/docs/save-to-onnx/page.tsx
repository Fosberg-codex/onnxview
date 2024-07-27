import React from "react";
import Link from "next/link";


// app/docs/save-to-onnx/page.js
export default function SaveToOnnxPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Saving Models to ONNX Format: A Comprehensive Guide</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            ONNX (Open Neural Network Exchange) is an open format to represent machine learning models. 
            Converting your models to ONNX allows you to use our web app for making inferences. 
            This guide will walk you through the process of saving both scikit-learn and PyTorch models to ONNX format.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Saving scikit-learn Models to ONNX</h2>
          
          <h3 className="text-xl font-semibold mb-3">1.1 Prerequisites</h3>
          <p className="mb-4">Before you begin, make sure you have the necessary packages installed:</p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
            <code className="text-sm">pip install scikit-learn skl2onnx onnxruntime numpy</code>
          </pre>
  
          <h3 className="text-xl font-semibold mb-3">1.2 Step-by-Step Guide</h3>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Import required modules</li>
            <li>Define initial types for your model's input</li>
            <li>Convert the model to ONNX format</li>
            <li>Save the ONNX model to a file</li>
          </ol>
  
          <h3 className="text-xl font-semibold mb-3">1.3 Code Example with Detailed Explanations</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
            <code className="text-sm">
  {`# Import necessary modules
  from skl2onnx import convert_sklearn
  from skl2onnx.common.data_types import FloatTensorType
  import onnxruntime as rt
  import numpy as np
  
  # Define the initial types based on your model's input features
  initial_type = [('float_input', FloatTensorType([None, 2]))]
  
  # Convert the model to ONNX format
  options = {type(model): {'zipmap': False}}
  onx = convert_sklearn(model, initial_types=initial_type, options=options)
  
  # Save the ONNX model to a file
  with open("model.onnx", "wb") as f:
      f.write(onx.SerializeToString())`}
            </code>
          </pre>
  
          <h3 className="text-xl font-semibold mb-3">1.4 Parameter Explanations</h3>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><code className="bg-gray-100 px-1 rounded">initial_type</code>: Defines the input shape and type for your model. 
              <ul className="list-disc list-inside ml-6 mt-2">
                <li><code className="bg-gray-100 px-1 rounded">None</code>: Allows for variable batch size</li>
                <li><code className="bg-gray-100 px-1 rounded">2</code>: Number of features (adjust this to match your model's input)</li>
              </ul>
            </li>
            <li><code className="bg-gray-100 px-1 rounded">options</code>: Additional conversion options
              <ul className="list-disc list-inside ml-6 mt-2">
                <li><code className="bg-gray-100 px-1 rounded">'zipmap': False</code>: Disables creation of a ZipMap operator, which can improve performance</li>
              </ul>
            </li>
            <li><code className="bg-gray-100 px-1 rounded">model</code>: Your trained scikit-learn model</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Saving PyTorch Models to ONNX</h2>
          
          <h3 className="text-xl font-semibold mb-3">2.1 Prerequisites</h3>
          <p className="mb-4">Ensure you have the following packages installed:</p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
            <code className="text-sm">pip install torch torchvision onnx</code>
          </pre>
  
          <h3 className="text-xl font-semibold mb-3">2.2 Step-by-Step Guide</h3>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Import required modules</li>
            <li>Load your PyTorch model</li>
            <li>Create a dummy input tensor</li>
            <li>Export the model to ONNX format</li>
          </ol>
  
          <h3 className="text-xl font-semibold mb-3">2.3 Code Example with Detailed Explanations</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
            <code className="text-sm">
  {`import torch
  import torch.onnx
  
  # Load your PyTorch model
  model = YourPyTorchModel()
  model.load_state_dict(torch.load('model.pth'))
  model.eval()
  
  # Create dummy input tensor
  dummy_input = torch.randn(1, input_size)
  
  # Export the model
  torch.onnx.export(model,               # model being run
                    dummy_input,         # model input (or a tuple for multiple inputs)
                    "model.onnx",        # where to save the model
                    export_params=True,  # store the trained parameter weights inside the model file
                    opset_version=10,    # the ONNX version to export the model to
                    do_constant_folding=True,  # whether to execute constant folding for optimization
                    input_names = ['input'],   # the model's input names
                    output_names = ['output'], # the model's output names
                    dynamic_axes={'input' : {0 : 'batch_size'},    # variable length axes
                                  'output' : {0 : 'batch_size'}})`}
            </code>
          </pre>
  
          <h3 className="text-xl font-semibold mb-3">2.4 Parameter Explanations</h3>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><code className="bg-gray-100 px-1 rounded">model</code>: Your PyTorch model class</li>
            <li><code className="bg-gray-100 px-1 rounded">dummy_input</code>: A tensor with the same shape as your model's input</li>
            <li><code className="bg-gray-100 px-1 rounded">export_params=True</code>: Stores the model's trained parameters in the ONNX file</li>
            <li><code className="bg-gray-100 px-1 rounded">opset_version=10</code>: The ONNX version to use (adjust if needed)</li>
            <li><code className="bg-gray-100 px-1 rounded">do_constant_folding=True</code>: Optimizes the model by folding constants</li>
            <li><code className="bg-gray-100 px-1 rounded">input_names</code>, <code className="bg-gray-100 px-1 rounded">output_names</code>: Names for input and output nodes</li>
            <li><code className="bg-gray-100 px-1 rounded">dynamic_axes</code>: Specifies which dimensions can have variable sizes (like batch size)</li>
          </ul>
        </section>
      </div>
    );
  }