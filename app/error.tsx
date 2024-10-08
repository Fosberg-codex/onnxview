'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-col items-center mt-40 lg:mt-30 md:mt-30 justify-center gap-4 p-4 sm:p-8 md:p-16 lg:p-32'>
      <div className='text-red-700 text-center text-base sm:text-base md:text-3xl lg:text-base'>
        Oops! Something went wrong.
      </div>
      <button 
        className='p-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 transition duration-300'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      <div className='text-center text-sm sm:text-base md:text-base lg:text-base'>
        Or contact <br /> 
        <Link href="mailto:fosberg1addai@gmail.com" className='text-pink-500 underline'>
          Plutoflow Team
        </Link>
      </div>
    </div>
  )
}
