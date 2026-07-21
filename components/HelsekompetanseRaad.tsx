"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";

interface Kort {
  id: string;
  ikon: string;
  tema: string;
  fremtid: string;
  tall: string;
  kilde: string;
  handling: string;
}

type Selvrapport = "royk" | "levevaner";

/** Arm «Råd»: ekspertråd rammet inn rundt deg om 5–10 år, med mestringstiltak. */
export function HelsekompetanseRaad({ omHref }: { omHref?: string }) {
  const { profil } = useUser();
  const [selvrapport, setSelvrapport] = useState<Set<Selvrapport>>(new Set());
  const eldre = profil.alder >= 60;

  function toggle(id: Selvrapport) {
    setSelvrapport((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  const kort: Kort[] = [];
  kort.push(
    eldre
      ? {
          id: "aktivitet",
          ikon: "🚶",
          tema: "Fysisk aktivitet",
          fremtid:
            "Å være i bevegelse nå er noe av det som best beskytter førligheten din — å klare trappa, handleturen og turer på egen hånd, og å kunne bo trygt hjemme lenger.",
          tall:
            "Blant eldre er de som er fysisk aktive omtrent halvparten så utsatt for å miste funksjon og få hjelpebehov. Fysisk inaktivitet er også én av 14 påvirkbare risikofaktorer for demens.",
          kilde: "WHO 2020; Lancet-kommisjonen om demens, 2024",
          handling:
            "150 minutter moderat aktivitet i uka, pluss styrke og balanse et par ganger — kan deles i korte økter. Litt teller, og det er aldri for sent å begynne.",
        }
      : {
          id: "aktivitet",
          ikon: "🏃",
          tema: "Fysisk aktivitet",
          fremtid:
            "Aktivitet nå bygger hjerte, humør og energi du får igjen for i årene som kommer — og legger grunnlaget for å holde deg frisk og selvhjulpen lenger.",
          tall:
            "Regelmessig aktivitet reduserer risikoen for hjerte- og karsykdom, type 2-diabetes, flere kreftformer og depresjon — og senere i livet også demens.",
          kilde: "WHO 2020; Lancet-kommisjonen om demens, 2024",
          handling:
            "150–300 minutter moderat aktivitet i uka. Alt teller — sykkel til jobb, en rask gåtur, eller trappa i stedet for heisen.",
        }
  );

  if (selvrapport.has("royk")) {
    kort.push({
      id: "royk",
      ikon: "🚭",
      tema: "Røykeslutt",
      fremtid:
        "Å slutte nå er det enkelttiltaket som betyr mest for helsa di framover — og mye av gevinsten kommer raskt: pust, blodtrykk og form bedres i løpet av uker og måneder.",
      tall:
        "Røyking forkorter forventet levealder med om lag ti år. Men de som slutter før 40-årsalderen unngår nesten hele denne risikoen.",
      kilde: "Jha et al., New England Journal of Medicine, 2013",
      handling:
        "Du trenger ikke klare det alene. Fastlegen, røyketelefonen og Slutta-appen hjelper — og legemidler omtrent dobler sjansen for å lykkes.",
    });
  }
  if (selvrapport.has("levevaner")) {
    kort.push({
      id: "levevaner",
      ikon: "🥗",
      tema: "Levevaner",
      fremtid:
        "Små, varige endringer i hverdagen — mat, aktivitet og søvn — påvirker energi, ledd og risiko for diabetes og hjertesykdom mer enn de fleste tror.",
      tall:
        "Det handler ikke om å bli «perfekt»: allerede moderate endringer i levevaner gir målbar helsegevinst, og du bestemmer tempoet selv.",
      kilde: "Helsedirektoratet; WHO",
      handling:
        "Frisklivssentralen i kommunen din hjelper deg med varige endringer i ditt eget tempo. Start med ett lite grep.",
    });
  }

  return (
    <div>
      <div className="mb-6 rounded-lg border-l-4 border-blueberry-500 bg-blueberry-50 p-4">
        <p className="flex items-start gap-2 text-sm text-neutral-700">
          <HeartIcon className="h-5 w-5 flex-shrink-0 text-blueberry-700 mt-0.5" aria-hidden="true" />
          <span>
            Her er kunnskapsbasert informasjon om hva du kan gjøre for egen helse. Du får alltid et
            konkret neste steg — og du bestemmer selv hva du vil gjøre med informasjonen.
          </span>
        </p>
      </div>

      <section className="mb-6 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-neutral-900 mb-2">Gjelder noe av dette deg? (valgfritt)</p>
        <p className="text-xs text-neutral-500 mb-3">
          Vi antar ingenting om deg. Huker du av, viser vi informasjon som er laget for akkurat det.
        </p>
        <div className="flex flex-wrap gap-2">
          {([
            { id: "royk", label: "Jeg røyker" },
            { id: "levevaner", label: "Jeg vil endre levevaner" },
          ] as { id: Selvrapport; label: string }[]).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => toggle(s.id)}
              aria-pressed={selvrapport.has(s.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 ${
                selvrapport.has(s.id)
                  ? "bg-blueberry-500 text-white"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-blueberry-500"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-4 mb-6">
        {kort.map((k) => (
          <article key={k.id} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl" aria-hidden="true">{k.ikon}</span>
              <h2 className="font-semibold text-neutral-900">{k.tema}</h2>
            </div>
            <div className="rounded-md bg-blueberry-50 border border-blueberry-100 p-3 mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-blueberry-700 mb-1">Deg om 5–10 år</p>
              <p className="text-sm text-neutral-800">{k.fremtid}</p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-1">Hva forskningen viser</p>
            <p className="text-sm text-neutral-700">{k.tall}</p>
            <p className="text-xs text-neutral-400 italic mt-1">Kilde: {k.kilde}</p>
            <div className="mt-3 rounded-md border-l-4 border-success-700 bg-success-100 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-success-700 mb-1">Det du kan gjøre</p>
              <p className="text-sm text-neutral-800">{k.handling}</p>
            </div>
          </article>
        ))}
      </div>

      {omHref && (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 mb-6">
          <p className="flex items-start gap-2 text-xs text-neutral-600">
            <InformationCircleIcon className="h-4 w-4 flex-shrink-0 text-neutral-500 mt-0.5" aria-hidden="true" />
            <span>
              Hvorfor er informasjonen lagt opp slik? Vi kobler alltid en ærlig konsekvens til et
              konkret tiltak du kan gjøre, og knytter det til deg om 5–10 år, fordi det gjør
              informasjonen lettere å ta i bruk.{" "}
              <Link href={omHref} className="text-blueberry-700 hover:underline">Les mer</Link>.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
