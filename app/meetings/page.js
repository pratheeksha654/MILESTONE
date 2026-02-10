"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import Header  from "../../components/header";
import Footer from "../../components/footer";


export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError("Please login to view past meetings.");
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "meetings"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMeetings(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load meetings");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-500 dark:text-gray-400">
        Loading meetings…
      </div>
    );
  }

  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white px-4 py-6">
  
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          Past Meetings
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 p-3 text-sm">
            {error}
          </div>
        )}

        {meetings.length === 0 && !error && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            No past meetings found.
          </p>
        )}

        <div className="space-y-6">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="rounded-xl p-4 sm:p-6 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800"
            >
              <h2 className="text-lg font-semibold mb-3">
                {meeting.title || "Untitled Meeting"}
              </h2>

            
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {meeting.aiOutput}
              </pre>
              
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
