"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Menu, LogOut } from "react-feather";
import { signOut, useSession } from "next-auth/react";
import UserDropdown from '@/app/components/dropdown'

const Nav = () => {
  const { data: session }: any = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { text: "Open models", url: "/openmodels" },
    { text: "Guide", url: "/docs" },
    { text: "About", url: "/about" },
  ];

  return (
    <nav
      className={`${
        isOpen && isMobile ? "bg-blackt" : "bg-white"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto px-4">
        {/* <div className="flex justify-between items-center h-16 lg:mx-20 md:mx-0 sm:mx-0"> */}
        <div className="flex justify-between items-center h-16 ">
          {!session ? (
            <>
              <div className="flex items-center">
                <Link href="/">
                  <div className="flex items-center gap-2 font-bold">
                    <Image
                      src={
                        isOpen && isMobile
                          ? "/plutoflow2.png"
                          : "/plutoflow.png"
                      }
                      alt="PlutoFlow logo"
                      width={45}
                      height={45}
                    />
                    <div
                      className={
                        isOpen && isMobile ? "text-white" : "text-black"
                      }
                    >
                      PlutoFlow{" "}
                      <span
                        className={`py-1 px-1 text-sm rounded-sm ${
                          isOpen && isMobile ? "bg-gray-600" : "bg-gray-400"
                        }`}
                      >
                        Beta
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row gap-4 items-center text-black">
                <UserDropdown userEmail={session.user?.email}/>

              </div>
            </>
          )}

          {/* Desktop and Tablet Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex">
              <div className="flex gap-4 bg-blue-900 text-white py-2 px-4 rounded-l-full">
                {menuItems.map((item, index) => (
                  <Link key={index} href={item.url}>
                    <div className="hover:text-gray-300 transition-colors duration-300">
                      {item.text}
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/auth/signin">
                <div className="bg-blackt text-white py-2 px-4 hover:text-gray-300 transition-colors duration-300 rounded-r-full">
                  Run your model
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`${
                isOpen ? "text-white" : "text-black"
              } focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && isMobile && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 absolute z-20 w-full h-screen bg-blackt space-y-1 sm:px-3">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.url}>
                <div className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">
                  {item.text}
                </div>
              </Link>
            ))}
            <Link href="/auth/signin">
              <div className="bg-white text-black block px-3 py-2 text-base font-medium rounded-full transition-colors duration-300 hover:bg-blue-900">
                Run your model
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;