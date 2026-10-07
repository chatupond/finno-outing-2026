"use client"

import { useEffect, useState } from "react"

/** Button that opens a YouTube video in a full-screen modal. */
export default function VideoButton({ videoId, title }: { videoId: string; title: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary/90 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors duration-150"
      >
        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
        </svg>
        Watch Video
      </button>

      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-10">
          <div className="absolute inset-0 bg-black/92 backdrop-blur-md" onClick={() => setOpen(false)} />

          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-150"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative z-10 w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  )
}
