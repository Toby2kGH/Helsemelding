"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { nhsProfile } from "@/data/nhsProfile";

export type MedicineStatus = "taking" | "stopped" | "changed" | null;
export type ImmunisationChoice = "book" | "not_now" | "already" | null;
export type OrganDecision = "opt_in" | "opt_out" | null;

interface SharingState {
  scrAdditionalInformation: boolean;
  gpHospitalSharing: boolean;
  organDonationDecision: OrganDecision;
  nationalDataOptOut: boolean;
}

interface HealthMessageState {
  medicine: Record<string, MedicineStatus>;
  medicineNote: Record<string, string>;
  immunisation: Record<string, ImmunisationChoice>;
  criticalNote: string;
  criticalConfirmed: boolean;
  sharing: SharingState;
  whatMatters: string[];
  whatMattersNote: string;
  prevention: string[];
  followUp: string[];
  completed: Record<string, boolean>;
}

interface HealthMessageValue extends HealthMessageState {
  setMedicine: (id: string, status: MedicineStatus) => void;
  setMedicineNote: (id: string, note: string) => void;
  setImmunisation: (vaccine: string, choice: ImmunisationChoice) => void;
  setCriticalNote: (note: string) => void;
  setCriticalConfirmed: (val: boolean) => void;
  setSharing: (updates: Partial<SharingState>) => void;
  toggleWhatMatters: (value: string) => void;
  setWhatMattersNote: (note: string) => void;
  togglePrevention: (id: string) => void;
  toggleFollowUp: (id: string) => void;
  complete: (stepKey: string) => void;
}

const initialState: HealthMessageState = {
  medicine: {},
  medicineNote: {},
  immunisation: {},
  criticalNote: "",
  criticalConfirmed: false,
  sharing: {
    scrAdditionalInformation: nhsProfile.sharing.scrAdditionalInformation,
    gpHospitalSharing: nhsProfile.sharing.gpHospitalSharing,
    organDonationDecision: nhsProfile.sharing.organDonationDecision,
    nationalDataOptOut: nhsProfile.sharing.nationalDataOptOut,
  },
  whatMatters: [],
  whatMattersNote: "",
  prevention: [],
  followUp: [],
  completed: {},
};

const Ctx = createContext<HealthMessageValue | null>(null);

const toggleIn = <T,>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

export function HealthMessageProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HealthMessageState>(initialState);

  const setMedicine = useCallback((id: string, status: MedicineStatus) => {
    setState((s) => ({ ...s, medicine: { ...s.medicine, [id]: status } }));
  }, []);

  const setMedicineNote = useCallback((id: string, note: string) => {
    setState((s) => ({ ...s, medicineNote: { ...s.medicineNote, [id]: note } }));
  }, []);

  const setImmunisation = useCallback((vaccine: string, choice: ImmunisationChoice) => {
    setState((s) => ({ ...s, immunisation: { ...s.immunisation, [vaccine]: choice } }));
  }, []);

  const setCriticalNote = useCallback((note: string) => {
    setState((s) => ({ ...s, criticalNote: note }));
  }, []);

  const setCriticalConfirmed = useCallback((val: boolean) => {
    setState((s) => ({ ...s, criticalConfirmed: val }));
  }, []);

  const setSharing = useCallback((updates: Partial<SharingState>) => {
    setState((s) => ({ ...s, sharing: { ...s.sharing, ...updates } }));
  }, []);

  const toggleWhatMatters = useCallback((value: string) => {
    setState((s) => ({ ...s, whatMatters: toggleIn(s.whatMatters, value) }));
  }, []);

  const setWhatMattersNote = useCallback((note: string) => {
    setState((s) => ({ ...s, whatMattersNote: note }));
  }, []);

  const togglePrevention = useCallback((id: string) => {
    setState((s) => ({ ...s, prevention: toggleIn(s.prevention, id) }));
  }, []);

  const toggleFollowUp = useCallback((id: string) => {
    setState((s) => ({ ...s, followUp: toggleIn(s.followUp, id) }));
  }, []);

  const complete = useCallback((stepKey: string) => {
    setState((s) => ({ ...s, completed: { ...s.completed, [stepKey]: true } }));
  }, []);

  return (
    <Ctx.Provider
      value={{
        ...state,
        setMedicine,
        setMedicineNote,
        setImmunisation,
        setCriticalNote,
        setCriticalConfirmed,
        setSharing,
        toggleWhatMatters,
        setWhatMattersNote,
        togglePrevention,
        toggleFollowUp,
        complete,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useHealthMessage(): HealthMessageValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useHealthMessage must be used within HealthMessageProvider");
  return ctx;
}
