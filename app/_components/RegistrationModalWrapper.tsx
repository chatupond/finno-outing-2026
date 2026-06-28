"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { RegistrationModalProvider } from "./RegistrationModalContext"
import RegistrationModal from "./RegistrationModal"
import { useRegistrationModal } from "./RegistrationModalContext"

function AutoOpenModal() {
  const { openModal } = useRegistrationModal()
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const scrollTarget = params.get("scrollTo")
    if (scrollTarget) {
      params.delete("scrollTo")
      router.replace(window.location.pathname + (params.toString() ? `?${params.toString()}` : ""), { scroll: false })
      let attempts = 0
      const tryScroll = () => {
        const el = document.getElementById(scrollTarget)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        } else if (attempts < 20) {
          attempts++
          setTimeout(tryScroll, 200)
        }
      }
      tryScroll()
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
