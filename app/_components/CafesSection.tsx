"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox, { ZoomHint } from "./Lightbox"

type Cafe = {
  name: string
  tagline: string
  description: string
  highlights: string[]
  hours?: string
  mapUrl: string
  facebookUrl: string
  instagramUrl: string
  photos: { src: string; alt: string }[]
}

const cafes: Cafe[] = [
  {
    name: "The Village Farm to Café",
    tagline: "Farm café สไตล์ยุโรป",
    description:
      "คาเฟ่ที่ออกแบบเป็นโรงนา 5 หลังเชื่อมต่อกันเหมือนหมู่บ้านในฟาร์ม ด้านหลังเป็นบึงน้ำล้อมรอบด้วยภูเขา เสิร์ฟวัตถุดิบสดจากแหล่งปลูกถึงโต๊ะ",
    highlights: [
      "อาหารฝรั่ง เบเกอรี่ ของหวาน และเครื่องดื่มเพียบ",
      "มีทั้งโซนในห้องแอร์และ outdoor วิวภูเขา",
      "มุม Village Cactus มีแคคตัสให้เลือกซื้อกลับบ้าน",
    ],
    mapUrl: "https://maps.google.com/?q=The+Village+Farm+to+Cafe+Kanchanaburi",
    facebookUrl: "https://www.facebook.com/TheVillageFarmToCafe/",
    instagramUrl: "https://www.instagram.com/the.village.farm.to.cafe/",
    photos: [
      { src: "/images/village-cafe-1.jpg", alt: "The Village Farm to Café sign above a plant display with diners" },
      { src: "/images/village-cafe-2.jpg", alt: "Pizza, shrimp pasta, fried snacks and drinks on a wooden table" },
      { src: "/images/village-cafe-3.jpg", alt: "Iced coffee and a fruit smoothie in The Village cups" },
      { src: "/images/village-cafe-4.jpg", alt: "Coffee counter with tall shelves and a pastry display" },
      { src: "/images/village-cafe-5.jpg", alt: "Village Cactus shop under a large tree with mountains behind" },
    ],
  },
  {
    name: "CHAN Nature Café",
    tagline: "Nordic × Japanese minimal กลางหุบเขา",
    description:
      "คาเฟ่ไม้ไผ่สไตล์นอร์ดิกผสมมินิมอลญี่ปุ่น อยู่ในพื้นที่เดียวกับคีรีมันตราและ The Village มีกังหันลมขนาดใหญ่และ Sky Walk ชมวิวแบบพาโนรามา",
    highlights: [
      "Matcha bar ใช้มัทฉะพรีเมียมจากญี่ปุ่น",
      "เมนูเด่น: Matcha Latte, Strawberry Matcha Latte, Soft Serve Matcha",
      "สวนแคคตัสขนาดใหญ่ มุมถ่ายรูปเยอะมาก",
    ],
    mapUrl: "https://maps.google.com/?q=CHAN+Nature+Cafe+Kanchanaburi",
    facebookUrl: "https://www.facebook.com/channaturecafe/",
    instagramUrl: "https://www.instagram.com/channature.cafe/",
    photos: [
      { src: "/images/chan-cafe-1.jpg", alt: "CHAN Nature Café windmill building and Sky Walk among green hills" },
      { src: "/images/chan-cafe-2.jpg", alt: "Vine-covered bamboo buildings and cactus garden" },
      { src: "/images/chan-cafe-3.jpg", alt: "Layered matcha drinks with cactus cake and matcha basque cheesecake" },
      { src: "/images/chan-cafe-4.jpg", alt: "Iced matcha latte held up in front of the café" },
      { src: "/images/chan-cafe-5.jpg", alt: "Matcha desserts including basque cheesecake and cactus pot cake" },
    ],
  },
]

function CafeCard({ cafe }: { cafe: Cafe }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hero, ...thumbs] = cafe.photos
  return (
    <div className="bg-white rounded-2xl border border-secondary/8 shadow-sm overflow-hidden flex flex-col">
      {/* Photos */}
      <button
        onClick={() => setLightboxIndex(0)}
        aria-label={`View photo: ${hero.alt}`}
        className="group relative aspect-[16/10] overflow-hidden cursor-zoom-in"
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <ZoomHint />
      </button>
      <div className="grid gap-1 mt-1" style={{ gridTemplateColumns: `repeat(${thumbs.length}, minmax(0, 1fr))` }}>
        {thumbs.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightboxIndex(i + 1)}
            aria-label={`View photo: ${photo.alt}`}
            className="group relative aspect-[4/3] overflow-hidden cursor-zoom-in"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 1024px) 33vw, 17vw"
            />
            <ZoomHint />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={cafe.photos} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}

      {/* Info */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <p className="text-secondary/50 text-xs font-semibold tracking-widest uppercase mb-2">{cafe.tagline}</p>
        <h3 className="text-2xl sm:text-3xl font-black text-secondary tracking-tight mb-4">{cafe.name}</h3>
        <p className="text-dark-text/70 leading-relaxed mb-6">{cafe.description}</p>

        <ul className="space-y-2.5 mb-6">
          {cafe.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
              <span className="text-dark-text/80 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        {cafe.hours && (
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            <span className="text-secondary font-semibold text-sm">{cafe.hours}</span>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-3">
          <a
            href={cafe.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-secondary/20 text-secondary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-secondary/5 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Google Maps
          </a>
          <a
            href={cafe.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-secondary/20 text-secondary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-secondary/5 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
            </svg>
            Facebook
          </a>
          <a
            href={cafe.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-secondary/20 text-secondary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-secondary/5 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 00-2.13 1.38A5.88 5.88 0 00.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 002.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 002.13-1.38 5.88 5.88 0 001.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 00-1.38-2.13A5.88 5.88 0 0019.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

export default function CafesSection() {
  return (
    <section id="cafes" className="relative py-28 bg-white section-divider">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-white text-xs font-semibold tracking-widest uppercase">
                Cafés Nearby
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-secondary tracking-tight leading-none">
              After-Lunch
              <br />
              Café Hopping
            </h2>
          </div>
          <p className="text-dark-text/60 max-w-sm leading-relaxed lg:text-right">
            อิ่มจากคีรีมันตราแล้ว เดินต่อไปได้เลย — 2 คาเฟ่อยู่ในพื้นที่เดียวกัน ก่อนแยกย้ายกลับบ้าน
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cafes.map((cafe) => (
            <CafeCard key={cafe.name} cafe={cafe} />
          ))}
        </div>
      </div>
    </section>
  )
}
