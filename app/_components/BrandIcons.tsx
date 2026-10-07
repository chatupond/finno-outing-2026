import { useId } from "react"

/** Full-colour brand icons for the map / social link buttons. */

export function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {/* White disc shows through the "f" cut out of the official logo shape */}
      <circle cx="12" cy="12" r="11" fill="#fff" />
      <path
        fill="#0866FF"
        d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
      />
    </svg>
  )
}

export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  const id = useId()
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="0.3" cy="1.07" r="1.3">
          <stop offset="0" stopColor="#FDF497" />
          <stop offset="0.1" stopColor="#FDF497" />
          <stop offset="0.5" stopColor="#FD5949" />
          <stop offset="0.68" stopColor="#D6249F" />
          <stop offset="1" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill={`url(#${id})`} />
      <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.3" cy="7.7" r="1.05" fill="#fff" />
    </svg>
  )
}

export function GoogleMapsIcon({ className = "w-5 h-5" }: { className?: string }) {
  const id = useId()
  const pin =
    "M12 1C7.3 1 3.5 4.7 3.5 9.3c0 6.1 7.1 12.6 7.8 13.2a1.05 1.05 0 0 0 1.4 0c.7-.6 7.8-7.1 7.8-13.2C20.5 4.7 16.7 1 12 1Z"
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <path d={pin} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="24" height="24" fill="#34A853" />
        <path fill="#FBBC04" d="M0 9.3h12L0 21.3Z" />
        <path fill="#4285F4" d="M0 0h12v9.3H0Z" />
        <path fill="#EA4335" d="M12 0h12v9.3H12Z" />
      </g>
      <circle cx="12" cy="9.3" r="3.1" fill="#fff" />
    </svg>
  )
}

export function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}
