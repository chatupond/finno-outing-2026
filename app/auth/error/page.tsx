import Link from "next/link"
import Image from "next/image"
import { ALLOWED_DOMAINS } from "@/app/lib/config"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-6">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Finnomena Tech Outing 2026"
            width={750}
            height={612}
            className="h-16 w-auto"
          />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>

          <h1 className="text-white text-xl font-bold mb-2">Access Denied</h1>
          <p className="text-white/50 text-sm leading-relaxed mb-1">
            Your email is not eligible to access this event.
          </p>
          <p className="text-white/40 text-sm mb-8">
            Only{" "}
            {ALLOWED_DOMAINS.map((d, i) => (
              <span key={d}>
                <span className="text-primary font-medium">@{d}</span>
                {i < ALLOWED_DOMAINS.length - 1 && " and "}
              </span>
            ))}{" "}
            accounts are allowed.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-secondary font-bold text-sm px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
