"use client";

import { useRouter } from "next/navigation";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader, EnFlowNav } from "@/components/en/EnFlowChrome";
import { useHealthMessage } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";
import { nhsProfile } from "@/data/nhsProfile";

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="text-sm font-semibold text-neutral-900">{title}</p>
      <ul className="mt-1 space-y-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
            <span className="text-cherry-700 font-bold mt-0.5" aria-hidden="true">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function KeyInfoStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const router = useRouter();
  const { completed, complete, criticalNote, setCriticalNote } = useHealthMessage();
  const nav = flowNav(steps, "critical", basePath, completed);
  const ci = nhsProfile.criticalInfo;

  function handleNext() {
    complete("critical");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <NhsDemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EnStepper steps={nav.steps} />
        <EnFlowHeader nr={nav.nr} total={nav.total} title="Key information about you">
          If you ever need urgent care, this is the information clinicians most need to see quickly.
          Please check it&rsquo;s right.
        </EnFlowHeader>

        <div className="rounded-lg border border-cherry-200 bg-cherry-50 p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldExclamationIcon className="h-5 w-5 text-cherry-700" aria-hidden="true" />
            <h2 className="font-semibold text-cherry-800">On your record</h2>
          </div>
          <div className="space-y-4">
            <InfoBlock title="Allergies" items={ci.allergies} />
            <InfoBlock title="Reactions to medicines" items={ci.reactions} />
            {ci.keyFunction && <InfoBlock title="Other important health information" items={[ci.keyFunction]} />}
            {ci.otherImportant && <InfoBlock title="Things to be aware of" items={[ci.otherImportant]} />}
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="critical-note" className="block font-semibold text-neutral-900 mb-1">
            Is there anything else that&rsquo;s important for us to know?
          </label>
          <p className="text-sm text-neutral-600 mb-2">
            For example, something about your health, your home situation, or how you&rsquo;d like to be
            supported. This is optional.
          </p>
          <textarea
            id="critical-note"
            value={criticalNote}
            onChange={(e) => setCriticalNote(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueberry-500"
            placeholder="Write anything you'd like your care team to know…"
          />
        </div>

        {nav.nextLabel && (
          <EnFlowNav prevHref={nav.prevHref} onNext={handleNext} nextLabel={`Continue to ${nav.nextLabel.toLowerCase()}`} />
        )}
      </div>
    </div>
  );
}
