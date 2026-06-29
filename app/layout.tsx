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
  title: "Finnomena Tech Outing 2026 - Lake Heaven Resort",
  description: "ทริป Outing ของทีม Finnomena tech",
  openGraph: {
    title: "Finnomena Tech Outing 2026 - Lake Heaven Resort",
    description: "ทริป Outing ของทีม Finnomena tech",
    type: "website",
    locale: "th_TH",
    siteName: "Finnomena Tech Outing 2026",
    images: [
      {
        url: "/images/og-image.png",
        width: 1512,
        height: 756,
        alt: "Finnomena Tech Outing 2026 - Lake Heaven Resort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finnomena Tech Outing 2026 - Lake Heaven Resort",
    description: "ทริป Outing ของทีม Finnomena tech",
    images: ["/images/og-image.png"],
  },
  keywords: [
    "Finnomena Tech",
    "Team Outing",
    "Kanchanaburi",
    "Lake Heaven Resort",
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
