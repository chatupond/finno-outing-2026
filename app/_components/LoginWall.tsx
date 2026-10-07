"use client"

import { signIn } from "next-auth/react"
import { GoogleIcon } from "./BrandIcons"

type LoginWallProps = {
  /** Section id to scroll back to after signing in */
  sectionId: string
  title: string
  description: string
  tone?: "light" | "dark"
  /**
   * Preview rendered behind the blur. Pass placeholder data only — anything
   * here still ships in the HTML, so never pass the real (private) data.
   */
  children: React.ReactNode
}

export default function LoginWall({ sectionId, title, description, tone = "light", children }: LoginWallProps) {
  const dark = tone === "dark"

  return (
    <div className="relative">
      {/* Gaussian-blurred preview */}
      <div aria-hidden inert className="blur-[10px] select-none pointer-events-none">
        {children}
      </div>

      {/* Fade the blurred preview into the section background */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-transparent ${
          dark ? "via-secondary/40 to-secondary" : "via-white/30 to-white/80"
        }`}
      />

      {/* Card stays in view while the blurred content scrolls past */}
      <div className="absolute inset-0 flex justify-center px-2">
        <div className="sticky top-28 self-start mt-12 w-full max-w-sm">
          <div
            className={`rounded-3xl p-8 text-center shadow-2xl ${
              dark ? "glass shadow-black/30" : "glass-light border-secondary/10 shadow-secondary/15"
            }`}
          >
            <div
              className={`mx-auto mb-5 w-14 h-14 rounded-2xl flex items-center justify-center ${
                dark ? "bg-primary/15 text-primary" : "bg-secondary text-primary"
              }`}
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <p className={`font-black text-xl mb-2 ${dark ? "text-white" : "text-secondary"}`}>{title}</p>
            <p className={`text-sm mb-6 ${dark ? "text-white/60" : "text-dark-text/60"}`}>{description}</p>
            <button
              onClick={() => signIn("google", { redirectTo: `/?scrollTo=${sectionId}` }, { prompt: "select_account" })}
              className={`w-full inline-flex items-center justify-center gap-3 font-semibold text-sm py-3 px-6 rounded-xl transition-colors duration-200 shadow-sm ${
                dark ? "bg-white text-secondary hover:bg-white/85" : "bg-secondary text-white hover:bg-secondary/85"
              }`}
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
