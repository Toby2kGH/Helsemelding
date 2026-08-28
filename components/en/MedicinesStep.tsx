"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader, EnFlowNav } from "@/components/en/EnFlowChrome";
import { useHealthMessage, type TakingStatus, type YesUnsure, type YesNo } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";
import { type Medicine } from "@/data/nhsProfile";

const TAKING: { value: Exclude<TakingStatus, null>; label: string }[] = [
  { value: "as_prescribed", label: "Yes, as prescribed" },
  { value: "different_dose", label: "Yes, but a different dose" },
  { value: "stopped", label: "No, I've stopped it" },
];

function ChoiceButtons<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={name}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
            value === o.value
              ? "bg-blueberry-900 text-white"
              : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ContactGp({ medName }: { medName: string }) {
  const { profile } = useHealthMessage();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-blueberry-700 underline hover:text-blueberry-900 focus:outline-none focus:ring-2 focus:ring-blueberry-500 rounded"
      >
        <InformationCircleIcon className="h-4 w-4" aria-hidden="true" />
        How to ask your GP
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">Ask your GP surgery</h2>
            <p className="text-sm text-neutral-700 mb-3">Your GP surgery is:</p>
            <div className="rounded-md bg-blueberry-50 p-3 mb-3">
              <p className="font-semibold text-blueberry-900">{profile.surgery}</p>
            </div>
            <p className="text-sm text-neutral-700 mb-4">
              You can ask them to explain why you take <strong>{medName}</strong> — through the NHS App,
              online, by phone, or at your next appointment. There&rsquo;s no such thing as a silly
              question about your medicines.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full rounded-md bg-blueberry-900 py-2 text-white font-medium hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
            >
              OK, got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function MedicineCard({ med }: { med: Medicine }) {
  const {
    knowWhy, setKnowWhy,
    taking, setTaking,
    whenHow, setWhenHow,
    courseFinished, setCourseFinished,
    medicineNote, setMedicineNote,
  } = useHealthMessage();

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-neutral-900">
            {med.brand} <span className="font-normal text-neutral-500">· {med.strength}</span>
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

      {/* Q1 — Do you know why you're taking this? */}
      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-neutral-900 mb-2">
          Do you know why you&rsquo;re taking this medicine?
        </legend>
        <ChoiceButtons<Exclude<YesUnsure, null>>
          name={`Why you take ${med.brand}`}
          options={[
            { value: "yes", label: "Yes, I know" },
            { value: "unsure", label: "I'm not sure" },
          ]}
          value={knowWhy[med.id] ?? null}
          onChange={(v) => setKnowWhy(med.id, v)}
        />
        {knowWhy[med.id] === "unsure" && <ContactGp medName={med.brand} />}
      </fieldset>

      {/* Q2 — Are you taking it now? */}
      <fieldset className="mt-4">
        <legend className="text-sm font-semibold text-neutral-900 mb-2">Are you taking it at the moment?</legend>
        <ChoiceButtons<Exclude<TakingStatus, null>>
          name={`Taking ${med.brand}`}
          options={TAKING}
          value={taking[med.id] ?? null}
          onChange={(v) => setTaking(med.id, v)}
        />
        {taking[med.id] === "different_dose" && (
          <div className="mt-3">
            <label htmlFor={`note-${med.id}`} className="block text-sm font-medium text-neutral-700 mb-1">
              How are you taking it? (optional)
            </label>
            <input
              id={`note-${med.id}`}
              type="text"
              value={medicineNote[med.id] ?? ""}
              onChange={(e) => setMedicineNote(med.id, e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueberry-500"
              placeholder="e.g. half a tablet, or only three times a week"
            />
          </div>
        )}
      </fieldset>

      {/* Q3 — course-specific */}
      {med.kind === "course" && (
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-neutral-900 mb-2">
            Has this course finished and is no longer needed?
          </legend>
          <ChoiceButtons<Exclude<YesNo, null>>
            name={`Course ${med.brand} finished`}
            options={[
              { value: "yes", label: "Yes, finished" },
              { value: "no", label: "No, still taking it" },
            ]}
            value={courseFinished[med.id] ?? null}
            onChange={(v) => setCourseFinished(med.id, v)}
          />
        </fieldset>
      )}

      {/* Q3 — when-required specific */}
      {med.kind === "whenRequired" && (
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold text-neutral-900 mb-2">
            Do you know when and how to take it?
          </legend>
          <ChoiceButtons<Exclude<YesUnsure, null>>
            name={`When and how to take ${med.brand}`}
            options={[
              { value: "yes", label: "Yes, I know" },
              { value: "unsure", label: "I'm not sure" },
            ]}
            value={whenHow[med.id] ?? null}
            onChange={(v) => setWhenHow(med.id, v)}
          />
          {whenHow[med.id] === "unsure" && <ContactGp medName={med.brand} />}
        </fieldset>
      )}
    </div>
  );
}

export function MedicinesStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const router = useRouter();
  const { completed, complete, profile } = useHealthMessage();
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
          This is the repeat medicines list your GP surgery holds for you. For each one, tell us
          whether you know why you take it and what you&rsquo;re actually taking — it helps keep your
          records accurate and keeps you safe.
        </EnFlowHeader>

        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Regular medicines</h2>
        <div className="space-y-3 mb-8">
          {profile.medicines.regular.map((med) => (
            <MedicineCard key={med.id} med={med} />
          ))}
        </div>

        {profile.medicines.course.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-neutral-900 mb-1">Recent courses</h2>
            <p className="text-sm text-neutral-600 mb-3">A short course prescribed for a specific reason.</p>
            <div className="space-y-3 mb-8">
              {profile.medicines.course.map((med) => (
                <MedicineCard key={med.id} med={med} />
              ))}
            </div>
          </>
        )}

        <h2 className="text-lg font-semibold text-neutral-900 mb-1">Medicines to take when needed</h2>
        <p className="text-sm text-neutral-600 mb-3">Only taken as and when you need them.</p>
        <div className="space-y-3 mb-8">
          {profile.medicines.whenRequired.map((med) => (
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
