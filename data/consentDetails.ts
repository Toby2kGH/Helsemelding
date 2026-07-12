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

export const consentDetails: Record<string, ConsentDetail> = {
  organdonasjon: {
    id: 'organdonasjon',
    navn: 'Organdonasjon',
    kategori: 'min_behandling',
    beskrivelse: 'Du gir samtykke til at dine organer og vev kan brukes til transplantasjon dersom du skulle dø og være egnet som donor. Dette kan redde eller forbedre livet til andre mennesker som venter på organdonasjon.',
    hvoem: [
      'Lokalt transplantasjonsteam',
      'Nasjonalt transplantasjonsregister',
      'Sykehus hvor transplantasjon utføres',
      'Norsk Helsenettverk for organdonasjon'
    ],
    praktiskBruk: [
      'Ved din død vurderes dine organer for donasjon hvis du er medisinsk egnet',
      'Nære familien blir informert om din donasjonsstatus',
      'Organer som hjerte, lever, nyrer og lunger kan redde andres liv',
      'Prosessen foregår med respekt for din familie og dine verdier'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Lov om transplantasjon, øvrig helsepersonell og Helsedirektoratets retningslinjer',
      formål: 'Å tilby livreddende og livskvalitetsforbringende transplantasjoner basert på altruistiske donasjoner',
      oppbevaring: 'Informasjonen oppbevares i nasjonalt register så lenge du er registrert som donor',
      rettigheter: 'Du kan når som helst trekke tilbake ditt samtykke. Familien din kan også motsette seg donasjon ved din død.'
    }
  },

  epikrise_til_fastlege: {
    id: 'epikrise_til_fastlege',
    navn: 'Epikrise til fastlege',
    kategori: 'min_behandling',
    beskrivelse: 'Du gir samtykke til at utskrivningsrapporter og epikriser fra sykehus automatisk sendes til din fastlege. Dette sikrer at fastlegen har oversikt over din behandling og kan følge deg opp best mulig etter sykehusopphold.',
    hvoem: [
      'Din fastlege',
      'Helsenavn-systemet',
      'Relevant sykehus- og poliklinikkenheter',
      'Kommunens helsestasjon hvis relevant'
    ],
    praktiskBruk: [
      'Etter sykehusopphold sendes epikrise automatisk til fastlegen innen 2-3 dager',
      'Fastlegen kan følge opp behandlingen og medisiner du har fått',
      'Unødige duplisering av undersøkelser og tester unngås',
      'Fastlegen er bedre forberedt på dine helsebehov ved neste konsultasjon'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helsepersonelloven § 22 og pasientjournalloven',
      formål: 'Å sikre kontinuitet i behandlingen og informasjonsflyten mellom spesialisthelsetjenesten og primærhelsetjenesten',
      oppbevaring: 'Epikrisen oppbevares i fastlegens journal og hos sykehuset etter nasjonale retningslinjer',
      rettigheter: 'Du har rett til innsyn i epikrisen og kan be om feil blir rettet. Du kan når som helst trekke dette samtykket.'
    }
  },

  vaksiner: {
    id: 'vaksiner',
    navn: 'Vaksinasjonshistorikk',
    kategori: 'min_behandling',
    beskrivelse: 'Du gir samtykke til at din vaksinasjonshistorikk (vaksinasjonsstatus og tidligere vaksinasjoner) kan ses av helsepersonell som behandler deg. Dette er viktig for riktig medisinsk behandling.',
    hvoem: [
      'Din fastlege',
      'Sykehus og poliklinikkenheter',
      'Vaksinasjonsgrupper og epidemiologer',
      'Smittevernsleger',
      'Norges vaksinasjonsregister'
    ],
    praktiskBruk: [
      'Legen din kan se at du har vaksiner mot meslinger før du skal på immunsupprimerende behandling',
      'Ved innleggelse på sykehus sjekker de raskt om du har vaksine mot influensa',
      'Helsearbeidere vet at du har vaksine og trenger ikke å vaksinere deg igjen unødvendig',
      'I tilfelle smittsomme sykdommer kan smittevernsleger raskt sjekke dine vaksinasjoner'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Smittevernloven og Helsedirektoratets retningslinjer',
      formål: 'Å sikre riktig medisinsk behandling, optimalisert smittevern, og unngå duplisering av vaksinasjoner',
      oppbevaring: 'Vaksinasjonshistorikk lagres i Norges vaksinasjonsregister og din journal hos fastlege',
      rettigheter: 'Du har rett til innsyn i din vaksinasjonshistorikk og kan kontakte helsetjenesten for rettelser. Du kan trekke samtykket, men dette anbefales ikke.'
    }
  },

  deling_med_helsepersonell: {
    id: 'deling_med_helsepersonell',
    navn: 'Deling med helsepersonell',
    kategori: 'samarbeid_om_meg',
    beskrivelse: 'Du gir samtykke til at din helseinformasjon kan deles blant helsepersonell fra forskjellige institusjoner som er involvert i din behandling. Dette krever at alle har lovlig grunnlag og behov for informasjonen.',
    hvoem: [
      'Leger, sykepleiere og annet helsepersonell',
      'Alle sykehus og poliklinikkenheter du er pasient hos',
      'Privatpraktiserende leger hvis du bruker disse',
      'Tannleger og tannklinikkene',
      'Psykologer og psykiatriske klinikker'
    ],
    praktiskBruk: [
      'Fysioterapeuten din kan se noten fra legen om din diagnose og funksjonstrening',
      'Tannlegen sjekker om du bruker blodfortynnende medisin før behandling',
      'Psykolog og psykiater kan samarbeide om din behandling med delt journalinformasjon',
      'Ambulansetjenesten får rask tilgang til allergi- og medisinlister ved en nødsituasjon'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientjournalloven § 25 og helsepersonelloven § 22',
      formål: 'Å sikre samordnet og effektiv behandling av pasienten basert på velinformerte kliniske beslutninger',
      oppbevaring: 'Informasjonen oppbevares i hver behandlers journal etter nasjonale retningslinjer',
      rettigheter: 'Du kan gi eller nekke samtykke for deling med spesifikke helsepersonell. Du har rett til å vite hvem som har sett journalen din.'
    },
    warningRequired: true,
    warningText: 'Hvis du ikke tillater deling med helsepersonell, kan det bli vansker med å koordinere behandlingen din på tvers av institusjoner. Vi anbefaler at du snakker med fastlegen din før du gjør denne endringen.'
  },

  forskning_kontakt: {
    id: 'forskning_kontakt',
    navn: 'Kontakt for forskning',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du gir samtykke til at du kan bli kontaktet om deltakelse i forskningsprosjekter som er relevant for din diagnose eller helsetilstand.',
    hvoem: [
      'Forskningsinstitusjoner',
      'Universiteter og høgskolesentre',
      'Sykehusenheter som driver forskning',
      'REK (Regionale komiteer for medisinsk og helsefaglig forskningsetikk)'
    ],
    praktiskBruk: [
      'Du kan få invitasjon til å delta i kliniske studier som tester nye behandlinger for din tilstand',
      'Du blir kontaktet direkte og kan velge å si ja eller nei til hvert enkelt prosjekt',
      'Du kan senere trekke deg fra et prosjekt uten at det påvirker din behandling'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helseforskningsloven og Forskrift om medisinsk og helsefaglig forskning',
      formål: 'Å identifisere potensielle deltakere for forskningsprosjekter som kan forbedre behandlingen',
      oppbevaring: 'Kontaktinformasjonen lagres hos forskningsinstitutsjonen. Oppbevaringstid varierer etter prosjekt.',
      rettigheter: 'Du kan når som helst trekke samtykket. Du blir ikke kontaktet om nye prosjekter etter at du har trukket samtykket.'
    }
  },

  forskning_biobank: {
    id: 'forskning_biobank',
    navn: 'Biobank — lagring av biologisk materiale',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du gir samtykke til at blodprøver, vevsprøver og annet biologisk materiale som tas i forbindelse med din behandling kan lagres og brukes i fremtidig forskning og diagnostikk.',
    hvoem: [
      'Biobanker',
      'Patologisk institutt',
      'Laboratorier og sykehus',
      'Godkjente forskningsgrupper',
      'REK og datainspektør'
    ],
    praktiskBruk: [
      'Blodprøven din fra diagnoseundersøkelsen oppbevares i biobank',
      'Prøven kan brukes til nye tester hvis din diagnose endres',
      'Forskning på nye biomarkører kan inkludere din prøve hvis du gir samtykke',
      'Du vil bli informert hvis prøven din skal brukes i spesifikt prosjekt'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helseforskningsloven og Biobankregisteret',
      formål: 'Å lagre biologisk materiale for fremtidig forskning, diagnostikk og behandling',
      oppbevaring: 'Prøver oppbevares under regulert forhold. Oppbevaringtid varierer fra 5-20 år eller lenger, avhengig av prosjekt.',
      rettigheter: 'Du kan trekke samtykke for fremtidig bruk. Tidligere gjennomførte analyser kan ikke reverseres, men nye analyser vil stoppe.'
    }
  },

  forskning: {
    id: 'forskning',
    navn: 'Bidra til medisinsk forskning',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du gir samtykke til at dine helseopplysninger kan brukes i medisinsk forskning godkjent av Regionale komiteer for medisinsk og helsefaglig forskningsetikk (REK). Dette kan bidra til bedre behandling for deg selv og andre i framtiden.',
    hvoem: [
      'Forskningsinstitusjoner',
      'Universiteter og høgskolesentre',
      'Og-sykehusenheter som driver forskning',
      'Biobank og bioprosjekter',
      'REK (Regionale komiteer for medisinsk og helsefaglig forskningsetikk)'
    ],
    praktiskBruk: [
      'Din diagnose- og behandlingsdata kan være del av studier som tester nye behandlinger',
      'Biologisk materiale som blod eller vev kan bevares i biobank for fremtidig forskning',
      'Forskning på effektiviteten av ulike behandlinger baseres på data fra pasienter som deg',
      'Du kan få tilbud om deltakelse i spesifikke forskningsprosjekter'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helseforskningsloven og Forskrift om medisinsk og helsefaglig forskning',
      formål: 'Å fremme vitenskapelig kunnskap og utvikling av nye og bedre behandlingsmetoder',
      oppbevaring: 'Forskningsdata pseudonymiseres og oppbevares sikker. Lagring varer i henhold til prosjektets protokoll, typisk 5-10 år.',
      rettigheter: 'Du kan når som helst trekke samtykket. Hvis du trekker seg, vil nye analyser av dine data stoppe, men allerede publiserte resultater kan ikke reverseres.'
    }
  },

  kommunal_helse: {
    id: 'kommunal_helse',
    navn: 'Samarbeid med kommunen',
    kategori: 'samarbeid_om_meg',
    beskrivelse: 'Når du skrives ut fra sykehus eller trenger oppfølging hjemme, må kommunens helsetjenester kunne se relevant helseinformasjon for å hjelpe deg. Dette gjelder hjemmesykepleie, kreftkoordinator, eldrehelsekoordinator og andre kommunale tjenester.',
    hvoem: [
      'Hjemmesykepleien',
      'Kreftkoordinator eller eldrehelsekoordinator',
      'Kommunelegen',
      'Helsestasjonen',
      'Psykisk helse- og russentre i kommunen'
    ],
    praktiskBruk: [
      'Hjemmesykepleien kan se sårstell-instruksjoner og medisinliste fra sykehus',
      'Kreftkoordinator får oversikt over behandling for å koordinere oppfølging',
      'Kommunelegen kan følge opp reseptfornyinger og videre behandling',
      'Ved utskrivning til rehabilitering eller pleiehjem kan de relevante tjenestene se behandlingsplan'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helsepersonelloven § 25 og samhandlingsreformen',
      formål: 'Å sikre god oppfølging i kommunen og samordnet helsetjenester mellom sykehus og kommune',
      oppbevaring: 'Informasjonen lagres i kommunens pasientjournal og oppbevares etter nasjonale retningslinjer',
      rettigheter: 'Du kan trekke dette samtykket, men det anbefales ikke da det kan påvirke koordineringen av din behandling.'
    },
    warningRequired: true,
    warningText: 'Hvis du ikke tillater deling med kommunen, kan det bli vansker med oppfølging hjemme og koordinering mellom sykehus og kommune. Vi anbefaler at du snakker med fastlegen din før du gjør denne endringen.'
  },

  nødsituasjoner: {
    id: 'nødsituasjoner',
    navn: 'Deling i nødsituasjoner',
    kategori: 'min_behandling',
    beskrivelse: 'Du gir samtykke til at din helseinformasjon kan deles med helsepersonell som behandler deg i en nødsituasjon, også uten at du kan samtykke på stedet. Dette kan redde livet ditt.',
    hvoem: [
      'Ambulansetjenesten',
      'Legevakt og akuttmottaker',
      'Sykehus notfall-avdeling',
      'Luftambulanse',
      'Alle relevante helsepersonell ved traumatiske skader'
    ],
    praktiskBruk: [
      'Du mistet bevisstheten etter en ulykke. Ambulansen får umiddelbar tilgang til at du har diabetes og allergi mot penicillin',
      'Du får hjerteinfarkt og legen på legevakten ser at du allerede tar blodfortynnere',
      'Sykehuset ser dine tidligere operasjoner og blodtype før kirurgi',
      'Luftambulanse vet om dine kroniske sykdommer og kan gi riktig behandling under transport'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helsepersonelloven § 21 (unntak fra taushetsplikt ved nødsituasjoner)',
      formål: 'Å sikre rask og riktig medisinsk behandling når du er i umiddelbar fare for livet eller vesentlig helse',
      oppbevaring: 'Informasjonen lagres som del av nødsituasjonens journal og deres kliniske systemer',
      rettigheter: 'Du kan ikke velge å ikke gi samtykke her, da det er nødvendig for rask behandling i kritiske situasjoner.'
    }
  },

  genetisk_informasjon: {
    id: 'genetisk_informasjon',
    navn: 'Genetisk informasjon fra familie',
    kategori: 'samarbeid_om_meg',
    beskrivelse: 'Du gir samtykke til at genetisk informasjon om familierelasjoner og arvet sykdom kan oppbevares og brukes i din behandling. Dette kan være viktig for diagnose og forebygging av arvelige sykdommer.',
    hvoem: [
      'Kliniske genetikere',
      'Genetisk laboratorium',
      'Din fastlege',
      'Relevant spesialist som behandler deg',
      'Familiemedlemmer som har gitt samtykke'
    ],
    praktiskBruk: [
      'Genetiker vet at brystkreft og eggstokk-kreft løper i familien din og kan tilby screening',
      'Legen din kan planlegge tidlig oppfølging hvis du har arvet risiko for hjertesykdom',
      'Din datter kan få informasjon om risikoen hun har arvet, hvis hun også gir samtykke',
      'Genetisk test blir relevante for deg basert på familieanamnese'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientrettighetsloven og Helsedirektoratets retningslinjer for genetisk tjeneste',
      formål: 'Å identifisere og håndtere arvelige sykdommer for bedre behandling og forebygging',
      oppbevaring: 'Genetisk informasjon oppbevares i sikret format hos klinisk genetikk og i pasientjournalen',
      rettigheter: 'Du har rett til genetisk veiledning før og etter testing. Du kan trekke samtykket for fremtidig bruk, men tidligere analyser kan ikke endres.'
    }
  },

  resept_refusjon: {
    id: 'resept_refusjon',
    navn: 'Reseptrefusjon og legemiddel',
    kategori: 'min_behandling',
    beskrivelse: 'Du gir samtykke til at informasjon om dine resepter og legemiddelbruk kan ses av Helsenavn-systemet, slik at legen din raskt kan se hvilke medisiner du bruker når du møter til konsultasjon.',
    hvoem: [
      'Din fastlege',
      'Alle leger ved sykehus du besøker',
      'Apotek',
      'Norsk reseptformidling',
      'FEST-databasen (Felleskatalogen for elektronisk støtte til forordning)'
    ],
    praktiskBruk: [
      'Legen ser umiddelbart hvilke blodfortynnere du bruker før hun forordner nytt legemiddel',
      'Apoteket kan varsle hvis det er interaksjon mellom nye medisiner og dine nåværende',
      'Du slipper å oppgi medisiner på nytt ved hver besøk på sykehus',
      'Leger kan unngå å forordne duplisering av samme aktive stoff'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Legemiddelloven og forskrift om elektroniske resepter',
      formål: 'Å sikre trygg og rasjonell legemiddelbehandling og unngå farlige interaksjoner',
      oppbevaring: 'Reseptinformasjon lagres i elektronisk reseptkjede i 3 år',
      rettigheter: 'Du har rett til innsyn i dine forordnede legemidler. Du kan eventuelt velge papirresept hvis du ikke ønsker digital deling.'
    }
  },

  bioprover: {
    id: 'bioprover',
    navn: 'Oppbevaring av blod- og vevsprøver',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du gir samtykke til at blod-, vev- og andre biologiske prøver som tas i forbindelse med din behandling eller undersøking kan oppbevares og potensielt brukes til fremtidig forskning og diagnostikk.',
    hvoem: [
      'Biobanker',
      'Patologisk institutt',
      'Laboratorier og sykehus',
      'Godkjente forskningsgrupper',
      'REK og datainspektør'
    ],
    praktiskBruk: [
      'Ditt blodprøve oppbevares i biobank og kan brukes til forskning på din tilstand senere',
      'Vevsprøve fra kreftkirurgi kan lagres for genetisk analyse hvis relevant',
      'Ny DNA-test kan utføres på samme prøve ved endret diagnostikk',
      'Forskning på nye biomarkører kan inkludere din prøve hvis du gir samtykke'
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helseforskningsloven og Biobankregisteret',
      formål: 'Å lagre biologisk materiale for fremtidig forskning og diagnostisk ytterligere analyse',
      oppbevaring: 'Prøver oppbevares under regulert forhold og kan lagres i 10-20 år eller lenger etter avtale',
      rettigheter: 'Du kan trekke samtykke for fremtidig bruk. Dersom du trekker deg, kan nye analyser stoppes, men tidligere gjennomførte analyser kan ikke reverseres.'
    }
  }
};
