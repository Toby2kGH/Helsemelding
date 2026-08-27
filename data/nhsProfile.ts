// British / NHS demo patient for the English "Health Message" flows.
// Self-contained (own types) so the English module never touches the Norwegian data.
// All data is fictional and for demonstration only.

export type Priority = "high" | "medium" | "low";

export interface Medicine {
  id: string;
  brand: string; // UK brand or common name
  generic: string; // active ingredient (British spelling)
  strength: string;
  dose: string; // plain-English directions
  purpose: string; // what it's for
  important?: boolean;
  warning?: string;
  kind: "regular" | "whenRequired" | "course";
}

export interface Immunisation {
  vaccine: string;
  lastGiven: string | null; // human-readable or null if not on record
  status: "up_to_date" | "due" | "not_on_record";
}

export interface ImmunisationAdvice {
  vaccine: string;
  priority: Priority;
  reason: string;
  lastGiven: string;
  action: string;
}

export interface NhsProfile {
  id: string;
  name: string;
  firstName: string;
  age: number;
  nhsNumber: string; // DEMO
  town: string;
  gp: string; // GP name
  surgery: string; // GP surgery
  conditions: string[];
  medicines: {
    regular: Medicine[];
    whenRequired: Medicine[];
  };
  immunisationHistory: Immunisation[];
  immunisationAdvice: ImmunisationAdvice[];
  criticalInfo: {
    allergies: string[];
    reactions: string[];
    keyFunction: string;
    otherImportant: string;
  };
  sharing: {
    // Summary Care Record with Additional Information (opt-in beyond the core record)
    scrAdditionalInformation: boolean;
    // Local / shared care record between GP and hospital
    gpHospitalSharing: boolean;
    // Organ donation — England operates opt-out ("deemed consent"). null = no decision recorded.
    organDonationDecision: "opt_in" | "opt_out" | null;
    // National Data Opt-out — opting out of confidential data being used for research and planning.
    nationalDataOptOut: boolean;
    // Nominated pharmacy for repeat prescriptions
    nominatedPharmacy: string | null;
  };
}

export const margaretDoyle: NhsProfile = {
  id: "margaret",
  name: "Margaret Doyle",
  firstName: "Margaret",
  age: 71,
  nhsNumber: "485 777 3456 (DEMO)",
  town: "Leeds",
  gp: "Dr Sarah Okafor",
  surgery: "Elm Tree Surgery, Leeds",
  conditions: [
    "High blood pressure",
    "Atrial fibrillation (irregular heartbeat)",
    "Type 2 diabetes",
    "Osteoporosis",
    "Underactive thyroid",
  ],
  medicines: {
    regular: [
      {
        id: "m1",
        brand: "Apixaban (Eliquis)",
        generic: "apixaban",
        strength: "5 mg",
        dose: "One tablet twice a day",
        purpose: "Thins your blood to lower your risk of stroke (for your irregular heartbeat)",
        important: true,
        kind: "regular",
      },
      {
        id: "m2",
        brand: "Bisoprolol",
        generic: "bisoprolol",
        strength: "2.5 mg",
        dose: "One tablet each morning",
        purpose: "Steadies your heart rate",
        kind: "regular",
      },
      {
        id: "m3",
        brand: "Ramipril",
        generic: "ramipril",
        strength: "5 mg",
        dose: "One capsule each morning",
        purpose: "Lowers your blood pressure",
        kind: "regular",
      },
      {
        id: "m4",
        brand: "Amlodipine",
        generic: "amlodipine",
        strength: "5 mg",
        dose: "One tablet each morning",
        purpose: "Lowers your blood pressure",
        kind: "regular",
      },
      {
        id: "m5",
        brand: "Metformin",
        generic: "metformin",
        strength: "500 mg",
        dose: "One tablet twice a day, with food",
        purpose: "Controls your blood sugar (type 2 diabetes)",
        kind: "regular",
      },
      {
        id: "m6",
        brand: "Atorvastatin",
        generic: "atorvastatin",
        strength: "20 mg",
        dose: "One tablet at night",
        purpose: "Lowers your cholesterol to protect your heart",
        kind: "regular",
      },
      {
        id: "m7",
        brand: "Levothyroxine",
        generic: "levothyroxine",
        strength: "75 micrograms",
        dose: "One tablet before breakfast",
        purpose: "Replaces the hormone your thyroid isn't making",
        kind: "regular",
      },
      {
        id: "m8",
        brand: "Adcal-D3",
        generic: "calcium carbonate with colecalciferol (vitamin D)",
        strength: "600 mg / 400 IU",
        dose: "One chewable tablet twice a day",
        purpose: "Protects your bones (osteoporosis)",
        kind: "regular",
      },
    ],
    whenRequired: [
      {
        id: "w1",
        brand: "Paracetamol",
        generic: "paracetamol",
        strength: "500 mg",
        dose: "One or two tablets, up to four times a day for pain (no more than 8 in 24 hours)",
        purpose: "Pain relief",
        kind: "whenRequired",
      },
      {
        id: "w2",
        brand: "Zopiclone",
        generic: "zopiclone",
        strength: "3.75 mg",
        dose: "One tablet at night if needed, for a short time only",
        purpose: "Short-term help with sleep",
        important: true,
        warning:
          "Sleeping tablets can make you drowsy and unsteady, which raises the risk of falls in later life. Meant for short-term use — worth reviewing with your GP.",
        kind: "whenRequired",
      },
      {
        id: "w3",
        brand: "GTN spray",
        generic: "glyceryl trinitrate",
        strength: "400 micrograms per spray",
        dose: "One or two sprays under the tongue for chest pain. Call 999 if the pain doesn't ease after two doses.",
        purpose: "Relieves angina (chest pain)",
        important: true,
        kind: "whenRequired",
      },
    ],
  },
  immunisationHistory: [
    { vaccine: "Flu", lastGiven: "Autumn 2023", status: "due" },
    { vaccine: "COVID-19", lastGiven: "Spring 2024", status: "due" },
    { vaccine: "Pneumococcal (PPV23)", lastGiven: null, status: "not_on_record" },
    { vaccine: "Shingles (Shingrix)", lastGiven: null, status: "not_on_record" },
    { vaccine: "Tetanus, diphtheria & polio (Td/IPV)", lastGiven: "2012", status: "up_to_date" },
  ],
  immunisationAdvice: [
    {
      vaccine: "Flu vaccine",
      priority: "high",
      reason:
        "You're 65 or over, so you're eligible for a free NHS flu vaccine every autumn. It's recommended each year because the virus changes.",
      lastGiven: "Autumn 2023",
      action: "Book at your GP surgery or a local pharmacy from September.",
    },
    {
      vaccine: "COVID-19 seasonal vaccine",
      priority: "high",
      reason:
        "You're eligible for a seasonal COVID-19 vaccine to keep your protection topped up, as it fades over time.",
      lastGiven: "Spring 2024",
      action: "Book through the NHS App, online, or at a participating pharmacy.",
    },
    {
      vaccine: "Pneumococcal vaccine (PPV23)",
      priority: "high",
      reason:
        "You're 65 or over and there's no record of this vaccine. It's a one-off dose that protects against serious pneumococcal infections.",
      lastGiven: "Not on record",
      action: "Ask the practice nurse at your GP surgery.",
    },
    {
      vaccine: "Shingles vaccine (Shingrix)",
      priority: "medium",
      reason:
        "You're now in the eligible age group for the shingles vaccine, given as two doses. Shingles can be very painful, and the risk rises with age.",
      lastGiven: "Not on record",
      action: "Ask your GP surgery whether you're due.",
    },
  ],
  criticalInfo: {
    allergies: ["Penicillin — brings on a rash"],
    reactions: ["Ibuprofen and similar anti-inflammatories upset your stomach"],
    keyFunction: "Reduced kidney function (eGFR around 45)",
    otherImportant:
      "At risk of falls — occasional dizziness, and a sleeping tablet at night. Lives alone.",
  },
  sharing: {
    scrAdditionalInformation: true,
    gpHospitalSharing: true,
    organDonationDecision: null,
    nationalDataOptOut: false,
    nominatedPharmacy: "Boots, Kirkstall Road, Leeds",
  },
};

export const nhsProfile = margaretDoyle;
