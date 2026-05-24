"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";

const innloggedePaths = ["/min-helse", "/helsemelding", "/om-helsemelding"];

export function Header() {
  const { profil } = useUser();
  const pathname = usePathname();

  const erInnlogget = innloggedePaths.some((p) => pathname.startsWith(p));

  return (
    <header className="bg-blueberry-900 text-white" role="banner">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blueberry-900 rounded-sm">
            <span className="text-2xl font-bold tracking-tight">
              helse
              <span className="text-blueberry-500">demo</span>
              <span className="inline-block ml-0.5 h-2 w-2 rounded-full bg-blueberry-500 align-middle" aria-hidden="true" />
            </span>
          </Link>

          <nav aria-label="Hovednavigasjon" className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="opacity-85 hover:opacity-100 transition-opacity focus:outline-none focus:underline">
              Hjem
            </Link>
            <Link href="/om-helsemelding" className="opacity-85 hover:opacity-100 transition-opacity focus:outline-none focus:underline">
              Om demo
            </Link>
            {erInnlogget ? (
              <>
                <Link href="/min-helse" className="opacity-85 hover:opacity-100 transition-opacity focus:outline-none focus:underline">
                  Min helse
                </Link>
                <span className="opacity-85 text-sm">{profil.navn.split(" ")[0]}</span>
                <Link
                  href="/"
                  className="rounded-md border border-white/60 px-4 py-1.5 text-sm opacity-85 hover:opacity-100 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Logg ut
                </Link>
              </>
            ) : (
              <Link
                href="/logg-inn"
                className="rounded-md border border-white px-4 py-1.5 text-sm hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white"
              >
                Logg inn
              </Link>
            )}
          </nav>

          <div className="md:hidden">
            {erInnlogget ? (
              <Link href="/" className="rounded-md border border-white/60 px-3 py-1.5 text-sm">
                Logg ut
              </Link>
            ) : (
              <Link href="/logg-inn" className="rounded-md border border-white px-3 py-1.5 text-sm">
                Logg inn
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
