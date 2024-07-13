'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateModelForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>({
    name: '',
    numberOfFeatures: '',
    featureNames: '',
    typeCase: 'Tabular',
    framework: '',
    description: ''
  })
  const [file, setFile] = useState(null)

  const handleChange = (e:any) => {
    const { name, value } = e.target
    setFormData((prev:any) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key])
    })
    if (file) {
      formDataToSend.append('onnxFile', file)
    }

    try {
      const response = await fetch('/api/mlmodels', {
        method: 'POST',
        body: formDataToSend
      })
      if (response.ok) {
        router.push('/mlmodels')
      } else {
        const errorData = await response.json()
        console.error('Failed to create model:', errorData.error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label htmlFor='name' className='block mb-1'>
          Model Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        <label htmlFor='numberOfFeatures' className='block mb-1'>
          Number of Features
        </label>
        <input
          type='number'
          id='numberOfFeatures'
          name='numberOfFeatures'
          value={formData.numberOfFeatures}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        <label htmlFor='featureNames' className='block mb-1'>
          Feature Names (comma-separated)
        </label>
        <input
          type='text'
          id='featureNames'
          name='featureNames'
          value={formData.featureNames}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        <label htmlFor='onnxFile' className='block mb-1'>
          ONNX File
        </label>
        <input
          type='file'
          id='onnxFile'
          onChange={handleFileChange}
          accept='.onnx'
          // required
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        <label className='block mb-1'>Type Case</label>
        <div>
          <label className='inline-flex items-center mr-4'>
            <input
              type='radio'
              name='typeCase'
              value='Tabular'
              checked={formData.typeCase === 'Tabular'}
              onChange={handleChange}
              className='mr-2'
            />
            Tabular
          </label>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              name='typeCase'
              value='Image'
              checked={formData.typeCase === 'Image'}
              onChange={handleChange}
              className='mr-2'
            />
            Image
          </label>
        </div>
      </div>
      <div>
        <label htmlFor='framework' className='block mb-1'>
          Framework
        </label>
        <input
          type='text'
          id='framework'
          name='framework'
          value={formData.framework}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        <label htmlFor='description' className='block mb-1'>
          Model Description
        </label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          required
          className='w-full p-2 border rounded'
        ></textarea>
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Create Model
      </button>
    </form>
  )
}