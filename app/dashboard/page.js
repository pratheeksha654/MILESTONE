"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import DashboardCard from "@/components/DashboardCard";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const auth = getAuth();

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const q = query(
        collection(db, "upcomingMeetings"),
        where("userId", "==", user.uid),
        orderBy("date", "asc")
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMeetings(data);
    });

    return () => unsub();
  }, []);

  return (
    <div
      className="
        min-h-screen relative overflow-hidden
        bg-gradient-to-br from-blue-100 via-sky-100 to-blue-200
        dark:from-gray-900 dark:via-gray-800 dark:to-black
      "
    >
      <div className="absolute inset-0 bg-white/50 dark:bg-black/60" />

      <Header />

      <div className="relative z-10">

      
        <header className="px-8 py-4">
          <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400">
            Dashboard
          </h1>
        </header>

        
        <section className="px-8 mt-8 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <DashboardCard
              title="Upload Meeting"
              description="Upload meeting audio and generate AI summaries."
              link="/upload"
              linkText="Get Started"
            />

            <DashboardCard
              title="Past Meetings"
              description="View your previous meetings."
              link="/meetings"
              linkText="View"
            />

            <DashboardCard
              title="AI Powered Insights"
              description="Insights generated using Gemini AI."
            />

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 lg:col-span-3">
              <h2 className="font-semibold mb-6 text-blue-700 dark:text-blue-400 text-2xl">
                Upcoming Meetings
              </h2>

              {meetings.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No upcoming meetings
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {meetings.map((m) => (
                    <div
                      key={m.id}
                      className="bg-blue-50 dark:bg-gray-800 rounded-xl p-4"
                    >
                      <p className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                        {m.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        📅 {m.date}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ⏰ {m.time}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}