"use client";

import { useRouter } from "next/navigation";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { MedicationCard } from "@/components/MedicationCard";
import { useUser } from "@/context/UserContext";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { flowNav, type StegDef } from "@/lib/helsemelding11";
import { FlowHeader, FlowNav } from "@/components/flow/FlowChrome";
import type { MedicationResponse } from "@/types";

function defaultResponse(medId: string): MedicationResponse {
  return { medId, vetHvorfor: null, tarMedisinen: null, annenDoseBeskriv: "" };
}

export function FlowLegemidler({ steg, basePath }: { steg: StegDef[]; basePath: string }) {
  const router = useRouter();
  const { profil, helsemeldingState, oppdaterMedicationResponse } = useUser();
  const { viktigForMeg, fullfort, fullforSteg } = useHelsemelding11();
  const nav = flowNav(steg, "legemidler", basePath, fullfort);

  const forstaMedisiner = viktigForMeg.includes("Forstå medisinene mine");

  function getResponse(medId: string): MedicationResponse {
    return helsemeldingState.medicationResponses.find((r) => r.medId === medId) ?? defaultResponse(medId);
  }

  function neste() {
    fullforSteg("legemidler");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  const faste = profil.legemidler.faste.filter((m) => m.kategori === "fast");
  const kur = profil.legemidler.faste.filter((m) => m.kategori === "kur");
  const behovs = profil.legemidler.behovs;
  const alleMed = [...profil.legemidler.faste, ...profil.legemidler.behovs];

  return (
    <div>
      <DemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={nav.steps} />
        <FlowHeader nr={nav.nr} total={nav.total} title="Legemidler">
          Vi har hentet inn din legemiddelliste fra PLL. Bekreft at opplysningene stemmer og fyll
          ut eventuelle avvik.
        </FlowHeader>

        {forstaMedisiner && (
          <div className="mb-6 rounded-lg border-l-4 border-blueberry-500 bg-blueberry-50 p-4">
            <div className="flex items-start gap-2">
              <LightBulbIcon className="h-5 w-5 flex-shrink-0 text-blueberry-700 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-neutral-700">
                Du sa at <strong>«Forstå medisinene mine»</strong> er viktig for deg. Merk deg
                spørsmålet «Vet du hvorfor du tar dette?» på hvert legemiddel — svarer du «usikker»,
                foreslår vi å ta det opp med fastlegen i oppfølgingssteget.
              </p>
            </div>
          </div>
        )}

        {alleMed.length === 0 && (
          <div className="rounded-lg border border-success-700 bg-success-100 p-6 text-center mb-6">
            <p className="text-success-700 font-semibold text-lg mb-1">Ingen faste legemidler registrert</p>
            <p className="text-neutral-700 text-sm">Det er ikke registrert noen faste legemidler på deg i PLL.</p>
          </div>
        )}

        {faste.length > 0 && (
          <section className="mb-8" aria-labelledby="faste-heading">
            <h2 id="faste-heading" className="text-xl font-semibold text-neutral-900 mb-4">
              Dine faste legemidler ({faste.length})
            </h2>
            <div className="space-y-4">
              {faste.map((med) => (
                <MedicationCard key={med.id} legemiddel={med} fastlege={profil.fastlege} response={getResponse(med.id)} onUpdate={oppdaterMedicationResponse} />
              ))}
            </div>
          </section>
        )}

        {kur.length > 0 && (
          <section className="mb-8" aria-labelledby="kur-heading">
            <h2 id="kur-heading" className="text-xl font-semibold text-neutral-900 mb-4">Dine kurer ({kur.length})</h2>
            <div className="space-y-4">
              {kur.map((med) => (
                <MedicationCard key={med.id} legemiddel={med} fastlege={profil.fastlege} response={getResponse(med.id)} onUpdate={oppdaterMedicationResponse} />
              ))}
            </div>
          </section>
        )}

        {behovs.length > 0 && (
          <section className="mb-8" aria-labelledby="behovs-heading">
            <h2 id="behovs-heading" className="text-xl font-semibold text-neutral-900 mb-4">Dine behovsmedisiner ({behovs.length})</h2>
            <div className="space-y-4">
              {behovs.map((med) => (
                <MedicationCard key={med.id} legemiddel={med} fastlege={profil.fastlege} response={getResponse(med.id)} onUpdate={oppdaterMedicationResponse} />
              ))}
            </div>
          </section>
        )}

        {alleMed.length > 0 && (
          <div className="rounded-lg bg-blueberry-50 border border-blueberry-100 p-4 mb-6 text-sm text-neutral-700">
            <p>
              <strong>Mangler noe?</strong> Dersom du tar legemidler som ikke er på listen, ta
              kontakt med fastlegen din for å oppdatere din legemiddelliste (PLL).
            </p>
          </div>
        )}

        <FlowNav prevHref={nav.prevHref} onNext={neste} nextLabel={nav.nextLabel ?? "Neste"} />
      </div>
    </div>
  );
}
