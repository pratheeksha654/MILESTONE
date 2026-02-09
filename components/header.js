"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full z-50 transition-all ${
        isSticky
          ? "fixed top-0 bg-white shadow-md"
          : "relative bg-transparent"
      }`}
    >
      <div className="px-4  flex items-center justify-between
      w-full h-20 bg-white shadow-md">
        
        
        <div className="flex items-center gap-2">
          <img
            src="/MinuteAI.png"
            alt="Logo"
            className="w-40 rounded-xl"
          />
          
        </div>

        
        <nav className="hidden md:flex items-center gap-6 dark:text-black">
          <Link href="/" className=" hover:text-blue-600  font-sans">HOME</Link>
          <Link href="/profile" className=" hover:text-blue-600  font-sans">PROFILE</Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-blue-600
            font-sans text-white hover:bg-black"
          >
            DASHBOARD
          </Link>
        </nav>

        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl dark:text-black"
        >
          ☰
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t">
          <nav className="flex flex-col items-start px-6 py-4 space-y-4">
            
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="w-full text-gray-700 dark:text-gray-200 text-lg"
            >
              HOME
            </Link>

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="w-full text-gray-700 dark:text-gray-200 text-lg"
            >
              PROFILE
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              DASHBOARD
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}