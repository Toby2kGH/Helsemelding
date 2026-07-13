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
  },

  fastlege_sykehusjournal_innsyn: {
    id: 'fastlege_sykehusjournal_innsyn',
    navn: 'Fastlegen kan se sykehusjournal',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at fastlegen din kan se journalnotater fra sykehusbesøk, slik at fastlegen har full oversikt over behandlingen din og kan følge deg opp bedre.',
    hvoem: ['Din fastlege', 'Fastlegekontorets journalsystem'],
    praktiskBruk: [
      'Fastlegen ser hva som ble gjort på sykehuset og kan følge opp uten at du må gjenfortelle alt',
      'Fastlegen unngår å be om undersøkelser som allerede er gjort',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientjournalloven og helsepersonelloven § 45',
      formål: 'Å gi fastlegen din et komplett bilde av behandlingen, slik at oppfølgingen blir trygg og sammenhengende.',
      oppbevaring: 'Opplysningene inngår i fastlegens journal etter nasjonale retningslinjer.',
      rettigheter: 'Samtykket er frivillig og kan trekkes tilbake når som helst. Du har rett til innsyn i hvem som har sett journalen din.'
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
      hjemmelsgrunnlag: 'Pasientjournalloven og Norm for informasjonssikkerhet i helse- og omsorgstjenesten',
      formål: 'Å gjøre kontakten med fastlegen enklere og raskere, på en sikker digital kanal.',
      oppbevaring: 'Meldinger lagres i fastlegens journal og på Helsenorge etter gjeldende regler.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake når som helst. Du kan alltid velge tradisjonell kontakt i stedet.'
    }
  },

  fastlege_spesialist_deling: {
    id: 'fastlege_spesialist_deling',
    navn: 'Dele spesialistopplysninger med fastlege',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at rapporter fra spesialister automatisk sendes til fastlegen din, slik at fastlegen kan koordinere den samlede oppfølgingen.',
    hvoem: ['Din fastlege', 'Spesialister og poliklinikker du henvises til'],
    praktiskBruk: [
      'Fastlegen ser spesialistens vurdering og kan følge opp anbefalt behandling',
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
    hvoem: ['Helsepersonell ved sykehus som behandler deg', 'Sykehusenes journalsystemer'],
    praktiskBruk: [
      'Legene ved et nytt sykehus ser din behandlingshistorikk og unngår farlige feil',
      'Prøver og bilder trenger ikke tas på nytt',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientjournalloven §§ 9–11 om tilgang til helseopplysninger mellom virksomheter',
      formål: 'Å gi behandlerne et helhetlig bilde slik at behandlingen blir trygg og sammenhengende.',
      oppbevaring: 'Opplysningene forblir i hvert sykehus sin journal.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake. Du kan også sperre journalen for enkelte behandlere.'
    }
  },

  deling_mellom_regioner: {
    id: 'deling_mellom_regioner',
    navn: 'Deling mellom helseregioner',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at helsepersonell i en annen helseregion enn der du normalt behandles kan se relevant journalinformasjon, for eksempel ved innleggelse på reise.',
    hvoem: ['Helsepersonell i andre helseregioner', 'Sykehusenes journalsystemer'],
    praktiskBruk: [
      'Blir du akutt syk i en annen del av landet, ser legene din behandlingshistorikk',
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
      hjemmelsgrunnlag: 'Helsepersonelloven § 45 og § 25',
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
      'Tjenestene planlegger sammen, så du slipper å falle mellom to stoler',
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
    beskrivelse: 'Du tillater at dine erfaringer og opplysninger kan brukes til å forbedre kvaliteten på helsetjenestene, for eksempel gjennom kvalitetsregistre og evaluering.',
    hvoem: ['Helsetjenesten der du behandles', 'Nasjonale medisinske kvalitetsregistre'],
    praktiskBruk: [
      'Tjenestene lærer av resultater og gjør behandlingen tryggere',
      'Bidrar til at helsetjenesten stadig blir bedre',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Helseregisterloven og forskrifter om medisinske kvalitetsregistre',
      formål: 'Å måle og forbedre kvaliteten og pasientsikkerheten i helsetjenesten.',
      oppbevaring: 'Opplysningene lagres i tråd med det aktuelle registerets regelverk.',
      rettigheter: 'Du kan reservere deg og trekke samtykket. For mange kvalitetsregistre har du rett til å reservere deg mot deltakelse.'
    }
  },

  ai_maskinlaering: {
    id: 'ai_maskinlaering',
    navn: 'AI og maskinlæring',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du tillater at dine anonymiserte data kan brukes til å utvikle og forbedre kunstig intelligens og beslutningsstøtte i helsetjenesten.',
    hvoem: ['Godkjente utviklings- og forskningsmiljøer', 'Helsetjenestens fagmiljøer'],
    praktiskBruk: [
      'Bedre verktøy for å oppdage sykdom tidlig',
      'Beslutningsstøtte som hjelper helsepersonell',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Personvernforordningen (GDPR) og helseforskningsloven ved bruk av data',
      formål: 'Å utvikle tryggere og bedre verktøy for diagnostikk og behandling.',
      oppbevaring: 'Data anonymiseres eller pseudonymiseres før bruk.',
      rettigheter: 'Frivillig samtykke som kan trekkes tilbake. Anonyme data kan ikke alltid spores tilbake og slettes.'
    }
  },

  student_undervisning: {
    id: 'student_undervisning',
    navn: 'Student- og undervisningsformål',
    kategori: 'bidra_til_fremtiden',
    beskrivelse: 'Du tillater at dine anonymiserte opplysninger kan brukes i undervisning av helsefagstudenter og annet helsepersonell.',
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
  },

  kjernejournal_oppslag: {
    id: 'kjernejournal_oppslag',
    navn: 'Kjernejournal — oppslag av helsepersonell',
    kategori: 'min_behandling',
    beskrivelse: 'Du tillater at helsepersonell som behandler deg kan slå opp i kjernejournalen din for å se de viktigste opplysningene — som kritisk info, legemidler og kontaktpunkter. I Norge har alle kjernejournal med mindre man reserverer seg.',
    hvoem: ['Fastlege, legevakt og sykehus', 'Ambulanse og akuttmottak'],
    praktiskBruk: [
      'Legevakten ser raskt allergier og faste legemidler',
      'Ved akutt sykdom får behandlerne livsviktig informasjon med én gang',
    ],
    juridisk: {
      hjemmelsgrunnlag: 'Pasientjournalloven § 13 og forskrift om nasjonal kjernejournal',
      formål: 'Å gi helsepersonell rask tilgang til de viktigste opplysningene når du trenger hjelp.',
      oppbevaring: 'Kjernejournal driftes nasjonalt av Norsk helsenett. All bruk logges.',
      rettigheter: 'Du kan reservere deg mot kjernejournal, sperre den, og se loggen over hvem som har gjort oppslag.'
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
  }
};
