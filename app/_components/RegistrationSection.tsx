import { auth } from "@/auth"
import { checkExistingRegistration } from "@/app/lib/sheets"
import SignInButton from "./SignInButton"
import RegistrationForm from "./RegistrationForm"

function AlreadyRegistered({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-6 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
        <svg
          className="w-9 h-9 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="text-white text-2xl font-bold mb-2">
          Already registered, {name.split(" ")[0]}!
        </h3>
        <p className="text-white/60">
          Your seat is confirmed. We&apos;ll see you at Heaven Kwai Resort! 🎉
        </p>
      </div>
      <a href="#attendees" className="text-primary text-sm font-medium hover:underline">
        View all attendees →
      </a>
    </div>
  )
}

const eventDetails = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    label: "16–17 October 2026 · Fri–Sat",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      </svg>
    ),
    label: "Heaven Kwai Resort, Kanchanaburi",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Team Building & Outdoor Activities",
  },
]

export default async function RegistrationSection() {
  const session = await auth()

  let isRegistered = false
  if (session?.user?.email) {
    isRegistered = await checkExistingRegistration(session.user.email)
  }

  const renderCard = () => {
    if (!session?.user) {
      return <SignInButton />
    }
    if (isRegistered) {
      return <AlreadyRegistered name={session.user.name ?? "there"} />
    }
    return (
      <RegistrationForm
        name={session.user.name ?? session.user.email ?? "User"}
        email={session.user.email ?? ""}
        image={session.user.image}
      />
    )
  }

  return (
    <section
      id="register"
      className="relative py-28 section-divider overflow-hidden"
      style={{ backgroundColor: "#00101e" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #f2f93c 0%, transparent 50%), radial-gradient(circle at 75% 75%, #01172b 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                Join Us
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
              Secure Your
              <br />
              <span className="text-gradient">Spot Now</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Register for Finnomena Tech Outing 2026 and join your team for two
              incredible days at Heaven Kwai Resort in Kanchanaburi.
            </p>
            <div className="space-y-4">
              {eventDetails.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="text-primary/70 flex-shrink-0">{item.icon}</div>
                  <span className="text-white/60 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: card */}
          <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">
            {renderCard()}
          </div>
        </div>
      </div>
    </section>
  )
}
