'use client'
import React, { useState } from 'react'
import { CircleX } from 'lucide-react'
import Link from 'next/link'

interface PredictionProps {
  formId: string
  featureNames: string[]
}

export default function Prediction ({ formId, featureNames }: PredictionProps) {
  const [inputValues, setInputValues] = useState<Record<string, number>>({})
  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Boolean>(false)

  const handleInputChange = (featureName: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [featureName]: parseFloat(value)
    }))
  }

  const handlePredict = async () => {

    setLoading(true); 
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formId: formId,
          inputValues: featureNames.map(name => inputValues[name] || 0)
        })
      })
  
      
      if (response.ok) {
        
        const data = await response.json()
        setLoading(false); 
        setPrediction(data.predictions)
      } else {
        setError(true)
        console.error('Prediction failed')
      }
    } catch (error) {
      console.error('Error making prediction:', error)
    }
  }

  return (
    <div className='mt-8'>
      <div className='text-xl font-semibold mb-2 self-start'>
        Make a Prediction
      </div>
      {featureNames.map(featureName => (
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
            onChange={e => handleInputChange(featureName, e.target.value)}
            className='w-full p-2 border border-black rounded'
          />
        </div>
      ))}
      <div className='flex justify-between'>
        <button
          onClick={handlePredict}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
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
        <div className='mt-6 border flex flex-col gap-4 border-gray-200 rounded py-4 px-6'>
          <div>
            <CircleX size={35} />
          </div>
          <div>Make sure your inputs are correct based on your features</div>
        </div>
      )}

      {prediction !== null && (
        <div className='mt-6 border flex flex-col gap-4 border-gray-200 rounded py-4 px-6'>
          <div className=' self-start text-lg  text-gray-600 underline'>
            Response
          </div>
          <div className='text-black px-2 py-1 rounded-md bg-gray-200'>
            {prediction}
          </div>
        </div>
      )}
    </div>
  )
}
