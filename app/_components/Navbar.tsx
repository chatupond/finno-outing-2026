"use client"

import { useState, useEffect, useTransition, useRef } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut, signIn } from "next-auth/react"
import Image from "next/image"
import { checkMyRegistration, optOutTrip } from "@/app/actions/register"
import { useRegistrationModal } from "./RegistrationModalContext"
import { REGISTRATION_CLOSED } from "@/app/lib/config"

const sectionLinks = [
  { id: "attendees", label: "Attendees" },
  { id: "accommodation", label: "Resort" },
  { id: "schedule", label: "Schedule" },
  { id: "cars", label: "Cars" },
  { id: "bedrooms", label: "Bedrooms" },
  { id: "resort-map", label: "Map" },
  { id: "lunch", label: "Lunch" },
  { id: "cafes", label: "Cafés" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { isRegistered, setIsRegistered, openModal } = useRegistrationModal()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [optOutPending, startOptOut] = useTransition()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [])

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
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const hero = document.getElementById("home")
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight
      const past = window.scrollY + 64 >= heroBottom
      setPastHero(past)

      // Active link = last section whose top has passed just below the navbar
      let current: string | null = null
      for (const { id } of sectionLinks) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 96) current = id
      }
      setActiveId(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleJoin = () =>
    REGISTRATION_CLOSED
      ? openModal()
      : signIn("google", { redirectTo: "/?register=1" }, { prompt: "select_account" })

  const goTo = (id: string) => {
    setNavOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || navOpen
          ? "bg-secondary/95 backdrop-blur-md shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center">
          <Image
            src="/images/logo-mark.png"
            alt="Finnomena Builder Outing 2026"
            width={512}
            height={512}
            className="h-10 w-10 rounded-xl"
          />
        </button>

        {/* Section links (desktop) — appear once the hero is scrolled past */}
        <ul
          className={`hidden lg:flex items-center gap-1 ml-8 mr-auto transition-all duration-300 ${
            pastHero ? "opacity-100 visible" : "opacity-0 invisible -translate-y-1"
          }`}
        >
          {sectionLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); goTo(id) }}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeId === id ? "text-primary bg-white/8" : "text-white/70 hover:text-white hover:bg-white/8"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA (desktop) — on mobile it lives at the bottom of the hamburger menu */}
        <div className="hidden lg:flex items-center gap-3">
          {status === "authenticated" && session?.user ? (
            <div ref={menuRef} className="relative flex items-center gap-2">
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="flex items-center gap-2 cursor-pointer"
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
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
                  className={`w-3 h-3 text-white/30 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Popover */}
              <div className={`absolute top-full right-0 pt-3 transition-all duration-150 z-10 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div
                  className="rounded-xl border border-white/10 shadow-2xl py-1 min-w-[160px] overflow-hidden"
                  style={{ backgroundColor: "rgba(1, 23, 43, 0.97)", backdropFilter: "blur(12px)" }}
                >
                  <div className="px-4 py-2.5 border-b border-white/8">
                    <p className="text-white/40 text-xs truncate">{session.user.email}</p>
                  </div>
                  {isRegistered && !REGISTRATION_CLOSED && (
                    <>
                      <button
                        onClick={() => { setMenuOpen(false); handleOptOut() }}
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
                    onClick={() => { setMenuOpen(false); signOut() }}
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
              onClick={handleJoin}
              className="bg-primary text-secondary font-bold text-sm px-5 py-2 rounded-full hover:bg-yellow-300 transition-all duration-200 hover:scale-105"
            >
              Join trip now!
            </button>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setNavOpen(o => !o)}
          className="lg:hidden w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          aria-controls="mobile-nav"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {navOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          navOpen ? "max-h-[calc(100vh-4rem)] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-6 pb-4 pt-1 border-t border-white/8">
          {sectionLinks.map(({ id, label }) => (
            <li key={id} className="border-b border-white/5 last:border-0">
              <a
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); goTo(id) }}
                className={`block py-3 text-base font-medium transition-colors ${
                  activeId === id ? "text-primary" : "text-white/80 hover:text-white"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Join / account — last item in the menu */}
        <div className="px-6 pb-6 pt-2">
          {status === "authenticated" && session?.user ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3 mb-3">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-primary/40"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                    <span className="text-primary text-xs font-bold">
                      {session.user.name?.[0]?.toUpperCase() ?? "U"}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{session.user.name}</p>
                  <p className="text-white/40 text-xs truncate">{session.user.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {isRegistered && !REGISTRATION_CLOSED && (
                  <button
                    onClick={() => { setNavOpen(false); handleOptOut() }}
                    disabled={optOutPending}
                    className="flex-1 text-sm text-red-400/80 hover:text-red-400 border border-red-400/20 rounded-full py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {optOutPending ? "Opting out…" : "Opt out of trip"}
                  </button>
                )}
                <button
                  onClick={() => { setNavOpen(false); signOut() }}
                  className="flex-1 text-sm text-white/60 hover:text-white border border-white/10 rounded-full py-2 transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setNavOpen(false); handleJoin() }}
              className="w-full bg-primary text-secondary font-bold text-sm py-3 rounded-full hover:bg-yellow-300 transition-colors duration-200"
            >
              Join trip now!
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
