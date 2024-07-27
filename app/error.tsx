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
    <div className='m-40'>
      <div className='text-red-700'>Opps! omething went wrong!</div>
      <div className='p-2 bg-red-400 border border-blue cursor-pointer'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </div>
    </div>
  )
}