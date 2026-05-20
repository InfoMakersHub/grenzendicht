# Data-audit GrenzenDicht — 20 mei 2026

Volledige cross-check van alle kwantitatieve claims op de site tegen primaire bronnen (IND, COA, CBS, Eurostat, DT&V, Algemene Rekenkamer).

---

## Status na audit (20 mei 2026)

| Categorie | Aantal | Status |
|---|---|---|
| Geverifieerd correct | 22 | ✅ Gepubliceerd, geen actie |
| Kritieke fouten | 4 | ✅ **Gecorrigeerd 20-05-2026** |
| Interne inconsistenties | 5 | ✅ **Opgelost 21-05-2026** |
| Twijfelgevallen | 7 | ✅ **Methodologisch verduidelijkt 21-05-2026** |
| Ontbrekende bronvermelding | 12 | ✅ **Bronlinks toegevoegd 21-05-2026** |

---

## A. Kritieke fouten — alle vier gecorrigeerd ✅

### A1. Begroting 2026: €9,7 mrd → €8,94 mrd
- **Probleem:** PwC-raming Prinsjesdag 2025 werd als definitief cijfer gepresenteerd
- **Werkelijke waarde:** €8,94 mrd (Rijksbegroting 2026 hoofdstuk XX)
- **Vindplaatsen gecorrigeerd:**
  - `economie.html` — hero stat, breakdowntabel, pie chart, totalchart, tooltip
  - `index.html` — money-bar segmenten + percentages + onderschrift
  - `tijdlijn.html` — voetnoot bij budget-kaart
  - `ontmanteling.html` — calculator-script (`9.7 * r` → `8.94 * r`)
  - `bronnen.html` — context-noot bij PwC-bron toegelicht

### A2. "21 van 24 jaar (1995–2018)" → "21 van 23 jaar (2000–2023)"
- **Probleem:** Verkeerde telling én verkeerde periode
- **Correcte bron:** Algemene Rekenkamer, 18 januari 2023
- **Vindplaatsen gecorrigeerd:**
  - `economie.html` — callout
  - `index.html` — finding-card
  - `stabiliteit.html` — obs-list
  - `werkgelegenheid.html` — callout

### A3. Instroom 2024: "45.639 / ~45.000" → "~44.000"
- **Probleem:** CBS publiceert geen "45.639" — getal niet traceerbaar
- **Correcte waarde:** 32.100 eerste aanvragen + 11.900 nareizigers = ~44.000
- **Vindplaats gecorrigeerd:** `economie.html` (tabel-regel)

### A4. Italië-stat: "(66k→157k omgekeerd)" → "(157k → 66k)"
- **Probleem:** Onleesbare UI — pijlrichting suggereerde stijging
- **Vindplaats gecorrigeerd:** `europa.html` (stat-card)

---

## B. Twijfelgevallen — alle zeven verduidelijkt ✅ (21-05-2026)

| # | Claim | Pagina | Oplossing |
|---|---|---|---|
| B1 | "Doorlooptijd 22+ maanden" | europa.html | Voetnoot toegevoegd: betreft totale wachttijd inclusief bezwaar en beroep (IND-tijdigheidsdashboard 2024). Wettelijke beslistermijn = 6 mnd; reguliere IND-doorlooptijd eerste aanleg 9–12 mnd. |
| B2 | "Deens terugkeerpercentage ~95%" | europa.html | Bestaande voetnoot uitgebreid: omvat vrijwillig vertrek (UK Home Office briefing CBP-10391, 2025). EU-gemiddelde = alleen gedwongen terugkeer (Eurostat MIGR_EIRTN). "Niet appels-met-appels" expliciet vermeld. |
| B3 | "Kosten per asielzoeker per jaar" | economie.html | Reeds opgelost in D3: €40.000/jaar regulier of tot €91.000/jaar crisis, met bron COA Jaarverslag 2024. |
| B4 | "IND-achterstand 50.000+" | europa.html | Inline bron toegevoegd: IND Jaarcijfers 2024 (april 2025). |
| B5 | "COA-begroting 2025: €4,0 mrd" | europa.html | Voetnoot toegevoegd: Rijksbegroting 2025 hoofdstuk XIX/XX, COA-onderdeel. Vergelijkingsbasis 2022 = €1,6 mrd (COA Jaarverslag 2022). |
| B6 | "Smokkelprijs €12.000–€15.000 p.p." | economie.html, trechters.html | Bron uitgebreid naar Europol EMSC jaarrapport 2023, met disclaimer over routevariatie. |
| B7 | "63% Syrische asielzoekers Denemarken→DE/NL" | europa.html | Eurostat-tabel geconcretiseerd: MIGR_ASYAPPCTZA longitudinaal 2018–2022. |

---

## C. Interne inconsistenties — alle vijf opgelost ✅

### C1 (D1). Budget Min. A&M 2026: vier verschillende bedragen
- **Status:** ✅ Opgelost via kritieke-fout-correctie (20-05-2026). €8,94 mrd nu overal consistent. De €9,7 mrd op `bronnen.html` is behouden als context-noot (PwC-raming vóór parlementaire behandeling).

### C2 (D2). Instroom 2024: 45.639 / 44.000 / 32.175
- **Status:** ✅ Opgelost. "45.639" verwijderd uit `economie.html`. De "32.175" op `europa.html` blijft staan want betreft *alleen eerste aanvragen* — niet vergelijkbaar met het totaal van 44.000.

### C3 (D3). Kosten per asielzoeker per jaar — gecorrigeerd 21-05-2026
- **Probleem:** €42.000/jaar vs €75–100/dag vs €40.000–€91.000/jaar
- **Canoniek besluit:** €40.000/jaar regulier (= €110/dag × 365) en tot €91.000/jaar crisis. Vastgelegd in `js/figures.js`.
- **Aangepast:** `economie.html` (€42.000 → €40.000 in stat-card en tabelregel), `mythenbuster.html` (dagtarief krijgt expliciete jaarcontext: ~€40.000 regulier / tot ~€91.000 crisis).

### C4 (D4). Inwilligingspercentage 35% (2025) vs 55% (2023) — gecorrigeerd 21-05-2026
- **Probleem:** Twee correcte cijfers uit verschillende jaren zonder duidelijke periode-context.
- **Aangepast:** `mythenbuster.html` markeert nu expliciet de daling: "55% (2023) → 35% (2025)" met oorzaak (strengere IND-criteria, verschoven nationaliteitsmix). `europa.html` had al "sterk gedaald" als kwalificatie.

### C5 (D5). Referentieorganisatie "~20.000 FTE" — gecorrigeerd 21-05-2026
- **Probleem:** `werkgelegenheid.html` vergeleek met NS, `quiz.html` + `mythenbuster.html` met Nationale Politie.
- **Canoniek besluit:** Nationale Politie als primaire referentie (al consistent op 2/3 pagina's), NS als secundair.
- **Aangepast:** `werkgelegenheid.html` hero noemt nu Politie eerst, NS daarna; bar-chart bevat extra balk "Nationale Politie (20.000 FTE)".

---

## D. Geverifieerde claims (sample — 22 totaal)

✅ IND-personeel 2024: 6.438 FTE (5.416 + 1.022 extern)
✅ Eerste aanvragen 2024: ~32.100 (CBS)
✅ Nareizigers 2024: 11.900
✅ Nareizigers 2025: 16.500 (record, 41% aandeel)
✅ Dwangsommen IND 2024: €36,8 mln
✅ EU-totaal 2024: 912.000 aanvragen (−13%)
✅ DT&V 2024: ~5.990 aantoonbare vertrekken
✅ Italië bootaankomsten richting: 2023 (157k) → 2024 (66k) = −57%
✅ Taakstelling 2024–2026 (alle perioden)
✅ Rekenkamer-bevinding (na correctie naar 21/23)
✅ Wettelijke basis taakstelling: Huisvestingswet 2014 art. 26
✅ MVV-procedure nareizigers (12–24 mnd na erkenning)

---

## E. Ontbrekende bronvermelding — alle twaalf opgelost ✅ (21-05-2026)

| # | Claim | Pagina | Toegevoegde bron |
|---|---|---|---|
| E1 | "€9,7 mrd Begroting Min. A&M 2026" | meerdere | Gecorrigeerd naar €8,94 mrd (Rijksbegroting 2026 hoofdstuk XX) — zie A1 |
| E2 | "COA €4,2 miljard Budget 2026" | economie.html | Tabel-voetnoot met Rijksbegroting 2026 toegevoegd |
| E3 | "IND Budget 2026: €720 miljoen" | economie.html | Idem — gezamenlijke tabel-voetnoot |
| E4 | "€42.000/jaar per persoon" | economie.html | Reeds opgelost in D3: €40.000/jaar met bron COA Jaarverslag 2024 |
| E5 | "Syrië 27%, Eritrea 9%, ..." 2025-aandelen | trechters.html | Bronvermelding "IND Kerncijfers jan–dec 2025" toegevoegd |
| E6 | "63% Syrische asielzoekers door DK" | europa.html | Eurostat-tabel geconcretiseerd (zie B7) |
| E7 | "Oostenrijks COA-equivalent €49,20/dag" | europa.html | BBU GmbH Jahresbericht 2023 toegevoegd |
| E8 | "Hatton 2020" | europa.html | Volledige citaat + DOI 10.1257/jep.34.1.75 toegevoegd |
| E9 | "~€44 miljoen winst voor één tussenpersoon" | economie.html, index.html | FD-publicatie juli 2025 dossier "asielopvang-deals" + Rekenkamer-bevestiging |
| E10 | "Deense daguitkering €6,70 vs NL €15–18" | europa.html | Udlændingestyrelsen 2024 / COA "leefgeld" 2024 toegevoegd |
| E11 | "2026 Q1 instroom ~10.560 (CBS)" | stabiliteit.html | CBS StatLine 83102NED (gepubliceerd mei 2026) toegevoegd |
| E12 | "Historisch patroon 1995–2018" | stabiliteit.html | Reeds opgelost via D2-correctie naar 2000–2023 + Rekenkamer-citaat |

---

## F. Doorlopend onderhoud

- **`js/figures.js`** blijft single source of truth voor alle kerncijfers
- **`js/main.js`** bevat constante `LAST_UPDATE` die na elke push wordt bijgewerkt naar het exacte pushmoment — wordt onderaan elke footer getoond zodat bezoekers zien wanneer de site voor het laatst is geactualiseerd

---

*Volledige audit: 20–21 mei 2026 — bronnen: IND.nl, COA.nl, CBS.nl, ec.europa.eu/eurostat, rijksfinancien.nl, rekenkamer.nl, dtenv.nl, Udlændingestyrelsen.dk, BBU.gv.at, Europol EMSC.*
