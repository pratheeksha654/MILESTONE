"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";

export default function ProfileEdit() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const { profile, setProfile, updateProfileField } = useUserStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) return;

      setUser(currentUser);

      const ref = doc(db, "users", currentUser.uid);
      const snap = await getDoc(ref);

      
      if (snap.exists()) {
        router.push("/profile");
        return;
      }
    });

    return () => unsub();
  }, [router]);

  const handleChange = (e) => {
    updateProfileField(e.target.name, e.target.value);
  };

  const saveProfile = async () => {
    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        ...profile,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    alert("Profile updated successfully");

    
    router.push("/profile");
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center p-6
        bg-gradient-to-br from-indigo-100 to-purple-200
        dark:from-gray-900 dark:to-gray-800
        transition-colors duration-300
      "
    >
      <div
        className="
          bg-white dark:bg-gray-800
          w-full max-w-xl
          rounded-2xl shadow-xl p-8
        "
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Profile Settings
        </h1>

        <div className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
          <Input
            label="Age"
            name="age"
            type="number"
            value={profile.age}
            onChange={handleChange}
          />
          <Input
            label="Role"
            name="role"
            value={profile.role}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Bio
            </label>
            <textarea
              name="bio"
              rows="4"
              value={profile.bio}
              onChange={handleChange}
              className="
                w-full mt-1 p-3 rounded-lg border
                bg-white dark:bg-gray-700
                text-gray-800 dark:text-gray-100
                border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>

          <button
            onClick={saveProfile}
            className="
              w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-indigo-600 to-purple-600
              hover:opacity-90 transition
            "
          >
            Edit & View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </label>
      <input
        {...props}
        className="
          w-full mt-1 p-3 rounded-lg border
          bg-white dark:bg-gray-700
          text-gray-800 dark:text-gray-100
          border-gray-300 dark:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
      />
    </div>
  );
}
