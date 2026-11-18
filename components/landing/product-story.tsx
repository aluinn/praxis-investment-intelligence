"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
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

const HOLD = 0.6;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

// A push transition: each chapter rests in place, then slides fully out the
// top while the next one slides fully in from the bottom at the same rate.
// The two always tile the container exactly, so nothing is ever translucent
// or double-exposed — unlike a crossfade, which blends two layers at once.
function offsetToPercent(offset: number) {
  if (offset >= 0) return clamp(offset / (1 - HOLD), 0, 1) * 100;
  if (offset >= -HOLD) return 0;
  return clamp((offset + HOLD) / (1 - HOLD), -1, 0) * 100;
}

function useChapterStyle(continuousIndex: MotionValue<number>, index: number) {
  const y = useTransform(continuousIndex, (value) => `${offsetToPercent(index - value)}%`);
  return { y };
}

function Shot({ chapter }: { chapter: (typeof CHAPTERS)[number] }) {
  return (
    <BrowserFrame>
      <Image
        src={chapter.src}
        alt={chapter.alt}
        width={chapter.width}
        height={chapter.height}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="h-auto w-full"
      />
    </BrowserFrame>
  );
}

export function ProductStory() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.7, restDelta: 0.0005 });
  const continuousIndex = useTransform(progress, (value) => value * CHAPTERS.length);

  // CHAPTERS has a fixed length of 5, so these are unrolled rather than
  // called from inside a .map callback (hooks can't run inside callbacks).
  const styles = [
    useChapterStyle(continuousIndex, 0),
    useChapterStyle(continuousIndex, 1),
    useChapterStyle(continuousIndex, 2),
    useChapterStyle(continuousIndex, 3),
    useChapterStyle(continuousIndex, 4),
  ];

  return (
    <section id="features" className="px-4 py-8 sm:px-6" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="features-heading" className="sr-only">
          Product features
        </h2>

        {reduce ? (
          <div className="space-y-16">
            {CHAPTERS.map((chapter) => (
              <article key={chapter.id} className="space-y-5">
                <p className={`font-mono text-xs uppercase tracking-wider ${chapter.tone}`}>{chapter.kicker}</p>
                <h3 className="font-serif text-3xl leading-tight tracking-tight">{chapter.heading}</h3>
                <p className="text-base leading-7 text-muted">{chapter.body}</p>
                <Shot chapter={chapter} />
              </article>
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-16 lg:hidden">
              {CHAPTERS.map((chapter) => (
                <Reveal key={chapter.id} as="article" className="space-y-5">
                  <p className={`font-mono text-xs uppercase tracking-wider ${chapter.tone}`}>{chapter.kicker}</p>
                  <h3 className="font-serif text-3xl leading-tight tracking-tight">{chapter.heading}</h3>
                  <p className="text-base leading-7 text-muted">{chapter.body}</p>
                  <Shot chapter={chapter} />
                </Reveal>
              ))}
            </div>

            <div ref={trackRef} className="hidden lg:grid lg:grid-cols-2 lg:gap-16">
              <div className="relative">
                <div className="sticky top-1/2 -translate-y-1/2">
                  <div className="relative aspect-[2100/1185] overflow-hidden ">
                    {CHAPTERS.map((chapter, index) => (
                      <motion.div key={chapter.id} className="absolute inset-0" style={{ y: styles[index].y }}>
                        <Shot chapter={chapter} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="sticky top-1/2 -translate-y-1/2">
                  <div className="relative min-h-[260px] overflow-hidden">
                    {CHAPTERS.map((chapter, index) => (
                      <motion.div key={chapter.id} className="absolute inset-0" style={{ y: styles[index].y }}>
                        <p className={`font-mono text-xs uppercase tracking-wider ${chapter.tone}`}>{chapter.kicker}</p>
                        <h3 className="mt-3 font-serif text-4xl leading-tight tracking-tight">{chapter.heading}</h3>
                        <p className="mt-4 max-w-md text-base leading-7 text-muted">{chapter.body}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {CHAPTERS.map((chapter) => (
                  <div key={chapter.id} className="h-[95vh]" aria-hidden />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
