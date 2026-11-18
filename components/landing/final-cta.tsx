import { TransitionLink } from "@/components/transition/transition-link";

export function FinalCta() {
  return (
    <section className="px-4 py-24 sm:px-6" aria-labelledby="cta-heading">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-end">
        <h2 id="cta-heading" className="max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
          Open the workspace.
        </h2>
        <TransitionLink
          href="/app/for-you"
          className="inline-flex min-h-11 items-center rounded-sm bg-foreground px-6 text-sm font-medium text-background hover:bg-white"
        >
          Open Praxis
        </TransitionLink>
      </div>
    </section>
  );
}
