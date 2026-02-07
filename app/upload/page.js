"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an audio file");
      return;
    }

    setLoading(true);

    
    setTimeout(() => {
      setLoading(false);
      alert("Meeting processed successfully!");
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-100 to-blue-200" />
      <div className="absolute inset-0 bg-white/50" />


      <div className="relative z-10 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          
          
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center">
            Upload Meeting
          </h1>

          
          <p className="mt-2 text-gray-600 text-center">
            Upload your meeting audio and let AI generate summaries and action items.
          </p>

          
          <div className="mt-6">
            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:border-blue-500 transition">
              <span className="text-gray-500">
                Click to upload or drag & drop
              </span>
              <span className="text-sm text-gray-400 mt-1">
                (MP3, WAV, M4A)
              </span>

              {file && (
                <span className="mt-3 text-sm font-medium text-blue-600">
                  {file.name}
                </span>
              )}

              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Processing..." : "Upload & Process"}
          </button>

          
          <p className="mt-6 text-sm italic text-center text-blue-500">
            “Let AI take notes while you stay present.”
          </p>
        </div>

      </div>
    </div>
  );
}