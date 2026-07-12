"use client";

import { useMemo, useState } from "react";
import {
  UserGroupIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";
import {
  utledHandlinger,
  KANAL_INFO as kanalStil,
  VIKTIG_FOR_MEG_FORSLAG as hevfdForslag,
} from "@/lib/oppfolgingEngine";

const profilValg = [
  { id: "kari", navn: "Kari (72)" },
  { id: "sara", navn: "Sara (28)" },
  { id: "jonas", navn: "Jonas (24)" },
] as const;

export function LukkeSloyfaSkisse() {
  const { profil, aktivProfil, byttProfil } = useUser();

  const handlinger = useMemo(() => utledHandlinger(profil), [profil]);
  const [valgt, setValgt] = useState<Set<string>>(() => new Set());
  const [hevfd, setHevfd] = useState<Set<string>>(new Set());

  // Forhåndsvelg alle forslag for den aktive profilen (uten å bruke effekter).
  const [initForProfil, setInitForProfil] = useState<string>("");
  if (initForProfil !== aktivProfil) {
    setInitForProfil(aktivProfil);
    setValgt(new Set(handlinger.map((h) => h.id)));
  }

  const kommuneSamtykke = profil.samtykker.deling_sykehus_kommune === true;

  const toggle = (set: Set<string>, id: string, setter: (s: Set<string>) => void) => {
    const neste = new Set(set);
    if (neste.has(id)) neste.delete(id);
    else neste.add(id);
    setter(neste);
  };

  const valgteHandlinger = handlinger.filter((h) => valgt.has(h.id));
  const tilFastlege = valgteHandlinger.filter(
    (h) => h.kanal === "fastlege" || h.kanal === "e-konsultasjon"
  );
  const tilKommune = valgteHandlinger.filter((h) => h.kanal === "kommune");
  const hevfdListe = Array.from(hevfd);

  return (
    <div className="not-prose rounded-lg border border-neutral-200 bg-neutral-50 p-5">
      {/* Profilvelger */}
      <div className="mb-5">
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

      {/* 1. Hva er viktig for meg — rammen */}
      <div className="mb-5 rounded-lg border-2 border-blueberry-500 bg-blueberry-50 p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl" aria-hidden="true">💬</span>
          <h4 className="font-semibold text-blueberry-900">Hva er viktig for meg?</h4>
        </div>
        <p className="text-sm text-neutral-600 mb-3">
          Ett spørsmål som rammer inn resten. Velg det som passer — eller skriv ditt eget.
        </p>
        <div className="flex flex-wrap gap-2">
          {hevfdForslag.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => toggle(hevfd, f, setHevfd)}
              aria-pressed={hevfd.has(f)}
              className={`rounded-full px-3 py-1.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                hevfd.has(f)
                  ? "bg-blueberry-700 text-white"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-blueberry-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Oppfølging jeg ønsker */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">
          Oppfølging jeg ønsker — utledet fra Helsemeldingen
        </p>
        <div className="space-y-2">
          {handlinger.map((h) => (
            <label
              key={h.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-3 transition ${
                valgt.has(h.id) ? "border-blueberry-500" : "border-neutral-200"
              }`}
            >
              <input
                type="checkbox"
                checked={valgt.has(h.id)}
                onChange={() => toggle(valgt, h.id, setValgt)}
                className="mt-1 h-4 w-4 accent-blueberry-700"
              />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-neutral-900 text-sm">{h.tittel}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${kanalStil[h.kanal].klasse}`}>
                    {kanalStil[h.kanal].navn}
                  </span>
                  {h.krevesSamtykke && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-neutral-500">
                      <LockClosedIcon className="h-3 w-3" aria-hidden="true" />
                      krever samtykke
                    </span>
                  )}
                </span>
                <span className="block text-xs text-neutral-500 mt-0.5">{h.begrunnelse}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Forhåndsvisning av handoff */}
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">
        Dette sendes — strukturert, ikke fritekst
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Til fastlege */}
        <div className="rounded-lg border border-blueberry-100 bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <UserGroupIcon className="h-5 w-5 text-blueberry-700" aria-hidden="true" />
            <h5 className="font-semibold text-neutral-900 text-sm">Til fastlege</h5>
          </div>
          <p className="text-xs text-neutral-500 mb-3">{profil.fastlege}</p>

          <p className="text-[10px] font-semibold uppercase tracking-wide text-blueberry-700 mb-1">
            Viktig for pasienten
          </p>
          {hevfdListe.length > 0 ? (
            <p className="text-sm text-neutral-800 mb-3">{hevfdListe.join(" · ")}</p>
          ) : (
            <p className="text-sm text-neutral-400 italic mb-3">(ikke angitt)</p>
          )}

          <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400 mb-1">
            Ønsket oppfølging
          </p>
          {tilFastlege.length > 0 ? (
            <ul className="space-y-1.5">
              {tilFastlege.map((h) => (
                <li key={h.id} className="flex items-start gap-2 text-sm text-neutral-800">
                  {h.kanal === "e-konsultasjon" ? (
                    <ChatBubbleLeftRightIcon className="h-4 w-4 flex-shrink-0 text-blueberry-500 mt-0.5" aria-hidden="true" />
                  ) : (
                    <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">•</span>
                  )}
                  {h.tittel}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-400 italic">Ingen valgt</p>
          )}

          <p className="mt-3 border-t border-neutral-100 pt-2 text-[11px] text-neutral-500">
            Følger med: bekreftet legemiddelliste, kritisk info og vaksinestatus fra Helsemeldingen.
          </p>
        </div>

        {/* Til kommune */}
        <div className="rounded-lg border border-success-700/30 bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <BuildingOffice2Icon className="h-5 w-5 text-success-700" aria-hidden="true" />
            <h5 className="font-semibold text-neutral-900 text-sm">Til {profil.kommune} kommune</h5>
          </div>
          <p className="text-xs text-neutral-500 mb-3">Frisklivssentral / kommunale tjenester</p>

          {tilKommune.length > 0 ? (
            !kommuneSamtykke ? (
              <div className="rounded-md border border-warning-700/40 bg-warning-100 p-2.5">
                <p className="flex items-start gap-1.5 text-xs text-warning-700">
                  <LockClosedIcon className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    {tilKommune.length} ønske venter på samtykke til deling mellom sykehus og
                    kommune. Uten det sendes ingenting hit.
                  </span>
                </p>
              </div>
            ) : (
              <>
                <ul className="space-y-1.5">
                  {tilKommune.map((h) => (
                    <li key={h.id} className="flex items-start gap-2 text-sm text-neutral-800">
                      <span className="text-success-700 font-bold mt-0.5" aria-hidden="true">•</span>
                      {h.tittel}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-neutral-100 pt-2 text-[11px] text-neutral-500">
                  Deles med samtykke. «Viktig for pasienten» følger med som ramme.
                </p>
              </>
            )
          ) : (
            <p className="text-sm text-neutral-400 italic">Ingen kommunale ønsker valgt</p>
          )}
        </div>
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        Skisse. Ingenting sendes i denne demoen. Poenget er å vise hvordan innsikt kan bli
        til strukturert handling — rutet til riktig aktør, forankret i hva som er viktig for deg.
      </p>
    </div>
  );
}
