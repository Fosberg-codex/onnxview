import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <>
    <div className="px-4 sm:px-6 md:px-8 lg:px-24 mt-4">
        <div className='flex flex-col lg:flex-row items-center gap-4 w-full'>
            <div className='flex flex-col gap-2 justify-center items-start w-full lg:w-1/2'>
                <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-blackt'>Run model </div>
                <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl '><span className='text-blue-900 font-semibold'>Inference</span> on</div>
                <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-blackt'>the web</div>
                <div className='text-base sm:text-lg mt-4 lg:mr-8'>Streamline your workflow with No-Code platform. We take the pain of building apps so you focus on running multiple inference on your model</div>
                <div className='flex flex-col sm:flex-row items-center gap-4 mt-4 w-full'>
                 <Link href='/modelform'  className='px-3 py-2 rounded-full bg-blue-900 text-base sm:text-lg text-white text-center w-full sm:w-auto'>get started for free</Link>
                  <Link href='/waitlist' className='px-3 py-2 rounded-full border border-blue-900 text-base sm:text-lg text-blue-900 text-center w-full sm:w-auto mt-2 sm:mt-0'>join the alpha waitlist</Link>
                </div>
                <div className='text-2xl sm:text-3xl font-semibold mt-4 text-blue-900'>3000+ models</div>
                <div className='text-base sm:text-lg'>tested on PlutoFlow</div>
            </div>

            <div className='w-full h-max lg:w-1/2 mt-8 lg:mt-0 hidden sm:block'>
            <Image
            src='/2.gif'
            alt='Youtube video'
            width={450}
            height={500}
            className=' shadow-md border-blue-900 border rounded-md mx-auto my-auto'
          />

            </div>

        </div>
        
    </div>
    </>
  )
}

export default Hero