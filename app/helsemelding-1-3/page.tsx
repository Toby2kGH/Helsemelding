"use client";

import Link from "next/link";
import { ArrowRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { byggSteps, STEG_13 } from "@/lib/helsemelding11";

const nyheter = [
  {
    ikon: "🧪",
    tittel: "En liten studie",
    tekst: "På helsekompetanse-steget blir du tilfeldig valgt til én av to måter — med samtykke og rett til å reservere deg.",
  },
  {
    ikon: "🔀",
    tittel: "To måter å støtte forebygging",
    tekst: "Gruppe A får kunnskapsbaserte råd. Gruppe B gjør en øvelse der man ser seg selv om 10 år og lager en plan.",
  },
  {
    ikon: "📈",
    tittel: "Læring for mange",
    tekst: "Vi måler hvor klar du føler deg før og etter, for å lære hvilken måte som hjelper best — og for hvem.",
  },
];

export default function Helsemelding13Landing() {
  const { profil } = useUser();
  const { fullfort } = useHelsemelding11();
  const steps = byggSteps(null, fullfort, STEG_13);

  return (
    <div>
      <DemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-cherry-500 px-2.5 py-0.5 text-xs font-bold text-white">1.3</span>
            <span className="text-sm text-neutral-500 font-medium">Forskning i fokus</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Din Helsemelding 1.3</h1>
          <p className="text-lg text-neutral-700">
            Samme flyt som 1.2, men helsekompetanse-steget er en <strong>liten innebygd
            studie</strong>: vi prøver ut to måter å støtte forebygging på, for å lære hvilken som
            hjelper best.
          </p>
        </div>

        <div className="grid gap-4 mb-8 md:grid-cols-3">
          {nyheter.map((n) => (
            <div key={n.tittel} className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-4">
              <span className="text-2xl mb-2 block" aria-hidden="true">{n.ikon}</span>
              <h2 className="font-semibold text-blueberry-900 mb-1">{n.tittel}</h2>
              <p className="text-sm text-neutral-700">{n.tekst}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-4 mb-8 text-sm text-neutral-600">
          Hei, <strong>{profil.navn.split(" ")[0]}</strong>! Når du kommer til helsekompetanse-steget
          blir du tilfeldig plassert i en gruppe. Du kan når som helst reservere deg — og du kan
          utforske begge variantene i demoen.
        </div>

        <Link
          href="/helsemelding-1-3/viktig"
          className="flex items-center justify-center gap-2 w-full rounded-md bg-blueberry-900 px-6 py-4 text-lg font-semibold text-white hover:bg-blueberry-700 transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:ring-offset-2"
        >
          Start Helsemelding 1.3
          <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
        </Link>

        <div className="mt-4 flex items-center justify-center">
          <Link
            href="/helsemelding-1-3/om"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blueberry-700 hover:underline focus:outline-none focus:underline"
          >
            <InformationCircleIcon className="h-4 w-4" aria-hidden="true" />
            Les om forsøksdesignet og forskningen bak
          </Link>
        </div>
      </div>
    </div>
  );
}
