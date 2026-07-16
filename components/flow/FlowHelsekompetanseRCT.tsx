"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BeakerIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { flowNav, type StegDef } from "@/lib/helsemelding11";
import { FlowHeader, FlowNav } from "@/components/flow/FlowChrome";
import { HelsekompetanseRaad } from "@/components/HelsekompetanseRaad";
import { HelsekompetanseWoop } from "@/components/HelsekompetanseWoop";

type Arm = "A" | "B";

const ARM_INFO: Record<Arm, { navn: string; beskr: string }> = {
  A: { navn: "Gruppe A · Råd", beskr: "Kunnskapsbaserte råd rammet inn rundt deg om 5–10 år." },
  B: { navn: "Gruppe B · Fremtidsbilde", beskr: "En aktiv WOOP-øvelse der du selv ser deg om 10 år og lager en plan." },
};

function Linjal({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-neutral-900 block mb-1">
        {label}{" "}
        {value !== null && <span className="text-blueberry-700 font-bold">{value}/10</span>}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={10}
        value={value ?? 5}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blueberry-700"
      />
      <div className="flex justify-between text-[10px] text-neutral-400">
        <span>Ikke klar</span><span>Svært klar</span>
      </div>
    </div>
  );
}

export function FlowHelsekompetanseRCT({ steg, basePath }: { steg: StegDef[]; basePath: string }) {
  const router = useRouter();
  const { fullfort, fullforSteg } = useHelsemelding11();
  const nav = flowNav(steg, "helsekompetanse", basePath, fullfort);

  // Tilfeldig arm settes klientside for å unngå hydration-mismatch.
  const [arm, setArm] = useState<Arm | null>(null);
  const [reservert, setReservert] = useState(false);
  const [beredskapFor, setBeredskapFor] = useState<number | null>(null);
  const [beredskapEtter, setBeredskapEtter] = useState<number | null>(null);

  useEffect(() => {
    setArm(Math.random() < 0.5 ? "A" : "B");
  }, []);

  function neste() {
    fullforSteg("helsekompetanse");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  const visArm: Arm = reservert ? "A" : arm ?? "A";
  const delta =
    beredskapFor !== null && beredskapEtter !== null ? beredskapEtter - beredskapFor : null;

  return (
    <div>
      <DemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={nav.steps} />
        <FlowHeader nr={nav.nr} total={nav.total} title="Helsekompetanse (studie)">
          Dette steget er en del av en studie: vi tester to måter å støtte forebygging på, for å lære
          hvilken som faktisk virker best. Du er tilfeldig plassert i én gruppe.
        </FlowHeader>

        {/* Forskningsbanner — likeverd, minimal risiko, samtykke/reservasjon */}
        <div className="mb-6 rounded-lg border border-blueberry-200 bg-blueberry-50 p-4">
          <div className="flex items-start gap-2">
            <BeakerIcon className="h-5 w-5 flex-shrink-0 text-blueberry-700 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-neutral-700">
              <p className="font-semibold text-blueberry-900 mb-1">Om studien</p>
              <p>
                Vi vet ærlig talt ikke hvilken av de to måtene som hjelper mest — det er derfor vi
                tester dem opp mot hverandre (likeverd). Begge er trygge og bygger på forskning.
                Ingen sensitive data forlater tjenesten i denne demoen.
              </p>
              {!reservert ? (
                <button
                  type="button"
                  onClick={() => setReservert(true)}
                  className="mt-2 text-xs font-medium text-blueberry-700 underline hover:text-blueberry-900 focus:outline-none focus:underline"
                >
                  Jeg vil reservere meg fra studien (får standard råd)
                </button>
              ) : (
                <p className="mt-2 text-xs text-neutral-600">
                  Du er reservert fra studien og får standard råd (gruppe A).{" "}
                  <button type="button" onClick={() => setReservert(false)} className="text-blueberry-700 underline">
                    Angre
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>

        {arm === null ? (
          <p className="text-sm text-neutral-500">Tildeler gruppe …</p>
        ) : (
          <>
            {/* Armindikator + demo-bryter */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Din gruppe</p>
                <p className="font-semibold text-neutral-900">{ARM_INFO[visArm].navn}</p>
                <p className="text-xs text-neutral-500">{ARM_INFO[visArm].beskr}</p>
              </div>
              {!reservert && (
                <button
                  type="button"
                  onClick={() => setArm(visArm === "A" ? "B" : "A")}
                  className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
                >
                  <ArrowsRightLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Vis den andre gruppen (kun demo)
                </button>
              )}
            </div>

            {/* Måling før */}
            <section className="mb-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <Linjal
                id="beredskap-for"
                label="Før du starter: hvor klar føler du deg til å gjøre en endring i levevanene dine?"
                value={beredskapFor}
                onChange={setBeredskapFor}
              />
            </section>

            {/* Arm-innhold */}
            {visArm === "A" ? <HelsekompetanseRaad omHref={`${basePath}/om`} /> : <HelsekompetanseWoop />}

            {/* Måling etter */}
            <section className="mt-6 mb-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <Linjal
                id="beredskap-etter"
                label="Etter å ha gått gjennom dette: hvor klar føler du deg nå?"
                value={beredskapEtter}
                onChange={setBeredskapEtter}
              />
              {delta !== null && (
                <p className="mt-3 text-sm text-neutral-700">
                  Endring i beredskap:{" "}
                  <span className={`font-bold ${delta > 0 ? "text-success-700" : delta < 0 ? "text-cherry-700" : "text-neutral-700"}`}>
                    {delta > 0 ? `+${delta}` : delta}
                  </span>
                  . I en ekte studie er det nettopp denne endringen vi ville sammenlignet på tvers av
                  tusener i gruppe A og B — slik lærer systemet hva som virker, for hvem.
                </p>
              )}
            </section>

            <FlowNav prevHref={nav.prevHref} onNext={neste} nextLabel={nav.nextLabel ?? "Neste"} />
          </>
        )}
      </div>
    </div>
  );
}
