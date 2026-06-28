"use client"

import { useRegistrationModal } from "./RegistrationModalContext"

type Props = {
  className?: string
  children: React.ReactNode
}

export default function RegisterButton({ className, children }: Props) {
  const { openModal } = useRegistrationModal()
  return (
    <button onClick={openModal} className={className}>
      {children}
    </button>
  )
}
