import React from 'react'
import Image from 'next/image'

const Section = () => {
  return (
    <div className='mt-4 mx-4 sm:mx-8 relative p-4 sm:p-8 md:p-12 lg:p-16 rounded-md '>
      <div className='flex flex-col gap-4 justify-center items-center '>
        
        <p className='text-center text-base sm:text-base text-blue-900'>
          Scientists use models to predict the future. We are building a no code inference platform for models.
        </p>
        <div className='w-full max-w-6xl border-2  border-blue-950 rounded-md'>
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