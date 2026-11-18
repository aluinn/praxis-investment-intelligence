import { cn } from "@/lib/cn";

/** A plain hairline frame. The screenshot is the content; no window chrome. */
export function BrowserFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("overflow-hidden border border-white/10 bg-[#0c1018]", className)}>{children}</div>;
}
