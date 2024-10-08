"use client"
import React, { useState, useEffect } from 'react'
import Nav from '@/app/landcomp/nav2'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Page = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([])

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch('api/createform', { cache: 'no-cache' })
        const forms = await response.json()
        
        if (Array.isArray(forms)) {
          setData(forms)
        } else {
          console.error('Fetched data is not an array:', forms)
          setData([])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Nav />
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-16'>
        {loading ? (
          <div className='flex justify-center mt-12'>
          <div className="w-12 h-12 border-t-4 border-green border-solid p-2 border-black rounded-full animate-spin">
           <Image
            src='/plutoflow.png'
            alt='Youtube video'
            width={55}
            height={55}
          /> 
          </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
            {data.map((form: any) => (
              <div 
              
                key={form._id} 
                className='bg-gray-200 rounded-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:border hover:border-black'
                onClick = {() => router.push(`/modelform/${form._id}`)}
              >
                <div>
                  <h2 className='text-lg font-semibold mb-2 line-clamp-1'>{form.name}</h2>
                  <p className='text-sm text-gray-600 mb-4 line-clamp-2'>{form.description}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='bg-blue-600 text-white text-xs font-medium rounded-md px-2 py-1'>
                    {form.framework}
                  </span>
                  <span className='text-sm text-gray-500'>
                    Features: {form.numberOfFeatures}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Page