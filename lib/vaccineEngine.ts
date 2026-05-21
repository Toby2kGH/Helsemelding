import type { UserProfile, SysvakPost, VaksinAnbefaling } from "@/types";

function erOverTiÅrSiden(dato: string | null): boolean {
  if (!dato) return true;
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
  return new Date(dato) < tenYearsAgo;
}

export function beregnVaksinanbefalinger(
  profil: UserProfile,
  sysvak: SysvakPost[],
  erImmunkompromittert: boolean
): VaksinAnbefaling[] {
  const anbefalinger: VaksinAnbefaling[] = [];

  const harDiagnose = (...diagnoser: string[]) =>
    diagnoser.some((d) =>
      profil.diagnoser.some((pd) => pd.toLowerCase().includes(d.toLowerCase()))
    );

  if (profil.alder >= 65) {
    anbefalinger.push({
      vaksine: "Influensa",
      anbefalt: true,
      prioritet: "høy",
      årsak: "Du er over 65 år og har kronisk sykdom. Influensavaksine anbefales hvert år.",
      siste: sysvak.find((v) => v.vaksine.toLowerCase().includes("influensa"))?.dato ?? "Ikke registrert",
      handling: "Ta kontakt med fastlege eller apotek for årets influensavaksine.",
    });
    anbefalinger.push({
      vaksine: "Covid-19 booster",
      anbefalt: true,
      prioritet: "høy",
      årsak: "Du er over 65 år. Boostervaksine mot covid-19 anbefales av FHI.",
      siste: sysvak.find((v) => v.vaksine.toLowerCase().includes("covid"))?.dato ?? "Ikke registrert",
      handling: "Kontakt fastlegen for årets booster.",
    });
    const harPneumo = sysvak.some((v) =>
      v.vaksine.toLowerCase().includes("pneumo")
    );
    if (!harPneumo) {
      anbefalinger.push({
        vaksine: "Pneumokokkvaksine (Prevenar 20)",
        anbefalt: true,
        prioritet: "høy",
        årsak: `Du er ${profil.alder} år og har ikke fått pneumokokkvaksine. Det nasjonale voksenvaksinasjonsprogrammet anbefaler én dose.`,
        siste: "Ikke registrert i SYSVAK",
        handling: "Kontakt fastlegen — vaksinen er inkludert i det nye nasjonale voksenvaksinasjonsprogrammet (juni 2025).",
      });
    }
  }

  if (harDiagnose("diabetes", "astma", "kols", "hjerte")) {
    const harPneumo = anbefalinger.some((a) =>
      a.vaksine.includes("Pneumo")
    ) || sysvak.some((v) => v.vaksine.toLowerCase().includes("pneumo"));
    if (!harPneumo) {
      anbefalinger.push({
        vaksine: "Pneumokokkvaksine (Prevenar 20)",
        anbefalt: true,
        prioritet: "høy",
        årsak: "Du har kronisk sykdom (risikogruppe). Pneumokokkvaksine anbefales av FHI.",
        siste: "Ikke registrert i SYSVAK",
        handling: "Kontakt fastlegen din for å få vaksinen.",
      });
    }

    const harCovid = anbefalinger.some((a) => a.vaksine.includes("Covid"));
    if (!harCovid) {
      const sisteCovidPost = sysvak.find((v) =>
        v.vaksine.toLowerCase().includes("covid")
      );
      if (
        !sisteCovidPost ||
        sisteCovidPost.status === "anbefalt_fornyelse" ||
        sisteCovidPost.status === "utdatert"
      ) {
        anbefalinger.push({
          vaksine: "Covid-19 booster",
          anbefalt: true,
          prioritet: "høy",
          årsak: "Du er i risikogruppe (kronisk sykdom) og siste booster ble satt for over ett år siden.",
          siste: sisteCovidPost?.dato ?? "Ikke registrert",
          handling: "Kontakt fastlegen for årets booster.",
        });
      }
    }
  }

  const sistedTP = sysvak.find(
    (v) => v.vaksine.toLowerCase().includes("dtp") || v.vaksine.toLowerCase().includes("d-t-p")
  );
  if (erOverTiÅrSiden(sistedTP?.dato ?? null)) {
    anbefalinger.push({
      vaksine: "dTP-booster",
      anbefalt: true,
      prioritet: profil.alder >= 65 ? "middels" : "lav",
      årsak:
        sistedTP
          ? `Siste dTP-booster ble satt for over 10 år siden. Fornying anbefales.`
          : "Ingen dTP-booster er registrert i SYSVAK. Vurder om du trenger oppdatering.",
      siste: sistedTP?.dato ?? "Ikke registrert",
      handling: "Ta opp med fastlegen ved neste konsultasjon.",
    });
  }

  if (erImmunkompromittert) {
    return anbefalinger
      .filter((a) => !["MMR", "Varicella", "Gulfeber"].some((lv) => a.vaksine.includes(lv)))
      .map((a) => ({
        ...a,
        handling: `⚠️ Immunkompromitterte bør diskutere denne vaksinen med fastlegen. ${a.handling}`,
      }));
  }

  const sett = new Set<string>();
  return anbefalinger.filter((a) => {
    if (sett.has(a.vaksine)) return false;
    sett.add(a.vaksine);
    return true;
  });
}
