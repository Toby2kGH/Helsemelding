import Link from "next/link";
import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

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
        <h2 id={`${id}-heading`} className="text-2xl font-bold text-blueberry-900">{tittel}</h2>
      </div>
      <div className="prose-body space-y-4">{children}</div>
    </section>
  );
}

function Kilde({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-blueberry-700 hover:underline focus:outline-none focus:underline"
    >
      {children}
      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only">(åpnes i ny fane)</span>
    </a>
  );
}

const prinsipper = [
  {
    nr: "1",
    navn: "Frykt alene virker svakt — koble alltid til noe du kan gjøre",
    tekst: "En stor metaanalyse av 127 studier fant at trusselbudskap har moderat effekt, og bare når de kombineres med mestringstro (at du kan gjøre noe) og at tiltaket faktisk virker. Uten dette kan frykt slå tilbake i fornekting og unngåelse. Derfor følges hver konsekvens av et konkret, gjennomførbart tiltak.",
    kilde: "Tannenbaum m.fl., Psychological Bulletin, 2015 (Extended Parallel Process Model)",
    href: "https://pubmed.ncbi.nlm.nih.gov/25547486/",
  },
  {
    nr: "2",
    navn: "Gevinst-innramming for forebygging",
    tekst: "For forebyggende atferd (aktivitet, røykeslutt) virker budskap som vektlegger hva du vinner, bedre enn budskap som vektlegger hva du taper. Derfor leder hvert kort med gevinsten, og bruker konsekvensen som ærlig kontekst — ikke som skremsel.",
    kilde: "Gallagher & Updegraff, Annals of Behavioral Medicine, 2012 (metaanalyse, 94 studier)",
    href: "https://academic.oup.com/abm/article-abstract/43/1/101/4563944",
  },
  {
    nr: "3",
    navn: "Ikke stigmatiser — det gir motsatt effekt",
    tekst: "Stigmatiserende budskap om vekt øker stress, får folk til å unngå helsehjelp og er forbundet med vektøkning — det motsatte av hensikten. Vi bruker person-først-språk, antar ingenting, og lar deg selv oppgi hva som gjelder deg.",
    kilde: "Puhl m.fl. (vektstigma-forskning); selvbestemmelsesteori",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5720363/",
  },
  {
    nr: "4",
    navn: "Gjør fremtiden nær — «deg om 5–10 år»",
    tekst: "Når fremtiden føles nær og levende, blir vi mindre tilbøyelige til å nedvurdere den, og tar sunnere valg i dag. Å ramme informasjon inn rundt ditt eget fremtidige jeg er derfor et virksomt grep.",
    kilde: "Hershfield m.fl.; forskning på fremtidig selvkontinuitet og episodisk fremtidstenkning",
    href: "https://anderson-review.ucla.edu/wp-content/uploads/2021/03/2018_Rutchick-Slepian-Reyes-Pleskus-Hershfield_JEPA.pdf",
  },
  {
    nr: "5",
    navn: "Klart språk og ærlige tall",
    tekst: "God helsekompetanse krever enkelt språk, absolutte tall (ikke skremmende relative multiplikatorer), og at ord og tall følges av hverandre. Vi holder tallene konkrete og oppgir kilde.",
    kilde: "CDC Health Literacy; AAFP «Communicating Risks»",
    href: "https://www.cdc.gov/health-literacy/php/develop-materials/guidance-standards.html",
  },
  {
    nr: "6",
    navn: "Personlig og autonomistøttende",
    tekst: "Tilpasset informasjon virker bedre enn generisk, og folk endrer seg mer varig når de opplever å bestemme selv. Steget bruker alder og det du oppgir, og understreker at du bestemmer hva du vil gjøre.",
    kilde: "Selvbestemmelsesteori; forskning på tilpasset helsekommunikasjon",
    href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11810810/",
  },
];

export default function OmHelsemelding12() {
  return (
    <div className="bg-white">
      <div className="bg-blueberry-900 text-white py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-cherry-500 px-2.5 py-0.5 text-xs font-bold text-white">1.2</span>
            <span className="text-blueberry-100 text-sm font-medium">Om helsekompetanse-steget</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Helsekompetanse — bygget på forskning</h1>
          <p className="text-blueberry-100 text-lg max-w-2xl">
            Hvordan kan en nasjonal helseportal gi ærlige helseråd om for eksempel aktivitet og
            røyk — uten å virke som en pekefinger? Her er kunnskapsgrunnlaget bak steget.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-warning-100 px-4 py-2 text-sm font-semibold text-warning-700">
            🔬 DEMO — kunnskapsoppsummering, ikke offisiell veileder
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <Seksjon id="hva" ikon="🧭" tittel="Hva helsekompetanse-steget gjør">
          <p>
            Steget gir deg ærlig, kunnskapsbasert informasjon om hva dagens levevaner betyr for deg
            om 5–10 år — rammet inn rundt ditt eget fremtidige jeg. Fysisk aktivitet vises for alle
            (tilpasset alder), mens temaer som røyk og levevaner bare vises hvis du selv oppgir at de
            gjelder deg. Hvert kort kobler en ærlig konsekvens til et konkret neste steg.
          </p>
        </Seksjon>

        <Seksjon id="prinsipper" ikon="📚" tittel="Seks prinsipper fra forskningen">
          <p>
            En helseportal som skal gi råd, må balansere ærlighet mot risikoen for å skremme eller
            skamme. Disse seks prinsippene fra helsekommunikasjonsforskningen styrer hvordan steget
            er skrevet:
          </p>
          <div className="space-y-4 not-prose">
            {prinsipper.map((p) => (
              <div key={p.nr} className="rounded-lg border border-neutral-200 bg-white p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blueberry-900 text-sm font-bold text-white">
                    {p.nr}
                  </span>
                  <h3 className="text-lg font-semibold text-blueberry-900">{p.navn}</h3>
                </div>
                <p className="text-sm text-neutral-700">{p.tekst}</p>
                <p className="text-xs text-neutral-500 mt-2">
                  Kilde: <Kilde href={p.href}>{p.kilde}</Kilde>
                </p>
              </div>
            ))}
          </div>
        </Seksjon>

        <Seksjon id="krast" ikon="⚖️" tittel="Ærlig uten å skremme">
          <p>
            Kan en offentlig helseportal realitetsorientere uten å skremme eller skamme? Forskningen
            gir et ganske tydelig svar:{" "}
            <strong>ærlighet virker, mens det å være krass ikke gjør det.</strong> Effekten kommer av
            tre ting samtidig:
          </p>
          <ul className="space-y-1.5">
            {[
              "Vær konkret og sann om konsekvensene — ikke pynt på dem, men ikke overdriv heller.",
              "Koble alltid konsekvensen til noe personen faktisk kan gjøre, som virker.",
              "Aldri skam eller antakelser — det får folk til å lukke seg og unngå helsehjelp.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="text-success-700 font-bold mt-0.5" aria-hidden="true">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <p>
            Med andre ord: det er ikke et valg mellom «snill» og «krass». Den mest virksomme tonen er
            <strong> ærlig, konkret og hjelpsom på samme tid.</strong> Da kan man realitetsorientere
            uten å støte fra seg dem man vil nå.
          </p>
        </Seksjon>

        <div className="mt-10 rounded-lg bg-blueberry-900 text-white p-8">
          <h2 className="text-2xl font-bold mb-2">Prøv Helsemelding 1.2</h2>
          <p className="text-blueberry-100 mb-5 max-w-xl">
            Gå gjennom stegene med en av de fiktive brukerprofilene, og se helsekompetanse-steget i praksis.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/helsemelding-1-2"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-blueberry-900 hover:bg-blueberry-50 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blueberry-900"
            >
              Start Helsemelding 1.2
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/helsemelding-1-1/om"
              className="inline-flex items-center gap-2 rounded-md border border-white/60 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white"
            >
              Om Helsemelding 1.1
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
