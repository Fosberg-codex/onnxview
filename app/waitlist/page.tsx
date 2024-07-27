"use client"
import React from 'react'
// import Iframe from 'react-iframe'
import Script from "next/script";
import { useEffect, useState } from "react";
import Nav from '../landcomp/nav';
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
    <div className="fixed inset-0 w-full h-full mt-16 mb-8">

    {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream">
            <div className='flex flex-col gap-2 justify-center items-center'>
            <div className="w-16 h-16 border-t-4 border-green border-solid rounded-full animate-spin"></div>
            <div>Please wait...</div>
            </div>
        </div>
      )}
      
      <iframe 
        className="w-full h-full"
        data-tally-src="https://tally.so/r/3E0Wel?transparentBackground=1"
        
        title="Data submission">
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
    </div>


    </>
    
  )
}

export default page
