'use client'
import Link from 'next/link'
import React, { useState } from 'react';

export default function Logo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-center flex-shrink-0 text-white mr-6 pt-4 pl-3 pr-3 pb-4 sm:pb-0 text-2xl">
        <i className="fa-solid fa-chart-simple mr-2 text-green-500 justify-items-start"></i>
        <Link href={"/"} className = "justify-items-start">Employee Portal</Link>
      </div>
      <div className="w-full flex sm:hidden justify-end sm:justify-normal">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-green-500 hover:text-green-400 pt-5 pl-3 pr-5 pb-4 sm:pb-0"
        >
          <svg
            className={`fill-current h-5 w-5 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-5 w-5 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
    </>
  );
}

