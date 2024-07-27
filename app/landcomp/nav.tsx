'use client'
import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <div>
      <div className='flex justify-between items-center gap-0 mt-4 mr-8 ml-4 '>
        <div className='flex p-3 gap-2  font-bold  rounded-md'>
         <Link href="/"><div>Logo</div></Link> 
         <Link href="/"><div>Model View</div></Link> 
        </div>
        <div className='flex rounded-lg'>
          <div className='flex gap-10  bg-pink-400/60  py-2 px-2'>
            <Link href="/openmodels"><div className=''>Open models</div></Link>
            <Link href="/docs"><div className=' '>Guide</div></Link>
            <Link href="/"><div className=''>About</div></Link>
          </div>
          <Link href="/modelform"><div className='bg-black text-white py-2 px-3 '>Test your model</div></Link>
        </div>
      </div>
    </div>
  )
}

export default Nav
