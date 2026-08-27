"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { buildSteps, STEPS_11 } from "@/lib/healthMessageEn";
import { useHealthMessage } from "@/context/HealthMessageEnContext";

const news = [
  {
    icon: "💬",
    title: "What matters to you",
    text: "One question about what's important to you — kept in mind across everything that's shared onward.",
  },
  {
    icon: "🌱",
    title: "Staying well",
    text: "A few tips and local NHS services chosen for you — honest, and never a telling-off.",
  },
  {
    icon: "🔁",
    title: "Next steps that happen",
    text: "Turn what you'd like into actions that are sent to your GP, pharmacy or community team — not just a leaflet.",
  },
];

export default function HealthMessagePlusLanding() {
  const { completed } = useHealthMessage();
  const steps = buildSteps(null, completed, STEPS_11);

  return (
    <div>
      <NhsDemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EnStepper steps={steps} />

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-cherry-500 px-2.5 py-0.5 text-xs font-bold text-white">1.1</span>
            <span className="text-sm text-neutral-500 font-medium">New version</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Your NHS Health Message Plus</h1>
          <p className="text-lg text-neutral-700">
            Builds on the Health Message with three new things: what matters to you, tips for staying
            well, and next steps that are sent on to the right people.
          </p>
        </div>

        <div className="grid gap-4 mb-8 md:grid-cols-3">
          {news.map((n) => (
            <div key={n.title} className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-4">
              <span className="text-2xl mb-2 block" aria-hidden="true">{n.icon}</span>
              <h2 className="font-semibold text-blueberry-900 mb-1">{n.title}</h2>
              <p className="text-sm text-neutral-700">{n.text}</p>
            </div>
          ))}
        </div>

        <Link
          href="/health-message-plus/what-matters"
          className="flex items-center justify-center gap-2 w-full rounded-md bg-blueberry-900 px-6 py-4 text-lg font-semibold text-white hover:bg-blueberry-700 transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:ring-offset-2"
        >
          Start Health Message Plus
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
        </Link>

        <p className="text-center text-sm text-neutral-500 mt-4">
          Takes about 10 minutes. You can stop and come back later.
        </p>
      </div>
    </div>
  );
}
