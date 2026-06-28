"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ModalCtx = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  isRegistered: boolean
  setIsRegistered: (v: boolean) => void
}

const RegistrationModalContext = createContext<ModalCtx>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  isRegistered: false,
  setIsRegistered: () => {},
})

export function RegistrationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  return (
    <RegistrationModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
        isRegistered,
        setIsRegistered,
      }}
    >
      {children}
    </RegistrationModalContext.Provider>
  )
}

export function useRegistrationModal() {
  return useContext(RegistrationModalContext)
}
