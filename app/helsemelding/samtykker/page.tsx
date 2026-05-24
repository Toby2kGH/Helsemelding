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
import ConsentSection from "@/components/ConsentSection";
import { ConsentDetailModal } from "@/components/ConsentDetailModal";
import { useUser } from "@/context/UserContext";
import type { Step } from "@/types";

export default function Samtykker() {
  const router = useRouter();
  const { profil, helsemeldingState, oppdaterSamtykke, fullforSteg } = useUser();
  const [visAlle, setVisAlle] = useState(false);
  const [selectedConsent, setSelectedConsent] = useState<string | null>(null);

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: "completed" },
    { id: 2, label: "Kritisk info", path: "/helsemelding/kritisk-info", status: "completed" },
    { id: 3, label: "Vaksiner", path: "/helsemelding/vaksiner", status: "completed" },
    { id: 4, label: "Samtykker", path: "/helsemelding/samtykker", status: "active" },
    { id: 5, label: "Bekreft", path: "/helsemelding/bekreft", status: helsemeldingState.stepsCompleted.bekreft ? "completed" : "pending" },
  ];

  const { samtykkeState } = helsemeldingState;

  function settOrgan(val: "ja" | "nei" | "ikke_tatt_stilling") {
    oppdaterSamtykke({ organdonasjon: val });
  }

  function neste() {
    fullforSteg("samtykker");
    router.push("/helsemelding/bekreft");
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 4 av 5</p>
          <h1 className="text-3xl font-bold text-neutral-900">Samtykker og reservasjoner</h1>
          <p className="text-neutral-600 mt-2">
            Her kan du se og oppdatere dine samtykker. Du kan til enhver tid endre eller trekke tilbake et samtykke.
          </p>
        </div>

        {/* 1. Min behandling */}
        <ConsentSection
          title="Min behandling"
          description="Hvem kan se min helseinformasjon og hvordan skal den deles i mitt behandlingsforløp?"
          category="min_behandling"
        >
          {/* Organdonasjon */}
          <div className="border-b border-blue-100 pb-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span aria-hidden="true">❤️</span>
                <h3 className="font-semibold text-neutral-900">Organdonasjon</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedConsent("organdonasjon")}
                className="text-xs text-blueberry-700 underline hover:text-blueberry-900 focus:outline-none focus:ring-1 focus:ring-blueberry-500 rounded px-1"
                aria-label="Les mer om organdonasjon"
              >
                ? Les mer
              </button>
            </div>
            {samtykkeState.organdonasjon !== null && (
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                Status:{" "}
                {samtykkeState.organdonasjon === "ja"
                  ? "Registrert donor"
                  : samtykkeState.organdonasjon === "nei"
                  ? "Reservert"
                  : "Ikke tatt stilling"}
              </div>
            )}
            <p className="text-sm text-neutral-700 mb-3">
              I Norge er utgangspunktet at alle er potensielle organdonorer. Du kan registrere din vilje digitalt.
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
                    className="h-4 w-4 accent-blue-700"
                  />
                  {label}
                </label>
              ))}
            </fieldset>
          </div>

          {/* Fastlege-specific consents */}
          <div className="border-b border-blue-100 pb-4 mb-4">
            <h3 className="font-semibold text-neutral-900 mb-3">Deling med fastlegen</h3>
            <ConsentToggle
              label="Sendelse av epikrise etter sykehusopphold"
              description="Fastlegen mottar oppsummering av hva som skjedde under sykehusoppholdet."
              value={samtykkeState.epikrise_til_fastlege}
              onChange={(val) => oppdaterSamtykke({ epikrise_til_fastlege: val })}
            />
            <ConsentToggle
              label="Fastlegen min kan se sykehusjournal"
              description="Tillater fastlegen å se journalnotater fra sykehusbesøk for bedre oversikt over din behandling."
              value={samtykkeState.fastlege_sykehusjournal_innsyn}
              onChange={(val) => oppdaterSamtykke({ fastlege_sykehusjournal_innsyn: val })}
            />
            <ConsentToggle
              label="Digital meldingsutveksling med fastlege"
              description="Fastlegen kan sende og motta meldinger digitalt om din behandling."
              value={samtykkeState.fastlege_digital_kommunikasjon}
              onChange={(val) => oppdaterSamtykke({ fastlege_digital_kommunikasjon: val })}
            />
            <ConsentToggle
              label="Dele spesialopplysninger automatisk"
              description="Rapporter fra spesialister sendes automatisk til fastlegen for koordinert oppfølging."
              value={samtykkeState.fastlege_spesialist_deling}
              onChange={(val) => oppdaterSamtykke({ fastlege_spesialist_deling: val })}
            />
          </div>

          {/* Journal sharing */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Deling av journal mellom helseinstitusjoner</h3>
            <ConsentToggle
              label="Deling av journalopplysninger mellom sykehus"
              description="Tillater at sykehus du er innlagt på kan se relevante journalnotat fra andre sykehus du har besøkt."
              value={samtykkeState.deling_mellom_sykehus}
              onChange={(val) => oppdaterSamtykke({ deling_mellom_sykehus: val })}
            />
            <ConsentToggle
              label="Deling mellom helseregioner"
              description="Gjelder f.eks. ved innleggelse i annen region enn der du normalt behandles."
              value={samtykkeState.deling_mellom_regioner}
              onChange={(val) => oppdaterSamtykke({ deling_mellom_regioner: val })}
            />
            <ConsentToggle
              label="Deling med private tilbydere"
              description="Private klinikker og spesialister som ikke er tilknyttet offentlig sykehus kan få tilgang."
              value={samtykkeState.deling_private_aktorer}
              onChange={(val) => oppdaterSamtykke({ deling_private_aktorer: val })}
            />
          </div>
        </ConsentSection>

        {/* 2. Samarbeid om meg */}
        <ConsentSection
          title="Samarbeid om meg"
          description="Hvordan skal ulike deler av helsevesenet samarbeide om min oppfølging?"
          category="samarbeid_om_meg"
        >
          {/* Municipal health services */}
          <div className="border-b border-green-100 pb-4 mb-4">
            <h3 className="font-semibold text-neutral-900 mb-3">Kommunale helsetjenester</h3>
            <ConsentToggle
              label="Deling mellom sykehus og kommune"
              description="Relevant ved utskrivelse til hjemmetjeneste eller kommunal omsorgstjeneste."
              value={samtykkeState.deling_sykehus_kommune}
              onChange={(val) => oppdaterSamtykke({ deling_sykehus_kommune: val })}
            />
            <ConsentToggle
              label="Samordning av pleie og omsorg"
              description="Kommune og sykehus samordner innsatsen når du trenger både sykehus og kommunale tjenester."
              value={samtykkeState.kommune_samordning_omsorg}
              onChange={(val) => oppdaterSamtykke({ kommune_samordning_omsorg: val })}
            />
            <ConsentToggle
              label="Helsekoordiator får tilgang til journal"
              description="En helsekoordiator i kommunen kan se deler av journalen for å koordinere din behandling."
              value={samtykkeState.kommune_helsekoordiator_innsyn}
              onChange={(val) => oppdaterSamtykke({ kommune_helsekoordiator_innsyn: val })}
            />
          </div>

          {/* Digital cooperation */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-3">Digital samhandling</h3>
            <ConsentToggle
              label="Digital samhandling via Helsenorge"
              description="Gjør at du kan kommunisere digitalt med ulike deler av helsevesenet gjennom Helsenorge."
              value={samtykkeState.digital_samhandling_helsenorge}
              onChange={(val) => oppdaterSamtykke({ digital_samhandling_helsenorge: val })}
            />
          </div>
        </ConsentSection>

        {/* 3. Bidra til fremtiden */}
        <ConsentSection
          title="Bidra til fremtiden"
          description="Hvordan ønsker du at dine data kan brukes til forskning, kvalitetsforbedring og undervisning?"
          category="bidra_til_fremtiden"
        >
          {/* Quality improvement */}
          <div className="border-b border-purple-100 pb-4 mb-4">
            <h3 className="font-semibold text-neutral-900 mb-3">Kvalitetsarbeid</h3>
            <ConsentToggle
              label="Kontakt for forebyggende helsearbeid"
              description="Helsevesenet kan kontakte deg om deltakelse i forebyggende helseprogram."
              value={samtykkeState.forebyggende_helse_kontakt}
              onChange={(val) => oppdaterSamtykke({ forebyggende_helse_kontakt: val })}
            />
            <ConsentToggle
              label="Bidra til kvalitetsforbedring"
              description="Din erfaring kan brukes til å forbedre kvaliteten på helsetjenestene."
              value={samtykkeState.kvalitetsforbedring}
              onChange={(val) => oppdaterSamtykke({ kvalitetsforbedring: val })}
            />
          </div>

          {/* Quality registries */}
          {profil.samtykker.kvalitetsregistre.length > 0 && (
            <div className="border-b border-purple-100 pb-4 mb-4">
              <h3 className="font-semibold text-neutral-900 mb-3">Kvalitetsregistre</h3>
              <div className="space-y-2">
                {profil.samtykker.kvalitetsregistre.map((kv) => (
                  <div key={kv.navn} className="flex items-center gap-2 text-sm">
                    <span className={kv.samtykke ? "text-success-700" : "text-neutral-400"} aria-hidden="true">
                      {kv.samtykke ? "✅" : "❌"}
                    </span>
                    <span className="text-neutral-900">{kv.navn}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research */}
          <div className="border-b border-purple-100 pb-4 mb-4">
            <h3 className="font-semibold text-neutral-900 mb-3">Forskning</h3>
            <ConsentToggle
              label="Kontakt for forskning"
              description="Du kan bli kontaktet om deltakelse i forskningsprosjekter som er relevant for din diagnose."
              value={samtykkeState.forskning_kontakt}
              onChange={(val) => oppdaterSamtykke({ forskning_kontakt: val })}
            />
            <ConsentToggle
              label="Biobank — lagring av biologisk materiale"
              description="Blodprøver eller annet biologisk materiale kan lagres for fremtidig forskning."
              value={samtykkeState.forskning_biobank}
              onChange={(val) => oppdaterSamtykke({ forskning_biobank: val })}
            />
          </div>

          {/* Technology and teaching */}
          <div className="border-b border-purple-100 pb-4 mb-4">
            <h3 className="font-semibold text-neutral-900 mb-3">Teknologi og utdanning</h3>
            <ConsentToggle
              label="AI og maskinlæring"
              description="Dine anonymiserte data kan brukes til å forbedre kunstig intelligens i helsetjenesten."
              value={samtykkeState.ai_maskinlaering}
              onChange={(val) => oppdaterSamtykke({ ai_maskinlaering: val })}
            />
            <ConsentToggle
              label="Student- og undervisningsformål"
              description="Dine anonymiserte data kan brukes til undervisning av helsefagstudenter."
              value={samtykkeState.student_undervisning}
              onChange={(val) => oppdaterSamtykke({ student_undervisning: val })}
            />
          </div>

          {/* Active study requests */}
          {profil.samtykker.aktive_studier.length > 0 && (
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">Aktive forespørsler</h3>
              <div className="space-y-4">
                {profil.samtykker.aktive_studier.map((studie) => {
                  const studieResp = samtykkeState.aktive_studier[studie.id];
                  return (
                    <div
                      key={studie.id}
                      className="rounded-md border border-purple-100 bg-purple-50 p-4"
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
                            className="rounded-md bg-purple-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                            className="rounded-md px-3 py-1.5 text-xs text-purple-700 underline hover:text-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        </ConsentSection>

        {/* Withdraw consents */}
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

        <ConsentDetailModal
          open={!!selectedConsent}
          onClose={() => setSelectedConsent(null)}
          consentId={selectedConsent || ""}
          currentValue={selectedConsent ? samtykkeState[selectedConsent as keyof typeof samtykkeState] as boolean | null : null}
        />
      </div>
    </div>
  );
}
