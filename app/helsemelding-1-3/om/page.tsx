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
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blueberry-700 hover:underline focus:outline-none focus:underline">
      {children}
      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only">(åpnes i ny fane)</span>
    </a>
  );
}

const andreModuler = [
  { modul: "Viktig for meg", variant: "Fritekst vs. verdikort — hvilken elicitering gir mest meningsfulle mål?" },
  { modul: "Legemidler", variant: "Nøytral vs. mål-koblet påminnelse om «vet du hvorfor?» — påvirker det etterlevelse?" },
  { modul: "Samtykker", variant: "Rekkefølge og innramming av bekreftelses-popup — informert samtykke vs. gjennomføringsgrad." },
  { modul: "Oppfølging", variant: "Gevinst- vs. tap-innramming av foreslåtte tiltak — hva øker faktisk oppfølging?" },
];

export default function OmHelsemelding13() {
  return (
    <div className="bg-white">
      <div className="bg-blueberry-900 text-white py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-cherry-500 px-2.5 py-0.5 text-xs font-bold text-white">1.3</span>
            <span className="text-blueberry-100 text-sm font-medium">Forsøksdesign og forskning</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">En lærende helsetjeneste</h1>
          <p className="text-blueberry-100 text-lg max-w-2xl">
            Hva om portalen ikke bare gir råd, men systematisk lærer hvilke råd som virker — ved å
            teste dem mot hverandre i praksis? Her er designet og kunnskapsgrunnlaget.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-warning-100 px-4 py-2 text-sm font-semibold text-warning-700">
            🔬 DEMO — konsept og kunnskapsoppsummering
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <Seksjon id="ide" ikon="🧭" tittel="Ideen: bygg to, randomiser, lær">
          <p>
            I 1.2 gir vi ett sett med forebyggingsråd. Men hvordan vet vi at det er den beste måten?
            1.3 gjør noe annet: den lager <strong>to varianter</strong> av samme steg, plasserer folk
            tilfeldig i én av dem, og måler forskjellen. Slik blir tjenesten en <em>lærende
            helsetjeneste</em> — den forbedrer rådene sine basert på hva som faktisk virker, ikke på
            hva vi tror virker.
          </p>
          <p>Akkurat det du foreslo: to måter å angripe forebygging på, testet på befolkningsnivå.</p>
        </Seksjon>

        <Seksjon id="armene" ikon="🔀" tittel="De to armene">
          <div className="grid gap-4 sm:grid-cols-2 not-prose">
            <div className="rounded-lg border border-neutral-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-1">Gruppe A</p>
              <h3 className="font-semibold text-neutral-900 mb-2">Råd</h3>
              <p className="text-sm text-neutral-700">
                Kunnskapsbaserte råd rammet inn rundt «deg om 5–10 år», med et konkret tiltak til hvert
                tema. Passiv mottak av ekspertinformasjon.
              </p>
            </div>
            <div className="rounded-lg border border-blueberry-200 bg-blueberry-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-blueberry-500 mb-1">Gruppe B</p>
              <h3 className="font-semibold text-blueberry-900 mb-2">Fremtidsbilde (WOOP)</h3>
              <p className="text-sm text-neutral-700">
                Du ser deg selv om 10 år, kontrasterer ønsket med hindringen din, og lager en hvis–så-plan.
                Aktiv, selvgenerert prospeksjon i stedet for råd utenfra.
              </p>
            </div>
          </div>
          <p>
            Vi måler <strong>endring i beredskap</strong> (0–10) før og etter steget som et enkelt utfall.
            I en reell studie ville vi fulgt faktisk atferd over tid.
          </p>
        </Seksjon>

        <Seksjon id="hvorfor" ikon="🧪" tittel="Hvorfor randomisere — og er det lov?">
          <p>
            Randomiserte forsøk innebygd i vanlig tjeneste er kjernen i en lærende helsetjeneste: de er
            billigere og mer generaliserbare enn tradisjonelle studier, og gir sterkere svar enn å bare
            observere. Store <em>megastudier</em> har vist hvor vanskelig det er å forutsi hvilke tiltak
            som virker — nettopp derfor må man teste flere samtidig.
          </p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">•</span>
              <span>Megastudie av 60 000+ personer og 53 tiltak for trening — <Kilde href="https://www.nature.com/articles/s41586-021-04128-4">Milkman, Duckworth m.fl., Nature, 2021</Kilde>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">•</span>
              <span>Pragmatiske forsøk innebygd i helsetjenesten — <Kilde href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6450240/">NIH Collaboratory / learning health system</Kilde>.</span>
            </li>
          </ul>
          <div className="rounded-lg border-l-4 border-blueberry-500 bg-blueberry-50 p-4">
            <p className="font-semibold text-blueberry-900 mb-1">Etikken: likeverd og åpenhet</p>
            <p className="text-neutral-700 text-sm">
              Randomisering er forsvarlig når vi har <strong>ekte likeverd</strong> — vi vet ikke hvilken
              variant som er best. Begge armene er trygge og kunnskapsbaserte (minimal risiko). Vi er
              åpne om at det er et forsøk, og du kan reservere deg. Åpenhet er viktig: folk reagerer
              negativt på å oppdage skjult eksperimentering, men aksepterer randomisering når hensikten
              er å lære hva som hjelper.
            </p>
          </div>
        </Seksjon>

        <Seksjon id="evidens-b" ikon="📚" tittel="Evidens for fremtidsbilde-armen">
          <p>
            «Se deg selv om 10 år og planlegg bakover» er ikke synsing — det er en anerkjent metode:
          </p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-success-700 font-bold mt-0.5" aria-hidden="true">✓</span>
              <span>
                <strong>Mental kontrastering med implementeringsintensjoner (WOOP)</strong> bedrer fysisk
                helseatferd (metaanalyse: g ≈ 0,28 på fire uker, økende til ≈ 0,38 etter tre måneder) —{" "}
                <Kilde href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8149892/">Cross &amp; Sheffield / Wang m.fl., 2021</Kilde>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-700 font-bold mt-0.5" aria-hidden="true">✓</span>
              <span>
                <strong>Hvis–så-planer (implementeringsintensjoner)</strong> gir en egen, større effekt på
                måloppnåelse — Gollwitzer &amp; Sheeran, 2006.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success-700 font-bold mt-0.5" aria-hidden="true">✓</span>
              <span>
                <strong>Episodisk fremtidstenkning</strong> — å forestille seg detaljerte fremtidshendelser
                — reduserer «her og nå»-skjevhet og støtter langsiktige valg (<Kilde href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9669959/">Frontiers in Public Health, 2022</Kilde>).
              </span>
            </li>
          </ul>
          <p className="text-sm text-neutral-600">
            Et poeng fra forskningen: effekten av fremtidsbilde er størst når man har rimelig tro på at
            man kan lykkes. Derfor kobler også denne armen ønsket til en konkret, gjennomførbar plan.
          </p>
        </Seksjon>

        <Seksjon id="andre" ikon="🧩" tittel="Videre: forsøk i andre moduler">
          <p>
            Det samme rammeverket kan brukes i flere moduler. Hver av disse kunne blitt en egen liten arm
            i en megastudie av selve tjenesten:
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200 not-prose">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-50 text-left">
                  <th className="p-3 font-semibold text-neutral-700 border-b border-neutral-200">Modul</th>
                  <th className="p-3 font-semibold text-neutral-700 border-b border-neutral-200">Mulig forsøk</th>
                </tr>
              </thead>
              <tbody>
                {andreModuler.map((r) => (
                  <tr key={r.modul} className="align-top">
                    <th scope="row" className="p-3 font-semibold text-neutral-900 border-b border-neutral-100 text-left whitespace-nowrap">{r.modul}</th>
                    <td className="p-3 text-neutral-700 border-b border-neutral-100">{r.variant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-neutral-600">
            Poenget er ikke å eksperimentere for eksperimentets skyld, men å erstatte gjetning med kunnskap
            — trygt, åpent og med reservasjonsrett — slik at tjenesten blir bedre for alle over tid.
          </p>
        </Seksjon>

        <div className="mt-10 rounded-lg bg-blueberry-900 text-white p-8">
          <h2 className="text-2xl font-bold mb-2">Prøv forsøket</h2>
          <p className="text-blueberry-100 mb-5 max-w-xl">
            Gå gjennom Helsemelding 1.3. På helsekompetanse-steget blir du tilfeldig plassert — og du kan
            utforske begge armene.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/helsemelding-1-3" className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-blueberry-900 hover:bg-blueberry-50 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blueberry-900">
              Start Helsemelding 1.3
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/helsemelding-1-2/om" className="inline-flex items-center gap-2 rounded-md border border-white/60 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white">
              Om helsekompetanse (1.2)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
