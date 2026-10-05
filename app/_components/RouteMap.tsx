"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"
import route from "./carRoute.json"

type LatLng = [number, number]

// Route precomputed from OSRM (Block28 → Lake Heaven Resort, via Motorway 81) and stored in carRoute.json
const coordinates = route.coordinates as LatLng[]

const pin = (label: string, variant: "start" | "end") => `
  <div class="route-pin route-pin--${variant}">
    <span class="route-pin__dot"></span>
    <span class="route-pin__label">${label}</span>
  </div>`

/** Light map with the trip route drawn as an animated green gradient line. */
export default function RouteMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: import("leaflet").Map | undefined
    let cancelled = false

    // Leaflet touches `window` on import, so load it only in the browser
    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return

      map = L.map(containerRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
      })
      L.control.zoom({ position: "bottomright" }).addTo(map)
      // Set the view first: Leaflet only creates the SVG renderer (needed for the gradient) once the map has a view
      // Extra top padding keeps the route clear of the trip summary card overlaid on the map
      map.fitBounds(L.latLngBounds(coordinates), { paddingTopLeft: [40, 260], paddingBottomRight: [40, 60] })

      // Esri Light Gray Canvas: keyless light basemap (base + labels)
      const esri = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas"
      L.tileLayer(`${esri}/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}`, {
        attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors",
        maxZoom: 16,
      }).addTo(map)
      L.tileLayer(`${esri}/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}`, { maxZoom: 16 }).addTo(map)

      const renderer = L.svg({ padding: 0.5 })
      L.polyline(coordinates, { renderer, weight: 14, opacity: 1, className: "route-glow" }).addTo(map)
      L.polyline(coordinates, { renderer, weight: 6, opacity: 1, className: "route-line" }).addTo(map)
      L.polyline(coordinates, { renderer, weight: 3, opacity: 1, className: "route-flow", dashArray: "1 22", lineCap: "round" }).addTo(map)

      // Animated green gradient, referenced from CSS by .route-line
      const svg = map.getPanes().overlayPane.querySelector("svg")
      if (svg && !svg.querySelector("#route-gradient")) {
        svg.insertAdjacentHTML(
          "afterbegin",
          `<defs>
            <linearGradient id="route-gradient" x1="0" y1="0" x2="1" y2="0" spreadMethod="reflect">
              <stop offset="0%" stop-color="#14532d" />
              <stop offset="35%" stop-color="#22c55e" />
              <stop offset="65%" stop-color="#a3e635" />
              <stop offset="100%" stop-color="#16a34a" />
              <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="2 0" dur="4s" repeatCount="indefinite" />
            </linearGradient>
          </defs>`
        )
      }

      L.marker(route.start as LatLng, {
        icon: L.divIcon({ className: "", html: pin("Block28", "start"), iconSize: [0, 0] }),
      }).addTo(map)
      L.marker(route.end as LatLng, {
        icon: L.divIcon({ className: "", html: pin("Lake Heaven Resort", "end"), iconSize: [0, 0] }),
      }).addTo(map)
      L.marker(route.m81Label as LatLng, {
        icon: L.divIcon({ className: "", html: '<span class="route-shield">81</span>', iconSize: [0, 0] }),
        interactive: false,
      }).addTo(map)

    })

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 bg-[#e8e8e8]" aria-label="Map of the route from Block28 to Lake Heaven Resort" />
}
