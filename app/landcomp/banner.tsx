import React from 'react'
import Link from 'next/link'

const banner = () => {
  return (
    <div className='flex justify-center bg-pink-200 lg:text-base md:text-base text-sm text-center'>
      <div>Your models will be deleted after 24hours.  <span className='underline ml-5'><Link href="/waitlist">Try PlutoFlow Advance</Link> </span></div>
    </div>
  )
}

export default banner