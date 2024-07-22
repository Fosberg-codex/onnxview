"use client"
import React from 'react'

const Nav = () => {
  return (
    <div>
    <div className='flex justify-around items-center gap-0 mt-4 mx-4 '>
      <div className='flex p-3 gap-2 bg-black font-bold text-white rounded-md'>
        <div>Logo</div>
        <div>Model View</div>
      </div>
      <div className='flex gap-12 p-3 lg:w-[1200px] md:w-[1200px] text-white rounded-md bg-black px-8'>
        <div>View open models</div>
        <div>Docs</div>
        <div>Read creator story</div>
      </div>
      <div className='flex p-3 bg-black text-white rounded-md'>Test your model</div>
    </div>
    </div>
  )
}

export default Nav
