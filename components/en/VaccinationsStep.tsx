"use client";

import { useRouter } from "next/navigation";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader, EnFlowNav } from "@/components/en/EnFlowChrome";
import { useHealthMessage, type ImmunisationChoice } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";
import { nhsProfile, type Priority } from "@/data/nhsProfile";

const PRIORITY_STYLE: Record<Priority, string> = {
  high: "bg-cherry-50 text-cherry-700",
  medium: "bg-warning-100 text-warning-900",
  low: "bg-neutral-100 text-neutral-600",
};

const PRIORITY_LABEL: Record<Priority, string> = {
  high: "Recommended for you",
  medium: "Worth considering",
  low: "Optional",
};

const CHOICES: { value: Exclude<ImmunisationChoice, null>; label: string }[] = [
  { value: "book", label: "I'd like to book this" },
  { value: "already", label: "Already had it" },
  { value: "not_now", label: "Not right now" },
];

export function VaccinationsStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const router = useRouter();
  const { completed, complete, immunisation, setImmunisation } = useHealthMessage();
  const nav = flowNav(steps, "vaccinations", basePath, completed);

  function handleNext() {
    complete("vaccinations");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <NhsDemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EnStepper steps={nav.steps} />
        <EnFlowHeader nr={nav.nr} total={nav.total} title="Your vaccinations">
          Based on your age and health, here are the NHS vaccinations you may be due. Booking is up to
          you — this just helps your GP surgery know what you&rsquo;d like.
        </EnFlowHeader>

        <div className="space-y-3 mb-8">
          {nhsProfile.immunisationAdvice.map((v) => {
            const choice = immunisation[v.vaccine] ?? null;
            return (
              <div key={v.vaccine} className="rounded-lg border border-neutral-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-semibold text-neutral-900">{v.vaccine}</h2>
                  <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${PRIORITY_STYLE[v.priority]}`}>
                    {PRIORITY_LABEL[v.priority]}
                  </span>
                </div>
                <p className="text-sm text-neutral-700 mt-1">{v.reason}</p>
                <p className="text-xs text-neutral-500 mt-1">Last recorded: {v.lastGiven}</p>
                <p className="text-sm text-neutral-700 mt-2">
                  <span className="font-medium">What to do: </span>
                  {v.action}
                </p>
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={`Your choice for ${v.vaccine}`}>
                  {CHOICES.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setImmunisation(v.vaccine, c.value)}
                      aria-pressed={choice === c.value}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                        choice === c.value
                          ? "bg-blueberry-900 text-white"
                          : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <details className="rounded-lg border border-neutral-200 bg-white p-4 mb-8">
          <summary className="cursor-pointer font-semibold text-neutral-900">
            Your vaccination history
          </summary>
          <ul className="mt-3 space-y-1.5">
            {nhsProfile.immunisationHistory.map((h) => (
              <li key={h.vaccine} className="flex items-center justify-between text-sm text-neutral-700">
                <span>{h.vaccine}</span>
                <span className="text-neutral-500">{h.lastGiven ?? "Not on record"}</span>
              </li>
            ))}
          </ul>
        </details>

        {nav.nextLabel && (
          <EnFlowNav prevHref={nav.prevHref} onNext={handleNext} nextLabel={`Continue to ${nav.nextLabel.toLowerCase()}`} />
        )}
      </div>
    </div>
  );
}
