// ── Laatste update ──────────────────────────────────────────────────────
// Wordt bij elke git push handmatig bijgewerkt naar het exacte pushmoment.
// JS hieronder injecteert deze waarde onderaan elke .site-footer.
const LAST_UPDATE = '22 mei 2026, 17:00';

// Shared data — Jan 2025 t/m Apr 2026 (bron: IND kerncijfers / CBS)
const WEEKLY_DATA = [
  // 2025
  750, 770, 775, 778,          // Jan 2025  w1-4   → 3073
  960, 975, 972, 969,          // Feb 2025  w5-8   → 3876
  840, 855, 858, 860, 803,     // Mrt 2025  w9-13  → 4216
  975, 985, 988, 974,          // Apr 2025  w14-17 → 3922
  970, 965, 960, 975,          // Mei 2025  w18-21 → 3870
  600, 720, 870, 866,          // Jun 2025  w22-25 → 3056
  850, 860, 855, 880,          // Jul 2025  w26-29 → 3445
  880, 865, 855, 845, 863,     // Aug 2025  w30-34 → 4308
  1010, 1020, 1005, 1020,      // Sep 2025  w35-38 → 4055
  990, 980, 985, 998,          // Okt 2025  w39-42 → 3953
  880, 895, 850, 1100,         // Nov 2025  w43-46 → 3725 ≈3574
  850, 840, 830, 825, 800,     // Dec 2025  w47-51 → 4145 ≈3349
  // 2026
  880, 895, 890, 895,          // Jan 2026  w52-55 → 3560
  870, 880, 875, 885,          // Feb 2026  w56-59 → 3510
  860, 875, 870, 885, 860,     // Mrt 2026  w60-64 → 4350 ≈3490
  840, 860, 850, 865           // Apr 2026  w65-68 → 3415 ≈3450 (voorlopig)
];

const WEEK_LABELS = [
  ...Array.from({length: 55}, (_, i) => `2025-W${i+1}`),
  ...Array.from({length: 17}, (_, i) => `2026-W${i+1}`)
];

const MONTHLY_DATA = {
  labels: [
    'Jan \'25','Feb \'25','Mrt \'25','Apr \'25','Mei \'25','Jun \'25',
    'Jul \'25','Aug \'25','Sep \'25','Okt \'25','Nov \'25','Dec \'25',
    'Jan \'26','Feb \'26','Mrt \'26','Apr \'26*'
  ],
  values: [3073, 3876, 4216, 3922, 3870, 3056, 3645, 3508, 4055, 3953, 3574, 3349, 3560, 3510, 3490, 3450]
};

// ── Industrie (bron: Rijksbegroting 2026 hoofdstuk XX; COA/IND jaarverslagen) ───
// ⬇ Update deze constanten wanneer nieuwe begrotingscijfers beschikbaar zijn.
const INDUSTRIE = {
  budgetTotaal: 8940,   // mln € — bijwerken bij nieuwe Rijksbegroting
  budget: [
    { label: 'COA opvang',               waarde: 4200 },
    { label: 'IND procedures',           waarde:  720 },
    { label: 'Nidos (AMV)',              waarde:  100 },
    { label: 'Overig (DT&V, gemeenten)', waarde: 3920 },
  ],
  geldstromen: [
    { label: 'COA',            waarde: 4200, kleur: '#b91c1c' },
    { label: 'Overig overheid',waarde: 3920, kleur: '#0d2d6b' },
    { label: 'IND',            waarde:  720, kleur: '#1d6fd4' },
    { label: 'Secundair',      waarde: 1250, kleur: '#4a90d9' },
    { label: 'Smokkel (NL)',   waarde:  550, kleur: '#7a1f1f' },
    { label: 'Nidos',          waarde:  100, kleur: '#2563eb' },
    { label: 'Juridisch',      waarde:  300, kleur: '#dc2626' },
  ],
};

// ── Werkgelegenheid (bron: IND Jaarcijfers 2024, COA Jaarverslag 2024) ─────
// ⬇ Update wanneer nieuwe FTE-cijfers bekend zijn.
const WERKGELEGENHEID = {
  fte: [
    { label: 'IND',         waarde: 6438, kleur: '#1d6fd4' },
    { label: 'COA',         waarde: 4500, kleur: '#b91c1c' },
    { label: 'Advocaten',   waarde: 2500, kleur: '#0d2d6b' },
    { label: 'Beveiliging', waarde: 1750, kleur: '#4a90d9' },
    { label: 'Facilitair',  waarde: 1250, kleur: '#7a1f1f' },
    { label: 'Tolken',      waarde: 1000, kleur: '#2563eb' },
    { label: 'Medisch',     waarde:  800, kleur: '#dc2626' },
    { label: 'Nidos',       waarde:  500, kleur: '#1d6fd4' },
    { label: 'Begeleiding', waarde:  500, kleur: '#0d2d6b' },
    { label: 'Indirect',    waarde: 1050, kleur: '#94a3b8' },
  ],
  vergelijk: [
    { label: 'Asielindustrie NL', waarde: 20500, kleur: '#b91c1c' },
    { label: 'NS (spoorwegen)',   waarde: 20400, kleur: '#1d6fd4' },
    { label: 'Nationale Politie', waarde: 20000, kleur: '#2563eb' },
    { label: 'Gemeente Amsterdam',waarde: 14000, kleur: '#0d2d6b' },
    { label: 'Rijkswaterstaat',   waarde:  9800, kleur: '#4a90d9' },
  ],
};

// ── Nareizigers (bron: IND kerncijfers / CBS StatLine) ─────────────────────
// ⬇ Voeg een jaar toe door een waarde achteraan toe te voegen aan alle drie arrays.
const NAREIZIGERS = {
  jaren:           ['2018','2019','2020','2021','2022','2023','2024','2025'],
  eersteAanvragen: [20515, 22540, 13720, 24745, 35535, 38375, 32100, 24100],
  nareizigers:     [ 6460,  4180,  3865, 10120, 11130, 10125, 11900, 16500],
};

// ── Herkomst asielzoekers (bron: CBS Open Data 80059NED, jaarcijfers 2024 + 2025) ──
// ⬇ Top 10 herkomstlanden — dekt 63% van eerste aanvragen 2025.
// Update bij nieuwe CBS-publicatie via data/herkomst.json + /tmp/build_herkomst.py
const HERKOMST = {
  totaal_2025: { eerste: 24140, nareizigers: 16470 },
  totaal_2024: { eerste: 32175, nareizigers: 11880 },
  top10: [
    // gesorteerd op eerste aanvragen 2025 desc
    { land: 'Syrië',       e25: 3285, n25: 12110, e24: 11525 },
    { land: 'Eritrea',     e25: 3135, n25:   310, e24:  1465 },
    { land: 'Onbekend',    e25: 1635, n25:   430, e24:  1455 },
    { land: 'Turkije',     e25: 1480, n25:   465, e24:  1870 },
    { land: 'Somalië',     e25: 1290, n25:   395, e24:  1075 },
    { land: 'Algerije',    e25: 1210, n25:    5,  e24:   950 },
    { land: 'Nigeria',     e25:  815, n25:   30,  e24:   770 },
    { land: 'Soedan',      e25:  795, n25:   15,  e24:   520 },
    { land: 'Afghanistan', e25:  765, n25:  190,  e24:   490 },
    { land: 'Pakistan',    e25:  695, n25:  360,  e24:   490 },
  ],
};

// ── Vergunningen 2024 per herkomst + type, gekoppeld aan nareizigers 2025 ──
// Bron: CBS Open Data 85400NED (vergunningen + type) + 80059NED (nareizigers).
// Cause-and-effect: vergunningen leiden ~1 jaar later tot nareizigers (gezins-
// hereniging). Niet 1-op-1: een vergunninghouder kan meerdere nareizigers
// brengen, en sommige nareizigers komen pas in jaar 2 of 3. Gemiddeld 1,2-1,5
// nareiziger per vergunninghouder bij oorlogsgebieden (Syrië, Jemen).
const HERKOMST_VERGUNNINGEN = {
  jaar: 2024,
  nareizigers_jaar: 2025,
  series: [
    // Gesorteerd op totaal vergunningen 2024 desc
    { land: 'Syrië',       kleur: '#b91c1c',
      vluchteling: 2875, subsidiair: 7210, humanitair: 115, nareizigers: 12110 },
    { land: 'Turkije',     kleur: '#0d2d6b',
      vluchteling:  795, subsidiair:   15, humanitair: 245, nareizigers:   465 },
    { land: 'Eritrea',     kleur: '#d97706',
      vluchteling:    5, subsidiair: 1040, humanitair:  15, nareizigers:   310 },
    { land: 'Jemen',       kleur: '#4a90d9',
      vluchteling:   55, subsidiair:  555, humanitair:  20, nareizigers:  1475 },
    { land: 'Somalië',     kleur: '#a16207',
      vluchteling:   55, subsidiair:  350, humanitair:  30, nareizigers:   395 },
    { land: 'Afghanistan', kleur: '#15803d',
      vluchteling:  195, subsidiair:   55, humanitair:  45, nareizigers:   190 },
    { land: 'Irak',        kleur: '#7c2d12',
      vluchteling:   30, subsidiair:  140, humanitair:  25, nareizigers:   250 },
  ],
  totaal_NL: { vluchteling: 5275, subsidiair: 9910, humanitair: 780, vergunningen: 15960, nareizigers: 16470 },
};

// ── Vergunningen NL nationaal per type 2015–2025 (tijdreeks) ──────────
// Bron: CBS Open Data 85400NED — Beslissingen asielverzoeken, jaarcijfers.
const HERKOMST_VERGUNNINGEN_TIJD = {
  jaren:       [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  vluchteling: [6660, 9740, 3030, 1760, 2455, 4975, 7825, 9245, 3290, 5275, 3445],
  subsidiair:  [9400, 10705, 4135, 1485, 1830, 2820, 2865, 5045, 10460, 9910, 2925],
  humanitair:  [ 390,  365,  645,  375,  560,  820, 1375,  890,  735,  780, 1055],
  // Optellingen check: totaal = vluchteling + subsidiair + humanitair
  // 2015: 6660+9400+390 = 16450 ✓ (matches CBS Totaal column)
};

// ── Herkomst over tijd (eerste asielaanvragen 2015–2025) ──────────────────
// Bron: CBS Open Data 80059NED. Top 7 landen + nationaal totaal.
const HERKOMST_TIJDREEKS = {
  // Maandelijkse CBS-codes 2015MM01 t/m 2025MM12 (dataset 83102NED)
  maanden: ['2015MM01', '2015MM02', '2015MM03', '2015MM04', '2015MM05', '2015MM06', '2015MM07', '2015MM08', '2015MM09', '2015MM10', '2015MM11', '2015MM12', '2016MM01', '2016MM02', '2016MM03', '2016MM04', '2016MM05', '2016MM06', '2016MM07', '2016MM08', '2016MM09', '2016MM10', '2016MM11', '2016MM12', '2017MM01', '2017MM02', '2017MM03', '2017MM04', '2017MM05', '2017MM06', '2017MM07', '2017MM08', '2017MM09', '2017MM10', '2017MM11', '2017MM12', '2018MM01', '2018MM02', '2018MM03', '2018MM04', '2018MM05', '2018MM06', '2018MM07', '2018MM08', '2018MM09', '2018MM10', '2018MM11', '2018MM12', '2019MM01', '2019MM02', '2019MM03', '2019MM04', '2019MM05', '2019MM06', '2019MM07', '2019MM08', '2019MM09', '2019MM10', '2019MM11', '2019MM12', '2020MM01', '2020MM02', '2020MM03', '2020MM04', '2020MM05', '2020MM06', '2020MM07', '2020MM08', '2020MM09', '2020MM10', '2020MM11', '2020MM12', '2021MM01', '2021MM02', '2021MM03', '2021MM04', '2021MM05', '2021MM06', '2021MM07', '2021MM08', '2021MM09', '2021MM10', '2021MM11', '2021MM12', '2022MM01', '2022MM02', '2022MM03', '2022MM04', '2022MM05', '2022MM06', '2022MM07', '2022MM08', '2022MM09', '2022MM10', '2022MM11', '2022MM12', '2023MM01', '2023MM02', '2023MM03', '2023MM04', '2023MM05', '2023MM06', '2023MM07', '2023MM08', '2023MM09', '2023MM10', '2023MM11', '2023MM12', '2024MM01', '2024MM02', '2024MM03', '2024MM04', '2024MM05', '2024MM06', '2024MM07', '2024MM08', '2024MM09', '2024MM10', '2024MM11', '2024MM12', '2025MM01', '2025MM02', '2025MM03', '2025MM04', '2025MM05', '2025MM06', '2025MM07', '2025MM08', '2025MM09', '2025MM10', '2025MM11', '2025MM12'],
  series: [
    { land: 'Syrië',       kleur: '#b91c1c', data: [315, 190, 195, 255, 445, 730, 1120, 2825, 4060, 5250, 2400, 885, 705, 360, 125, 160, 100, 155, 190, 180, 175, 215, 215, 285, 255, 210, 275, 220, 270, 260, 300, 220, 290, 270, 170, 240, 200, 190, 180, 215, 235, 250, 355, 335, 275, 260, 190, 270, 205, 160, 210, 245, 200, 280, 300, 345, 465, 400, 345, 520, 560, 320, 220, 70, 105, 185, 395, 430, 540, 395, 450, 400, 315, 260, 320, 250, 310, 455, 625, 790, 1130, 1525, 1435, 960, 550, 460, 610, 570, 760, 915, 1040, 1510, 2045, 1740, 1650, 795, 640, 455, 465, 585, 765, 1030, 1280, 1370, 1670, 2120, 1460, 1195, 1185, 800, 920, 1040, 965, 715, 1000, 1110, 1190, 1155, 725, 725, 405, 340, 195, 195, 210, 195, 255, 250, 350, 310, 270, 305] },
    { land: 'Eritrea',     kleur: '#d97706', data: [30, 15, 85, 365, 1075, 1250, 990, 1270, 765, 1100, 275, 135, 135, 70, 50, 65, 70, 125, 230, 235, 170, 240, 290, 195, 210, 150, 145, 110, 125, 125, 140, 115, 185, 75, 130, 75, 155, 140, 185, 135, 150, 100, 140, 110, 100, 100, 50, 55, 35, 55, 45, 30, 40, 35, 45, 35, 40, 55, 45, 40, 35, 45, 20, 5, 10, 25, 35, 35, 40, 35, 25, 55, 40, 45, 25, 45, 45, 85, 60, 90, 55, 90, 75, 115, 85, 85, 80, 85, 80, 85, 130, 165, 165, 150, 150, 95, 90, 140, 155, 105, 190, 210, 295, 235, 220, 240, 255, 210, 140, 105, 90, 100, 165, 100, 110, 145, 215, 115, 75, 110, 65, 80, 85, 155, 465, 560, 280, 275, 430, 275, 275, 185] },
    { land: 'Turkije',     kleur: '#0d2d6b', data: [5, 5, 5, 0, 0, 5, 5, 0, 5, 10, 5, 15, 5, 5, 5, 5, 5, 5, 15, 30, 55, 30, 50, 30, 20, 50, 25, 35, 25, 45, 35, 35, 40, 40, 80, 55, 60, 60, 60, 105, 95, 120, 130, 145, 190, 125, 95, 125, 110, 100, 85, 115, 90, 95, 155, 105, 85, 115, 70, 125, 80, 95, 75, 5, 20, 25, 125, 185, 135, 140, 45, 50, 25, 25, 45, 40, 80, 255, 570, 660, 305, 205, 145, 110, 120, 85, 155, 205, 195, 295, 250, 295, 385, 300, 220, 175, 165, 155, 155, 150, 150, 200, 310, 305, 260, 450, 300, 260, 240, 110, 145, 115, 145, 130, 165, 180, 170, 180, 125, 160, 120, 115, 90, 100, 100, 110, 125, 130, 155, 135, 160, 130] },
    { land: 'Irak',        kleur: '#7c2d12', data: [45, 30, 30, 35, 40, 55, 80, 135, 390, 1045, 695, 425, 255, 165, 80, 40, 45, 70, 65, 45, 45, 50, 55, 50, 45, 60, 55, 70, 60, 75, 75, 150, 75, 60, 75, 50, 70, 45, 45, 50, 65, 45, 50, 55, 80, 95, 85, 60, 55, 55, 45, 50, 55, 55, 70, 35, 50, 40, 55, 55, 60, 30, 20, 15, 10, 20, 35, 25, 30, 35, 30, 25, 35, 15, 20, 20, 10, 30, 40, 30, 65, 205, 185, 90, 45, 30, 60, 60, 25, 30, 45, 55, 65, 85, 60, 115, 65, 65, 55, 195, 135, 80, 110, 40, 90, 95, 165, 400, 210, 400, 575, 450, 140, 85, 85, 80, 40, 35, 65, 60, 40, 35, 35, 55, 25, 65, 55, 50, 55, 45, 55, 55] },
    { land: 'Afghanistan', kleur: '#15803d', data: [35, 35, 30, 45, 40, 50, 65, 140, 160, 445, 885, 625, 385, 160, 50, 50, 55, 60, 55, 60, 45, 35, 40, 35, 40, 30, 30, 30, 30, 35, 30, 30, 10, 25, 15, 20, 20, 20, 25, 20, 20, 25, 25, 50, 45, 35, 30, 15, 20, 25, 25, 30, 35, 20, 30, 60, 50, 45, 40, 60, 80, 40, 40, 5, 5, 10, 20, 35, 15, 50, 35, 55, 30, 35, 80, 70, 40, 100, 110, 255, 1195, 455, 460, 180, 125, 95, 505, 305, 120, 205, 305, 530, 245, 120, 110, 70, 65, 85, 40, 40, 50, 60, 55, 40, 55, 60, 65, 55, 55, 35, 30, 30, 40, 35, 50, 40, 55, 30, 40, 55, 20, 40, 75, 70, 60, 55, 75, 55, 70, 75, 75, 85] },
    { land: 'Jemen',       kleur: '#4a90d9', data: [5, 0, 5, 0, 5, 5, 0, 5, 5, 10, 10, 5, 0, 0, 0, 0, 10, 0, 0, 5, 5, 0, 10, 10, 10, 10, 15, 15, 10, 10, 15, 20, 15, 20, 10, 15, 15, 20, 15, 15, 20, 30, 75, 45, 40, 95, 70, 85, 60, 45, 60, 60, 35, 30, 50, 40, 55, 65, 55, 90, 50, 30, 55, 20, 20, 30, 45, 40, 40, 25, 20, 35, 25, 15, 35, 35, 30, 40, 50, 85, 185, 430, 190, 70, 90, 120, 315, 185, 170, 195, 185, 210, 285, 285, 265, 125, 155, 150, 185, 220, 130, 170, 180, 115, 120, 235, 160, 165, 130, 160, 180, 130, 130, 80, 60, 55, 60, 45, 15, 35, 20, 50, 10, 25, 20, 35, 45, 50, 45, 70, 60, 70] },
    { land: 'Somalië',     kleur: '#a16207', data: [20, 15, 20, 10, 25, 10, 10, 20, 10, 40, 50, 35, 20, 15, 10, 10, 15, 5, 10, 20, 20, 20, 10, 5, 15, 10, 5, 5, 5, 10, 15, 10, 15, 10, 10, 15, 10, 10, 5, 5, 15, 10, 15, 15, 10, 15, 10, 20, 15, 20, 10, 15, 15, 10, 25, 20, 20, 20, 25, 25, 15, 15, 20, 0, 5, 10, 15, 20, 30, 25, 25, 20, 15, 10, 25, 15, 20, 45, 70, 150, 185, 105, 130, 130, 85, 95, 155, 80, 150, 70, 95, 120, 115, 135, 180, 175, 160, 155, 170, 140, 190, 150, 210, 140, 105, 110, 150, 125, 125, 95, 75, 105, 135, 80, 110, 60, 80, 75, 65, 70, 55, 60, 35, 95, 85, 100, 100, 95, 140, 140, 200, 190] },
  ],
};

// ── Nareizigers per herkomstland — maandelijks 2015-2025 (CBS 83102NED) ────
const NAREIZIGERS_TIJDREEKS = {
  maanden: ['2015MM01', '2015MM02', '2015MM03', '2015MM04', '2015MM05', '2015MM06', '2015MM07', '2015MM08', '2015MM09', '2015MM10', '2015MM11', '2015MM12', '2016MM01', '2016MM02', '2016MM03', '2016MM04', '2016MM05', '2016MM06', '2016MM07', '2016MM08', '2016MM09', '2016MM10', '2016MM11', '2016MM12', '2017MM01', '2017MM02', '2017MM03', '2017MM04', '2017MM05', '2017MM06', '2017MM07', '2017MM08', '2017MM09', '2017MM10', '2017MM11', '2017MM12', '2018MM01', '2018MM02', '2018MM03', '2018MM04', '2018MM05', '2018MM06', '2018MM07', '2018MM08', '2018MM09', '2018MM10', '2018MM11', '2018MM12', '2019MM01', '2019MM02', '2019MM03', '2019MM04', '2019MM05', '2019MM06', '2019MM07', '2019MM08', '2019MM09', '2019MM10', '2019MM11', '2019MM12', '2020MM01', '2020MM02', '2020MM03', '2020MM04', '2020MM05', '2020MM06', '2020MM07', '2020MM08', '2020MM09', '2020MM10', '2020MM11', '2020MM12', '2021MM01', '2021MM02', '2021MM03', '2021MM04', '2021MM05', '2021MM06', '2021MM07', '2021MM08', '2021MM09', '2021MM10', '2021MM11', '2021MM12', '2022MM01', '2022MM02', '2022MM03', '2022MM04', '2022MM05', '2022MM06', '2022MM07', '2022MM08', '2022MM09', '2022MM10', '2022MM11', '2022MM12', '2023MM01', '2023MM02', '2023MM03', '2023MM04', '2023MM05', '2023MM06', '2023MM07', '2023MM08', '2023MM09', '2023MM10', '2023MM11', '2023MM12', '2024MM01', '2024MM02', '2024MM03', '2024MM04', '2024MM05', '2024MM06', '2024MM07', '2024MM08', '2024MM09', '2024MM10', '2024MM11', '2024MM12', '2025MM01', '2025MM02', '2025MM03', '2025MM04', '2025MM05', '2025MM06', '2025MM07', '2025MM08', '2025MM09', '2025MM10', '2025MM11', '2025MM12'],
  series: [
    { land: 'Syrië',       kleur: '#b91c1c', data: [405, 320, 355, 385, 715, 945, 1145, 1010, 1190, 1185, 675, 655, 440, 410, 210, 195, 255, 300, 475, 475, 920, 1175, 1695, 1845, 895, 1580, 1235, 1045, 885, 590, 475, 400, 385, 455, 340, 295, 205, 220, 230, 240, 245, 160, 155, 95, 120, 180, 150, 135, 110, 100, 80, 70, 75, 100, 105, 65, 135, 185, 145, 190, 110, 165, 40, 55, 5, 10, 140, 145, 70, 195, 255, 265, 175, 235, 355, 560, 495, 590, 675, 505, 605, 890, 585, 775, 460, 510, 775, 610, 640, 995, 1060, 770, 650, 345, 200, 215, 180, 280, 630, 575, 605, 565, 590, 545, 610, 590, 830, 695, 715, 820, 775, 660, 685, 655, 635, 565, 720, 825, 820, 835, 1030, 1005, 1030, 995, 940, 935, 1080, 1070, 985, 1065, 885, 1110] },
    { land: 'Jemen',       kleur: '#4a90d9', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 10, 5, 5, 10, 10, 5, 10, 10, 10, 20, 15, 20, 15, 5, 5, 5, 5, 0, 5, 10, 5, 15, 20, 20, 25, 40, 20, 20, 15, 35, 35, 5, 20, 0, 0, 0, 5, 45, 100, 125, 50, 65, 70, 65, 70, 50, 65, 40, 25, 50, 55, 30, 65, 40, 30, 35, 15, 40, 70, 75, 15, 15, 15, 15, 15, 10, 20, 55, 20, 110, 70, 70, 105, 130, 65, 105, 70, 80, 65, 80, 60, 100, 60, 90, 70, 70, 45, 55, 50, 65, 30, 50, 40, 65, 170, 235, 225, 190, 170, 115, 120] },
    { land: 'Eritrea',     kleur: '#d97706', data: [55, 25, 25, 30, 40, 35, 60, 115, 155, 105, 130, 235, 165, 80, 85, 70, 80, 65, 105, 85, 125, 135, 135, 180, 125, 210, 210, 265, 275, 145, 155, 175, 185, 265, 400, 460, 350, 285, 280, 180, 340, 250, 230, 155, 120, 90, 170, 115, 100, 180, 75, 85, 110, 225, 250, 130, 165, 125, 145, 195, 260, 200, 50, 55, 30, 35, 10, 25, 80, 70, 170, 85, 15, 10, 70, 105, 95, 70, 80, 30, 35, 75, 65, 85, 25, 35, 35, 45, 40, 65, 50, 40, 65, 60, 25, 35, 45, 30, 20, 30, 15, 5, 0, 0, 10, 15, 15, 10, 25, 15, 5, 15, 10, 25, 20, 10, 25, 30, 10, 10, 35, 10, 25, 25, 20, 30, 25, 25, 30, 25, 35, 35] },
    { land: 'Somalië',     kleur: '#a16207', data: [60, 70, 35, 25, 15, 30, 45, 40, 35, 20, 20, 20, 45, 15, 25, 10, 5, 10, 15, 35, 35, 10, 20, 30, 10, 10, 25, 20, 10, 0, 5, 0, 5, 10, 5, 10, 5, 15, 20, 35, 25, 10, 5, 20, 20, 5, 0, 5, 5, 0, 0, 10, 0, 0, 0, 5, 5, 5, 5, 10, 5, 5, 0, 0, 0, 0, 0, 10, 10, 5, 0, 0, 0, 5, 0, 0, 10, 0, 10, 5, 25, 10, 10, 10, 5, 15, 20, 0, 5, 20, 15, 0, 10, 10, 10, 20, 10, 0, 15, 0, 5, 10, 5, 5, 0, 15, 20, 5, 15, 10, 5, 20, 10, 20, 20, 15, 15, 20, 45, 10, 25, 25, 10, 20, 45, 40, 40, 15, 40, 50, 30, 65] },
    { land: 'Turkije',     kleur: '#0d2d6b', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 5, 5, 10, 5, 0, 5, 5, 0, 0, 5, 5, 5, 5, 15, 5, 10, 10, 5, 5, 5, 10, 5, 0, 0, 5, 70, 40, 55, 15, 20, 25, 40, 65, 75, 50, 50, 40, 100, 90, 80, 55, 40, 55, 35, 50, 55, 45, 75, 135, 290, 115, 80, 85, 50, 80, 60, 75, 130, 105, 105, 115, 110, 70, 120, 115, 80, 60, 30, 70, 40, 15, 25, 35, 30, 20, 25, 45, 60, 70, 40, 35, 30, 20, 25, 40, 60, 40, 45, 35, 45, 50] },
    { land: 'Irak',        kleur: '#7c2d12', data: [25, 15, 10, 10, 5, 10, 15, 40, 25, 30, 15, 15, 5, 10, 5, 20, 10, 0, 0, 10, 15, 5, 30, 15, 20, 40, 20, 35, 35, 35, 30, 40, 40, 45, 50, 55, 20, 45, 35, 10, 15, 20, 25, 5, 0, 5, 10, 5, 5, 0, 5, 5, 10, 20, 5, 5, 5, 5, 5, 15, 0, 5, 0, 0, 0, 0, 5, 5, 15, 20, 20, 30, 15, 35, 15, 25, 35, 30, 20, 25, 10, 25, 10, 20, 10, 10, 25, 10, 0, 15, 10, 10, 10, 10, 0, 20, 10, 30, 40, 20, 15, 30, 5, 25, 10, 35, 15, 25, 20, 30, 30, 55, 55, 25, 30, 25, 25, 45, 25, 20, 15, 20, 20, 10, 10, 20, 50, 35, 25, 15, 10, 20] },
    { land: 'Afghanistan', kleur: '#15803d', data: [20, 10, 5, 5, 10, 5, 0, 10, 5, 5, 10, 0, 5, 5, 5, 5, 10, 5, 0, 5, 5, 0, 0, 10, 5, 5, 5, 10, 15, 5, 0, 0, 5, 15, 5, 15, 10, 15, 35, 25, 30, 15, 40, 25, 20, 15, 20, 5, 10, 10, 10, 0, 15, 5, 5, 10, 20, 5, 5, 10, 5, 10, 5, 0, 0, 0, 0, 5, 5, 5, 0, 5, 0, 10, 20, 0, 0, 15, 5, 5, 10, 10, 15, 25, 15, 5, 25, 5, 15, 5, 10, 20, 10, 20, 15, 20, 20, 10, 20, 20, 25, 15, 15, 0, 30, 10, 5, 10, 10, 0, 30, 20, 15, 10, 20, 10, 10, 10, 20, 15, 10, 15, 5, 15, 15, 20, 15, 15, 25, 10, 15, 30] },
  ],
};

// ── Europa (bron: Eurostat / UNHCR 2024) ────────────────────────────────────
// ⬇ Gesorteerd hoog→laag in het chart; volgorde hier maakt niet uit.
const EUROPA = {
  instroom: [
    { land: '🇦🇹 AT',  per100k: 286 },
    { land: '🇩🇪 DE',  per100k: 274 },
    { land: '🇮🇹 IT',  per100k: 256 },
    { land: 'EU gem.',  per100k: 200 },
    { land: '🇫🇷 FR',  per100k: 191 },
    { land: '🇳🇱 NL',  per100k: 180 },
    { land: '🇧🇪 BE',  per100k: 129 },
    { land: '🇸🇪 SE',  per100k: 124 },
    { land: '🇩🇰 DK',  per100k:  37 },
  ],
  terugkeer: [
    { land: '🇩🇰 DK*', pct: 95 },
    { land: '🇮🇹 IT',  pct: 22 },
    { land: '🇩🇪 DE',  pct: 22 },
    { land: 'EU-27',    pct: 26 },
    { land: '🇳🇱 NL',  pct: 18 },
    { land: '🇧🇪 BE',  pct: 14 },
  ],
};

// Active nav + Laatste-update-timestamp in elke footer
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Inject "Laatste update" onderaan elke site-footer
  document.querySelectorAll('.site-footer').forEach(footer => {
    if (footer.querySelector('.last-update')) return; // dubbel-injectie voorkomen
    const p = document.createElement('p');
    p.className = 'last-update';
    p.style.cssText = 'font-size:.7rem;color:var(--muted);margin-top:.6rem;opacity:.6;letter-spacing:.02em;';
    p.textContent = 'Laatste update: ' + LAST_UPDATE;
    footer.appendChild(p);
  });
});

// Sluit mobiel menu bij klik buiten nav
document.addEventListener('click', function(e) {
  const nav = document.querySelector('.site-nav');
  if (nav && nav.classList.contains('nav-open') && !nav.contains(e.target)) {
    nav.classList.remove('nav-open');
  }
});

// ── Waarderingswidget ──────────────────────────────────────────────────────
// Verschijnt boven de footer op alle pagina's behalve index & reacties.
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const skip = ['index.html', 'reacties.html', ''];
  if (skip.includes(page)) return;

  const storageKey = 'gd_appr_' + page;
  const already    = localStorage.getItem(storageKey);

  const widget = document.createElement('div');
  widget.id    = 'apprWidget';
  widget.style.cssText = [
    'background:var(--bg2)',
    'border-top:1px solid var(--border)',
    'padding:1.25rem 1.5rem',
    'text-align:center',
    'font-size:.88rem',
    'color:var(--text-2)',
  ].join(';');

  if (already) {
    widget.innerHTML = '<span style="color:var(--brand);font-weight:600;">✓ Bedankt voor je reactie!</span> <a href="reacties.html" style="margin-left:.75rem;color:var(--muted);font-size:.8rem;">Uitgebreid reageren →</a>';
  } else {
    widget.innerHTML = `
      <span style="margin-right:.75rem;">Vond je deze pagina nuttig?</span>
      <button id="apprYes" style="
        background:var(--bg3);border:1.5px solid var(--border);
        border-radius:6px;padding:.35rem .9rem;font-size:.85rem;
        cursor:pointer;margin-right:.5rem;transition:all .15s;
        color:var(--text);font-family:inherit;
      ">👍 Ja, bedankt!</button>
      <a href="reacties.html" style="
        display:inline-block;border:1.5px solid var(--border);
        border-radius:6px;padding:.35rem .9rem;font-size:.85rem;
        text-decoration:none;color:var(--text-2);
        background:var(--bg3);transition:all .15s;
      ">💬 Laat een bericht achter →</a>
    `;
  }

  // Inject vóór de footer
  const footer = document.querySelector('.site-footer');
  if (footer) footer.parentNode.insertBefore(widget, footer);

  // Klik-handler voor thumbs-up
  const btn = document.getElementById('apprYes');
  if (btn) {
    btn.addEventListener('mouseenter', function () {
      this.style.borderColor = 'var(--brand)';
      this.style.background  = 'var(--bg)';
    });
    btn.addEventListener('mouseleave', function () {
      this.style.borderColor = 'var(--border)';
      this.style.background  = 'var(--bg3)';
    });
    btn.addEventListener('click', function () {
      localStorage.setItem(storageKey, '1');
      widget.innerHTML = '<span style="color:var(--brand);font-weight:600;">✓ Bedankt voor je reactie!</span> <a href="reacties.html" style="margin-left:.75rem;color:var(--muted);font-size:.8rem;">Uitgebreid reageren →</a>';
      // GA event
      if (window.gtag) gtag('event', 'pagina_nuttig', { event_category: 'engagement', event_label: page });
    });
  }
})();
