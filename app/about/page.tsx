import React from 'react'
import Nav from '../landcomp/nav3'
import Footer from '../landcomp/footer'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <Nav />
      <div className='bg-white text-blackt rounded-lg mb-4 p-6 border border-gray-200 mt-12 mx-4 sm:mx-8 md:mx-12 lg:mx-16'>
        <div className='flex flex-col  gap-6 sm:gap-8 md:gap-10'>
          <div className='flex flex-col gap-2 sm:gap-3'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold'>
              Why Plutoflow
            </h2>
            <p className='text-sm sm:text-base md:text-base'>
              Most data professionals are not good at software development or
              engineering, so Plutoflow was created to be an easy, possibly a
              no-code platform that can help data professionals and companies
              test and scale their ML models in production. We are working hard
              to be simple and also help you create APIs with an upload of a
              model.
            </p>
  
          </div>
          <div className='flex flex-col gap-2 sm:gap-3'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold'>
              Who is behind this
            </h2>
            <div className='text-sm sm:text-base md:text-base'>
              <p className='mb-2 sm:mb-3'>
                I am Fosberg, and I built this. I am into software engineering,
                machine learning engineering, and AI engineering. Iread Bsc Physics at the university. This should have
                existed, and I am now building it. Currently, it is maintained
                by me and my college classmate Yakubuku Seidu, a professional
                software engineer and George Appiah, deveops engineer.
              </p>
              <Link
                href='mailto:fosberg1addai@gmail.com'
                className='text-blue-900 hover:text-gray-300 transition-colors'
              >
                Email Fosberg
              </Link>
            </div>
          </div>

          <div className='flex flex-col gap-2 sm:gap-3'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold'>
              Is my model safe?
            </h2>
            <div className='text-sm sm:text-base md:text-base'>
              <p className='mb-2 sm:mb-3'>
                Yes your model is safe. It is stored in Azure Blob storage account. Sincerely it is not reviewed for anything. We are building
                a community to help scientists and developers and we respect thier contributions to open and close ML/AI.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Page
