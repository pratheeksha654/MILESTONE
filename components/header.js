"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

 
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!auth.currentUser
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  const goProfile = () => {
    router.push(isLoggedIn ? "/profile" : "/signup");
    setMenuOpen(false);
  };

  const goDashboard = () => {
    router.push(isLoggedIn ? "/dashboard" : "/signup");
    setMenuOpen(false);
  };

  return (
    <header
      className={`w-full z-50 transition-all ${
        isSticky
          ? "fixed top-0 bg-white shadow-md"
          : "relative bg-transparent"
      }`}
    >
      <div className="px-4 flex items-center justify-between w-full h-20 bg-white shadow-md">

        <div className="flex items-center gap-2">
          <img
            src="/MinuteAI.png"
            alt="Logo"
            className="w-40 rounded-xl"
          />
        </div>


        <nav className="hidden md:flex items-center gap-6 text-black font-sans">
          <Link href="/" className="hover:text-blue-600">
            HOME
          </Link>

          <button onClick={goProfile} className="hover:text-blue-600">
            PROFILE
          </button>

          <button
            onClick={goDashboard}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-black"
          >
            DASHBOARD
          </button>
        </nav>

       
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-black"
        >
          ☰
        </button>
      </div>

     
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col items-start px-6 py-4 space-y-4">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="w-full text-gray-700 text-lg"
            >
              HOME
            </Link>

            <button
              onClick={goProfile}
              className="w-full text-left text-gray-700 text-lg"
            >
              PROFILE
            </button>

            <button
              onClick={goDashboard}
              className="w-full text-center px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              DASHBOARD
            </button>

          </nav>
        </div>
      )}
    </header>
  );
}
