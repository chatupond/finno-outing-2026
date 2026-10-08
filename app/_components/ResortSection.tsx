"use client"

import { useState } from "react"
import PhotoShowcase from "./PhotoShowcase"
import TypingText from "./TypingText"
import { GoogleMapsIcon, FacebookIcon } from "./BrandIcons"

const photos = [
  { src: "/images/lake-heaven-resort-1.jpg", alt: "Lake Heaven Resort Water Park Overview" },
  { src: "/images/lake-heaven-resort-2.jpg", alt: "Lake Heaven Resort Aerial Sunset View" },
  { src: "/images/lake-heaven-resort-3.jpg", alt: "Lake Heaven Resort Giant Slide" },
  { src: "/images/lake-heaven-resort-4.jpg", alt: "Lake Heaven Resort Floating Villas" },
  { src: "/images/lake-heaven-resort-5.jpg", alt: "Water park spray rings" },
  { src: "/images/lake-heaven-resort-6.jpg", alt: "Kayaking at the resort" },
  { src: "/images/lake-heaven-resort-7.jpg", alt: "Inflatable monster water park" },
  { src: "/images/lake-heaven-resort-8.jpg", alt: "Aqua park aerial view" },
  { src: "/images/lake-heaven-resort-9.jpg", alt: "Pedal boat fun on the lake" },
  { src: "/images/lake-heaven-resort-10.jpg", alt: "Giant slide aerial overview" },
  { src: "/images/lake-heaven-resort-11.jpg", alt: "Yellow monster inflatable slide" },
  { src: "/images/lake-heaven-resort-12.jpg", alt: "Group raft towing on the lake" },
  { src: "/images/lake-heaven-resort-13.jpg", alt: "Wet raft group activity" },
  { src: "/images/lake-heaven-resort-14.jpg", alt: "Lake view floating villa room" },
  { src: "/images/lake-heaven-resort-15.jpg", alt: "Floating villa bedroom" },
  { src: "/images/lake-heaven-resort-16.jpg", alt: "Floating villas aerial sunset" },
  { src: "/images/lake-heaven-resort-17.jpg", alt: "Resort buffet breakfast hall" },
  { src: "/images/lake-heaven-resort-18.jpg", alt: "Lakeside room with balcony" },
  { src: "/images/lake-heaven-resort-19.jpg", alt: "Open-air restaurant overlooking water park" },
  { src: "/images/lake-heaven-resort-20.jpg", alt: "Buffet dining setup" },
]

const details = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    label: "Dates",
    value: "16–17 October 2026",
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
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: "Resort",
    value: "Lake Heaven Resort",
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
]

const activities = [
  "Aqua Park & สไลเดอร์ยักษ์",
  "พายเรือคายัคกลางทะเลสาบ",
  "ปั่นเรือถีบชมวิว",
  "แพลากเป็นกลุ่มสุดมันส์",
  "นอนลอยน้ำใน Floating Villa",
  "บุฟเฟ่ต์ 3 มื้อ ริมทะเลสาบ",
]

const links = [
  {
    label: "Website",
    href: "https://lakeheaven.com/",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
  },
  {
    label: "Google Maps",
    href: "https://maps.google.com/?q=Lake+Heaven+Resort+Kanchanaburi+Thailand",
    icon: <GoogleMapsIcon />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/LakeHeavenResort",
    icon: <FacebookIcon />,
  },
]

export default function ResortSection() {
  const [firstDone, setFirstDone] = useState(false)

  return (
    <section id="accommodation" className="relative bg-secondary section-divider grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
      {/* Left — full-bleed photo viewer */}
      <PhotoShowcase photos={photos} />

      {/* Right — resort info + activities */}
      <div className="flex items-center px-6 sm:px-12 lg:px-16 xl:px-24 py-20 lg:py-28">
        <div className="w-full max-w-xl">
          <div className="flex w-fit mx-auto lg:mx-0 items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              Where We Stay · Activities
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none mb-6 text-center lg:text-left">
            Lake Heaven
            <br />
            <span className="text-gradient">Resort</span>
          </h2>
          <p className="text-white/60 leading-relaxed mb-4">
            <TypingText
              text="รีสอร์ตลอยน้ำกลางทะเลสาบ ที่รวมความตื่นเต้นของ Water Park ระดับโลก ห้องพักสไตล์ Floating Villa และบรรยากาศธรรมชาติที่สวยงามไว้ในที่เดียว"
              onDone={() => setFirstDone(true)}
            />
          </p>
          <p className="text-white/60 leading-relaxed mb-10">
            <TypingText
              text="สัมผัสประสบการณ์นอนลอยน้ำ เล่นสไลเดอร์ยักษ์ ลุยกิจกรรม Aqua Park สุดมันส์ และชมวิวทะเลสาบยามเย็น — ทริป Outing ที่ทีมจะจำไม่ลืม"
              speed={20}
              enabled={firstDone}
            />
          </p>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 mb-12">
            {details.map((item) => (
              <div key={item.label} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 text-primary mb-2">
                  {item.icon}
                  <span className="text-xs font-semibold tracking-widest uppercase">{item.label}</span>
                </div>
                <p className="text-white font-semibold text-sm leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Activities */}
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-primary text-xs font-semibold tracking-widest uppercase">Activities</h3>
            <span className="text-white/40 text-xs font-medium">{activities.length} highlights</span>
          </div>
          <ol className="mb-12">
            {activities.map((activity, i) => (
              <li key={activity} className="flex items-center gap-5 py-3.5 border-b border-white/10 last:border-b-0">
                <span className="text-primary/70 text-sm font-bold tabular-nums w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-white/90 text-base sm:text-lg">{activity}</span>
              </li>
            ))}
          </ol>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 border border-primary/40 text-primary font-bold text-sm px-5 py-3 rounded-xl hover:bg-primary/10 transition-colors duration-200"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
