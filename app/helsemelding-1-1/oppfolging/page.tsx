"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { byggSteps } from "@/lib/helsemelding11";
import { utledHandlinger, utledHandlingerFraSvar, KANAL_INFO } from "@/lib/oppfolgingEngine";

export default function StegOppfolging() {
  const router = useRouter();
  const { profil, helsemeldingState } = useUser();
  const {
    valgteHandlinger,
    toggleHandling,
    settValgteHandlinger,
    fullfort,
    fullforSteg,
  } = useHelsemelding11();
  const steps = byggSteps("oppfolging", fullfort);

  const handlinger = useMemo(
    () => [
      ...utledHandlingerFraSvar(helsemeldingState.medicationResponses),
      ...utledHandlinger(profil),
    ],
    [profil, helsemeldingState.medicationResponses]
  );

  // Forhåndsvelg alle forslag ved første besøk (før steget er fullført).
  useEffect(() => {
    if (!fullfort.oppfolging && valgteHandlinger.length === 0) {
      settValgteHandlinger(handlinger.map((h) => h.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlinger]);

  function neste() {
    fullforSteg("oppfolging");
    router.push("/helsemelding-1-1/oppsummering");
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 5 av 6</p>
          <h1 className="text-3xl font-bold text-neutral-900">Oppfølging du ønsker</h1>
          <p className="text-neutral-600 mt-2">
            Vi har foreslått oppfølging ut fra det Helsemeldingen vet om deg. Huk av det du vil
            følge opp — hvert punkt går til riktig sted når du sender inn.
          </p>
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

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding-1-1/forebygging"
            className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Link>
          <button
            onClick={neste}
            className="flex items-center gap-2 rounded-md bg-blueberry-900 px-6 py-3 text-base font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:ring-offset-2 transition"
          >
            Neste: Oppsummering
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
