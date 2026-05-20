# Data-audit GrenzenDicht — 20 mei 2026

Volledige cross-check van alle kwantitatieve claims op de site tegen primaire bronnen (IND, COA, CBS, Eurostat, DT&V, Algemene Rekenkamer).

---

## Status na audit (20 mei 2026)

| Categorie | Aantal | Status |
|---|---|---|
| Geverifieerd correct | 22 | ✅ Gepubliceerd, geen actie |
| Kritieke fouten | 4 | ✅ **Gecorrigeerd 20-05-2026** |
| Interne inconsistenties | 5 | ⚠️ Deels opgelost (zie hieronder) |
| Twijfelgevallen | 7 | ⏳ Methodologische verduidelijking nodig |
| Ontbrekende bronvermelding | 12 | ⏳ Bronlinks toe te voegen |

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

## B. Twijfelgevallen — methodologische verduidelijking nodig

| # | Claim | Pagina | Wat ontbreekt |
|---|---|---|---|
| B1 | "Doorlooptijd 22+ maanden" | europa.html | Definitie: alleen IND, of incl. bezwaar/beroep? |
| B2 | "Deens terugkeerpercentage ~95%" | europa.html | Methodologische noot: omvat vrijwillig vertrek (NL 18% alleen gedwongen). Niet appels-met-appels. |
| B3 | "Kosten per asielzoeker €42.000/jaar" | economie.html | Bron + definitie: alleen COA-tarief (€75–100/dag = €27–36k), of inclusief IND + rechtsbijstand? |
| B4 | "IND-achterstand 50.000+" | europa.html | Orde van grootte klopt; directe bronlink IND-rapport 2024 toevoegen |
| B5 | "COA-begroting 2025: €4,0 mrd" | europa.html | Plausibel, maar geen primaire bron geciteerd |
| B6 | "Smokkelprijs €12.000–€15.000 p.p." | economie.html, trechters.html | VRT NWS/Europol vermeld zonder publicatiedatum |
| B7 | "63% Syrische asielzoekers Denemarken→DE/NL" | europa.html | Eurostat-jaar (2022) genoemd zonder specifieke tabel |

---

## C. Interne inconsistenties

### C1. Vergelijkingsmaatstaf "20.000 FTE"
- `werkgelegenheid.html` vergelijkt met **NS** (20.400 FTE)
- `quiz.html`, `mythenbuster.html` vergelijken met **Nationale Politie** (~20.000 FTE)
- **Aanbeveling:** Kies één — beide kloppen, maar maak het consistent

### C2. Inwilligingspercentage
- 35% (NL 2025) vs 55% (NL 2023) — verschillende periodes
- **Status:** Beide correct; periode duidelijker markeren

### C3 t/m C5: opgelost via centraal data-bestand `js/figures.js`

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

## E. Volgende stappen (optioneel)

1. **Definities verduidelijken** voor B1–B7 — toevoegen als hover-tooltips of voetnoten
2. **Bronvermeldingen toevoegen** voor 12 claims die nu zonder bron staan (zie audit-export voor lijst)
3. **Single source of truth** `js/figures.js` aangelegd — bij toekomstige wijzigingen alleen dáár wijzigen, dan op de pagina overnemen

---

*Audit uitgevoerd op 20 mei 2026 — bronnen: IND.nl, COA.nl, CBS.nl, ec.europa.eu/eurostat, rijksfinancien.nl, rekenkamer.nl, dtenv.nl.*
