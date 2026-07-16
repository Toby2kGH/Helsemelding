"use client";

import { useRouter } from "next/navigation";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { SamtykkeSkjema } from "@/components/SamtykkeSkjema";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { flowNav, type StegDef } from "@/lib/helsemelding11";
import { FlowHeader, FlowNav } from "@/components/flow/FlowChrome";

export function FlowSamtykker({ steg, basePath }: { steg: StegDef[]; basePath: string }) {
  const router = useRouter();
  const { fullfort, fullforSteg } = useHelsemelding11();
  const nav = flowNav(steg, "samtykker", basePath, fullfort);

  function neste() {
    fullforSteg("samtykker");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <DemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={nav.steps} />
        <FlowHeader nr={nav.nr} total={nav.total} title="Samtykker og reservasjoner">
          Se og oppdater samtykkene dine. Du bestemmer hvem som får se hva. Når du slår på et
          samtykke, får du opp hva det innebærer — samtykke skal være en informert handling, ikke
          bare et dratt håndtak. Du kan alltid trekke det tilbake.
        </FlowHeader>

        <SamtykkeSkjema />

        <FlowNav prevHref={nav.prevHref} onNext={neste} nextLabel={nav.nextLabel ?? "Neste"} />
      </div>
    </div>
  );
}
