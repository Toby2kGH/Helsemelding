import type { UserProfile } from "@/types";

/**
 * Forebyggingsmotoren — en enkel, generisk regelmotor som kobler pasientens
 * alder, kommune, diagnoser og livssituasjon mot offentlige forebyggingsråd.
 *
 * Poenget er IKKE å vise en katalog av lenker, men å filtrere: hver bruker ser
 * bare de få rådene som er relevante for dem. Slik unngår vi at forebygging
 * «drukner» i for mye informasjon.
 *
 * Alle lenker peker til offentlige, redaksjonelt vedlikeholdte kilder. Dette er
 * tips og pekere — ikke personlige medisinske anbefalinger.
 */

export type Livssituasjon = "barn_6_17" | "smaa_barn";

export interface ForebyggingRaad {
  id: string;
  tema: string;
  ikon: string;
  tittel: string;
  tekst: string;
  hvorfor: string;
  kilde: string;
  lenke: string;
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
 * Livssituasjoner er valgfrie flagg brukeren selv kan angi (f.eks. «har barn»),
 * fordi slik informasjon ikke alltid finnes i registrene.
 */
export function beregnForebygging(
  profil: UserProfile,
  livssituasjoner: Set<Livssituasjon> = new Set()
): ForebyggingRaad[] {
  const raad: ForebyggingRaad[] = [];

  // Fysisk aktivitet — tilpasset alder
  if (profil.alder >= 65) {
    const kronisk = harDiagnose(profil, "diabetes", "hjerte", "hypertensjon", "osteoporose");
    raad.push({
      id: "fa-eldre",
      tema: "Fysisk aktivitet",
      ikon: "🚶",
      tittel: "Aktivitet, styrke og balanse",
      tekst:
        "Rådet for eldre er minst 150 minutter moderat aktivitet i uka, og øvelser som styrker muskler og balanse et par ganger i uka. Det reduserer blant annet fallrisiko.",
      hvorfor: `Vist fordi du er ${profil.alder} år${kronisk ? " og har kronisk sykdom" : ""}.`,
      kilde: "Helsenorge",
      lenke: "https://www.helsenorge.no/trening-og-fysisk-aktivitet/rad-om-fysisk-aktivitet/",
      prioritet: kronisk ? "høy" : "middels",
    });
  } else if (profil.alder >= 18) {
    const kronisk = harDiagnose(profil, "diabetes", "astma", "endometriose");
    raad.push({
      id: "fa-voksen",
      tema: "Fysisk aktivitet",
      ikon: "🏃",
      tittel: "Råd om fysisk aktivitet for voksne",
      tekst:
        "Anbefalingen for voksne er 150–300 minutter moderat aktivitet i uka, i tillegg til styrkeøvelser et par ganger i uka.",
      hvorfor: `Vist fordi du er ${profil.alder} år${kronisk ? " og har en kronisk tilstand der aktivitet er ekstra viktig" : ""}.`,
      kilde: "Helsenorge",
      lenke: "https://www.helsenorge.no/trening-og-fysisk-aktivitet/rad-om-fysisk-aktivitet/",
      prioritet: kronisk ? "høy" : "middels",
    });
  }

  // Fallforebygging — for eldre (særlig relevant ved kjent fallrisiko)
  if (profil.alder >= 65) {
    const kjentFallrisiko =
      (profil.kritiskInfo.annenKritiskInfo ?? "").toLowerCase().includes("fall");
    raad.push({
      id: "fall",
      tema: "Fallforebygging",
      ikon: "🩹",
      tittel: "Forebygg fall",
      tekst:
        "Fall er den vanligste årsaken til skader hos eldre. Balansetrening, gjennomgang av legemidler og enkle tiltak i hjemmet kan redusere risikoen betydelig.",
      hvorfor: kjentFallrisiko
        ? "Vist fordi det er registrert økt fallrisiko i din kritiske informasjon."
        : `Vist fordi du er ${profil.alder} år.`,
      kilde: "Helsebiblioteket — nasjonale faglige råd",
      lenke: "https://www.helsebiblioteket.no/innhold/nasjonale-faglige-rad/fallforebygging-hos-eldre",
      prioritet: kjentFallrisiko ? "høy" : "middels",
    });
  }

  // Livssituasjon: barn i husstanden (informasjon registrene sjelden har)
  if (livssituasjoner.has("barn_6_17")) {
    raad.push({
      id: "barn-aktivitet",
      tema: "Barn og unge",
      ikon: "⚽",
      tittel: "Fysisk aktivitet for barn (6–17 år)",
      tekst:
        "Barn og unge bør være i bevegelse minst 60 minutter hver dag. Rådene beskriver hva som gjelder for ulike aldersgrupper.",
      hvorfor: "Vist fordi du har oppgitt at du har barn i skolealder.",
      kilde: "Helsedirektoratet",
      lenke: "https://www.helsedirektoratet.no/faglige-rad/fysisk-aktivitet-i-forebygging-og-behandling/barn-og-unge/barn-unge-6-17-ar-rad-anbefaling-fysisk-aktivitet",
      prioritet: "middels",
    });
  }

  if (livssituasjoner.has("barn_6_17") || livssituasjoner.has("smaa_barn")) {
    raad.push({
      id: "skjerm",
      tema: "Barn og unge",
      ikon: "📱",
      tittel: "Skjermråd for familier",
      tekst:
        "Enkle råd om skjermbruk, søvn og samvær i familien. Ment som tips — ikke som fasit for hvor mye skjermtid som er «riktig».",
      hvorfor: "Vist fordi du har oppgitt at du har barn i husstanden.",
      kilde: "Helsenorge",
      lenke: "https://www.helsenorge.no/psykisk-helse/skjermrad/",
      prioritet: "lav",
    });
  }

  return raad;
}

/**
 * Generiske kommunale/lokale tilbud som «syr sammen» hvilke tjenester som
 * finnes der du bor. I en demo er disse illustrative — i en reell tjeneste
 * ville de vært koblet mot kommunens egne tjenestekataloger.
 */
export function tjenesterNaerDeg(profil: UserProfile): TjenesteNaerDeg[] {
  const tjenester: TjenesteNaerDeg[] = [
    {
      navn: "Frisklivssentral",
      beskrivelse: "Kommunalt tilbud om hjelp til å endre levevaner — kosthold, aktivitet, søvn og tobakk.",
    },
  ];

  if (profil.alder >= 65) {
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
