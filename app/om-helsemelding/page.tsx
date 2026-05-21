import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface SeksjonProps {
  id: string;
  ikon: string;
  tittel: string;
  children: React.ReactNode;
}

function Seksjon({ id, ikon, tittel, children }: SeksjonProps) {
  return (
    <section id={id} className="mb-10" aria-labelledby={`${id}-heading`}>
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

export default function OmHelsemelding() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-blueberry-900 text-white py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-blueberry-100 text-sm font-medium mb-2">Bakgrunn og formål</div>
          <h1 className="text-4xl font-bold mb-3">Om Helsemelding</h1>
          <p className="text-blueberry-100 text-lg max-w-2xl">
            En ny nasjonal tjeneste for økt pasientsikkerhet og helseforståelse
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-warning-100 px-4 py-2 text-sm font-semibold text-warning-700">
            🔬 DEMO-APPLIKASJON — Ikke offisiell Helsenorge-dokumentasjon
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">

        {/* Navigasjon */}
        <nav aria-label="Innhold på siden" className="mb-10 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-semibold text-neutral-700 mb-2">Innhold:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blueberry-700">
            <li><a href="#problem" className="hover:underline focus:outline-none focus:underline">Bakgrunn og problem</a></li>
            <li><a href="#helsepersonell" className="hover:underline focus:outline-none focus:underline">Utfordringer for helsepersonell</a></li>
            <li><a href="#samtykke" className="hover:underline focus:outline-none focus:underline">Samtykkeutfordringer</a></li>
            <li><a href="#losning" className="hover:underline focus:outline-none focus:underline">Løsningen</a></li>
            <li><a href="#internasjonalt" className="hover:underline focus:outline-none focus:underline">Internasjonale erfaringer</a></li>
            <li><a href="#fremdrift" className="hover:underline focus:outline-none focus:underline">Fremdrift og videre arbeid</a></li>
          </ol>
        </nav>

        <Seksjon id="problem" ikon="📊" tittel="Bakgrunn og problem">
          <div className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-5">
            <h3 className="text-lg font-semibold text-blueberry-900 mb-3">
              Lav etterlevelse av legemiddelbehandling
            </h3>
            <p>
              Mellom 30 og 50 % av alle pasienter med kroniske sykdommer tar ikke medisinen sin
              som forskrevet (WHO, 2003; <em>Adherence to Long-term Therapies — Evidence for action</em>).
              Dette fører til:
            </p>
            <ul className="mt-3 space-y-1.5 list-none">
              {[
                "Unødvendige sykehusinnleggelser",
                "Dårligere sykdomskontroll",
                "Økte kostnader for helsetjenesten",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="text-cherry-700 font-bold mt-0.5" aria-hidden="true">•</span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              I norsk kontekst er dette særlig kritisk fordi Pasientens legemiddelliste (PLL) rulles
              ut nasjonalt 2026–2029, men er avhengig av at den informasjonen som legges inn er korrekt.
              Pasienten er den eneste som vet hva de faktisk tar mellom helsekontakter.
            </p>
            <p className="text-sm text-neutral-500 mt-3 italic">
              Kilde: WHO (2003). <em>Adherence to Long-term Therapies: Evidence for Action.</em>{" "}
              Geneva: World Health Organization.
            </p>
          </div>
        </Seksjon>

        <Seksjon id="helsepersonell" ikon="⚕️" tittel="Utfordringer for helsepersonell">
          <p>
            Helsepersonell bruker betydelig tid på å innhente opplysninger om hvilke medisiner
            pasienter faktisk tar. En norsk studie (Midlöv et al., <em>Eur J Clin Pharmacol</em>{" "}
            2005) viste at legemiddelfeil forekommer i opptil{" "}
            <strong className="text-cherry-700">67 % av innleggelser</strong> der
            legemiddelsamstemming ikke er systematisk gjennomført.
          </p>
          <p>
            I Norge peker Pasientsikkerhetsprogrammets <em>«I trygge hender 24-7»</em> eksplisitt
            på legemiddelsamstemming som en av de viktigste pasientsikkerhetsinnsatsene.
          </p>
          <div className="rounded-lg border-l-4 border-cherry-700 bg-cherry-100 p-4">
            <p className="font-semibold text-cherry-700 mb-1">Kritisk informasjon</p>
            <p className="text-neutral-700 text-sm">
              Informasjon om allergi, blodfortynnende behandling og aktive biologiske legemidler
              kan ha livsviktig betydning ved en øyeblikkelig hjelp-situasjon.
            </p>
          </div>
        </Seksjon>

        <Seksjon id="samtykke" ikon="📋" tittel="Samtykkeutfordringer">
          <p>I dag er det vanskelig å:</p>
          <ul className="space-y-1.5">
            {[
              "Få oversikt over alle samtykker man har gitt",
              "Gi et informert samtykke til forskning på riktig tidspunkt",
              "Trekke tilbake et samtykke effektivt",
              "Samle samtykker til kliniske kvalitetsregistre",
            ].map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">•</span>
                {p}
              </li>
            ))}
          </ul>
          <p>
            Personvernombudsordningen krever at institusjonene dokumenterer gyldige
            behandlingsgrunnlag. En nasjonal, digital samtykkeportal vil forenkle dette og styrke
            pasientenes rettigheter, i tråd med{" "}
            <strong>GDPR-forordningens artikkel 7</strong> og helseregisterloven.
          </p>
        </Seksjon>

        <Seksjon id="losning" ikon="💡" tittel="Løsningen">
          <div className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-5">
            <h3 className="text-lg font-semibold text-blueberry-900 mb-3">
              Helsemelding — en ny nasjonal modell
            </h3>
            <p className="mb-3">Inspirert av skattemeldingen tilbyr Helsemelding:</p>
            <ul className="space-y-2">
              {[
                "Forhåndsutfylte opplysninger fra PLL og SYSVAK",
                "Enkel bekreftelse eller korrigering av medisinbruk",
                "Personaliserte vaksineanbefalinger basert på FHI-retningslinjer",
                "Samlet samtykkehåndtering på ett sted",
                "Direkte integrasjon mot fastlege og kjernejournal",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <span className="text-success-700 font-bold mt-0.5" aria-hidden="true">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-neutral-900 mb-2">Effektmål:</h3>
            <ul className="space-y-1.5">
              {[
                "Øke helseforståelse (helsekompetanse) i befolkningen",
                "Redusere tidsbruk på innhenting av medisinopplysninger",
                "Bedre datakvalitet i PLL og kjernejournal",
                "Øke organdonasjonsregistreringer",
                "Forenkle samtykke til forskning og kvalitetsarbeid",
              ].map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm">
                  <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">→</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Seksjon>

        <Seksjon id="internasjonalt" ikon="🌍" tittel="Internasjonale erfaringer">
          <div className="space-y-4">
            {[
              {
                land: "🇩🇰 Danmark",
                tekst: `Fælles Medicinkort (FMK) deles på tvers av apotek, fastleger og sykehus.
                  Pasientens Medicinoplysninger er tilgjengelig via MinSundhed og sundhed.dk,
                  som brukes av over 4 millioner danskere.`,
              },
              {
                land: "🇫🇮 Finland",
                tekst: `My Kanta (Kela) har aktiv bruk hos over 90 % av yrkesaktive voksne (Jormanainen et al., 2023).
                  Inneholder samtykker, e-resepter og organdonasjonstestamente.`,
              },
              {
                land: "🇬🇧 Storbritannia",
                tekst: `NHS App ble brukt av nesten 40 millioner innbyggere i 2025 (NHS England, 24. desember 2025).
                  Over 500 000 første-gangs organdonasjonsbeslutninger er registrert via appen.`,
              },
            ].map((l) => (
              <div key={l.land} className="rounded-lg border border-neutral-200 p-4">
                <h3 className="font-semibold text-neutral-900 mb-1">{l.land}</h3>
                <p className="text-sm text-neutral-700">{l.tekst}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border-l-4 border-blueberry-500 bg-blueberry-50 p-4">
            <p className="text-neutral-700 text-sm">
              <strong>Norge er godt posisjonert:</strong> vi har NHN, Helsenorge, SYSVAK,
              kjernejournal og PLL i nasjonal forvaltning. Helsemelding vil binde disse tjenestene
              sammen til en helhetlig, brukerorientert opplevelse.
            </p>
          </div>
        </Seksjon>

        <Seksjon id="fremdrift" ikon="🗺️" tittel="Fremdrift og videre arbeid">
          <div className="space-y-3">
            {[
              {
                fase: "Fase 1",
                timing: "Nå (POC)",
                tekst: "Minimal viable product — Legemiddelgjennomgang i relasjon til PLL",
                aktiv: true,
              },
              {
                fase: "Fase 2",
                timing: "2026–2027",
                tekst: "Automatiske vaksineanbefalinger fra SYSVAK/FHI — Nasjonal samtykkemodul",
                aktiv: false,
              },
              {
                fase: "Fase 3",
                timing: "2027–2029",
                tekst: "Direkte kommunikasjon til fastlege og spesialisthelsetjeneste — Koblet mot sykehusenes innkomstprosedyrer",
                aktiv: false,
              },
            ].map((f) => (
              <div
                key={f.fase}
                className={`flex items-start gap-4 rounded-lg border p-4 ${
                  f.aktiv
                    ? "border-blueberry-500 bg-blueberry-50"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <div className={`flex-shrink-0 rounded-full px-2 py-1 text-xs font-bold ${
                  f.aktiv ? "bg-blueberry-900 text-white" : "bg-neutral-200 text-neutral-700"
                }`}>
                  {f.fase}
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-500 mb-0.5">{f.timing}</p>
                  <p className="text-sm text-neutral-700">{f.tekst}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 mt-4 text-sm text-neutral-700">
            <p className="font-semibold mb-1">Kontakt og videre arbeid</p>
            <p>
              Helsemelding er et konsept under utvikling.
              Har du innspill? Ta kontakt med Helsedirektoratet eller Norsk helsenett SF (NHN).
            </p>
          </div>
        </Seksjon>

        {/* CTA */}
        <div className="mt-10 rounded-lg bg-blueberry-900 text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Prøv demoen</h2>
          <p className="text-blueberry-100 mb-5">
            Utforsk Helsemelding-flyten med en av tre fiktive brukerprofiler.
          </p>
          <Link
            href="/logg-inn"
            className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-blueberry-900 hover:bg-blueberry-50 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blueberry-900"
          >
            Start demo
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
