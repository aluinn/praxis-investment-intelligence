import { Reveal } from "@/components/landing/reveal";

const STEPS = [
  ["Read", "Scan stories tied to the assets you follow."],
  ["Save", "Keep the pieces you want to revisit, in collections."],
  ["Record", "Write down the decision while the reason is fresh."],
  ["Review", "See value and allocation in one place."],
];

export function Workflow() {
  return (
    <section id="workflow" className="px-4 py-20 sm:px-6 lg:py-28" aria-labelledby="workflow-heading">
      <div className="mx-auto max-w-6xl border-t border-white/10 pt-10">
        <h2 id="workflow-heading" className="max-w-xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
          Read, save, record, review.
        </h2>
        <ol className="mt-10 grid border-t border-white/10 md:grid-cols-4">
          {STEPS.map(([title, body], index) => (
            <Reveal as="li" key={title} delay={index * 0.1} className="border-b border-white/10 py-6 md:border-b-0 md:pr-6">
              <p className="font-mono text-xs text-muted">0{index + 1}</p>
              <h3 className="mt-4 text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
