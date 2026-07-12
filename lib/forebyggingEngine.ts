import type { UserProfile } from "@/types";

/**
 * Forebyggingsmotoren — en enkel, generisk regelmotor som kobler pasientens
 * alder, kommune, diagnoser og livssituasjon mot offentlige forebyggingsråd.
 *
 * Poenget er IKKE å vise en katalog av lenker, men å filtrere: hver bruker ser
 * bare de få rådene som er relevante for dem. Slik unngår vi at forebygging
 * «drukner» i for mye informasjon.
 *
 * Lenker: alle eksterne lenker peker til de fire offentlige kildene som er
 * verifisert i denne demoen (Helsenorge, Helsedirektoratet, Helsebiblioteket).
 * Nye temaer (kosthold, psykisk helse, svangerskap m.m.) er markert med
 * `kildeMangler` og vises uten delenke til de er kvalitetssikret — de er tatt
 * med for å illustrere hvordan flere aldersbånd kan dekkes.
 *
 * Dette er tips og pekere — ikke personlige medisinske anbefalinger.
 */

// Verifiserte, offentlige kilder (bekreftet i dialog / oppgitt av redaksjon)
const LENKE = {
  fysiskAktivitetVoksne:
    "https://www.helsenorge.no/trening-og-fysisk-aktivitet/rad-om-fysisk-aktivitet/",
  fysiskAktivitetBarn:
    "https://www.helsedirektoratet.no/faglige-rad/fysisk-aktivitet-i-forebygging-og-behandling/barn-og-unge/barn-unge-6-17-ar-rad-anbefaling-fysisk-aktivitet",
  fallforebygging:
    "https://www.helsebiblioteket.no/innhold/nasjonale-faglige-rad/fallforebygging-hos-eldre",
  skjermraad: "https://www.helsenorge.no/psykisk-helse/skjermrad/",
} as const;

export type Livssituasjon = "barn_6_17" | "smaa_barn" | "gravid";

export interface ForebyggingRaad {
  id: string;
  tema: string;
  ikon: string;
  tittel: string;
  tekst: string;
  hvorfor: string;
  kilde: string;
  /** Ekstern delenke til offentlig kilde. Utelates når kilden ikke er verifisert ennå. */
  lenke?: string;
  /** true = temaet er relevant, men mangler en kvalitetssikret delenke i demoen. */
  kildeMangler?: boolean;
  aldersgruppe: string;
  prioritet: "høy" | "middels" | "lav";
}

export interface TjenesteNaerDeg {
  navn: string;
  beskrivelse: string;
}

const harDiagnose = (profil: UserProfile, ...diagnoser: string[]) =>
  diagnoser.some((d) =>
    profil.diagnoser.some((pd) => pd.toLowerCase().includes(d.toLowerCase()))
  );

/**
 * Beregner et kort, personalisert sett med forebyggingsråd.
 *
 * @param alder  effektiv alder å regne på (kan overstyres i demoen for å vise
 *               hvordan aldersbåndene endrer seg over et helt livsløp).
 * @param livssituasjoner valgfrie flagg brukeren selv oppgir (registrene har dem sjelden).
 */
export function beregnForebygging(
  profil: UserProfile,
  alder: number = profil.alder,
  livssituasjoner: Set<Livssituasjon> = new Set()
): ForebyggingRaad[] {
  const raad: ForebyggingRaad[] = [];
  const kronisk = harDiagnose(
    profil,
    "diabetes",
    "astma",
    "hjerte",
    "hypertensjon",
    "osteoporose",
    "endometriose"
  );

  // ── Aldersbånd: fysisk aktivitet som ryggrad, differensiert over livsløpet ──

  if (alder <= 5) {
    raad.push({
      id: "smaabarn-lek",
      tema: "Små barn (0–5 år)",
      ikon: "🧸",
      tittel: "Aktivitet, søvn og skjerm i småbarnsalder",
      tekst:
        "Små barn trenger variert bevegelse gjennom lek hver dag, god søvn og lite skjerm. Helsestasjonen følger opp utvikling og vaksiner.",
      hvorfor: `Vist fordi alderen er ${alder} år.`,
      kilde: "Helsenorge",
      lenke: LENKE.skjermraad,
      aldersgruppe: "0–5 år",
      prioritet: "middels",
    });
  } else if (alder <= 17) {
    const ungdom = alder >= 13;
    raad.push({
      id: "barn-aktivitet",
      tema: ungdom ? "Ungdom (13–17 år)" : "Barn (6–12 år)",
      ikon: "⚽",
      tittel: "Minst 60 minutter aktivitet hver dag",
      tekst:
        "Barn og unge bør være i bevegelse minst 60 minutter daglig. Rådene beskriver hva som gjelder for ulike aldersgrupper.",
      hvorfor: `Vist fordi alderen er ${alder} år.`,
      kilde: "Helsedirektoratet",
      lenke: LENKE.fysiskAktivitetBarn,
      aldersgruppe: "6–17 år",
      prioritet: "middels",
    });
    if (ungdom) {
      raad.push({
        id: "ungdom-psykisk",
        tema: "Ungdom (13–17 år)",
        ikon: "💬",
        tittel: "Søvn, skjerm og psykisk helse",
        tekst:
          "Nok søvn, balansert skjermbruk og noen å snakke med er viktig i ungdomsårene. Skolehelsetjenesten og helsestasjon for ungdom er lavterskeltilbud.",
        hvorfor: "Vist fordi alderen er i ungdomsgruppen.",
        kilde: "Helsenorge",
        lenke: LENKE.skjermraad,
        aldersgruppe: "13–17 år",
        prioritet: "middels",
      });
    }
  } else if (alder <= 39) {
    raad.push({
      id: "fa-ung-voksen",
      tema: "Unge voksne (18–39 år)",
      ikon: "🏃",
      tittel: "Råd om fysisk aktivitet for voksne",
      tekst:
        "Anbefalingen er 150–300 minutter moderat aktivitet i uka, i tillegg til styrkeøvelser et par ganger i uka.",
      hvorfor: `Vist fordi alderen er ${alder} år${kronisk ? " og du har en kronisk tilstand der aktivitet er ekstra viktig" : ""}.`,
      kilde: "Helsenorge",
      lenke: LENKE.fysiskAktivitetVoksne,
      aldersgruppe: "18–39 år",
      prioritet: kronisk ? "høy" : "lav",
    });
  } else if (alder <= 64) {
    raad.push({
      id: "fa-midtliv",
      tema: "Voksen (40–64 år)",
      ikon: "🚴",
      tittel: "Aktivitet og styrke i midtlivet",
      tekst:
        "Fra 40-årene er styrketrening og regelmessig aktivitet spesielt viktig for hjerte, muskler og vekt. Samme ukesmål som for yngre voksne gjelder.",
      hvorfor: `Vist fordi alderen er ${alder} år${kronisk ? " og du har kronisk sykdom" : ""}.`,
      kilde: "Helsenorge",
      lenke: LENKE.fysiskAktivitetVoksne,
      aldersgruppe: "40–64 år",
      prioritet: kronisk ? "høy" : "middels",
    });
    raad.push({
      id: "midtliv-livsstil",
      tema: "Voksen (40–64 år)",
      ikon: "❤️",
      tittel: "Hjerte- og karhelse",
      tekst:
        "Blodtrykk, kolesterol, røyk, alkohol og kosthold påvirker risikoen for hjerte- og karsykdom. Mange kommuner har frisklivssentral som hjelper med varige endringer.",
      hvorfor: "Vist fordi risikoen for livsstilssykdommer øker med alderen.",
      kilde: "Frisklivssentral (kommunal)",
      kildeMangler: true,
      aldersgruppe: "40–64 år",
      prioritet: "lav",
    });
  } else {
    // 65+
    raad.push({
      id: "fa-eldre",
      tema: "Eldre (65+ år)",
      ikon: "🚶",
      tittel: "Aktivitet, styrke og balanse",
      tekst:
        "Rådet for eldre er minst 150 minutter moderat aktivitet i uka, og øvelser som styrker muskler og balanse et par ganger i uka. Det reduserer blant annet fallrisiko.",
      hvorfor: `Vist fordi alderen er ${alder} år${kronisk ? " og du har kronisk sykdom" : ""}.`,
      kilde: "Helsenorge",
      lenke: LENKE.fysiskAktivitetVoksne,
      aldersgruppe: "65+ år",
      prioritet: kronisk ? "høy" : "middels",
    });

    const kjentFallrisiko =
      (profil.kritiskInfo.annenKritiskInfo ?? "").toLowerCase().includes("fall");
    raad.push({
      id: "fall",
      tema: "Eldre (65+ år)",
      ikon: "🩹",
      tittel: "Forebygg fall",
      tekst:
        "Fall er den vanligste årsaken til skader hos eldre. Balansetrening, gjennomgang av legemidler og enkle tiltak i hjemmet kan redusere risikoen betydelig.",
      hvorfor: kjentFallrisiko
        ? "Vist fordi det er registrert økt fallrisiko i din kritiske informasjon."
        : `Vist fordi alderen er ${alder} år.`,
      kilde: "Helsebiblioteket — nasjonale faglige råd",
      lenke: LENKE.fallforebygging,
      aldersgruppe: "65+ år",
      prioritet: kjentFallrisiko ? "høy" : "middels",
    });

    if (alder >= 80) {
      raad.push({
        id: "ernaering-eldre",
        tema: "Eldre (80+ år)",
        ikon: "🍲",
        tittel: "Ernæring og væske",
        tekst:
          "Underernæring er vanlig og ofte oversett hos de eldste. Regelmessige måltider, nok protein og drikke er viktig — hjemmetjenesten og fastlegen kan følge opp.",
        hvorfor: `Vist fordi alderen er ${alder} år.`,
        kilde: "Helsedirektoratet",
        kildeMangler: true,
        aldersgruppe: "80+ år",
        prioritet: "middels",
      });
    }
  }

  // ── Livssituasjon: informasjon registrene sjelden har, brukeren oppgir selv ──

  if (livssituasjoner.has("barn_6_17") && !raad.some((r) => r.id === "barn-aktivitet")) {
    raad.push({
      id: "barn-aktivitet",
      tema: "Barn og unge",
      ikon: "⚽",
      tittel: "Fysisk aktivitet for barn (6–17 år)",
      tekst:
        "Barn og unge bør være i bevegelse minst 60 minutter hver dag. Rådene beskriver hva som gjelder for ulike aldersgrupper.",
      hvorfor: "Vist fordi du har oppgitt at du har barn i skolealder.",
      kilde: "Helsedirektoratet",
      lenke: LENKE.fysiskAktivitetBarn,
      aldersgruppe: "6–17 år",
      prioritet: "lav",
    });
  }

  if (
    (livssituasjoner.has("barn_6_17") || livssituasjoner.has("smaa_barn")) &&
    !raad.some((r) => r.id === "skjerm" || r.id === "smaabarn-lek" || r.id === "ungdom-psykisk")
  ) {
    raad.push({
      id: "skjerm",
      tema: "Barn og unge",
      ikon: "📱",
      tittel: "Skjermråd for familier",
      tekst:
        "Enkle råd om skjermbruk, søvn og samvær i familien. Ment som tips — ikke en fasit for hvor mye skjermtid som er «riktig».",
      hvorfor: "Vist fordi du har oppgitt at du har barn i husstanden.",
      kilde: "Helsenorge",
      lenke: LENKE.skjermraad,
      aldersgruppe: "Foreldre",
      prioritet: "lav",
    });
  }

  if (livssituasjoner.has("gravid")) {
    raad.push({
      id: "gravid",
      tema: "Svangerskap",
      ikon: "🤰",
      tittel: "Svangerskap og fødsel",
      tekst:
        "Jordmor og helsestasjon følger opp svangerskapet, med råd om aktivitet, kosthold, folat og vaksiner. Fastlegen kan henvise.",
      hvorfor: "Vist fordi du har oppgitt at du er gravid eller planlegger graviditet.",
      kilde: "Jordmor / helsestasjon (kommunal)",
      kildeMangler: true,
      aldersgruppe: "Svangerskap",
      prioritet: "høy",
    });
  }

  return raad;
}

/**
 * Generiske kommunale/lokale tilbud som «syr sammen» hvilke tjenester som
 * finnes der du bor. I en demo er disse illustrative — i en reell tjeneste
 * ville de vært koblet mot kommunens egne tjenestekataloger.
 */
export function tjenesterNaerDeg(profil: UserProfile, alder: number = profil.alder): TjenesteNaerDeg[] {
  const tjenester: TjenesteNaerDeg[] = [
    {
      navn: "Frisklivssentral",
      beskrivelse: "Kommunalt tilbud om hjelp til å endre levevaner — kosthold, aktivitet, søvn og tobakk.",
    },
  ];

  if (alder <= 20) {
    tjenester.push({
      navn: "Skolehelsetjeneste / helsestasjon for ungdom",
      beskrivelse: "Lavterskeltilbud for fysisk og psykisk helse, uten timeavtale.",
    });
  } else if (alder >= 65) {
    tjenester.push({
      navn: "Balanse- og styrkegruppe",
      beskrivelse: "Fallforebyggende trening i regi av kommunen eller fysioterapitjenesten.",
    });
    tjenester.push({
      navn: "Frivilligsentral og aktivitetstilbud",
      beskrivelse: "Fellesskap og aktivitet i nærmiljøet — mot ensomhet og for mestring.",
    });
  } else {
    tjenester.push({
      navn: "Rask psykisk helsehjelp",
      beskrivelse: "Lavterskeltilbud i mange kommuner — uten henvisning og ofte med kort ventetid.",
    });
  }

  return tjenester;
}
