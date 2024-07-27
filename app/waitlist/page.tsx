"use client"
import React from 'react'
// import Iframe from 'react-iframe'
import Script from "next/script";
import { useEffect, useState } from "react";
import Nav from '../landcomp/nav';
import Footer from '../landcomp/footer';
//export const //runtime = "edge";


const page = () => {

    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        const scriptTag = document.createElement("script");
        scriptTag.src = "https://tally.so/widgets/embed.js";
        scriptTag.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(scriptTag);
    
        return () => {
          document.body.removeChild(scriptTag);
        };
      }, []);
    

  return (
    <>
    <Nav/>
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-white pt-2 overflow-y-auto mt-16 mb-8">

    {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream">
            <div className='flex flex-col gap-2 justify-center items-center'>
            <div className="w-16 h-16 border-t-4 border-green border-solid rounded-full animate-spin"></div>
            <div>Please wait...</div>
            </div>
        </div>
      )}
       <div className='flex flex-col gap-2 mx-8 mt-8 mb-4'>
        <div className='font-bold text-9xl'>Save your Built model apps</div>
       <div className='font-bold text-6xl'>Run ML Models <br></br> with an API <span className='text-3xl border bg-black text-white px-2 pt-1'>Signup below</span></div>
       </div>
      
      
      <iframe 
        className="w-full h-[1200px] sm:h-[1200px] md:h-[1200px] lg:h-[1200px]"
        data-tally-src="https://tally.so/r/mJ0PYX?transparentBackground=1"
        
        title="Sign Up for Waitlist">
      </iframe>

      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          if (window.Tally) {
            window.Tally.loadEmbeds();
          }
        }}
      />
      <Footer/>
    </div>


    </>
    
  )
}

export default page
