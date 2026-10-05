const VARIANTS = ["sedan", "suv", "sports", "van", "pickup", "convertible"] as const

export type CarVariant = (typeof VARIANTS)[number]

export function getCarVariant(index: number): CarVariant {
  return VARIANTS[index % VARIANTS.length]
}

export function getCarLabel(variant: CarVariant): string {
  switch (variant) {
    case "sedan":
      return "Luxury Sedan"
    case "suv":
      return "Luxury SUV"
    case "sports":
      return "Sports Coupe"
    case "van":
      return "Luxury Van"
    case "pickup":
      return "Pickup Truck"
    case "convertible":
      return "Convertible"
  }
}

function Wheels() {
  return (
    <>
      <circle cx="62" cy="90" r="16" className="fill-secondary stroke-white/80" strokeWidth="3" />
      <circle cx="62" cy="90" r="6" className="fill-white/50" />
      <circle cx="178" cy="90" r="16" className="fill-secondary stroke-white/80" strokeWidth="3" />
      <circle cx="178" cy="90" r="6" className="fill-white/50" />
    </>
  )
}

function Cabin({ variant }: { variant: CarVariant }) {
  switch (variant) {
    case "sedan":
      return (
        <>
          <polygon
            points="72,66 96,38 148,38 172,66"
            className="fill-white/10 stroke-white/70"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon points="81,64 99,44 116,44 116,64" className="fill-white/15" />
          <polygon points="122,64 122,44 141,44 159,64" className="fill-white/15" />
        </>
      )
    case "suv":
      return (
        <>
          <path
            d="M70,66 L82,29 L88,25 L156,25 L162,29 L174,66 Z"
            className="fill-white/10 stroke-white/70"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon points="79,64 89,33 116,33 116,64" className="fill-white/15" />
          <polygon points="122,64 122,33 149,33 159,64" className="fill-white/15" />
        </>
      )
    case "sports":
      return (
        <>
          <polygon
            points="90,66 108,48 150,48 168,66"
            className="fill-white/10 stroke-white/70"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon points="99,64 114,52 144,52 157,64" className="fill-white/15" />
          <polygon points="158,66 176,66 172,59 163,59" className="fill-white/70" />
        </>
      )
    case "van":
      return (
        <>
          <path
            d="M34,66 L34,30 Q34,25 39,25 L205,25 Q210,25 210,30 L210,66 Z"
            className="fill-white/10 stroke-white/70"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {[43, 87, 131, 173].map((x) => (
            <rect key={x} x={x} y="31" width="32" height="27" rx="2" className="fill-white/15" />
          ))}
        </>
      )
    case "pickup":
      return (
        <>
          <polygon
            points="66,66 78,32 112,32 118,66"
            className="fill-white/10 stroke-white/70"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon points="73,64 82,38 106,38 111,64" className="fill-white/15" />
          <path
            d="M118,66 L118,40 L124,40 L124,52 L204,52 L204,66 Z"
            className="fill-white/10 stroke-white/70"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </>
      )
    case "convertible":
      return (
        <>
          <polygon
            points="82,66 100,42 113,42 113,66"
            className="fill-white/10 stroke-white/70"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon points="89,64 101,46 109,46 109,64" className="fill-white/15" />
          <rect x="113" y="54" width="56" height="12" className="fill-white/10 stroke-white/40" strokeWidth="1.5" />
        </>
      )
  }
}

export default function CarIllustration({
  variant,
  className,
}: {
  variant: CarVariant
  className?: string
}) {
  return (
    <svg viewBox="0 0 240 120" className={className} fill="none" aria-hidden="true">
      <ellipse cx="120" cy="102" rx="92" ry="6" className="fill-black/30" />
      <rect
        x="20"
        y="66"
        width="200"
        height="24"
        rx="11"
        className="fill-white/10 stroke-white/70"
        strokeWidth="2"
      />
      <Cabin variant={variant} />
      <rect x="211" y="73" width="9" height="6" rx="2" className="fill-primary" />
      <rect x="20" y="73" width="9" height="6" rx="2" className="fill-white/50" />
      <Wheels />
    </svg>
  )
}
