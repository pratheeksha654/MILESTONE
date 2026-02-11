"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import Footer from "../../components/footer";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [meeting, setMeeting] = useState({
    title: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setUser(currentUser);

      const ref = doc(db, "users", currentUser.uid);
      const snap = await getDoc(ref);

      
      if (!snap.exists()) {
        router.push("/profile-edit");
        return;
      }

      setProfile(snap.data());
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  const handleMeetingChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const addMeeting = async () => {
    if (!user || !meeting.title || !meeting.date || !meeting.time) return;

    await addDoc(collection(db, "upcomingMeetings"), {
      title: meeting.title,
      date: meeting.date,
      time: meeting.time,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });

    setMeeting({ title: "", date: "", time: "" });
    alert("Reminder added! Check Dashboard");
  };

  const logoutUser = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-700 dark:text-gray-300">
        Please login
      </div>
    );
  }

  return (
    <>
      <Header />

      <div
        className="
          min-h-screen p-4 sm:p-6
          bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100
          dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
          transition-colors duration-300
        "
      >
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8">
            <div className="text-center">
              <div
                className="
                  w-24 h-24 mx-auto rounded-full
                  bg-gradient-to-r from-indigo-500 to-pink-500
                  flex items-center justify-center
                  text-white text-3xl font-bold
                "
              >
                {profile?.name?.charAt(0) || "U"}
              </div>

              <h2 className="text-xl font-bold mt-4 text-gray-800 dark:text-gray-100">
                {profile?.name}
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                {profile?.role}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <Info label="Email" value={profile?.email} />
              <Info label="Age" value={profile?.age} />
              <Info label="Bio" value={profile?.bio} />
            </div>

            <button
              onClick={logoutUser}
              className="
                w-full mt-6
                bg-red-600 hover:bg-red-700
                text-white py-3 rounded-xl font-semibold
                transition
              "
            >
              Logout
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 sm:p-8">
            <h2 className="font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Add Upcoming Meeting
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="title"
                className="p-2 border rounded sm:col-span-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                placeholder="Meeting title"
                value={meeting.title}
                onChange={handleMeetingChange}
              />

              <input
                type="date"
                name="date"
                className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                value={meeting.date}
                onChange={handleMeetingChange}
              />

              <input
                type="time"
                name="time"
                className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                value={meeting.time}
                onChange={handleMeetingChange}
              />

              <button
                onClick={addMeeting}
                className="sm:col-span-1 bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
      <span className="text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="font-medium text-gray-800 dark:text-gray-100">
        {value || "-"}
      </span>
    </div>
  );
}
