"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox, { ZoomHint, type LightboxImage } from "./Lightbox"

const map: LightboxImage = {
  src: "/images/resort-map.jpg",
  alt: "Lake Heaven 1 room and resort plan with our rooms outlined",
}

export default function ResortMapSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <section id="resort-map" className="relative py-20 lg:py-28 bg-white section-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex w-fit mx-auto lg:mx-0 items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-white text-xs font-semibold tracking-widest uppercase">Find Your Raft</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight leading-none mb-4 text-center lg:text-left">
            Resort Map
          </h2>
          <p className="text-dark-text/60 leading-relaxed mb-10 max-w-2xl">
            ผังห้องพักของ Lake Heaven 1 — ห้องที่มีกรอบสีดำคือแพที่พวกเราพัก
          </p>

          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label="Open resort map full screen"
            className="group relative block w-full aspect-[1440/755] rounded-2xl overflow-hidden border border-secondary/8 shadow-sm cursor-zoom-in"
          >
            <Image
              src={map.src}
              alt={map.alt}
              fill
              className="object-contain"
              sizes="(min-width: 1280px) 1232px, 100vw"
            />
            <ZoomHint />
          </button>
          <p className="text-dark-text/40 text-xs mt-3 text-center">แตะที่แผนที่เพื่อขยาย</p>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={[map]} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  )
}
