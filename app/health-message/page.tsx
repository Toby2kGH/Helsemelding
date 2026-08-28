"use client";

import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { buildSteps, STEPS_10 } from "@/lib/healthMessageEn";
import { useHealthMessage } from "@/context/HealthMessageEnContext";

const infoCards = [
  { icon: "💊", title: "Medicines", text: "Check the repeat medicines on your record and tell us what you're actually taking." },
  { icon: "⚠️", title: "Key info", text: "Allergies, reactions and anything important for a clinician to see quickly." },
  { icon: "💉", title: "Vaccinations", text: "See which NHS vaccinations you may be due, based on your age and health." },
  { icon: "🔒", title: "Sharing", text: "Review how your information is shared and used, and update your choices." },
];

const sources = [
  { source: "Summary Care Record / GP record", detail: "Your medicines, allergies and conditions" },
  { source: "NHS vaccination records", detail: "What you've had and what you may be due" },
  { source: "Your sharing preferences", detail: "How your information is currently shared" },
];

export default function HealthMessageLanding() {
  const { completed, profile } = useHealthMessage();
  const steps = buildSteps(null, completed, STEPS_10);
  const medsCount =
    profile.medicines.regular.length +
    profile.medicines.course.length +
    profile.medicines.whenRequired.length;
  const vaccineCount = profile.immunisationAdvice.length;

  return (
    <div>
      <NhsDemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EnStepper steps={steps} />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Your NHS Health Message</h1>
          <p className="text-lg text-neutral-700">
            Once a year, we ask you to check and update a few important details about your health. It
            takes about ten minutes, and it helps the people looking after you give you safer care.
          </p>
        </div>

        <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((c) => (
            <div key={c.title} className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-4">
              <span className="text-2xl mb-2 block" aria-hidden="true">{c.icon}</span>
              <h2 className="font-semibold text-blueberry-900 mb-1">{c.title}</h2>
              <p className="text-sm text-neutral-700">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-success-700 bg-success-100 p-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircleIcon className="h-5 w-5 text-success-700" aria-hidden="true" />
            <h2 className="font-semibold text-success-700">We&rsquo;ve gathered information from:</h2>
          </div>
          <ul className="space-y-2">
            {sources.map((s) => (
              <li key={s.source} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="text-success-700 font-semibold mt-0.5">•</span>
                <div>
                  <span className="font-medium">{s.source}</span>
                  <span className="text-neutral-500"> — {s.detail}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-neutral-600">
            Hello, <strong>{profile.firstName}</strong>! We found{" "}
            <strong>{medsCount} repeat medicines</strong> and{" "}
            <strong>{vaccineCount} vaccinations</strong> that may be due.
          </p>
        </div>

        <Link
          href="/health-message/medicines"
          className="flex items-center justify-center gap-2 w-full rounded-md bg-blueberry-900 px-6 py-4 text-lg font-semibold text-white hover:bg-blueberry-700 transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:ring-offset-2"
        >
          Start your Health Message
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
        </Link>

        <p className="text-center text-sm text-neutral-500 mt-4">
          Takes about 10 minutes. You can stop and come back later.
        </p>
      </div>
    </div>
  );
}
