"use client";
import { useState } from "react";
import { ArrowLeft } from "react-feather";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPass = (e) => {
    e.preventDefault();
    // Handle reset password logic here
  };

  return (
    <div className="w-full text-sm">
      <div className="flex flex-col gap-2 justify-center items-center w-full mt-4 px-4 sm:px-8 text-black">
        <Link href='/' className="flex items-center self-start gap-2 px-2 py-1 border border-gray-200 rounded-full hover:bg-gray-300">
          <ArrowLeft color="#1e3a8a" size={18} />
          <div>Home</div>
        </Link>
        <div className="flex flex-col gap-2 justify-center items-start w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-8 sm:mt-12">
          <div className="self-start">
            <Image
              src="/plutoflow.png"
              alt='PlutoFlow'
              width={40}
              height={40}
              className='cursor-pointer'
            />
          </div>
          <div className="text-lg font-semibold">Reset password</div>
          <div className="mb-3 text-sm">Please enter your new password you want to use. Please keep it safe.</div>
          <form onSubmit={handleResetPass} className="flex flex-col justify-center items-start w-full">
            <label htmlFor="password" className="mb-1">New password</label>
            <input 
              type="password" 
              id="password"
              placeholder="plutoflow123" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="border mb-4 text-md border-gray-300 rounded-md px-2 py-2 w-full" 
            />
            <label htmlFor="confirmPassword" className="mb-1">Confirm password</label>
            <input 
              type="password" 
              id="confirmPassword"
              placeholder="plutoflow123" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              className="border mb-4 text-md border-gray-300 rounded-md px-2 py-2 w-full" 
            />
            <button 
              type="submit"
              className="text-white flex cursor-pointer flex-row justify-center gap-2 items-center bg-blue-800 w-full rounded-md py-2 px-4 hover:bg-blue-900 transition-colors"
            >
              Continue to login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}