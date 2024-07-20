import React from 'react'
import Image from 'next/image'

const Section = () => {
  return (
    <div className='mt-4 mx-8 relative p-16 bg-pink-300 rounded-md '>
      <div className='flex flex-col gap-4 justify-center items-center'>
        <div className='text-5xl font-bold'>Simulate your model in production</div>
        <div>your model in production your model in production your model in production your model in production your model in production your model in production</div>
        <div>
            <Image
            src="/oonx.jpg"
            alt="Description of image"
            width={1200} // desired width
            height={100} // desired height
            className='w-1600 h-[700px] rounded-md'
        />
        </div>
      </div>
    </div>
  )
}

export default Section
