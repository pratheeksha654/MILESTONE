 "use client";

import { useState } from "react";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AuthCard({
  mode,
  subtitle,
  buttonText,
  bottomText,
  bottomLinkText,
  bottomLinkHref,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/profile");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="
      min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-blue-200 via-sky-200 to-indigo-200
      dark:from-gray-900 dark:via-gray-950 dark:to-black
    ">
      <div className="
        w-full max-w-md rounded-2xl shadow-2xl p-8
        bg-white/80 backdrop-blur-xl
        dark:bg-gray-900/80 dark:border dark:border-gray-800
      ">

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/MinuteAI.png"
            alt="Logo"
            className="w-44 sm:w-48 md:w-52 h-auto"
          />
        </div>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          {subtitle}
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl border outline-none
              bg-white text-black
              dark:bg-gray-800 dark:text-white dark:border-gray-700
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl border outline-none
              bg-white text-black
              dark:bg-gray-800 dark:text-white dark:border-gray-700
            "
          />
        </div>

        {/* Main Button */}
        <button
          onClick={handleSubmit}
          className="
            w-full mt-6 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:opacity-90
          "
        >
          {loading ? "Please wait..." : buttonText}
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          className="
            w-full py-3 rounded-xl border flex justify-center
            hover:bg-gray-100
            dark:hover:bg-gray-800 dark:border-gray-700 dark:text-white
          "
        >
          Continue with Google
        </button>

        {/* Bottom text */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          {bottomText}{" "}
          <Link
            href={bottomLinkHref}
            className="text-blue-600 dark:text-blue-400 font-medium"
          >
            {bottomLinkText}
          </Link>
        </p>

      </div>
    </div>
  );
}