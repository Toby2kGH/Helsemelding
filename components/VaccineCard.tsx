"use client";

import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import type { VaksinAnbefaling } from "@/types";

const prioritetConfig = {
  høy: {
    bg: "bg-cherry-100 border-cherry-700",
    border: "border-l-4",
    ikon: <ExclamationCircleIcon className="h-5 w-5 text-cherry-700" aria-hidden="true" />,
    tekst: "text-cherry-700",
    badge: "bg-cherry-700 text-white",
    label: "Høy prioritet",
  },
  middels: {
    bg: "bg-warning-100 border-warning-700",
    border: "border-l-4",
    ikon: <InformationCircleIcon className="h-5 w-5 text-warning-700" aria-hidden="true" />,
    tekst: "text-warning-700",
    badge: "bg-warning-700 text-white",
    label: "Middels prioritet",
  },
  lav: {
    bg: "bg-blueberry-50 border-blueberry-500",
    border: "border-l-4",
    ikon: <InformationCircleIcon className="h-5 w-5 text-blueberry-500" aria-hidden="true" />,
    tekst: "text-blueberry-700",
    badge: "bg-blueberry-500 text-white",
    label: "Lav prioritet",
  },
};

interface VaccineCardProps {
  anbefaling: VaksinAnbefaling;
  akseptert: boolean | null;
  onAksepter: () => void;
  onAvslå: () => void;
}

export function VaccineCard({ anbefaling, akseptert, onAksepter, onAvslå }: VaccineCardProps) {
  const cfg = prioritetConfig[anbefaling.prioritet];

  return (
    <div className={`rounded-lg ${cfg.bg} ${cfg.border} p-4 shadow-sm`}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3">
          {cfg.ikon}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-neutral-900">
                Anbefalt: {anbefaling.vaksine}
              </h3>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cfg.badge}`} aria-label={cfg.label}>
                {cfg.label}
              </span>
            </div>
            <p className="text-sm text-neutral-700 mb-1">{anbefaling.årsak}</p>
            <p className="text-xs text-neutral-500">
              Siste dose: {anbefaling.siste}
            </p>
          </div>
        </div>

        {akseptert === true && (
          <span className="flex items-center gap-1 text-success-700 text-sm font-medium">
            <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
            Notert
          </span>
        )}
        {akseptert === false && (
          <span className="text-neutral-400 text-sm">Avslått</span>
        )}
      </div>

      <div className="mt-3 rounded-md bg-white/60 p-3 text-sm text-neutral-700">
        <p className="font-medium mb-1">👉 Handling</p>
        <p>{anbefaling.handling}</p>
      </div>

      {akseptert === null && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onAksepter}
            className="rounded-md bg-blueberry-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
          >
            Jeg noterer dette
          </button>
          <button
            type="button"
            onClick={onAvslå}
            className="rounded-md border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            Ikke nå
          </button>
        </div>
      )}
    </div>
  );
}
