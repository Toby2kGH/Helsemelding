"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader } from "@/components/en/EnFlowChrome";
import { useHealthMessage } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";
import { nhsProfile } from "@/data/nhsProfile";

export function ConfirmStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const { completed, complete, medicine, immunisation, criticalNote, sharing } = useHealthMessage();
  const nav = flowNav(steps, "confirm", basePath, completed);
  const [sent, setSent] = useState(false);

  const allMeds = [...nhsProfile.medicines.regular, ...nhsProfile.medicines.whenRequired];
  const changed = allMeds.filter((m) => medicine[m.id] === "changed" || medicine[m.id] === "stopped");
  const vaccinesToBook = nhsProfile.immunisationAdvice.filter((v) => immunisation[v.vaccine] === "book");

  function handleSend() {
    complete("confirm");
    setSent(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (sent) {
    return (
      <div>
        <NhsDemoBanner />
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="rounded-lg border border-success-700 bg-success-100 p-8 text-center">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-success-700" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-success-700 mt-3">Thank you, {nhsProfile.firstName}</h1>
            <p className="text-neutral-700 mt-2">
              Your Health Message has been sent to <strong>{nhsProfile.surgery}</strong>.
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-6 mt-6">
            <h2 className="font-semibold text-neutral-900 mb-3">What happens next</h2>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">→</span>
                {nhsProfile.gp} and the team will review anything you&rsquo;ve flagged about your medicines.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">→</span>
                Any vaccinations you asked to book will be picked up by the practice nurse.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">→</span>
                Your sharing choices have been saved to your record.
              </li>
            </ul>
            <p className="text-sm text-neutral-500 mt-4">
              If something is urgent, don&rsquo;t wait for a reply — contact your GP surgery, call 111,
              or call 999 in an emergency.
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-blueberry-700 font-medium hover:underline">
              Back to the home page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NhsDemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EnStepper steps={nav.steps} />
        <EnFlowHeader nr={nav.nr} total={nav.total} title="Check and send">
          Here&rsquo;s a summary of what you&rsquo;ll send to your GP surgery. Take a moment to check it
          over.
        </EnFlowHeader>

        <div className="space-y-4 mb-8">
          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="font-semibold text-neutral-900 mb-1">Medicines</p>
            {changed.length === 0 ? (
              <p className="text-sm text-neutral-700">You confirmed your medicines with no changes.</p>
            ) : (
              <ul className="text-sm text-neutral-700 space-y-1">
                {changed.map((m) => (
                  <li key={m.id} className="flex items-start gap-2">
                    <span className="text-cherry-700 font-bold mt-0.5" aria-hidden="true">•</span>
                    {m.brand} — {medicine[m.id] === "stopped" ? "stopped" : "dose changed"}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="font-semibold text-neutral-900 mb-1">Vaccinations</p>
            {vaccinesToBook.length === 0 ? (
              <p className="text-sm text-neutral-700">No vaccinations to book right now.</p>
            ) : (
              <ul className="text-sm text-neutral-700 space-y-1">
                {vaccinesToBook.map((v) => (
                  <li key={v.vaccine} className="flex items-start gap-2">
                    <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">•</span>
                    {v.vaccine} — you&rsquo;d like to book
                  </li>
                ))}
              </ul>
            )}
          </div>

          {criticalNote.trim() && (
            <div className="rounded-lg border border-neutral-200 bg-white p-4">
              <p className="font-semibold text-neutral-900 mb-1">Something you added</p>
              <p className="text-sm text-neutral-700">&ldquo;{criticalNote.trim()}&rdquo;</p>
            </div>
          )}

          <div className="rounded-lg border border-neutral-200 bg-white p-4">
            <p className="font-semibold text-neutral-900 mb-1">Sharing</p>
            <ul className="text-sm text-neutral-700 space-y-1">
              <li>Summary Care Record additional information: {sharing.scrAdditionalInformation ? "on" : "off"}</li>
              <li>GP and hospital sharing: {sharing.gpHospitalSharing ? "on" : "off"}</li>
              <li>
                Organ donation:{" "}
                {sharing.organDonationDecision === "opt_in"
                  ? "registered as a donor"
                  : sharing.organDonationDecision === "opt_out"
                  ? "chosen not to donate"
                  : "no decision recorded"}
              </li>
              <li>Data used for research and planning: {sharing.nationalDataOptOut ? "opted out" : "allowed"}</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href={nav.prevHref}
            className="rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            Back
          </Link>
          <button
            onClick={handleSend}
            className="flex items-center gap-2 rounded-md bg-blueberry-900 px-6 py-3 text-base font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:ring-offset-2 transition"
          >
            Send to my GP surgery
            <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
