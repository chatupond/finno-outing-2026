import type { Metadata } from "next"
import { Geist, Prompt } from "next/font/google"
import "./globals.css"
import SessionProvider from "./_components/SessionProvider"
import RegistrationModalWrapper from "./_components/RegistrationModalWrapper"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

// Thai text: Geist has no Thai glyphs, so the browser falls through to Prompt for them
const prompt = Prompt({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-prompt",
})

export const metadata: Metadata = {
  title: "Finnomena Builder Outing 2026 - Lake Heaven Resort",
  description: "ทริป Outing ของทีม Finnomena Builder",
  openGraph: {
    title: "Finnomena Builder Outing 2026 - Lake Heaven Resort",
    description: "ทริป Outing ของทีม Finnomena Builder",
    type: "website",
    locale: "th_TH",
    siteName: "Finnomena Builder Outing 2026",
    images: [
      {
        url: "/images/og-image.png",
        width: 1512,
        height: 756,
        alt: "Finnomena Builder Outing 2026 - Lake Heaven Resort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finnomena Builder Outing 2026 - Lake Heaven Resort",
    description: "ทริป Outing ของทีม Finnomena Builder",
    images: ["/images/og-image.png"],
  },
  keywords: [
    "Finnomena Builder",
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
    <html lang="en" className={`${geist.variable} ${prompt.variable} scroll-smooth`}>
      <body className="min-h-screen bg-secondary font-sans antialiased" style={{ fontFamily: "var(--font-geist), var(--font-prompt), system-ui, sans-serif" }}>
        <SessionProvider>
          <RegistrationModalWrapper>{children}</RegistrationModalWrapper>
        </SessionProvider>
      </body>
    </html>
  )
}
