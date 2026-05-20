/**
 * GrenzenDicht — Centraal cijferregister (single source of truth)
 * ─────────────────────────────────────────────────────────────────
 * Alle kerncijfers gebruikt op de site staan hier. Wanneer je een cijfer
 * wijzigt, doe dat HIER. Pagina's mogen alleen verwijzen naar deze waarden
 * (handmatig of via JS). Zo blijft de site intern consistent.
 *
 * Elke entry heeft:
 *   value       — het cijfer of de string
 *   unit        — eenheid (mrd €, %, FTE, etc.)
 *   source      — primaire bron met directe link
 *   verified    — datum laatste verificatie (YYYY-MM-DD)
 *   note        — methodologische context, indien relevant
 *
 * Laatste audit: 2026-05-20 (volledige cross-check tegen IND/COA/CBS/Eurostat)
 */

const FIGURES = {

  // ── BEGROTING & KOSTEN ────────────────────────────────────────────
  budget_min_am_2026: {
    value: 8.94,
    unit: 'mrd €',
    source: 'Rijksbegroting 2026 hoofdstuk XX (Asiel & Migratie), Tweede Kamer 36 800 XX',
    url: 'https://www.rijksfinancien.nl/begroting/2026/XX',
    verified: '2026-05-20',
    note: 'Definitief vastgesteld. De eerdere PwC-raming Prinsjesdag 2025 noemde €9,7 mrd — die is achterhaald door de parlementaire behandeling.'
  },
  budget_coa_2026: {
    value: 4.2,
    unit: 'mrd €',
    source: 'Rijksbegroting 2026 — onderdeel COA',
    url: 'https://www.rijksfinancien.nl/begroting/2026/XX',
    verified: '2026-05-20',
    note: 'COA opvangkosten incl. crisisopvang'
  },
  budget_ind_2026: {
    value: 720,
    unit: 'mln €',
    source: 'Rijksbegroting 2026 — onderdeel IND',
    url: 'https://www.rijksfinancien.nl/begroting/2026/XX',
    verified: '2026-05-20'
  },
  budget_nidos_2026: {
    value: 100,
    unit: 'mln €',
    source: 'Rijksbegroting 2026 — onderdeel Nidos',
    verified: '2026-05-20',
    note: 'Begeleiding alleenstaande minderjarige vreemdelingen (AMV)'
  },
  budget_overig_2026: {
    value: 3.92,
    unit: 'mrd €',
    source: 'Rijksbegroting 2026 — residueel (DT&V, gemeenten, overig)',
    verified: '2026-05-20',
    note: 'Berekend als 8,94 − 4,2 − 0,72 − 0,1'
  },
  ministerie_realisatie_2025: {
    value: 7.6,
    unit: 'mrd €',
    source: 'Rijksoverheid persbericht 28 november 2025',
    verified: '2026-05-20',
    note: 'Werkelijke uitgaven 2025 (begroot: €8,5 mrd)'
  },
  dwangsommen_ind_2024: {
    value: 36.8,
    unit: 'mln €',
    source: 'IND Jaarcijfers 2024',
    url: 'https://ind.nl/nl/over-ind/cijfers-en-publicaties',
    verified: '2026-05-20'
  },
  rekenkamer_onderbegroting: {
    value: '21 van 23 jaar (2000–2023)',
    source: 'Algemene Rekenkamer, "Uitgaven asielopvang structureel te laag begroot", 18 januari 2023',
    url: 'https://www.rekenkamer.nl/publicaties/rapporten/2023/01/18',
    verified: '2026-05-20',
    note: 'CORRECTIE: eerder werd "21 van 24 jaar (1995–2018)" gebruikt — dat klopt niet met het Rekenkamer-rapport.'
  },

  // ── INSTROOM ──────────────────────────────────────────────────────
  instroom_2024_totaal: {
    value: 44000,
    unit: 'personen',
    source: 'CBS nieuwsbericht "Minder asielverzoeken en meer nareizigers in 2024" (juni 2025)',
    url: 'https://www.cbs.nl/nl-nl/nieuws/2025',
    verified: '2026-05-20',
    note: '32.100 eerste aanvragen + 11.900 nareizigers. CORRECTIE: "45.639" werd eerder gebruikt — dit getal is niet terug te vinden bij CBS.'
  },
  instroom_2024_eerste: {
    value: 32100,
    unit: 'personen',
    source: 'CBS / IND kerncijfers 2024',
    verified: '2026-05-20',
    note: 'Eurostat MIGR_ASYAPPCTZA noteert 32.175 (verschil door definitie meetelmoment)'
  },
  instroom_2024_nareizigers: {
    value: 11900,
    unit: 'personen',
    source: 'CBS juni 2025',
    verified: '2026-05-20'
  },
  instroom_2025_totaal: {
    value: 44100,
    unit: 'personen',
    source: 'CBS / IND maandcijfers 2025',
    verified: '2026-05-20',
    note: '24.100 eerste aanvragen + 16.500 nareizigers + overig'
  },
  instroom_2025_nareizigers: {
    value: 16500,
    unit: 'personen',
    source: 'CBS persbericht mei 2026',
    verified: '2026-05-20',
    note: 'Record — 41% van totale instroom'
  },
  instroom_2023_totaal: {
    value: 48500,
    unit: 'personen',
    source: 'CBS',
    verified: '2026-05-20'
  },
  instroom_2022_totaal: {
    value: 46665,
    unit: 'personen',
    source: 'CBS',
    verified: '2026-05-20',
    note: 'Piekjaar (Oekraïne wordt apart geregistreerd)'
  },
  instroom_2020_totaal: {
    value: 17585,
    unit: 'personen',
    source: 'CBS',
    verified: '2026-05-20',
    note: 'COVID-dal'
  },

  // ── PERSONEEL ─────────────────────────────────────────────────────
  ind_fte_2024_totaal: {
    value: 6438,
    unit: 'FTE',
    source: 'IND Jaarcijfers 2024 (april 2025)',
    verified: '2026-05-20',
    note: '5.416 ambtelijk + 1.022 extern ingehuurd'
  },
  coa_fte_2024: {
    value: 4500,
    unit: 'FTE (circa)',
    source: 'COA jaarverslag 2024',
    verified: '2026-05-20'
  },

  // ── TAAKSTELLING ──────────────────────────────────────────────────
  taakstelling_2026_eerste_helft: {
    value: 15000,
    unit: 'personen',
    source: 'Rijksoverheid circulaire taakstelling huisvesting 2026-I',
    verified: '2026-05-20'
  },
  taakstelling_2025_jaar: {
    value: 28000,
    unit: 'personen',
    source: 'Staatscourant 2025, nr. 11181 (15.000) + nr. 33523 (13.000)',
    verified: '2026-05-20'
  },
  taakstelling_2024_jaar: {
    value: 35750,
    unit: 'personen',
    source: 'Staatscourant 2024, nr. 11544 (18.750) + nr. 33954 (17.000)',
    verified: '2026-05-20'
  },

  // ── EUROPESE VERGELIJKING ─────────────────────────────────────────
  eu_totaal_aanvragen_2024: {
    value: 912000,
    unit: 'aanvragen',
    source: 'Eurostat persbericht 20 maart 2025',
    url: 'https://ec.europa.eu/eurostat',
    verified: '2026-05-20',
    note: '−13% vs 2023'
  },
  italie_bootaankomsten_2023: {
    value: 157000,
    unit: 'aankomsten',
    source: 'UNHCR Italy Sea Arrivals Dashboard',
    verified: '2026-05-20',
    note: 'Italiaans ministerie van Binnenlandse Zaken noteert 155.750 — afgerond op 157k.'
  },
  italie_bootaankomsten_2024: {
    value: 66317,
    unit: 'aankomsten',
    source: 'UNHCR Italy Sea Arrivals Dashboard',
    verified: '2026-05-20',
    note: 'Daling van 57% t.o.v. 2023 na Mattei-akkoord met Tunesië'
  },

  // ── TERUGKEER ─────────────────────────────────────────────────────
  dtv_aantoonbaar_vertrek_2024: {
    value: 5990,
    unit: 'personen',
    source: 'DT&V nieuwsbericht januari 2025',
    verified: '2026-05-20',
    note: 'Aantoonbaar (zelfstandig + gedwongen)'
  },

  // ── REFERENTIES ───────────────────────────────────────────────────
  nl_inwoners: {
    value: 17900000,
    unit: 'inwoners (afgerond)',
    source: 'CBS Bevolkingsteller 2025',
    verified: '2026-05-20'
  },
  ns_fte: {
    value: 20400,
    unit: 'FTE',
    source: 'NS jaarverslag 2024',
    verified: '2026-05-20'
  },
  politie_fte: {
    value: 20000,
    unit: 'FTE (circa)',
    source: 'Nationale Politie jaarverslag 2024',
    verified: '2026-05-20'
  }

};

// Maak beschikbaar in browser én Node-context
if (typeof window !== 'undefined') window.FIGURES = FIGURES;
if (typeof module !== 'undefined' && module.exports) module.exports = FIGURES;
