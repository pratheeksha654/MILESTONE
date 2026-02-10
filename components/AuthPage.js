"use client";

import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
        <img src="/MinuteAI.png" alt="Minute Logo" className="mx-auto h-70 -mt-20 -mb-15"></img>
        {isLogin ? <Login /> : <Signup />}

        <p className="text-center mt-4 text-sm text-gray-400">
          {isLogin ? "Create new account" : "Already have an account?"}
          <button
            className="text-[#0037FF] ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign-up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}