import day1 from "./carRoute.json"
import day2 from "./day2Route.json"
import day2Return from "./day2ReturnRoute.json"

type LatLng = [number, number]

export type TripRoute = {
  // Label on the map's route switch
  tab: string
  day: string
  // Shown next to the day in the summary card, e.g. "Return trip"
  leg: string
  from: string
  to: string
  distanceKm: number
  durationMin: number
  // km is shown as a stat in the summary card when set
  highway: { ref: string; name: string; km?: number; label: LatLng }
  start: LatLng
  end: LatLng
  coordinates: LatLng[]
  // Extra place names drawn on the map where the basemap labels are hidden at this zoom
  places?: { name: string; at: LatLng }[]
}

// Routes precomputed from OSRM and stored as JSON
export const tripRoutes: TripRoute[] = [
  {
    // Block28 → Lake Heaven Resort, via Motorway 81
    tab: "Day 1",
    day: "Day 1",
    leg: "Outbound trip",
    from: "Block28",
    to: "Lake Heaven Resort",
    distanceKm: day1.distanceKm,
    durationMin: day1.durationMin,
    highway: { ref: "81", name: "M81", km: day1.m81Km, label: day1.m81Label as LatLng },
    start: day1.start as LatLng,
    end: day1.end as LatLng,
    coordinates: day1.coordinates as LatLng[],
  },
  {
    // Lake Heaven Resort → Keeree Mantra (lunch), via Highway 3199
    tab: "Day 2",
    day: "Day 2",
    leg: "Lunch stop",
    from: "Lake Heaven Resort",
    to: "Keeree Mantra",
    distanceKm: day2.distanceKm,
    durationMin: day2.durationMin,
    highway: { ref: day2.highwayRef, name: day2.highwayRef, label: day2.highwayLabel as LatLng },
    start: day2.start as LatLng,
    end: day2.end as LatLng,
    coordinates: day2.coordinates as LatLng[],
    places: [{ name: "Kanchanaburi", at: [14.15, 99.2] }],
  },
  {
    // Keeree Mantra → Block28 (return trip), via Motorway 81
    tab: "Return",
    day: "Day 2",
    leg: "Return trip",
    from: "Keeree Mantra",
    to: "Block28",
    distanceKm: day2Return.distanceKm,
    durationMin: day2Return.durationMin,
    highway: { ref: "81", name: "M81", km: day2Return.m81Km, label: day2Return.m81Label as LatLng },
    start: day2Return.start as LatLng,
    end: day2Return.end as LatLng,
    coordinates: day2Return.coordinates as LatLng[],
  },
]
