"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { ConsentToggle } from "@/components/ConsentToggle";
import ConsentSection from "@/components/ConsentSection";
import { ConsentDetailModal } from "@/components/ConsentDetailModal";
import { useUser } from "@/context/UserContext";

/**
 * Delt samtykkeskjema — brukes både i Helsemelding 1.0 og 1.1, så innhold og
 * atferd (bekreftelses-popup, «les mer») holdes likt begge steder.
 */
export function SamtykkeSkjema() {
  const { profil, helsemeldingState, oppdaterSamtykke } = useUser();
  const [visAlle, setVisAlle] = useState(false);
  const [selectedConsent, setSelectedConsent] = useState<string | null>(null);
  const { samtykkeState } = helsemeldingState;

  return (
    <div>
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
                  onChange={() => oppdaterSamtykke({ organdonasjon: v })}
                  className="h-4 w-4 accent-blue-700"
                />
                {label}
              </label>
            ))}
          </fieldset>
        </div>

        {/* Kjernejournal */}
        <div className="border-b border-blue-100 pb-4 mb-4">
          <h3 className="font-semibold text-neutral-900 mb-3">Kjernejournal</h3>
          <ConsentToggle
            label="La helsepersonell slå opp i kjernejournalen min"
            description="De viktigste opplysningene dine (kritisk info, legemidler, kontaktpunkter) er tilgjengelige for behandlere når du trenger hjelp. Alle har kjernejournal i Norge om man ikke reserverer seg."
            value={samtykkeState.kjernejournal_oppslag}
            onChange={(val) => oppdaterSamtykke({ kjernejournal_oppslag: val })}
            consentId="kjernejournal_oppslag"
            onMoreInfo={setSelectedConsent}
          />
        </div>

        {/* Deling med fastlegen */}
        <div className="border-b border-blue-100 pb-4 mb-4">
          <h3 className="font-semibold text-neutral-900 mb-3">Deling med fastlegen</h3>
          <ConsentToggle
            label="Sendelse av epikrise etter sykehusopphold"
            description="Fastlegen mottar oppsummering av hva som skjedde under sykehusoppholdet."
            value={samtykkeState.epikrise_til_fastlege}
            onChange={(val) => oppdaterSamtykke({ epikrise_til_fastlege: val })}
            consentId="epikrise_til_fastlege"
            onMoreInfo={setSelectedConsent}
          />
          <ConsentToggle
            label="Fastlegen min kan se sykehusjournal"
            description="Tillater fastlegen å se journalnotater fra sykehusbesøk for bedre oversikt over din behandling."
            value={samtykkeState.fastlege_sykehusjournal_innsyn}
            onChange={(val) => oppdaterSamtykke({ fastlege_sykehusjournal_innsyn: val })}
            consentId="fastlege_sykehusjournal_innsyn"
            onMoreInfo={setSelectedConsent}
          />
          <ConsentToggle
            label="Digital meldingsutveksling med fastlege"
            description="Fastlegen kan sende og motta meldinger digitalt om din behandling."
            value={samtykkeState.fastlege_digital_kommunikasjon}
            onChange={(val) => oppdaterSamtykke({ fastlege_digital_kommunikasjon: val })}
            consentId="fastlege_digital_kommunikasjon"
            onMoreInfo={setSelectedConsent}
          />
          <ConsentToggle
            label="Dele spesialopplysninger automatisk"
            description="Rapporter fra spesialister sendes automatisk til fastlegen for koordinert oppfølging."
            value={samtykkeState.fastlege_spesialist_deling}
            onChange={(val) => oppdaterSamtykke({ fastlege_spesialist_deling: val })}
            consentId="fastlege_spesialist_deling"
            onMoreInfo={setSelectedConsent}
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
            consentId="deling_mellom_sykehus"
            onMoreInfo={setSelectedConsent}
            warningRequired={true}
            warningText="Hvis du ikke tillater deling mellom sykehus, kan det bli vansker med å koordinere behandlingen din. Vi anbefaler at du snakker med fastlegen din før du gjør denne endringen."
          />
          <ConsentToggle
            label="Deling mellom helseregioner"
            description="Gjelder f.eks. ved innleggelse i annen region enn der du normalt behandles."
            value={samtykkeState.deling_mellom_regioner}
            onChange={(val) => oppdaterSamtykke({ deling_mellom_regioner: val })}
            consentId="deling_mellom_regioner"
            onMoreInfo={setSelectedConsent}
            warningRequired={true}
            warningText="Hvis du ikke tillater deling mellom regioner, kan det føre til forsinkelser ved behandling utenfor din hjemmeregion. Vi anbefaler at du snakker med fastlegen din før du gjør denne endringen."
          />
        </div>
      </ConsentSection>

      {/* 2. Samarbeid om meg */}
      <ConsentSection
        title="Samarbeid om meg"
        description="Hvordan skal ulike deler av helsevesenet — og de nærmeste rundt deg — samarbeide om din oppfølging?"
        category="samarbeid_om_meg"
      >
        {/* Municipal health services */}
        <div className="border-b border-green-100 pb-4 mb-4">
          <h3 className="font-semibold text-neutral-900 mb-3">Samarbeid med kommunen</h3>
          <ConsentToggle
            label="Deling mellom sykehus og kommune"
            description="Når du skrives ut fra sykehus eller trenger oppfølging hjemme, må kommunens helsetjenester kunne se relevant helseinformasjon."
            value={samtykkeState.deling_sykehus_kommune}
            onChange={(val) => oppdaterSamtykke({ deling_sykehus_kommune: val })}
            consentId="deling_sykehus_kommune"
            onMoreInfo={setSelectedConsent}
            warningRequired={true}
            warningText="Hvis du ikke tillater deling med kommunen, kan det bli vansker med oppfølging hjemme og koordinering mellom sykehus og kommune. Vi anbefaler at du snakker med fastlegen din før du gjør denne endringen."
          />
          <ConsentToggle
            label="Samordning av pleie og omsorg"
            description="Kommune og sykehus samordner innsatsen når du trenger både sykehus og kommunale tjenester."
            value={samtykkeState.kommune_samordning_omsorg}
            onChange={(val) => oppdaterSamtykke({ kommune_samordning_omsorg: val })}
            consentId="kommune_samordning_omsorg"
            onMoreInfo={setSelectedConsent}
            warningRequired={true}
            warningText="Å ikke tillate samordning kan føre til duplisering av tjenester og vansker med koordinert oppfølging."
          />
          <ConsentToggle
            label="Helsekoordinator får tilgang til journal"
            description="En helsekoordinator i kommunen (f.eks. kreftkoordinator eller eldrehelsekoordinator) kan se deler av journalen for å koordinere din behandling."
            value={samtykkeState.kommune_helsekoordiator_innsyn}
            onChange={(val) => oppdaterSamtykke({ kommune_helsekoordiator_innsyn: val })}
            consentId="kommune_helsekoordiator_innsyn"
            onMoreInfo={setSelectedConsent}
            warningRequired={true}
            warningText="Hvis koordinatoren ikke får tilgang, kan det bli vansker med å samordne din behandling på tvers av tjenestene."
          />
        </div>

        {/* Pårørende og fullmakt */}
        <div className="border-b border-green-100 pb-4 mb-4">
          <h3 className="font-semibold text-neutral-900 mb-3">Pårørende og fullmakt</h3>
          <ConsentToggle
            label="Gi en pårørende fullmakt til å hjelpe meg"
            description="En pårørende du stoler på kan hjelpe deg med helsetjenester digitalt — se opplysninger, bestille timer og lese meldinger på dine vegne. Du bestemmer selv omfanget."
            value={samtykkeState.fullmakt_paroerende}
            onChange={(val) => oppdaterSamtykke({ fullmakt_paroerende: val })}
            consentId="fullmakt_paroerende"
            onMoreInfo={setSelectedConsent}
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
            consentId="digital_samhandling_helsenorge"
            onMoreInfo={setSelectedConsent}
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
            consentId="forebyggende_helse_kontakt"
            onMoreInfo={setSelectedConsent}
          />
          <ConsentToggle
            label="Bidra til kvalitetsforbedring"
            description="Din erfaring kan brukes til å forbedre kvaliteten på helsetjenestene."
            value={samtykkeState.kvalitetsforbedring}
            onChange={(val) => oppdaterSamtykke({ kvalitetsforbedring: val })}
            consentId="kvalitetsforbedring"
            onMoreInfo={setSelectedConsent}
          />
        </div>

        {/* Quality registries (read-only) */}
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
            label="Bruk av journaldata i godkjent forskning"
            description="Opplysninger fra journalen din kan brukes i forskning godkjent av REK. Du kan reservere deg — da brukes ikke dine opplysninger."
            value={samtykkeState.forskning_journaldata}
            onChange={(val) => oppdaterSamtykke({ forskning_journaldata: val })}
            consentId="forskning_journaldata"
            onMoreInfo={setSelectedConsent}
          />
          <ConsentToggle
            label="Kontakt for forskning"
            description="Du kan bli kontaktet om deltakelse i forskningsprosjekter som er relevant for din diagnose."
            value={samtykkeState.forskning_kontakt}
            onChange={(val) => oppdaterSamtykke({ forskning_kontakt: val })}
            consentId="forskning_kontakt"
            onMoreInfo={setSelectedConsent}
          />
          <ConsentToggle
            label="Biobank — lagring av biologisk materiale"
            description="Blodprøver eller annet biologisk materiale kan lagres for fremtidig forskning."
            value={samtykkeState.forskning_biobank}
            onChange={(val) => oppdaterSamtykke({ forskning_biobank: val })}
            consentId="forskning_biobank"
            onMoreInfo={setSelectedConsent}
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
            consentId="ai_maskinlaering"
            onMoreInfo={setSelectedConsent}
          />
          <ConsentToggle
            label="Student- og undervisningsformål"
            description="Dine anonymiserte data kan brukes til undervisning av helsefagstudenter."
            value={samtykkeState.student_undervisning}
            onChange={(val) => oppdaterSamtykke({ student_undervisning: val })}
            consentId="student_undervisning"
            onMoreInfo={setSelectedConsent}
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
                  <div key={studie.id} className="rounded-md border border-purple-100 bg-purple-50 p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <span aria-hidden="true" className="text-lg">📊</span>
                      <div>
                        <h4 className="font-semibold text-neutral-900 text-sm">{studie.tittel}</h4>
                        <p className="text-xs text-neutral-500 mt-0.5">Ansvarlig: {studie.ansvarlig}</p>
                        <p className="text-xs text-neutral-500">
                          Frist for svar:{" "}
                          {new Date(studie.frist).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    {studieResp === true && <p className="text-success-700 text-sm font-medium">✅ Samtykke gitt</p>}
                    {studieResp === false && <p className="text-neutral-500 text-sm">Avslått</p>}
                    {(studieResp === null || studieResp === undefined) && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => oppdaterSamtykke({ aktive_studier: { ...samtykkeState.aktive_studier, [studie.id]: true } })}
                          className="rounded-md bg-purple-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          Samtykke
                        </button>
                        <button
                          type="button"
                          onClick={() => oppdaterSamtykke({ aktive_studier: { ...samtykkeState.aktive_studier, [studie.id]: false } })}
                          className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                        >
                          Avslå
                        </button>
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
        <h2 id="trekk-heading" className="text-lg font-semibold text-neutral-900 mb-2">Trekk tilbake samtykker</h2>
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
            <>Skjul samtykker <ChevronUpIcon className="h-4 w-4" aria-hidden="true" /></>
          ) : (
            <>Se alle mine registrerte samtykker <ChevronDownIcon className="h-4 w-4" aria-hidden="true" /></>
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

      <ConsentDetailModal
        open={!!selectedConsent}
        onClose={() => setSelectedConsent(null)}
        consentId={selectedConsent || ""}
        currentValue={selectedConsent ? (samtykkeState[selectedConsent as keyof typeof samtykkeState] as boolean | null) : null}
        onToggle={(value) => {
          if (selectedConsent) oppdaterSamtykke({ [selectedConsent]: value });
        }}
      />
    </div>
  );
}
