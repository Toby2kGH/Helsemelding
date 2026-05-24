"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  LockClosedIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import type { Step } from "@/types";

type SigningState = "ready" | "signing" | "completed";

export default function Signatures() {
  const { profil, helsemeldingState } = useUser();
  const [bekreftet, setBekreftet] = useState(false);
  const [signingState, setSigningState] = useState<SigningState>("ready");
  const [expandedSection, setExpandedSection] = useState<string | null>("samtykker");
  const år = new Date().getFullYear();

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: "completed" },
    { id: 2, label: "Kritisk info", path: "/helsemelding/kritisk-info", status: "completed" },
    { id: 3, label: "Vaksiner", path: "/helsemelding/vaksiner", status: "completed" },
    { id: 4, label: "Samtykker", path: "/helsemelding/samtykker", status: "completed" },
    { id: 5, label: "Signatur", path: "/helsemelding/signatures", status: signingState === "completed" ? "completed" : "active" },
  ];

  // Count consents
  const samtykkeState = helsemeldingState.samtykkeState;
  const gitteSamtykker = Object.values(samtykkeState).filter(
    (v) => v === true || v === "ja"
  ).length;
  const totaleSamtykker = Object.keys(samtykkeState).length;

  const handleSign = async () => {
    setSigningState("signing");

    // Simulate BankID dialog
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Auto-complete signing
    setSigningState("completed");
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Success screen
  if (signingState === "completed") {
    return (
      <div>
        <DemoBanner />
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="rounded-lg border border-success-700 bg-success-100 p-8 text-center">
            <CheckCircleIcon className="h-16 w-16 text-success-700 mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-success-700 mb-2">
              Helsemelding {år} er signert og arkivert!
            </h1>
            <p className="text-neutral-700 mb-2">
              Din fastlege <strong>{profil.fastlege}</strong> er varslet.
            </p>
            <p className="text-neutral-600 text-sm mb-6">
              Helsemelding er signert med BankID og forseglet i arkivet.
            </p>

            {/* Signatur detaljer */}
            <div className="bg-white rounded-lg border border-success-200 p-6 mb-6 text-left">
              <h2 className="font-semibold text-neutral-900 mb-4">Signatur-detaljer</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Signert av:</span>
                  <span className="font-medium text-neutral-900">{profil.navn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Dato og tid:</span>
                  <span className="font-medium text-neutral-900">
                    {new Date().toLocaleString("no-NO")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">BankID referanse:</span>
                  <span className="font-medium text-neutral-900 font-mono text-xs">
                    SIGN-{Date.now().toString(36).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-success-200">
                  <span className="text-neutral-600">Status:</span>
                  <span className="font-medium text-success-700">✓ Forseglet</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => alert("PDF-kvittering ville blitt generert her (DEMO)")}
                className="flex items-center gap-2 rounded-md border border-success-700 bg-white px-4 py-2 text-sm font-medium text-success-700 hover:bg-success-100 focus:outline-none focus:ring-2 focus:ring-success-700"
              >
                <DocumentArrowDownIcon className="h-4 w-4" aria-hidden="true" />
                Last ned signert PDF
              </button>
              <Link
                href="/min-helse"
                className="flex items-center gap-2 rounded-md bg-blueberry-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
              >
                Tilbake til Min helse
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 5 av 5</p>
          <h1 className="text-3xl font-bold text-neutral-900">Bekreft og signer</h1>
          <p className="text-neutral-600 mt-2">
            Gjennomgå dine svar og signer med BankID for å arkivere helsemelding {år}.
          </p>
        </div>

        {/* BankID Signing Dialog */}
        {signingState === "signing" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-sm text-center">
              <div className="mb-4">
                <div className="inline-block p-3 bg-blueberry-100 rounded-full mb-4">
                  <LockClosedIcon className="h-6 w-6 text-blueberry-700" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">BankID</h2>
              <p className="text-neutral-600 mb-6">Bekreft identitet</p>
              <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-neutral-600 mb-2">Venter på app / kodebrikke...</p>
                <p className="text-xs text-neutral-500 font-mono mt-3">
                  Ref: {Date.now().toString(36).toUpperCase()}
                </p>
              </div>
              <div className="animate-spin h-8 w-8 border-4 border-blueberry-200 border-t-blueberry-700 rounded-full mx-auto"></div>
            </div>
          </div>
        )}

        {/* Sjekkliste - Samtykker */}
        <section className="mb-6 rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection("samtykker")}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors bg-purple-50 border-b border-purple-100"
          >
            <div className="text-left">
              <h2 className="text-lg font-semibold text-purple-900">
                Dine samtykker
              </h2>
              <p className="text-sm text-purple-700 mt-1">
                Du har gitt samtykke til {gitteSamtykker} av {totaleSamtykker} muligheter
              </p>
            </div>
            <ChevronDownIcon
              className={`h-5 w-5 text-purple-700 transition-transform flex-shrink-0 ${
                expandedSection === "samtykker" ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSection === "samtykker" && (
            <div className="p-5">
              <div className="space-y-3">
                {Object.entries(samtykkeState).map(([key, value]) => {
                  let status = "⊘ Ikke besvart";
                  let statusColor = "text-neutral-500";

                  if (value === true || value === "ja") {
                    status = "✓ Ja";
                    statusColor = "text-success-700";
                  } else if (value === false || value === "nei") {
                    status = "✗ Nei";
                    statusColor = "text-danger-700";
                  }

                  return (
                    <div key={key} className="flex items-center justify-between text-sm py-2">
                      <span className="text-neutral-700 flex-1">
                        {key.replace(/_/g, " ")}
                      </span>
                      <span className={`font-medium ${statusColor}`}>{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Sjekkliste - Legemidler */}
        <section className="mb-6 rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection("legemidler")}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors bg-blueberry-50 border-b border-blueberry-100"
          >
            <div className="text-left">
              <h2 className="text-lg font-semibold text-blueberry-900">
                Legemidler
              </h2>
              <p className="text-sm text-blueberry-700 mt-1">
                {helsemeldingState.medicationResponses.length} besvart
              </p>
            </div>
            <ChevronDownIcon
              className={`h-5 w-5 text-blueberry-700 transition-transform flex-shrink-0 ${
                expandedSection === "legemidler" ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSection === "legemidler" && (
            <div className="p-5">
              {helsemeldingState.medicationResponses.length === 0 ? (
                <p className="text-sm text-neutral-500 italic">Ingen svar registrert.</p>
              ) : (
                <ul className="space-y-2">
                  {helsemeldingState.medicationResponses.map((r) => {
                    const med = [...profil.legemidler.faste, ...profil.legemidler.behovs].find(
                      (m) => m.id === r.medId
                    );
                    let status = "Ikke besvart";
                    if (r.tarMedisinen === "ja_som_forskrevet") status = "✓ Tar som forskrevet";
                    else if (r.tarMedisinen === "ja_annen_dose") status = "~ Annen dose";
                    else if (r.tarMedisinen === "nei") status = "✗ Bruker ikke";

                    return (
                      <li key={r.medId} className="text-sm py-2">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-700">{med?.handelsnavn}</span>
                          <span className="text-neutral-600 text-xs">{status}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </section>

        {/* Sjekkliste - Vaksiner */}
        <section className="mb-6 rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection("vaksiner")}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors bg-grass-50 border-b border-grass-100"
          >
            <div className="text-left">
              <h2 className="text-lg font-semibold text-grass-900">
                Vaksiner
              </h2>
              <p className="text-sm text-grass-700 mt-1">
                {helsemeldingState.vaccineResponses.length} besvart
              </p>
            </div>
            <ChevronDownIcon
              className={`h-5 w-5 text-grass-700 transition-transform flex-shrink-0 ${
                expandedSection === "vaksiner" ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSection === "vaksiner" && (
            <div className="p-5">
              {helsemeldingState.vaccineResponses.length === 0 ? (
                <p className="text-sm text-neutral-500 italic">Ingen svar registrert.</p>
              ) : (
                <ul className="space-y-2">
                  {helsemeldingState.vaccineResponses.map((r) => (
                    <li key={r.vaksine} className="text-sm py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-700">{r.vaksine}</span>
                        <span className={r.akseptert === true ? "text-success-700 text-xs font-medium" : r.akseptert === false ? "text-danger-700 text-xs font-medium" : "text-neutral-600 text-xs"}>
                          {r.akseptert === true ? "✓ Akseptert" : r.akseptert === false ? "✗ Avslått" : "⊘ Ikke besvart"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        {/* Juridisk informasjon og bekreftelse */}
        <section className="mb-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <LockClosedIcon className="h-5 w-5 text-blueberry-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-semibold text-neutral-900 mb-2">
                Juridisk informasjon
              </h2>
              <p className="text-sm text-neutral-700 mb-3">
                Ved å signere med BankID bekrefter du at:
              </p>
              <ul className="space-y-2 text-sm text-neutral-700 mb-4">
                <li className="flex gap-2">
                  <span className="text-blueberry-700 font-bold">•</span>
                  <span>Du er den personen som oppgir dette (autentisering)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blueberry-700 font-bold">•</span>
                  <span>Opplysningene er korrekte etter beste evne</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blueberry-700 font-bold">•</span>
                  <span>Du har lest og forstått informasjonen om samtykker</span>
                </li>
              </ul>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bekreftet}
                  onChange={(e) => setBekreftet(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded accent-blueberry-700 flex-shrink-0"
                />
                <span className="text-sm text-neutral-900">
                  Jeg bekrefter at opplysningene er korrekte, og jeg gir samtykke til at helsemelding {år} arkiveres med min BankID-signatur.
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Handling buttons */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding/bekreft"
            className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Link>
          <button
            onClick={handleSign}
            disabled={!bekreftet}
            className="flex items-center gap-2 rounded-md bg-success-700 px-6 py-3 text-base font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-success-700 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label={`Signer helsemelding ${år} med BankID`}
          >
            <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
            Åpne BankID og signer
          </button>
        </div>
      </div>
    </div>
  );
}
