"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";
import {
  beregnForebygging,
  tjenesterNaerDeg,
  type Livssituasjon,
} from "@/lib/forebyggingEngine";

const profilValg = [
  { id: "kari", navn: "Kari (72)" },
  { id: "sara", navn: "Sara (28)" },
  { id: "jonas", navn: "Jonas (24)" },
] as const;

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

export function ForebyggingSeksjon() {
  const { profil, aktivProfil, byttProfil } = useUser();
  const [livssituasjoner, setLivssituasjoner] = useState<Set<Livssituasjon>>(new Set());
  const [alder, setAlder] = useState<number>(profil.alder);

  // Nullstill alder til profilens faktiske alder når man bytter profil.
  useEffect(() => {
    setAlder(profil.alder);
  }, [profil.alder]);

  const raad = useMemo(
    () => beregnForebygging(profil, alder, livssituasjoner),
    [profil, alder, livssituasjoner]
  );
  const tjenester = useMemo(() => tjenesterNaerDeg(profil, alder), [profil, alder]);

  const toggleLivssituasjon = (id: Livssituasjon) => {
    setLivssituasjoner((prev) => {
      const neste = new Set(prev);
      if (neste.has(id)) neste.delete(id);
      else neste.add(id);
      return neste;
    });
  };

  const overstyrt = alder !== profil.alder;

  return (
    <div className="not-prose rounded-lg border border-neutral-200 bg-neutral-50 p-5">
      {/* Demo-kontroller */}
      <div className="mb-5 space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">
            Prøv med en profil
          </p>
          <div className="flex flex-wrap gap-2">
            {profilValg.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => byttProfil(p.id)}
                aria-pressed={aktivProfil === p.id}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                  aktivProfil === p.id
                    ? "bg-blueberry-900 text-white"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:border-blueberry-500"
                }`}
              >
                {p.navn}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="alder-slider" className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Sveip over aldersbåndene:{" "}
            <span className="text-blueberry-700 normal-case">{alder} år</span>
            {overstyrt && (
              <span className="ml-1 text-neutral-400 normal-case font-normal">
                (overstyrt — {profil.navn.split(" ")[0]} er {profil.alder})
              </span>
            )}
          </label>
          <input
            id="alder-slider"
            type="range"
            min={1}
            max={95}
            value={alder}
            onChange={(e) => setAlder(Number(e.target.value))}
            className="mt-1.5 w-full accent-blueberry-700"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>0–5</span><span>6–17</span><span>18–39</span><span>40–64</span><span>65+</span><span>80+</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">
            Livssituasjon (som du selv oppgir)
          </p>
          <div className="flex flex-wrap gap-2">
            {livssituasjonValg.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => toggleLivssituasjon(l.id)}
                aria-pressed={livssituasjoner.has(l.id)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                  livssituasjoner.has(l.id)
                    ? "bg-blueberry-500 text-white"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:border-blueberry-500"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Personalisert resultat */}
      <p className="text-sm text-neutral-600 mb-3">
        Basert på alder (<strong>{alder} år</strong>) og hvor du bor
        (<strong>{profil.kommune}</strong>) viser vi{" "}
        <strong>{raad.length} råd</strong> — ikke en full katalog.
      </p>

      <div className="space-y-3">
        {raad.map((r) => (
          <div
            key={r.id}
            className={`rounded-lg border-l-4 bg-white p-4 shadow-sm ${prioritetStil[r.prioritet]}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{r.ikon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-0.5">
                  {r.tema}
                </p>
                <h4 className="font-semibold text-neutral-900">{r.tittel}</h4>
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

      {/* Tjenester nær deg */}
      <div className="mt-6">
        <h4 className="font-semibold text-neutral-900 mb-2">
          Tjenester nær deg i {profil.kommune}
        </h4>
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
        <p className="text-xs text-neutral-500 mt-2">
          Illustrative tjenestetyper. I en reell tjeneste ville disse vært koblet mot
          kommunens egen tjenestekatalog.
        </p>
      </div>

      {/* Innramming */}
      <div className="mt-5 rounded-lg border border-warning-700/40 bg-warning-100 p-3">
        <p className="text-xs text-warning-700">
          <strong>Bare tips og lenker.</strong> Dette er pekere til offentlige
          forebyggingsråd basert på alder og livssituasjon — ikke personlige medisinske
          anbefalinger. Snakk med fastlegen din ved spørsmål om egen helse.
        </p>
      </div>
    </div>
  );
}
