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
      <div className="w-full text-sm ">
        <div className="flex flex-col gap-2 justify-center items-center w-full  mt-4 px-8 text-blackt">
          <div className="flex items-center self-start gap-2">
            <ArrowLeft color=" #1e3a8a" size={18} />
            <div className="text-blackt">Home</div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-start w-1/3 mt-12">
            <div className="self-start">
            <Image
                src="/plutoflow.png"
                alt='PlutoFlow'
                width={40}
                height={40}
                className='cursor-pointer'
              />
            </div>
            <div className="">Log in to Plutoflow</div>
            <div className="">Don't have an account? <span className="text-blue-700">Sign up.</span></div>
            <form className="flex flex-col justify-center items-start w-full">
            <label htmlFor="email" className="">Email</label>
            <input type="email" placeholder="alan.turing.Inc.com" value={email} onChange={e => setEmail(e.target.value)} className="border mb-1 text-md border-gray-300 rounded-md px-2 py-1 w-full" />
            <div className="flex justify-between w-full mt-2 mb-1">
            <label htmlFor="password" className="">Password</label>
            <div className="text-blue-700">forgot password</div>
            </div>
            <input type="password" placeholder="plutoflow123" value={password} onChange={e => setPassword(e.target.value)} className="border text-md mb-1 border-gray-300 rounded-md px-2 py-1 w-full" />
            <div onClick={handleSignin} className="flex flex-row justify-center gap-2 items-center bg-blue-800 w-full rounded-md py-1 mt-2 px-2 hover:bg-blue-900">
                <div className="text-white">continue</div>
                <ArrowRight color="white" size={20} />
            </div>
         </form>
          </div>
          
        </div>
      </div>
    </>
  );
}
