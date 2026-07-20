"use client";

import { useState } from "react";
import { CheckIcon, ShieldCheckIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Toggle } from "@/components/ui/Toggle";
import { consentDetails } from "@/data/consentDetails";

interface ConsentToggleProps {
  label: string;
  description: string;
  value: boolean | null;
  onChange: (val: boolean) => void;
  consentId?: string;
  onMoreInfo?: (consentId: string) => void;
  warningRequired?: boolean;
  warningText?: string;
}

export function ConsentToggle({ label, description, value, onChange, consentId, onMoreInfo, warningRequired, warningText }: ConsentToggleProps) {
  const [saved, setSaved] = useState(false);
  const [showOptOutWarning, setShowOptOutWarning] = useState(false);
  const [showOptInConfirm, setShowOptInConfirm] = useState(false);

  const detail = consentId ? consentDetails[consentId] : undefined;

  function markLagret() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleChange(val: boolean) {
    if (val === true && value !== true) {
      // Samtykke er en aktiv, informert handling — ikke bare et dratt håndtak.
      setShowOptInConfirm(true);
    } else if (value === true && val === false) {
      setShowOptOutWarning(true);
    } else {
      onChange(val);
      markLagret();
    }
  }

  function confirmOptIn() {
    onChange(true);
    setShowOptInConfirm(false);
    markLagret();
  }

  function confirmOptOut() {
    onChange(false);
    setShowOptOutWarning(false);
    markLagret();
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
          <Toggle checked={value ?? false} onChange={handleChange} label={label} />
        </div>
      </div>

      {/* Opt-IN: bekreft samtykke med vilkår, hvorfor og rettigheter */}
      {showOptInConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="optin-title">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[85vh] overflow-y-auto">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheckIcon className="h-6 w-6 text-blueberry-700 flex-shrink-0" aria-hidden="true" />
              <h2 id="optin-title" className="text-lg font-semibold text-neutral-900">Bekreft samtykke</h2>
            </div>

            <p className="text-sm text-neutral-700 mb-4">
              Du er i ferd med å samtykke til <strong>{label}</strong>. Les gjennom hva det innebærer før du bekrefter.
            </p>

            <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4 space-y-3 mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blueberry-700 mb-1">Hva du samtykker til</p>
                <p className="text-sm text-neutral-700">{detail?.beskrivelse ?? description}</p>
              </div>
              {detail?.juridisk.formål && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blueberry-700 mb-1">Hvorfor det spørres om dette</p>
                  <p className="text-sm text-neutral-700">{detail.juridisk.formål}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blueberry-700 mb-1">Dine rettigheter</p>
                <p className="text-sm text-neutral-700">
                  {detail?.juridisk.rettigheter ??
                    "Samtykket er frivillig. Du kan når som helst endre eller trekke det tilbake, uten at det påvirker behandlingen du allerede har fått."}
                </p>
              </div>
            </div>

            <div className="rounded-md bg-blueberry-50 border border-blueberry-100 p-3 mb-4">
              <p className="flex items-start gap-2 text-xs text-neutral-700">
                <InformationCircleIcon className="h-4 w-4 flex-shrink-0 text-blueberry-700 mt-0.5" aria-hidden="true" />
                <span>
                  Samtykke er frivillig og skal være en informert handling — derfor spør vi før vi
                  slår det på. Du kan trekke det tilbake når som helst.
                </span>
              </p>
            </div>

            {consentId && onMoreInfo && (
              <button
                type="button"
                onClick={() => { setShowOptInConfirm(false); onMoreInfo(consentId); }}
                className="mb-4 text-sm text-blueberry-700 underline hover:text-blueberry-900 focus:outline-none focus:ring-1 focus:ring-blueberry-500 rounded"
              >
                Les mer — hvem får tilgang, praktisk bruk og juridisk grunnlag
              </button>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowOptInConfirm(false)}
                className="flex-1 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300"
              >
                Avbryt
              </button>
              <button
                type="button"
                onClick={confirmOptIn}
                className="flex-1 rounded-md bg-blueberry-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
              >
                Ja, jeg samtykker
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Opt-OUT: bekreft tilbaketrekking */}
      {showOptOutWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h2 className="text-lg font-semibold text-neutral-900 mb-3">
              {warningRequired ? "⚠️ Viktig informasjon" : "⚠️ Trekk tilbake samtykke?"}
            </h2>
            <p className="text-sm text-neutral-700 mb-3">
              Du er i ferd med å trekke tilbake ditt samtykke til <strong>{label}</strong>.
            </p>
            {warningText && (
              <div className="bg-warning-50 border border-warning-200 rounded-md p-3 mb-6">
                <p className="text-sm text-neutral-700">{warningText}</p>
              </div>
            )}
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
