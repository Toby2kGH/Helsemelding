import type { Step } from "@/types";

export interface StepDef {
  id: number;
  key: string;
  label: string;
  path: string;
}

/** English Health Message 1.0 — five steps, sent to your GP. */
export const STEPS_10: StepDef[] = [
  { id: 1, key: "medicines", label: "Medicines", path: "/health-message/medicines" },
  { id: 2, key: "critical", label: "Key info", path: "/health-message/key-info" },
  { id: 3, key: "vaccinations", label: "Vaccinations", path: "/health-message/vaccinations" },
  { id: 4, key: "sharing", label: "Sharing", path: "/health-message/sharing" },
  { id: 5, key: "confirm", label: "Confirm", path: "/health-message/confirm" },
];

/** English Health Message 1.1 — adds what matters to you, staying well, and next steps. */
export const STEPS_11: StepDef[] = [
  { id: 1, key: "matters", label: "What matters", path: "/health-message-plus/what-matters" },
  { id: 2, key: "medicines", label: "Medicines", path: "/health-message-plus/medicines" },
  { id: 3, key: "critical", label: "Key info", path: "/health-message-plus/key-info" },
  { id: 4, key: "sharing", label: "Sharing", path: "/health-message-plus/sharing" },
  { id: 5, key: "prevention", label: "Staying well", path: "/health-message-plus/staying-well" },
  { id: 6, key: "followup", label: "Next steps", path: "/health-message-plus/next-steps" },
  { id: 7, key: "summary", label: "Summary", path: "/health-message-plus/summary" },
];

export function buildSteps(
  active: string | null,
  completed: Record<string, boolean>,
  steps: StepDef[]
): Step[] {
  return steps.map((s) => ({
    id: s.id,
    label: s.label,
    path: s.path,
    status: s.key === active ? "active" : completed[s.key] ? "completed" : "pending",
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

/** Derives the stepper, step number and previous/next links from the step list itself. */
export function flowNav(
  steps: StepDef[],
  active: string,
  basePath: string,
  completed: Record<string, boolean>
): FlowNav {
  const idx = steps.findIndex((s) => s.key === active);
  const cur = steps[idx];
  const next = idx >= 0 && idx < steps.length - 1 ? steps[idx + 1] : null;
  return {
    steps: buildSteps(active, completed, steps),
    nr: cur?.id ?? 1,
    total: steps.length,
    prevHref: idx > 0 ? steps[idx - 1].path : basePath,
    nextHref: next ? next.path : null,
    nextLabel: next ? next.label : null,
  };
}
