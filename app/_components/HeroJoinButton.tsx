"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRegistrationModal } from "./RegistrationModalContext"

export default function HeroJoinButton() {
  const { status } = useSession()
  const { openModal } = useRegistrationModal()
  const [loading, setLoading] = useState(false)

  const isSessionLoading = status === "loading"

  const handleClick = async () => {
    if (status === "authenticated") {
      openModal()
    } else if (status === "unauthenticated") {
      setLoading(true)
      await signIn("google", { redirectTo: "/?register=1" }, { prompt: "select_account" })
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || isSessionLoading}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-secondary font-bold text-sm sm:text-base px-5 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-yellow-300 transition-all duration-200 hover:scale-105 shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
    >
      {loading || isSessionLoading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {loading ? "Redirecting…" : "Loading…"}
        </>
      ) : (
        <>
          Join trip now!
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </>
      )}
    </button>
  )
}
