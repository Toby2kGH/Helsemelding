// British / NHS demo patients for the English "Health Message" flows.
// Self-contained (own types) so the English module never touches the Norwegian data.
// All data is fictional and for demonstration only. Three archetypes, mirroring the
// Norwegian profiles: an older multi-condition patient, a young adult with long-term
// conditions, and a healthy young adult.

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
  lastGiven: string | null;
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
  gp: string;
  surgery: string;
  livesAlone: boolean;
  conditions: string[];
  medicines: {
    regular: Medicine[];
    course: Medicine[];
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
    scrAdditionalInformation: boolean;
    gpHospitalSharing: boolean;
    organDonationDecision: "opt_in" | "opt_out" | null;
    nationalDataOptOut: boolean;
    nominatedPharmacy: string | null;
  };
}

/* ─────────────────────────  Margaret, 71  ───────────────────────── */
export const margaretDoyle: NhsProfile = {
  id: "margaret",
  name: "Margaret Doyle",
  firstName: "Margaret",
  age: 71,
  nhsNumber: "485 777 3456 (DEMO)",
  town: "Leeds",
  gp: "Dr Sarah Okafor",
  surgery: "Elm Tree Surgery, Leeds",
  livesAlone: true,
  conditions: [
    "High blood pressure",
    "Atrial fibrillation (irregular heartbeat)",
    "Type 2 diabetes",
    "Osteoporosis",
    "Underactive thyroid",
  ],
  medicines: {
    regular: [
      { id: "m1", brand: "Apixaban (Eliquis)", generic: "apixaban", strength: "5 mg", dose: "One tablet twice a day", purpose: "Thins your blood to lower your risk of stroke (for your irregular heartbeat)", important: true, kind: "regular" },
      { id: "m2", brand: "Bisoprolol", generic: "bisoprolol", strength: "2.5 mg", dose: "One tablet each morning", purpose: "Steadies your heart rate", kind: "regular" },
      { id: "m3", brand: "Ramipril", generic: "ramipril", strength: "5 mg", dose: "One capsule each morning", purpose: "Lowers your blood pressure", kind: "regular" },
      { id: "m4", brand: "Amlodipine", generic: "amlodipine", strength: "5 mg", dose: "One tablet each morning", purpose: "Lowers your blood pressure", kind: "regular" },
      { id: "m5", brand: "Metformin", generic: "metformin", strength: "500 mg", dose: "One tablet twice a day, with food", purpose: "Controls your blood sugar (type 2 diabetes)", kind: "regular" },
      { id: "m6", brand: "Atorvastatin", generic: "atorvastatin", strength: "20 mg", dose: "One tablet at night", purpose: "Lowers your cholesterol to protect your heart", kind: "regular" },
      { id: "m7", brand: "Levothyroxine", generic: "levothyroxine", strength: "75 micrograms", dose: "One tablet before breakfast", purpose: "Replaces the hormone your thyroid isn't making", kind: "regular" },
      { id: "m8", brand: "Adcal-D3", generic: "calcium carbonate with colecalciferol (vitamin D)", strength: "600 mg / 400 IU", dose: "One chewable tablet twice a day", purpose: "Protects your bones (osteoporosis)", kind: "regular" },
    ],
    course: [
      { id: "m-c1", brand: "Doxycycline", generic: "doxycycline", strength: "100 mg", dose: "One capsule twice a day for 5 days", purpose: "A recent course for a chest infection", kind: "course" },
    ],
    whenRequired: [
      { id: "m-w1", brand: "Paracetamol", generic: "paracetamol", strength: "500 mg", dose: "One or two tablets, up to four times a day for pain (no more than 8 in 24 hours)", purpose: "Pain relief", kind: "whenRequired" },
      { id: "m-w2", brand: "Zopiclone", generic: "zopiclone", strength: "3.75 mg", dose: "One tablet at night if needed, for a short time only", purpose: "Short-term help with sleep", important: true, warning: "Sleeping tablets can make you drowsy and unsteady, which raises the risk of falls in later life. Meant for short-term use — worth reviewing with your GP.", kind: "whenRequired" },
      { id: "m-w3", brand: "GTN spray", generic: "glyceryl trinitrate", strength: "400 micrograms per spray", dose: "One or two sprays under the tongue for chest pain. Call 999 if the pain doesn't ease after two doses.", purpose: "Relieves angina (chest pain)", important: true, kind: "whenRequired" },
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
    { vaccine: "Flu vaccine", priority: "high", reason: "You're 65 or over, so you're eligible for a free NHS flu vaccine every autumn. It's recommended each year because the virus changes.", lastGiven: "Autumn 2023", action: "Book at your GP surgery or a local pharmacy from September." },
    { vaccine: "COVID-19 seasonal vaccine", priority: "high", reason: "You're eligible for a seasonal COVID-19 vaccine to keep your protection topped up, as it fades over time.", lastGiven: "Spring 2024", action: "Book through the NHS App, online, or at a participating pharmacy." },
    { vaccine: "Pneumococcal vaccine (PPV23)", priority: "high", reason: "You're 65 or over and there's no record of this vaccine. It's a one-off dose that protects against serious pneumococcal infections.", lastGiven: "Not on record", action: "Ask the practice nurse at your GP surgery." },
    { vaccine: "Shingles vaccine (Shingrix)", priority: "medium", reason: "You're now in the eligible age group for the shingles vaccine, given as two doses. Shingles can be very painful, and the risk rises with age.", lastGiven: "Not on record", action: "Ask your GP surgery whether you're due." },
  ],
  criticalInfo: {
    allergies: ["Penicillin — brings on a rash"],
    reactions: ["Ibuprofen and similar anti-inflammatories upset your stomach"],
    keyFunction: "Reduced kidney function (eGFR around 45)",
    otherImportant: "At risk of falls — occasional dizziness, and a sleeping tablet at night. Lives alone.",
  },
  sharing: {
    scrAdditionalInformation: true,
    gpHospitalSharing: true,
    organDonationDecision: null,
    nationalDataOptOut: false,
    nominatedPharmacy: "Boots, Kirkstall Road, Leeds",
  },
};

/* ─────────────────────────  Aisha, 28  ───────────────────────── */
export const aishaKhan: NhsProfile = {
  id: "aisha",
  name: "Aisha Khan",
  firstName: "Aisha",
  age: 28,
  nhsNumber: "624 118 9902 (DEMO)",
  town: "Manchester",
  gp: "Dr James Whitfield",
  surgery: "Rusholme Health Centre, Manchester",
  livesAlone: false,
  conditions: ["Type 1 diabetes", "Asthma", "Endometriosis"],
  medicines: {
    regular: [
      { id: "a1", brand: "Insulin degludec (Tresiba)", generic: "insulin degludec", strength: "100 units/ml", dose: "18 units at night", purpose: "Your long-acting background insulin (type 1 diabetes)", important: true, kind: "regular" },
      { id: "a2", brand: "Insulin aspart (NovoRapid)", generic: "insulin aspart", strength: "100 units/ml", dose: "With meals — adjust to your blood sugar and carbs", purpose: "Your fast-acting mealtime insulin", important: true, kind: "regular" },
      { id: "a3", brand: "Fostair inhaler", generic: "beclometasone with formoterol", strength: "100/6 micrograms", dose: "Two puffs twice a day", purpose: "Preventer inhaler that keeps your asthma under control", kind: "regular" },
      { id: "a4", brand: "Dienogest", generic: "dienogest", strength: "2 mg", dose: "One tablet a day", purpose: "Manages your endometriosis", kind: "regular" },
      { id: "a5", brand: "Sertraline", generic: "sertraline", strength: "50 mg", dose: "One tablet each morning", purpose: "Helps with low mood", kind: "regular" },
    ],
    course: [
      { id: "a-c1", brand: "Prednisolone", generic: "prednisolone", strength: "5 mg", dose: "Six tablets once a day for 5 days", purpose: "A recent steroid course for an asthma flare-up", kind: "course" },
    ],
    whenRequired: [
      { id: "a-w1", brand: "Salbutamol (Ventolin)", generic: "salbutamol", strength: "100 micrograms per puff", dose: "One or two puffs when you're wheezy or breathless", purpose: "Reliever inhaler for asthma symptoms", important: true, warning: "If you're needing your reliever three or more times a week, your asthma isn't well controlled — book an asthma review.", kind: "whenRequired" },
      { id: "a-w2", brand: "GlucaGen HypoKit", generic: "glucagon", strength: "1 mg injection", dose: "One injection if you have a severe hypo and can't take sugar by mouth. Call 999.", purpose: "For a severe low blood sugar (hypo)", important: true, kind: "whenRequired" },
      { id: "a-w3", brand: "Paracetamol", generic: "paracetamol", strength: "500 mg", dose: "One or two tablets for period pain, up to four times a day", purpose: "Pain relief", kind: "whenRequired" },
    ],
  },
  immunisationHistory: [
    { vaccine: "Flu", lastGiven: "Autumn 2024", status: "up_to_date" },
    { vaccine: "COVID-19", lastGiven: "2023", status: "due" },
    { vaccine: "HPV", lastGiven: "School programme", status: "up_to_date" },
    { vaccine: "MMR", lastGiven: "Childhood", status: "up_to_date" },
    { vaccine: "Tetanus, diphtheria & polio (Td/IPV)", lastGiven: "2015", status: "up_to_date" },
  ],
  immunisationAdvice: [
    { vaccine: "Flu vaccine", priority: "high", reason: "You have type 1 diabetes and asthma, so you're eligible for a free NHS flu vaccine each year — both conditions raise the risk from flu.", lastGiven: "Autumn 2024", action: "Book at your GP surgery or a local pharmacy from September." },
    { vaccine: "COVID-19 seasonal vaccine", priority: "high", reason: "You're in an at-risk group (diabetes and asthma), so you're eligible for a seasonal COVID-19 vaccine.", lastGiven: "2023", action: "Book through the NHS App or a participating pharmacy." },
    { vaccine: "Pneumococcal vaccine (PPV23)", priority: "medium", reason: "People with diabetes and asthma are advised to have the pneumococcal vaccine, even under 65. There's no record of it for you.", lastGiven: "Not on record", action: "Ask the practice nurse whether you're due." },
  ],
  criticalInfo: {
    allergies: [],
    reactions: ["You need more insulin than usual when you're unwell or have an infection"],
    keyFunction: "Type 1 diabetes — high risk of DKA if insulin is missed or during illness",
    otherImportant: "Thinking about starting a family — good blood sugar control before and during pregnancy is important.",
  },
  sharing: {
    scrAdditionalInformation: true,
    gpHospitalSharing: true,
    organDonationDecision: "opt_in",
    nationalDataOptOut: false,
    nominatedPharmacy: "Boots, Wilmslow Road, Manchester",
  },
};

/* ─────────────────────────  Liam, 24  ───────────────────────── */
export const liamBennett: NhsProfile = {
  id: "liam",
  name: "Liam Bennett",
  firstName: "Liam",
  age: 24,
  nhsNumber: "701 445 2213 (DEMO)",
  town: "Bristol",
  gp: "Dr Priya Nair",
  surgery: "Bishopston Medical Practice, Bristol",
  livesAlone: false,
  conditions: ["Hay fever (seasonal allergic rhinitis)"],
  medicines: {
    regular: [],
    course: [
      { id: "l-c1", brand: "Amoxicillin", generic: "amoxicillin", strength: "500 mg", dose: "One capsule three times a day for 5 days", purpose: "A recent course for a chest infection", kind: "course" },
    ],
    whenRequired: [
      { id: "l-w1", brand: "Cetirizine", generic: "cetirizine", strength: "10 mg", dose: "One tablet a day during hay fever season (spring and summer)", purpose: "Eases hay fever symptoms", kind: "whenRequired" },
      { id: "l-w2", brand: "Paracetamol", generic: "paracetamol", strength: "500 mg", dose: "One or two tablets for a headache, up to four times a day", purpose: "Pain relief", kind: "whenRequired" },
    ],
  },
  immunisationHistory: [
    { vaccine: "Childhood programme (6-in-1, MenB, etc.)", lastGiven: "As a child", status: "up_to_date" },
    { vaccine: "MMR", lastGiven: "Childhood", status: "up_to_date" },
    { vaccine: "Tetanus, diphtheria & polio (Td/IPV) — teenage booster", lastGiven: "2015", status: "up_to_date" },
    { vaccine: "COVID-19", lastGiven: "2021", status: "up_to_date" },
  ],
  immunisationAdvice: [
    { vaccine: "Tetanus, diphtheria & polio (Td/IPV) booster", priority: "low", reason: "It's coming up to 10 years since your teenage booster. A top-up is worth having, especially if you're travelling or get a dirty wound.", lastGiven: "2015", action: "Mention it at your next GP or nurse appointment — no rush." },
  ],
  criticalInfo: {
    allergies: ["Pollen and dust (hay fever)"],
    reactions: [],
    keyFunction: "",
    otherImportant: "",
  },
  sharing: {
    scrAdditionalInformation: false,
    gpHospitalSharing: true,
    organDonationDecision: null,
    nationalDataOptOut: false,
    nominatedPharmacy: null,
  },
};

export const nhsProfiles = {
  margaret: margaretDoyle,
  aisha: aishaKhan,
  liam: liamBennett,
};

export type NhsProfileKey = keyof typeof nhsProfiles;

/** Default profile (kept as a named export for anything that needs a fallback). */
export const nhsProfile = margaretDoyle;
