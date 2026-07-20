"use client";

import { useRouter } from "next/navigation";
import { DemoBanner } from "@/components/DemoBanner";
import { Stepper } from "@/components/Stepper";
import { useUser } from "@/context/UserContext";
import { useHelsemelding11 } from "@/context/Helsemelding11Context";
import { flowNav, type StegDef } from "@/lib/helsemelding11";
import { detektKroniskeSykdommer } from "@/lib/medicalUtils";
import { FlowHeader, FlowNav } from "@/components/flow/FlowChrome";

export function FlowKritiskInfo({ steg, basePath }: { steg: StegDef[]; basePath: string }) {
  const router = useRouter();
  const { profil, helsemeldingState, oppdaterKritiskInfo } = useUser();
  const { viktigForMeg, viktigFritekst, fullfort, fullforSteg } = useHelsemelding11();
  const nav = flowNav(steg, "kritisk", basePath, fullfort);

  const kritiskInfo = profil.kritiskInfo;
  const harAllergi = !!(kritiskInfo.allergi && kritiskInfo.allergi.length > 0);
  const detektendeSykdommer = detektKroniskeSykdommer(profil.legemidler.faste, profil.legemidler.behovs);
  const personligInfo = helsemeldingState.kritiskInfoState.personligInfo;
  const harBehandlingsplan = helsemeldingState.kritiskInfoState.harKjentBehandlingsplan;
  const harViktig = viktigForMeg.length > 0 || viktigFritekst.trim().length > 0;

  function handlePersonligInfoChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    oppdaterKritiskInfo({ personligInfo: e.target.value.substring(0, 200) });
  }

  function neste() {
    fullforSteg("kritisk");
    if (nav.nextHref) router.push(nav.nextHref);
  }

  return (
    <div>
      <DemoBanner />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Stepper steps={nav.steps} />
        <FlowHeader nr={nav.nr} total={nav.total} title="Kritisk helseinformasjon">
          Gjennomgå informasjonen som er registrert i din kjernejournal. Kontakt helsepersonell
          hvis noe er uklart eller skal oppdateres.
        </FlowHeader>

        {harAllergi && (
          <section className="mb-8" aria-labelledby="allergi-heading">
            <div className="rounded-lg border border-cherry-200 bg-cherry-50 p-6">
              <h2 id="allergi-heading" className="text-lg font-semibold text-cherry-900 mb-4">Registrerte allergier</h2>
              <div className="rounded-md bg-white p-4 space-y-2 border border-cherry-100">
                {kritiskInfo.allergi!.map((a) => (
                  <div key={a} className="flex items-start gap-2 text-sm">
                    <span className="text-cherry-600 font-bold mt-0.5">•</span>
                    <span className="text-neutral-900">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {(kritiskInfo.bivirkninger?.length || kritiskInfo.kritiskFunksjon || kritiskInfo.annenKritiskInfo) && (
          <section className="mb-8 rounded-lg border border-neutral-200 bg-white p-6" aria-labelledby="kjernejournal-heading">
            <h2 id="kjernejournal-heading" className="text-lg font-semibold text-neutral-900 mb-4">Annen kritisk informasjon</h2>
            <div className="space-y-4">
              {kritiskInfo.bivirkninger && kritiskInfo.bivirkninger.length > 0 && (
                <div className="rounded-md bg-warning-50 p-4 border border-warning-100">
                  <p className="text-sm font-semibold text-neutral-900 mb-2">Kjente bivirkninger</p>
                  <ul className="space-y-1">
                    {kritiskInfo.bivirkninger.map((b) => (
                      <li key={b} className="text-sm text-neutral-700">• {b}</li>
                    ))}
                  </ul>
                </div>
              )}
              {kritiskInfo.kritiskFunksjon && (
                <div className="rounded-md bg-cherry-50 p-4 border border-cherry-100">
                  <p className="text-sm font-semibold text-neutral-900 mb-2">Kritisk funksjon</p>
                  <p className="text-sm text-neutral-700">{kritiskInfo.kritiskFunksjon}</p>
                </div>
              )}
              {kritiskInfo.annenKritiskInfo && (
                <div className="rounded-md bg-blueberry-50 p-4 border border-blueberry-100">
                  <p className="text-sm font-semibold text-neutral-900 mb-2">Annen viktig informasjon</p>
                  <p className="text-sm text-neutral-700">{kritiskInfo.annenKritiskInfo}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {detektendeSykdommer.length > 0 && (
          <section className="mb-8" aria-labelledby="kronisk-heading">
            <h2 id="kronisk-heading" className="text-lg font-semibold text-neutral-900 mb-4">Identifiserte kroniske sykdommer</h2>
            <div className="space-y-2">
              {detektendeSykdommer.map((s) => (
                <div key={s} className="rounded-md bg-neutral-50 p-3 border border-neutral-200">
                  <p className="text-sm text-neutral-900">{s}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-600 mt-3">Basert på dine nåværende legemidler.</p>
          </section>
        )}

        <section className="mb-8" aria-labelledby="personlig-heading">
          <h2 id="personlig-heading" className="text-lg font-semibold text-neutral-900 mb-3">Annen tilleggsinformasjon</h2>
          {harViktig && (
            <p className="text-sm text-neutral-600 mb-3">
              Det som er <strong>viktig for deg</strong> tok vi allerede med i første steg. Her kan
              du legge til andre forhold helsepersonell bør kjenne til — for eksempel sosial
              situasjon eller praktiske hensyn.
            </p>
          )}
          <textarea
            value={personligInfo}
            onChange={handlePersonligInfoChange}
            placeholder="Skriv her... (valgfritt, maks 200 tegn)"
            className="w-full rounded-md border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:border-transparent resize-none"
            rows={4}
          />
          <p className="text-xs text-neutral-500 mt-2">{personligInfo.length} / 200 tegn</p>
        </section>

        {profil.kroniskSykdomPlan.harKroniskSykdom && (
          <section className="mb-8" aria-labelledby="plan-heading">
            <h2 id="plan-heading" className="text-lg font-semibold text-neutral-900 mb-4">Behandlingsplan for kronisk sykdom</h2>
            <p className="text-neutral-700 text-sm mb-4">Har du en kjent behandlingsplan?</p>
            <div className="space-y-3">
              {[
                { value: true, label: "Ja, jeg har en behandlingsplan" },
                { value: false, label: "Nei, jeg har ikke en behandlingsplan" },
              ].map((o) => (
                <label key={o.value ? "ja" : "nei"} className="flex items-center gap-3 p-3 rounded-md border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition">
                  <input
                    type="radio"
                    name="behandlingsplan"
                    checked={harBehandlingsplan === o.value}
                    onChange={() => oppdaterKritiskInfo({ harKjentBehandlingsplan: o.value })}
                    className="w-4 h-4 accent-blueberry-900"
                  />
                  <span className="text-neutral-900">{o.label}</span>
                </label>
              ))}
            </div>
          </section>
        )}

        <FlowNav prevHref={nav.prevHref} onNext={neste} nextLabel={nav.nextLabel ?? "Neste"} />
      </div>
    </div>
  );
}
