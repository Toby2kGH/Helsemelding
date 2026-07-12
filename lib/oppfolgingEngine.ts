import type { UserProfile, MedicationResponse } from "@/types";

/**
 * Oppfølgingsmotoren — utleder konkrete oppfølgingsønsker fra det Helsemeldingen
 * allerede vet om deg, og ruter hvert ønske til riktig aktør (fastlege,
 * e-konsultasjon eller kommune). Slik kan innsikt bli til handling som faktisk
 * havner der den skal.
 */

export type Kanal = "fastlege" | "e-konsultasjon" | "kommune";

export interface Handling {
  id: string;
  tittel: string;
  begrunnelse: string;
  kanal: Kanal;
  krevesSamtykke?: boolean;
}

/** Forslag til «hva er viktig for meg» — pasientens egne mål. */
export const VIKTIG_FOR_MEG_FORSLAG = [
  "Bo trygt hjemme",
  "Klare meg selv i hverdagen",
  "Slippe sykehusinnleggelse",
  "Forstå medisinene mine",
  "Mindre bekymring",
  "Tid med familien",
];

export const KANAL_INFO: Record<Kanal, { navn: string; klasse: string }> = {
  fastlege: { navn: "Fastlege", klasse: "bg-blueberry-900 text-white" },
  "e-konsultasjon": { navn: "E-konsultasjon", klasse: "bg-blueberry-500 text-white" },
  kommune: { navn: "Kommune", klasse: "bg-success-700 text-white" },
};

/** Utleder konkrete oppfølgingsforslag fra profilen. */
export function utledHandlinger(profil: UserProfile): Handling[] {
  const handlinger: Handling[] = [];

  profil.vaksinanbefalinger
    .filter((v) => v.prioritet === "høy")
    .slice(0, 2)
    .forEach((v, i) =>
      handlinger.push({
        id: `vaksine-${i}`,
        tittel: `Avtale ${v.vaksine}`,
        begrunnelse: v.årsak,
        kanal: "fastlege",
      })
    );

  const fallrisiko = (profil.kritiskInfo.annenKritiskInfo ?? "")
    .toLowerCase()
    .includes("fall");
  if (fallrisiko) {
    handlinger.push({
      id: "legemiddelgjennomgang",
      tittel: "Legemiddelgjennomgang (fallrisiko)",
      begrunnelse: "Registrert fallrisiko og bruk av sovemedisin — bør vurderes samlet.",
      kanal: "fastlege",
    });
    handlinger.push({
      id: "balansegruppe",
      tittel: "Plass i balanse- og styrkegruppe",
      begrunnelse: "Fallforebyggende trening i kommunen.",
      kanal: "kommune",
      krevesSamtykke: true,
    });
  }

  if (profil.kroniskSykdomPlan.harKroniskSykdom) {
    handlinger.push({
      id: "kontroll",
      tittel: `Oppfølging av ${profil.kroniskSykdomPlan.sykdommer.join(" og ")}`,
      begrunnelse: "Årlig oppfølging av kronisk sykdom.",
      kanal: "e-konsultasjon",
    });
  }

  const flagget = profil.legemidler.behovs.find((m) => m.flagg);
  if (flagget) {
    handlinger.push({
      id: "spm-medisin",
      tittel: `Spørsmål om ${flagget.handelsnavn.toLowerCase()}`,
      begrunnelse: flagget.flagg ?? "",
      kanal: "e-konsultasjon",
    });
  }

  handlinger.push({
    id: "frisklivssentral",
    tittel: "Kontakt frisklivssentral",
    begrunnelse: "Hjelp til varige endringer i levevaner.",
    kanal: "kommune",
    krevesSamtykke: true,
  });

  return handlinger;
}

/**
 * Utleder oppfølging fra det pasienten faktisk svarte i legemiddel-gjennomgangen.
 * Slik lukkes sløyfa: et avvik eller en usikkerhet blir automatisk til en konkret
 * henvendelse til fastlegen, i stedet for å bare bli registrert.
 */
export function utledHandlingerFraSvar(svar: MedicationResponse[]): Handling[] {
  const handlinger: Handling[] = [];

  const avvik = svar.filter(
    (r) => r.tarMedisinen === "ja_annen_dose" || r.tarMedisinen === "nei"
  );
  if (avvik.length > 0) {
    handlinger.push({
      id: "avvik-legemiddel",
      tittel: "Ta opp endringer i medisinbruk med fastlegen",
      begrunnelse: `Du oppga avvik på ${avvik.length} ${avvik.length === 1 ? "legemiddel" : "legemidler"} — legemiddellisten bør oppdateres.`,
      kanal: "e-konsultasjon",
    });
  }

  const usikker = svar.filter((r) => r.vetHvorfor === "nei" || r.vetNårHvordan === "nei");
  if (usikker.length > 0) {
    handlinger.push({
      id: "usikker-legemiddel",
      tittel: "Få forklart legemidler du er usikker på",
      begrunnelse: `Du var usikker på ${usikker.length} ${usikker.length === 1 ? "legemiddel" : "legemidler"}.`,
      kanal: "e-konsultasjon",
    });
  }

  return handlinger;
}
