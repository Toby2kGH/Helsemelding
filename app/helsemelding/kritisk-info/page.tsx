"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import { detektKroniskeSykdommer } from "@/lib/medicalUtils";
import type { Step } from "@/types";

export default function KritiskInfo() {
  const router = useRouter();
  const { profil, helsemeldingState, oppdaterKritiskInfo, fullforSteg } = useUser();

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: "completed" },
    { id: 2, label: "Kritisk info", path: "/helsemelding/kritisk-info", status: "active" },
    { id: 3, label: "Vaksiner", path: "/helsemelding/vaksiner", status: helsemeldingState.stepsCompleted.vaksiner ? "completed" : "pending" },
    { id: 4, label: "Samtykker", path: "/helsemelding/samtykker", status: helsemeldingState.stepsCompleted.samtykker ? "completed" : "pending" },
    { id: 5, label: "Bekreft", path: "/helsemelding/bekreft", status: helsemeldingState.stepsCompleted.bekreft ? "completed" : "pending" },
  ];

  const detektendeSykdommer = detektKroniskeSykdommer(
    profil.legemidler.faste,
    profil.legemidler.behovs
  );
  const kritiskInfo = profil.kritiskInfo;
  const harAllergi = kritiskInfo.allergi && kritiskInfo.allergi.length > 0;
  const harKritiskInfo = !!(harAllergi || kritiskInfo.bivirkninger?.length || kritiskInfo.kritiskFunksjon || kritiskInfo.annenKritiskInfo);

  const personligInfo = helsemeldingState.kritiskInfoState.personligInfo;
  const harBehandlingsplan = helsemeldingState.kritiskInfoState.harKjentBehandlingsplan;

  function handlePersonligInfoChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const tekst = e.target.value.substring(0, 200);
    oppdaterKritiskInfo({ personligInfo: tekst });
  }

  function neste() {
    fullforSteg("kritiskInfo");
    router.push("/helsemelding/vaksiner");
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 2 av 5</p>
          <h1 className="text-3xl font-bold text-neutral-900">Kritisk helseinformasjon</h1>
          <p className="text-neutral-600 mt-2">
            Gjennomgå informasjonen som er registrert i din kjernejournal. Kontakt helsepersonell hvis noe er uklart eller skal oppdateres.
          </p>
        </div>

        {/* ALLERGI */}
        {harAllergi && (
          <section className="mb-8" aria-labelledby="allergi-heading">
            <div className="rounded-lg border border-cherry-200 bg-cherry-50 p-6">
              <h2 id="allergi-heading" className="text-lg font-semibold text-cherry-900 mb-4">
                Registrerte allergier
              </h2>
              <div className="rounded-md bg-white p-4 space-y-2 border border-cherry-100">
                {kritiskInfo.allergi!.map((allergi) => (
                  <div key={allergi} className="flex items-start gap-2 text-sm">
                    <span className="text-cherry-600 font-bold mt-0.5">•</span>
                    <span className="text-neutral-900">{allergi}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Annen kritisk info fra kjernejournal */}
        {harKritiskInfo && !harAllergi && (
          <section className="mb-8 rounded-lg border border-neutral-200 bg-white p-6" aria-labelledby="kjernejournal-heading">
            <h2 id="kjernejournal-heading" className="text-lg font-semibold text-neutral-900 mb-4">
              Annen kritisk informasjon
            </h2>

            <div className="space-y-4">
              {/* Bivirkninger */}
              {kritiskInfo.bivirkninger && kritiskInfo.bivirkninger.length > 0 && (
                <div className="rounded-md bg-warning-50 p-4 border border-warning-100">
                  <p className="text-sm font-semibold text-neutral-900 mb-2">Kjente bivirkninger</p>
                  <ul className="space-y-1">
                    {kritiskInfo.bivirkninger.map((bivirkning) => (
                      <li key={bivirkning} className="text-sm text-neutral-700">
                        • {bivirkning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Kritisk funksjon */}
              {kritiskInfo.kritiskFunksjon && (
                <div className="rounded-md bg-cherry-50 p-4 border border-cherry-100">
                  <p className="text-sm font-semibold text-neutral-900 mb-2">Kritisk funksjon</p>
                  <p className="text-sm text-neutral-700">{kritiskInfo.kritiskFunksjon}</p>
                </div>
              )}

              {/* Annen kritisk info */}
              {kritiskInfo.annenKritiskInfo && (
                <div className="rounded-md bg-blueberry-50 p-4 border border-blueberry-100">
                  <p className="text-sm font-semibold text-neutral-900 mb-2">Annen viktig informasjon</p>
                  <p className="text-sm text-neutral-700">{kritiskInfo.annenKritiskInfo}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Kroniske sykdommer */}
        {detektendeSykdommer.length > 0 && (
          <section className="mb-8" aria-labelledby="kronisk-heading">
            <h2 id="kronisk-heading" className="text-lg font-semibold text-neutral-900 mb-4">
              Identifiserte kroniske sykdommer
            </h2>

            <div className="space-y-2">
              {detektendeSykdommer.map((sykdom) => (
                <div key={sykdom} className="rounded-md bg-neutral-50 p-3 border border-neutral-200">
                  <p className="text-sm text-neutral-900">{sykdom}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-600 mt-3">
              Basert på dine nåværende legemidler.
            </p>
          </section>
        )}

        {/* Tilleggsinformasjon fra pasienten */}
        <section className="mb-8" aria-labelledby="personlig-heading">
          <h2 id="personlig-heading" className="text-lg font-semibold text-neutral-900 mb-4">
            Tilleggsinformasjon
          </h2>
          <p className="text-neutral-700 text-sm mb-3">
            Hva er det som er viktig for deg, din helse og din livskvalitet? Dette kan være nyttig for helsepersonell å vite for å tilpasse møter for deg og dine prioriteringer og verdier. For eksempel sosial situasjon eller andre forhold.
          </p>

          <div className="relative">
            <textarea
              value={personligInfo}
              onChange={handlePersonligInfoChange}
              placeholder="Skriv her... (valgfritt, maks 200 tegn)"
              className="w-full rounded-md border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:border-transparent resize-none"
              rows={4}
            />
            <p className="text-xs text-neutral-500 mt-2">
              {personligInfo.length} / 200 tegn
            </p>
          </div>
        </section>

        {/* Behandlingsplan */}
        {profil.kroniskSykdomPlan.harKroniskSykdom && (
          <section className="mb-8" aria-labelledby="plan-heading">
            <h2 id="plan-heading" className="text-lg font-semibold text-neutral-900 mb-4">
              Behandlingsplan for kronisk sykdom
            </h2>
            <p className="text-neutral-700 text-sm mb-4">
              Har du en kjent behandlingsplan?
            </p>

            <div className="space-y-3">
              {[
                { value: true, label: "Ja, jeg har en behandlingsplan" },
                { value: false, label: "Nei, jeg har ikke en behandlingsplan" },
              ].map((option) => (
                <label key={option.value ? "ja" : "nei"} className="flex items-center gap-3 p-3 rounded-md border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition">
                  <input
                    type="radio"
                    name="behandlingsplan"
                    value={option.value ? "ja" : "nei"}
                    checked={harBehandlingsplan === option.value}
                    onChange={() => oppdaterKritiskInfo({ harKjentBehandlingsplan: option.value })}
                    className="w-4 h-4 accent-blueberry-900"
                  />
                  <span className="text-neutral-900">{option.label}</span>
                </label>
              ))}
            </div>
          </section>
        )}

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding/legemidler"
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
