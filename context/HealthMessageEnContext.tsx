"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { nhsProfile } from "@/data/nhsProfile";

export type TakingStatus = "as_prescribed" | "different_dose" | "stopped" | null;
export type YesUnsure = "yes" | "unsure" | null;
export type YesNo = "yes" | "no" | null;
export type ImmunisationChoice = "book" | "not_now" | "already" | null;
export type OrganDecision = "opt_in" | "opt_out" | null;

interface SharingState {
  scrAdditionalInformation: boolean;
  gpHospitalSharing: boolean;
  organDonationDecision: OrganDecision;
  nationalDataOptOut: boolean;
}

interface HealthMessageState {
  // Medicines review
  knowWhy: Record<string, YesUnsure>; // "Do you know why you take this?"
  taking: Record<string, TakingStatus>; // "Are you taking it now?"
  whenHow: Record<string, YesUnsure>; // when-required: "Do you know when and how to take it?"
  courseFinished: Record<string, YesNo>; // course: "Has this course finished?"
  medicineNote: Record<string, string>;
  // Key info
  criticalNote: string;
  carePlan: YesNo;
  // Vaccinations
  immunisation: Record<string, ImmunisationChoice>;
  immunosuppressed: YesNo;
  // Sharing
  sharing: SharingState;
  // 1.1
  whatMatters: string[];
  whatMattersNote: string;
  prevention: string[];
  followUp: string[];
  completed: Record<string, boolean>;
}

interface HealthMessageValue extends HealthMessageState {
  setKnowWhy: (id: string, value: YesUnsure) => void;
  setTaking: (id: string, value: TakingStatus) => void;
  setWhenHow: (id: string, value: YesUnsure) => void;
  setCourseFinished: (id: string, value: YesNo) => void;
  setMedicineNote: (id: string, note: string) => void;
  setCriticalNote: (note: string) => void;
  setCarePlan: (value: YesNo) => void;
  setImmunisation: (vaccine: string, choice: ImmunisationChoice) => void;
  setImmunosuppressed: (value: YesNo) => void;
  setSharing: (updates: Partial<SharingState>) => void;
  toggleWhatMatters: (value: string) => void;
  setWhatMattersNote: (note: string) => void;
  togglePrevention: (id: string) => void;
  toggleFollowUp: (id: string) => void;
  setFollowUp: (ids: string[]) => void;
  complete: (stepKey: string) => void;
}

const initialState: HealthMessageState = {
  knowWhy: {},
  taking: {},
  whenHow: {},
  courseFinished: {},
  medicineNote: {},
  criticalNote: "",
  carePlan: null,
  immunisation: {},
  immunosuppressed: null,
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

  const setField = useCallback(
    <K extends keyof HealthMessageState>(key: K, value: HealthMessageState[K]) => {
      setState((s) => ({ ...s, [key]: value }));
    },
    []
  );

  const setKnowWhy = useCallback((id: string, value: YesUnsure) => {
    setState((s) => ({ ...s, knowWhy: { ...s.knowWhy, [id]: value } }));
  }, []);
  const setTaking = useCallback((id: string, value: TakingStatus) => {
    setState((s) => ({ ...s, taking: { ...s.taking, [id]: value } }));
  }, []);
  const setWhenHow = useCallback((id: string, value: YesUnsure) => {
    setState((s) => ({ ...s, whenHow: { ...s.whenHow, [id]: value } }));
  }, []);
  const setCourseFinished = useCallback((id: string, value: YesNo) => {
    setState((s) => ({ ...s, courseFinished: { ...s.courseFinished, [id]: value } }));
  }, []);
  const setMedicineNote = useCallback((id: string, note: string) => {
    setState((s) => ({ ...s, medicineNote: { ...s.medicineNote, [id]: note } }));
  }, []);
  const setImmunisation = useCallback((vaccine: string, choice: ImmunisationChoice) => {
    setState((s) => ({ ...s, immunisation: { ...s.immunisation, [vaccine]: choice } }));
  }, []);

  const setCriticalNote = useCallback((note: string) => setField("criticalNote", note), [setField]);
  const setCarePlan = useCallback((value: YesNo) => setField("carePlan", value), [setField]);
  const setImmunosuppressed = useCallback((value: YesNo) => setField("immunosuppressed", value), [setField]);
  const setWhatMattersNote = useCallback((note: string) => setField("whatMattersNote", note), [setField]);
  const setFollowUp = useCallback((ids: string[]) => setField("followUp", ids), [setField]);

  const setSharing = useCallback((updates: Partial<SharingState>) => {
    setState((s) => ({ ...s, sharing: { ...s.sharing, ...updates } }));
  }, []);

  const toggleWhatMatters = useCallback((value: string) => {
    setState((s) => ({ ...s, whatMatters: toggleIn(s.whatMatters, value) }));
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
        setKnowWhy,
        setTaking,
        setWhenHow,
        setCourseFinished,
        setMedicineNote,
        setCriticalNote,
        setCarePlan,
        setImmunisation,
        setImmunosuppressed,
        setSharing,
        toggleWhatMatters,
        setWhatMattersNote,
        togglePrevention,
        toggleFollowUp,
        setFollowUp,
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
