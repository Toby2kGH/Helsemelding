"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { flowNav, type StegDef } from "@/lib/helsemelding11";
import { utledHandlinger, utledHandlingerFraSvar, KANAL_INFO } from "@/lib/oppfolgingEngine";
import { FlowHeader, FlowNav } from "@/components/flow/FlowChrome";
import { AbEksperiment, type Arm } from "@/components/flow/AbEksperiment";

type Kvalitet = "ja" | "delvis" | "nei";

export function FlowOppfolgingAB({ steg, basePath }: { steg: StegDef[]; basePath: string }) {
  const router = useRouter();
  const { profil, helsemeldingState } = useUser();
  const { valgteHandlinger, toggleHandling, settValgteHandlinger, fullfort, fullforSteg } =
    useHelsemelding11();
  const nav = flowNav(steg, "oppfolging", basePath, fullfort);
  const [kvalitet, setKvalitet] = useState<Kvalitet | null>(null);

  const handlinger = useMemo(
    () => [
      ...utledHandlingerFraSvar(helsemeldingState.medicationResponses),
      ...utledHandlinger(profil),
    ],
    [profil, helsemeldingState.medicationResponses]
  );

  // Arm A = opt-in (tomt), Arm B = opt-out (forhåndsvalgt). Settes ved gruppebytte.
  const settDefaultForArm = useCallback(
    (arm: Arm) => {
      settValgteHandlinger(arm === "B" ? handlinger.map((h) => h.id) : []);
      setKvalitet(null);
    },
    [handlinger, settValgteHandlinger]
  );

  function neste() {
    fullforSteg("oppfolging");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  const antallValgt = valgteHandlinger.length;

  return (
    <div>
      <DemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={nav.steps} />
        <FlowHeader nr={nav.nr} total={nav.total} title="Oppfølging (studie)">
          Vi tester to måter å presentere foreslått oppfølging på. Du er tilfeldig plassert i én
          gruppe. Huk av det du vil følge opp — hvert punkt går til riktig sted når du sender inn.
        </FlowHeader>

        <AbEksperiment
          studieTekst="Vi tester om utgangspunktet påvirker hva folk velger: om punktene er tomme fra start (du velger til), eller forhåndsvalgt (du velger bort). Vi vet ikke hvilket som tjener deg best — derfor måler vi både hvor mye som velges og om valgene kjennes riktige."
          armA={{ navn: "Gruppe A · Du velger til", beskr: "Ingenting er valgt fra start — du huker av det du ønsker." }}
          armB={{ navn: "Gruppe B · Forhåndsvalgt", beskr: "Alt er valgt fra start — du huker av det du ikke ønsker." }}
          onArmChange={settDefaultForArm}
        >
          {(visArm) => (
            <>
              <div className="mb-4 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
                {visArm === "B" ? (
                  <span className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-success-700" aria-hidden="true" />
                    Forhåndsvalgt for deg — fjern hakene på det du ikke ønsker.
                  </span>
                ) : (
                  "Ingenting er valgt ennå — huk av det du ønsker å følge opp."
                )}
              </div>

              <div className="space-y-2 mb-6">
                {handlinger.map((h) => (
                  <label
                    key={h.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-4 shadow-sm transition ${
                      valgteHandlinger.includes(h.id) ? "border-blueberry-500" : "border-neutral-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={valgteHandlinger.includes(h.id)}
                      onChange={() => toggleHandling(h.id)}
                      className="mt-1 h-4 w-4 accent-blueberry-700"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-neutral-900">{h.tittel}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${KANAL_INFO[h.kanal].klasse}`}>
                          {KANAL_INFO[h.kanal].navn}
                        </span>
                        {h.krevesSamtykke && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] text-neutral-500">
                            <LockClosedIcon className="h-3 w-3" aria-hidden="true" />
                            krever samtykke
                          </span>
                        )}
                      </span>
                      <span className="block text-sm text-neutral-500 mt-0.5">{h.begrunnelse}</span>
                    </span>
                  </label>
                ))}
              </div>

              {/* Målinger: konvertering + kvalitets-vaktbikkje */}
              <section className="mb-6 rounded-lg border border-blueberry-100 bg-blueberry-50 p-4">
                <p className="text-sm font-semibold text-blueberry-900 mb-2">Hva studien måler</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Hvor mange du har valgt</p>
                    <p className="text-2xl font-bold text-blueberry-900">
                      {antallValgt}
                      <span className="text-base font-normal text-neutral-500"> / {handlinger.length} valgt</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1">
                      Kvalitetssjekk: kjennes valgene riktige for deg?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {([
                        { id: "ja", label: "Ja" },
                        { id: "delvis", label: "Delvis" },
                        { id: "nei", label: "Nei" },
                      ] as { id: Kvalitet; label: string }[]).map((k) => (
                        <button
                          key={k.id}
                          type="button"
                          onClick={() => setKvalitet(k.id)}
                          aria-pressed={kvalitet === k.id}
                          className={`rounded-full px-3 py-1 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                            kvalitet === k.id
                              ? "bg-blueberry-700 text-white"
                              : "bg-white text-neutral-700 border border-neutral-200 hover:border-blueberry-500"
                          }`}
                        >
                          {k.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-3 border-t border-blueberry-100 pt-2 text-xs text-neutral-600">
                  Forhåndsvalgt (gruppe B) gir vanligvis flere valg. Men måler vi <em>bare</em> antallet,
                  kan vi ende opp med å presse fram oppfølging folk ikke egentlig står inne i. Derfor har
                  kvalitetssjekken forrang: flere valg som samtidig kjennes mindre riktige, er ikke en
                  forbedring.
                </p>
              </section>
            </>
          )}
        </AbEksperiment>

        <FlowNav prevHref={nav.prevHref} onNext={neste} nextLabel={nav.nextLabel ?? "Neste"} />
      </div>
    </div>
  );
}
