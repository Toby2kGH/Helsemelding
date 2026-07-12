import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ForebyggingSeksjon } from "@/components/ForebyggingSeksjon";

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

// De fem mobiliseringsdimensjonene fra artikkelen, oversatt til konkret
// funksjonalitet i Helsemelding.
const dimensjoner = [
  {
    nr: "1",
    navn: "Retning",
    fraArtikkelen:
      "Å skape en tydelig og meningsfull felles forståelse av hvorfor transformasjonen er nødvendig.",
    iHelsemelding:
      "Helsemeldingens «hvorfor» flyttes fra datakvalitet i PLL til pasientens opplevelse av trygghet og sammenheng i hele forløpet. Samme skjema, ny fortelling: dette er ikke et registreringskrav, men et felles utgangspunkt for alle som er med rundt deg.",
  },
  {
    nr: "2",
    navn: "Aktørlandskap",
    fraArtikkelen:
      "Å se hvem som faktisk må være med for at transformasjonen skal lykkes: sykehus, kommuner, fastleger, pasienter, pårørende, fagmyndigheter og andre partnere.",
    iHelsemelding:
      "Helsemeldingen kobles ikke bare pasient mot register, men gjøres til et delt objekt mellom fastlege, sykehus, hjemmetjeneste, kommune og pårørende. Pasienten velger hvem som skal se hva — meldingen blir et felles bilde, ikke fem parallelle.",
  },
  {
    nr: "3",
    navn: "Eierskap",
    fraArtikkelen:
      "Å gjøre transformasjonen til noe flere opplever som sitt eget ansvar — ikke bare noe som er bestemt av toppledelsen.",
    iHelsemelding:
      "Pasienten og pårørende går fra å bekrefte data til å være medskapere: de kan legge til hva som er viktig for dem, hva de er utrygge på, og hva de trenger hjelp til i overgangene. Meldingen eies nedenfra, ikke ovenfra.",
  },
  {
    nr: "4",
    navn: "Koordinering",
    fraArtikkelen:
      "Å sikre at mange initiativer, aktører og nivåer trekker i samme retning, slik at energien ikke fragmenteres eller drukner i drift.",
    iHelsemelding:
      "Helsemeldingen følger pasienten gjennom overgangene og bærer med seg kontekst fra ett ledd til det neste. Ved utskrivning blir den en felles overgangsmelding som mobiliserer kommune, fastlege, hjemmetjeneste og pårørende samtidig — i stedet for hver for seg.",
  },
  {
    nr: "5",
    navn: "Læring",
    fraArtikkelen:
      "Å arbeide systematisk med utprøving, erfaringer, feil og kunnskapsdeling, fordi løsningene må læres fram underveis.",
    iHelsemelding:
      "Aggregerte og anonymiserte mønstre fra mange helsemeldinger viser hvor pasienter faktisk mister trygghet i overgangene. Det gir helsefellesskapene et konkret grunnlag for løpende læring — ikke evaluering til slutt, men innsikt underveis.",
  },
];

// Reframing-tabell: fra styringslogikk (1.0) til mobiliseringslogikk (1.1).
const reframe = [
  {
    dimensjon: "Type utfordring",
    v10: "Komplisert: få riktig data inn i riktig register",
    v11: "Kompleks: skape sammenheng for pasienten på tvers av mange aktører",
  },
  {
    dimensjon: "Formål",
    v10: "Korrekt legemiddelliste og økt etterlevelse",
    v11: "Felles trygghet og sammenheng i hele pasientforløpet",
  },
  {
    dimensjon: "Aktører",
    v10: "Pasient ↔ register (PLL, SYSVAK, kjernejournal)",
    v11: "Hele aktørlandskapet rundt pasienten, koblet gjennom ett delt objekt",
  },
  {
    dimensjon: "Rolle for pasient og pårørende",
    v10: "Bekrefter og korrigerer opplysninger",
    v11: "Medskapere som forteller hva som er viktig og hvor det svikter",
  },
  {
    dimensjon: "Overganger",
    v10: "Usynlige — meldingen bor hos pasienten",
    v11: "Selve poenget — meldingen bærer kontekst gjennom overgangene",
  },
  {
    dimensjon: "Læring",
    v10: "Årlig evaluering av om tiltaket virket",
    v11: "Løpende signaler aggregert til helsefellesskapet",
  },
  {
    dimensjon: "Ledelseslogikk",
    v10: "Nasjonal tjeneste som rulles ut ovenfra",
    v11: "Virkemiddel som mobiliserer aktørene rundt pasientens samlede behov",
  },
];

export default function Helsemelding11() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-blueberry-900 text-white py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-cherry-500 px-2.5 py-0.5 text-xs font-bold text-white">
              1.1
            </span>
            <span className="text-blueberry-100 text-sm font-medium">
              Alternativ mobiliserende versjon
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-3">
            Helsemelding som virkemiddel for mobilisering
          </h1>
          <p className="text-blueberry-100 text-lg max-w-2xl">
            En videreutvikling av Helsemelding — fra pasientstyrt datakvalitet til
            et felles verktøy som syr sammen aktørene i helseøkosystemet rundt
            pasientens samlede behov.
          </p>
          <div className="mt-6 inline-flex items-start gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm text-blueberry-100 max-w-2xl">
            <span aria-hidden="true">📄</span>
            <span>
              Bygger på artikkelen <em>«Fremtidens norske helsevesen skapes i
              fellesskap»</em> (Frafjord, Voss, Wegener &amp; Barlebo Rasmussen, 2026).
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">

        {/* Navigasjon */}
        <nav aria-label="Innhold på siden" className="mb-10 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-semibold text-neutral-700 mb-2">Innhold:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blueberry-700">
            <li><a href="#ide" className="hover:underline focus:outline-none focus:underline">Ideen: helsemelding som mobilisering</a></li>
            <li><a href="#komplekst" className="hover:underline focus:outline-none focus:underline">Fra komplisert til komplekst</a></li>
            <li><a href="#reframe" className="hover:underline focus:outline-none focus:underline">Fra versjon 1.0 til 1.1</a></li>
            <li><a href="#dimensjoner" className="hover:underline focus:outline-none focus:underline">De fem mobiliseringsdimensjonene</a></li>
            <li><a href="#overganger" className="hover:underline focus:outline-none focus:underline">Overgangene avgjør helheten</a></li>
            <li><a href="#forebygging" className="hover:underline focus:outline-none focus:underline">Forebygging som ikke drukner</a></li>
            <li><a href="#helsefellesskap" className="hover:underline focus:outline-none focus:underline">Helsefellesskapet som motor</a></li>
            <li><a href="#parorende" className="hover:underline focus:outline-none focus:underline">Pårørende og forebygging</a></li>
            <li><a href="#praksis" className="hover:underline focus:outline-none focus:underline">Læring tett på praksis</a></li>
            <li><a href="#design" className="hover:underline focus:outline-none focus:underline">Hva dette betyr for designet</a></li>
          </ol>
        </nav>

        <Seksjon id="ide" ikon="🎯" tittel="Ideen: helsemelding som mobilisering">
          <p>
            Den opprinnelige Helsemeldingen løser et reelt og viktig problem: den lar
            pasienten bekrefte og korrigere sin egen legemiddelliste, slik at PLL og
            kjernejournal blir mer korrekte. Men den er tenkt som en <strong>nasjonal
            tjeneste som rulles ut</strong> — en styrings- og implementeringslogikk der
            pasienten fyller inn riktige data, og verdien måles i datakvalitet.
          </p>
          <p>
            Artikkelen <em>«Fremtidens norske helsevesen skapes i fellesskap»</em> peker
            på at de viktigste utfordringene ikke lenger kan løses innenfor én avdeling,
            én profesjon eller én styringslinje. De oppstår i <strong>overgangene</strong>{" "}
            — mellom sykehus og kommune, mellom behandling og forebygging, mellom
            fagmiljøer. Verdien for pasienten skapes ikke ett sted, men i samspillet
            mellom mange.
          </p>
          <div className="rounded-lg border-l-4 border-cherry-500 bg-cherry-100 p-5">
            <p className="font-semibold text-cherry-700 mb-1">Grunntanken i versjon 1.1</p>
            <p className="text-neutral-700">
              Helsemeldingen kan være et <strong>virkemiddel for å sy sammen
              mobiliseringen på tvers av aktørene i økosystemet</strong>. I stedet for å
              være pasientens private bekreftelse mot et register, blir den et delt objekt
              som samler pasient, fastlege, sykehus, kommune og pårørende rundt det samme
              bildet — særlig i overgangene der helheten enten lykkes eller svikter.
            </p>
          </div>
        </Seksjon>

        <Seksjon id="komplekst" ikon="🧭" tittel="Fra komplisert til komplekst">
          <p>
            Artikkelen bruker Cynefin-rammeverket til å skille mellom det{" "}
            <strong>kompliserte</strong> og det <strong>komplekse</strong>. Mye av
            medisinen er komplisert, men ikke kompleks: en prosedyre eller en
            registeroppdatering er krevende, men har klare sammenhenger mellom tiltak og
            resultat. Versjon 1.0 av Helsemeldingen er bygget for nettopp dette domenet —
            få riktig informasjon inn i PLL.
          </p>
          <p>
            Den eldre pasienten med flere kroniske sykdommer lever derimot i det{" "}
            <strong>komplekse domenet</strong>. Behovet er ikke først og fremst én
            fremragende behandling, men et sammenhengende forløp på tvers av sykehus,
            fastlege, kommune, pårørende og digitale løsninger i hjemmet. Her kan vi ikke
            analysere oss fram til svaret på forhånd — vi må prøve ut, lære og aktivere
            aktørene rundt en felles retning.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-sm font-semibold text-neutral-900 mb-1">Styring alene</p>
              <p className="text-sm text-neutral-700">
                Løser det kompliserte: standardisering, presisjon, kontroll. Nødvendig for
                pasientsikkerhet, beredskap og regelverk.
              </p>
            </div>
            <div className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-4">
              <p className="text-sm font-semibold text-blueberry-900 mb-1">Styring + mobilisering</p>
              <p className="text-sm text-neutral-700">
                Kreves når ingen aktør har hele løsningen alene. Skaper felles forståelse,
                eierskap, læring og bevegelse på tvers.
              </p>
            </div>
          </div>
          <p>
            Versjon 1.1 forkaster ikke datakvaliteten fra 1.0 — den beholder den, men
            legger mobiliseringslogikken oppå. Meldingen skal fortsatt være presis der det
            trengs, men den skal <em>i tillegg</em> skape bevegelse på tvers.
          </p>
        </Seksjon>

        <Seksjon id="reframe" ikon="🔄" tittel="Fra versjon 1.0 til 1.1">
          <p>
            Det samme verktøyet, sett gjennom to ulike ledelseslogikker. Tabellen speiler
            artikkelens skille mellom <em>styring og implementering</em> og{" "}
            <em>mobilisering av transformasjon</em>.
          </p>
          <div className="overflow-x-auto rounded-lg border border-neutral-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-50 text-left">
                  <th scope="col" className="p-3 font-semibold text-neutral-700 border-b border-neutral-200">
                    Dimensjon
                  </th>
                  <th scope="col" className="p-3 font-semibold text-neutral-700 border-b border-neutral-200">
                    Helsemelding 1.0 <span className="font-normal text-neutral-400">(styring)</span>
                  </th>
                  <th scope="col" className="p-3 font-semibold text-blueberry-900 border-b border-neutral-200 bg-blueberry-50">
                    Helsemelding 1.1 <span className="font-normal text-blueberry-500">(mobilisering)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {reframe.map((r) => (
                  <tr key={r.dimensjon} className="align-top">
                    <th scope="row" className="p-3 font-semibold text-neutral-900 border-b border-neutral-100 text-left">
                      {r.dimensjon}
                    </th>
                    <td className="p-3 text-neutral-600 border-b border-neutral-100">{r.v10}</td>
                    <td className="p-3 text-neutral-800 border-b border-neutral-100 bg-blueberry-50/50">{r.v11}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Seksjon>

        <Seksjon id="dimensjoner" ikon="🧩" tittel="De fem mobiliseringsdimensjonene">
          <p>
            Artikkelen løfter fram fem dimensjoner ved mobilisering som ledelsesoppgave.
            Her er hver av dem oversatt til konkret funksjonalitet i Helsemeldingen.
          </p>
          <div className="space-y-4 not-prose">
            {dimensjoner.map((d) => (
              <div key={d.navn} className="rounded-lg border border-neutral-200 bg-white p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blueberry-900 text-sm font-bold text-white">
                    {d.nr}
                  </span>
                  <h3 className="text-lg font-semibold text-blueberry-900">{d.navn}</h3>
                </div>
                <p className="text-sm text-neutral-500 italic mb-2">
                  Fra artikkelen: {d.fraArtikkelen}
                </p>
                <p className="text-sm text-neutral-800">
                  <span className="font-semibold text-blueberry-700">I Helsemeldingen: </span>
                  {d.iHelsemelding}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border-l-4 border-blueberry-500 bg-blueberry-50 p-4">
            <p className="text-sm text-neutral-700">
              Dimensjonene henger sammen: <strong>retning</strong> uten{" "}
              <strong>eierskap</strong> skaper lite bevegelse, <strong>eierskap</strong>{" "}
              uten <strong>koordinering</strong> gir spredte initiativer, og{" "}
              <strong>læring</strong> uten et tydelig <strong>aktørlandskap</strong> blir
              intern utvikling i stedet for systemisk endring. Helsemeldingen må derfor
              treffe alle fem samtidig.
            </p>
          </div>
        </Seksjon>

        <Seksjon id="overganger" ikon="🌉" tittel="Overgangene avgjør helheten">
          <p>
            Det er i overgangen mellom aktørene at helheten enten lykkes eller svikter.
            En eldre pasient som skrives ut etter en akutt innleggelse er medisinsk
            stabilisert, men den reelle tryggheten avgjøres først når kommunen er klar til
            å ta imot, fastlegen forstår hva som er endret, hjemmetjenesten har riktig
            informasjon og pårørende vet hva de skal følge med på.
          </p>
          <div className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-5">
            <h3 className="text-lg font-semibold text-blueberry-900 mb-2">
              Helsemeldingen som overgangsmelding
            </h3>
            <p className="text-sm text-neutral-700 mb-3">
              Ved en overgang — som utskrivning — aktiveres helsemeldingen som et felles
              objekt som mobiliserer aktørene <strong>samtidig</strong> i stedet for hver
              for seg:
            </p>
            <ul className="space-y-2">
              {[
                "Kommunen ser hva som faktisk skal følges opp, ikke bare en epikrise",
                "Fastlegen får med seg hva som er endret og hvorfor",
                "Hjemmetjenesten har oppdatert legemiddel- og kritisk informasjon",
                "Pårørende ser hva de skal følge med på, og hvem de kontakter",
                "Pasienten opplever at overgangene henger sammen",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-neutral-800">
                  <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">→</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <p>
            Dermed unngår vi at én aktørs løsning blir en annen aktørs problem. Utskrivningen
            forstås ikke lenger som sykehusets avslutning på et forløp, men som en felles
            overgang i et økosystem.
          </p>
        </Seksjon>

        <Seksjon id="forebygging" ikon="🌱" tittel="Forebygging som ikke drukner">
          <p>
            Artikkelen peker på at forebygging lett faller mellom stolene: alle gjør noe,
            men ingen eier hele oppgaven. Helsemeldingen er et fast, årlig kontaktpunkt der
            denne oppgaven kan mobiliseres — ved å koble deg til de forebyggingsrådene og
            de lokale tjenestene som faktisk er relevante for deg.
          </p>
          <div className="rounded-lg border-l-4 border-cherry-500 bg-cherry-100 p-5">
            <p className="font-semibold text-cherry-700 mb-1">Utfordringen: det blir fort for mye</p>
            <p className="text-neutral-700">
              Det finnes svært mange gode offentlige råd om aktivitet, fall, psykisk helse,
              skjermbruk og mer. Legger vi dem alle på bordet, drukner det viktige i det
              generelle. Svaret er ikke å finne <em>riktig antall</em> lenker, men å aldri
              vise en katalog: helsemeldingen vet allerede alder, bosted og livssituasjon,
              og <strong>filtrerer</strong> til de få rådene som gjelder deg.
            </p>
          </div>
          <p>
            Prøv det under — bytt profil eller oppgi en livssituasjon, og se hvordan settet
            endrer seg. Hver bruker møter et kort, relevant utvalg, ikke alt på én gang:
          </p>

          <ForebyggingSeksjon />

          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 mt-2">
            <p className="text-sm font-semibold text-neutral-900 mb-2">
              Slik holdes det håndterbart når lenkene blir mange
            </p>
            <ul className="space-y-1.5">
              {[
                "Personalisering, ikke katalog: regler kobler alder, kommune, diagnoser og livssituasjon mot et lite utvalg råd.",
                "Én kilde per råd: hvert kort peker til én offentlig, redaksjonelt vedlikeholdt kilde — ikke en lenkeliste.",
                "Verifiserte lenker: temaer uten en kvalitetssikret delenke vises uten lenke, aldri som en gjetting.",
                "Tydelig innramming: «bare tips og lenker», ikke personlige medisinske anbefalinger.",
                "Utvidelse er et datavedlikehold: nye råd legges i en tabell noen eier og oppdaterer, uten at grensesnittet vokser.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="text-success-700 font-bold mt-0.5" aria-hidden="true">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Seksjon>

        <Seksjon id="helsefellesskap" ikon="🤝" tittel="Helsefellesskapet som motor">
          <p>
            Helsefellesskapene er allerede etablert som arenaer for samarbeid mellom
            sykehus og kommuner, med brukere, ansatte og fastleger representert. Men
            potensialet ligger ikke i at de finnes — det ligger i hvordan de brukes. Blir
            de bare møtearenaer for orientering og rapportering, utløser de lite kraft.
            Brukes de til felles prioritering, læring og utvikling, kan de bli en motor i
            transformasjonen.
          </p>
          <p>
            Aggregerte og anonymiserte mønstre fra mange helsemeldinger gir
            helsefellesskapene et konkret grunnlag å samles om:
          </p>
          <ul className="space-y-1.5">
            {[
              "Hvor i overgangene mister pasientene trygghet, systematisk sett?",
              "Hvilke oppgaver bør løses annerledes eller nærmere pasienten?",
              "Hvor oppstår avvik mellom det pasienten faktisk gjør og det registrene viser?",
              "Hva må aktørene lære på tvers for å få det til?",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">•</span>
                {t}
              </li>
            ))}
          </ul>
          <p>
            Slik blir helsemeldingen ikke bare et pasientverktøy, men et felles
            datagrunnlag som gjør helsefellesskapet til en <strong>strategisk arena for
            transformasjon</strong> — ikke bare koordinering av eksisterende tjenester.
          </p>
        </Seksjon>

        <Seksjon id="parorende" ikon="👥" tittel="Pårørende og forebygging">
          <p>
            Alle er enige om at forebygging er viktig, men ansvaret passer sjelden inn i
            én enkeltorganisasjon: sykehuset møter pasienten når sykdommen allerede har
            utviklet seg, kommunen kommer kanskje for sent inn, fastlegen ser risikobildet,
            men har begrenset tid, og frivillige og lokalsamfunn er løst koblet til det
            offentlige. Alle gjør noe, men ingen eier hele oppgaven.
          </p>
          <p>
            En mobiliserende helsemelding kan bli et av de faste kontaktpunktene der denne
            oppgaven kan mobiliseres:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-200 p-4">
              <p className="font-semibold text-neutral-900 mb-1">Pårørende som medskapere</p>
              <p className="text-sm text-neutral-700">
                Pårørende får en tydelig rolle i meldingen — de kan bidra med
                observasjoner, se hva de skal følge med på, og selv oppleve trygghet. Ikke
                interessenter som informeres, men medskapere.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 p-4">
              <p className="font-semibold text-neutral-900 mb-1">Et proaktivt kontaktpunkt</p>
              <p className="text-sm text-neutral-700">
                Den årlige meldingen kan koble pasienten til lavterskeltilbud, frivillige og
                lokalsamfunn — slik at forebygging ikke faller mellom stolene, men får en
                fast anledning til å mobiliseres.
              </p>
            </div>
          </div>
        </Seksjon>

        <Seksjon id="praksis" ikon="🩺" tittel="Læring tett på praksis">
          <p>
            Transformasjonen avgjøres ikke i styrerommet, men tett på driften — i møtet
            mellom ledere, fagmiljøer, medarbeidere og pasienter. Artikkelen løfter fram
            nivå 3- og 4-ledere (avdelings- og seksjonsledere) som de som oversetter
            strategi til klinisk hverdag, og som ofte får for lite oppmerksomhet i
            mobiliseringen.
          </p>
          <p>
            En mobiliserende helsemelding gir nettopp disse lederne noe konkret å lede med:
            reelle signaler om hvor forløpene svikter, og et delt objekt de kan bruke til å
            endre utskrivningspraksis, dialogen med kommunen og oppgavefordelingen i teamet.
            Erfaringene kan så deles på tvers — mellom sykehus, mellom regioner, og i
            nordiske nettverk som <strong>NUHA</strong> — slik at vi ikke får fire parallelle
            læringsreiser, men én samlet evne til å lære på tvers.
          </p>
          <div className="rounded-lg border-l-4 border-success-700 bg-success-100 p-4">
            <p className="text-sm text-neutral-700">
              Læring skjer ikke til slutt, når et prosjekt er ferdig. Den bygges inn i selve
              verktøyet: hver helsemelding er både et bidrag til pasientens forløp{" "}
              <em>og</em> en kilde til systemets læring.
            </p>
          </div>
        </Seksjon>

        <Seksjon id="design" ikon="✅" tittel="Hva dette betyr for designet">
          <p>
            Konkret hva som endres når Helsemeldingen tenkes som virkemiddel for
            mobilisering fremfor bare pasientstyrt datakvalitet:
          </p>
          <div className="space-y-2 not-prose">
            {[
              {
                fra: "Pasienten bekrefter data mot et register",
                til: "Pasient og pårørende medskaper et delt bilde flere aktører kan se",
              },
              {
                fra: "Rapport sendes til fastlege og sykehus",
                til: "Meldingen følger pasienten gjennom overgangene og mobiliserer aktørene samtidig",
              },
              {
                fra: "Fokus på legemidler, vaksiner og samtykker",
                til: "I tillegg: hva er viktig for deg, hvor er du utrygg, hva trenger du i overgangene",
              },
              {
                fra: "Årlig evaluering av datakvalitet",
                til: "Løpende, anonymiserte signaler til helsefellesskapet om hvor forløpene svikter",
              },
              {
                fra: "En nasjonal tjeneste som rulles ut",
                til: "Et felles verktøy aktørene i økosystemet tar eierskap til og lærer av sammen",
              },
            ].map((r) => (
              <div key={r.fra} className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-4 sm:flex-row sm:items-center">
                <div className="flex-1 text-sm text-neutral-500">
                  <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400 block mb-0.5">Fra</span>
                  {r.fra}
                </div>
                <ArrowRightIcon className="hidden h-5 w-5 flex-shrink-0 text-blueberry-500 sm:block" aria-hidden="true" />
                <div className="flex-1 text-sm text-neutral-900">
                  <span className="text-xs font-semibold uppercase tracking-wide text-blueberry-500 block mb-0.5">Til</span>
                  {r.til}
                </div>
              </div>
            ))}
          </div>
        </Seksjon>

        {/* CTA */}
        <div className="mt-10 rounded-lg bg-blueberry-900 text-white p-8">
          <h2 className="text-2xl font-bold mb-2">Utforsk grunnlaget</h2>
          <p className="text-blueberry-100 mb-5 max-w-xl">
            Dette er et konseptnotat som bygger videre på den opprinnelige Helsemeldingen.
            Se bakgrunnen for versjon 1.0, eller prøv demoflyten med en fiktiv brukerprofil.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/om-helsemelding"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-blueberry-900 hover:bg-blueberry-50 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blueberry-900"
            >
              Om Helsemelding 1.0
            </Link>
            <Link
              href="/logg-inn"
              className="inline-flex items-center gap-2 rounded-md border border-white/60 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white"
            >
              Start demo
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs text-neutral-400">
          Kilde: Frafjord, A. M., Voss, P. R., Wegener, K. M. &amp; Barlebo Rasmussen, S.
          (2026). <em>Fremtidens norske helsevesen skapes i fellesskap.</em> Konseptnotatet
          er en demo og ikke offisiell Helsenorge-dokumentasjon.
        </p>
      </div>
    </div>
  );
}
