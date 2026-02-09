"use client";

import { useEffect, useState } from "react";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("meetings")) || [];
    setMeetings(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 px-4 sm:px-8 py-8">

      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
          Past Meetings
        </h1>
        <p className="text-gray-600 mt-1">
          Review your AI-generated meeting summaries
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {meetings.length === 0 ? (
          <div className="bg-white/80 backdrop-blur p-10 rounded-2xl shadow text-center">
            <p className="text-gray-600 text-lg">
              No meetings found.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Upload a meeting to see AI summaries here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="group bg-white/90 backdrop-blur p-6 rounded-2xl shadow hover:shadow-xl transition"
              >
            
                <span className="inline-block mb-3 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  {meeting.createdAt}
                </span>

             
                <h2 className="font-semibold text-xl text-gray-900 group-hover:text-blue-700 transition">
                  {meeting.title}
                </h2>

       
                <pre className="mt-4 whitespace-pre-wrap text-sm text-gray-700 line-clamp-6">
                  {meeting.aiOutput}
                </pre>

             
                <div className="mt-4 text-sm text-blue-600 font-medium">
                  View details →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
