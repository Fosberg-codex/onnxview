import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export const runtime = "edge"; 

const Footer = () => {
  return (
    <div className='bg-black text-white p-4 mt-4'>
        <div className='flex justify-between lg:w-11/12 md:w-11/12 w-full items-start lg:items-center md:items-center'>
            <div className='ml-0 lg:ml-8 md:ml-8 flex flex-col items-start gap-2 text-md lg:text-base md:text-base'>
                <div className='flex gap-0 lg:gap-2 md:gap-2 '>
                    <div className='hidden md:block lg:block'></div>
                  <Link href="/">  <div className='text-xl font-semibold hover:text-pink-600 cursor-pointer'>PlutoFloww</div></Link>

                </div>
                <div>
                   @Africa Base. All Rights Reserved.
                </div>
            </div>
            <div className='hidden lg:block md:block font-semibold hover:text-pink-600'><Link href="/docs">Read Docs</Link></div>
            <div className='flex flex-col lg:flex-row md-flex-row items-center'>
                <div className='mr-2 text-lg font-semibold'>Follow PlutoFlow</div>
                <div className='flex flex-row lg:flex-row md:flex-row'>
                <div>
                    <Link href="https://www.linkedin.com/in/fosberg-addai-53a6991a7/">
                <Image
                        src="/LinkdIn.png"
                        alt='LinkdIn'
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
                        alt='Youtube video'
                        width={40}
                        height={40}
                        className='cursor-pointer'
                        />
                </Link>
                </div>
                <div>
                <Link href="mailto:fosberg1addai@gmail.com">
                <Image
                        src="/Email.png"
                        alt='Email'
                        width={56}
                        height={56}
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
