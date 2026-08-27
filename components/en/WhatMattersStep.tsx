"use client";

import { useRouter } from "next/navigation";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader, EnFlowNav } from "@/components/en/EnFlowChrome";
import { useHealthMessage } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";

const OPTIONS = [
  "Staying independent at home",
  "Keeping active and getting out",
  "Managing my conditions with less hassle",
  "Understanding my medicines",
  "Spending time with family and friends",
  "Sleeping better",
  "Staying mentally well",
  "Being involved in decisions about my care",
];

export function WhatMattersStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const router = useRouter();
  const { completed, complete, whatMatters, toggleWhatMatters, whatMattersNote, setWhatMattersNote } =
    useHealthMessage();
  const nav = flowNav(steps, "matters", basePath, completed);

  function handleNext() {
    complete("matters");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <NhsDemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EnStepper steps={nav.steps} />
        <EnFlowHeader nr={nav.nr} total={nav.total} title="What matters to you">
          A quick question before we start: what&rsquo;s most important to you at the moment? It helps
          the people looking after you keep the things that matter in mind. There are no wrong answers,
          and you can pick as many as you like.
        </EnFlowHeader>

        <div className="flex flex-wrap gap-2 mb-8">
          {OPTIONS.map((opt) => {
            const active = whatMatters.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleWhatMatters(opt)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                  active
                    ? "bg-blueberry-900 text-white"
                    : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="mb-8">
          <label htmlFor="matters-note" className="block font-semibold text-neutral-900 mb-1">
            Anything you&rsquo;d like to add? (optional)
          </label>
          <textarea
            id="matters-note"
            value={whatMattersNote}
            onChange={(e) => setWhatMattersNote(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueberry-500"
            placeholder="In your own words…"
          />
        </div>

        {nav.nextLabel && (
          <EnFlowNav prevHref={nav.prevHref} onNext={handleNext} nextLabel={`Continue to ${nav.nextLabel.toLowerCase()}`} />
        )}
      </div>
    </div>
  );
}
