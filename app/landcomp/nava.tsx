'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Nava = () => {
  return (
    <div>
      <div className='flex justify-between items-center gap-0 mt-4 mr-8 mx-8 '>
        <div className='flex justify-start items-center  gap-2 font-bold'>
          <div>
            <Image
              src='/plutoflow.png'
              alt='Youtube video'
              width={45}
              height={45}
            />
          </div>
          <div>PlutoFlow <span className='bg-gray-400 py-1 px-1'>experimental</span></div>
        </div>
        <div className='flex rounded-lg'>
          <div className='flex gap-10  bg-pink-400/60  py-2 px-2'>
            <Link href='/openmodels'>
              <div className=''>Open models</div>
            </Link>
            <Link href='/docs'>
              <div className=' '>Guide</div>
            </Link>
            <Link href='/about'>
              <div className=''>About</div>
            </Link>
          </div>
          <Link href='/modelform'>
            <div className='bg-black text-white py-2 px-3 '>
              Test your model
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Nava
