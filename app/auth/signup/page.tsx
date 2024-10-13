"use client";
import { useState, useEffect } from "react";
import { ArrowLeft } from "react-feather";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSignup = async (e: any) => {
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

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/auth/signin");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
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
          <div>Don't have an account? <Link href='/signin' className="text-blue-700">Sign In.</Link></div>
          <form className="flex flex-col justify-center items-start w-full">
            <label htmlFor="email" className="mt-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="alan.turing@inc.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border mb-2 text-md border-gray-300 rounded-md px-2 py-1 w-full"
            />
            <label htmlFor="password" className="mt-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="plutoflow123"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border text-md mb-1 border-gray-300 rounded-md px-2 py-1 w-full"
            />
            <button
              type="button"
              onClick={handleSignup}
              className="text-white flex cursor-pointer flex-row justify-center gap-2 items-center bg-blue-800 w-full rounded-md py-2 mt-4 px-2 hover:bg-blue-900"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}