import React from 'react'
import Image from 'next/image'

const Section = () => {
  return (
    <div className='mt-4 mx-4 sm:mx-8 relative p-4 sm:p-8 md:p-12 lg:p-16 bg-pink-300 rounded-md'>
      <div className='flex flex-col gap-4 justify-center items-center'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center'>Simulate your model in production</h1>
        <p className='text-center text-sm sm:text-base'>
          your model in production your model in production your model in production your
          model in production your model in production your model in production
        </p>
        <div className='w-full max-w-6xl'>
          <div className='relative w-full pt-[56.25%]'>
            <Image
              src="/oonx.jpg"
              alt="Description of image"
              fill
              className='absolute top-0 left-0 w-full h-full object-cover rounded-md'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section