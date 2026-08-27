"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader, EnFlowNav } from "@/components/en/EnFlowChrome";
import { EnToggle } from "@/components/en/EnToggle";
import { useHealthMessage, type OrganDecision } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";

interface Pending {
  title: string;
  body: string;
  onConfirm: () => void;
}

function ToggleRow({
  title,
  description,
  checked,
  onRequestChange,
  label,
}: {
  title: string;
  description: string;
  checked: boolean;
  onRequestChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-neutral-900">{title}</p>
          <p className="text-sm text-neutral-700 mt-1">{description}</p>
        </div>
        <div className="flex-shrink-0 pt-1">
          <EnToggle checked={checked} onChange={onRequestChange} label={label} />
        </div>
      </div>
    </div>
  );
}

const ORGAN_CHOICES: { value: Exclude<OrganDecision, null>; label: string }[] = [
  { value: "opt_in", label: "I want to be an organ donor" },
  { value: "opt_out", label: "I do not want to donate" },
];

export function SharingStep({ steps, basePath }: { steps: StepDef[]; basePath: string }) {
  const router = useRouter();
  const { completed, complete, sharing, setSharing } = useHealthMessage();
  const nav = flowNav(steps, "sharing", basePath, completed);
  const [pending, setPending] = useState<Pending | null>(null);

  // Turning a share ON asks for confirmation — consent shouldn't be a slip of a switch.
  function confirmEnable(title: string, body: string, apply: () => void) {
    setPending({ title, body, onConfirm: apply });
  }

  function handleNext() {
    complete("sharing");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <NhsDemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <EnStepper steps={nav.steps} />
        <EnFlowHeader nr={nav.nr} total={nav.total} title="Sharing and consent">
          You decide how your information is shared and used. When you turn something on, we&rsquo;ll
          show you what it means first — and you can change any choice later, without it affecting your
          care.
        </EnFlowHeader>

        <div className="space-y-3 mb-6">
          <ToggleRow
            title="Summary Care Record — additional information"
            description="Your Summary Care Record lets NHS staff caring for you — such as A&E, out-of-hours services and pharmacists — see key details like your medicines, allergies and reactions. Adding extra information (your long-term conditions and care preferences) helps them treat you safely."
            checked={sharing.scrAdditionalInformation}
            label="Share additional information in my Summary Care Record"
            onRequestChange={(next) =>
              next
                ? confirmEnable(
                    "Add extra information to your Summary Care Record",
                    "You're choosing to include your long-term conditions and care preferences so NHS staff can treat you safely in urgent situations.",
                    () => setSharing({ scrAdditionalInformation: true })
                  )
                : setSharing({ scrAdditionalInformation: false })
            }
          />

          <ToggleRow
            title="Sharing between your GP and hospital"
            description="Lets your GP surgery and local hospitals see the same up-to-date record when they care for you, so you don't have to repeat your history each time."
            checked={sharing.gpHospitalSharing}
            label="Allow my GP and hospital to share my record"
            onRequestChange={(next) =>
              next
                ? confirmEnable(
                    "Let your GP and hospital share your record",
                    "You're choosing to let your GP surgery and local hospitals see the same record when they're caring for you.",
                    () => setSharing({ gpHospitalSharing: true })
                  )
                : setSharing({ gpHospitalSharing: false })
            }
          />
        </div>

        {/* Organ donation — England operates an opt-out system */}
        <div className="rounded-lg border border-neutral-200 bg-white p-4 mb-3">
          <p className="font-semibold text-neutral-900">Organ and tissue donation</p>
          <p className="text-sm text-neutral-700 mt-1">
            In England, if you haven&rsquo;t recorded a decision, the law considers you willing to
            donate (&lsquo;deemed consent&rsquo;), unless you&rsquo;re in an excluded group. Recording
            your choice on the NHS Organ Donor Register makes your wishes clear, and your family will
            always be involved.
          </p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Your organ donation decision">
            {ORGAN_CHOICES.map((c) => (
              <button
                key={c.value}
                onClick={() =>
                  c.value === "opt_in"
                    ? confirmEnable(
                        "Register as an organ donor",
                        "You're choosing to record on the NHS Organ Donor Register that you want to donate your organs and tissue. Your family will always be involved at the time.",
                        () => setSharing({ organDonationDecision: "opt_in" })
                      )
                    : setSharing({ organDonationDecision: "opt_out" })
                }
                aria-pressed={sharing.organDonationDecision === c.value}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                  sharing.organDonationDecision === c.value
                    ? "bg-blueberry-900 text-white"
                    : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          {sharing.organDonationDecision === null && (
            <p className="text-xs text-neutral-500 mt-2">You haven&rsquo;t recorded a decision yet.</p>
          )}
        </div>

        <ToggleRow
          title="Using your data for research and planning"
          description="The NHS can use your information (with details removed where possible) to research new treatments and plan services. You have a choice — turning this off applies your National Data Opt-out, and it never affects your own care."
          checked={!sharing.nationalDataOptOut}
          label="Allow my data to be used for research and planning"
          onRequestChange={(next) =>
            next
              ? confirmEnable(
                  "Allow your data to be used for research and planning",
                  "You're choosing to let your information be used, with identifying details removed where possible, to research new treatments and plan NHS services.",
                  () => setSharing({ nationalDataOptOut: false })
                )
              : setSharing({ nationalDataOptOut: true })
          }
        />

        <div className="mt-6">
          {nav.nextLabel && (
            <EnFlowNav prevHref={nav.prevHref} onNext={handleNext} nextLabel={`Continue to ${nav.nextLabel.toLowerCase()}`} />
          )}
        </div>
      </div>

      {/* Confirmation dialog — consent is an active choice, not just a switch */}
      {pending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="consent-title">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheckIcon className="h-6 w-6 text-blueberry-700 flex-shrink-0" aria-hidden="true" />
              <h2 id="consent-title" className="text-lg font-semibold text-neutral-900">{pending.title}</h2>
            </div>
            <p className="text-sm text-neutral-700 mb-3">{pending.body}</p>
            <div className="rounded-md bg-blueberry-50 border border-blueberry-100 p-3 mb-5">
              <p className="text-xs text-neutral-700">
                This is your choice, and you can change it at any time. It won&rsquo;t affect the care
                you receive.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPending(null)}
                className="flex-1 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  pending.onConfirm();
                  setPending(null);
                }}
                className="flex-1 rounded-md bg-blueberry-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
              >
                Yes, I agree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
