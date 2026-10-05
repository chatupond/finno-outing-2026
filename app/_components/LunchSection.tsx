import PhotoShowcase from "./PhotoShowcase"

const photos = [
  { src: "/images/keeree-1.jpg", alt: "Wooden deck seating overlooking the lawn, fountain and mountains" },
  { src: "/images/keeree-2.jpg", alt: "Open-air dining hall with wooden tables and lantern lights" },
  { src: "/images/keeree-3.jpg", alt: "Large shade tree and fountain on the lawn by the lake" },
  { src: "/images/keeree-4.jpg", alt: "Guest sitting on the lawn facing the mountains and fountain" },
  { src: "/images/keeree-5.jpg", alt: "Keeree Mantra Restaurant sign on the building wall" },
  { src: "/images/keeree-6.jpg", alt: "Glass-walled dining pavilion with outdoor terrace seating" },
]

const menu = [
  "ปลาทับทิมทอดกระเทียม น้ำยำมะม่วง",
  "น้ำพริกธารา",
  "ยอดมะรักผัดน้ำมันหอย",
  "แกงจืดเต้าหู้หมูสับสาหร่าย",
  "ปีกไก่ทอดเกลือ",
  "ยำตำลึงกรอบ",
  "แกงเขียวหวานไก่",
]

const details = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    ),
    label: "When",
    value: "เสาร์ 17 Oct · 12:30",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Where",
    value: "88/8 ม.4 ต.หนองบัว อ.เมือง จ.กาญจนบุรี",
  },
]

const links = [
  {
    label: "Google Maps",
    href: "https://maps.google.com/?q=Keeree+Mantra+Kanchanaburi",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/keereemantra/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/keereemantra/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 00-2.13 1.38A5.88 5.88 0 00.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 002.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 002.13-1.38 5.88 5.88 0 001.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 00-1.38-2.13A5.88 5.88 0 0019.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
      </svg>
    ),
  },
]

export default function LunchSection() {
  return (
    <section id="lunch" className="relative bg-secondary section-divider grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">
      {/* Left — full-bleed photo viewer */}
      <PhotoShowcase photos={photos} />

      {/* Right — info + menu */}
      <div className="flex items-center px-6 sm:px-12 lg:px-16 xl:px-24 py-20 lg:py-28">
        <div className="w-full max-w-xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-widest uppercase">
              Day 2 · Lunch
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-none mb-6">
            คีรีมันตรา
            <br />
            <span className="text-gradient">Keeree Mantra</span>
          </h2>
          <p className="text-white/60 leading-relaxed mb-10">
            ร้านอาหารไทยท่ามกลางขุนเขา ริมบึงน้ำและทุ่งหญ้ากว้าง ห่างจากตัวเมืองกาญจนบุรีเพียง 8 กม.
            — มื้อสุดท้ายที่เราจะได้กินข้าวพร้อมหน้ากันก่อนแยกย้ายกลับบ้าน
          </p>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
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

          {/* Menu */}
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-primary text-xs font-semibold tracking-widest uppercase">Menu</h3>
            <span className="text-white/40 text-xs font-medium">{menu.length} dishes</span>
          </div>
          <ol className="mb-12">
            {menu.map((dish, i) => (
              <li key={dish} className="flex items-center gap-5 py-3.5 border-b border-white/10 last:border-b-0">
                <span className="text-primary/70 text-sm font-bold tabular-nums w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-white/90 text-base sm:text-lg">{dish}</span>
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
