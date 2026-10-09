import { Suspense } from "react"
import Image from "next/image"
import Navbar from "./_components/Navbar"
import HeroSection from "./_components/HeroSection"
import ResortSection from "./_components/ResortSection"
import ScheduleSection from "./_components/ScheduleSection"
import LunchSection from "./_components/LunchSection"
import CafesSection from "./_components/CafesSection"
import DrinksSection from "./_components/DrinksSection"
import AttendeesSection from "./_components/AttendeesSection"
import CarsSection from "./_components/CarsSection"
import BedroomSection from "./_components/BedroomSection"
import ResortMapSection from "./_components/ResortMapSection"
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

function CarsSkeleton() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-screen bg-secondary">
      <div className="lg:col-span-6 h-[60vh] lg:h-screen bg-white/5 animate-pulse" />
      <div className="lg:col-span-6 px-6 sm:px-10 xl:px-16 py-28">
        <div className="h-16 bg-white/10 rounded-2xl w-64 mb-12 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="h-5 bg-white/10 rounded w-20 animate-pulse" />
                <div className="h-5 bg-white/10 rounded-full w-16 animate-pulse" />
              </div>
              <div className="px-5 py-4 space-y-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse flex-shrink-0" />
                    <div className="h-4 bg-white/10 rounded flex-1 animate-pulse" />
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

function BedroomSkeleton() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-screen">
      <div className="lg:col-span-4 bg-white px-6 sm:px-10 py-28 space-y-6">
        <div className="h-16 bg-secondary/10 rounded-2xl w-56 animate-pulse" />
        <div className="aspect-[16/10] bg-secondary/10 rounded-2xl animate-pulse" />
        <div className="aspect-[16/10] bg-secondary/10 rounded-2xl animate-pulse" />
      </div>
      <div className="lg:col-span-8 bg-[#f5f7fa] px-6 sm:px-10 py-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 bg-secondary/8 rounded-2xl animate-pulse" />
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
        <Suspense fallback={<AttendeesSkeleton />}>
          <AttendeesSection />
        </Suspense>
        <ResortSection />
        <ScheduleSection />
        <Suspense fallback={<CarsSkeleton />}>
          <CarsSection />
        </Suspense>
        <Suspense fallback={<BedroomSkeleton />}>
          <BedroomSection />
        </Suspense>
        <ResortMapSection />
        <LunchSection />
        <CafesSection />
        <DrinksSection />
      </main>
      <BackToTopButton />
      <footer className="bg-secondary-dark py-10 border-t border-white/5" style={{ backgroundColor: "#00101e" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/images/logo-mark.png"
            alt="Finnomena Builder Outing 2026"
            width={512}
            height={512}
            className="h-10 w-10 rounded-xl"
          />
          <p className="text-white/30 text-xs text-center">
            16–17 October 2026 · Lake Heaven Resort, Kanchanaburi
          </p>
          <p className="text-white/20 text-xs">
            See you there! 🎉
          </p>
        </div>
      </footer>
    </>
  )
}
