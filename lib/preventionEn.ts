import type { NhsProfile } from "@/data/nhsProfile";

export interface Suggestion {
  id: string;
  title: string;
  body: string;
  action: string;
}

export interface Service {
  name: string;
  description: string;
}

export interface LifeSituation {
  id: string;
  label: string;
}

/** Life-situation prompts the user can self-report (mirrors the Norwegian toggles). */
export const LIFE_SITUATIONS: LifeSituation[] = [
  { id: "smoke", label: "I smoke" },
  { id: "drink", label: "I'd like to drink less" },
  { id: "children", label: "I have children at home" },
  { id: "pregnant", label: "I'm pregnant or planning to" },
];

const S: Record<string, Suggestion> = {
  falls: {
    id: "falls",
    title: "Steadier on your feet",
    body: "Balance can change as we get older, and a fall can set you back. Strength and balance sessions are one of the most effective ways to stay steady and independent.",
    action: "Ask about local strength & balance or falls prevention classes.",
  },
  activityOlder: {
    id: "activity",
    title: "A little activity, most days",
    body: "Moving a bit more protects your heart, your mood and your independence. It doesn't need to be the gym — short, regular walks count.",
    action: "Find a local walking group or gentle activity near you.",
  },
  activityYoung: {
    id: "activity",
    title: "Move in a way you enjoy",
    body: "Being active now builds strength, energy and mental health you'll feel for years. Find something you'll actually keep up.",
    action: "Try Couch to 5K, cycling, swimming or a local team — whatever fits your week.",
  },
  activityAdult: {
    id: "activity",
    title: "Keep active through midlife",
    body: "Regular activity now lowers your future risk of heart disease and type 2 diabetes, and helps with stress and sleep.",
    action: "Aim for a mix of movement across the week — walking, cycling, or strength work.",
  },
  mentalWellbeing: {
    id: "mental",
    title: "Looking after your head",
    body: "Sleep, stress and low mood matter as much as physical health. Support is free and easier to reach than many people think.",
    action: "NHS Talking Therapies — you can refer yourself, no GP needed.",
  },
  medsReview: {
    id: "medicines-review",
    title: "A medicines review",
    body: "You take several regular medicines. A free review with a pharmacist can make sure they still suit you and see if anything can be simplified.",
    action: "Book a free NHS medicines check-up at your community pharmacy.",
  },
  connected: {
    id: "connected",
    title: "Staying connected",
    body: "Living alone can make some weeks quieter than you'd like. Support to stay social and active is available, and it makes a real difference to how you feel.",
    action: "A social prescribing link worker can connect you to local groups and support.",
  },
  diabetesReview: {
    id: "diabetes-review",
    title: "Your yearly diabetes checks",
    body: "An annual diabetes review and eye (retinal) screening catch small problems while they're still easy to treat.",
    action: "Check you're booked for your diabetes review and eye screening.",
  },
  asthmaReview: {
    id: "asthma-review",
    title: "Keep your asthma in check",
    body: "A yearly asthma review makes sure your inhalers and technique are right, which cuts the chance of a flare-up.",
    action: "Book an asthma review and ask for a personal asthma action plan.",
  },
  stopSmoking: {
    id: "stop-smoking",
    title: "Ready to stop smoking?",
    body: "Stopping is the single best thing you can do for your health — and you're up to three times more likely to succeed with NHS support than going it alone.",
    action: "Your local NHS Stop Smoking Service and the NHS Quit Smoking app can help.",
  },
  alcohol: {
    id: "alcohol",
    title: "Cutting down on alcohol",
    body: "Small changes add up: better sleep, more energy and lower long-term risk. It's not about giving up completely unless you want to.",
    action: "Try the free Drink Free Days app, or talk to your GP or pharmacist.",
  },
  childHealth: {
    id: "child-health",
    title: "Your family's health",
    body: "Keeping children's vaccinations up to date and staying active together sets them up well — and your health visitor and GP are there to help.",
    action: "Check your children's vaccinations are up to date with your GP surgery.",
  },
  preconception: {
    id: "preconception",
    title: "Planning a pregnancy",
    body: "Taking folic acid and getting your health in good shape before pregnancy protects both you and your baby.",
    action: "Speak to your GP about preconception care, and start folic acid if you haven't.",
  },
};

export function buildSuggestions(profile: NhsProfile, lifeSituations: string[]): Suggestion[] {
  const has = (re: RegExp) => profile.conditions.some((c) => re.test(c));
  const out: Suggestion[] = [];

  if (profile.age >= 65) {
    out.push(S.falls, S.activityOlder);
    if (profile.medicines.regular.length >= 3) out.push(S.medsReview);
    if (profile.livesAlone) out.push(S.connected);
  } else if (profile.age >= 40) {
    out.push(S.activityAdult);
  } else {
    out.push(S.activityYoung, S.mentalWellbeing);
  }

  if (has(/diabetes/i)) out.push(S.diabetesReview);
  if (has(/asthma/i)) out.push(S.asthmaReview);

  if (lifeSituations.includes("smoke")) out.push(S.stopSmoking);
  if (lifeSituations.includes("drink")) out.push(S.alcohol);
  if (lifeSituations.includes("children")) out.push(S.childHealth);
  if (lifeSituations.includes("pregnant")) out.push(S.preconception);

  return out;
}

export function buildServices(profile: NhsProfile): Service[] {
  const out: Service[] = [
    {
      name: "Community pharmacy",
      description:
        "Advice and treatment for many everyday conditions, plus help with your medicines — often without an appointment (Pharmacy First).",
    },
    {
      name: "Social prescribing link worker",
      description: "Connects you to local groups, activities and practical support. Ask at your GP surgery.",
    },
    {
      name: "NHS Talking Therapies",
      description: "Free NHS support for stress, anxiety and low mood. You can refer yourself — no GP needed.",
    },
  ];

  if (profile.age >= 65) {
    out.push({
      name: "Strength and balance classes",
      description: "Falls prevention exercise run by your local council or NHS services — gentle, and proven to help.",
    });
  }
  if (profile.age >= 65 || profile.livesAlone) {
    out.push({
      name: "Local council — adult social care",
      description: "Help to stay independent at home, from small aids and adaptations to support at home.",
    });
  }

  return out;
}
