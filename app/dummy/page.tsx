'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PredictionForm() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [prediction, setPrediction] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await fetch('/api/predicta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ age: parseFloat(age), gender }),
    });
    const result = await response.json();
    setPrediction(result.prediction[0]);
    router.refresh();
  };

  return (
    <div className="container mx-auto p-4 w-5/6">
      <h1 className="text-2xl font-bold mb-4">Prediction Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="age" className="block mb-1">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block mb-1">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Predict
        </button>
      </form>
      {prediction !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold border-b border-gray-200">Prediction Result:</h2>
          <p className="text-lg">{prediction} should be recommended to him</p>
        </div>
      )}
    </div>
  );
}