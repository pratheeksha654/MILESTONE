"use client";

import DashboardCard from "@/components/DashboardCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* WOW BACKGROUND (soft blue like your image) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-100 to-blue-200" />

      {/* Optional soft overlay for smoothness */}
      <div className="absolute inset-0 bg-white/50" />

      {/* CONTENT */}
      <div className="relative z-10 transition-colors duration-300">

        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-8 py-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-blue-700">
            Dashboard
          </h1>
        </header>

        {/* Quote Section */}
        <section className="px-4 sm:px-8 mt-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow animate-fadeIn">
            <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-200 text-center">
              “Meetings are more productive when you focus on listening, not
              writing.”
            </p>
          </div>
        </section>

        {/* Cards Section */}
        <section className="px-4 sm:px-8 mt-8 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <DashboardCard
              title="Upload Meeting"
              description="Upload your meeting audio and let AI generate summaries and action items."
              link="/upload"
              linkText="Get Started"
            />

            <DashboardCard
              title="Past Meetings"
              description="View summaries and action items from your previous meetings."
              link="/meetings"
              linkText="View Meetings"
            />

            <DashboardCard
              title="AI Powered Insights"
              description="Automatically generated insights using Gemini AI."
              className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
            />

          </div>
        </section>

      </div>
    </div>
  );
}
