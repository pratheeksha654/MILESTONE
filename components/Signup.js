"use client";

import { useState } from "react";
import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  // Email/password signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up user:", userCredential.user);
      alert("Signup successful!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  // Google signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google user:", user);
      alert("Signed in with Google!");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="w-full bg-white">
      <h2 className="text-2xl text-black font-semibold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create password"
          className="w-full p-2 border rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-2 border rounded text-black"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-[#0037FF] text-white py-2 rounded hover:bg-blue-800"
        >
          Create Account
        </button>
      </form>

      <button
        type="button"
        onClick={handleGoogleSignup}
        className="w-full mt-2 bg-white border flex items-center justify-center gap-2 border-black text-black py-2 rounded"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
          className="h-7"
          alt="Google logo"
        />
        Continue with Google
      </button>
    </div>
  );
}
