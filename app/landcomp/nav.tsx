'use client'
import React from 'react'

const Nav = () => {
  return (
    <div>
      <div className='flex justify-between items-center gap-0 mt-4 mr-8 ml-4 '>
        <div className='flex p-3 gap-2  font-bold  rounded-md'>
          <div>Logo</div>
          <div>Model View</div>
        </div>
        <div className='flex rounded-lg'>
          <div className='flex gap-10  bg-pink-400/60  py-2 px-2'>
            <div className=''>Open models</div>
            <div className=' '>Guide</div>
            <div className=''>Learn more</div>
          </div>
          <div className='bg-black text-white py-2 px-3 '>Test your model</div>
        </div>
      </div>
    </div>
  )
}

export default Nav
