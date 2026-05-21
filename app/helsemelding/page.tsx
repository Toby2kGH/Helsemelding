"use client";

import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import type { Step } from "@/types";

export default function HelsemeldingLanding() {
  const { profil, helsemeldingState } = useUser();
  const år = new Date().getFullYear();

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: helsemeldingState.stepsCompleted[0] ? "completed" : "pending" },
    { id: 2, label: "Vaksiner", path: "/helsemelding/vaksiner", status: helsemeldingState.stepsCompleted[1] ? "completed" : "pending" },
    { id: 3, label: "Samtykker", path: "/helsemelding/samtykker", status: helsemeldingState.stepsCompleted[2] ? "completed" : "pending" },
    { id: 4, label: "Bekreft", path: "/helsemelding/bekreft", status: helsemeldingState.stepsCompleted[3] ? "completed" : "pending" },
  ];

  const datakilder = [
    { kilde: "Pasientens legemiddelliste (PLL)", detalj: `Oppdatert ${new Date().toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}` },
    { kilde: "SYSVAK — vaksinasjonsregisteret", detalj: "Siste oppdatering fra FHI" },
    { kilde: "Kjernejournal", detalj: "Dine registrerte samtykker" },
  ];

  const infokort = [
    {
      ikon: "📋",
      tittel: "Legemidler",
      tekst: "Vi har hentet inn din legemiddelliste (PLL) og ber deg bekrefte hva du faktisk tar.",
    },
    {
      ikon: "💉",
      tittel: "Vaksiner",
      tekst: "Vi sjekker mot SYSVAK og gir deg personaliserte vaksineanbefalinger fra FHI.",
    },
    {
      ikon: "📄",
      tittel: "Samtykker",
      tekst: "Oversikt over og mulighet til å oppdatere dine samtykker til deling og forskning.",
    },
  ];

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Din Helsemelding {år}
          </h1>
          <p className="text-lg text-neutral-700">
            Hvert år ber vi deg bekrefte og oppdatere viktige helseopplysninger.
            Dette hjelper helsepersonell å gi deg bedre hjelp.
          </p>
        </div>

        {/* Info-kort */}
        <div className="grid gap-4 mb-8 md:grid-cols-3">
          {infokort.map((k) => (
            <div key={k.tittel} className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-4">
              <span className="text-2xl mb-2 block" aria-hidden="true">{k.ikon}</span>
              <h2 className="font-semibold text-blueberry-900 mb-1">{k.tittel}</h2>
              <p className="text-sm text-neutral-700">{k.tekst}</p>
            </div>
          ))}
        </div>

        {/* Forhåndsutfylt info */}
        <div className="rounded-lg border border-success-700 bg-success-100 p-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircleIcon className="h-5 w-5 text-success-700" aria-hidden="true" />
            <h2 className="font-semibold text-success-700">
              Vi har hentet informasjon fra:
            </h2>
          </div>
          <ul className="space-y-2">
            {datakilder.map((d) => (
              <li key={d.kilde} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="text-success-700 font-semibold mt-0.5">•</span>
                <div>
                  <span className="font-medium">{d.kilde}</span>
                  <span className="text-neutral-500"> — {d.detalj}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-neutral-600">
            Hei, <strong>{profil.navn.split(" ")[0]}</strong>! Vi fant{" "}
            <strong>{profil.legemidler.faste.length + profil.legemidler.behovs.length} legemidler</strong>{" "}
            og{" "}
            <strong>{profil.vaksinanbefalinger.length} vaksineanbefalinger</strong> som er relevante for deg.
          </p>
        </div>

        <Link
          href="/helsemelding/legemidler"
          className="flex items-center justify-center gap-2 w-full rounded-md bg-blueberry-900 px-6 py-4 text-lg font-semibold text-white hover:bg-blueberry-700 transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:ring-offset-2"
        >
          Start Helsemelding {år}
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
        </Link>

        <p className="text-center text-sm text-neutral-500 mt-4">
          Det tar ca. 10 minutter. Du kan pause og fortsette senere.
        </p>
      </div>
    </div>
  );
}
