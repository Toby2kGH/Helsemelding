"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Livssituasjon } from "@/lib/forebyggingEngine";

export type Steg11 =
  | "viktig"
  | "legemidler"
  | "kritisk"
  | "samtykker"
  | "forebygging"
  | "oppfolging"
  | "oppsummering";

interface Helsemelding11State {
  viktigForMeg: string[];
  viktigFritekst: string;
  livssituasjoner: Livssituasjon[];
  valgteHandlinger: string[];
  fullfort: Record<Steg11, boolean>;
}

interface Helsemelding11Value extends Helsemelding11State {
  toggleViktig: (verdi: string) => void;
  settFritekst: (verdi: string) => void;
  toggleLivssituasjon: (verdi: Livssituasjon) => void;
  settValgteHandlinger: (ids: string[]) => void;
  toggleHandling: (id: string) => void;
  fullforSteg: (steg: Steg11) => void;
}

const initialState: Helsemelding11State = {
  viktigForMeg: [],
  viktigFritekst: "",
  livssituasjoner: [],
  valgteHandlinger: [],
  fullfort: {
    viktig: false,
    legemidler: false,
    kritisk: false,
    samtykker: false,
    forebygging: false,
    oppfolging: false,
    oppsummering: false,
  },
};

const Ctx = createContext<Helsemelding11Value | null>(null);

const toggleI = <T,>(liste: T[], verdi: T): T[] =>
  liste.includes(verdi) ? liste.filter((v) => v !== verdi) : [...liste, verdi];

export function Helsemelding11Provider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Helsemelding11State>(initialState);

  const toggleViktig = useCallback((verdi: string) => {
    setState((s) => ({ ...s, viktigForMeg: toggleI(s.viktigForMeg, verdi) }));
  }, []);

  const settFritekst = useCallback((verdi: string) => {
    setState((s) => ({ ...s, viktigFritekst: verdi }));
  }, []);

  const toggleLivssituasjon = useCallback((verdi: Livssituasjon) => {
    setState((s) => ({ ...s, livssituasjoner: toggleI(s.livssituasjoner, verdi) }));
  }, []);

  const settValgteHandlinger = useCallback((ids: string[]) => {
    setState((s) => ({ ...s, valgteHandlinger: ids }));
  }, []);

  const toggleHandling = useCallback((id: string) => {
    setState((s) => ({ ...s, valgteHandlinger: toggleI(s.valgteHandlinger, id) }));
  }, []);

  const fullforSteg = useCallback((steg: Steg11) => {
    setState((s) => ({ ...s, fullfort: { ...s.fullfort, [steg]: true } }));
  }, []);

  return (
    <Ctx.Provider
      value={{
        ...state,
        toggleViktig,
        settFritekst,
        toggleLivssituasjon,
        settValgteHandlinger,
        toggleHandling,
        fullforSteg,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useHelsemelding11(): Helsemelding11Value {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useHelsemelding11 must be used within Helsemelding11Provider");
  return ctx;
}
