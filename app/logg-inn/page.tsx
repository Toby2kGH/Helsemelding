"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import type { ProfilKey } from "@/data/profiles";

const innloggingsMetoder = [
  {
    id: "bankid-app",
    tittel: "BankID (app)",
    beskrivelse: "Bruk BankID-appen på mobilen din",
    ikon: "📱",
  },
  {
    id: "bankid-kodebrikke",
    tittel: "BankID (kodebrikke)",
    beskrivelse: "Bruk engangskoden fra kodebrikken din",
    ikon: "🔑",
  },
  {
    id: "buypass",
    tittel: "Buypass ID",
    beskrivelse: "Logg inn med Buypass ID-kort",
    ikon: "💳",
  },
];

const demoProfiler: { id: ProfilKey; navn: string; label: string }[] = [
  { id: "kari", navn: "Kari Mette Solberg", label: "72 år, Bærum" },
  { id: "sara", navn: "Sara Aisha Khan", label: "28 år, Oslo" },
  { id: "jonas", navn: "Jonas Andreas Berg", label: "24 år, Trondheim" },
];

export default function LoggInn() {
  const router = useRouter();
  const { byttProfil } = useUser();

  function loggInn(profilId: ProfilKey) {
    byttProfil(profilId);
    router.push("/min-helse");
  }

  return (
    <div className="min-h-[calc(100vh-160px)] bg-neutral-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white shadow-md overflow-hidden">
          <div className="bg-blueberry-900 px-6 py-5">
            <h1 className="text-xl font-bold text-white">
              Logg inn på Helsenorge
            </h1>
            <p className="text-blueberry-100 text-sm mt-1">
              Velg innloggingsmetode
            </p>
          </div>

          <div className="p-6 space-y-3">
            {innloggingsMetoder.map((m) => (
              <button
                key={m.id}
                onClick={() => loggInn("kari")}
                className="w-full flex items-center gap-4 rounded-md border-2 border-neutral-200 p-4 text-left hover:border-blueberry-500 hover:bg-blueberry-50 transition focus:outline-none focus:ring-2 focus:ring-blueberry-500"
              >
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{m.ikon}</span>
                <div>
                  <p className="font-semibold text-neutral-900">{m.tittel}</p>
                  <p className="text-sm text-neutral-500">{m.beskrivelse}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-neutral-100 bg-warning-100 p-4">
            <p className="text-xs font-semibold text-warning-700 mb-3">
              🔬 DEMO — Velg hvilken testprofil du vil bruke:
            </p>
            <div className="space-y-2">
              {demoProfiler.map((p) => (
                <button
                  key={p.id}
                  onClick={() => loggInn(p.id)}
                  className="w-full flex items-center justify-between rounded-md border border-warning-700 bg-white px-3 py-2 text-sm hover:bg-warning-100 transition focus:outline-none focus:ring-2 focus:ring-warning-700"
                >
                  <span className="font-medium text-neutral-900">{p.navn}</span>
                  <span className="text-neutral-500 text-xs">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-4">
          Innloggingen er sikret med BankID og kryptert kommunikasjon.
        </p>
      </div>
    </div>
  );
}
