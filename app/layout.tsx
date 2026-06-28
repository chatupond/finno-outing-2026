import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import SessionProvider from "./_components/SessionProvider"
import RegistrationModalWrapper from "./_components/RegistrationModalWrapper"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Finnomena Tech Outing 2026",
  description:
    "Team outing and team building experience — 16–17 October 2026 at Heaven Kwai Resort, Kanchanaburi",
  openGraph: {
    title: "Finnomena Tech Outing 2026",
    description:
      "Join us for an unforgettable team building experience at Heaven Kwai Resort, Kanchanaburi.",
    type: "website",
    locale: "en_TH",
    siteName: "Finnomena Tech Outing 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finnomena Tech Outing 2026",
    description:
      "Team outing and team building experience — 16–17 October 2026, Kanchanaburi",
  },
  keywords: [
    "Finnomena Tech",
    "Team Outing",
    "Kanchanaburi",
    "Heaven Kwai Resort",
    "Team Building",
    "2026",
  ],
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="min-h-screen bg-secondary font-sans antialiased" style={{ fontFamily: "var(--font-geist), system-ui, sans-serif" }}>
        <SessionProvider>
          <RegistrationModalWrapper>{children}</RegistrationModalWrapper>
        </SessionProvider>
      </body>
    </html>
  )
}
