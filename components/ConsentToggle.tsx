"use client";

import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Toggle } from "@/components/ui/Toggle";

interface ConsentToggleProps {
  label: string;
  description: string;
  value: boolean | null;
  onChange: (val: boolean) => void;
  consentId?: string;
  onMoreInfo?: (consentId: string) => void;
}

export function ConsentToggle({ label, description, value, onChange, consentId, onMoreInfo }: ConsentToggleProps) {
  const [saved, setSaved] = useState(false);
  const [showOptOutWarning, setShowOptOutWarning] = useState(false);

  function handleChange(val: boolean) {
    if (value === true && val === false) {
      setShowOptOutWarning(true);
    } else {
      onChange(val);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  function confirmOptOut() {
    onChange(false);
    setShowOptOutWarning(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <div className="flex items-start gap-4 py-4 border-b border-neutral-100 last:border-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium text-neutral-900 text-sm">{label}</p>
            {consentId && onMoreInfo && (
              <button
                type="button"
                onClick={() => onMoreInfo(consentId)}
                className="text-xs text-blueberry-700 underline hover:text-blueberry-900 focus:outline-none focus:ring-1 focus:ring-blueberry-500 rounded px-1"
                aria-label={`Les mer om ${label}`}
              >
                ? Les mer
              </button>
            )}
            {saved && (
              <span className="flex items-center gap-1 text-success-700 text-xs font-medium animate-pulse">
                <CheckIcon className="h-3 w-3" aria-hidden="true" />
                Lagret ✓
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
        </div>
        <div className="flex-shrink-0 pt-0.5">
          <Toggle
            checked={value ?? false}
            onChange={handleChange}
            label={label}
          />
        </div>
      </div>

      {showOptOutWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">⚠️ Trekk tilbake samtykke?</h2>
            <p className="text-sm text-neutral-700 mb-6">
              Du er i ferd med å trekke tilbake ditt samtykke til <strong>{label}</strong>.
            </p>
            <p className="text-xs text-neutral-600 mb-6">
              Du kan endre mening og gi samtykke på nytt når som helst.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowOptOutWarning(false)}
                className="flex-1 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300"
              >
                Avbryt
              </button>
              <button
                type="button"
                onClick={confirmOptOut}
                className="flex-1 rounded-md bg-warning-700 px-4 py-2 text-sm font-medium text-white hover:bg-warning-800 focus:outline-none focus:ring-2 focus:ring-warning-500"
              >
                Ja, trekk tilbake
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
