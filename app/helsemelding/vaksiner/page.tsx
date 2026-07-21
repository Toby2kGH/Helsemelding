"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { VaccineCard } from "@/components/VaccineCard";
import { useUser } from "@/context/UserContext";
import { beregnVaksinanbefalinger } from "@/lib/vaccineEngine";
import type { Step } from "@/types";

const statusKonfig: Record<string, { tekst: string; ikon: React.ReactNode; klasse: string }> = {
  ok: {
    tekst: "OK",
    ikon: <CheckCircleIcon className="h-4 w-4 text-success-700" aria-hidden="true" />,
    klasse: "text-success-700",
  },
  utdatert: {
    tekst: "Bør kanskje fornyes",
    ikon: <ExclamationCircleIcon className="h-4 w-4 text-warning-700" aria-hidden="true" />,
    klasse: "text-warning-700",
  },
  anbefalt_fornyelse: {
    tekst: "Fornyelse anbefalt",
    ikon: <ExclamationCircleIcon className="h-4 w-4 text-cherry-700" aria-hidden="true" />,
    klasse: "text-cherry-700",
  },
  ikke_registrert: {
    tekst: "Ikke registrert",
    ikon: <ExclamationCircleIcon className="h-4 w-4 text-neutral-400" aria-hidden="true" />,
    klasse: "text-neutral-400",
  },
  valgfritt: {
    tekst: "Valgfritt",
    ikon: <CheckCircleIcon className="h-4 w-4 text-neutral-400" aria-hidden="true" />,
    klasse: "text-neutral-400",
  },
  vurder_fornyelse: {
    tekst: "Vurder fornyelse",
    ikon: <ExclamationCircleIcon className="h-4 w-4 text-warning-700" aria-hidden="true" />,
    klasse: "text-warning-700",
  },
};

export default function Vaksiner() {
  const router = useRouter();
  const {
    profil,
    helsemeldingState,
    oppdaterVaccineResponse,
    setErImmunkompromittert,
    fullforSteg,
  } = useUser();

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: "completed" },
    { id: 2, label: "Kritisk info", path: "/helsemelding/kritisk-info", status: helsemeldingState.stepsCompleted.kritiskInfo ? "completed" : "pending" },
    { id: 3, label: "Vaksiner", path: "/helsemelding/vaksiner", status: "active" },
    { id: 4, label: "Samtykker", path: "/helsemelding/samtykker", status: helsemeldingState.stepsCompleted.samtykker ? "completed" : "pending" },
    { id: 5, label: "Bekreft", path: "/helsemelding/bekreft", status: helsemeldingState.stepsCompleted.bekreft ? "completed" : "pending" },
  ];

  const anbefalinger = beregnVaksinanbefalinger(
    profil,
    profil.sysvak,
    helsemeldingState.erImmunkompromittert
  );

  function getVaksineResponse(vaksine: string) {
    return helsemeldingState.vaccineResponses.find((r) => r.vaksine === vaksine) ?? null;
  }

  function neste() {
    fullforSteg("vaksiner");
    router.push("/helsemelding/samtykker");
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 3 av 5</p>
          <h1 className="text-3xl font-bold text-neutral-900">Vaksiner</h1>
          <p className="text-neutral-600 mt-2">
            Vi har hentet vaksinasjonshistorikken din fra SYSVAK og sjekket den mot anbefalingene fra Folkehelseinstituttet (FHI).
          </p>
        </div>

        {/* SYSVAK-historikk */}
        <section className="mb-8" aria-labelledby="sysvak-heading">
          <h2 id="sysvak-heading" className="text-xl font-semibold text-neutral-900 mb-3">
            Dine registrerte vaksiner i SYSVAK
          </h2>
          <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th scope="col" className="text-left px-4 py-2.5 font-semibold text-neutral-700">Vaksine</th>
                  <th scope="col" className="text-left px-4 py-2.5 font-semibold text-neutral-700 hidden sm:table-cell">Dato</th>
                  <th scope="col" className="text-left px-4 py-2.5 font-semibold text-neutral-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {profil.sysvak.map((v, i) => {
                  const cfg = statusKonfig[v.status] ?? statusKonfig.ok;
                  return (
                    <tr key={i} className="border-b border-neutral-100 last:border-0">
                      <td className="px-4 py-3 text-neutral-900">{v.vaksine}</td>
                      <td className="px-4 py-3 text-neutral-500 hidden sm:table-cell">
                        {v.dato ? new Date(v.dato.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$1-$2-$3")).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" }) : "Ikke registrert"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1.5 ${cfg.klasse}`}>
                          {cfg.ikon}
                          {cfg.tekst}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Anbefalinger */}
        <section className="mb-8" aria-labelledby="anbefalinger-heading">
          <h2 id="anbefalinger-heading" className="text-xl font-semibold text-neutral-900 mb-3">
            Dine vaksineanbefalinger
          </h2>
          {anbefalinger.length === 0 ? (
            <div className="rounded-lg border border-success-700 bg-success-100 p-6 text-center">
              <CheckCircleIcon className="h-10 w-10 text-success-700 mx-auto mb-2" aria-hidden="true" />
              <p className="text-success-700 font-semibold">Alt ser bra ut!</p>
              <p className="text-neutral-700 text-sm mt-1">Du har ingen aktive vaksineanbefalinger akkurat nå.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {anbefalinger.map((a) => {
                const resp = getVaksineResponse(a.vaksine);
                return (
                  <VaccineCard
                    key={a.vaksine}
                    anbefaling={a}
                    akseptert={resp?.akseptert ?? null}
                    onAksepter={() => oppdaterVaccineResponse({ vaksine: a.vaksine, akseptert: true })}
                    onAvslå={() => oppdaterVaccineResponse({ vaksine: a.vaksine, akseptert: false })}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* Immunsuppresjon */}
        <section className="mb-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm" aria-labelledby="immun-heading">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl" aria-hidden="true">⚕️</span>
            <div>
              <h2 id="immun-heading" className="font-semibold text-neutral-900">
                Viktig spørsmål
              </h2>
              <p className="text-sm text-neutral-700 mt-1">
                Bruker du medisiner som svekker immunforsvaret?{" "}
                <span className="text-neutral-500">
                  (f.eks. biologiske legemidler, høydose kortison, kjemoterapi eller andre immunsupprimerende midler)
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 ml-9">
            {([false, true] as const).map((v) => (
              <label key={String(v)} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="immunsuppresjon"
                  checked={helsemeldingState.erImmunkompromittert === v}
                  onChange={() => setErImmunkompromittert(v)}
                  className="h-4 w-4 accent-blueberry-700"
                />
                {v ? "Ja" : "Nei"}
              </label>
            ))}
          </div>
          {helsemeldingState.erImmunkompromittert && (
            <div className="mt-3 ml-9 rounded-md bg-warning-100 border-l-4 border-warning-700 p-3 text-sm" role="alert">
              <p className="font-semibold text-warning-700 mb-1">⚠️ Viktig for deg</p>
              <p className="text-neutral-700">
                Immunkompromitterte pasienter bør diskutere vaksiner med fastlegen sin. Noen vaksiner er kontraindisert,
                mens andre anbefales ekstra. Ta dette opp ved neste fastlegekonsultasjon.
              </p>
            </div>
          )}
        </section>

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
            Neste: Samtykker
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
