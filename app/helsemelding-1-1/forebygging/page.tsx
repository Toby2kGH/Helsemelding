"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { byggSteps } from "@/lib/helsemelding11";
import { beregnForebygging, tjenesterNaerDeg, type Livssituasjon } from "@/lib/forebyggingEngine";

const livssituasjonValg: { id: Livssituasjon; label: string }[] = [
  { id: "barn_6_17", label: "Har barn (6–17 år)" },
  { id: "smaa_barn", label: "Har små barn" },
  { id: "gravid", label: "Gravid / planlegger" },
];

const prioritetStil: Record<string, string> = {
  høy: "border-cherry-500",
  middels: "border-blueberry-500",
  lav: "border-neutral-200",
};

export default function StegForebygging() {
  const router = useRouter();
  const { profil } = useUser();
  const { livssituasjoner, toggleLivssituasjon, fullfort, fullforSteg } = useHelsemelding11();
  const steps = byggSteps("forebygging", fullfort);

  const raad = useMemo(
    () => beregnForebygging(profil, profil.alder, new Set(livssituasjoner)),
    [profil, livssituasjoner]
  );
  const tjenester = useMemo(() => tjenesterNaerDeg(profil), [profil]);

  function neste() {
    fullforSteg("forebygging");
    router.push("/helsemelding-1-1/oppfolging");
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 5 av 7</p>
          <h1 className="text-3xl font-bold text-neutral-900">Forebygging for deg</h1>
          <p className="text-neutral-600 mt-2">
            Basert på alder (<strong>{profil.alder} år</strong>) og hvor du bor
            (<strong>{profil.kommune}</strong>) viser vi et kort, relevant utvalg råd — ikke
            en full katalog.
          </p>
        </div>

        <section className="mb-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-neutral-900 mb-2">
            Gjelder noe av dette deg? (valgfritt)
          </p>
          <div className="flex flex-wrap gap-2">
            {livssituasjonValg.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => toggleLivssituasjon(l.id)}
                aria-pressed={livssituasjoner.includes(l.id)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                  livssituasjoner.includes(l.id)
                    ? "bg-blueberry-500 text-white"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:border-blueberry-500"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </section>

        <div className="space-y-3 mb-6">
          {raad.map((r) => (
            <div key={r.id} className={`rounded-lg border-l-4 bg-white p-4 shadow-sm ${prioritetStil[r.prioritet]}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{r.ikon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-0.5">{r.tema}</p>
                  <h2 className="font-semibold text-neutral-900">{r.tittel}</h2>
                  <p className="text-sm text-neutral-700 mt-1">{r.tekst}</p>
                  <p className="text-xs text-neutral-500 italic mt-1.5">{r.hvorfor}</p>
                  {r.lenke ? (
                    <a
                      href={r.lenke}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-blueberry-700 hover:underline mt-2 focus:outline-none focus:underline"
                    >
                      {r.kilde}
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">(åpnes i ny fane)</span>
                    </a>
                  ) : (
                    <p className="mt-2 text-xs text-neutral-500">
                      Kilde: {r.kilde}
                      <span className="ml-1 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">
                        delenke kvalitetssikres
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mb-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <h2 className="font-semibold text-neutral-900 mb-2">Tjenester nær deg i {profil.kommune}</h2>
          <ul className="space-y-2">
            {tjenester.map((t) => (
              <li key={t.navn} className="flex items-start gap-2 text-sm">
                <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">•</span>
                <span className="text-neutral-700">
                  <span className="font-medium text-neutral-900">{t.navn}</span> — {t.beskrivelse}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="rounded-lg border border-warning-700/40 bg-warning-100 p-3 mb-6">
          <p className="text-xs text-warning-700">
            <strong>Bare tips og lenker.</strong> Dette er pekere til offentlige
            forebyggingsråd — ikke personlige medisinske anbefalinger. Snakk med fastlegen din
            ved spørsmål om egen helse.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding-1-1/samtykker"
            className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Link>
          <button
            onClick={neste}
            className="flex items-center gap-2 rounded-md bg-blueberry-900 px-6 py-3 text-base font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:ring-offset-2 transition"
          >
            Neste: Oppfølging
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
