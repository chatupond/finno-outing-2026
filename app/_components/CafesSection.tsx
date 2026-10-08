"use client"

import { useState } from "react"
import Image from "next/image"
import Lightbox, { ZoomHint } from "./Lightbox"
import { FacebookIcon, GoogleMapsIcon, InstagramIcon } from "./BrandIcons"

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
            <GoogleMapsIcon />
            Google Maps
          </a>
          <a
            href={cafe.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-secondary/20 text-secondary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-secondary/5 transition-colors duration-200"
          >
            <FacebookIcon />
            Facebook
          </a>
          <a
            href={cafe.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-secondary/20 text-secondary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-secondary/5 transition-colors duration-200"
          >
            <InstagramIcon />
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
            <div className="flex w-fit mx-auto lg:mx-0 items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-white text-xs font-semibold tracking-widest uppercase">
                Cafés Nearby
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-secondary tracking-tight leading-none text-center lg:text-left">
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
