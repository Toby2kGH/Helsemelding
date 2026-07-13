"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { SamtykkeSkjema } from "@/components/SamtykkeSkjema";
import { useUser } from "@/context/UserContext";
import type { Step } from "@/types";

export default function Samtykker() {
  const router = useRouter();
  const { helsemeldingState, fullforSteg } = useUser();

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: "completed" },
    { id: 2, label: "Kritisk info", path: "/helsemelding/kritisk-info", status: "completed" },
    { id: 3, label: "Vaksiner", path: "/helsemelding/vaksiner", status: "completed" },
    { id: 4, label: "Samtykker", path: "/helsemelding/samtykker", status: "active" },
    { id: 5, label: "Bekreft", path: "/helsemelding/bekreft", status: helsemeldingState.stepsCompleted.bekreft ? "completed" : "pending" },
  ];

  function neste() {
    fullforSteg("samtykker");
    router.push("/helsemelding/bekreft");
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 4 av 5</p>
          <h1 className="text-3xl font-bold text-neutral-900">Samtykker og reservasjoner</h1>
          <p className="text-neutral-600 mt-2">
            Her kan du se og oppdatere dine samtykker. Du kan til enhver tid endre eller trekke tilbake et samtykke.
          </p>
        </div>

        <SamtykkeSkjema />

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding/vaksiner"
            className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Link>
          <button
            onClick={neste}
            className="flex items-center gap-2 rounded-md bg-blueberry-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
          >
            Neste: Bekreft og send
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
