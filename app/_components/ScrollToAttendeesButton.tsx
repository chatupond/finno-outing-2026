"use client"

export default function ScrollToAttendeesButton() {
  return (
    <button
      onClick={() => document.getElementById("attendees")?.scrollIntoView({ behavior: "smooth" })}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white border border-white/20 font-medium text-sm sm:text-base px-5 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-white/10 transition-all duration-200"
    >
      View Attendees
    </button>
  )
}
