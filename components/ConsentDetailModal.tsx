"use client";

import { useState } from "react";
import { consentDetails } from "@/data/consentDetails";
import { Modal } from "@/components/ui/Modal";
import { Toggle } from "@/components/ui/Toggle";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface ConsentDetailModalProps {
  open: boolean;
  onClose: () => void;
  consentId: string;
  currentValue?: boolean | null;
  onToggle?: (value: boolean) => void;
}

const categoryColors = {
  min_behandling: { bg: "bg-blueberry-50", border: "border-blueberry-200", text: "text-blueberry-700" },
  samarbeid_om_meg: { bg: "bg-grass-50", border: "border-grass-200", text: "text-grass-700" },
  bidra_til_fremtiden: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" }
};

export function ConsentDetailModal({
  open,
  onClose,
  consentId,
  currentValue,
  onToggle
}: ConsentDetailModalProps) {
  const [legalExpanded, setLegalExpanded] = useState(false);
  const detail = consentDetails[consentId];

  if (!detail) {
    return null;
  }

  const colors = categoryColors[detail.kategori];

  return (
    <Modal open={open} onClose={onClose} title="">
      <div className="max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className={`${colors.bg} border ${colors.border} rounded-lg p-4 mb-6`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {detail.icon && <span className="text-2xl">{detail.icon}</span>}
                <h3 className={`text-lg font-semibold ${colors.text}`}>
                  {detail.navn}
                </h3>
              </div>
              <p className="text-sm text-neutral-600">
                {detail.beskrivelse}
              </p>
            </div>
            {onToggle !== undefined && (
              <div className="ml-4 flex-shrink-0">
                <Toggle
                  checked={currentValue === true}
                  onChange={onToggle}
                  label={`${currentValue === true ? "Nei" : "Ja"} til ${detail.navn}`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Who gets access */}
        <div className="mb-6">
          <h4 className="font-semibold text-neutral-900 mb-3">Hvem får tilgang?</h4>
          <ul className="space-y-2">
            {detail.hvoem.map((actor, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-blueberry-600 font-bold text-lg leading-none mt-0.5">•</span>
                <span className="text-sm text-neutral-700">{actor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Practical use */}
        <div className="mb-6">
          <h4 className="font-semibold text-neutral-900 mb-3">Praktisk bruk</h4>
          <ul className="space-y-2">
            {detail.praktiskBruk.map((example, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-grass-600 font-bold text-lg leading-none mt-0.5">•</span>
                <span className="text-sm text-neutral-700">{example}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal information - collapsible */}
        <div className="border border-neutral-200 rounded-lg">
          <button
            onClick={() => setLegalExpanded(!legalExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-50 transition-colors"
          >
            <h4 className="font-semibold text-neutral-900">Juridisk informasjon</h4>
            <ChevronDownIcon
              className={`h-5 w-5 text-neutral-600 transition-transform ${legalExpanded ? "rotate-180" : ""}`}
            />
          </button>
          {legalExpanded && (
            <div className="px-4 py-4 bg-neutral-50 border-t border-neutral-200 space-y-4 text-sm">
              <div>
                <p className="font-semibold text-neutral-900 mb-1">Hjemmelsgrunnlag</p>
                <p className="text-neutral-700">{detail.juridisk.hjemmelsgrunnlag}</p>
              </div>
              <div>
                <p className="font-semibold text-neutral-900 mb-1">Formål</p>
                <p className="text-neutral-700">{detail.juridisk.formål}</p>
              </div>
              <div>
                <p className="font-semibold text-neutral-900 mb-1">Oppbevaring</p>
                <p className="text-neutral-700">{detail.juridisk.oppbevaring}</p>
              </div>
              <div>
                <p className="font-semibold text-neutral-900 mb-1">Dine rettigheter</p>
                <p className="text-neutral-700">{detail.juridisk.rettigheter}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
