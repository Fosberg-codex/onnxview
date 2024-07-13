'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ModelList() {
  const [models, setModels] = useState<any>([])

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/mlmodels')
        if (response.ok) {
          const data = await response.json()
          setModels(data)
        } else {
          console.error('Failed to fetch models')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchModels()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model:any) => (
        <Link key={model._id} href={`/mlmodels/${model._id}`}>
          <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{model.name}</h2>
            <p className="text-gray-600">{model.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
