"use client";

import { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";

/**
 * Arm «Fremtidsbilde»: aktiv WOOP-øvelse (Wish–Outcome–Obstacle–Plan / mental
 * kontrastering + implementeringsintensjon). Brukeren ser seg selv om 10 år og
 * lager en konkret hvis–så-plan. Evidensbasert (Oettingen; Gollwitzer).
 */
export function HelsekompetanseWoop() {
  const { profil } = useUser();
  const eldre = profil.alder >= 60;

  const [onske, setOnske] = useState("");
  const [hindring, setHindring] = useState("");
  const [naar, setNaar] = useState("");
  const [saa, setSaa] = useState("");

  const onskeForslag = eldre
    ? ["Fortsatt klare meg selv hjemme", "Gå tur med barnebarna", "Være i form til å reise", "Slippe å falle"]
    : ["Ha overskudd i hverdagen", "Holde meg frisk og sterk", "Være et godt forbilde", "Sove bedre og ha mer energi"];

  const hindringForslag = ["Jeg blir sittende når jeg er sliten", "Dårlig tid", "Mangler motivasjon alene", "Vondt i kroppen"];

  const planFerdig = naar.trim() && saa.trim();

  return (
    <div className="space-y-5">
      <div className="rounded-lg border-l-4 border-blueberry-500 bg-blueberry-50 p-4">
        <p className="flex items-start gap-2 text-sm text-neutral-700">
          <SparklesIcon className="h-5 w-5 flex-shrink-0 text-blueberry-700 mt-0.5" aria-hidden="true" />
          <span>
            I stedet for råd fra oss, starter vi med <strong>ditt eget fremtidsbilde</strong>. Å se
            deg selv om ti år levende for deg, kontrastere det med det som står i veien, og lage en
            konkret hvis–så-plan er en metode med god forskningsstøtte.
          </span>
        </p>
      </div>

      {/* W + O: fremtidsbilde */}
      <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-blueberry-700 mb-1">1 · Deg om 10 år</p>
        <label htmlFor="woop-onske" className="text-sm font-medium text-neutral-900 block mb-2">
          Se det for deg: hva er det aller viktigste du fortsatt vil klare eller ha om ti år?
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {onskeForslag.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setOnske(f)}
              className={`rounded-full px-3 py-1.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                onske === f ? "bg-blueberry-700 text-white" : "bg-white text-neutral-700 border border-neutral-200 hover:border-blueberry-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <textarea
          id="woop-onske"
          value={onske}
          onChange={(e) => setOnske(e.target.value)}
          rows={2}
          placeholder="Skriv det med egne ord — jo mer levende, jo bedre."
          className="w-full rounded-md border border-neutral-200 p-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
        />
      </section>

      {/* O: hindring (mental kontrastering) */}
      <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-cherry-700 mb-1">2 · Hindringen</p>
        <label htmlFor="woop-hindring" className="text-sm font-medium text-neutral-900 block mb-2">
          Hva i din egen hverdag står mest i veien for dette?
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {hindringForslag.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setHindring(f)}
              className={`rounded-full px-3 py-1.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                hindring === f ? "bg-cherry-500 text-white" : "bg-white text-neutral-700 border border-neutral-200 hover:border-blueberry-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <textarea
          id="woop-hindring"
          value={hindring}
          onChange={(e) => setHindring(e.target.value)}
          rows={2}
          placeholder="Vær ærlig — den viktigste hindringen sitter ofte i oss selv."
          className="w-full rounded-md border border-neutral-200 p-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
        />
      </section>

      {/* P: implementeringsintensjon */}
      <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-success-700 mb-1">3 · Hvis–så-planen din</p>
        <p className="text-sm text-neutral-700 mb-3">
          Lag en konkret plan for når hindringen dukker opp:
        </p>
        <div className="space-y-3">
          <div>
            <label htmlFor="woop-naar" className="text-xs font-medium text-neutral-500 block mb-1">Hvis … (situasjon)</label>
            <input
              id="woop-naar"
              value={naar}
              onChange={(e) => setNaar(e.target.value)}
              placeholder="Hvis jeg kommer hjem fra jobb og er fristet til å bli sittende"
              className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueberry-500"
            />
          </div>
          <div>
            <label htmlFor="woop-saa" className="text-xs font-medium text-neutral-500 block mb-1">… så skal jeg (handling)</label>
            <input
              id="woop-saa"
              value={saa}
              onChange={(e) => setSaa(e.target.value)}
              placeholder="så skal jeg ta på skoene og gå en runde på 10 minutter først"
              className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueberry-500"
            />
          </div>
        </div>
      </section>

      {/* Samlet plan */}
      {(onske.trim() || planFerdig) && (
        <div className="rounded-lg border-2 border-success-700 bg-success-100 p-5">
          <p className="text-sm font-semibold text-success-700 mb-2">Din plan</p>
          {onske.trim() && (
            <p className="text-sm text-neutral-800 mb-1">
              <span className="font-medium">Om 10 år:</span> {onske}
            </p>
          )}
          {hindring.trim() && (
            <p className="text-sm text-neutral-800 mb-1">
              <span className="font-medium">Hindring:</span> {hindring}
            </p>
          )}
          {planFerdig && (
            <p className="text-sm text-neutral-900 mt-2 rounded-md bg-white p-3 border border-success-700/30">
              <span className="font-semibold">Hvis</span> {naar.trim()},{" "}
              <span className="font-semibold">så skal jeg</span> {saa.trim()}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
