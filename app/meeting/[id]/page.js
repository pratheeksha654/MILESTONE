"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function MeetingDetailPage() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    fetch("/api/summarize")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((m) => m.id === id);
        setMeeting(found);
      });
  }, [id]);

  if (!meeting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading meeting...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">

        <Link href="/meetings" className="text-blue-600 text-sm">
          ← Back to meetings
        </Link>

        <h1 className="text-2xl font-bold mt-4 mb-1">
          {meeting.title}
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          {meeting.date}
        </p>

        <h2 className="text-lg font-semibold text-blue-700 mb-2">
          AI Generated Summary
        </h2>

        <pre className="bg-blue-50 p-4 rounded-lg whitespace-pre-wrap text-gray-800">
          {meeting.summary}
        </pre>
      </div>
    </div>
  );
}
