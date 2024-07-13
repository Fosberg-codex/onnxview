'use client'

import { useState } from 'react'

export default function PredictionForm({ model }:any) {
  const [inputData, setInputData] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e:any, featureName:any) => {
    setInputData(prev => ({
      ...prev,
      [featureName]: parseFloat(e.target.value)
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelId: model._id,
          inputData: Object.values(inputData),
        }),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result = await response.json();

      if (result.error) {
        console.error('Prediction error:', result.error);
      } else {
        console.log('Prediction result:', result.prediction);
      }
      
      setPrediction(result.prediction);

    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Make a Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {model.featureNames.map((feature:any, index:any) => (
          <div key={index}>
            <label htmlFor={feature} className="block mb-1">{feature}</label>
            <input
              type="number"
              id={feature}
              name={feature}
              onChange={(e) => handleInputChange(e, feature)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Predict
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {prediction !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Prediction Result:</h3>
          <p>{JSON.stringify(prediction)}</p>
        </div>
      )}
    </div>
  );
}