"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox, { type LightboxImage } from "./Lightbox"

const rooms: LightboxImage[] = [
  { src: "/images/room1.JPG", alt: "Featured room", label: "Superior Room" },
  { src: "/images/room2.JPG", alt: "Deluxe Room", label: "Deluxe Room" },
  { src: "/images/room3.JPG", alt: "River view room", label: "River View Room" },
  { src: "/images/room4.JPG", alt: "Resort view", label: "Resort View" },
  { src: "/images/room5.JPG", alt: "Resort facilities", label: "Resort Facilities" },
  { src: "/images/room6.JPG", alt: "Standard room", label: "Standard Room" },
  { src: "/images/room7.JPG", alt: "Family suite", label: "Family Suite" },
  { src: "/images/room8.JPG", alt: "Premium room", label: "Premium Room" },
  { src: "/images/room9.JPG", alt: "Twin room", label: "Twin Room" },
  { src: "/images/room10.JPG", alt: "Cozy room", label: "Cozy Room" },
]

function RoomCard({
  room,
  index,
  featured,
  onClick,
}: {
  room: LightboxImage
  index: number
  featured?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden shadow-md cursor-zoom-in text-left ${
        featured
          ? "col-span-2 aspect-[16/9] rounded-2xl shadow-xl"
          : "aspect-square rounded-xl"
      }`}
    >
      <Image
        src={room.src}
        alt={room.alt}
        fill
        className={`object-cover transition-transform duration-700 ${
          featured ? "group-hover:scale-105" : "group-hover:scale-110"
        }`}
        sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
        priority={index === 0}
      />
      <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/30 transition-colors duration-300" />

      {/* Zoom icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span
          className={`font-semibold text-white drop-shadow ${
            featured ? "text-base" : "text-xs"
          }`}
        >
          {room.label}
        </span>
      </div>
    </button>
  )
}

export default function RoomsSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const featured = rooms[0]
  const rest = rooms.slice(1)

  return (
    <>
      <section id="rooms" className="relative py-28 bg-white section-divider">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/5 rounded-full px-4 py-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-secondary text-xs font-semibold tracking-widest uppercase">
                  Accommodations
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-secondary tracking-tight leading-none">
                Our{" "}
                <span style={{ color: "#f2f93c" }}>Rooms</span>
              </h2>
            </div>
            <p className="text-dark-text/60 max-w-sm leading-relaxed lg:text-right">
              Comfortable, well-appointed rooms designed to help you rest and
              recharge after a day full of adventures.
            </p>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* Featured room */}
            <RoomCard
              room={featured}
              index={0}
              featured
              onClick={() => setLightboxIndex(0)}
            />

            {/* Other rooms */}
            {rest.map((room, i) => (
              <RoomCard
                key={room.src}
                room={room}
                index={i + 1}
                onClick={() => setLightboxIndex(i + 1)}
              />
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-secondary/10" />
            <p className="text-dark-text/40 text-sm font-medium px-4">
              All rooms include river access & resort amenities
            </p>
            <div className="h-px flex-1 bg-secondary/10" />
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={rooms}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
