"use client"
import React, { useState } from 'react'
import Nav from '@/app/landcomp/nav'
import { useEffect } from 'react'

const page = () => {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  useEffect(()=>{
   
    const fetchdata = async()=>{

      const data = await fetch('api/createform', { cache: 'force-cache' })
      const forms = await data.json()
      setData(forms)

    }

    fetchdata()

  }, [])

  return (
    <>
    <Nav/>
    <div className='mt-16 mx-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center'>
        {data && data.map((form:any) =>(
          <div  key={form._id} className='flex flex-col gap-2 bg-gray-200 rounded-md p-4 w-[360px] h-44 flex-wrap cursor-pointer hover:border hover:border-black'>
           <div className='text-lg font-semibold'>{form.name}</div>
           <div>{form.description}</div>
           <div className='flex justify-between items-center mt-2'>
           <div className='bg-orange-600 text-white rounded-md px-2 py-1 '>{form.framework}</div>
           <div>Number of features: {form.numberOfFeatures}</div>
           </div>
          
          </div>

        ))
          
        }

      </div>
      
    </div>
    </>
    
  )
}

export default page
