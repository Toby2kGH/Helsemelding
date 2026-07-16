import type { Step } from "@/types";
import type { Steg11 } from "@/context/Helsemelding11Context";

export interface StegDef {
  id: number;
  key: Steg11;
  label: string;
  path: string;
}

/** Helsemelding 1.1 — sju steg. */
export const STEG_11: StegDef[] = [
  { id: 1, key: "viktig", label: "Viktig for meg", path: "/helsemelding-1-1/viktig" },
  { id: 2, key: "legemidler", label: "Legemidler", path: "/helsemelding-1-1/legemidler" },
  { id: 3, key: "kritisk", label: "Kritisk info", path: "/helsemelding-1-1/kritisk-info" },
  { id: 4, key: "samtykker", label: "Samtykker", path: "/helsemelding-1-1/samtykker" },
  { id: 5, key: "forebygging", label: "Forebygging", path: "/helsemelding-1-1/forebygging" },
  { id: 6, key: "oppfolging", label: "Oppfølging", path: "/helsemelding-1-1/oppfolging" },
  { id: 7, key: "oppsummering", label: "Oppsummering", path: "/helsemelding-1-1/oppsummering" },
];

/** Helsemelding 1.2 — som 1.1, men med et helsekompetanse-steg etter forebygging. */
export const STEG_12: StegDef[] = [
  { id: 1, key: "viktig", label: "Viktig for meg", path: "/helsemelding-1-2/viktig" },
  { id: 2, key: "legemidler", label: "Legemidler", path: "/helsemelding-1-2/legemidler" },
  { id: 3, key: "kritisk", label: "Kritisk info", path: "/helsemelding-1-2/kritisk-info" },
  { id: 4, key: "samtykker", label: "Samtykker", path: "/helsemelding-1-2/samtykker" },
  { id: 5, key: "forebygging", label: "Forebygging", path: "/helsemelding-1-2/forebygging" },
  { id: 6, key: "helsekompetanse", label: "Helsekompetanse", path: "/helsemelding-1-2/helsekompetanse" },
  { id: 7, key: "oppfolging", label: "Oppfølging", path: "/helsemelding-1-2/oppfolging" },
  { id: 8, key: "oppsummering", label: "Oppsummering", path: "/helsemelding-1-2/oppsummering" },
];

export function byggSteps(
  aktiv: Steg11 | null,
  fullfort: Record<Steg11, boolean>,
  steg: StegDef[] = STEG_11
): Step[] {
  return steg.map((s) => ({
    id: s.id,
    label: s.label,
    path: s.path,
    status: s.key === aktiv ? "active" : fullfort[s.key] ? "completed" : "pending",
  }));
}

export interface FlowNav {
  steps: Step[];
  nr: number;
  total: number;
  prevHref: string;
  nextHref: string | null;
  nextLabel: string | null;
}

/** Utleder stepper, stegnummer og forrige/neste fra selve steg-listen. */
export function flowNav(
  steg: StegDef[],
  aktiv: Steg11,
  basePath: string,
  fullfort: Record<Steg11, boolean>
): FlowNav {
  const idx = steg.findIndex((s) => s.key === aktiv);
  const cur = steg[idx];
  const next = idx >= 0 && idx < steg.length - 1 ? steg[idx + 1] : null;
  return {
    steps: byggSteps(aktiv, fullfort, steg),
    nr: cur?.id ?? 1,
    total: steg.length,
    prevHref: idx > 0 ? steg[idx - 1].path : basePath,
    nextHref: next ? next.path : null,
    nextLabel: next ? next.label : null,
  };
}
