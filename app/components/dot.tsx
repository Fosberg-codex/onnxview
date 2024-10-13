import React from 'react'
import Link from 'next/link'
import { Sun, UserPlus, Home, User, LogOut, ChevronUp } from 'react-feather';
//export const //runtime = "edge"; 

type ParamProp ={
  title:string;
  link:string;
}

const Builtby:React.FC<ParamProp> = ({title, link}) => {
  return (
    <>
     <Link href={link}><div className='fixed bottom-4 right-4 bg-bluet text-white backdrop-blur-md  text-cream py-1 px-2 rounded shadow-lg'><ChevronUp color="white" size={17} strokeWidth="3" /></div></Link>  

{/* // Built by Fosberg */}
    </>
   
      

  )
}

export default Builtby
