import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-blueberry-700 text-white mt-auto" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <h3 className="font-semibold text-sm mb-3 opacity-90">Om Helsenorge</h3>
            <ul className="space-y-2 text-sm opacity-75">
              <li><Link href="/om-helsemelding" className="hover:opacity-100 hover:underline focus:outline-none focus:underline">Om Helsemelding</Link></li>
              <li><span className="cursor-default">Om tjenesten</span></li>
              <li><span className="cursor-default">Tilgjengelighet</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3 opacity-90">Kontakt</h3>
            <ul className="space-y-2 text-sm opacity-75">
              <li><span className="cursor-default">Kontakt oss</span></li>
              <li><span className="cursor-default">Hjelp og støtte</span></li>
              <li><span className="cursor-default">Chat med oss</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3 opacity-90">Personvern</h3>
            <ul className="space-y-2 text-sm opacity-75">
              <li><span className="cursor-default">Personvernerklæring</span></li>
              <li><span className="cursor-default">Informasjonskapsler</span></li>
              <li><span className="cursor-default">Dine rettigheter</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3 opacity-90">Språk</h3>
            <ul className="space-y-2 text-sm opacity-75">
              <li><span className="cursor-default font-semibold text-white">Norsk bokmål</span></li>
              <li><span className="cursor-default">Norsk nynorsk</span></li>
              <li><span className="cursor-default">English</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-xs opacity-60">
          <p>Eies og driftes av Norsk helsenett SF</p>
          <p className="mt-1">
            <span className="font-semibold text-warning-100">DEMO-APPLIKASJON</span> — Ikke offisielt Helsenorge. Kun for demonstrasjonsformål.
          </p>
        </div>
      </div>
    </footer>
  );
}
