


"use client";
import React, { useState, useEffect } from 'react';
import { XCircle } from 'react-feather';
import Link from 'next/link';
import * as ort from 'onnxruntime-web';

// Setting the WASM path for ONNX Runtime
try {
  ort.env.wasm.wasmPaths = '/wasm/';
} catch (error) {
  console.error('Error setting WASM paths:', error);
}

interface PredictionProps {
  formId: string;
  featureNames: string[];
}

export default function Prediction({ formId, featureNames }: PredictionProps) {
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [session, setSession] = useState<ort.InferenceSession | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const response = await fetch(`/api/predict?formId=${formId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        const model = await ort.InferenceSession.create(arrayBuffer);
        setSession(model);
      } catch (error) {
        console.error('Error loading model:', error);
        setError(error instanceof Error ? error.message : String(error));
      }
    };

    loadModel();
  }, [formId]);

  const handleInputChange = (featureName: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setInputValues(prev => ({
        ...prev,
        [featureName]: numValue,
      }));
    }
  };

  const handlePredict = async () => {
    if (!session) {
      console.error('Session not initialized');
      setError('Model not loaded. Please try again.');
      return;
    }

    setLoading(true);
    setError("");

    try {
      const inputTensor = new ort.Tensor(
        'float32',
        Float32Array.from(featureNames.map(name => inputValues[name])),
        [1, featureNames.length]
      );

      const feeds = { float_input: inputTensor };
      const results = await session.run(feeds);

      // Attempt to find the output tensor
      let outputTensor = null;
      for (const key in results) {
        if (results[key] instanceof ort.Tensor) {
          outputTensor = results[key];
          break;
        }
      }

      if (outputTensor && outputTensor.data && outputTensor.data.length > 0) {
        // Assuming the output is a single value or a categorical prediction
        const outputData:any = outputTensor.data;
        // const outputData:any = Array.from(outputTensor.data);
        let predictionValue;

        // alert('output data is ' + outputData[0].toString() + outputTensor )

        if (Array.isArray(outputData) && outputData.length > 1) {
          // Assuming categorical output, take the index of max value
          const maxIndex = outputData.indexOf(Math.max(...outputData));
          predictionValue = maxIndex; // Modify this based on your specific label mapping
        } else {
          predictionValue = outputData[0];
        }

        setPrediction(predictionValue.toString());
      } else {
        throw new Error('Invalid or empty model output');
      }
    } catch (error) {
      console.error('Error making prediction:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-4'>
      <div className='flex flex-col gap-1 mb-2'>
      <div className='text-xl font-semibold mb-1 self-start'>
        Make a Prediction
      </div>
      <div className='text-red-500 text-sm'>When the input value is empty it means it has number 0. So if your value is empty leave that field empty.</div>
      </div>
      
      {featureNames && featureNames.map(featureName => (
        <div key={featureName} className='mb-3'>
          <label htmlFor={featureName} className='block mb-1'>
            {featureName}:
          </label>
          <input
            type='number'
            required
            min='0'
            step='1'
            id={featureName}
            value={inputValues[featureName] || ''}
            onChange={e => {
              handleInputChange(featureName, e.target.value);
            }}
            className='w-full p-2 border border-black rounded'
          />
        </div>
      ))}
      <div className='flex justify-between'>
        <button
          onClick={handlePredict}
          className='bg-blue-900 text-white px-2 py-1 rounded  hover:bg-blue-500'
          disabled={!session}
        >
          Predict
        </button>
        <Link href={`/update/${formId}`}>
          <div className='underline text-red-500'>update model</div>
        </Link>
      </div>

      {loading && (
        <div className='flex flex-col gap-2 justify-center items-center'>
          <div className='w-16 h-16 border-t-4 border-green border-solid rounded-full animate-spin'></div>
          <div>Please wait...</div>
        </div>
      )}

      {error && (
        <div className='mt-6 border flex flex-col items-center gap-4 border-gray-200 rounded py-4 px-6'>
          <div>
            <XCircle size={35} />
          </div>
          <div>{error}</div>
        </div>
      )}

      {prediction !== null && (
        <div className='mt-6 border flex flex-col gap-4 border-gray-200 rounded py-4 px-6'>
          <div className='self-start text-lg text-gray-600 underline'>
            Response
          </div>
          <div className='text-black px-2 py-1 rounded-md bg-gray-200'>
            {prediction}
          </div>
        </div>
      )}
    </div>
  );
}



















// "use client"
// import React, { useState, useEffect } from 'react';
// import { XCircle } from 'react-feather';
// import Link from 'next/link';
// import * as ort from 'onnxruntime-web';

// try {
//   ort.env.wasm.wasmPaths = '/wasm/';
// } catch (error) {
//   console.error('Error setting WASM paths:', error);
// }

// interface PredictionProps {
//   formId: string;
//   featureNames: string[];
// }

// export default function Prediction({ formId, featureNames }: PredictionProps) {
//   const [inputValues, setInputValues] = useState<Record<string, string>>({});
//   const [prediction, setPrediction] = useState<number | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [session, setSession] = useState<ort.InferenceSession | null>(null);

//   useEffect(() => {
//     const loadModel = async () => {
//       try {
//         const response = await fetch(`/api/predict?formId=${formId}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const arrayBuffer = await response.arrayBuffer();
//         const model = await ort.InferenceSession.create(arrayBuffer);
//         setSession(model);
//       } catch (error) {
//         console.error('Error loading model:', error);
//         setError(error instanceof Error ? error.message : String(error));
//       }
//     };

//     loadModel();
//   }, [formId]);

//   const handleInputChange = (featureName: string, value: string) => {
//     setInputValues(prev => ({
//       ...prev,
//       [featureName]: value
//     }));
//   };

//   const handlePredict = async () => {
//     if (!session) {
//       console.error('Session not initialized');
//       setError('Model not loaded. Please try again.');
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const inputTensor = new ort.Tensor(
//         'float32',
//         Float32Array.from(featureNames.map(name => {
//           const value = parseFloat(inputValues[name]);
//           if (isNaN(value)) {
//             throw new Error(`Invalid input for ${name}`);
//           }
//           return value || 0;
//         })),
//         [1, featureNames.length]
//       );

//       const feeds = { float_input: inputTensor };
//       const results = await session.run(feeds);
      
//       console.log('Full results object:', results);

//       // Attempt to find the output tensor
//       let outputTensor = null;
//       for (const key in results) {
//         if (results[key] instanceof ort.Tensor) {
//           outputTensor = results[key];
//           console.log(`Found output tensor with key: ${key}`);
//           break;
//         }
//       }

//       if (outputTensor && outputTensor.data && outputTensor.data.length > 0) {
//         console.log('Output tensor data:', outputTensor.data);
//         console.log('Output tensor shape:', outputTensor.dims);
        
//         // Assuming the output is a single value
//         const predictionValue = Array.isArray(outputTensor.data) 
//           ? outputTensor.data[0] 
//           : outputTensor.data;
        
//         setPrediction(predictionValue);
//       } else {
//         throw new Error('Invalid or empty model output');
//       }
//     } catch (error) {
//       console.error('Error making prediction:', error);
//       setError(error instanceof Error ? error.message : 'An unexpected error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className='mt-4'>
//       <div className='text-xl font-semibold mb-2 self-start'>
//         Make a Prediction
//       </div>
//       {featureNames && featureNames.map(featureName => (
//         <div key={featureName} className='mb-3'>
//           <label htmlFor={featureName} className='block mb-1'>
//             {featureName}:
//           </label>
//           <input
//             type='number'
//             required
//             min='0'
//             step='1'
//             id={featureName}
//             value={inputValues[featureName] || ''}
//             onChange={e => {
//               try {
//                 handleInputChange(featureName, e.target.value);
//               } catch (error) {
//                 console.error('Error in input change:', error);
//               }
//             }}
//             className='w-full p-2 border border-black rounded'
//           />
//         </div>
//       ))}
//       <div className='flex justify-between'>
//         <button
//           onClick={() => {
//             try {
//               handlePredict();
//             } catch (error) {
//               console.error('Error in predict button click:', error);
//             }
//           }}
//           className='bg-pink-400 text-white px-2 py-1 rounded border border-black hover:bg-pink-500'
//           disabled={!session}
//         >
//           Predict
//         </button>
//         <Link href={`/update/${formId}`}>
//           <div className='underline text-red-500'>update model</div>
//         </Link>
//       </div>

//       {loading && (
//         <div className='flex flex-col gap-2 justify-center items-center'>
//           <div className='w-16 h-16 border-t-4 border-green border-solid rounded-full animate-spin'></div>
//           <div>Please wait...</div>
//         </div>
//       )}

//       {error && (
//         <div className='mt-6 border flex flex-col items-center gap-4 border-gray-200 rounded py-4 px-6'>
//           <div>
//             <XCircle size={35} />
//           </div>
//           <div>{error}</div>
//         </div>
//       )}

//       {prediction !== null && (
//         <div className='mt-6 border flex flex-col gap-4 border-gray-200 rounded py-4 px-6'>
//           <div className=' self-start text-lg  text-gray-600 underline'>
//             Response
//           </div>
//           <div className='text-black px-2 py-1 rounded-md bg-gray-200'>
//             {prediction}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }