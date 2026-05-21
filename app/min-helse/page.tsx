"use client";

import Link from "next/link";
import {
  ClipboardDocumentListIcon,
  BeakerIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { useUser } from "@/context/UserContext";

const moduler = [
  { ikon: <ClipboardDocumentListIcon className="h-6 w-6" aria-hidden="true" />, tittel: "Legemidler", href: "/logg-inn", desc: "Din legemiddelliste (PLL)" },
  { ikon: <BeakerIcon className="h-6 w-6" aria-hidden="true" />, tittel: "Mine vaksiner", href: "/logg-inn", desc: "Vaksinasjonshistorikk fra SYSVAK" },
  { ikon: <DocumentTextIcon className="h-6 w-6" aria-hidden="true" />, tittel: "Journaldokumenter", href: "/logg-inn", desc: "Journalnotater og epikriser" },
  { ikon: <ShieldCheckIcon className="h-6 w-6" aria-hidden="true" />, tittel: "Kjernejournal", href: "/logg-inn", desc: "Allergier, kritisk informasjon og samtykker" },
  { ikon: <CalendarDaysIcon className="h-6 w-6" aria-hidden="true" />, tittel: "Timeavtaler", href: "/logg-inn", desc: "Kommende og tidligere timer" },
  { ikon: <UserCircleIcon className="h-6 w-6" aria-hidden="true" />, tittel: "Fastlege", href: "/logg-inn", desc: "Se og bytt fastlege" },
];

export default function MinHelse() {
  const { profil, helsemeldingState } = useUser();
  const år = new Date().getFullYear();
  const stepsCompleted = helsemeldingState.stepsCompleted.filter(Boolean).length;

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Velkomst */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            God dag, {profil.navn.split(" ")[0]}!
          </h1>
          <p className="text-neutral-600 mt-1">
            Din Helsemelding for {år} er klar.{" "}
            {stepsCompleted < 4 ? (
              <span>Du har <strong className="text-cherry-700">{4 - stepsCompleted} steg</strong> igjen å fullføre.</span>
            ) : (
              <span className="text-success-700 font-medium">Alle steg er fullført.</span>
            )}
          </p>
        </div>

        {/* Helsemelding-banner */}
        <Link
          href="/helsemelding"
          className="block mb-8 rounded-lg bg-blueberry-50 border border-blueberry-100 p-6 shadow-sm hover:shadow-md hover:border-blueberry-500 transition group focus:outline-none focus:ring-2 focus:ring-blueberry-500"
          aria-label="Start din Helsemelding 2025"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">📋</span>
              <div>
                <h2 className="text-xl font-bold text-blueberry-900 group-hover:text-blueberry-700 transition-colors">
                  Din Helsemelding {år}
                </h2>
                <p className="text-neutral-600 text-sm mt-0.5">
                  Svar på årets viktige helsespørsmål — tar ca. 10 minutter
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-blueberry-900 px-5 py-2.5 text-white font-semibold text-sm group-hover:bg-blueberry-700 transition">
              Start Helsemelding
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            {[
              { label: "Legemidler", done: helsemeldingState.stepsCompleted[0] },
              { label: "Vaksiner", done: helsemeldingState.stepsCompleted[1] },
              { label: "Samtykker", done: helsemeldingState.stepsCompleted[2] },
              { label: "Bekreft", done: helsemeldingState.stepsCompleted[3] },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 text-neutral-600">
                <span
                  className={`inline-block h-3 w-3 rounded-full ${
                    s.done ? "bg-success-700" : "bg-neutral-200"
                  }`}
                  aria-hidden="true"
                />
                {s.label}
                {s.done && <span className="text-success-700 text-xs font-medium">✓</span>}
              </div>
            ))}
          </div>
        </Link>

        {/* Brukerinfo */}
        <div className="mb-8 rounded-lg bg-white border border-neutral-200 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">Din informasjon</h2>
          <dl className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
            <div>
              <dt className="text-neutral-500">Navn</dt>
              <dd className="font-medium text-neutral-900">{profil.navn}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">F.nr.</dt>
              <dd className="font-medium text-neutral-900">{profil.fnr}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Kommune</dt>
              <dd className="font-medium text-neutral-900">{profil.kommune}</dd>
            </div>
            <div>
              <dt className="text-neutral-500">Fastlege</dt>
              <dd className="font-medium text-neutral-900">{profil.fastlege}</dd>
            </div>
          </dl>
        </div>

        {/* Moduler */}
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Dine helsetjenester</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {moduler.map((m) => (
            <Link
              key={m.tittel}
              href={m.href}
              className="group flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm hover:border-blueberry-500 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blueberry-500"
            >
              <span className="text-blueberry-700 group-hover:text-blueberry-900 transition-colors flex-shrink-0 mt-0.5">
                {m.ikon}
              </span>
              <div>
                <p className="font-semibold text-neutral-900 text-sm">{m.tittel}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{m.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
