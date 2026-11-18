import { Reveal } from "@/components/landing/reveal";

export function About() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6" aria-labelledby="about-heading">
      <Reveal className="mx-auto grid max-w-6xl gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1fr_1.4fr]">
        <h2 id="about-heading" className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
          Praxis: knowledge put into practice.
        </h2>
        <div className="max-w-xl space-y-4 text-sm leading-7 text-muted">
          <p>
            The word is Ancient Greek for action informed by understanding. Praxis Investment Intelligence brings portfolio tracking, market news, saved research and a personal journal into one workspace.
          </p>
          <p>
            Prices come from public market data when a GBP quote is available. News excerpts come from publisher RSS feeds and always link back to the original story.
          </p>
          <p>
            Information in Praxis is for organisation and reference. It is not financial advice, and Praxis does not connect to an exchange account or place trades.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
