export interface Legemiddel {
  id: string;
  handelsnavn: string;
  virkestoff: string;
  styrke: string;
  dose: string;
  atc: string;
  indikasjon: string;
  viktig: boolean;
  kategori: "fast" | "kur" | "behovs";
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

export interface KritiskInfoFraKjernejournal {
  allergi?: string[];
  bivirkninger?: string[];
  kritiskFunksjon?: string;
  annenKritiskInfo?: string;
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
  kritiskInfo: KritiskInfoFraKjernejournal;
}

export interface MedicationResponse {
  medId: string;
  vetHvorfor: "ja" | "nei" | null;
  tarMedisinen: "ja_som_forskrevet" | "ja_annen_dose" | "nei" | null;
  annenDoseBeskriv: string;
  kurAvsluttet?: "ja" | "nei" | null;
  vetNårHvordan?: "ja" | "nei" | null;
}

export interface VaccineResponse {
  vaksine: string;
  akseptert: boolean | null;
}

export interface SamtykkeState {
  // Organdonasjon
  organdonasjon: "ja" | "nei" | "ikke_tatt_stilling" | null;

  // Journalinnsyn og deling
  deling_mellom_sykehus: boolean | null;
  deling_mellom_regioner: boolean | null;
  deling_sykehus_kommune: boolean | null;
  deling_private_aktorer: boolean | null;

  // Pårørende
  paroerende_informasjon: boolean | null;
  paroerende_navn: string;

  // Kvalitetsarbeid og registre
  kvalitetsregistre: Record<string, boolean>;
  kvalitetsforbedring: boolean | null;

  // Forskning og biobank
  forskning_kontakt: boolean | null;
  forskning_biobank: boolean | null;

  // Digital og data
  ai_maskinlaering: boolean | null;
  student_undervisning: boolean | null;

  // Aktive studier
  aktive_studier: Record<string, boolean | null>;
}

export interface KritiskInfoState {
  personligInfo: string;
  harKjentBehandlingsplan: boolean | null;
  behandlingsplanBeskrivelse: string;
}

export interface StepCompletionStatus {
  legemidler: boolean;
  kritiskInfo: boolean;
  vaksiner: boolean;
  samtykker: boolean;
  bekreft: boolean;
}

export interface HelsemeldingState {
  medicationResponses: MedicationResponse[];
  vaccineResponses: VaccineResponse[];
  samtykkeState: SamtykkeState;
  kritiskInfoState: KritiskInfoState;
  erImmunkompromittert: boolean;
  stepsCompleted: StepCompletionStatus;
}

export type ProfilId = "kari" | "sara" | "jonas";

export interface Step {
  id: number;
  label: string;
  path: string;
  status: "pending" | "active" | "completed";
}
