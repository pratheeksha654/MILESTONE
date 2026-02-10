"use client"
import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import FeaturesSection from "../components/FeatureSection"
import ImageTextSection from "../components/ImageTextSection"
import Link from "next/link";

export default function Home(){
  return (
    <div className="w-full">
    <Header/>
      
      <section
        className="relative h-[90vh] flex items-center justify-center text-center px-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        
        <div className="absolute inset-0 bg-black/40"></div>

        
        <div className="relative z-10 max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl text-blue-500 font-semibold leading-tight">
            Turn Meetings Into Clear Action
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            MinuteAI helps you convert meeting audio into accurate transcripts,
            smart summaries, and actionable insights using AI.
          </p>
          <Link
            href="/signup"
            className="inline-block mt-6 px-6 py-3 rounded-full bg-blue-400 text-gray-900 font-medium
             hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      
      <FeaturesSection/>
      <ImageTextSection/>

      
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt=""
            className="rounded-3xl shadow-sm mx-auto mb-10"
          />

          <h2 className="text-3xl font-semibold text-blue-600">
            Built for Students & Teams
          </h2>
          <p className="mt-5 dark:text-gray-100 text-gray-600 text-lg">
            MinuteAI is built to support both students and teams who depend on meetings and discussions every day. For students, it helps capture key points from online classes, seminars, and group discussions, making learning and revision more effective.
             For teams, it simplifies meeting follow-ups by converting conversations into clear summaries and actionable tasks, ensuring nothing important is missed. 
            By eliminating the need to manually take notes or replay recordings, MinuteAI saves time, improves focus, and keeps everyone organized and productive.
          </p>
        </div>
      </section>
      <Footer/>

    </div>
  );
}