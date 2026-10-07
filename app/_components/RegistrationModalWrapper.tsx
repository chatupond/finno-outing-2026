"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { RegistrationModalProvider } from "./RegistrationModalContext"
import RegistrationModal from "./RegistrationModal"
import { RESTORE_SCROLL_KEY, useRegistrationModal } from "./RegistrationModalContext"

/**
 * Keeps the page scrolled to `getTop()` while the layout settles. Sections stream in after
 * hydration (and swap login-wall placeholders for real data), which changes the height of
 * everything above the target. Stops once the user scrolls themselves or a few seconds pass.
 */
function pinScroll(getTop: () => number | null) {
  const pin = () => {
    const top = getTop()
    if (top !== null) window.scrollTo({ top, behavior: "instant" })
  }
  const observer = new ResizeObserver(pin)
  const userEvents = ["wheel", "touchstart", "keydown"]
  const stop = () => {
    observer.disconnect()
    clearTimeout(timer)
    for (const event of userEvents) window.removeEventListener(event, stop)
  }
  const timer = setTimeout(stop, 8000)
  for (const event of userEvents) window.addEventListener(event, stop, { passive: true })
  observer.observe(document.body)
  pin()
}

/** Scroll position saved before the Google sign-in redirect, if any */
function takeSavedScrollY(): number | null {
  let saved: string | null = null
  try {
    saved = sessionStorage.getItem(RESTORE_SCROLL_KEY)
    sessionStorage.removeItem(RESTORE_SCROLL_KEY)
  } catch {}
  const y = Number(saved)
  return saved && Number.isFinite(y) ? y : null
}

/** Top of a section, respecting its scroll-margin; null until it has streamed in */
function sectionTop(id: string): number | null {
  const el = document.getElementById(id)
  if (!el) return null
  return el.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(el).scrollMarginTop || "0")
}

function AutoOpenModal() {
  const { openModal } = useRegistrationModal()
  const router = useRouter()

  useEffect(() => {
    const savedY = takeSavedScrollY()
    if (savedY !== null) pinScroll(() => savedY)

    const params = new URLSearchParams(window.location.search)

    const scrollTarget = params.get("scrollTo")
    if (scrollTarget) {
      params.delete("scrollTo")
      router.replace(window.location.pathname + (params.toString() ? `?${params.toString()}` : ""), { scroll: false })
      pinScroll(() => sectionTop(scrollTarget))
    }

    if (params.get("register") === "1") {
      openModal()
      params.delete("register")
      router.replace(window.location.pathname + (params.toString() ? `?${params.toString()}` : ""), { scroll: false })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default function RegistrationModalWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RegistrationModalProvider>
      {children}
      <AutoOpenModal />
      <RegistrationModal />
    </RegistrationModalProvider>
  )
}
