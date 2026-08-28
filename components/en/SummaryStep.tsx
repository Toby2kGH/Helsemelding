"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader } from "@/components/en/EnFlowChrome";
import { useHealthMessage } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";
import { FOLLOW_UP_ITEMS } from "@/components/en/FollowUpStep";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <p className="font-semibold text-neutral-900 mb-1">{title}</p>
      {children}
    </div>
  );
}

export function SummaryStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const { completed, complete, whatMatters, whatMattersNote, taking, sharing, followUp, profile } =
    useHealthMessage();
  const nav = flowNav(steps, "summary", basePath, completed);
  const [sent, setSent] = useState(false);

  const allMeds = [
    ...profile.medicines.regular,
    ...profile.medicines.course,
    ...profile.medicines.whenRequired,
  ];
  const changed = allMeds.filter((m) => taking[m.id] === "different_dose" || taking[m.id] === "stopped");
  const chosenFollowUps = FOLLOW_UP_ITEMS.filter((i) => followUp.includes(i.id));

  function handleSend() {
    complete("summary");
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
            <h1 className="text-2xl font-bold text-success-700 mt-3">All done, {profile.firstName}</h1>
            <p className="text-neutral-700 mt-2">
              Your Health Message has been sent, and your next steps are on their way to the right
              people.
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-6 mt-6">
            <h2 className="font-semibold text-neutral-900 mb-3">Where your next steps went</h2>
            {chosenFollowUps.length === 0 ? (
              <p className="text-sm text-neutral-700">
                You didn&rsquo;t add any next steps this time — your answers have still been shared with
                {" "}{profile.surgery}.
              </p>
            ) : (
              <ul className="space-y-2 text-sm text-neutral-700">
                {chosenFollowUps.map((i) => (
                  <li key={i.id} className="flex items-start gap-2">
                    <span aria-hidden="true">{i.icon}</span>
                    <span>
                      {i.label} <span className="text-neutral-500">→ {i.destination}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-sm text-neutral-500 mt-4">
              If anything is urgent, don&rsquo;t wait for a reply — contact your GP surgery, call 111,
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
        <EnFlowHeader nr={nav.nr} total={nav.total} title="Your summary">
          Everything in one place before you send. Your answers go to {profile.surgery}, and your
          chosen next steps go to the people who can act on them.
        </EnFlowHeader>

        <div className="space-y-4 mb-8">
          <Card title="What matters to you">
            {whatMatters.length === 0 && !whatMattersNote.trim() ? (
              <p className="text-sm text-neutral-500">Nothing selected.</p>
            ) : (
              <>
                {whatMatters.length > 0 && (
                  <p className="text-sm text-neutral-700">{whatMatters.join(" · ")}</p>
                )}
                {whatMattersNote.trim() && (
                  <p className="text-sm text-neutral-500 mt-1 italic">&ldquo;{whatMattersNote.trim()}&rdquo;</p>
                )}
              </>
            )}
          </Card>

          <Card title="Medicines">
            {changed.length === 0 ? (
              <p className="text-sm text-neutral-700">Confirmed, with no changes.</p>
            ) : (
              <ul className="text-sm text-neutral-700 space-y-1">
                {changed.map((m) => (
                  <li key={m.id}>
                    {m.brand} — {taking[m.id] === "stopped" ? "stopped" : "dose changed"}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Sharing">
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
          </Card>

          <Card title="Your next steps">
            {chosenFollowUps.length === 0 ? (
              <p className="text-sm text-neutral-500">None added.</p>
            ) : (
              <ul className="text-sm text-neutral-700 space-y-1">
                {chosenFollowUps.map((i) => (
                  <li key={i.id} className="flex items-start gap-2">
                    <span aria-hidden="true">{i.icon}</span>
                    <span>
                      {i.label} <span className="text-neutral-500">→ {i.destination}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
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
            Send my Health Message
            <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
