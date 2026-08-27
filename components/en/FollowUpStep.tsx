"use client";

import { useRouter } from "next/navigation";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader, EnFlowNav } from "@/components/en/EnFlowChrome";
import { useHealthMessage } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";
import { nhsProfile } from "@/data/nhsProfile";

export interface FollowUpItem {
  id: string;
  label: string;
  destination: string;
  icon: string;
}

// Standing suggestions plus two derived from the medicines review (closing the loop).
export const FOLLOW_UP_ITEMS: FollowUpItem[] = [
  { id: "med-changes", label: "Tell my GP about the changes to my medicines", destination: "GP surgery", icon: "✏️" },
  { id: "med-unsure", label: "Get help understanding a medicine I'm unsure about", destination: "GP surgery or pharmacy", icon: "❓" },
  { id: "vaccines", label: "Book the vaccinations I chose", destination: "Practice nurse", icon: "💉" },
  { id: "zopiclone", label: "Review my sleeping tablet (zopiclone) with my GP", destination: "GP surgery", icon: "💊" },
  { id: "meds-review", label: "Free medicines review", destination: "Community pharmacy", icon: "🧑‍⚕️" },
  { id: "falls", label: "Refer me to strength & balance / falls prevention classes", destination: "Community services", icon: "🤸" },
  { id: "diabetes", label: "Check my diabetes review and eye screening are booked", destination: "GP surgery", icon: "🩺" },
  { id: "social", label: "Connect me with a social prescribing link worker", destination: "Community services", icon: "🤝" },
];

export function FollowUpStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const router = useRouter();
  const { completed, complete, followUp, toggleFollowUp, taking, knowWhy, whenHow } = useHealthMessage();
  const nav = flowNav(steps, "followup", basePath, completed);

  const allMeds = [
    ...nhsProfile.medicines.regular,
    ...nhsProfile.medicines.course,
    ...nhsProfile.medicines.whenRequired,
  ];
  const hasChanges = allMeds.some((m) => taking[m.id] === "different_dose" || taking[m.id] === "stopped");
  const hasUnsure = allMeds.some((m) => knowWhy[m.id] === "unsure" || whenHow[m.id] === "unsure");

  // Only show the derived items when your answers make them relevant.
  const visibleItems = FOLLOW_UP_ITEMS.filter((item) => {
    if (item.id === "med-changes") return hasChanges;
    if (item.id === "med-unsure") return hasUnsure;
    return true;
  });

  function handleNext() {
    complete("followup");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <NhsDemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EnStepper steps={nav.steps} />
        <EnFlowHeader nr={nav.nr} total={nav.total} title="Turn this into next steps">
          This is where a Health Message does more than a leaflet. Choose what you&rsquo;d like to
          happen, and it&rsquo;s sent to the right place — so it actually gets done, instead of being
          left to you to chase.
        </EnFlowHeader>

        {(hasChanges || hasUnsure) && (
          <div className="mb-4 rounded-md border border-blueberry-100 bg-blueberry-50 p-3 text-sm text-neutral-700">
            Based on your medicines answers, we&rsquo;ve suggested a couple of extra next steps at the
            top.
          </div>
        )}

        <div className="space-y-3 mb-8">
          {visibleItems.map((item) => {
            const selected = followUp.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleFollowUp(item.id)}
                aria-pressed={selected}
                className={`w-full flex items-center gap-3 rounded-lg border p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                  selected ? "border-blueberry-500 bg-blueberry-50" : "border-neutral-200 bg-white hover:bg-neutral-50"
                }`}
              >
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <span className="flex-1">
                  <span className="block font-medium text-neutral-900">{item.label}</span>
                  <span className="block text-xs text-neutral-500 mt-0.5">Goes to: {item.destination}</span>
                </span>
                <span
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? "border-blueberry-500 bg-blueberry-500 text-white" : "border-neutral-300 text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-4 mb-8 text-sm text-neutral-700">
          Nothing is sent without your say-so. On the next page you&rsquo;ll see exactly what goes
          where before anything is shared.
        </div>

        {nav.nextLabel && (
          <EnFlowNav prevHref={nav.prevHref} onNext={handleNext} nextLabel={`Continue to ${nav.nextLabel.toLowerCase()}`} />
        )}
      </div>
    </div>
  );
}
