"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { nhsProfiles, type NhsProfile, type NhsProfileKey } from "@/data/nhsProfile";

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
  activeProfile: NhsProfileKey;
  // Medicines review
  knowWhy: Record<string, YesUnsure>;
  taking: Record<string, TakingStatus>;
  whenHow: Record<string, YesUnsure>;
  courseFinished: Record<string, YesNo>;
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
  lifeSituations: string[];
  prevention: string[];
  followUp: string[];
  completed: Record<string, boolean>;
}

interface HealthMessageValue extends HealthMessageState {
  profile: NhsProfile;
  setProfile: (key: NhsProfileKey) => void;
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
  toggleLifeSituation: (value: string) => void;
  togglePrevention: (id: string) => void;
  toggleFollowUp: (id: string) => void;
  setFollowUp: (ids: string[]) => void;
  complete: (stepKey: string) => void;
}

function makeInitialState(key: NhsProfileKey): HealthMessageState {
  const profile = nhsProfiles[key];
  return {
    activeProfile: key,
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
      scrAdditionalInformation: profile.sharing.scrAdditionalInformation,
      gpHospitalSharing: profile.sharing.gpHospitalSharing,
      organDonationDecision: profile.sharing.organDonationDecision,
      nationalDataOptOut: profile.sharing.nationalDataOptOut,
    },
    whatMatters: [],
    whatMattersNote: "",
    lifeSituations: [],
    prevention: [],
    followUp: [],
    completed: {},
  };
}

const Ctx = createContext<HealthMessageValue | null>(null);

const toggleIn = <T,>(list: T[], value: T): T[] =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

export function HealthMessageProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<HealthMessageState>(() => makeInitialState("margaret"));

  // Switching profile starts a fresh Health Message for that person.
  const setProfile = useCallback((key: NhsProfileKey) => setState(makeInitialState(key)), []);

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

  const setCriticalNote = useCallback((note: string) => setState((s) => ({ ...s, criticalNote: note })), []);
  const setCarePlan = useCallback((value: YesNo) => setState((s) => ({ ...s, carePlan: value })), []);
  const setImmunosuppressed = useCallback((value: YesNo) => setState((s) => ({ ...s, immunosuppressed: value })), []);
  const setWhatMattersNote = useCallback((note: string) => setState((s) => ({ ...s, whatMattersNote: note })), []);
  const setFollowUp = useCallback((ids: string[]) => setState((s) => ({ ...s, followUp: ids })), []);

  const setSharing = useCallback((updates: Partial<SharingState>) => {
    setState((s) => ({ ...s, sharing: { ...s.sharing, ...updates } }));
  }, []);
  const toggleWhatMatters = useCallback((value: string) => {
    setState((s) => ({ ...s, whatMatters: toggleIn(s.whatMatters, value) }));
  }, []);
  const toggleLifeSituation = useCallback((value: string) => {
    setState((s) => ({ ...s, lifeSituations: toggleIn(s.lifeSituations, value) }));
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
        profile: nhsProfiles[state.activeProfile],
        setProfile,
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
        toggleLifeSituation,
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
