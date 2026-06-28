import { auth } from "@/auth"
import { getAttendees, type Attendee } from "@/app/lib/sheets"
import Image from "next/image"
import AttendeesLoginGate from "./AttendeesLoginGate"
import HeroJoinButton from "./HeroJoinButton"

type GroupedTeam = {
  name: string
  attendees: Attendee[]
}

function groupByTeam(attendees: Attendee[]): GroupedTeam[] {
  const map = new Map<string, Attendee[]>()
  for (const a of attendees) {
    const team = a.team || "Others"
    const existing = map.get(team) ?? []
    map.set(team, [...existing, a])
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, attendees]) => ({ name, attendees }))
}

function AttendeeAvatar({ attendee }: { attendee: Attendee }) {
  if (attendee.imageUrl?.startsWith("http")) {
    return (
      <Image
        src={attendee.imageUrl}
        alt={attendee.name}
        width={36}
        height={36}
        className="rounded-full border-2 border-secondary/10"
      />
    )
  }
  const initial = attendee.name?.[0]?.toUpperCase() ?? "?"
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-orange-100 text-orange-700",
    "bg-pink-100 text-pink-700",
  ]
  const colorIndex =
    (attendee.name?.charCodeAt(0) ?? 0) % colors.length
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${colors[colorIndex]}`}
    >
      {initial}
    </div>
  )
}

function TeamCard({ team }: { team: GroupedTeam }) {
  return (
    <div className="bg-white rounded-2xl border border-secondary/8 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 overflow-hidden">
      {/* Team header */}
      <div className="px-5 py-4 border-b border-secondary/8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/15 rounded-lg flex items-center justify-center">
            <span className="text-secondary text-sm font-black">{team.name[0]}</span>
          </div>
          <h3 className="text-secondary font-bold text-base">{team.name}</h3>
        </div>
        <span className="bg-primary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full">
          {team.attendees.length}
        </span>
      </div>

      {/* Attendee list */}
      <div className="px-5 py-3 space-y-2 max-h-56 overflow-y-auto">
        {team.attendees.map((attendee, idx) => (
          <div key={`${attendee.email}-${idx}`} className="flex items-center gap-3 py-1.5">
            <AttendeeAvatar attendee={attendee} />
            <span className="text-dark-text text-sm font-medium truncate">
              {attendee.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function AttendeesSection() {
  const session = await auth()
  if (!session?.user) {
    return <AttendeesLoginGate />
  }

  const attendees = await getAttendees()
  const teams = groupByTeam(attendees)
  const total = attendees.length

  return (
    <section id="attendees" className="relative py-28 bg-white section-divider">

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-white text-xs font-semibold tracking-widest uppercase">
                Who&apos;s Coming
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-secondary tracking-tight leading-none">
              Registered
              <br />
              <span className="text-secondary/60">Attendees</span>
            </h2>
          </div>

          {/* Total count */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-5xl font-black text-secondary">{total}</p>
              <p className="text-dark-text/50 text-sm font-medium mt-1">
                Total Registered
              </p>
            </div>
            <div className="w-px h-16 bg-secondary/15" />
            <div className="text-center">
              <p className="text-5xl font-black text-secondary">{teams.length}</p>
              <p className="text-dark-text/50 text-sm font-medium mt-1">Teams</p>
            </div>
          </div>
        </div>

        {total === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
            <div className="w-20 h-20 rounded-2xl bg-secondary/5 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-secondary/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-secondary font-bold text-xl mb-2">No attendees yet</p>
              <p className="text-dark-text/50 text-sm">
                Be the first to register for Finnomena Tech Outing 2026!
              </p>
            </div>
            <HeroJoinButton />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {teams.map((team) => (
              <TeamCard key={team.name} team={team} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
