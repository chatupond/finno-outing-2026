"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  text: string
  className?: string
  speed?: number
  enabled?: boolean
  onDone?: () => void
}

export default function TypingText({ text, className, speed = 25, enabled = true, onDone }: Props) {
  const [displayed, setDisplayed] = useState("")
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const started = inView && enabled

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    setDisplayed("")
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(interval); onDone?.() }
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span ref={ref} className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-0.5 h-[1em] bg-current align-middle ml-0.5 animate-pulse" />
      )}
    </span>
  )
}
