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
  };
}

export default function Legemidler() {
  const router = useRouter();
  const { profil, helsemeldingState, oppdaterMedicationResponse, fullforSteg } = useUser();

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: "active" },
    { id: 2, label: "Kritisk info", path: "/helsemelding/kritisk-info", status: helsemeldingState.stepsCompleted.kritiskInfo ? "completed" : "pending" },
    { id: 3, label: "Vaksiner", path: "/helsemelding/vaksiner", status: helsemeldingState.stepsCompleted.vaksiner ? "completed" : "pending" },
    { id: 4, label: "Samtykker", path: "/helsemelding/samtykker", status: helsemeldingState.stepsCompleted.samtykker ? "completed" : "pending" },
    { id: 5, label: "Bekreft", path: "/helsemelding/bekreft", status: helsemeldingState.stepsCompleted.bekreft ? "completed" : "pending" },
  ];

  function getResponse(medId: string): MedicationResponse {
    return helsemeldingState.medicationResponses.find((r) => r.medId === medId) ?? defaultResponse(medId);
  }


  function neste() {
    fullforSteg("legemidler");
    router.push("/helsemelding/kritisk-info");
  }

  const alleMed = [...profil.legemidler.faste, ...profil.legemidler.behovs];
  const kur = profil.legemidler.faste.filter((m) => m.kategori === "kur");

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 1 av 5</p>
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

        {profil.legemidler.faste.filter((m) => m.kategori === "fast").length > 0 && (
          <section className="mb-8" aria-labelledby="faste-heading">
            <h2 id="faste-heading" className="text-xl font-semibold text-neutral-900 mb-4">
              Dine faste legemidler ({profil.legemidler.faste.filter((m) => m.kategori === "fast").length})
            </h2>
            <div className="space-y-4">
              {profil.legemidler.faste.filter((m) => m.kategori === "fast").map((med) => (
                <MedicationCard
                  key={med.id}
                  legemiddel={med}
                  fastlege={profil.fastlege}
                  response={getResponse(med.id)}
                  onUpdate={oppdaterMedicationResponse}
                />
              ))}
            </div>
          </section>
        )}

        {kur.length > 0 && (
          <section className="mb-8" aria-labelledby="kur-heading">
            <h2 id="kur-heading" className="text-xl font-semibold text-neutral-900 mb-4">
              Dine kurer ({kur.length})
            </h2>
            <div className="space-y-4">
              {kur.map((med) => (
                <MedicationCard
                  key={med.id}
                  legemiddel={med}
                  fastlege={profil.fastlege}
                  response={getResponse(med.id)}
                  onUpdate={oppdaterMedicationResponse}
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
            Neste: Kritisk info
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
