"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox, { type LightboxImage } from "./Lightbox"
import TypingText from "./TypingText"

const images: LightboxImage[] = [
  { src: "/images/activity-new-1.jpg", alt: "Water park spray rings" },
  { src: "/images/activity-new-2.jpg", alt: "Kayaking at the resort" },
  { src: "/images/activity-new-3.jpg", alt: "Inflatable monster water park" },
  { src: "/images/activity-new-4.jpg", alt: "Aqua park aerial view" },
  { src: "/images/activity-new-5.jpg", alt: "Pedal boat fun on the lake" },
  { src: "/images/activity-new-6.jpg", alt: "Giant slide aerial overview" },
  { src: "/images/activity-new-7.jpg", alt: "Yellow monster inflatable slide" },
  { src: "/images/activity-new-8.jpg", alt: "Group raft towing on the lake" },
  { src: "/images/activity-new-9.jpg", alt: "Wet raft group activity" },
  { src: "/images/activity-new-10.jpg", alt: "Lake view floating villa room" },
  { src: "/images/activity-new-11.jpg", alt: "Floating villa bedroom" },
  { src: "/images/activity-new-12.jpg", alt: "Floating villas aerial sunset" },
  { src: "/images/activity-new-13.jpg", alt: "Resort buffet breakfast hall" },
  { src: "/images/activity-new-14.jpg", alt: "Lakeside room with balcony" },
  { src: "/images/activity-new-15.jpg", alt: "Open-air restaurant overlooking water park" },
  { src: "/images/activity-new-16.jpg", alt: "Buffet dining setup" },
]

export default function ActivitiesSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <section id="activities" className="relative py-28 bg-secondary section-divider">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                  Activities
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                Endless
                <br />
                <span className="text-gradient">Adventures</span>
              </h2>
            </div>
            <p className="text-white/50 max-w-sm leading-relaxed lg:text-right">
              <TypingText text="จากกิจกรรมทางน้ำที่เต็มไปด้วยความตื่นเต้น ไปจนถึงการพักผ่อนอย่างผ่อนคลาย — มอบประสบการณ์ที่หลากหลายให้ทุกคนในทีมได้เพลิดเพลินอย่างเต็มที่" />
            </p>
          </div>

          {/* Flat gallery grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-zoom-in"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
