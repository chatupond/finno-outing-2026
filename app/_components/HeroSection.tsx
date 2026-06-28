import Image from "next/image"
import HeroJoinButton from "./HeroJoinButton"
import ScrollToAttendeesButton from "./ScrollToAttendeesButton"
import TypingText from "./TypingText"

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg"
    >
      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl animate-pulse-glow pointer-events-none"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-primary/60 animate-float pointer-events-none" />
      <div
        className="absolute top-40 left-16 w-1 h-1 rounded-full bg-primary/40 animate-float pointer-events-none"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-32 left-1/3 w-1.5 h-1.5 rounded-full bg-white/20 animate-float pointer-events-none"
        style={{ animationDelay: "2.5s" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,249,60,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(242,249,60,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="animate-fade-in-up flex justify-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Finnomena Tech Outing 2026"
            width={750}
            height={612}
            priority
            className="w-56 sm:w-72 lg:w-96 h-auto drop-shadow-2xl"
          />
        </div>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-100 text-white text-lg sm:text-xl lg:text-2xl font-light tracking-wide mb-12 max-w-2xl mx-auto">
          <TypingText text="Team outing and team building experience" speed={50} />
        </p>

        {/* Info pills */}
        <div className="animate-fade-in-up delay-200 flex flex-wrap justify-center gap-4 mb-14">
          <div className="glass rounded-full px-6 py-3 flex items-center gap-3">
            <svg
              className="w-4 h-4 text-primary flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-white text-sm font-medium">
              16–17 October 2026 · Friday–Saturday
            </span>
          </div>
          <div className="glass rounded-full px-6 py-3 flex items-center gap-3">
            <svg
              className="w-4 h-4 text-primary flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-white text-sm font-medium">
              Heaven Kwai Resort, Kanchanaburi
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row justify-center gap-4">
          <HeroJoinButton />
          <ScrollToAttendeesButton />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  )
}
