"use client";

import { useRouter } from "next/navigation";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader, EnFlowNav } from "@/components/en/EnFlowChrome";
import { useHealthMessage } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";

interface Suggestion {
  id: string;
  title: string;
  body: string;
  action: string;
}

// Tailored to the demo patient (71, on a sleeping tablet, with diabetes and high blood pressure).
const SUGGESTIONS: Suggestion[] = [
  {
    id: "falls",
    title: "Steadier on your feet",
    body: "You take a tablet to help you sleep and sometimes feel dizzy, which can make a fall more likely. Strength and balance sessions are one of the most effective ways to lower that risk.",
    action: "Ask about local strength & balance or falls prevention classes.",
  },
  {
    id: "active",
    title: "A little activity, most days",
    body: "Moving a bit more helps your blood pressure, your blood sugar and your mood. It doesn't need to be the gym — short, regular walks count.",
    action: "Find a local walking group or gentle activity near you.",
  },
  {
    id: "diabetes-review",
    title: "Your yearly diabetes checks",
    body: "An annual diabetes review and eye (retinal) screening catch small problems while they're still easy to treat.",
    action: "Check you're booked for your diabetes review and eye screening.",
  },
  {
    id: "medicines-review",
    title: "A medicines review",
    body: "You take several regular medicines. A free review with a pharmacist can make sure they still suit you and see if anything can be simplified.",
    action: "Book a free NHS medicines check-up at your community pharmacy.",
  },
  {
    id: "connected",
    title: "Staying connected",
    body: "Living alone can make some weeks quieter than you'd like. Support to stay social and active is available, and it makes a real difference to how you feel.",
    action: "A social prescribing link worker can connect you to local groups and support.",
  },
];

export function PreventionStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const router = useRouter();
  const { completed, complete, prevention, togglePrevention } = useHealthMessage();
  const nav = flowNav(steps, "prevention", basePath, completed);

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
          A few things that can help, chosen for you. This is information to help you decide — not a
          telling-off. Add anything you&rsquo;d like to act on to your next steps.
        </EnFlowHeader>

        <div className="space-y-3 mb-8">
          {SUGGESTIONS.map((s) => {
            const added = prevention.includes(s.id);
            return (
              <div
                key={s.id}
                className={`rounded-lg border p-4 ${
                  added ? "border-success-700 bg-success-100" : "border-neutral-200 bg-white"
                }`}
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
                    added
                      ? "bg-success-700 text-white"
                      : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {added ? (
                    <>
                      <CheckIcon className="h-4 w-4" aria-hidden="true" /> Added to next steps
                    </>
                  ) : (
                    <>
                      <PlusIcon className="h-4 w-4" aria-hidden="true" /> Add to my next steps
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

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
