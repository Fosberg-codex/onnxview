import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export const runtime = "edge"; 

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className='bg-blackt text-white p-4'>
      <div className='flex flex-col justify-center mt-12'>
        <div className='text-white text-2xl sm:text-3xl md:text-4xl text-center'>Ready to start running</div>
        <div className='text-white text-2xl sm:text-3xl md:text-4xl text-center'>your ML models in production?</div>
        <div className='flex flex-col sm:flex-row items-center gap-4 my-4 w-full justify-center'>
        <Link href='/modelform'>  <div className='px-3 py-2 rounded-full bg-bluet text-base sm:text-lg text-white w-full sm:w-auto text-center'>get started for free</div></Link>
        <Link href='/waitlist'>  <div className='px-3 py-2 rounded-full border border-bluet text-base sm:text-lg text-white w-full sm:w-auto text-center mt-2 sm:mt-0'>join the alpha waitlist</div></Link>
        </div>
        <div className='flex flex-col sm:flex-row items-center sm:items-center justify-around w-full my-8 text-gray-300 py-8 border-b border-t border-gray-600'>
          <div className='hidden sm:block mb-4 sm:mb-0'>
            <Link href="/">
              <Image
                src="/plutoflow2.png"
                alt='PlutoFlow'
                width={80}
                height={80}
                className='cursor-pointer'
              />
            </Link>
          </div>
          <div className='hidden sm:block mb-4 sm:mb-0 text-center sm:text-left'>
            <div className='text-lg text-white font-semibold'>Site</div>
            <Link href="/"><div>Home</div></Link>
            <Link href=''><div>About</div></Link>
          </div>
          <div className='mb-4 sm:mb-0 text-center sm:text-left'>
            <div className='text-lg text-white font-semibold'>Resources</div>
            <Link href='/docs'><div>Documentation</div></Link>
            <Link href='/openmodels'><div>Open Models</div></Link>
          </div>
          <div className='mb-4 sm:mb-0 text-center sm:text-left'>
            <div className='text-lg text-white font-semibold'>Help</div>
            <Link href='mailto:fosberg1addai@gmail.com'><div>Email us</div></Link>
            <Link href='/'><div>Join us</div></Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row justify-between items-center w-full'>
        <div className='flex flex-col sm:flex-row items-center gap-2 text-sm sm:text-base mb-4 sm:mb-0'>
          <Link href="/">
            <div className='text-xl font-semibold hover:text-bluet cursor-pointer'>PlutoFlow,</div>
          </Link>
          <div className='text-center sm:text-left'>{date} All Rights Reserved.</div>
        </div>
        <div className='flex flex-col sm:flex-row items-center'>
          <div className='mr-2 text-lg font-semibold mb-2 sm:mb-0'>Follow PlutoFlow</div>
          <div className='flex flex-row'>
            <div className='mr-2'>
              <Link href="https://www.linkedin.com/in/fosberg-addai-53a6991a7/">
                <Image
                  src="/LinkdIn.png"
                  alt='LinkedIn'
                  width={40}
                  height={40}
                  className='cursor-pointer'
                />
              </Link>
            </div>
            <div>
              <Link href="https://x.com/FosbergAddai">
                <Image
                  src="/TwitterX.png"
                  alt='Twitters'
                  width={40}
                  height={40}
                  className='cursor-pointer'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
