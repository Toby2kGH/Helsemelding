import type { Step } from "@/types";
import type { Steg11 } from "@/context/Helsemelding11Context";

export const STEG_11: { id: number; key: Steg11; label: string; path: string }[] = [
  { id: 1, key: "viktig", label: "Viktig for meg", path: "/helsemelding-1-1/viktig" },
  { id: 2, key: "legemidler", label: "Legemidler", path: "/helsemelding-1-1/legemidler" },
  { id: 3, key: "kritisk", label: "Kritisk info", path: "/helsemelding-1-1/kritisk-info" },
  { id: 4, key: "samtykker", label: "Samtykker", path: "/helsemelding-1-1/samtykker" },
  { id: 5, key: "forebygging", label: "Forebygging", path: "/helsemelding-1-1/forebygging" },
  { id: 6, key: "oppfolging", label: "Oppfølging", path: "/helsemelding-1-1/oppfolging" },
  { id: 7, key: "oppsummering", label: "Oppsummering", path: "/helsemelding-1-1/oppsummering" },
];

export function byggSteps(
  aktiv: Steg11 | null,
  fullfort: Record<Steg11, boolean>
): Step[] {
  return STEG_11.map((s) => ({
    id: s.id,
    label: s.label,
    path: s.path,
    status: s.key === aktiv ? "active" : fullfort[s.key] ? "completed" : "pending",
  }));
}
