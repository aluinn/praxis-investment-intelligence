"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { BrowserFrame } from "@/components/landing/browser-frame";
import { Reveal } from "@/components/landing/reveal";

const CHAPTERS = [
  {
    id: "for-you",
    tone: "text-primary-bright",
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
    tone: "text-teal",
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
    tone: "text-accent",
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
    tone: "text-primary-bright",
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
    tone: "text-teal",
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
        sizes="(min-width: 1024px) 960px, 100vw"
        className="h-auto w-full"
      />
    </BrowserFrame>
  );
}

// One tall section per chapter. The scene inside is pinned for the length of
// the section while the scroll position drives a slow fade in, a held moment,
// and a fade out, with a gentle parallax on the image. Nothing slides past
// anything else; the page just keeps scrolling normally.
function PinnedChapter({ chapter }: { chapter: Chapter }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5, restDelta: 0.0005 });
  const fade = useTransform(p, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);
  const textY = useTransform(p, [0, 0.22, 0.78, 1], [40, 0, 0, -40]);
  const imageY = useTransform(p, [0, 1], [70, -70]);
  const imageScale = useTransform(p, [0, 0.5, 1], [0.96, 1, 1.03]);

  return (
    <section ref={ref} className="relative h-[240vh]" aria-labelledby={`chapter-${chapter.id}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          className="absolute right-0 top-1/2 w-[min(960px,64vw)] -translate-y-1/2"
          style={{ opacity: fade, y: imageY, scale: imageScale }}
        >
          <div className="[mask-image:linear-gradient(to_right,transparent,black_28%)]">
            <Shot chapter={chapter} />
          </div>
        </motion.div>
        <motion.div className="relative z-10 max-w-lg" style={{ opacity: fade, y: textY }}>
          <p className={`font-mono text-xs uppercase tracking-wider ${chapter.tone}`}>{chapter.kicker}</p>
          <h3
            id={`chapter-${chapter.id}`}
            className="mt-4 font-serif text-5xl font-normal leading-[1.04] tracking-tight [text-shadow:0_2px_40px_rgba(8,10,18,0.9)]"
          >
            {chapter.heading}
          </h3>
          <p className="mt-5 max-w-md text-base leading-7 text-muted [text-shadow:0_2px_24px_rgba(8,10,18,0.95)]">
            {chapter.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StackedChapter({ chapter }: { chapter: Chapter }) {
  return (
    <Reveal as="article" className="space-y-5">
      <p className={`font-mono text-xs uppercase tracking-wider ${chapter.tone}`}>{chapter.kicker}</p>
      <h3 className="font-serif text-3xl leading-tight tracking-tight">{chapter.heading}</h3>
      <p className="text-base leading-7 text-muted">{chapter.body}</p>
      <Shot chapter={chapter} />
    </Reveal>
  );
}

export function ProductStory() {
  const reduce = useReducedMotion();
  return (
    <section id="features" aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">
        Product features
      </h2>
      {/* Phones and reduced motion: a plain stacked list. */}
      <div className={`mx-auto max-w-6xl space-y-16 px-4 py-8 sm:px-6 ${reduce ? "" : "lg:hidden"}`}>
        {CHAPTERS.map((chapter) => (
          <StackedChapter key={chapter.id} chapter={chapter} />
        ))}
      </div>
      {reduce ? null : (
        <div className="mx-auto hidden max-w-6xl px-6 lg:block">
          {CHAPTERS.map((chapter) => (
            <PinnedChapter key={chapter.id} chapter={chapter} />
          ))}
        </div>
      )}
    </section>
  );
}
