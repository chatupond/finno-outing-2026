import PhotoShowcase from "./PhotoShowcase"
import { GoogleMapsIcon, FacebookIcon, InstagramIcon } from "./BrandIcons"

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
    icon: <GoogleMapsIcon />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/keereemantra/",
    icon: <FacebookIcon />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/keereemantra/",
    icon: <InstagramIcon />,
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
