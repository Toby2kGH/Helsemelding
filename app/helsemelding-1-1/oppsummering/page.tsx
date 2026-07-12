"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { byggSteps } from "@/lib/helsemelding11";
import { utledHandlinger } from "@/lib/oppfolgingEngine";

export default function StegOppsummering() {
  const { profil } = useUser();
  const { viktigForMeg, viktigFritekst, valgteHandlinger, fullfort, fullforSteg } =
    useHelsemelding11();
  const steps = byggSteps("oppsummering", fullfort);
  const [sendt, setSendt] = useState(false);

  const handlinger = useMemo(() => utledHandlinger(profil), [profil]);
  const valgte = handlinger.filter((h) => valgteHandlinger.includes(h.id));
  const tilFastlege = valgte.filter((h) => h.kanal === "fastlege" || h.kanal === "e-konsultasjon");
  const tilKommune = valgte.filter((h) => h.kanal === "kommune");
  const kommuneSamtykke = profil.samtykker.deling_sykehus_kommune === true;

  const viktigTekst = [...viktigForMeg, viktigFritekst.trim()].filter(Boolean).join(" · ");

  function sendInn() {
    fullforSteg("oppsummering");
    setSendt(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        {sendt ? (
          <div className="rounded-lg border border-success-700 bg-success-100 p-6 text-center">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-success-700" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-neutral-900 mt-3">Helsemelding 1.1 sendt</h1>
            <p className="text-neutral-700 mt-2 max-w-md mx-auto">
              Det du valgte er sendt strukturert til {profil.fastlege.split(",")[0]}
              {tilKommune.length > 0 && kommuneSamtykke ? ` og ${profil.kommune} kommune` : ""}.
              «Viktig for deg» følger med som ramme.
            </p>
            <p className="text-xs text-neutral-500 mt-4">
              Dette er en demo — ingenting er faktisk sendt.
            </p>
            <Link
              href="/min-helse"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-blueberry-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
            >
              Til Min helse
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 4 av 4</p>
              <h1 className="text-3xl font-bold text-neutral-900">Oppsummering</h1>
              <p className="text-neutral-600 mt-2">
                Se hva som sendes — strukturert, ikke fritekst — og til hvem. Alt forankres i det
                du sa var viktig for deg.
              </p>
            </div>

            {/* Viktig for deg — rammen */}
            <section className="mb-6 rounded-lg border-2 border-blueberry-500 bg-blueberry-50 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl" aria-hidden="true">💬</span>
                <h2 className="font-semibold text-blueberry-900">Viktig for deg</h2>
              </div>
              {viktigTekst ? (
                <p className="text-neutral-800">{viktigTekst}</p>
              ) : (
                <p className="text-neutral-400 italic">
                  Ikke angitt.{" "}
                  <Link href="/helsemelding-1-1/viktig" className="text-blueberry-700 hover:underline not-italic">
                    Legg til
                  </Link>
                </p>
              )}
            </section>

            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">
              Dette sendes videre
            </p>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              {/* Til fastlege */}
              <div className="rounded-lg border border-blueberry-100 bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <UserGroupIcon className="h-5 w-5 text-blueberry-700" aria-hidden="true" />
                  <h3 className="font-semibold text-neutral-900 text-sm">Til fastlege</h3>
                </div>
                <p className="text-xs text-neutral-500 mb-3">{profil.fastlege}</p>
                {tilFastlege.length > 0 ? (
                  <ul className="space-y-1.5">
                    {tilFastlege.map((h) => (
                      <li key={h.id} className="flex items-start gap-2 text-sm text-neutral-800">
                        {h.kanal === "e-konsultasjon" ? (
                          <ChatBubbleLeftRightIcon className="h-4 w-4 flex-shrink-0 text-blueberry-500 mt-0.5" aria-hidden="true" />
                        ) : (
                          <span className="text-blueberry-500 font-bold mt-0.5" aria-hidden="true">•</span>
                        )}
                        {h.tittel}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-neutral-400 italic">Ingen valgt</p>
                )}
                <p className="mt-3 border-t border-neutral-100 pt-2 text-[11px] text-neutral-500">
                  Følger med: bekreftet legemiddelliste, kritisk info og vaksinestatus.
                </p>
              </div>

              {/* Til kommune */}
              <div className="rounded-lg border border-success-700/30 bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BuildingOffice2Icon className="h-5 w-5 text-success-700" aria-hidden="true" />
                  <h3 className="font-semibold text-neutral-900 text-sm">Til {profil.kommune} kommune</h3>
                </div>
                <p className="text-xs text-neutral-500 mb-3">Frisklivssentral / kommunale tjenester</p>
                {tilKommune.length > 0 ? (
                  !kommuneSamtykke ? (
                    <div className="rounded-md border border-warning-700/40 bg-warning-100 p-2.5">
                      <p className="flex items-start gap-1.5 text-xs text-warning-700">
                        <LockClosedIcon className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          {tilKommune.length} ønske venter på samtykke til deling mellom sykehus og
                          kommune. Uten det sendes ingenting hit.
                        </span>
                      </p>
                    </div>
                  ) : (
                    <>
                      <ul className="space-y-1.5">
                        {tilKommune.map((h) => (
                          <li key={h.id} className="flex items-start gap-2 text-sm text-neutral-800">
                            <span className="text-success-700 font-bold mt-0.5" aria-hidden="true">•</span>
                            {h.tittel}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 border-t border-neutral-100 pt-2 text-[11px] text-neutral-500">
                        Deles med samtykke. «Viktig for deg» følger med som ramme.
                      </p>
                    </>
                  )
                ) : (
                  <p className="text-sm text-neutral-400 italic">Ingen kommunale ønsker valgt</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
              <Link
                href="/helsemelding-1-1/oppfolging"
                className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                Tilbake
              </Link>
              <button
                onClick={sendInn}
                className="flex items-center gap-2 rounded-md bg-success-700 px-6 py-3 text-base font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-success-700 focus:ring-offset-2 transition"
              >
                <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                Send inn Helsemelding 1.1
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
