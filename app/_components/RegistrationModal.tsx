"use client"

import { useEffect, useState, useTransition, useActionState } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRegistrationModal } from "./RegistrationModalContext"
import { checkMyRegistration, optOutTrip, type OptOutState } from "@/app/actions/register"
import { ALLOWED_DOMAINS, isAllowedEmail } from "@/app/lib/config"
import RegistrationForm from "./RegistrationForm"

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <svg className="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </div>
  )
}

function NotEligible({ email, onClose }: { email: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-4">
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <div>
        <h3 className="text-white text-lg font-bold mb-1">Access Restricted</h3>
        <p className="text-white/50 text-sm leading-relaxed">
          <span className="text-white/80">{email}</span> is not eligible.
          <br />
          Registration is open to{" "}
          {ALLOWED_DOMAINS.map((d, i) => (
            <span key={d}>
              <span className="text-primary font-medium">@{d}</span>
              {i < ALLOWED_DOMAINS.length - 1 && ", "}
            </span>
          ))}{" "}
          accounts only.
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-white/40 hover:text-white/70 text-sm transition-colors"
      >
        Close
      </button>
    </div>
  )
}

const optOutInitial: OptOutState = {}

function AlreadyRegistered({ name, onClose }: { name: string; onClose: () => void }) {
  const [confirming, setConfirming] = useState(false)
  const [optOutState, optOutAction, pending] = useActionState(optOutTrip, optOutInitial)

  if (optOutState.success) {
    return (
      <div className="flex flex-col items-center text-center gap-5 py-4">
        <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <h3 className="text-white text-xl font-bold mb-1">You&apos;ve opted out</h3>
          <p className="text-white/50 text-sm">
            Your registration has been removed. You can re-register anytime.
          </p>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          Close
        </button>
      </div>
    )
  }

  if (confirming) {
    return (
      <div className="flex flex-col items-center text-center gap-5 py-4">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-1">Confirm Opt Out</h3>
          <p className="text-white/50 text-sm leading-relaxed">
            This will remove your registration from the event. You can sign up again later if you change your mind.
          </p>
        </div>

        {optOutState.error && (
          <p className="text-red-400 text-sm bg-red-400/10 rounded-xl px-4 py-2 border border-red-400/20 w-full text-center">
            {optOutState.error}
          </p>
        )}

        <div className="flex gap-3 w-full">
          <button
            onClick={() => setConfirming(false)}
            disabled={pending}
            className="flex-1 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <form action={optOutAction} className="flex-1">
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {pending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Removing...
                </>
              ) : (
                "Yes, Opt Out"
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center text-center gap-5 py-4">
      <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="text-white text-xl font-bold mb-1">
          Registered, {name.split(" ")[0]}! 🎉
        </h3>
        <p className="text-white/60 text-sm">
          Your seat is confirmed. See you at Heaven Kwai Resort!
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-primary text-secondary font-bold text-sm hover:bg-yellow-300 transition-colors"
        >
          Close
        </button>
        <button
          onClick={() => setConfirming(true)}
          className="text-white/30 hover:text-red-400 text-xs transition-colors py-1"
        >
          Opt out of this trip
        </button>
      </div>
    </div>
  )
}

function SignInPrompt() {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-4">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </div>
      <div>
        <h3 className="text-white text-xl font-bold mb-1">Sign in to Register</h3>
        <p className="text-white/50 text-sm leading-relaxed">
          Use your Google account to secure your spot at Finnomena Tech Outing 2026.
        </p>
      </div>
      <button
        onClick={() => signIn("google", { redirectTo: "/?register=1" })}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold text-sm py-3.5 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>
      <p className="text-white/30 text-xs">
        Your name and team will be shared with the event organizers.
      </p>
    </div>
  )
}

export default function RegistrationModal() {
  const { isOpen, closeModal } = useRegistrationModal()
  const { data: session, status } = useSession()
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null)
  const [, startTransition] = useTransition()

  // Check registration status server-side when modal opens
  useEffect(() => {
    if (!isOpen) {
      setIsRegistered(null)
      return
    }
    if (status === "authenticated" && session?.user?.email) {
      setIsRegistered(null)
      startTransition(async () => {
        const registered = await checkMyRegistration()
        setIsRegistered(registered)
      })
    }
  }, [isOpen, status, session?.user?.email])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, closeModal])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  if (!isOpen) return null

  const email = session?.user?.email ?? ""
  const isEligible = isAllowedEmail(email)

  const renderContent = () => {
    if (status === "loading" || (status === "authenticated" && isRegistered === null)) {
      return <Spinner />
    }
    if (status === "unauthenticated") {
      return <SignInPrompt />
    }
    if (!isEligible) {
      return <NotEligible email={email} onClose={closeModal} />
    }
    if (isRegistered) {
      return (
        <AlreadyRegistered
          name={session?.user?.name ?? "there"}
          onClose={closeModal}
        />
      )
    }
    return (
      <RegistrationForm
        name={session?.user?.name ?? email ?? "User"}
        email={email}
        image={session?.user?.image}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        style={{ backgroundColor: "rgba(1, 23, 43, 0.97)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                <span className="text-secondary text-[10px] font-black">F</span>
              </div>
              <span className="text-white/50 text-xs font-medium tracking-wider uppercase">
                Finnomena Tech Outing 2026
              </span>
            </div>
            <h2 className="text-white text-lg font-bold">Register for the Event</h2>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors duration-200"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-7 py-6">{renderContent()}</div>

        {/* Footer */}
        <div className="px-7 pb-6">
          <p className="text-white/20 text-xs text-center">
            16–17 October 2026 · Heaven Kwai Resort, Kanchanaburi
          </p>
        </div>
      </div>
    </div>
  )
}
