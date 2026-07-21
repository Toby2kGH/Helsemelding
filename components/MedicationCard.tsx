"use client";

import { useState } from "react";
import { ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import type { Legemiddel, MedicationResponse } from "@/types";

interface MedicationCardProps {
  legemiddel: Legemiddel;
  fastlege: string;
  response: MedicationResponse;
  onUpdate: (r: MedicationResponse) => void;
}

export function MedicationCard({
  legemiddel,
  fastlege,
  response,
  onUpdate,
}: MedicationCardProps) {
  const [fastlegeModalOpen, setFastlegeModalOpen] = useState(false);

  const erStoppFlagg =
    legemiddel.handelsnavn === "Imovane" || legemiddel.virkestoff === "zopiklon";

  function update(partial: Partial<MedicationResponse>) {
    onUpdate({ ...response, medId: legemiddel.id, ...partial });
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-blueberry-50 px-4 py-3 flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg" aria-hidden="true">💊</span>
          <h3 className="font-semibold text-neutral-900 text-base">
            {legemiddel.handelsnavn}{" "}
            <span className="font-normal text-neutral-700">({legemiddel.virkestoff} {legemiddel.styrke})</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={legemiddel.kategori === "fast" ? "primary" : "neutral"}>
            {legemiddel.kategori === "fast" ? "FAST" : legemiddel.kategori === "kur" ? "KUR" : "VED BEHOV"}
          </Badge>
          {legemiddel.viktig && (
            <Badge variant="error">
              <ExclamationTriangleIcon className="h-3 w-3 mr-1" aria-hidden="true" />
              VIKTIG
            </Badge>
          )}
          <span className="text-xs text-neutral-400 font-mono">{legemiddel.atc}</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="text-sm text-neutral-700 space-y-1">
          <p><span className="font-medium">Indikasjon:</span> {legemiddel.indikasjon}</p>
          <p><span className="font-medium">Dose:</span> {legemiddel.dose}</p>
        </div>

        {erStoppFlagg && (
          <div className="rounded-md bg-cherry-100 border-l-4 border-cherry-700 p-3 text-sm" role="alert">
            <div className="flex items-start gap-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-cherry-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-cherry-700">STOPP/START-flagg for eldre</p>
                <p className="text-neutral-700 mt-1">
                  Beroligende sovemidler kan øke fallrisiko hos personer over 65 år.
                  Ta dette opp med fastlegen din.
                </p>
              </div>
            </div>
          </div>
        )}

        {legemiddel.flagg && !erStoppFlagg && (
          <div className="rounded-md bg-warning-100 border-l-4 border-warning-700 p-3 text-sm" role="note">
            <p className="text-warning-700">{legemiddel.flagg}</p>
          </div>
        )}

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-neutral-900">
            1. Vet du hvorfor du tar dette legemidlet?
          </legend>
          <div className="flex flex-wrap gap-3">
            {(["ja", "nei"] as const).map((v) => (
              <label key={v} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name={`${legemiddel.id}-vetHvorfor`}
                  value={v}
                  checked={response.vetHvorfor === v}
                  onChange={() => update({ vetHvorfor: v })}
                  className="h-4 w-4 accent-blueberry-700"
                />
                {v === "ja" ? "Ja, jeg vet hvorfor" : "Nei, usikker"}
              </label>
            ))}
          </div>
          {response.vetHvorfor === "nei" && (
            <div className="mt-2 flex items-center gap-2">
              <InformationCircleIcon className="h-4 w-4 text-blueberry-500 flex-shrink-0" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setFastlegeModalOpen(true)}
                className="text-sm text-blueberry-700 underline hover:text-blueberry-900 focus:outline-none focus:ring-2 focus:ring-blueberry-500 rounded"
              >
                Kontakt fastlege
              </button>
            </div>
          )}
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-neutral-900">
            2. Tar du dette legemidlet nå?
          </legend>
          <div className="flex flex-col gap-2">
            {(
              [
                ["ja_som_forskrevet", "Ja, som forskrevet"],
                ["ja_annen_dose", "Ja, men med annen dose"],
                ["nei", "Nei, jeg bruker det ikke lenger"],
              ] as const
            ).map(([v, label]) => (
              <label key={v} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name={`${legemiddel.id}-tarMedisinen`}
                  value={v}
                  checked={response.tarMedisinen === v}
                  onChange={() => update({ tarMedisinen: v })}
                  className="h-4 w-4 accent-blueberry-700"
                />
                {label}
              </label>
            ))}
          </div>
          {response.tarMedisinen === "ja_annen_dose" && (
            <div className="mt-2">
              <label htmlFor={`${legemiddel.id}-annenDose`} className="block text-xs font-medium text-neutral-700 mb-1">
                Beskriv hvordan du tar det:
              </label>
              <input
                id={`${legemiddel.id}-annenDose`}
                type="text"
                value={response.annenDoseBeskriv}
                onChange={(e) => update({ annenDoseBeskriv: e.target.value })}
                className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm focus:border-blueberry-500 focus:outline-none focus:ring-1 focus:ring-blueberry-500"
                placeholder="F.eks. «Tar ½ tablett» eller «Tar bare 3 ganger i uken»"
              />
            </div>
          )}
        </fieldset>

        {legemiddel.kategori === "kur" && (
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-neutral-900">
              3. Er denne kuren avsluttet og medisinen ikke relevant lenger?
            </legend>
            <div className="flex flex-wrap gap-3">
              {(["ja", "nei"] as const).map((v) => (
                <label key={v} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name={`${legemiddel.id}-kurAvsluttet`}
                    value={v}
                    checked={response.kurAvsluttet === v}
                    onChange={() => update({ kurAvsluttet: v })}
                    className="h-4 w-4 accent-blueberry-700"
                  />
                  {v === "ja" ? "Ja, avsluttet" : "Nei, fortsetter"}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {legemiddel.kategori === "behovs" && (
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-neutral-900">
              3. Vet du når og hvordan medisinen skal tas?
            </legend>
            <div className="flex flex-wrap gap-3">
              {(["ja", "nei"] as const).map((v) => (
                <label key={v} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name={`${legemiddel.id}-vetNårHvordan`}
                    value={v}
                    checked={response.vetNårHvordan === v}
                    onChange={() => update({ vetNårHvordan: v })}
                    className="h-4 w-4 accent-blueberry-700"
                  />
                  {v === "ja" ? "Ja, jeg vet" : "Nei, usikker"}
                </label>
              ))}
            </div>
            {response.vetNårHvordan === "nei" && (
              <div className="mt-2 flex items-center gap-2">
                <InformationCircleIcon className="h-4 w-4 text-blueberry-500 flex-shrink-0" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setFastlegeModalOpen(true)}
                  className="text-sm text-blueberry-700 underline hover:text-blueberry-900 focus:outline-none focus:ring-2 focus:ring-blueberry-500 rounded"
                >
                  Kontakt fastlege
                </button>
              </div>
            )}
          </fieldset>
        )}
      </div>

      <Modal
        open={fastlegeModalOpen}
        onClose={() => setFastlegeModalOpen(false)}
        title="Kontakt fastlegen din"
      >
        <div className="space-y-4 text-sm text-neutral-700">
          <p>Din fastlege er:</p>
          <div className="rounded-md bg-blueberry-50 p-3">
            <p className="font-semibold text-blueberry-900">{fastlege}</p>
          </div>
          <p>
            Ta kontakt for å få en forklaring på hvorfor du bruker{" "}
            <strong>{legemiddel.handelsnavn}</strong>. Du kan ringe legekontoret
            eller bestille time via Helsenorge.
          </p>
          <button
            type="button"
            onClick={() => setFastlegeModalOpen(false)}
            className="w-full rounded-md bg-blueberry-900 py-2 text-white font-medium hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
          >
            OK, jeg forstår
          </button>
        </div>
      </Modal>
    </div>
  );
}
