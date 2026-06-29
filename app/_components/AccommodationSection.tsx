"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import TypingText from "./TypingText"

const slides = [
  { src: "/images/lake-heaven-resort-4.jpg", alt: "Lake Heaven Resort Floating Villas" },
  { src: "/images/lake-heaven-resort-2.jpg", alt: "Lake Heaven Resort Aerial Sunset View" },
  { src: "/images/lake-heaven-resort-1.jpg", alt: "Lake Heaven Resort Water Park Overview" },
  { src: "/images/lake-heaven-resort-3.jpg", alt: "Lake Heaven Resort Giant Slide" },
]

const highlights = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    label: "Event Dates",
    value: "16–17 October 2026",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
      </svg>
    ),
    label: "Location",
    value: "Kanchanaburi, Thailand",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: "Resort",
    value: "Lake Heaven Resort",
    mapUrl: "https://maps.google.com/?q=Lake+Heaven+Resort+Kanchanaburi+Thailand",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    ),
    label: "Duration",
    value: "2 Days 1 Night",
  },
]


const ExternalIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

export default function AccommodationSection() {
  const [current, setCurrent] = useState(0)
  const [firstDone, setFirstDone] = useState(false)

  const prev = useCallback(() => setCurrent((i) => (i - 1 + slides.length) % slides.length), [])
  const next = useCallback(() => setCurrent((i) => (i + 1) % slides.length), [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="accommodation" className="relative section-divider overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: carousel */}
        <div className="relative h-72 sm:h-96 lg:h-full lg:min-h-[640px] overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-150"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-150"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 h-2 ${
                  i === current ? "bg-primary w-6" : "bg-white/40 hover:bg-white/70 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: info */}
        <div className="px-8 sm:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-center bg-white">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-white text-xs font-semibold tracking-widest uppercase">
              Where We Stay
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight leading-none mb-6">
            Lake Heaven Resort
          </h2>

          <p className="text-dark-text/70 leading-relaxed mb-4">
            <TypingText text="รีสอร์ตลอยน้ำกลางทะเลสาบ ที่รวมความตื่นเต้นของ Water Park ระดับโลก ห้องพักสไตล์ Floating Villa และบรรยากาศธรรมชาติที่สวยงามไว้ในที่เดียว" onDone={() => setFirstDone(true)} />
          </p>
          <p className="text-dark-text/70 leading-relaxed mb-10">
            <TypingText text="สัมผัสประสบการณ์นอนลอยน้ำ เล่นสไลเดอร์ยักษ์ ลุยกิจกรรม Aqua Park สุดมันส์ และชมวิวทะเลสาบยามเย็น — ทริป Outing ที่ทีมจะจำไม่ลืม" speed={20} enabled={firstDone} />
          </p>

          {/* Highlights */}
          <ul className="mb-10 space-y-3">
            {highlights.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="text-secondary flex-shrink-0">{item.icon}</span>
                <span className="text-dark-text/50 text-sm font-medium w-24 flex-shrink-0">{item.label}</span>
                <span className="text-secondary font-semibold text-sm">{item.value}</span>
                {"mapUrl" in item && (
                  <a
                    href={item.mapUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open in Google Maps"
                    className="ml-1 text-secondary/40 hover:text-secondary transition-colors duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://lakeheaven.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-secondary/80 transition-colors duration-200"
            >
              Visit Resort Website
              <ExternalIcon />
            </a>
            <a
              href="https://www.facebook.com/LakeHeavenResort"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-secondary/30 text-secondary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-secondary/5 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook Page
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
