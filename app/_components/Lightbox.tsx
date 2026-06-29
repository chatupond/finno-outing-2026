"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Image from "next/image"

export type LightboxImage = {
  src: string
  alt: string
  label?: string
}

type Props = {
  images: LightboxImage[]
  startIndex: number
  onClose: () => void
}

export default function Lightbox({ images, startIndex, onClose }: Props) {
  const [current, setCurrent] = useState(startIndex)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  )
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose, prev, next])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null

    // Only treat as horizontal swipe if horizontal movement dominates
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) next()
    else prev()
  }

  const image = images[current]
  const hasMultiple = images.length > 1

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-150"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      {hasMultiple && (
        <div className="absolute top-5 left-5 z-20 glass text-white/80 text-sm font-medium px-4 py-2 rounded-full">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Main image — swipeable area */}
      <div
        className="relative z-10 flex items-center justify-center w-full h-full px-16 py-16"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full">
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Prev / Next */}
      {hasMultiple && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/30 flex items-center justify-center text-white transition-colors duration-150"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/30 flex items-center justify-center text-white transition-colors duration-150"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Caption */}
      {image.label && (
        <div className="absolute bottom-6 left-0 right-0 z-20 text-center pointer-events-none">
          <span className="inline-block glass text-white text-sm font-medium px-5 py-2 rounded-full">
            {image.label}
          </span>
        </div>
      )}

      {/* Thumbnail strip */}
      {hasMultiple && (
        <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-1.5 px-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                i === current ? "bg-primary w-4" : "bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
