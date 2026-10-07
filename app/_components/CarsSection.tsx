import { auth } from "@/auth"
import { getCars, type Car } from "@/app/lib/sheets"
import TripRouteMap from "./TripRouteMap"
import LoginWall from "./LoginWall"

function CarCard({ car }: { car: Car }) {
  return (
    <div className="glass rounded-2xl overflow-hidden hover:border-primary/30 transition-colors duration-200">
      {/* Card header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-white font-bold text-base">Car {car.carNo}</h3>
        <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
          {car.passengers.length + 1} people
        </span>
      </div>

      {/* Driver */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">
          Driver
        </p>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
            {car.driver?.[0]?.toUpperCase() ?? "?"}
          </div>
          <span className="text-white text-sm font-semibold truncate">
            {car.driver}
          </span>
        </div>
      </div>

      {/* Passengers */}
      {car.passengers.length > 0 && (
        <div className="px-5 pb-5 pt-1">
          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-2">
            Passengers
          </p>
          <div className="space-y-2">
            {car.passengers.map((passenger, idx) => (
              <div key={`${passenger}-${idx}`} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                <span className="text-white/70 text-sm font-medium truncate">
                  {passenger}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/** Fake cars shown blurred behind the login wall — never real data */
const PLACEHOLDER_CARS: Car[] = Array.from({ length: 6 }, (_, i) => ({
  carNo: String(i + 1),
  driver: "Somchai Builder",
  passengers: ["Nok Finno", "Pim Outing", "Kanchana Lake", "Arthit Heaven"].slice(0, 2 + (i % 3)),
}))

export default async function CarsSection() {
  const session = await auth()
  const locked = !session?.user

  const cars = locked ? PLACEHOLDER_CARS : await getCars()
  if (cars.length === 0) return null

  const carGrid = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cars.map((car) => (
        <CarCard key={car.carNo} car={car} />
      ))}
    </div>
  )

  return (
    <section id="cars" className="relative bg-secondary section-divider grid grid-cols-1 lg:grid-cols-12 lg:min-h-screen">
      {/* Left (6/12) — route map */}
      <div className="lg:col-span-6 relative isolate overflow-hidden h-[60vh] min-h-[420px] lg:h-screen lg:sticky lg:top-0">
        <TripRouteMap />
      </div>

      {/* Right (6/12) — car list */}
      <div className="lg:col-span-6 px-6 sm:px-10 xl:px-16 py-20 lg:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                Getting There
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              Car
              <br />
              <span className="text-gradient">Arrangements</span>
            </h2>
          </div>

          {!locked && (
            <div className="text-center">
              <p className="text-5xl font-black text-white">{cars.length}</p>
              <p className="text-white/40 text-sm font-medium mt-1">Cars</p>
            </div>
          )}
        </div>

        {locked ? (
          <LoginWall
            sectionId="cars"
            tone="dark"
            title="Log in to view car arrangements"
            description="Sign in with your Google account to see which car you're riding in."
          >
            {carGrid}
          </LoginWall>
        ) : (
          carGrid
        )}
      </div>
    </section>
  )
}
