"use client";

import { useEffect, useState } from "react";
import { BeakerIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

export type Arm = "A" | "B";

export interface ArmInfo {
  navn: string;
  beskr: string;
}

/**
 * Delt ramme for innebygde A/B-forsøk: tilfeldig gruppetildeling (klientside for
 * å unngå hydration-mismatch), forskningsbanner med likeverd og reservasjonsrett,
 * og en demo-bryter for å utforske begge armer. `children` får den aktive armen.
 * Reservasjon tvinger gruppe A (standardvarianten).
 */
export function AbEksperiment({
  studieTekst,
  armA,
  armB,
  onArmChange,
  children,
}: {
  studieTekst: string;
  armA: ArmInfo;
  armB: ArmInfo;
  onArmChange?: (arm: Arm) => void;
  children: (arm: Arm, reservert: boolean) => React.ReactNode;
}) {
  const [arm, setArm] = useState<Arm | null>(null);
  const [reservert, setReservert] = useState(false);

  useEffect(() => {
    setArm(Math.random() < 0.5 ? "A" : "B");
  }, []);

  const visArm: Arm = reservert ? "A" : arm ?? "A";

  useEffect(() => {
    if (arm !== null) onArmChange?.(visArm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arm, reservert]);
  const info = visArm === "A" ? armA : armB;

  return (
    <div>
      <div className="mb-6 rounded-lg border border-blueberry-200 bg-blueberry-50 p-4">
        <div className="flex items-start gap-2">
          <BeakerIcon className="h-5 w-5 flex-shrink-0 text-blueberry-700 mt-0.5" aria-hidden="true" />
          <div className="text-sm text-neutral-700">
            <p className="font-semibold text-blueberry-900 mb-1">Om studien</p>
            <p>{studieTekst}</p>
            {!reservert ? (
              <button
                type="button"
                onClick={() => setReservert(true)}
                className="mt-2 text-xs font-medium text-blueberry-700 underline hover:text-blueberry-900 focus:outline-none focus:underline"
              >
                Jeg vil reservere meg fra studien (får standardvarianten)
              </button>
            ) : (
              <p className="mt-2 text-xs text-neutral-600">
                Du er reservert og får standardvarianten (gruppe A).{" "}
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
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Din gruppe</p>
              <p className="font-semibold text-neutral-900">{info.navn}</p>
              <p className="text-xs text-neutral-500">{info.beskr}</p>
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

          {children(visArm, reservert)}
        </>
      )}
    </div>
  );
}
