"use client";

import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader, EnFlowNav } from "@/components/en/EnFlowChrome";
import { useHealthMessage, type MedicineStatus } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";
import { nhsProfile, type Medicine } from "@/data/nhsProfile";

const CHOICES: { value: Exclude<MedicineStatus, null>; label: string }[] = [
  { value: "taking", label: "Still taking" },
  { value: "changed", label: "Dose changed" },
  { value: "stopped", label: "Stopped" },
];

function MedicineCard({ med }: { med: Medicine }) {
  const { medicine, setMedicine, medicineNote, setMedicineNote } = useHealthMessage();
  const status = medicine[med.id] ?? null;

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-neutral-900">
            {med.brand}{" "}
            <span className="font-normal text-neutral-500">· {med.strength}</span>
          </p>
          <p className="text-sm text-neutral-700 mt-0.5">{med.dose}</p>
          <p className="text-sm text-neutral-500 mt-0.5">{med.purpose}</p>
        </div>
        {med.important && (
          <span className="flex-shrink-0 rounded-full bg-cherry-50 px-2 py-0.5 text-xs font-semibold text-cherry-700">
            Important
          </span>
        )}
      </div>

      {med.warning && (
        <div className="mt-3 flex items-start gap-2 rounded-md bg-warning-100 px-3 py-2 text-sm text-warning-900">
          <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0 mt-0.5 text-warning-700" aria-hidden="true" />
          <span>{med.warning}</span>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={`Your answer for ${med.brand}`}>
        {CHOICES.map((c) => (
          <button
            key={c.value}
            onClick={() => setMedicine(med.id, c.value)}
            aria-pressed={status === c.value}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
              status === c.value
                ? "bg-blueberry-900 text-white"
                : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {(status === "changed" || status === "stopped") && (
        <div className="mt-3">
          <label htmlFor={`note-${med.id}`} className="block text-sm font-medium text-neutral-700 mb-1">
            {status === "changed"
              ? "What's changed? (optional)"
              : "Anything your GP should know? (optional)"}
          </label>
          <textarea
            id={`note-${med.id}`}
            value={medicineNote[med.id] ?? ""}
            onChange={(e) => setMedicineNote(med.id, e.target.value)}
            rows={2}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueberry-500"
            placeholder={status === "changed" ? "e.g. now taking half a tablet" : "e.g. stopped because it upset my stomach"}
          />
        </div>
      )}
    </div>
  );
}

export function MedicinesStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const router = useRouter();
  const { completed, complete } = useHealthMessage();
  const nav = flowNav(steps, "medicines", basePath, completed);

  function handleNext() {
    complete("medicines");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <NhsDemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EnStepper steps={nav.steps} />
        <EnFlowHeader nr={nav.nr} total={nav.total} title="Check your medicines">
          This is the repeat medicines list your GP surgery holds for you. Please tell us what
          you&rsquo;re actually taking — it helps keep your records accurate and keeps you safe.
        </EnFlowHeader>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Regular medicines</h2>
        <div className="space-y-3 mb-8">
          {nhsProfile.medicines.regular.map((med) => (
            <MedicineCard key={med.id} med={med} />
          ))}
        </div>

        <h2 className="text-lg font-semibold text-neutral-900 mb-1">Medicines to take when needed</h2>
        <p className="text-sm text-neutral-600 mb-3">Only taken as and when you need them.</p>
        <div className="space-y-3 mb-8">
          {nhsProfile.medicines.whenRequired.map((med) => (
            <MedicineCard key={med.id} med={med} />
          ))}
        </div>

        <div className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-4 mb-8 text-sm text-neutral-700">
          Only your GP can change what&rsquo;s prescribed. What you tell us here is shared with your GP
          surgery so the two records can be brought back into line.
        </div>

        {nav.nextLabel && (
          <EnFlowNav prevHref={nav.prevHref} onNext={handleNext} nextLabel={`Continue to ${nav.nextLabel.toLowerCase()}`} />
        )}
      </div>
    </div>
  );
}
