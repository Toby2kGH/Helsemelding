export const ATC_SYKDOM_MAP: Record<string, string> = {
  "B01": "Atrieflimmer/blodpropp",
  "A10": "Diabetes",
  "H04": "Diabetes",
  "R03": "Astma/KOLS",
};

export function detektKroniskeSykdommer(
  fasteMedikamenter: any[],
  behovsMedikamenter: any[]
): string[] {
  const sykdommer: string[] = [];
  const alleMed = [...fasteMedikamenter, ...behovsMedikamenter];
  const detektert = new Set<string>();

  for (const med of alleMed) {
    for (const [atcPrefix, sykdom] of Object.entries(ATC_SYKDOM_MAP)) {
      if (med.atc.startsWith(atcPrefix) && !detektert.has(sykdom)) {
        detektert.add(sykdom);
        sykdommer.push(sykdom);
      }
    }
  }

  return sykdommer;
}
