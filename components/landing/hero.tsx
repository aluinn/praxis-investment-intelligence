import Image from "next/image";
import { Reveal } from "@/components/landing/reveal";
import { BrowserFrame } from "@/components/landing/browser-frame";
import { TransitionLink } from "@/components/transition/transition-link";

const FACTS = [
  { figure: "7", tone: "text-foreground", label: "Publisher feeds, linked back to the original story" },
  { figure: "2", tone: "text-foreground", label: "Live event sources: Snapshot governance and Binance" },
  { figure: "0", tone: "text-muted", label: "Trades placed. Praxis never touches an exchange account" },
];

export function Hero() {
  return (
    <section id="product" className="relative bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(153,69,255,0.28),transparent_70%)] px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal y={24}><h1 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          <span className="text-fade">From insight to</span> <span className="text-gradient">action.</span>
        </h1></Reveal>
        <p className="mt-8 max-w-xl text-base leading-7 text-muted sm:text-lg">
          Praxis is a research workspace for digital-asset investors. Holdings, market news, saved research and a decision journal, in one place.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <TransitionLink
            href="/app/for-you"
            className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-5 text-sm font-medium text-white hover:bg-primary-bright"
          >
            Open Praxis
          </TransitionLink>
          <a
            href="#features"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border border-white/15 px-5 text-sm font-medium text-foreground hover:bg-white/5"
          >
            See how it works
          </a>
        </div>

        <Reveal><dl className="mt-16 grid border-t border-white/10 sm:grid-cols-3">
          {FACTS.map((fact) => (
            <div key={fact.label} className="border-b border-white/10 py-6 sm:border-b-0 sm:pr-8">
              <dt className={`font-mono text-4xl tabular-nums ${fact.tone}`}>{fact.figure}</dt>
              <dd className="mt-2 max-w-[16rem] text-sm leading-6 text-muted">{fact.label}</dd>
            </div>
          ))}
        </dl></Reveal>

        <Reveal className="mt-10"><BrowserFrame>
          <Image
            src="/assets/praxis/praxis-portfolio.png"
            alt="Praxis portfolio screen with a pound total, daily change, allocation chart, and holdings for ETH, SOL, and BTC."
            width={2100}
            height={1185}
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="h-auto w-full"
          />
        </BrowserFrame></Reveal>
      </div>
    </section>
  );
}
