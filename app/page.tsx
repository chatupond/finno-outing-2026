import { Suspense } from "react"
import Image from "next/image"
import Navbar from "./_components/Navbar"
import HeroSection from "./_components/HeroSection"
import AccommodationSection from "./_components/AccommodationSection"
import ActivitiesSection from "./_components/ActivitiesSection"
import AttendeesSection from "./_components/AttendeesSection"
import BackToTopButton from "./_components/BackToTopButton"

function AttendeesSkeleton() {
  return (
    <section className="py-28 bg-white/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 bg-secondary/10 rounded-2xl w-64 mb-16 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-secondary/8 overflow-hidden">
              <div className="px-5 py-4 border-b border-secondary/8 flex items-center justify-between">
                <div className="h-5 bg-secondary/10 rounded w-24 animate-pulse" />
                <div className="h-5 bg-secondary/10 rounded-full w-8 animate-pulse" />
              </div>
              <div className="px-5 py-3 space-y-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary/10 animate-pulse flex-shrink-0" />
                    <div className="h-4 bg-secondary/10 rounded flex-1 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AccommodationSection />
        <ActivitiesSection />
        <Suspense fallback={<AttendeesSkeleton />}>
          <AttendeesSection />
        </Suspense>
      </main>
      <BackToTopButton />
      <footer className="bg-secondary-dark py-10 border-t border-white/5" style={{ backgroundColor: "#00101e" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/images/logo.png"
            alt="Finnomena Tech Outing 2026"
            width={750}
            height={612}
            className="h-10 w-auto"
          />
          <p className="text-white/30 text-xs text-center">
            16–17 October 2026 · Heaven Kwai Resort, Kanchanaburi
          </p>
          <p className="text-white/20 text-xs">
            See you there! 🎉
          </p>
        </div>
      </footer>
    </>
  )
}
