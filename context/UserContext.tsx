"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { profiles, type ProfilKey } from "@/data/profiles";
import type {
  UserProfile,
  MedicationResponse,
  VaccineResponse,
  SamtykkeState,
  KritiskInfoState,
  HelsemeldingState,
} from "@/types";

interface UserContextValue {
  aktivProfil: ProfilKey;
  profil: UserProfile;
  byttProfil: (id: ProfilKey) => void;
  helsemeldingState: HelsemeldingState;
  oppdaterMedicationResponse: (response: MedicationResponse) => void;
  oppdaterVaccineResponse: (response: VaccineResponse) => void;
  oppdaterSamtykke: (updates: Partial<SamtykkeState>) => void;
  oppdaterKritiskInfo: (updates: Partial<KritiskInfoState>) => void;
  setErImmunkompromittert: (val: boolean) => void;
  fullforSteg: (stegIndex: number) => void;
  nullstill: () => void;
}

function lagInitialSamtykkeState(profil: UserProfile): SamtykkeState {
  const kvReg: Record<string, boolean> = {};
  for (const kv of profil.samtykker.kvalitetsregistre) {
    kvReg[kv.navn] = kv.samtykke;
  }
  const studier: Record<string, boolean | null> = {};
  for (const s of profil.samtykker.aktive_studier) {
    studier[s.id] = s.samtykke;
  }

  let orgdonasjon: "ja" | "nei" | "ikke_tatt_stilling" | null;
  if (profil.samtykker.organdonasjon === true) orgdonasjon = "ja";
  else if (profil.samtykker.organdonasjon === false) orgdonasjon = "nei";
  else orgdonasjon = null;

  return {
    organdonasjon: orgdonasjon,
    deling_mellom_sykehus: profil.samtykker.deling_mellom_sykehus,
    deling_mellom_regioner: profil.samtykker.deling_mellom_regioner,
    deling_sykehus_kommune: profil.samtykker.deling_sykehus_kommune,
    deling_private_aktorer: profil.samtykker.deling_private_aktorer,
    forskning_biobank: profil.samtykker.forskning_biobank,
    kvalitetsregistre: kvReg,
    aktive_studier: studier,
  };
}

function lagInitialHelsemeldingState(profil: UserProfile): HelsemeldingState {
  return {
    medicationResponses: [],
    vaccineResponses: [],
    samtykkeState: lagInitialSamtykkeState(profil),
    kritiskInfoState: {
      personligInfo: "",
      harKjentBehandlingsplan: null,
      behandlingsplanBeskrivelse: "",
    },
    erImmunkompromittert: false,
    stepsCompleted: [false, false, false, false, false],
  };
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [aktivProfil, setAktivProfil] = useState<ProfilKey>("kari");
  const [helsemeldingState, setHelsemeldingState] =
    useState<HelsemeldingState>(() =>
      lagInitialHelsemeldingState(profiles["kari"])
    );

  const byttProfil = useCallback((id: ProfilKey) => {
    setAktivProfil(id);
    setHelsemeldingState(lagInitialHelsemeldingState(profiles[id]));
  }, []);

  const oppdaterMedicationResponse = useCallback(
    (response: MedicationResponse) => {
      setHelsemeldingState((prev) => {
        const existing = prev.medicationResponses.findIndex(
          (r) => r.medId === response.medId
        );
        if (existing >= 0) {
          const updated = [...prev.medicationResponses];
          updated[existing] = response;
          return { ...prev, medicationResponses: updated };
        }
        return {
          ...prev,
          medicationResponses: [...prev.medicationResponses, response],
        };
      });
    },
    []
  );

  const oppdaterVaccineResponse = useCallback((response: VaccineResponse) => {
    setHelsemeldingState((prev) => {
      const existing = prev.vaccineResponses.findIndex(
        (r) => r.vaksine === response.vaksine
      );
      if (existing >= 0) {
        const updated = [...prev.vaccineResponses];
        updated[existing] = response;
        return { ...prev, vaccineResponses: updated };
      }
      return {
        ...prev,
        vaccineResponses: [...prev.vaccineResponses, response],
      };
    });
  }, []);

  const oppdaterSamtykke = useCallback(
    (updates: Partial<SamtykkeState>) => {
      setHelsemeldingState((prev) => ({
        ...prev,
        samtykkeState: { ...prev.samtykkeState, ...updates },
      }));
    },
    []
  );

  const oppdaterKritiskInfo = useCallback(
    (updates: Partial<KritiskInfoState>) => {
      setHelsemeldingState((prev) => ({
        ...prev,
        kritiskInfoState: { ...prev.kritiskInfoState, ...updates },
      }));
    },
    []
  );

  const setErImmunkompromittert = useCallback((val: boolean) => {
    setHelsemeldingState((prev) => ({
      ...prev,
      erImmunkompromittert: val,
    }));
  }, []);

  const fullforSteg = useCallback((stegIndex: number) => {
    setHelsemeldingState((prev) => {
      const updated = [...prev.stepsCompleted];
      updated[stegIndex] = true;
      return { ...prev, stepsCompleted: updated };
    });
  }, []);

  const nullstill = useCallback(() => {
    setHelsemeldingState(lagInitialHelsemeldingState(profiles[aktivProfil]));
  }, [aktivProfil]);

  return (
    <UserContext.Provider
      value={{
        aktivProfil,
        profil: profiles[aktivProfil],
        byttProfil,
        helsemeldingState,
        oppdaterMedicationResponse,
        oppdaterVaccineResponse,
        oppdaterSamtykke,
        oppdaterKritiskInfo,
        setErImmunkompromittert,
        fullforSteg,
        nullstill,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
