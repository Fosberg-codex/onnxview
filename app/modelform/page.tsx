"use client"
import React from 'react'
import Nav from '../landcomp/nav'
import { useRouter } from 'next/navigation';
import { useState } from 'react';




const page = () => {
 
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/createform', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/modelform/${data._id}`);
      } else {
        console.error('Form creation failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }



  return (
    <>
    <Nav/>

    <div className='mx-6 mt-12'>
      <div className='flex gap-2 justify-start items-center'>
        <div className='flex justify-center px-2 py-1 bg-pink-600 text-white cursor-pointer'>Tabular data</div>
        <div className='flex justify-center px-2 py-1 border border-black cursor-pointer'>Image data</div>
        <div className='flex justify-center px-2 py-1 border border-black cursor-pointer'>Generative ai</div>
      </div>
      <div className=' w-full flex flex-col justify-center items-center gap-2 mt-4'>
        <div className='text-4xl font-bold'>Submit your model</div>
        <form  onSubmit={handleSubmit} className='w-6/12 flex-col space-y-4'>
        <div>
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input type="text" id="name" name="name" required className="w-full p-2 border border-black rounded" />
        </div>
        <div>
          <label htmlFor="numberOfFeatures" className="block mb-1">Number of Features:</label>
          <input type="number" id="numberOfFeatures" name="numberOfFeatures" required className="w-full p-2 border border-black rounded" />
        </div>
        <div>
          <label htmlFor="featureNames" className="block mb-1">Feature Names (comma-separated):</label>
          <input type="text" id="featureNames" name="featureNames" required className="w-full p-2 border border-black rounded" />
        </div>

        <div>
        <label htmlFor="onnxFile" className="block mb-1">Upload your .ONNX file</label>
        <input
          type="file"
          id="onnxFile"
          name="onnxFile"
          accept=".onnx"
          required
          className="w-full p-2 border rounded bg-white"
        />
      </div>
      <div>
          <label htmlFor="description" className="block mb-1">Description:</label>
          <textarea id="description" name="description" maxLength={200} className="w-full p-2 border border-black rounded"></textarea>
      </div>
      
      <button type="submit" className="bg-pink-400 text-white px-4 mb-8 py-2 rounded-md hover:bg-pink-600">Create model app</button>
      
     




        </form>
        

      </div>


    </div>
    </>
  )
}

export default page
