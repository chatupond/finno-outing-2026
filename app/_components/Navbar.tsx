"use client"

import { useState, useEffect, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession, signOut, signIn } from "next-auth/react"
import Image from "next/image"
import { checkMyRegistration, optOutTrip } from "@/app/actions/register"
import { useRegistrationModal } from "./RegistrationModalContext"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { isRegistered, setIsRegistered } = useRegistrationModal()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [optOutPending, startOptOut] = useTransition()

  useEffect(() => {
    if (status === "authenticated") {
      checkMyRegistration().then(setIsRegistered)
    } else {
      setIsRegistered(false)
    }
  }, [status])

  const handleOptOut = () => {
    if (!window.confirm("Are you sure you want to opt out of the trip?")) return
    startOptOut(async () => {
      await optOutTrip({})
      setIsRegistered(false)
      router.refresh()
    })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="#home" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Finnomena Tech Outing 2026"
            width={750}
            height={612}
            className="h-10 w-auto"
          />
        </Link>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {status === "authenticated" && session?.user ? (
            <div className="group relative flex items-center gap-2 cursor-default">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-primary/40"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                  <span className="text-primary text-xs font-bold">
                    {session.user.name?.[0]?.toUpperCase() ?? "U"}
                  </span>
                </div>
              )}
              <span className="text-white/80 text-sm font-medium select-none">
                {session.user.name?.split(" ")[0]}
              </span>
              <svg
                className="w-3 h-3 text-white/30 transition-transform duration-200 group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>

              {/* Popover */}
              <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-10">
                <div
                  className="rounded-xl border border-white/10 shadow-2xl py-1 min-w-[160px] overflow-hidden"
                  style={{ backgroundColor: "rgba(1, 23, 43, 0.97)", backdropFilter: "blur(12px)" }}
                >
                  <div className="px-4 py-2.5 border-b border-white/8">
                    <p className="text-white/40 text-xs truncate">{session.user.email}</p>
                  </div>
                  {isRegistered && (
                    <>
                      <button
                        onClick={handleOptOut}
                        disabled={optOutPending}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-400/8 transition-colors flex items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {optOutPending ? (
                          <svg className="w-4 h-4 flex-shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        {optOutPending ? "Opting out…" : "Opt out of trip"}
                      </button>
                      <div className="border-t border-white/8" />
                    </>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/8 transition-colors flex items-center gap-2.5"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => signIn("google", { redirectTo: "/?register=1" }, { prompt: "select_account" })}
              className="bg-primary text-secondary font-bold text-sm px-5 py-2 rounded-full hover:bg-yellow-300 transition-all duration-200 hover:scale-105"
            >
              Join trip now!
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
