export type Category = 'min_behandling' | 'samarbeid_om_meg' | 'bidra_til_fremtiden';

export interface ConsentDetail {
  id: string;
  navn: string;
  kategori: Category;
  beskrivelse: string;
  hvoem: string[];
  praktiskBruk: string[];
  juridisk: {
    hjemmelsgrunnlag: string;
    formål: string;
    oppbevaring: string;
    rettigheter: string;
  };
  icon?: string;
  warningRequired?: boolean;
  warningText?: string;
}

/**
 * Detaljene bak hvert samtykke — grunnlag for «Les mer» og bekreftelses-popup.
 * Kun samtykker som faktisk brukes i skjemaet er tatt med.
 *
 * NB: Dette er demo-innhold. Tekst og juridiske hjemler er forenklet og bør
 * kvalitetssikres av fagperson før reell bruk.
 */
export const consentDetails: Record<string, ConsentDetail> = {
  organdonasjon: {
    id: 'organdonasjon',
    navn: 'Organdonasjon',
    kategori: 'min_behandling',
    beskrivelse: 'Du registrerer om organene og vevet ditt kan brukes til transplantasjon dersom du dør og er medisinsk egnet som donor. Du velger selv, og kan endre valget når som helst.',
    hvoem: [
      'Transplantasjonskoordinator ved donorsykehuset',
      'Transplantasjonssykehuset (Oslo universitetssykehus, Rikshospitalet)',
    ],
    praktiskBruk: [
      'Ved din død vurderes organene for donasjon hvis du er medisinsk egnet',
      'De nærmeste blir informert om ditt registrerte valg',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Transplantasjonslova (lov om donasjon og transplantasjon av organ, celler og vev)',
      formål: 'Å gjøre flere livreddende transplantasjoner mulig, basert på frivillig donasjon.',
      oppbevaring: 'Ditt registrerte valg lagres på Helsenorge så lenge det gjelder.',
      rettigheter: 'Du kan når som helst endre eller trekke tilbake valget. Et registrert valg skal veie tungt i vurderingen.'
    }
  },

  kjernejournal_oppslag: {
    id: 'kjernejournal_oppslag',
    navn: 'Kjernejournal — oppslag av helsepersonell',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at helsepersonell som behandler deg kan slå opp i kjernejournalen din for å se de viktigste opplysningene — kritisk info, legemidler og kontaktpunkter. Alle i Norge har kjernejournal om man ikke reserverer seg.',
    hvoem: ['Fastlege, legevakt og sykehus', 'Ambulanse og akuttmottak'],
    praktiskBruk: [
      'Legevakten ser raskt allergier og faste legemidler',
      'Ved akutt sykdom får behandlerne livsviktig informasjon med en gang',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientjournalloven § 13 og forskrift om nasjonal kjernejournal',
      formål: 'Å gi helsepersonell rask tilgang til de viktigste opplysningene når du trenger hjelp.',
      oppbevaring: 'Kjernejournal driftes nasjonalt av Norsk helsenett. All bruk logges.',
      rettigheter: 'Du kan reservere deg mot kjernejournal, sperre den, og se loggen over hvem som har gjort oppslag.'
    }
  },

  epikrise_til_fastlege: {
    id: 'epikrise_til_fastlege',
    navn: 'Epikrise til fastlege',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at epikriser (utskrivningsrapporter) fra sykehus sendes til fastlegen din, slik at fastlegen kan følge deg opp etter et sykehusopphold.',
    hvoem: ['Din fastlege', 'Norsk helsenett (helsenettet)'],
    praktiskBruk: [
      'Fastlegen ser hva som skjedde på sykehuset innen få dager',
      'Unødvendig dobbeltarbeid og gjentatte undersøkelser unngås',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helsepersonelloven § 45 og pasientjournalloven',
      formål: 'Å sikre kontinuitet mellom sykehus og fastlege.',
      oppbevaring: 'Epikrisen inngår i fastlegens og sykehusets journal etter nasjonale regler.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake når som helst. Du har rett til innsyn i epikrisen.'
    }
  },

  fastlege_sykehusjournal_innsyn: {
    id: 'fastlege_sykehusjournal_innsyn',
    navn: 'Fastlegen kan se sykehusjournal',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at fastlegen din kan se journalnotater fra sykehusbesøk, slik at fastlegen har full oversikt over behandlingen din.',
    hvoem: ['Din fastlege', 'Fastlegekontorets journalsystem'],
    praktiskBruk: [
      'Fastlegen ser hva som ble gjort på sykehuset uten at du må gjenfortelle alt',
      'Fastlegen unngår å be om undersøkelser som allerede er gjort',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientjournalloven og helsepersonelloven § 45',
      formål: 'Å gi fastlegen et komplett bilde, slik at oppfølgingen blir trygg og sammenhengende.',
      oppbevaring: 'Opplysningene inngår i fastlegens journal etter nasjonale retningslinjer.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake når som helst. Du har rett til å se hvem som har åpnet journalen din.'
    }
  },

  fastlege_digital_kommunikasjon: {
    id: 'fastlege_digital_kommunikasjon',
    navn: 'Digital meldingsutveksling med fastlege',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at fastlegen kan sende og motta meldinger om behandlingen din digitalt via Helsenorge, i stedet for kun brev og telefon.',
    hvoem: ['Din fastlege', 'Helsenorge'],
    praktiskBruk: [
      'Du kan få prøvesvar og beskjeder digitalt',
      'Enklere å avklare små spørsmål uten å møte opp',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientjournalloven og Normen for informasjonssikkerhet i helse- og omsorgstjenesten',
      formål: 'Å gjøre kontakten med fastlegen enklere og raskere, på en sikker digital kanal.',
      oppbevaring: 'Meldinger lagres i fastlegens journal og på Helsenorge etter gjeldende regler.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake. Du kan alltid velge tradisjonell kontakt i stedet.'
    }
  },

  fastlege_spesialist_deling: {
    id: 'fastlege_spesialist_deling',
    navn: 'Dele spesialistopplysninger med fastlege',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at rapporter fra spesialister automatisk sendes til fastlegen din, slik at fastlegen kan koordinere den samlede oppfølgingen.',
    hvoem: ['Din fastlege', 'Spesialister og poliklinikker du henvises til'],
    praktiskBruk: [
      'Fastlegen ser spesialistens vurdering og følger opp anbefalt behandling',
      'Du slipper å være budbringer mellom spesialist og fastlege',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helsepersonelloven § 45 og pasientjournalloven',
      formål: 'Å sikre at fastlegen kan koordinere behandlingen på tvers av spesialister.',
      oppbevaring: 'Opplysningene inngår i fastlegens journal.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake når som helst.'
    }
  },

  deling_mellom_sykehus: {
    id: 'deling_mellom_sykehus',
    navn: 'Deling av journal mellom sykehus',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at et sykehus du er innlagt på kan se relevante journalnotater fra andre sykehus du har vært pasient hos.',
    hvoem: ['Helsepersonell ved sykehus som behandler deg'],
    praktiskBruk: [
      'Legene ved et nytt sykehus ser behandlingshistorikken din og unngår farlige feil',
      'Prøver og bilder trenger ikke tas på nytt',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientjournalloven §§ 9–11 om tilgang til helseopplysninger mellom virksomheter',
      formål: 'Å gi behandlerne et helhetlig bilde, slik at behandlingen blir trygg og sammenhengende.',
      oppbevaring: 'Opplysningene forblir i hvert sykehus sin journal.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake. Du kan også sperre journalen for enkelte behandlere.'
    }
  },

  deling_mellom_regioner: {
    id: 'deling_mellom_regioner',
    navn: 'Deling mellom helseregioner',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at helsepersonell i en annen helseregion enn der du normalt behandles kan se relevant journalinformasjon, for eksempel ved innleggelse på reise.',
    hvoem: ['Helsepersonell i andre helseregioner'],
    praktiskBruk: [
      'Blir du akutt syk i en annen del av landet, ser legene behandlingshistorikken din',
      'Trygg overføring hvis du flyttes mellom regioner',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientjournalloven §§ 9–11',
      formål: 'Å sikre trygg behandling også utenfor din hjemmeregion.',
      oppbevaring: 'Opplysningene forblir i den behandlende virksomhetens journal.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake når som helst.'
    }
  },

  deling_sykehus_kommune: {
    id: 'deling_sykehus_kommune',
    navn: 'Deling mellom sykehus og kommune',
    kategori: 'samarbeid_om_meg',
    beskrivelse: 'Du tillater at kommunens helsetjenester kan se relevant helseinformasjon når du skrives ut fra sykehus eller trenger oppfølging hjemme.',
    hvoem: ['Hjemmesykepleien', 'Kommunens koordinatorer', 'Kommunelegen'],
    praktiskBruk: [
      'Hjemmesykepleien kjenner medisinlisten og sårstell fra sykehuset',
      'Trygg overgang fra sykehus til hjem eller sykehjem',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helsepersonelloven §§ 45 og 25',
      formål: 'Å sikre god og koordinert oppfølging i overgangen mellom sykehus og kommune.',
      oppbevaring: 'Opplysningene inngår i kommunens pasientjournal.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake, men det kan gjøre oppfølging hjemme vanskeligere.'
    }
  },

  kommune_samordning_omsorg: {
    id: 'kommune_samordning_omsorg',
    navn: 'Samordning av pleie og omsorg',
    kategori: 'samarbeid_om_meg',
    beskrivelse: 'Du tillater at kommune og sykehus samordner innsatsen når du trenger både spesialisthelsetjeneste og kommunale tjenester samtidig.',
    hvoem: ['Kommunale pleie- og omsorgstjenester', 'Sykehusets utskrivningskoordinator'],
    praktiskBruk: [
      'Tjenestene planlegger sammen, så tilbudet henger sammen for deg',
      'Mindre dobbeltarbeid og færre ventedager',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helse- og omsorgstjenesteloven og helsepersonelloven § 45',
      formål: 'Å gi deg et sammenhengende tilbud på tvers av sykehus og kommune.',
      oppbevaring: 'Opplysningene inngår i tjenestenes journaler.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake når som helst.'
    }
  },

  kommune_helsekoordiator_innsyn: {
    id: 'kommune_helsekoordiator_innsyn',
    navn: 'Helsekoordinator får innsyn',
    kategori: 'samarbeid_om_meg',
    beskrivelse: 'Du tillater at en koordinator i kommunen (for eksempel kreftkoordinator eller eldrehelsekoordinator) kan se deler av journalen for å koordinere behandlingen din.',
    hvoem: ['Kommunal koordinator', 'Relevante kommunale tjenester'],
    praktiskBruk: [
      'Koordinatoren binder sammen tilbudene rundt deg',
      'Du får én kontaktperson som har oversikt',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helse- og omsorgstjenesteloven og helsepersonelloven § 25',
      formål: 'Å gi deg en fast koordinator som kan samordne et sammensatt tilbud.',
      oppbevaring: 'Opplysningene inngår i kommunens journal.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake når som helst.'
    }
  },

  fullmakt_paroerende: {
    id: 'fullmakt_paroerende',
    navn: 'Fullmakt til pårørende',
    kategori: 'samarbeid_om_meg',
    beskrivelse: 'Du gir en pårørende du stoler på fullmakt til å hjelpe deg med helsetjenester digitalt — for eksempel se opplysninger, bestille timer eller lese meldinger på dine vegne.',
    hvoem: ['Den pårørende du selv velger', 'Helsenorge'],
    praktiskBruk: [
      'En voksen datter kan hjelpe en forelder med timer og meldinger',
      'Pårørende kan bidra i overgangene uten at du må gjøre alt selv',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasient- og brukerrettighetsloven kapittel 3 og vilkår for fullmakt på Helsenorge',
      formål: 'Å la en du stoler på hjelpe deg med helsetjenester når du ønsker eller trenger det.',
      oppbevaring: 'Fullmakten registreres på Helsenorge og gjelder til du endrer den.',
      rettigheter: 'Du bestemmer selv omfanget og kan når som helst endre eller trekke tilbake fullmakten.'
    }
  },

  digital_samhandling_helsenorge: {
    id: 'digital_samhandling_helsenorge',
    navn: 'Digital samhandling via Helsenorge',
    kategori: 'samarbeid_om_meg',
    beskrivelse: 'Du tillater at du kan kommunisere digitalt med ulike deler av helsevesenet gjennom Helsenorge — som timeavtaler, meldinger og skjemaer.',
    hvoem: ['Helsenorge', 'Fastlege, sykehus og kommune du er i kontakt med'],
    praktiskBruk: [
      'Samler dialogen med helsetjenesten ett sted',
      'Digitale skjema, varsler og timeavtaler',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientjournalloven og vilkår for bruk av Helsenorge',
      formål: 'Å gi deg en enkel og sikker digital inngang til helsetjenesten.',
      oppbevaring: 'Meldinger og dokumenter lagres på Helsenorge etter gjeldende regler.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake. Du kan alltid velge ikke-digital kontakt.'
    }
  },

  forebyggende_helse_kontakt: {
    id: 'forebyggende_helse_kontakt',
    navn: 'Kontakt for forebyggende helsearbeid',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du tillater at helsetjenesten kan kontakte deg om aktuelle forebyggende tilbud og program, for eksempel screening eller livsstilstilbud.',
    hvoem: ['Kommunens helsetjeneste', 'Frisklivssentral', 'Nasjonale screeningprogram'],
    praktiskBruk: [
      'Du får beskjed om relevante tilbud i tide',
      'Enklere å komme i gang med forebygging',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helse- og omsorgstjenesteloven og folkehelseloven',
      formål: 'Å nå deg med forebyggende tilbud som er relevante for din situasjon.',
      oppbevaring: 'Kontaktopplysninger brukes til henvendelsen og lagres etter gjeldende regler.',
      rettigheter: 'Helt frivillig samtykke som kan trekkes tilbake når som helst. Du kan takke nei til hvert enkelt tilbud.'
    }
  },

  kvalitetsforbedring: {
    id: 'kvalitetsforbedring',
    navn: 'Bidra til kvalitetsforbedring',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du tillater at dine erfaringer og opplysninger kan brukes til å forbedre kvaliteten på helsetjenestene, for eksempel gjennom kvalitetsregistre.',
    hvoem: ['Helsetjenesten der du behandles', 'Nasjonale medisinske kvalitetsregistre'],
    praktiskBruk: [
      'Tjenestene lærer av resultater og gjør behandlingen tryggere',
      'Bidrar til at helsetjenesten stadig blir bedre',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helseregisterloven og forskrifter om medisinske kvalitetsregistre',
      formål: 'Å måle og forbedre kvaliteten og pasientsikkerheten i helsetjenesten.',
      oppbevaring: 'Opplysningene lagres i tråd med det aktuelle registerets regelverk.',
      rettigheter: 'For mange kvalitetsregistre har du rett til å reservere deg mot deltakelse.'
    }
  },

  forskning_journaldata: {
    id: 'forskning_journaldata',
    navn: 'Bruk av journaldata i forskning',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du tillater at opplysninger fra journalen din kan brukes i godkjent medisinsk forskning. Du kan også reservere deg — da brukes ikke opplysningene dine til slik forskning.',
    hvoem: ['Godkjente forskningsprosjekter (vurdert av REK)', 'Universiteter og helseforetak'],
    praktiskBruk: [
      'Forskning på store pasientgrupper gir bedre og tryggere behandling',
      'Kunnskap om hva som faktisk virker i praksis',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helseforskningsloven og helsepersonelloven § 29',
      formål: 'Å skape ny kunnskap som kommer pasienter til gode, basert på erfaring fra mange forløp.',
      oppbevaring: 'Data pseudonymiseres og lagres etter det enkelte prosjektets protokoll.',
      rettigheter: 'Du har rett til å reservere deg mot bruk av journalopplysninger i forskning, og kan trekke reservasjonen når du vil.'
    }
  },

  forskning_kontakt: {
    id: 'forskning_kontakt',
    navn: 'Kontakt for forskning',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du tillater at du kan bli kontaktet om deltakelse i forskningsprosjekter som er relevante for din diagnose eller helsetilstand.',
    hvoem: ['Forskningsinstitusjoner og universiteter', 'REK (regional forskningsetisk komité)'],
    praktiskBruk: [
      'Du kan få invitasjon til studier som tester nye behandlinger for din tilstand',
      'Du velger selv ja eller nei til hvert enkelt prosjekt',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helseforskningsloven',
      formål: 'Å finne aktuelle deltakere til forskning som kan forbedre behandlingen.',
      oppbevaring: 'Kontaktopplysningene lagres hos forskningsinstitusjonen så lenge det er nødvendig.',
      rettigheter: 'Du kan når som helst trekke samtykket, og blir da ikke kontaktet om nye prosjekter.'
    }
  },

  forskning_biobank: {
    id: 'forskning_biobank',
    navn: 'Biobank — lagring av biologisk materiale',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du tillater at blod- og vevsprøver som tas i forbindelse med behandlingen din kan lagres i biobank og brukes i fremtidig forskning og diagnostikk.',
    hvoem: ['Biobanker og laboratorier', 'Godkjente forskningsprosjekter (vurdert av REK)'],
    praktiskBruk: [
      'En prøve kan brukes til nye analyser hvis diagnosen din endres',
      'Forskning på nye biomarkører kan inkludere prøven din',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helseforskningsloven og behandlingsbiobankloven',
      formål: 'Å lagre biologisk materiale for fremtidig forskning, diagnostikk og behandling.',
      oppbevaring: 'Prøver oppbevares regulert, ofte i mange år, avhengig av formål.',
      rettigheter: 'Du kan trekke samtykke for fremtidig bruk. Allerede utførte analyser kan ikke reverseres.'
    }
  },

  ai_maskinlaering: {
    id: 'ai_maskinlaering',
    navn: 'Kunstig intelligens og maskinlæring',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du tillater at avidentifiserte (pseudonymiserte) opplysninger om deg kan brukes til å utvikle og forbedre digitale verktøy og beslutningsstøtte i helsetjenesten.',
    hvoem: ['Godkjente utviklings- og forskningsmiljøer', 'Helsetjenestens fagmiljøer'],
    praktiskBruk: [
      'Bedre verktøy for å oppdage sykdom tidlig',
      'Beslutningsstøtte som hjelper helsepersonell',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Personvernforordningen (GDPR) og helseforskningsloven ved bruk av data',
      formål: 'Å utvikle tryggere og bedre verktøy for diagnostikk og behandling.',
      oppbevaring: 'Data anonymiseres eller pseudonymiseres før bruk.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake. Da stanser videre bruk av opplysningene dine.'
    }
  },

  student_undervisning: {
    id: 'student_undervisning',
    navn: 'Student- og undervisningsformål',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du tillater at avidentifiserte opplysninger om deg kan brukes i undervisning av helsefagstudenter og annet helsepersonell.',
    hvoem: ['Universiteter og høgskoler', 'Undervisningssykehus'],
    praktiskBruk: [
      'Fremtidens helsepersonell lærer av virkelige, anonymiserte eksempler',
      'Bedre utdannet helsepersonell',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Universitets- og høyskoleloven og personvernforordningen (GDPR)',
      formål: 'Å utdanne dyktig helsepersonell ved hjelp av anonymiserte eksempler.',
      oppbevaring: 'Kun anonymiserte opplysninger benyttes til undervisning.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake når som helst.'
    }
  }
};
