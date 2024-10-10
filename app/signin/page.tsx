"use client";
import { useState } from "react";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignin = () => {
    //notthing much here
  };

  //   <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} className="border-2 mb-2 border-gray-300 rounded-md p-2" />
  return (
    <>
      <div className="w-full text-md">
        <div className="flex flex-col gap-2 justify-center items-center w-full  mt-4 px-8 text-blackt">
          <div className="flex items-center self-start gap-2">
            <ArrowLeft color="blue" size={18} />
            <div className="text-blackt">Home</div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-start w-1/3">
            <div className="self-start">
            <Image
                src="/plutoflow.png"
                alt='PlutoFlow'
                width={40}
                height={40}
                className='cursor-pointer'
              />
            </div>
            <div className="">Log in to PlutoFlow</div>
            <div className="">Don't have an account? <span className="text-blue-900">Sign up.</span></div>
            <div self-s>The dream</div>
            <form className="flex flex-col justify-center items-start w-full">
            <label htmlFor="email" className="">Email</label>
            <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} className="border mb-1 text-md border-gray-300 rounded-md px-2 py-1 w-full" />
            <label htmlFor="password" className="">Password</label>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} className="border text-md mb-1 border-gray-300 rounded-md px-2 py-1 w-full" />
            <div className="flex flex-row justify-center gap-2 items-center bg-blue-900">
                <div className="text-white">continue</div>


            </div>
         </form>
          </div>
          
        </div>
      </div>
    </>
  );
}
