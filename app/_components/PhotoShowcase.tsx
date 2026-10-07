"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Lightbox, { type LightboxImage } from "./Lightbox"

const pad = (n: number) => String(n).padStart(2, "0")

/** Full-bleed photo viewer for split sections: main photo + thumbnail strip, opens a lightbox. */
export default function PhotoShowcase({ photos }: { photos: LightboxImage[] }) {
  const [active, setActive] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  const show = (i: number) => {
    const index = (i + photos.length) % photos.length
    setActive(index)
    // Keep the active thumbnail centred in the strip without scrolling the page
    const strip = stripRef.current
    const thumb = strip?.children[index] as HTMLElement | undefined
    if (strip && thumb) {
      strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: "smooth" })
    }
  }

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full glass text-white flex items-center justify-center hover:bg-white/15 transition-colors duration-200"

  return (
    <>
      <div className="relative h-[70vh] min-h-[420px] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
        <button
          onClick={() => setLightboxIndex(active)}
          aria-label={`View photo: ${photos[active].alt}`}
          className="group absolute inset-0 cursor-zoom-in"
        >
          {photos.map((photo, i) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ))}
          <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/10 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-secondary/40 hidden lg:block" />
        </button>

        {/* Expand */}
        <button
          onClick={() => setLightboxIndex(active)}
          className="absolute top-20 right-5 z-10 inline-flex items-center gap-2 glass text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/15 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          View gallery
        </button>

        {/* Prev / Next */}
        <button onClick={() => show(active - 1)} aria-label="Previous photo" className={`${arrowClass} left-5`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={() => show(active + 1)} aria-label="Next photo" className={`${arrowClass} right-5`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Counter + thumbnails */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-8">
          <p className="text-white/70 text-sm font-semibold tracking-widest mb-3 tabular-nums">
            <span className="text-primary">{pad(active + 1)}</span>
            {" / "}
            {pad(photos.length)}
          </p>
          <div ref={stripRef} className="flex gap-2 overflow-x-auto p-1 -m-1 [scrollbar-width:none]">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                onClick={() => show(i)}
                aria-label={`Show photo ${i + 1}: ${photo.alt}`}
                aria-current={i === active}
                className={`relative flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden transition-all duration-200 ${
                  i === active
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-secondary"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={photo.src} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={photos} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  )
}
