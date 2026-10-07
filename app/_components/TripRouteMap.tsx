"use client"

import { useState } from "react"
import RouteMap from "./RouteMap"
import { tripRoutes } from "./tripRoutes"

/** Route map with a Day 1 / Day 2 switch and a trip summary card overlaid on top. */
export default function TripRouteMap() {
  const [active, setActive] = useState(0)
  const route = tripRoutes[active]
  const hours = Math.floor(route.durationMin / 60)
  const minutes = route.durationMin % 60

  return (
    <>
      <RouteMap route={route} />

      {/* Trip summary */}
      <div className="absolute top-20 left-4 right-4 max-w-md z-[1000] bg-white/90 backdrop-blur-md border border-secondary/10 shadow-lg rounded-2xl p-4 sm:p-5 pointer-events-none">
        <p className="text-secondary/50 text-xs font-semibold tracking-widest uppercase mb-2">Route</p>
        <p className="text-secondary font-bold leading-snug mb-4">
          {route.from} <span className="text-green-600">→</span> {route.to}
        </p>
        <div className={`grid gap-3 ${route.highway.km ? "grid-cols-3" : "grid-cols-2"}`}>
          <div>
            <p className="text-secondary text-xl font-black leading-none">{route.distanceKm}</p>
            <p className="text-dark-text/50 text-xs mt-1">km</p>
          </div>
          <div>
            <p className="text-secondary text-xl font-black leading-none">
              ~{hours}:{String(minutes).padStart(2, "0")}
            </p>
            <p className="text-dark-text/50 text-xs mt-1">hrs drive</p>
          </div>
          {route.highway.km && (
            <div>
              <p className="text-green-600 text-xl font-black leading-none">{route.highway.name}</p>
              <p className="text-dark-text/50 text-xs mt-1">{route.highway.km} km highway</p>
            </div>
          )}
        </div>
      </div>

      {/* Day switch */}
      <div
        role="tablist"
        aria-label="Trip day"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex gap-1 bg-white/90 backdrop-blur-md border border-secondary/10 shadow-lg rounded-full p-1"
      >
        {tripRoutes.map((r, i) => (
          <button
            key={r.day}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`text-sm font-bold px-5 py-2 rounded-full transition-colors duration-150 ${
              i === active ? "bg-secondary text-white" : "text-secondary/60 hover:text-secondary"
            }`}
          >
            {r.day}
          </button>
        ))}
      </div>
    </>
  )
}
