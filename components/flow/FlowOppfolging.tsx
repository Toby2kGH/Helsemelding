"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { flowNav, type StegDef } from "@/lib/helsemelding11";
import { utledHandlinger, utledHandlingerFraSvar, KANAL_INFO } from "@/lib/oppfolgingEngine";
import { FlowHeader, FlowNav } from "@/components/flow/FlowChrome";

export function FlowOppfolging({ steg, basePath }: { steg: StegDef[]; basePath: string }) {
  const router = useRouter();
  const { profil, helsemeldingState } = useUser();
  const { valgteHandlinger, toggleHandling, settValgteHandlinger, fullfort, fullforSteg } =
    useHelsemelding11();
  const nav = flowNav(steg, "oppfolging", basePath, fullfort);

  const handlinger = useMemo(
    () => [
      ...utledHandlingerFraSvar(helsemeldingState.medicationResponses),
      ...utledHandlinger(profil),
    ],
    [profil, helsemeldingState.medicationResponses]
  );

  useEffect(() => {
    if (!fullfort.oppfolging && valgteHandlinger.length === 0) {
      settValgteHandlinger(handlinger.map((h) => h.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlinger]);

  function neste() {
    fullforSteg("oppfolging");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <DemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={nav.steps} />
        <FlowHeader nr={nav.nr} total={nav.total} title="Oppfølging du ønsker">
          Vi har foreslått oppfølging ut fra det Helsemeldingen vet om deg. Huk av det du vil følge
          opp — hvert punkt går til riktig sted når du sender inn.
        </FlowHeader>

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

        <FlowNav prevHref={nav.prevHref} onNext={neste} nextLabel={nav.nextLabel ?? "Neste"} />
      </div>
    </div>
  );
}
