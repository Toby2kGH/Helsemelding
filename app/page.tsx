import Link from "next/link";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  BeakerIcon,
  ShieldCheckIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const tjenester = [
  { ikon: <ClipboardDocumentListIcon className="h-7 w-7" aria-hidden="true" />, tittel: "Mine resepter", href: "/logg-inn", desc: "Se og forny reseptene dine" },
  { ikon: <CalendarDaysIcon className="h-7 w-7" aria-hidden="true" />, tittel: "Timeavtaler", href: "/logg-inn", desc: "Se kommende timer og bestill ny time" },
  { ikon: <BeakerIcon className="h-7 w-7" aria-hidden="true" />, tittel: "Mine vaksiner", href: "/logg-inn", desc: "Se din vaksinasjonshistorikk" },
  { ikon: <DocumentTextIcon className="h-7 w-7" aria-hidden="true" />, tittel: "Journaldokumenter", href: "/logg-inn", desc: "Se dine journaldokumenter fra sykehus" },
  { ikon: <TruckIcon className="h-7 w-7" aria-hidden="true" />, tittel: "Pasientreiser", href: "/logg-inn", desc: "Søk om reiserefusjon" },
  { ikon: <ShieldCheckIcon className="h-7 w-7 text-cherry-500" aria-hidden="true" />, tittel: "Helsemelding", href: "/helsemelding", desc: "Gjennomgå legemidler, vaksiner og samtykker", isNew: true },
];

const artikler = [
  {
    kategori: "Gravid",
    tittel: "Alt du trenger å vite om svangerskapsomsorgen",
    ingress: "Oversikt over undersøkelser, rettigheter og støtte gjennom svangerskapet.",
  },
  {
    kategori: "Eldre",
    tittel: "Legemiddelgjennomgang for eldre — hva er det?",
    ingress: "En legemiddelgjennomgang kan bidra til tryggere medisinering og bedre livskvalitet.",
  },
  {
    kategori: "Psykisk helse",
    tittel: "Lavterskeltilbud for psykisk helse i din kommune",
    ingress: "Finn hjelpetilbud nær deg — uten lang ventetid.",
  },
];

export default function Forside() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-blueberry-900 text-white py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-3">Din helseportal</h1>
          <p className="text-blueberry-100 text-lg mb-8 max-w-xl">
            Helsenorge gir deg tilgang til dine helseopplysninger og offentlige helsetjenester.
          </p>

          <div className="relative max-w-lg mb-8">
            <label htmlFor="sok" className="sr-only">Søk på helsenorge.no</label>
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400"
              aria-hidden="true"
            />
            <input
              id="sok"
              type="search"
              placeholder="Søk på helsenorge.no"
              className="w-full rounded-md border-0 py-3 pl-10 pr-4 text-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-blueberry-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {["Bytt fastlege", "Frikort og egenandeler", "Europeisk helsetrygdkort"].map((l) => (
              <Link
                key={l}
                href="/logg-inn"
                className="rounded-full border border-blueberry-100/60 px-4 py-1.5 text-sm hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tjenester */}
      <section className="py-12 px-4" aria-labelledby="tjenester-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="tjenester-heading" className="text-2xl font-bold text-neutral-900 mb-6">
            Dine helsetjenester
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {tjenester.map((t) => (
              <Link
                key={t.tittel}
                href={t.href}
                className="group relative flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm hover:border-blueberry-500 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blueberry-500"
              >
                {t.isNew && (
                  <span className="absolute top-3 right-3 rounded-full bg-cherry-500 px-2 py-0.5 text-xs font-bold text-white">
                    NY
                  </span>
                )}
                <span className={t.isNew ? "text-cherry-500" : "text-blueberry-700"}>
                  {t.ikon}
                </span>
                <div>
                  <p className="font-semibold text-neutral-900 group-hover:text-blueberry-700 transition-colors">
                    {t.tittel}
                  </p>
                  <p className="text-sm text-neutral-500 mt-0.5">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Redaksjonelt */}
      <section className="bg-white py-12 px-4 border-t border-neutral-100" aria-labelledby="artikler-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="artikler-heading" className="text-2xl font-bold text-neutral-900 mb-6">
            Helseinformasjon
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {artikler.map((a) => (
              <article key={a.tittel} className="rounded-lg border border-neutral-200 bg-neutral-50 p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-blueberry-700 mb-2 block">
                  {a.kategori}
                </span>
                <h3 className="font-semibold text-neutral-900 mb-2">{a.tittel}</h3>
                <p className="text-sm text-neutral-600">{a.ingress}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Logg inn CTA */}
      <section className="py-12 px-4 bg-blueberry-50 border-t border-blueberry-100">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl font-bold text-blueberry-900 mb-3">
            Logg inn for å se dine helseopplysninger
          </h2>
          <p className="text-neutral-700 mb-6 max-w-xl mx-auto">
            Med BankID får du trygg tilgang til Helsenorge. Se resepter, vaksiner, timeavtaler og mer.
          </p>
          <Link
            href="/logg-inn"
            className="inline-flex items-center gap-2 rounded-md bg-blueberry-900 px-6 py-3 text-lg font-semibold text-white hover:bg-blueberry-700 transition focus:outline-none focus:ring-2 focus:ring-blueberry-500 focus:ring-offset-2"
          >
            <span aria-hidden="true">🔐</span>
            Logg inn med BankID
          </Link>
          <p className="text-xs text-neutral-400 mt-4">
            Helsenorge bruker BankID for sikker identifikasjon. Din innlogging er kryptert.
          </p>
        </div>
      </section>
    </div>
  );
}
