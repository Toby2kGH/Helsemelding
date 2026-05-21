"use client";

import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/solid";
import type { Step } from "@/types";

interface StepperProps {
  steps: Step[];
}

export function Stepper({ steps }: StepperProps) {
  return (
    <nav aria-label="Fremdriftsindikator" className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, idx) => (
          <li key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              {step.status === "completed" ? (
                <Link
                  href={step.path}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-success-700 text-white focus:outline-none focus:ring-2 focus:ring-success-700 focus:ring-offset-2"
                  aria-label={`${step.label} — fullført`}
                >
                  <CheckIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : step.status === "active" ? (
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blueberry-900 text-white font-semibold text-sm"
                  aria-current="step"
                  aria-label={`${step.label} — aktivt steg`}
                >
                  {step.id}
                </div>
              ) : (
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-200 text-neutral-400 text-sm"
                  aria-label={`${step.label} — ikke startet`}
                >
                  {step.id}
                </div>
              )}
              <span
                className={`mt-1 hidden text-xs font-medium md:block ${
                  step.status === "active"
                    ? "text-blueberry-900"
                    : step.status === "completed"
                    ? "text-success-700"
                    : "text-neutral-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  step.status === "completed" ? "bg-success-700" : "bg-neutral-200"
                }`}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
