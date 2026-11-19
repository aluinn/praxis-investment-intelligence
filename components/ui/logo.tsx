import { cn } from "@/lib/cn";

/** Dark glass tile with a gradient-stroked "P"; the green node at the end of the bowl is the point of action. */
export function PraxisMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("praxis-mark size-8 shrink-0", className)}>
      <defs>
        <linearGradient id="praxis-g" x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b073ff" />
          <stop offset="0.55" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#14f195" />
        </linearGradient>
        <radialGradient id="praxis-bg" cx="0.25" cy="0.15" r="1">
          <stop stopColor="#2a1450" />
          <stop offset="1" stopColor="#0a0612" />
        </radialGradient>
      </defs>
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="9" fill="url(#praxis-bg)" stroke="url(#praxis-g)" strokeWidth="1.5" />
      <path
        d="M11 24V8.5h5.2a4.6 4.6 0 0 1 0 9.2H11"
        stroke="url(#praxis-g)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 24l6.2-6.2" stroke="#14f195" strokeWidth="2.6" strokeLinecap="round" />
      <circle className="praxis-node" cx="22.6" cy="17.4" r="2" fill="#14f195" />
    </svg>
  );
}

export function PraxisWordmark({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5 leading-tight", className)}>
      <PraxisMark />
      <span>
        <span className="block text-[15px] font-semibold tracking-[0.14em] text-foreground">PRAXIS</span>
        {compact ? null : <span className="block text-[11px] text-muted">Investment Intelligence</span>}
      </span>
    </span>
  );
}
