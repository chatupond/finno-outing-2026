"use client"

import { signIn } from "next-auth/react"

export default function AttendeesLoginGate() {
  return (
    <section id="attendees" className="relative py-28 bg-white section-divider">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section title */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-white text-xs font-semibold tracking-widest uppercase">
              Who&apos;s Coming
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-secondary tracking-tight leading-none">
            Registered
            <br />
            <span className="text-secondary/60">Attendees</span>
          </h2>
        </div>

        {/* Login gate */}
        <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
          <div className="w-20 h-20 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-secondary/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <div>
            <p className="text-secondary font-bold text-xl mb-2">
              Log in to view the attendee list
            </p>
            <p className="text-dark-text/50 text-sm">
              Sign in with your Google account to see who&apos;s joining the trip.
            </p>
          </div>
          <button
            onClick={() => signIn("google", { redirectTo: "/?scrollTo=attendees" }, { prompt: "select_account" })}
            className="flex items-center gap-3 bg-secondary text-white font-semibold text-sm py-3 px-6 rounded-xl hover:bg-secondary/80 transition-colors duration-200 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </section>
  )
}
