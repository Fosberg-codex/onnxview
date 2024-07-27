import React from 'react'
import Nav from '../landcomp/nav'
import Footer from '../landcomp/footer'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <Nav />
      <div className='mt-12 mx-4 sm:mx-8 md:mx-12 lg:mx-16'>
        <div className='flex flex-col gap-6 sm:gap-8 md:gap-10'>
          <div className='flex flex-col gap-2 sm:gap-3'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>
              Why PlutoFlow
            </h2>
            <p className='text-sm sm:text-base md:text-lg'>
              Most data professionals are not good at software development or
              engineering, so PlutoFlow was created to be an easy, possibly a
              no-code platform that can help data professionals and companies
              test and scale their ML models in production. We are working hard
              to be simple and also help you create APIs with an upload of a
              model.
            </p>
          </div>
          <div className='flex flex-col gap-2 sm:gap-3'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>
              Who is behind this
            </h2>
            <div className='text-sm sm:text-base md:text-lg'>
              <p className='mb-2 sm:mb-3'>
                I am Fosberg, and I built this. I am into software engineering,
                machine learning engineering, and AI engineering. I am also a
                recent college graduate from KNUST Ghana. This should have
                existed, and I am now building it. Currently, it is maintained
                by me and my college classmate Yakubuku Seidu, a professional
                software engineer.
              </p>
              <Link
                href='mailto:fosberg1addai@gmail.com'
                className='text-red-500 hover:text-red-600 transition-colors'
              >
                Email Fosberg
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Page
