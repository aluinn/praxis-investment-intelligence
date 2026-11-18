const PROBLEMS = [
  ["Scattered holdings", "Positions sit across exchanges and wallets."],
  ["Inconsistent performance", "Returns are tracked differently in every place."],
  ["Split reasoning", "The news you read and the reasons you act live apart."],
  ["Too many tabs", "Open feeds add noise, not clarity."],
];

import { Reveal } from "@/components/landing/reveal";

export function Problem() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="problem-heading">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1fr_1.4fr]">
        <h2 id="problem-heading" className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
          A portfolio is more than its prices.
        </h2>
        <div>
          <ul className="divide-y divide-white/10 border-b border-white/10">
            {PROBLEMS.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 0.07} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <h3 className="text-sm font-medium text-teal">{title}</h3>
                <p className="text-sm leading-6 text-muted">{body}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 max-w-lg text-base leading-7 text-foreground">
            Praxis keeps holdings, the stories around them, saved research and the reasoning behind each decision together.
          </p>
        </div>
      </div>
    </section>
  );
}
