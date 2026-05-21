"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { ConsentToggle } from "@/components/ConsentToggle";
import { useUser } from "@/context/UserContext";
import type { Step } from "@/types";

export default function Samtykker() {
  const router = useRouter();
  const { profil, helsemeldingState, oppdaterSamtykke, fullforSteg } = useUser();
  const [visAlle, setVisAlle] = useState(false);

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: "completed" },
    { id: 2, label: "Vaksiner", path: "/helsemelding/vaksiner", status: "completed" },
    { id: 3, label: "Samtykker", path: "/helsemelding/samtykker", status: "active" },
    { id: 4, label: "Bekreft", path: "/helsemelding/bekreft", status: helsemeldingState.stepsCompleted[3] ? "completed" : "pending" },
  ];

  const { samtykkeState } = helsemeldingState;

  function settOrgan(val: "ja" | "nei" | "ikke_tatt_stilling") {
    oppdaterSamtykke({ organdonasjon: val });
  }

  function neste() {
    fullforSteg(2);
    router.push("/helsemelding/bekreft");
  }

  const delingPunkter = [
    {
      key: "deling_mellom_sykehus" as const,
      label: "Deling av journalopplysninger mellom sykehus",
      desc: 'Tillater at sykehus du er innlagt på kan se relevante journalnotat fra andre sykehus du har besøkt.',
    },
    {
      key: "deling_mellom_regioner" as const,
      label: "Deling mellom helseregioner",
      desc: "Gjelder f.eks. ved innleggelse i annen region enn der du normalt behandles.",
    },
    {
      key: "deling_sykehus_kommune" as const,
      label: "Deling mellom sykehus og kommune",
      desc: "Relevant ved utskrivelse til hjemmetjeneste eller kommunal omsorgstjeneste.",
    },
    {
      key: "deling_private_aktorer" as const,
      label: "Deling med private tilbydere",
      desc: "Private klinikker og spesialister som ikke er tilknyttet offentlig sykehus.",
    },
  ];

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 3 av 4</p>
          <h1 className="text-3xl font-bold text-neutral-900">Samtykker og reservasjoner</h1>
          <p className="text-neutral-600 mt-2">
            Her kan du se og oppdatere dine samtykker. Du kan til enhver tid endre eller trekke tilbake et samtykke.
          </p>
        </div>

        {/* A: Organdonasjon */}
        <section className="mb-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm" aria-labelledby="organ-heading">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl" aria-hidden="true">❤️</span>
            <h2 id="organ-heading" className="text-lg font-semibold text-neutral-900">Organdonasjon</h2>
          </div>

          {samtykkeState.organdonasjon !== null && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blueberry-100 px-3 py-1 text-xs font-semibold text-blueberry-700">
              Status:{" "}
              {samtykkeState.organdonasjon === "ja"
                ? "Registrert donor"
                : samtykkeState.organdonasjon === "nei"
                ? "Reservert"
                : "Ikke tatt stilling"}
            </div>
          )}

          <p className="text-sm text-neutral-700 mb-4">
            I Norge er utgangspunktet at alle er potensielle organdonorer, men pårørende har avgjørende innflytelse.
            Du kan registrere din vilje digitalt.
          </p>

          <fieldset className="space-y-2">
            <legend className="sr-only">Ditt valg om organdonasjon</legend>
            {(
              [
                ["ja", "Jeg ønsker å donere organer"],
                ["nei", "Jeg ønsker IKKE å donere organer"],
                ["ikke_tatt_stilling", "Jeg vil ikke ta stilling til dette nå"],
              ] as const
            ).map(([v, label]) => (
              <label key={v} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="organdonasjon"
                  value={v}
                  checked={samtykkeState.organdonasjon === v}
                  onChange={() => settOrgan(v)}
                  className="h-4 w-4 accent-blueberry-700"
                />
                {label}
              </label>
            ))}
          </fieldset>
        </section>

        {/* B: Journaldeling */}
        <section className="mb-6 rounded-lg border border-neutral-200 bg-white shadow-sm overflow-hidden" aria-labelledby="deling-heading">
          <div className="bg-blueberry-50 px-5 py-4 border-b border-blueberry-100">
            <h2 id="deling-heading" className="text-lg font-semibold text-neutral-900">
              Kjernejournal og journaldeling
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Kontroller hvem som kan se din helseinformasjon.
            </p>
          </div>
          <div className="px-5">
            {delingPunkter.map((d) => (
              <ConsentToggle
                key={d.key}
                label={d.label}
                description={d.desc}
                value={samtykkeState[d.key]}
                onChange={(val) => oppdaterSamtykke({ [d.key]: val })}
              />
            ))}
          </div>
        </section>

        {/* C: Forskning */}
        <section className="mb-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm" aria-labelledby="forskning-heading">
          <h2 id="forskning-heading" className="text-lg font-semibold text-neutral-900 mb-4">
            Forskning og kvalitetsarbeid
          </h2>

          {profil.samtykker.kvalitetsregistre.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-neutral-700 mb-2">Dine eksisterende samtykker:</h3>
              <ul className="space-y-1.5">
                {profil.samtykker.kvalitetsregistre.map((kv) => (
                  <li key={kv.navn} className="flex items-center gap-2 text-sm">
                    <span className={kv.samtykke ? "text-success-700" : "text-neutral-400"} aria-hidden="true">
                      {kv.samtykke ? "✅" : "❌"}
                    </span>
                    <span className="text-neutral-900">{kv.navn}</span>
                    <span className="text-neutral-500 text-xs">
                      {kv.samtykke ? "Samtykke gitt" : "Ikke samtykket"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profil.samtykker.aktive_studier.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">Aktive forespørsler:</h3>
              <div className="space-y-4">
                {profil.samtykker.aktive_studier.map((studie) => {
                  const studieResp = samtykkeState.aktive_studier[studie.id];
                  return (
                    <div
                      key={studie.id}
                      className="rounded-md border border-blueberry-100 bg-blueberry-50 p-4"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <span aria-hidden="true" className="text-lg">📊</span>
                        <div>
                          <h4 className="font-semibold text-neutral-900 text-sm">{studie.tittel}</h4>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            Ansvarlig: {studie.ansvarlig}
                          </p>
                          <p className="text-xs text-neutral-500">
                            Frist for svar:{" "}
                            {new Date(studie.frist).toLocaleDateString("nb-NO", {
                              day: "numeric", month: "long", year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {studieResp === true && (
                        <p className="text-success-700 text-sm font-medium">✅ Samtykke gitt</p>
                      )}
                      {studieResp === false && (
                        <p className="text-neutral-500 text-sm">Avslått</p>
                      )}
                      {(studieResp === null || studieResp === undefined) && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              oppdaterSamtykke({
                                aktive_studier: {
                                  ...samtykkeState.aktive_studier,
                                  [studie.id]: true,
                                },
                              })
                            }
                            className="rounded-md bg-blueberry-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
                          >
                            Samtykke
                          </button>
                          <button
                            type="button"
                            onClick={() => oppdaterSamtykke({
                              aktive_studier: {
                                ...samtykkeState.aktive_studier,
                                [studie.id]: false,
                              },
                            })}
                            className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                          >
                            Avslå
                          </button>
                          <a
                            href="#"
                            className="rounded-md px-3 py-1.5 text-xs text-blueberry-700 underline hover:text-blueberry-900 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
                          >
                            Les mer om studien
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* D: Trekke tilbake */}
        <section className="mb-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm" aria-labelledby="trekk-heading">
          <h2 id="trekk-heading" className="text-lg font-semibold text-neutral-900 mb-2">
            Trekk tilbake samtykker
          </h2>
          <p className="text-sm text-neutral-700 mb-3">
            Du kan når som helst trekke tilbake et samtykke. Dette påvirker ikke behandlingen du allerede har mottatt.
          </p>
          <button
            type="button"
            onClick={() => setVisAlle(!visAlle)}
            className="flex items-center gap-2 text-sm text-blueberry-700 underline hover:text-blueberry-900 focus:outline-none focus:ring-2 focus:ring-blueberry-500 rounded"
            aria-expanded={visAlle}
          >
            {visAlle ? (
              <>
                Skjul samtykker
                <ChevronUpIcon className="h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              <>
                Se alle mine registrerte samtykker
                <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>

          {visAlle && (
            <div className="mt-3 rounded-md bg-neutral-50 border border-neutral-200 p-3 space-y-2 text-sm">
              {profil.samtykker.kvalitetsregistre.map((kv) => (
                <div key={kv.navn} className="flex items-center justify-between gap-2">
                  <span className="text-neutral-900">{kv.navn}</span>
                  <span className={kv.samtykke ? "text-success-700 text-xs font-medium" : "text-neutral-400 text-xs"}>
                    {kv.samtykke ? "Aktiv" : "Ikke aktiv"}
                  </span>
                </div>
              ))}
              {profil.samtykker.aktive_studier.map((s) => (
                <div key={s.id} className="flex items-center justify-between gap-2">
                  <span className="text-neutral-900 text-xs">{s.tittel}</span>
                  <span className="text-neutral-400 text-xs">Avventer</span>
                </div>
              ))}
              {profil.samtykker.kvalitetsregistre.length === 0 && profil.samtykker.aktive_studier.length === 0 && (
                <p className="text-neutral-500 italic">Ingen registrerte samtykker.</p>
              )}
            </div>
          )}
        </section>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding/vaksiner"
            className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Link>
          <button
            onClick={neste}
            className="flex items-center gap-2 rounded-md bg-blueberry-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
          >
            Neste: Bekreft og send
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
