"use client"

import { useActionState, useEffect } from "react"
import Image from "next/image"
import { registerAttendee, type RegisterState } from "@/app/actions/register"
import { useRegistrationModal } from "./RegistrationModalContext"

const teams = [
  "NextSpace",
  "Starlight",
  "Beacon",
  "Kernel",
  "Luminous",
  "Prima",
  "Eternize",
  "Neuron",
  "Tech Support",
  "Tech Lead",
  "SRE",
  "Architect & Staff Engineer",
  "DBS",
  "Product",
  "UX",
  "Mobility",
  "Others",
]

const initialState: RegisterState = {}

type Props = {
  name: string
  email: string
  image?: string | null
}

export default function RegistrationForm({ name, email, image }: Props) {
  const [state, formAction, pending] = useActionState(registerAttendee, initialState)
  const { closeModal, setIsRegistered } = useRegistrationModal()

  useEffect(() => {
    if (state.success) setIsRegistered(true)
  }, [state.success])

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
          <svg className="w-9 h-9 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-white text-2xl font-bold mb-2">You&apos;re registered!</h3>
          <p className="text-white/60">
            Welcome to Finnomena Tech Outing 2026. See you in Kanchanaburi! 🎉
          </p>
        </div>
        <a
          href="#attendees"
          onClick={closeModal}
          className="text-primary text-sm font-medium hover:underline"
        >
          View all attendees →
        </a>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <h3 className="text-white text-xl font-bold mb-1">Complete Registration</h3>
        <p className="text-white/50 text-sm">Select your team to confirm your spot</p>
      </div>

      <form action={formAction} className="space-y-5">
        {/* Name (readonly) */}
        <div>
          <label className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-2">
            Your Name
          </label>
          <div className="flex items-center gap-3 glass rounded-xl px-4 py-3">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={28}
                height={28}
                className="rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-xs font-bold">
                  {name[0]?.toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-white font-medium text-sm">{name}</span>
            <span className="ml-auto text-white/30 text-xs">{email}</span>
          </div>
        </div>

        {/* Team */}
        <div>
          <label
            htmlFor="team"
            className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-2"
          >
            Select Your Team <span className="text-primary">*</span>
          </label>
          <select
            id="team"
            name="team"
            required
            defaultValue=""
            className="w-full glass rounded-xl px-4 py-3 text-white text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent"
          >
            <option value="" disabled className="bg-secondary text-white/60">
              Choose your team...
            </option>
            {teams.map((team) => (
              <option key={team} value={team} className="bg-secondary text-white">
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
        {state.error && (
          <p className="text-red-400 text-sm bg-red-400/10 rounded-xl px-4 py-3 border border-red-400/20">
            {state.error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-primary text-secondary font-bold text-base py-4 rounded-xl hover:bg-yellow-300 transition-all duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
        >
          {pending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Confirming...
            </>
          ) : (
            "Confirm Registration"
          )}
        </button>
      </form>
    </>
  )
}
