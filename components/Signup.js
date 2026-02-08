import { useState } from "react";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();
    if(password !== confirmpassword){
      alert("Passwords do not match");
      return;
    }
    console.log("SignUp:", email, password);
  };

  return (
    <div className="w-full bg-white">
      <h2 className="text-2xl text-black font-semibold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded text-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        <input
          type="password"
          placeholder="Create password"
          className="w-full p-2 border rounded text-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-2 border rounded text-gray-500"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
        <button type="submit"className="w-full bg-[#0037FF] text-white py-2 rounded hover:bg-blue-800">
          Create Account
        </button>
      </form>
    </div>
  );
}