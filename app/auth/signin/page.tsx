"use client";
import { ArrowLeft, ArrowRight } from "react-feather";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/modelform");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSignin = async (e: any) => {
    e.preventDefault();
    // const email = e.target[0].value;
    // const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }


  return (
    <div className="w-full text-sm lg:text-md md:text-md xl:text-lg">
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
          <div className="text-lg font-semibold">Log in to Plutoflow</div>
          <div>Don't have an account? <Link href='/auth/signup' className="text-blue-700">Sign up.</Link></div>
          <form className="flex flex-col justify-center items-start w-full">
            <label htmlFor="email" className="mt-2">Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="alan.turing@inc.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="border mb-1 text-md border-gray-300 rounded-md px-2 py-1 w-full" 
            />
            <div className="flex flex-col sm:flex-row justify-between w-full mt-2 mb-1">
              <label htmlFor="password">Password</label>
              <Link href='/auth/forget-password' className="text-blue-700 text-right sm:text-left mt-1 sm:mt-0">forgot password</Link>
            </div>
            <input 
              type="password" 
              id="password"
              placeholder="plutoflow123" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="border text-md mb-1 border-gray-300 rounded-md px-2 py-1 w-full" 
            />
            <button
              onClick={handleSignin}
              className="flex cursor-pointer flex-row justify-center gap-2 items-center bg-blue-800 w-full rounded-md py-2 mt-4 px-2 hover:bg-blue-900"
            >
              <div className="text-white">continue</div>
              <ArrowRight color="white" size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}