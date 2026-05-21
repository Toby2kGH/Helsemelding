"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { MedicationCard } from "@/components/MedicationCard";
import { useUser } from "@/context/UserContext";
import type { Step, MedicationResponse } from "@/types";

function defaultResponse(medId: string): MedicationResponse {
  return {
    medId,
    vetHvorfor: null,
    tarMedisinen: null,
    annenDoseBeskriv: "",
    vetForverring: null,
  };
}

export default function Legemidler() {
  const router = useRouter();
  const { profil, helsemeldingState, oppdaterMedicationResponse, fullforSteg } = useUser();

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: "active" },
    { id: 2, label: "Vaksiner", path: "/helsemelding/vaksiner", status: helsemeldingState.stepsCompleted[1] ? "completed" : "pending" },
    { id: 3, label: "Samtykker", path: "/helsemelding/samtykker", status: helsemeldingState.stepsCompleted[2] ? "completed" : "pending" },
    { id: 4, label: "Bekreft", path: "/helsemelding/bekreft", status: helsemeldingState.stepsCompleted[3] ? "completed" : "pending" },
  ];

  function getResponse(medId: string): MedicationResponse {
    return helsemeldingState.medicationResponses.find((r) => r.medId === medId) ?? defaultResponse(medId);
  }

  function getForverringSporsmaltekst(medId: string): string | undefined {
    const plan = profil.kroniskSykdomPlan;
    if (!plan.harKroniskSykdom) return undefined;

    const med = [...profil.legemidler.faste, ...profil.legemidler.behovs].find((m) => m.id === medId);
    if (!med) return undefined;

    if (
      med.atc.startsWith("B01") &&
      plan.sporsmal.atrieflimmer
    ) return plan.sporsmal.atrieflimmer;

    if (
      (med.atc.startsWith("A10") || med.atc.startsWith("H04")) &&
      plan.sporsmal.diabetes
    ) return plan.sporsmal.diabetes;

    if (med.atc.startsWith("R03") && plan.sporsmal.astma) return plan.sporsmal.astma;

    return undefined;
  }

  function visForverring(medId: string): boolean {
    return !!getForverringSporsmaltekst(medId);
  }

  function neste() {
    fullforSteg(0);
    router.push("/helsemelding/vaksiner");
  }

  const alleMed = [...profil.legemidler.faste, ...profil.legemidler.behovs];

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 1 av 4</p>
          <h1 className="text-3xl font-bold text-neutral-900">Legemidler</h1>
          <p className="text-neutral-600 mt-2">
            Vi har hentet inn din legemiddelliste fra PLL. Bekreft at opplysningene stemmer og fyll ut eventuelle avvik.
          </p>
        </div>

        {profil.legemidler.faste.length === 0 && profil.legemidler.behovs.length === 0 && (
          <div className="rounded-lg border border-success-700 bg-success-100 p-6 text-center mb-6">
            <p className="text-success-700 font-semibold text-lg mb-1">Ingen faste legemidler registrert</p>
            <p className="text-neutral-700 text-sm">
              Det er ikke registrert noen faste legemidler på deg i PLL.
            </p>
          </div>
        )}

        {profil.legemidler.faste.length > 0 && (
          <section className="mb-8" aria-labelledby="faste-heading">
            <h2 id="faste-heading" className="text-xl font-semibold text-neutral-900 mb-4">
              Dine faste legemidler ({profil.legemidler.faste.length})
            </h2>
            <div className="space-y-4">
              {profil.legemidler.faste.map((med) => (
                <MedicationCard
                  key={med.id}
                  legemiddel={med}
                  fastlege={profil.fastlege}
                  response={getResponse(med.id)}
                  onUpdate={oppdaterMedicationResponse}
                  visForverringSporsmal={visForverring(med.id)}
                  forverringSporsmaltekst={getForverringSporsmaltekst(med.id)}
                />
              ))}
            </div>
          </section>
        )}

        {profil.legemidler.behovs.length > 0 && (
          <section className="mb-8" aria-labelledby="behovs-heading">
            <h2 id="behovs-heading" className="text-xl font-semibold text-neutral-900 mb-4">
              Dine behovsmedisiner ({profil.legemidler.behovs.length})
            </h2>
            <div className="space-y-4">
              {profil.legemidler.behovs.map((med) => (
                <MedicationCard
                  key={med.id}
                  legemiddel={med}
                  fastlege={profil.fastlege}
                  response={getResponse(med.id)}
                  onUpdate={oppdaterMedicationResponse}
                  visForverringSporsmal={visForverring(med.id)}
                  forverringSporsmaltekst={getForverringSporsmaltekst(med.id)}
                />
              ))}
            </div>
          </section>
        )}

        {alleMed.length > 0 && (
          <div className="rounded-lg bg-blueberry-50 border border-blueberry-100 p-4 mb-6 text-sm text-neutral-700">
            <p>
              <strong>Mangler noe?</strong> Dersom du tar legemidler som ikke er på listen, ta kontakt med fastlegen din for å oppdatere din legemiddelliste (PLL).
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding"
            className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Link>
          <button
            onClick={neste}
            className="flex items-center gap-2 rounded-md bg-blueberry-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
          >
            Neste: Vaksiner
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
