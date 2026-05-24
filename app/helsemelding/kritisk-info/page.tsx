"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import type { Step } from "@/types";

export default function KritiskInfo() {
  const router = useRouter();
  const { profil, helsemeldingState, oppdaterKritiskInfo, fullforSteg } = useUser();

  const steps: Step[] = [
    { id: 1, label: "Legemidler", path: "/helsemelding/legemidler", status: "completed" },
    { id: 2, label: "Kritisk info", path: "/helsemelding/kritisk-info", status: "active" },
    { id: 3, label: "Vaksiner", path: "/helsemelding/vaksiner", status: helsemeldingState.stepsCompleted[2] ? "completed" : "pending" },
    { id: 4, label: "Samtykker", path: "/helsemelding/samtykker", status: helsemeldingState.stepsCompleted[3] ? "completed" : "pending" },
    { id: 5, label: "Bekreft", path: "/helsemelding/bekreft", status: helsemeldingState.stepsCompleted[4] ? "completed" : "pending" },
  ];

  const detektendeSykdommer = inferrerKroniskeSykdommer();
  const kritiskInfo = profil.kritiskInfo;
  const harKritiskInfo = !!(kritiskInfo.allergi?.length || kritiskInfo.bivirkninger?.length || kritiskInfo.kritiskFunksjon || kritiskInfo.annenKritiskInfo);

  function inferrerKroniskeSykdommer(): string[] {
    const sykdommer: string[] = [];
    const alleMed = [...profil.legemidler.faste, ...profil.legemidler.behovs];

    const atcSykdomMap: Record<string, string> = {
      "B01": "Atrieflimmer/blodpropp",
      "A10": "Diabetes",
      "H04": "Diabetes",
      "R03": "Astma/KOLS",
    };

    const detektert = new Set<string>();

    for (const med of alleMed) {
      for (const [atcPrefix, sykdom] of Object.entries(atcSykdomMap)) {
        if (med.atc.startsWith(atcPrefix) && !detektert.has(sykdom)) {
          detektert.add(sykdom);
          sykdommer.push(sykdom);
        }
      }
    }

    return sykdommer;
  }

  const personligInfo = helsemeldingState.kritiskInfoState.personligInfo;
  const harBehandlingsplan = helsemeldingState.kritiskInfoState.harKjentBehandlingsplan;

  function handlePersonligInfoChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const tekst = e.target.value.substring(0, 200);
    oppdaterKritiskInfo({ personligInfo: tekst });
  }

  function neste() {
    fullforSteg(1);
    router.push("/helsemelding/vaksiner");
  }

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={steps} />

        <div className="mb-6">
          <p className="text-sm text-blueberry-700 font-medium mb-1">Steg 2 av 5</p>
          <h1 className="text-3xl font-bold text-neutral-900">Kritisk helseinformasjon</h1>
          <p className="text-neutral-600 mt-2">
            Viktig informasjon fra kjernejournal og dine kroniske sykdommer er vist nedenfor.
          </p>
        </div>

        {/* Kritisk info fra kjernejournal - HØYT OPPE */}
        {harKritiskInfo && (
          <section className="mb-8 rounded-lg border-2 border-cherry-500 bg-cherry-50 p-6" aria-labelledby="kjernejournal-heading">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">⚠️</span>
              <h2 id="kjernejournal-heading" className="text-lg font-bold text-cherry-900">
                Kritisk informasjon fra kjernejournal
              </h2>
            </div>

            <div className="space-y-4">
              {/* Allergi */}
              {kritiskInfo.allergi && kritiskInfo.allergi.length > 0 && (
                <div className="rounded-md bg-white p-4 border-l-4 border-cherry-500">
                  <p className="text-sm font-semibold text-cherry-900 mb-2">⚠️ Allergi</p>
                  <ul className="space-y-1">
                    {kritiskInfo.allergi.map((allergi) => (
                      <li key={allergi} className="text-sm text-neutral-700">
                        • {allergi}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bivirkninger */}
              {kritiskInfo.bivirkninger && kritiskInfo.bivirkninger.length > 0 && (
                <div className="rounded-md bg-white p-4 border-l-4 border-warning-500">
                  <p className="text-sm font-semibold text-warning-900 mb-2">⚠️ Kjente bivirkninger</p>
                  <ul className="space-y-1">
                    {kritiskInfo.bivirkninger.map((bivirkning) => (
                      <li key={bivirkning} className="text-sm text-neutral-700">
                        • {bivirkning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Kritisk funksjon */}
              {kritiskInfo.kritiskFunksjon && (
                <div className="rounded-md bg-white p-4 border-l-4 border-cherry-500">
                  <p className="text-sm font-semibold text-cherry-900 mb-2">⚠️ Kritisk funksjon</p>
                  <p className="text-sm text-neutral-700">{kritiskInfo.kritiskFunksjon}</p>
                </div>
              )}

              {/* Annen kritisk info */}
              {kritiskInfo.annenKritiskInfo && (
                <div className="rounded-md bg-white p-4 border-l-4 border-blueberry-500">
                  <p className="text-sm font-semibold text-blueberry-900 mb-2">ℹ️ Viktig informasjon</p>
                  <p className="text-sm text-neutral-700">{kritiskInfo.annenKritiskInfo}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Kroniske sykdommer */}
        <section className="mb-8" aria-labelledby="kronisk-heading">
          <h2 id="kronisk-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Kroniske sykdommer (identifisert fra legemidler)
          </h2>

          {detektendeSykdommer.length > 0 ? (
            <div className="space-y-3">
              {detektendeSykdommer.map((sykdom) => (
                <div key={sykdom} className="flex items-start gap-3 rounded-lg border border-warning-200 bg-warning-50 p-4">
                  <ExclamationCircleIcon className="h-5 w-5 text-warning-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-neutral-900">{sykdom}</p>
                    <p className="text-sm text-neutral-600 mt-1">
                      Basert på dine nåværende legemidler.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-blueberry-100 bg-blueberry-50 p-4">
              <p className="text-neutral-700">
                Ingen kroniske sykdommer identifisert fra dine nåværende legemidler.
              </p>
            </div>
          )}

          {profil.kroniskSykdomPlan.harKroniskSykdom && detektendeSykdommer.length > 0 && (
            <div className="mt-4 rounded-lg border border-blueberry-100 bg-blueberry-50 p-4">
              <div className="flex gap-2">
                <InformationCircleIcon className="h-5 w-5 text-blueberry-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-neutral-700">
                  <p className="font-medium text-blueberry-900 mb-1">Viktig informasjon</p>
                  <p>Det er viktig at du og helsepersonell ditt er enige om behandlingsplaner for kroniske sykdommer.</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Personlig helseinformasjon */}
        <section className="mb-8" aria-labelledby="personlig-heading">
          <h2 id="personlig-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Personlig helseinformasjon
          </h2>
          <p className="text-neutral-700 text-sm mb-3">
            Del kort hva som er viktig for deg og din helse. For eksempel: psykiske utfordringer, sosial situasjon, kostholds- eller livsstilspreferanser, eller annet som helsepersonell bør vite.
          </p>

          <div className="relative">
            <textarea
              value={personligInfo}
              onChange={handlePersonligInfoChange}
              placeholder="Skriv her... (maks 200 tegn)"
              className="w-full rounded-md border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:border-transparent resize-none"
              rows={5}
            />
            <p className="text-xs text-neutral-500 mt-2">
              {personligInfo.length} / 200 tegn
            </p>
          </div>
        </section>

        {/* Behandlingsplan */}
        <section className="mb-8" aria-labelledby="plan-heading">
          <h2 id="plan-heading" className="text-xl font-semibold text-neutral-900 mb-4">
            Kjent behandlingsplan
          </h2>
          <p className="text-neutral-700 text-sm mb-4">
            Har du en kjent behandlingsplan for kroniske sykdommer?
          </p>

          <div className="space-y-3 mb-6">
            {[
              { value: true, label: "Ja, jeg har en behandlingsplan" },
              { value: false, label: "Nei, jeg har ikke en behandlingsplan" },
            ].map((option) => (
              <label key={option.value ? "ja" : "nei"} className="flex items-center gap-3 p-3 rounded-md border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition">
                <input
                  type="radio"
                  name="behandlingsplan"
                  value={option.value ? "ja" : "nei"}
                  checked={harBehandlingsplan === option.value}
                  onChange={() => oppdaterKritiskInfo({ harKjentBehandlingsplan: option.value })}
                  className="w-4 h-4 accent-blueberry-900"
                />
                <span className="font-medium text-neutral-900">{option.label}</span>
              </label>
            ))}
          </div>

          {harBehandlingsplan && (
            <div>
              <p className="text-neutral-700 text-sm mb-3">
                Beskriv kort din behandlingsplan (valgfritt):
              </p>
              <textarea
                value={helsemeldingState.kritiskInfoState.behandlingsplanBeskrivelse}
                onChange={(e) => oppdaterKritiskInfo({ behandlingsplanBeskrivelse: e.target.value })}
                placeholder="F.eks. kardiolog følger min hjertesykdom, nevrolog behandler min epilepsi..."
                className="w-full rounded-md border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
          )}

          <div className="mt-4 rounded-lg border border-blueberry-100 bg-blueberry-50 p-4">
            <p className="text-sm text-neutral-700 mb-2">
              <strong>Ressurser fra Folkehelseinstituttet (FHI):</strong>
            </p>
            <ul className="text-sm space-y-1">
              <li>
                <a href="https://www.fhi.no/nettpub/hovedtemaer/kroniske-sykdommer/" target="_blank" rel="noopener noreferrer" className="text-blueberry-700 hover:underline">
                  FHI: Kroniske sykdommer →
                </a>
              </li>
              <li>
                <a href="https://www.fhi.no/nettpub/behandlingsplaner/" target="_blank" rel="noopener noreferrer" className="text-blueberry-700 hover:underline">
                  FHI: Behandlingsplaner →
                </a>
              </li>
              <li>
                <a href="https://www.helsenorge.no/" target="_blank" rel="noopener noreferrer" className="text-blueberry-700 hover:underline">
                  Helsenorge: Din helseportal →
                </a>
              </li>
            </ul>
          </div>
        </section>

        <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <Link
            href="/helsemelding/legemidler"
            className="flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Link>
          <button
            onClick={neste}
            className="flex items-center gap-2 rounded-md bg-blueberry-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blueberry-700 focus:outline-none focus:ring-2 focus:ring-blueberry-500"
          >
            Neste: Vaksiner
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
