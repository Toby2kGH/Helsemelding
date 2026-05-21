"use client";

import { useUser } from "@/context/UserContext";
import type { ProfilKey } from "@/data/profiles";

const profiler: { id: ProfilKey; label: string }[] = [
  { id: "kari", label: "Kari (72 år)" },
  { id: "sara", label: "Sara (28 år)" },
  { id: "jonas", label: "Jonas (24 år)" },
];

export function DemoBanner() {
  const { aktivProfil, byttProfil } = useUser();

  return (
    <div
      role="note"
      aria-label="Demo-modus"
      className="border-l-4 border-warning-700 bg-warning-100 px-4 py-2"
    >
      <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-3 text-sm">
        <span className="font-medium text-warning-700">
          🔬 DEMO – Ikke ekte pasientdata. Velg profil:
        </span>
        <div className="flex flex-wrap gap-2">
          {profiler.map((p) => (
            <button
              key={p.id}
              onClick={() => byttProfil(p.id)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-warning-700 ${
                aktivProfil === p.id
                  ? "bg-warning-700 text-white"
                  : "border border-warning-700 text-warning-700 hover:bg-warning-700 hover:text-white"
              }`}
              aria-pressed={aktivProfil === p.id}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
