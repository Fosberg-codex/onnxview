import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sun, UserPlus, Home, User, LogOut } from 'react-feather';
import { signOut, useSession } from "next-auth/react";

const UserDropdown = ({ userEmail }) => {

  const { data: session }: any = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Clickable element to toggle dropdown */}
      <button
        className="flex items-center space-x-2 bg-gray-100 p-2 border border-gray-400 rounded-full"
        onClick={toggleDropdown}
      >
        {/* Display the first letter of the userEmail */}
        <div className="bg-blue-500 text-white text-sm rounded-full  h-6 w-6 flex items-center justify-center">
          {userEmail.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-normal">{userEmail}</span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-5 mt-2 w-48 bg-white shadow-lg rounded-md px-2 py-2 flex flex-col gap-2 justify-center border border-gray-300">
         
          <div onClick={() => {
                    signOut();
                  }} className='flex flex-row gap-2 items-center px-2 bg-gray-200 hover:bg-blue-300 hover:rounded-md'>
          <LogOut color="black" size={14} strokeWidth="3" />
            <div className='text-sm py-2 px-2 '>Logout</div>

          </div>
          <Link href='/' className='flex flex-row py-2 items-center gap-2 px-2  bg-gray-200 hover:bg-blue-300 hover:rounded-md'>
          <Home color="black" size={14} strokeWidth="3" />
          <div className='text-sm px-2 ' >Home</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
