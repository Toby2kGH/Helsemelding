"use client";

import { useRouter } from "next/navigation";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader, EnFlowNav } from "@/components/en/EnFlowChrome";
import { useHealthMessage } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";
import { buildSuggestions, buildServices, LIFE_SITUATIONS } from "@/lib/preventionEn";

export function PreventionStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const router = useRouter();
  const { completed, complete, prevention, togglePrevention, lifeSituations, toggleLifeSituation, profile } =
    useHealthMessage();
  const nav = flowNav(steps, "prevention", basePath, completed);

  const suggestions = buildSuggestions(profile, lifeSituations);
  const services = buildServices(profile);

  function handleNext() {
    complete("prevention");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <NhsDemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EnStepper steps={nav.steps} />
        <EnFlowHeader nr={nav.nr} total={nav.total} title="Staying well">
          A few things that can help, chosen for you based on your age and health. This is information
          to help you decide — not a telling-off. Add anything you&rsquo;d like to act on to your next
          steps.
        </EnFlowHeader>

        {/* Self-reported life situations reveal tailored suggestions */}
        <section className="mb-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-neutral-900 mb-1">Does any of this apply to you? (optional)</p>
          <p className="text-xs text-neutral-500 mb-3">
            We don&rsquo;t assume anything. If you tick something, we&rsquo;ll show information made for it.
          </p>
          <div className="flex flex-wrap gap-2">
            {LIFE_SITUATIONS.map((l) => {
              const active = lifeSituations.includes(l.id);
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => toggleLifeSituation(l.id)}
                  aria-pressed={active}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                    active ? "bg-blueberry-500 text-white" : "bg-white text-neutral-700 border border-neutral-200 hover:border-blueberry-500"
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </section>

        <div className="space-y-3 mb-8">
          {suggestions.map((s) => {
            const added = prevention.includes(s.id);
            return (
              <div
                key={s.id}
                className={`rounded-lg border p-4 ${added ? "border-success-700 bg-success-100" : "border-neutral-200 bg-white"}`}
              >
                <h2 className="font-semibold text-neutral-900">{s.title}</h2>
                <p className="text-sm text-neutral-700 mt-1">{s.body}</p>
                <p className="text-sm text-neutral-700 mt-2">
                  <span className="font-medium">Next step: </span>
                  {s.action}
                </p>
                <button
                  onClick={() => togglePrevention(s.id)}
                  aria-pressed={added}
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                    added ? "bg-success-700 text-white" : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {added ? (
                    <><CheckIcon className="h-4 w-4" aria-hidden="true" /> Added to next steps</>
                  ) : (
                    <><PlusIcon className="h-4 w-4" aria-hidden="true" /> Add to my next steps</>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Services near you */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-1">Services near you</h2>
          <p className="text-sm text-neutral-600 mb-3">
            Local NHS and community services in {profile.town} that can help.
          </p>
          <div className="space-y-2">
            {services.map((s) => (
              <div key={s.name} className="rounded-lg border border-neutral-200 bg-white p-4">
                <p className="font-medium text-neutral-900">{s.name}</p>
                <p className="text-sm text-neutral-600 mt-0.5">{s.description}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-400 mt-2">
            Illustrative service types. In a real service these would link to what&rsquo;s available in
            your area.
          </p>
        </section>

        <p className="text-sm text-neutral-500 mb-8">
          These are general tips and links, not personal medical advice. You decide what, if anything,
          you&rsquo;d like to do.
        </p>

        {nav.nextLabel && (
          <EnFlowNav prevHref={nav.prevHref} onNext={handleNext} nextLabel={`Continue to ${nav.nextLabel.toLowerCase()}`} />
        )}
      </div>
    </div>
  );
}
