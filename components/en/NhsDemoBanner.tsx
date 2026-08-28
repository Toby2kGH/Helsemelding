"use client";

import { useHealthMessage } from "@/context/HealthMessageEnContext";
import { nhsProfiles, type NhsProfileKey } from "@/data/nhsProfile";

const options: { id: NhsProfileKey; label: string }[] = [
  { id: "margaret", label: `${nhsProfiles.margaret.firstName} (${nhsProfiles.margaret.age})` },
  { id: "aisha", label: `${nhsProfiles.aisha.firstName} (${nhsProfiles.aisha.age})` },
  { id: "liam", label: `${nhsProfiles.liam.firstName} (${nhsProfiles.liam.age})` },
];

export function NhsDemoBanner() {
  const { activeProfile, setProfile } = useHealthMessage();

  return (
    <div role="note" aria-label="Demo mode" className="border-l-4 border-warning-700 bg-warning-100 px-4 py-2">
      <div className="mx-auto max-w-6xl flex flex-wrap items-center gap-3 text-sm">
        <span className="font-medium text-warning-700">
          🔬 DEMO — not a real NHS service, no real data. Pick a patient:
        </span>
        <div className="flex flex-wrap gap-2">
          {options.map((p) => (
            <button
              key={p.id}
              onClick={() => setProfile(p.id)}
              aria-pressed={activeProfile === p.id}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-warning-700 ${
                activeProfile === p.id
                  ? "bg-warning-700 text-white"
                  : "border border-warning-700 text-warning-700 hover:bg-warning-700 hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
