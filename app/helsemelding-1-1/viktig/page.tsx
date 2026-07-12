"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { byggSteps } from "@/lib/helsemelding11";
import { VIKTIG_FOR_MEG_FORSLAG } from "@/lib/oppfolgingEngine";

export default function StegViktig() {
  const router = useRouter();
  const { viktigForMeg, viktigFritekst, toggleViktig, settFritekst, fullfort, fullforSteg } =
    useHelsemelding11();
  const steps = byggSteps("viktig", fullfort);

  function neste() {
    fullforSteg("viktig");
    router.push("/helsemelding-1-1/forebygging");
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 1 av 4</p>
          <h1 className="text-3xl font-bold text-neutral-900">Hva er viktig for deg?</h1>
          <p className="text-neutral-600 mt-2">
            Dine egne mål er utgangspunktet. Det du velger her følger med som ramme på alt
            som senere sendes til fastlege og kommune — så de ser hva du faktisk vil oppnå.
          </p>
        </div>

        <section className="mb-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-neutral-900 mb-3">
            Velg det som passer for deg (eller flere):
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {VIKTIG_FOR_MEG_FORSLAG.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleViktig(f)}
                aria-pressed={viktigForMeg.includes(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                  viktigForMeg.includes(f)
                    ? "bg-blueberry-700 text-white"
                    : "bg-white text-neutral-700 border border-neutral-200 hover:border-blueberry-500"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <label htmlFor="viktig-fritekst" className="text-sm font-medium text-neutral-900 block mb-1.5">
            Vil du legge til noe med egne ord?
          </label>
          <textarea
            id="viktig-fritekst"
            value={viktigFritekst}
            onChange={(e) => settFritekst(e.target.value)}
            rows={3}
            placeholder="F.eks. «Jeg vil klare å gå tur med hunden hver dag»"
            className="w-full rounded-md border border-neutral-200 p-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
          />
        </section>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding-1-1"
            className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Link>
          <button
            onClick={neste}
            className="flex items-center gap-2 rounded-md bg-blueberry-900 px-6 py-3 text-base font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:ring-offset-2 transition"
          >
            Neste: Forebygging
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
