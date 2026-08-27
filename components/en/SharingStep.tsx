"use client";

import { useRouter } from "next/navigation";
import { NhsDemoBanner } from "@/components/en/NhsDemoBanner";
import { EnStepper } from "@/components/en/EnStepper";
import { EnFlowHeader, EnFlowNav } from "@/components/en/EnFlowChrome";
import { EnToggle } from "@/components/en/EnToggle";
import { useHealthMessage, type OrganDecision } from "@/context/HealthMessageEnContext";
import { flowNav, type StepDef } from "@/lib/healthMessageEn";

function ToggleRow({
  title,
  description,
  checked,
  onChange,
  label,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
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
          <EnToggle checked={checked} onChange={onChange} label={label} />
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
          You decide how your information is shared and used. You can change any of these choices at
          any time, and it won&rsquo;t affect the care you receive.
        </EnFlowHeader>

        <div className="space-y-3 mb-6">
          <ToggleRow
            title="Summary Care Record — additional information"
            description="Your Summary Care Record lets NHS staff caring for you — such as A&E, out-of-hours services and pharmacists — see key details like your medicines, allergies and reactions. Adding extra information (your long-term conditions and care preferences) helps them treat you safely."
            checked={sharing.scrAdditionalInformation}
            onChange={(v) => setSharing({ scrAdditionalInformation: v })}
            label="Share additional information in my Summary Care Record"
          />

          <ToggleRow
            title="Sharing between your GP and hospital"
            description="Lets your GP surgery and local hospitals see the same up-to-date record when they care for you, so you don't have to repeat your history each time."
            checked={sharing.gpHospitalSharing}
            onChange={(v) => setSharing({ gpHospitalSharing: v })}
            label="Allow my GP and hospital to share my record"
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
                onClick={() => setSharing({ organDonationDecision: c.value })}
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
          onChange={(v) => setSharing({ nationalDataOptOut: !v })}
          label="Allow my data to be used for research and planning"
        />

        <div className="mt-6">
          {nav.nextLabel && (
            <EnFlowNav prevHref={nav.prevHref} onNext={handleNext} nextLabel={`Continue to ${nav.nextLabel.toLowerCase()}`} />
          )}
        </div>
      </div>
    </div>
  );
}
