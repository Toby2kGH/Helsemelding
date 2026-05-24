"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserCircleIcon,
  DocumentTextIcon,
  BeakerIcon,
  ShieldCheckIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { useUser } from "@/context/UserContext";
import type { MedicationResponse } from "@/types";

type Visning = "fastlege" | "sykehus";

function ingenSvar(responses: MedicationResponse[], medId: string): boolean {
  return !responses.find((r) => r.medId === medId);
}

export default function KvitteringLege() {
  const { profil, helsemeldingState } = useUser();
  const [visning, setVisning] = useState<Visning>("fastlege");
  const år = new Date().getFullYear();
  const innsendt = new Date().toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const alleMed = [...profil.legemidler.faste, ...profil.legemidler.behovs];
  const { medicationResponses, vaccineResponses, samtykkeState, stepsCompleted } = helsemeldingState;

  // Kritiske legemidler (blodfortynnende, insulin, nødmedisiner)
  const kritiskeMed = alleMed.filter((m) => m.viktig);

  // Legemidler med avvik
  const avvikMed = medicationResponses.filter(
    (r) => r.tarMedisinen === "ja_annen_dose" || r.tarMedisinen === "nei"
  );

  // Legemidler brukeren ikke lengre tar
  const seponertMed = medicationResponses.filter((r) => r.tarMedisinen === "nei");

  // Legemidler med annen dose
  const annendoseMed = medicationResponses.filter((r) => r.tarMedisinen === "ja_annen_dose");

  // Legemidler der pasienten ikke vet hvorfor de tar dem
  const vetIkkeMed = medicationResponses.filter((r) => r.vetHvorfor === "nei");

  // Aksepterte vaksineanbefalinger
  const aksepterteVaksiner = vaccineResponses.filter((r) => r.akseptert === true);
  const ubesvarteVaksiner = profil.vaksinanbefalinger.filter(
    (a) => !vaccineResponses.find((r) => r.vaksine === a.vaksine)
  );

  // STOPP-flagg-medisiner
  const stoppFlagg = alleMed.filter(
    (m) => m.handelsnavn === "Imovane" || m.virkestoff === "zopiklon"
  );

  // Handlingspunkter for lege
  const handlingspunkter: { farge: "red" | "yellow" | "blue"; tekst: string }[] = [];
  seponertMed.forEach((r) => {
    const med = alleMed.find((m) => m.id === r.medId);
    if (med)
      handlingspunkter.push({
        farge: "red",
        tekst: `Pasienten tar ikke lenger ${med.handelsnavn} — vurder formell seponering i PLL`,
      });
  });
  annendoseMed.forEach((r) => {
    const med = alleMed.find((m) => m.id === r.medId);
    if (med)
      handlingspunkter.push({
        farge: "yellow",
        tekst: `Avvikende dose for ${med.handelsnavn}: «${r.annenDoseBeskriv || "ikke utfylt"}» — avklar ved neste konsultasjon`,
      });
  });
  vetIkkeMed.forEach((r) => {
    const med = alleMed.find((m) => m.id === r.medId);
    if (med)
      handlingspunkter.push({
        farge: "yellow",
        tekst: `Pasienten vet ikke hvorfor de tar ${med.handelsnavn} — vurder motivasjonssamtale`,
      });
  });
  stoppFlagg.forEach((m) => {
    handlingspunkter.push({
      farge: "yellow",
      tekst: `STOPP-flagg: ${m.handelsnavn} (${m.virkestoff}) er på STOPP-lista for pasienter over 65 år — økt fallrisiko`,
    });
  });
  ubesvarteVaksiner
    .filter((v) => v.prioritet === "høy")
    .forEach((v) => {
      handlingspunkter.push({
        farge: "blue",
        tekst: `Vaksineanbefalilng ikke besvart: ${v.vaksine} (høy prioritet) — ta opp i konsultasjon`,
      });
    });
  if (samtykkeState.organdonasjon === null) {
    handlingspunkter.push({
      farge: "blue",
      tekst: "Pasienten har ikke tatt stilling til organdonasjon",
    });
  }

  const fargeklasse = {
    red: "bg-cherry-100 border-l-4 border-cherry-700 text-cherry-700",
    yellow: "bg-warning-100 border-l-4 border-warning-700 text-warning-700",
    blue: "bg-blueberry-50 border-l-4 border-blueberry-500 text-blueberry-700",
  };

  const ikon = {
    red: <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />,
    yellow: <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />,
    blue: <DocumentTextIcon className="h-4 w-4 flex-shrink-0 mt-0.5" aria-hidden="true" />,
  };

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Tilbake */}
        <Link
          href="/helsemelding/bekreft"
          className="mb-6 inline-flex items-center gap-2 text-sm text-blueberry-700 hover:text-blueberry-900 focus:outline-none focus:underline"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Tilbake til Helsemelding
        </Link>

        {/* Header */}
        <div className="mb-6 rounded-lg bg-blueberry-900 text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-blueberry-100 text-sm font-medium mb-1">
                🔒 DEMO — Helsepersonellvisning
              </p>
              <h1 className="text-2xl font-bold">
                Helsemelding {år} — Rapport til helsepersonell
              </h1>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-blueberry-100">
                <span className="flex items-center gap-1.5">
                  <UserCircleIcon className="h-4 w-4" aria-hidden="true" />
                  {profil.navn}, {profil.alder} år
                </span>
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4" aria-hidden="true" />
                  Innsendt: {innsendt}
                </span>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-md border border-white/40 px-3 py-1.5 text-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Skriv ut rapport"
            >
              <PrinterIcon className="h-4 w-4" aria-hidden="true" />
              Skriv ut
            </button>
          </div>
        </div>

        {/* Visningstabs */}
        <div className="mb-6 flex rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => setVisning("fastlege")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blueberry-500 ${
              visning === "fastlege"
                ? "bg-blueberry-900 text-white"
                : "text-neutral-700 hover:bg-neutral-50"
            }`}
            aria-pressed={visning === "fastlege"}
          >
            👨‍⚕️ Fastlege / poliklinikk
          </button>
          <button
            onClick={() => setVisning("sykehus")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blueberry-500 ${
              visning === "sykehus"
                ? "bg-cherry-700 text-white"
                : "text-neutral-700 hover:bg-neutral-50"
            }`}
            aria-pressed={visning === "sykehus"}
          >
            🏥 Sykehuslege / akuttmottak
          </button>
        </div>

        {/* ─── FASTLEGE-VISNING ─── */}
        {visning === "fastlege" && (
          <div className="space-y-6">
            {/* Handlingspunkter */}
            {handlingspunkter.length > 0 && (
              <section aria-labelledby="handling-heading">
                <h2 id="handling-heading" className="text-lg font-bold text-neutral-900 mb-3">
                  Handlingspunkter (automatisk generert)
                </h2>
                <div className="space-y-2">
                  {handlingspunkter.map((h, i) => (
                    <div key={i} className={`flex items-start gap-2 rounded-md p-3 text-sm ${fargeklasse[h.farge]}`}>
                      {ikon[h.farge]}
                      <span>{h.tekst}</span>
                    </div>
                  ))}
                </div>
                {handlingspunkter.length === 0 && (
                  <div className="rounded-md bg-success-100 border border-success-700 p-3 text-sm text-success-700 flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4" aria-hidden="true" />
                    Ingen handlingspunkter — alt ser bra ut
                  </div>
                )}
              </section>
            )}

            {/* Legemiddelstatus */}
            <section aria-labelledby="legemiddel-heading">
              <h2 id="legemiddel-heading" className="text-lg font-bold text-neutral-900 mb-3">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true">💊</span> Legemiddelstatus
                </span>
              </h2>
              <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th scope="col" className="text-left px-4 py-2.5 font-semibold text-neutral-700">Legemiddel</th>
                      <th scope="col" className="text-left px-4 py-2.5 font-semibold text-neutral-700 hidden md:table-cell">Indikasjon</th>
                      <th scope="col" className="text-left px-4 py-2.5 font-semibold text-neutral-700">Pasientsvar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alleMed.map((med) => {
                      const resp = medicationResponses.find((r) => r.medId === med.id);
                      const ubesvart = !resp || resp.tarMedisinen === null;
                      const status =
                        ubesvart ? "ubesvart"
                        : resp.tarMedisinen === "ja_som_forskrevet" ? "ok"
                        : resp.tarMedisinen === "ja_annen_dose" ? "avvik"
                        : "seponert";

                      const statusVis = {
                        ok: <span className="flex items-center gap-1 text-success-700"><CheckCircleIcon className="h-4 w-4" aria-hidden="true" />Som forskrevet</span>,
                        avvik: <span className="flex items-center gap-1 text-warning-700"><ExclamationTriangleIcon className="h-4 w-4" aria-hidden="true" />Annen dose{resp?.annenDoseBeskriv ? `: «${resp.annenDoseBeskriv}»` : ""}</span>,
                        seponert: <span className="flex items-center gap-1 text-cherry-700"><ExclamationTriangleIcon className="h-4 w-4" aria-hidden="true" />Tar ikke lenger</span>,
                        ubesvart: <span className="text-neutral-400 italic">Ikke besvart</span>,
                      }[status];

                      return (
                        <tr key={med.id} className={`border-b border-neutral-100 last:border-0 ${status === "seponert" ? "bg-cherry-100/30" : status === "avvik" ? "bg-warning-100/30" : ""}`}>
                          <td className="px-4 py-3">
                            <p className="font-medium text-neutral-900">
                              {med.handelsnavn}
                              {med.viktig && (
                                <span className="ml-2 inline-flex items-center rounded-full bg-cherry-100 px-1.5 py-0.5 text-xs font-semibold text-cherry-700">KRITISK</span>
                              )}
                            </p>
                            <p className="text-xs text-neutral-500">{med.virkestoff} {med.styrke}</p>
                          </td>
                          <td className="px-4 py-3 text-neutral-600 text-xs hidden md:table-cell">{med.indikasjon}</td>
                          <td className="px-4 py-3 text-sm">{statusVis}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Vaksiner */}
            <section aria-labelledby="vaksine-heading">
              <h2 id="vaksine-heading" className="text-lg font-bold text-neutral-900 mb-3">
                <span className="flex items-center gap-2">
                  <BeakerIcon className="h-5 w-5" aria-hidden="true" />
                  Vaksinestatus
                </span>
              </h2>
              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm space-y-2">
                {profil.vaksinanbefalinger.length === 0 ? (
                  <p className="text-sm text-success-700">Ingen aktive vaksineanbefalinger.</p>
                ) : (
                  profil.vaksinanbefalinger.map((v) => {
                    const resp = vaccineResponses.find((r) => r.vaksine === v.vaksine);
                    return (
                      <div key={v.vaksine} className="flex items-center justify-between gap-2 text-sm border-b border-neutral-100 last:border-0 pb-2 last:pb-0">
                        <div>
                          <p className="font-medium text-neutral-900">{v.vaksine}</p>
                          <p className="text-xs text-neutral-500">{v.årsak}</p>
                        </div>
                        <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
                          resp?.akseptert === true
                            ? "bg-success-100 text-success-700"
                            : resp?.akseptert === false
                            ? "bg-neutral-100 text-neutral-500"
                            : "bg-warning-100 text-warning-700"
                        }`}>
                          {resp?.akseptert === true ? "Notert av pasient" : resp?.akseptert === false ? "Avslått" : "Ikke besvart"}
                        </span>
                      </div>
                    );
                  })
                )}
                {helsemeldingState.erImmunkompromittert && (
                  <div className="mt-2 rounded-md bg-warning-100 border-l-4 border-warning-700 p-3 text-sm text-warning-700">
                    ⚠️ Pasienten oppgir å bruke immunsupprimerende behandling — vaksinering bør vurderes individuelt
                  </div>
                )}
              </div>
            </section>

            {/* Samtykker oppdatert */}
            <section aria-labelledby="samtykke-heading">
              <h2 id="samtykke-heading" className="text-lg font-bold text-neutral-900 mb-3">
                <span className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5" aria-hidden="true" />
                  Samtykker (status etter Helsemelding {år})
                </span>
              </h2>
              <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { label: "Organdonasjon", verdi: samtykkeState.organdonasjon === "ja" ? "Donor" : samtykkeState.organdonasjon === "nei" ? "Reservert" : "Ikke tatt stilling" },
                      { label: "Journaldeling mellom sykehus", verdi: samtykkeState.deling_mellom_sykehus ? "Ja" : samtykkeState.deling_mellom_sykehus === false ? "Nei" : "Ikke angitt" },
                      { label: "Deling mellom helseregioner", verdi: samtykkeState.deling_mellom_regioner ? "Ja" : samtykkeState.deling_mellom_regioner === false ? "Nei" : "Ikke angitt" },
                      { label: "Deling sykehus–kommune", verdi: samtykkeState.deling_sykehus_kommune ? "Ja" : samtykkeState.deling_sykehus_kommune === false ? "Nei" : "Ikke angitt" },
                      { label: "Deling med private tilbydere", verdi: samtykkeState.deling_private_aktorer ? "Ja" : samtykkeState.deling_private_aktorer === false ? "Nei" : "Ikke angitt" },
                    ].map((r) => (
                      <tr key={r.label} className="border-b border-neutral-100 last:border-0">
                        <td className="px-4 py-2.5 text-neutral-700 font-medium w-1/2">{r.label}</td>
                        <td className={`px-4 py-2.5 font-semibold ${
                          r.verdi === "Ja" || r.verdi === "Donor" ? "text-success-700"
                          : r.verdi === "Nei" || r.verdi === "Reservert" ? "text-cherry-700"
                          : "text-neutral-400"
                        }`}>{r.verdi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 text-xs text-neutral-500 text-center">
              Denne rapporten er generert av Helsenorge Helsemelding og er automatisk synkronisert med
              kjernejournal og pasientens legemiddelliste (PLL).
              <br />
              <strong>DEMO — Ikke ekte pasientdata</strong>
            </div>
          </div>
        )}

        {/* ─── SYKEHUS / AKUTTVISNING ─── */}
        {visning === "sykehus" && (
          <div className="space-y-6">
            {/* Kritisk-banner */}
            <div className="rounded-lg bg-cherry-700 text-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide opacity-75 mb-1">
                Akuttvisning — kun kritisk informasjon
              </p>
              <h2 className="text-xl font-bold mb-1">
                {profil.navn} — {profil.alder} år — {profil.kommune}
              </h2>
              <p className="text-cherry-100 text-sm">
                Fastlege: {profil.fastlege}
              </p>
            </div>

            {/* Kritiske legemidler */}
            <section aria-labelledby="kritisk-med-heading">
              <div className="flex items-center gap-2 mb-3">
                <ExclamationTriangleIcon className="h-6 w-6 text-cherry-700" aria-hidden="true" />
                <h2 id="kritisk-med-heading" className="text-lg font-bold text-cherry-700">
                  Kritiske legemidler — sjekk alltid ved innleggelse
                </h2>
              </div>
              {kritiskeMed.length === 0 ? (
                <p className="text-sm text-neutral-500 italic">Ingen kritiske legemidler registrert.</p>
              ) : (
                <div className="space-y-3">
                  {kritiskeMed.map((med) => {
                    const resp = medicationResponses.find((r) => r.medId === med.id);
                    const tar = resp?.tarMedisinen;
                    return (
                      <div key={med.id} className={`rounded-lg border-l-4 p-4 ${
                        tar === "nei"
                          ? "border-neutral-400 bg-neutral-100"
                          : tar === "ja_annen_dose"
                          ? "border-warning-700 bg-warning-100"
                          : "border-cherry-700 bg-cherry-100"
                      }`}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="font-bold text-neutral-900 text-base">
                              {med.handelsnavn}{" "}
                              <span className="font-normal text-sm">({med.virkestoff} {med.styrke})</span>
                            </p>
                            <p className="text-sm text-neutral-700 mt-0.5">{med.indikasjon}</p>
                            <p className="text-sm text-neutral-600 mt-0.5">Dose: {med.dose}</p>
                            <p className="text-xs font-mono text-neutral-400 mt-0.5">ATC: {med.atc}</p>
                          </div>
                          <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                            tar === "nei"
                              ? "bg-neutral-200 text-neutral-700"
                              : tar === "ja_annen_dose"
                              ? "bg-warning-700 text-white"
                              : tar === "ja_som_forskrevet"
                              ? "bg-success-700 text-white"
                              : "bg-neutral-200 text-neutral-500"
                          }`}>
                            {tar === "ja_som_forskrevet" ? "✓ Tar som forskrevet"
                            : tar === "ja_annen_dose" ? "⚠ Avvikende dose"
                            : tar === "nei" ? "Seponert av pasient"
                            : "Ikke besvart"}
                          </span>
                        </div>
                        {tar === "ja_annen_dose" && resp?.annenDoseBeskriv && (
                          <p className="mt-2 text-sm font-semibold text-warning-700">
                            Pasientens beskrivelse: «{resp.annenDoseBeskriv}»
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Alle legemidler — kompakt */}
            <section aria-labelledby="alle-med-heading">
              <h2 id="alle-med-heading" className="text-lg font-bold text-neutral-900 mb-3">
                Fullstendig legemiddelliste (PLL + pasientsvar)
              </h2>
              <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th scope="col" className="text-left px-3 py-2 font-semibold text-neutral-700">Preparat</th>
                      <th scope="col" className="text-left px-3 py-2 font-semibold text-neutral-700 hidden sm:table-cell">Dose</th>
                      <th scope="col" className="text-left px-3 py-2 font-semibold text-neutral-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...profil.legemidler.faste, ...profil.legemidler.behovs].map((med) => {
                      const resp = medicationResponses.find((r) => r.medId === med.id);
                      const tar = resp?.tarMedisinen;
                      return (
                        <tr key={med.id} className={`border-b border-neutral-100 last:border-0 text-xs ${
                          tar === "nei" ? "opacity-50 line-through-soft" : ""
                        }`}>
                          <td className="px-3 py-2">
                            <span className={`font-medium ${tar === "nei" ? "text-neutral-400 line-through" : "text-neutral-900"}`}>
                              {med.handelsnavn}
                            </span>
                            <span className="block text-neutral-400">{med.virkestoff}</span>
                          </td>
                          <td className="px-3 py-2 text-neutral-500 hidden sm:table-cell">{med.styrke}</td>
                          <td className="px-3 py-2">
                            {tar === "ja_som_forskrevet" && <span className="text-success-700 font-medium">✓</span>}
                            {tar === "ja_annen_dose" && <span className="text-warning-700 font-medium">⚠ Avvik</span>}
                            {tar === "nei" && <span className="text-neutral-400">Seponert</span>}
                            {!tar && <span className="text-neutral-300">—</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Diagnoser */}
            <section aria-labelledby="diagnoser-heading">
              <h2 id="diagnoser-heading" className="text-lg font-bold text-neutral-900 mb-3">
                Registrerte diagnoser
              </h2>
              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <ul className="flex flex-wrap gap-2">
                  {profil.diagnoser.map((d) => (
                    <li key={d} className="rounded-full bg-blueberry-100 px-3 py-1 text-sm font-medium text-blueberry-700">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Samtykker — kritisk for sykehus */}
            <section aria-labelledby="samtykke-syk-heading">
              <h2 id="samtykke-syk-heading" className="text-lg font-bold text-neutral-900 mb-3">
                Samtykker relevante for innleggelse
              </h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  {
                    label: "Organdonasjon",
                    verdi: samtykkeState.organdonasjon === "ja" ? "Donor" : samtykkeState.organdonasjon === "nei" ? "Reservert" : "Ikke registrert",
                    ok: samtykkeState.organdonasjon === "ja",
                    viktig: true,
                  },
                  {
                    label: "Deling mellom sykehus",
                    verdi: samtykkeState.deling_mellom_sykehus ? "Samtykket" : samtykkeState.deling_mellom_sykehus === false ? "Reservert" : "Ikke angitt",
                    ok: samtykkeState.deling_mellom_sykehus === true,
                    viktig: true,
                  },
                  {
                    label: "Deling mellom regioner",
                    verdi: samtykkeState.deling_mellom_regioner ? "Samtykket" : samtykkeState.deling_mellom_regioner === false ? "Reservert" : "Ikke angitt",
                    ok: samtykkeState.deling_mellom_regioner === true,
                    viktig: false,
                  },
                  {
                    label: "Sykehus–kommune",
                    verdi: samtykkeState.deling_sykehus_kommune ? "Samtykket" : samtykkeState.deling_sykehus_kommune === false ? "Reservert" : "Ikke angitt",
                    ok: samtykkeState.deling_sykehus_kommune === true,
                    viktig: false,
                  },
                ].map((s) => (
                  <div key={s.label} className={`rounded-lg border p-3 text-center ${
                    s.ok ? "border-success-700 bg-success-100" : s.verdi === "Reservert" ? "border-cherry-700 bg-cherry-100" : "border-neutral-200 bg-neutral-50"
                  }`}>
                    <p className={`text-lg font-bold mb-1 ${s.ok ? "text-success-700" : s.verdi === "Reservert" ? "text-cherry-700" : "text-neutral-400"}`}>
                      {s.ok ? "✓" : s.verdi === "Reservert" ? "✗" : "—"}
                    </p>
                    <p className="text-xs font-semibold text-neutral-700">{s.label}</p>
                    <p className={`text-xs mt-0.5 ${s.ok ? "text-success-700" : s.verdi === "Reservert" ? "text-cherry-700" : "text-neutral-400"}`}>
                      {s.verdi}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Immunstatus */}
            {helsemeldingState.erImmunkompromittert && (
              <div className="rounded-lg bg-warning-100 border-l-4 border-warning-700 p-4">
                <p className="font-bold text-warning-700 mb-1">
                  ⚠️ Immunsupprimert pasient
                </p>
                <p className="text-sm text-neutral-700">
                  Pasienten oppgir å bruke immunsupprimerende behandling. Husk kontraindikasjoner
                  for levende vaksiner og økt infeksjonsrisiko.
                </p>
              </div>
            )}

            <div className="rounded-lg bg-neutral-50 border border-neutral-200 p-4 text-xs text-neutral-500 text-center">
              Helsemelding {år} — Hentet fra Helsenorge / kjernejournal / PLL.
              Sist oppdatert av pasienten: {innsendt}.
              <br />
              <strong>DEMO — Ikke ekte pasientdata</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
