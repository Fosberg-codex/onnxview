"use client"
import React, { useEffect, useState } from 'react'
import Script from "next/script";
import Nav from '../landcomp/nav';
import Footer from '../landcomp/footer';

const Page = () => {
    const [loaded, setLoaded] = useState(false)

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
            <Nav />
            <div className="fixed inset-0 bg-white pt-2 overflow-y-auto mt-16 mb-8">
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-cream">
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <div className="w-16 h-16 border-t-4 border-green border-solid rounded-full animate-spin"></div>
                            <div>Please wait...</div>
                        </div>
                    </div>
                )}
                <div className='flex flex-col gap-4 mx-4 sm:mx-6 md:mx-8 lg:mx-12 mt-8 '>
                    <h1 className='font-bold text-4xl sm:text-5xl md:text-7xl lg:text-9xl'>Save your Built model apps</h1>
                    <h2 className='font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-pink-700'>
                        Run ML Models <br className="hidden sm:inline" /> with an API 
                        <span className='text-lg sm:text-xl md:text-2xl lg:text-3xl border bg-black text-white px-2 pt-1 ml-2 inline-block mt-2 sm:mt-0'>Join the PlutoFlow Advance waitlist below</span>
                    </h2>
                </div>
                
                <iframe 
                    className="w-full h-[600px] sm:h-[800px] md:h-[1000px] lg:h-[1200px]"
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
                <Footer />
            </div>
        </>
    )
}

export default Page