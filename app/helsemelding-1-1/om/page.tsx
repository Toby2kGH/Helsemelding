import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ForebyggingSeksjon } from "@/components/ForebyggingSeksjon";
import { LukkeSloyfaSkisse } from "@/components/LukkeSloyfaSkisse";

interface SeksjonProps {
  id: string;
  ikon: string;
  tittel: string;
  children: React.ReactNode;
}

function Seksjon({ id, ikon, tittel, children }: SeksjonProps) {
  return (
    <section id={id} className="mb-12" aria-labelledby={`${id}-heading`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl" aria-hidden="true">{ikon}</span>
        <h2 id={`${id}-heading`} className="text-2xl font-bold text-blueberry-900">
          {tittel}
        </h2>
      </div>
      <div className="prose-body space-y-4">{children}</div>
    </section>
  );
}

const nyheter = [
  {
    ikon: "💬",
    tittel: "Hva er viktig for deg",
    tekst: "Dine egne mål blir utgangspunktet — og følger med som ramme på alt som sendes videre.",
  },
  {
    ikon: "🌱",
    tittel: "Personlig forebygging",
    tekst: "Råd og lokale tilbud tilpasset alder og livssituasjon — et kort, relevant utvalg.",
  },
  {
    ikon: "🔁",
    tittel: "Oppfølging som sendes videre",
    tekst: "Ønsket oppfølging sendes videre til fastlege eller kommune — ikke bare til lesning.",
  },
];

export default function OmHelsemelding11() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-blueberry-900 text-white py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-cherry-500 px-2.5 py-0.5 text-xs font-bold text-white">1.1</span>
            <span className="text-blueberry-100 text-sm font-medium">Om denne versjonen</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Hva er nytt i Helsemelding 1.1</h1>
          <p className="text-blueberry-100 text-lg max-w-2xl">
            Helsemelding 1.1 bygger på den vanlige Helsemeldingen og legger til tre ting som
            gjør at meldingen ikke bare samler informasjon, men faktisk hjelper deg videre.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-warning-100 px-4 py-2 text-sm font-semibold text-warning-700">
            🔬 DEMO-APPLIKASJON — fiktive pasientdata
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Oversikt */}
        <div className="grid gap-4 mb-12 md:grid-cols-3">
          {nyheter.map((n) => (
            <div key={n.tittel} className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-4">
              <span className="text-2xl mb-2 block" aria-hidden="true">{n.ikon}</span>
              <h2 className="font-semibold text-blueberry-900 mb-1">{n.tittel}</h2>
              <p className="text-sm text-neutral-700">{n.tekst}</p>
            </div>
          ))}
        </div>

        <Seksjon id="viktig" ikon="💬" tittel="Hva er viktig for deg">
          <p>
            Helsemelding 1.1 begynner med ett spørsmål: hva er viktig for deg? Å bo trygt
            hjemme, å klare seg selv, å slippe innleggelse, å forstå medisinene sine. Det du
            svarer blir ikke et felt langt nede i et skjema — det blir <strong>rammen</strong>{" "}
            rundt resten.
          </p>
          <p>
            Målet ditt følger med som overskrift på alt som senere sendes til fastlege og
            kommune. Da ser de ikke bare hva som feiler, men hva du faktisk vil oppnå — og
            oppfølgingen kan innrettes etter det.
          </p>
        </Seksjon>

        <Seksjon id="forebygging" ikon="🌱" tittel="Personlig forebygging">
          <p>
            Det finnes svært mange gode offentlige råd om aktivitet, fall, psykisk helse og
            mer. Legger vi dem alle på bordet, drukner det viktige i det generelle. Derfor
            viser 1.1 aldri en katalog: den bruker det den vet — alder, bosted og
            livssituasjon — og <strong>filtrerer</strong> til de få rådene som gjelder deg,
            sammen med lokale tilbud der du bor.
          </p>
          <p>Prøv det — bytt profil, sveip over aldersbåndene, eller oppgi en livssituasjon:</p>

          <ForebyggingSeksjon />

          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 mt-2">
            <p className="text-sm font-semibold text-neutral-900 mb-2">
              Slik holdes det håndterbart når rådene blir mange
            </p>
            <ul className="space-y-1.5">
              {[
                "Personalisering, ikke katalog: alder, kommune, diagnoser og livssituasjon avgjør et lite utvalg.",
                "Én kilde per råd: hvert kort peker til én offentlig kilde — ikke en lenkeliste.",
                "Verifiserte lenker: temaer uten en kvalitetssikret delenke vises uten lenke, aldri som en gjetting.",
                "Tydelig innramming: «bare tips og lenker», ikke personlige medisinske anbefalinger.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="text-success-700 font-bold mt-0.5" aria-hidden="true">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Seksjon>

        <Seksjon id="oppfolging" ikon="🔁" tittel="Oppfølging som sendes videre">
          <p>
            En lenke gir informasjon, men følger ikke opp. Derfor kan 1.1 samle det du vil følge opp
            og sende det videre som <strong>konkrete oppgaver</strong> til riktig sted — ikke som
            fritekst du selv må ta med videre. Tre veier, valgt automatisk:
          </p>
          <div className="grid gap-3 sm:grid-cols-3 not-prose">
            {[
              { ikon: "📋", tittel: "Bestilling til fastlege", tekst: "Vaksine, legemiddelgjennomgang, årskontroll — som konkrete oppgaver." },
              { ikon: "💬", tittel: "E-konsultasjon", tekst: "Spørsmål som trenger dialog, koblet til den bekreftede legemiddellisten." },
              { ikon: "🏛️", tittel: "Til kommunen", tekst: "Frisklivssentral, balansegruppe eller hjemmeoppfølging — med samtykke." },
            ].map((k) => (
              <div key={k.tittel} className="rounded-lg border border-neutral-200 bg-white p-4">
                <span className="text-2xl mb-2 block" aria-hidden="true">{k.ikon}</span>
                <p className="font-semibold text-neutral-900 text-sm mb-1">{k.tittel}</p>
                <p className="text-xs text-neutral-600">{k.tekst}</p>
              </div>
            ))}
          </div>
          <p>Prøv skissen — velg hva som er viktig, huk av oppfølging, og se oversikten bygge seg opp:</p>

          <LukkeSloyfaSkisse />
        </Seksjon>

        {/* CTA */}
        <div className="mt-10 rounded-lg bg-blueberry-900 text-white p-8">
          <h2 className="text-2xl font-bold mb-2">Prøv Helsemelding 1.1</h2>
          <p className="text-blueberry-100 mb-5 max-w-xl">
            Gå gjennom stegene med en av de fiktive brukerprofilene.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/helsemelding-1-1"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-blueberry-900 hover:bg-blueberry-50 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blueberry-900"
            >
              Start Helsemelding 1.1
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/helsemelding"
              className="inline-flex items-center gap-2 rounded-md border border-white/60 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white"
            >
              Vanlig Helsemelding
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
