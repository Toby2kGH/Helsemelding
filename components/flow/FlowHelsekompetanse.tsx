"use client";

import { useRouter } from "next/navigation";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { flowNav, type StegDef } from "@/lib/helsemelding11";
import { FlowHeader, FlowNav } from "@/components/flow/FlowChrome";
import { HelsekompetanseRaad } from "@/components/HelsekompetanseRaad";

export function FlowHelsekompetanse({ steg, basePath }: { steg: StegDef[]; basePath: string }) {
  const router = useRouter();
  const { fullfort, fullforSteg } = useHelsemelding11();
  const nav = flowNav(steg, "helsekompetanse", basePath, fullfort);

  function neste() {
    fullforSteg("helsekompetanse");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <DemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={nav.steps} />
        <FlowHeader nr={nav.nr} total={nav.total} title="Helsekompetanse: deg om 5–10 år">
          Noen av valgene vi tar i dag har mest å si for hvordan vi har det om fem til ti år. Her er
          kunnskapsbasert informasjon om hva du kan gjøre. Du bestemmer selv hva du vil gjøre med den.
        </FlowHeader>

        <HelsekompetanseRaad omHref={`${basePath}/om`} />

        <FlowNav prevHref={nav.prevHref} onNext={neste} nextLabel={nav.nextLabel ?? "Neste"} />
      </div>
    </div>
  );
}
