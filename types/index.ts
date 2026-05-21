export interface Legemiddel {
  id: string;
  handelsnavn: string;
  virkestoff: string;
  styrke: string;
  dose: string;
  atc: string;
  indikasjon: string;
  viktig: boolean;
  kategori: "fast" | "behovs";
  flagg?: string;
}

export interface SysvakPost {
  vaksine: string;
  dato: string | null;
  status: "ok" | "utdatert" | "anbefalt_fornyelse" | "ikke_registrert" | "valgfritt" | "vurder_fornyelse";
}

export interface VaksinAnbefaling {
  vaksine: string;
  anbefalt: boolean;
  prioritet: "høy" | "middels" | "lav";
  årsak: string;
  siste: string;
  handling: string;
}

export interface KvalitetsregisterSamtykke {
  navn: string;
  samtykke: boolean;
}

export interface AktivStudie {
  id: string;
  tittel: string;
  ansvarlig: string;
  frist: string;
  samtykke: boolean | null;
}

export interface Samtykker {
  organdonasjon: boolean | null;
  kjernejournal: "full" | "basis";
  deling_mellom_sykehus: boolean | null;
  deling_mellom_regioner: boolean | null;
  deling_sykehus_kommune: boolean | null;
  deling_private_aktorer: boolean | null;
  forskning_biobank: boolean | null;
  kvalitetsregistre: KvalitetsregisterSamtykke[];
  aktive_studier: AktivStudie[];
}

export interface KroniskSykdomPlan {
  harKroniskSykdom: boolean;
  sykdommer: string[];
  sporsmal: Record<string, string>;
}

export interface UserProfile {
  id: string;
  navn: string;
  alder: number;
  fnr: string;
  kommune: string;
  fastlege: string;
  diagnoser: string[];
  legemidler: {
    faste: Legemiddel[];
    behovs: Legemiddel[];
  };
  sysvak: SysvakPost[];
  vaksinanbefalinger: VaksinAnbefaling[];
  samtykker: Samtykker;
  kroniskSykdomPlan: KroniskSykdomPlan;
}

export interface MedicationResponse {
  medId: string;
  vetHvorfor: "ja" | "nei" | null;
  tarMedisinen: "ja_som_forskrevet" | "ja_annen_dose" | "nei" | null;
  annenDoseBeskriv: string;
  vetForverring: "ja" | "nei" | null;
}

export interface VaccineResponse {
  vaksine: string;
  akseptert: boolean | null;
}

export interface SamtykkeState {
  organdonasjon: "ja" | "nei" | "ikke_tatt_stilling" | null;
  deling_mellom_sykehus: boolean | null;
  deling_mellom_regioner: boolean | null;
  deling_sykehus_kommune: boolean | null;
  deling_private_aktorer: boolean | null;
  forskning_biobank: boolean | null;
  kvalitetsregistre: Record<string, boolean>;
  aktive_studier: Record<string, boolean | null>;
}

export interface HelsemeldingState {
  medicationResponses: MedicationResponse[];
  vaccineResponses: VaccineResponse[];
  samtykkeState: SamtykkeState;
  erImmunkompromittert: boolean;
  stepsCompleted: boolean[];
}

export type ProfilId = "kari" | "sara" | "jonas";

export interface Step {
  id: number;
  label: string;
  path: string;
  status: "pending" | "active" | "completed";
}
