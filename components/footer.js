import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f9f7f4] border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">

        
        <div className="grid gap-10 md:grid-cols-4 text-gray-700">

          
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              MinuteAI
            </h3>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              MinuteAI helps students and teams turn meeting audio into clear
              transcripts, summaries, and action items using AI.
            </p>
          </div>

          
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/profile">Profile</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase">
              Contact
            </h4>
            <p className="mt-4 text-sm">minuteai@gmail.com</p>
            <p className="mt-2 text-sm">@minuteai.ai</p>
          </div>

        
          <div>
            <h4 className="text-sm font-semibold text-gray-800 uppercase">
              Authors
            </h4>
            <p className="mt-4 text-sm">Prajna</p>
            <p className="text-sm">Pratheeksha</p>
            <p className="text-sm">Tejal</p>
          </div>
        </div>

        
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} MinuteAi. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
