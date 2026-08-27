"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import type { Step } from "@/types";

export default function Bekreft() {
  const router = useRouter();
  const { profil, helsemeldingState, fullforSteg, nullstill } = useUser();
  const [bekreftet, setBekreftet] = useState(false);
  const [visDetaljer, setVisDetaljer] = useState(false);
  const år = new Date().getFullYear();

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: "completed" },
    { id: 2, label: "Kritisk info", path: "/helsemelding/kritisk-info", status: "completed" },
    { id: 3, label: "Vaksiner", path: "/helsemelding/vaksiner", status: "completed" },
    { id: 4, label: "Samtykker", path: "/helsemelding/samtykker", status: "completed" },
    { id: 5, label: "Bekreft", path: "/helsemelding/bekreft", status: "active" },
  ];

  const antallLegemidler =
    profil.legemidler.faste.length + profil.legemidler.behovs.length;
  const antallSvar = helsemeldingState.medicationResponses.length;
  const avvik = helsemeldingState.medicationResponses.filter(
    (r) => r.tarMedisinen === "ja_annen_dose" || r.tarMedisinen === "nei"
  ).length;

  const antallVaksineanbefalinger = profil.vaksinanbefalinger.length;
  const aksepterteVaksiner = helsemeldingState.vaccineResponses.filter(
    (r) => r.akseptert === true
  ).length;

  const oppdaterteSamtykker = Object.values(
    helsemeldingState.samtykkeState
  ).filter((v) => v !== null && typeof v === "boolean").length;

  function sendInn() {
    if (!bekreftet) return;
    fullforSteg("bekreft");
    router.push("/helsemelding/signatures");
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 5 av 5</p>
          <h1 className="text-3xl font-bold text-neutral-900">Bekreft og send inn</h1>
          <p className="text-neutral-600 mt-2">
            Se gjennom oppsummeringen og bekreft at opplysningene er korrekte.
          </p>
        </div>

        {/* Oppsummering */}
        <section className="mb-6 rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm" aria-labelledby="oppsummering-heading">
          <div className="bg-blueberry-50 px-5 py-4 border-b border-blueberry-100">
            <h2 id="oppsummering-heading" className="text-lg font-semibold text-blueberry-900">
              Din Helsemelding {år} — Oppsummering
            </h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">
                <span className="font-medium">Legemidler:</span>{" "}
                {antallLegemidler} legemidler gjennomgått
                {antallSvar < antallLegemidler && ` (${antallLegemidler - antallSvar} uten svar)`}
              </span>
              {avvik > 0 ? (
                <span className="text-warning-700 text-xs font-semibold bg-warning-100 px-2 py-0.5 rounded-full">
                  {avvik} avvik registrert
                </span>
              ) : antallSvar > 0 ? (
                <span className="text-success-700 text-xs font-semibold">Ingen avvik</span>
              ) : null}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">
                <span className="font-medium">Vaksiner:</span>{" "}
                {antallVaksineanbefalinger} anbefalinger gjennomgått
              </span>
              <span className="text-success-700 text-xs font-semibold">
                {aksepterteVaksiner} akseptert
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-700">
                <span className="font-medium">Samtykker:</span> Gjennomgått
              </span>
              <span className="text-success-700 text-xs font-semibold">
                {oppdaterteSamtykker > 0
                  ? `${oppdaterteSamtykker} oppdatert`
                  : "Ingen endringer"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setVisDetaljer(!visDetaljer)}
            className="w-full text-center px-5 py-3 text-sm text-blueberry-700 border-t border-neutral-100 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blueberry-500"
            aria-expanded={visDetaljer}
          >
            {visDetaljer ? "Skjul detaljer ▲" : "Vis detaljer ▼"}
          </button>

          {visDetaljer && (
            <div className="border-t border-neutral-100 p-5 bg-neutral-50">
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">Dine svar på legemidler:</h3>
              {helsemeldingState.medicationResponses.length === 0 ? (
                <p className="text-sm text-neutral-500 italic">Ingen svar registrert.</p>
              ) : (
                <ul className="space-y-2">
                  {helsemeldingState.medicationResponses.map((r) => {
                    const med = [...profil.legemidler.faste, ...profil.legemidler.behovs].find(
                      (m) => m.id === r.medId
                    );
                    return (
                      <li key={r.medId} className="text-xs text-neutral-700 flex items-start gap-2">
                        <span className="font-medium">{med?.handelsnavn ?? r.medId}:</span>
                        <span>
                          {r.tarMedisinen === "ja_som_forskrevet"
                            ? "Tar som forskrevet"
                            : r.tarMedisinen === "ja_annen_dose"
                            ? `Annen dose: ${r.annenDoseBeskriv || "ikke angitt"}`
                            : r.tarMedisinen === "nei"
                            ? "Bruker ikke lenger"
                            : "Ikke besvart"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </section>

        {/* Bekreft-boks */}
        <section className="mb-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm" aria-labelledby="bekreft-heading">
          <div className="flex items-start gap-3 mb-4">
            <LockClosedIcon className="h-5 w-5 text-blueberry-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 id="bekreft-heading" className="font-semibold text-neutral-900">
                Informasjon om innsending
              </h2>
              <p className="text-sm text-neutral-700 mt-1">
                Fastlegen din ({profil.fastlege}) mottar en kopi av svarene dine.
                Tilbakemeldingene dine gjør det enklere for fastlegen å holde legemiddellisten (PLL) oppdatert.
              </p>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={bekreftet}
              onChange={(e) => setBekreftet(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded accent-blueberry-700 flex-shrink-0"
            />
            <span className="text-sm text-neutral-900">
              Jeg bekrefter at opplysningene er korrekte etter beste evne.
            </span>
          </label>
        </section>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding/samtykker"
            className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Link>
          <button
            onClick={sendInn}
            disabled={!bekreftet}
            className="flex items-center gap-2 rounded-md bg-success-700 px-6 py-3 text-base font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-success-700 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Send inn Helsemelding 2025"
          >
            <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
            Send inn Helsemelding {år}
          </button>
        </div>
      </div>
    </div>
  );
}
