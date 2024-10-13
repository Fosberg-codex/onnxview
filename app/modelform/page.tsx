"use client"
import React, { useState, useEffect } from 'react'
import Nav from '../landcomp/nav2'
import { useRouter } from 'next/navigation';
import Banner from '@/app/landcomp/banner';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession();

  
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      router.replace("/auth/signin");
    }
  }, [sessionStatus, router]);


  return (
    <>
     <Banner/>
      <Nav />
      
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-12'>
        <div className='flex flex-wrap gap-2 justify-start items-center mb-6'>
          <button className='flex justify-center px-3 text-sm py-2 bg-blue-900 text-white rounded-md hover:bg-blue-950 transition-colors'>Tabular data</button>
          <button className='flex justify-center px-3 text-sm py-2 border border-black rounded-md hover:bg-gray-100 transition-colors'><Link href="/waitlist">Image data</Link></button>
          <button className='flex justify-center text-sm px-3 py-2 border border-black rounded-md hover:bg-gray-100 transition-colors'><Link href="/waitlist">Generative AI</Link> </button>
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-4'>
          <h1 className='text-3xl sm:text-4xl font-bold text-center'>Submit your model</h1>
          <form onSubmit={handleSubmit} className='w-full max-w-2xl space-y-6 mb-8'>
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Title of App:</label>
              <input type="text" id="name" name="name" required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="numberOfFeatures" className="block mb-1 font-medium">Number of Features:</label>
              <input type="number" id="numberOfFeatures" name="numberOfFeatures" required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="featureNames" className="block mb-1 font-medium">Feature Names (comma-separated):</label>
              <input type="text" id="featureNames" name="featureNames" required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="onnxFile" className="block mb-1 font-medium">Upload your .ONNX file</label>
              <input
                type="file"
                id="onnxFile"
                name="onnxFile"
                accept=".onnx"
                required
                className="w-full p-2 border border-gray-300 rounded-md bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
              />
            </div>
            <div>
              <label htmlFor="framework" className="block mb-1 font-medium">Framework used:</label>
              <input type="text" id="framework" name="framework" required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="description" className="block mb-1 font-medium">Description:</label>
              <textarea id="description" name="description" maxLength={500} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-900 focus:border-transparent h-32 resize-none"></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-900 text-white px-4 flex justify-center py-2 mb-4 rounded-md hover:bg-blue-950 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <div className="w-4 h-4 border-t-4 border-green border-solid p-2 border-black rounded-full animate-spin"></div>: 'Create model app'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Page