"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Header  from "@/components/header";
import Footer from "@/components/footer";


export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [audio, setAudio] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSummary = async () => {
    setError("");
    setAiOutput("");

    if (!transcript.trim()) {
      setError("Please paste the meeting transcript.");
      return;
    }

    if (transcript.length > 10000) {
      setError("Transcript is too long.");
      return;
    }

    try {
      setLoading(true);

      
      const user = auth.currentUser;
      if (!user) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

  
      const token = await user.getIdToken();

      
      const res = await fetch("/api/gemini-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          transcript,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.result || "Failed to generate summary.");
        setLoading(false);
        return;
      }

      
      setAiOutput(data.result);

      
      await addDoc(collection(db, "meetings"), {
        userId: user.uid,                          
        title: title || "Untitled Meeting",
        aiOutput: data.result,
        createdAt: serverTimestamp(),              
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header/>
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 dark:from-gray-900 dark:via-gray-900 dark:to-black">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 sm:p-8">

        
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">
          Upload Meeting
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Upload your meeting audio or paste transcript to generate AI summaries.
        </p>

        
        {error && (
          <p className="mb-4 text-red-600 font-medium">
            {error}
          </p>
        )}

        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Meeting Title (optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Team Sync / Client Call"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Audio (optional)
          </label>

          <div className="border-2 border-dashed border-blue-300 dark:border-blue-500 rounded-xl p-6 text-center bg-blue-50 dark:bg-gray-800">
            <input
              type="file"
              accept="audio/*"
              id="audioUpload"
              className="hidden"
              onChange={(e) => setAudio(e.target.files?.[0] || null)}
            />

            <label
              htmlFor="audioUpload"
              className="cursor-pointer text-blue-600 dark:text-blue-400 font-medium"
            >
              Tap to choose audio file
            </label>

            {audio && (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                Selected: <strong>{audio.name}</strong>
              </p>
            )}
          </div>
        </div>

      
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Paste Transcript
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste meeting transcript here..."
            className="w-full h-52 sm:h-60 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            {transcript.length} / 10000 characters
          </p>
        </div>

        
        <div className="flex justify-end">
          <button
            onClick={generateSummary}
            disabled={loading}
            className={`px-8 py-3 rounded-xl text-white font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Generating..." : "Generate AI Summary"}
          </button>
        </div>

        
        {aiOutput && (
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
              AI Generated Output
            </h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
              {aiOutput}
            </pre>
          </div>
        )}

      </div>
    </div>
    <Footer/>
    </div>
  );
}