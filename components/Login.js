"use client";
import { useState } from "react";
export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", email, password);
  };
  return (
    <div className="w-full bg-white">
      <h2 className="text-2xl text-black font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded text-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded text-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"className="w-full bg-[#0037FF] text-white py-2 rounded hover:bg-blue-800">
          Login
        </button>
      </form>
    </div>
  );
}