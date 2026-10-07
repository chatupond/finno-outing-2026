import { auth } from "@/auth"
import { getBedrooms, type Bedroom } from "@/app/lib/sheets"
import RoomSlider from "./RoomSlider"
import StickyPanel from "./StickyPanel"
import VideoButton from "./VideoButton"
import LoginWall from "./LoginWall"

const icons = {
  guests: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  bed: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 18h18M3 18v2m18-2v2M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3M9 10V8h6v2" />
    </svg>
  ),
  bath: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18v2a5 5 0 01-5 5H8a5 5 0 01-5-5v-2zm3 0V6a2 2 0 012-2h1a2 2 0 012 2M7 19l-1 2m11-2l1 2" />
    </svg>
  ),
}

const roomTypes = [
  {
    name: "แพดาหลา",
    description: "ห้องพักลอยน้ำสำหรับ 2 ท่าน วิวทะเลสาบ",
    videoId: "ujOElsdKOl8",
    features: [{ icon: icons.guests, label: "2 Guests" }],
    photos: [
      { src: "/images/room-dahla-1.jpg", alt: "แพดาหลา bedroom with double bed and dressing table" },
      { src: "/images/room-dahla-2.jpg", alt: "แพดาหลา floating villas on the lake with a swan boat" },
      { src: "/images/room-dahla-3.jpg", alt: "แพดาหลา room interior with balcony doors and TV" },
    ],
  },
  {
    name: "แพเบญจมาศ",
    description: "แพหลังใหญ่สำหรับ 12 ท่าน พร้อมระเบียงริมน้ำ",
    videoId: "Cx72Lxliv6A",
    features: [
      { icon: icons.guests, label: "12 Guests" },
      { icon: icons.bed, label: "6 Bedrooms" },
      { icon: icons.bath, label: "6 Bathrooms" },
    ],
    photos: [
      { src: "/images/room-benjamas-1.jpg", alt: "แพเบญจมาศ covered terrace with sun lounger facing the lake" },
      { src: "/images/room-benjamas-2.jpg", alt: "Guest on the แพเบญจมาศ terrace overlooking the lake" },
      { src: "/images/room-benjamas-3.jpg", alt: "แพเบญจมาศ bedroom with balcony door to the lake" },
      { src: "/images/room-benjamas-4.jpg", alt: "Aerial view of แพเบญจมาศ rafts and the water park" },
    ],
  },
]

type House = { name: string; bedrooms: { label?: string; sleepers: string[] }[] }
type RoomGroup = { type: string; houses: House[] }

/**
 * Groups sheet rows by room type and house.
 * "แพดาหลา 21"       → type แพดาหลา, house 21
 * "แพเบญจมาศ 2 (1)" → type แพเบญจมาศ, house 2, bedroom 1
 */
function groupBedrooms(rows: Bedroom[]): RoomGroup[] {
  const groups: RoomGroup[] = []
  for (const row of rows) {
    const match = row.room.match(/^(.*?)\s*\((\d+)\)\s*$/)
    const base = match ? match[1] : row.room
    const [type, ...rest] = base.split(/\s+/)
    const houseName = rest.join(" ") || base

    let group = groups.find((g) => g.type === type)
    if (!group) groups.push((group = { type, houses: [] }))
    let house = group.houses.find((h) => h.name === houseName)
    if (!house) group.houses.push((house = { name: houseName, bedrooms: [] }))
    house.bedrooms.push({ label: match?.[2], sleepers: row.sleepers })
  }
  return groups
}

function Sleepers({ names }: { names: string[] }) {
  return (
    <div className="space-y-2">
      {names.map((name, i) => (
        <div key={`${name}-${i}`} className="flex items-center gap-2.5 min-w-0">
          <span className="w-7 h-7 rounded-full bg-secondary/8 text-secondary text-xs font-bold flex items-center justify-center flex-shrink-0">
            {name.replace(/^N'\s*|^P'\s*/, "")[0]?.toUpperCase() ?? "?"}
          </span>
          <span className="text-dark-text/80 text-sm font-medium truncate">{name}</span>
        </div>
      ))}
    </div>
  )
}

/** One card per room (single-bedroom houses, e.g. แพดาหลา) */
function RoomCard({ house }: { house: House }) {
  const sleepers = house.bedrooms.flatMap((b) => b.sleepers)
  return (
    <div className="bg-white rounded-2xl border border-secondary/8 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-secondary font-black text-lg leading-none">
          <span className="text-dark-text/40 text-xs font-semibold tracking-widest uppercase block mb-1.5">Room</span>
          {house.name}
        </p>
        <span className="bg-secondary/5 text-secondary text-xs font-bold px-2.5 py-1 rounded-full">
          {sleepers.length} คน
        </span>
      </div>
      <Sleepers names={sleepers} />
    </div>
  )
}

/** One card per multi-bedroom house (e.g. แพเบญจมาศ), listing each bedroom */
function HouseCard({ house, type }: { house: House; type: string }) {
  const total = house.bedrooms.reduce((n, b) => n + b.sleepers.length, 0)
  return (
    <div className="bg-white rounded-2xl border border-secondary/8 shadow-sm overflow-hidden">
      <div className="px-5 py-4 bg-secondary flex items-center justify-between">
        <p className="text-white font-black text-lg">
          {type} {house.name}
        </p>
        <span className="bg-primary/15 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
          {total} คน
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-secondary/8">
        {house.bedrooms.map((bedroom, i) => (
          <div key={i} className="p-5 bg-white">
            <p className="text-dark-text/40 text-xs font-semibold tracking-widest uppercase mb-3">
              Bedroom {bedroom.label ?? i + 1}
            </p>
            <Sleepers names={bedroom.sleepers} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Fake arrangement shown blurred behind the login wall — never real data */
const PLACEHOLDER_SLEEPERS = ["Somchai Builder", "Nok Finno", "Pim Outing", "Kanchana Lake"]
const PLACEHOLDER_BEDROOMS: Bedroom[] = [
  ...[21, 22, 23, 24, 25, 26].map((n) => ({ room: `แพดาหลา ${n}`, sleepers: PLACEHOLDER_SLEEPERS.slice(n % 2, (n % 2) + 2) })),
  ...[1, 2, 3, 4, 5, 6].map((n) => ({ room: `แพเบญจมาศ 1 (${n})`, sleepers: PLACEHOLDER_SLEEPERS.slice(0, 2) })),
]

export default async function BedroomSection() {
  const session = await auth()
  const locked = !session?.user

  const rows = locked ? PLACEHOLDER_BEDROOMS : await getBedrooms()
  if (rows.length === 0) return null

  const groups = groupBedrooms(rows)

  const arrangement = (
    <div className="space-y-14">
      {groups.map((group) => {
        const multiBedroom = group.houses.some((h) => h.bedrooms.some((b) => b.label))
        return (
          <div key={group.type}>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-secondary text-xl font-black whitespace-nowrap">{group.type}</h3>
              <span className="h-px flex-1 bg-secondary/10" />
              <span className="text-dark-text/40 text-sm font-medium whitespace-nowrap">
                {group.houses.length} {multiBedroom ? "แพ" : "ห้อง"}
              </span>
            </div>
            {multiBedroom ? (
              <div className="space-y-6">
                {group.houses.map((house) => (
                  <HouseCard key={house.name} house={house} type={group.type} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {group.houses.map((house) => (
                  <RoomCard key={house.name} house={house} />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <section id="bedrooms" className="relative section-divider grid grid-cols-1 lg:grid-cols-12 lg:min-h-screen">
      {/* Left (4/12) — room types; stays in view while the room list scrolls */}
      <div className="lg:col-span-4 bg-white lg:border-r border-secondary/8">
        <StickyPanel className="px-6 sm:px-10 xl:px-12 py-20 lg:py-10 lg:sticky">
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-white text-xs font-semibold tracking-widest uppercase">Where We Sleep</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-secondary tracking-tight leading-none mb-10">
            Bedroom
            <br />
            Arrangements
          </h2>

          <div className="space-y-6">
            {roomTypes.map((room) => (
              <div key={room.name} className="bg-white rounded-2xl border border-secondary/8 shadow-sm p-4">
                <RoomSlider photos={room.photos} />
                <div className="px-1 pt-4 pb-1">
                  <h3 className="text-secondary text-2xl font-black mb-1">{room.name}</h3>
                  <p className="text-dark-text/60 text-sm mb-4">{room.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature) => (
                      <span
                        key={feature.label}
                        className="inline-flex items-center gap-1.5 bg-secondary/5 text-secondary text-xs font-bold px-3 py-1.5 rounded-full"
                      >
                        {feature.icon}
                        {feature.label}
                      </span>
                    ))}
                    <VideoButton videoId={room.videoId} title={`${room.name} video tour`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </StickyPanel>
      </div>

      {/* Right (8/12) — arrangement from the Bedroom sheet */}
      <div className="lg:col-span-8 bg-[#f5f7fa] px-6 sm:px-10 xl:px-16 py-20 lg:py-28">
        {locked ? (
          <LoginWall
            sectionId="bedrooms"
            title="Log in to view bedroom arrangements"
            description="Sign in with your Google account to see who you're rooming with."
          >
            {arrangement}
          </LoginWall>
        ) : (
          arrangement
        )}
      </div>
    </section>
  )
}
