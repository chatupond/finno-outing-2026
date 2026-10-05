"use client"

import { useEffect, useRef } from "react"

const NAVBAR_HEIGHT = 64

/**
 * Sticky wrapper that never needs its own scrollbar: pins below the navbar when it fits
 * the viewport, otherwise scrolls with the page until its bottom edge reaches the viewport
 * bottom and pins there. Needs `lg:sticky` (or similar) in className to take effect.
 */
export default function StickyPanel({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      el.style.top = `${Math.min(NAVBAR_HEIGHT, window.innerHeight - el.offsetHeight)}px`
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener("resize", update)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div ref={ref} className={className} style={{ top: NAVBAR_HEIGHT }}>
      {children}
    </div>
  )
}
