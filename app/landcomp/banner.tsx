import React from 'react'
import Link from 'next/link'

const banner = () => {
  return (
    <div className='flex justify-center bg-pink-200'>
      <div>Your models will be deleted after 24hours.  <span className='underline ml-5'><Link href="">Try PlutoFlow</Link> </span></div>
    </div>
  )
}

export default banner
