import { cn } from "@/lib/cn";

/** Geometric "P": a stem and bowl (knowledge) resolving into a diagonal stroke (action). */
export function PraxisMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={cn("size-6 shrink-0", className)}>
      <path
        d="M11 24V8h5.5a4.75 4.75 0 0 1 0 9.5H11"
        stroke="#ededee"
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path d="M14.5 24 21.5 17" stroke="#8d8d90" strokeWidth="2.2" strokeLinecap="square" />
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
        <span className="block text-[15px] font-semibold tracking-[0.14em] text-[#ededee]">PRAXIS</span>
        {compact ? null : <span className="block text-[11px] text-muted">Investment Intelligence</span>}
      </span>
    </span>
  );
}
