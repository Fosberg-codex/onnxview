'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PredictionForm from './PredictionForm'
import EditModelForm from './EditModelForm'

export default function ModelDetail({ id }:any) {
  const router = useRouter()
  const [model, setModel] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await fetch(`/api/mlmodels/${id}`)
        if (response.ok) {
          const data = await response.json()
          setModel(data)
        } else {
          console.error('Failed to fetch model')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchModel()
  }, [id])

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/mlmodels/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        router.push('/models')
      } else {
        console.error('Failed to delete model')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (!model) return <div>Loading...</div>

  return (
    <div className='flex justify-center'>
      <div className='w-4/6 flex flex-col gap-2 mt-12'>
        <h1 className="text-3xl font-bold mb-8">{model.name}</h1>
        {isEditing ? (
          <EditModelForm model={model} setModel={setModel} setIsEditing={setIsEditing} />
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Model Details</h2>
              <p><strong>Number of Features:</strong> {model.numberOfFeatures}</p>
              <p><strong>Feature Names:</strong> {model.featureNames.join(', ')}</p>
              <p><strong>Type Case:</strong> {model.typeCase}</p>
              <p><strong>Framework:</strong> {model.framework}</p>
              <p><strong>Description:</strong> {model.description}</p>
            </div>
            <div className="mb-8">
              <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-4">Edit</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
            </div>
            <PredictionForm model={model} />
          </>
        )}
      </div>
    </div>
  )
}