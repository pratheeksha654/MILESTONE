"use client";

import { useState } from "react";

export default function UploadMeeting() {
  const [title, setTitle] = useState("");
  const [audio, setAudio] = useState(null); // local only
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState("");

  // ✅ Save meeting to localStorage
  const saveMeeting = (title, transcript, aiOutput) => {
    const existing =
      JSON.parse(localStorage.getItem("meetings")) || [];

    const newMeeting = {
      id: Date.now(),
      title: title || "Untitled Meeting",
      transcript,
      aiOutput,
      createdAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "meetings",
      JSON.stringify([newMeeting, ...existing])
    );
  };

  // ✅ Generate AI summary
  const generateSummary = async () => {
    if (!transcript) {
      alert("Please paste the meeting transcript");
      return;
    }

    try {
      setLoading(true);
      setAiOutput("");

      const res = await fetch("/api/gemini-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          transcript,
        }),
      });

      const data = await res.json();

      setAiOutput(data.result);

      // ✅ Store output locally
      saveMeeting(title, transcript, data.result);

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to generate AI summary");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        AI Meeting Summary
      </h1>

      {/* Meeting Title */}
      <input
        className="w-full border p-2 mb-4 rounded"
        placeholder="Meeting Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Audio Upload (LOCAL ONLY) */}
      <input
        type="file"
        accept="audio/*"
        className="w-full mb-2"
        onChange={(e) => setAudio(e.target.files[0])}
      />

      {audio && (
        <p className="text-sm text-gray-600 mb-4">
          Selected audio: <strong>{audio.name}</strong>
        </p>
      )}

      {/* Transcript */}
      <textarea
        className="w-full border p-3 mb-4 rounded h-56"
        placeholder="Paste meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />

      {/* Generate Button */}
      <button
        onClick={generateSummary}
        className="bg-blue-600 text-white px-6 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate AI Summary"}
      </button>

      {/* AI Output */}
      {aiOutput && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">
            AI Generated Output
          </h2>
          <pre className="whitespace-pre-wrap text-sm">
            {aiOutput}
          </pre>
        </div>
      )}
    </div>
  );
}