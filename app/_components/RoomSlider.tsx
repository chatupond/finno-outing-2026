"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Lightbox, { type LightboxImage } from "./Lightbox"

/** Compact photo slider with arrows, dots and swipe; clicking a photo opens the lightbox. */
export default function RoomSlider({ photos }: { photos: LightboxImage[] }) {
  const [current, setCurrent] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const go = (i: number) => setCurrent((i + photos.length) % photos.length)

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-150"

  return (
    <>
      <div
        className="relative aspect-[16/10] rounded-xl overflow-hidden"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const dx = e.changedTouches[0].clientX - touchStartX.current
          touchStartX.current = null
          if (Math.abs(dx) > 40) go(dx < 0 ? current + 1 : current - 1)
        }}
      >
        <button
          onClick={() => setLightboxIndex(current)}
          aria-label={`View photo: ${photos[current].alt}`}
          className="absolute inset-0 cursor-zoom-in"
        >
          {photos.map((photo, i) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              className={`object-cover transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          ))}
        </button>

        <button onClick={() => go(current - 1)} aria-label="Previous photo" className={`${arrowClass} left-3`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={() => go(current + 1)} aria-label="Next photo" className={`${arrowClass} right-3`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => go(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-5" : "bg-white/50 hover:bg-white/80 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={photos} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  )
}
