"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { flowNav, type StegDef } from "@/lib/helsemelding11";
import { FlowHeader, FlowNav } from "@/components/flow/FlowChrome";
import { AbEksperiment } from "@/components/flow/AbEksperiment";
import { HelsekompetanseRaad } from "@/components/HelsekompetanseRaad";
import { HelsekompetanseWoop } from "@/components/HelsekompetanseWoop";

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
        {label} {value !== null && <span className="text-blueberry-700 font-bold">{value}/10</span>}
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

  const [beredskapFor, setBeredskapFor] = useState<number | null>(null);
  const [beredskapEtter, setBeredskapEtter] = useState<number | null>(null);
  const delta =
    beredskapFor !== null && beredskapEtter !== null ? beredskapEtter - beredskapFor : null;

  function neste() {
    fullforSteg("helsekompetanse");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <DemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={nav.steps} />
        <FlowHeader nr={nav.nr} total={nav.total} title="Helsekompetanse (studie)">
          Dette steget er en del av en liten studie: vi prøver ut to måter å støtte forebygging på,
          for å lære hvilken som hjelper best. Du er tilfeldig valgt til den ene.
        </FlowHeader>

        <AbEksperiment
          studieTekst="Vi vet ikke sikkert hvilken av de to måtene som hjelper mest — derfor prøver vi dem ut mot hverandre. Begge er trygge og bygger på forskning. Ingen sensitive opplysninger forlater tjenesten i denne demoen."
          armA={{ navn: "Gruppe A · Råd", beskr: "Kunnskapsbaserte råd rammet inn rundt deg om 5–10 år." }}
          armB={{ navn: "Gruppe B · Fremtidsbilde", beskr: "En øvelse der du selv ser deg om 10 år og lager en plan." }}
        >
          {(visArm) => (
            <>
              <section className="mb-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <Linjal
                  id="beredskap-for"
                  label="Før du starter: hvor klar føler du deg til å gjøre en endring i levevanene dine?"
                  value={beredskapFor}
                  onChange={setBeredskapFor}
                />
              </section>

              {visArm === "A" ? <HelsekompetanseRaad omHref={`${basePath}/om`} /> : <HelsekompetanseWoop />}

              <section className="mt-6 mb-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
                <Linjal
                  id="beredskap-etter"
                  label="Etter å ha gått gjennom dette: hvor klar føler du deg nå?"
                  value={beredskapEtter}
                  onChange={setBeredskapEtter}
                />
                {delta !== null && (
                  <p className="mt-3 text-sm text-neutral-700">
                    Endringen i hvor klar du føler deg:{" "}
                    <span className={`font-bold ${delta > 0 ? "text-success-700" : delta < 0 ? "text-cherry-700" : "text-neutral-700"}`}>
                      {delta > 0 ? `+${delta}` : delta}
                    </span>
                    . I en ekte studie er det denne endringen vi ville sammenlignet mellom de to
                    gruppene — slik lærer vi hva som hjelper, og for hvem.
                  </p>
                )}
              </section>
            </>
          )}
        </AbEksperiment>

        <FlowNav prevHref={nav.prevHref} onNext={neste} nextLabel={nav.nextLabel ?? "Neste"} />
      </div>
    </div>
  );
}
