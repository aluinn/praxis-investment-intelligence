import Image from "next/image";
import { BrowserFrame } from "@/components/landing/browser-frame";
import { Reveal } from "@/components/landing/reveal";

const CHAPTERS = [
  {
    id: "for-you",
    tone: "text-muted",
    kicker: "For You",
    heading: "News that knows what matters to you.",
    body: "Bring together stories from leading crypto publications, prioritised around the assets you follow. Scan concise excerpts, visit the original report or save an article for later.",
    src: "/assets/praxis/praxis-for-you.png",
    width: 2100,
    height: 1185,
    alt: "Praxis For You page with asset filters and news cards from CoinDesk and CryptoSlate.",
  },
  {
    id: "portfolio",
    tone: "text-muted",
    kicker: "Portfolio",
    heading: "Every holding. One clear view.",
    body: "Organise your digital assets in one portfolio, calculate their current value and understand allocation through a clear visual breakdown.",
    src: "/assets/praxis/praxis-portfolio.png",
    width: 2100,
    height: 1185,
    alt: "Praxis portfolio page with total value, allocation doughnut, and an add-asset control.",
  },
  {
    id: "journal",
    tone: "text-muted",
    kicker: "Trade Journal",
    heading: "Remember the thinking behind every move.",
    body: "Record buys, sells, notes and ideas alongside the reasoning that shaped each decision.",
    src: "/assets/praxis/praxis-journal.png",
    width: 2100,
    height: 1185,
    alt: "Praxis trade journal with buy, sell, and note entries for LINK, BTC, and ETH.",
  },
  {
    id: "saved",
    tone: "text-muted",
    kicker: "Saved Research",
    heading: "Turn market noise into organised research.",
    body: "Save important stories and arrange them into collections by asset, investment thesis or market event.",
    src: "/assets/praxis/praxis-saved.png",
    width: 2100,
    height: 1185,
    alt: "Praxis saved articles page with search and stories from Cointelegraph and Decrypt.",
  },
  {
    id: "events",
    tone: "text-muted",
    kicker: "Events",
    heading: "See the catalysts before they land.",
    body: "Live governance votes from Snapshot and exchange activity from Binance, alongside your own network upgrades, unlocks, and other catalysts, in one filterable calendar.",
    src: "/assets/praxis/praxis-events.png",
    width: 2100,
    height: 1185,
    alt: "Praxis events calendar with category filters and upcoming entries like a token unlock and a governance vote.",
  },
] as const;

type Chapter = (typeof CHAPTERS)[number];

function Shot({ chapter }: { chapter: Chapter }) {
  return (
    <BrowserFrame>
      <Image
        src={chapter.src}
        alt={chapter.alt}
        width={chapter.width}
        height={chapter.height}
        sizes="(min-width: 1024px) 720px, 100vw"
        className="h-auto w-full"
      />
    </BrowserFrame>
  );
}

// Plain scroll: each feature is an ordinary section in the page flow, with the
// text and screenshot side by side (alternating) and a light fade-in on entry.
export function ProductStory() {
  return (
    <section id="features" className="px-4 sm:px-6" aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">
        Product features
      </h2>
      <div className="mx-auto max-w-6xl">
        {CHAPTERS.map((chapter, index) => (
          <article
            key={chapter.id}
            className="grid items-center gap-8 border-t border-white/10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24"
          >
            <Reveal className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <p className={`font-mono text-xs uppercase tracking-wider ${chapter.tone}`}>{chapter.kicker}</p>
              <h3 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{chapter.heading}</h3>
              <p className="mt-4 max-w-md text-base leading-7 text-muted">{chapter.body}</p>
            </Reveal>
            <Reveal delay={0.08} y={24} className={index % 2 === 1 ? "lg:order-1" : undefined}>
              <Shot chapter={chapter} />
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
