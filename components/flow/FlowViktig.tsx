"use client";

import { useRouter } from "next/navigation";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { flowNav, type StegDef } from "@/lib/helsemelding11";
import { VIKTIG_FOR_MEG_FORSLAG } from "@/lib/oppfolgingEngine";
import { FlowHeader, FlowNav } from "@/components/flow/FlowChrome";

export function FlowViktig({ steg, basePath }: { steg: StegDef[]; basePath: string }) {
  const router = useRouter();
  const { viktigForMeg, viktigFritekst, toggleViktig, settFritekst, fullfort, fullforSteg } =
    useHelsemelding11();
  const nav = flowNav(steg, "viktig", basePath, fullfort);

  function neste() {
    fullforSteg("viktig");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <DemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={nav.steps} />
        <FlowHeader nr={nav.nr} total={nav.total} title="Hva er viktig for deg?">
          Dine egne mål er utgangspunktet. Det du velger her følger med som ramme på alt som
          senere sendes til fastlege og kommune — så de ser hva du faktisk vil oppnå.
        </FlowHeader>

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

        <FlowNav prevHref={nav.prevHref} onNext={neste} nextLabel={nav.nextLabel ?? "Neste"} />
      </div>
    </div>
  );
}
