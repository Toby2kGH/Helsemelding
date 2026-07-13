"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { SamtykkeSkjema } from "@/components/SamtykkeSkjema";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { byggSteps } from "@/lib/helsemelding11";

export default function StegSamtykker() {
  const router = useRouter();
  const { fullfort, fullforSteg } = useHelsemelding11();
  const steps = byggSteps("samtykker", fullfort);

  function neste() {
    fullforSteg("samtykker");
    router.push("/helsemelding-1-1/forebygging");
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 4 av 7</p>
          <h1 className="text-3xl font-bold text-neutral-900">Samtykker og reservasjoner</h1>
          <p className="text-neutral-600 mt-2">
            Se og oppdater samtykkene dine. Du bestemmer hvem som får se hva. Når du slår på et
            samtykke, får du opp hva det innebærer — samtykke skal være en informert handling,
            ikke bare et dratt håndtak. Du kan alltid trekke det tilbake.
          </p>
        </div>

        <SamtykkeSkjema />

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding-1-1/kritisk-info"
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
