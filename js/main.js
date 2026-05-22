// ── Laatste update ──────────────────────────────────────────────────────
// Wordt bij elke git push handmatig bijgewerkt naar het exacte pushmoment.
// JS hieronder injecteert deze waarde onderaan elke .site-footer.
const LAST_UPDATE = '22 mei 2026, 20:45';

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

// ── Economie (bron: Rijksbegroting 2026 hoofdstuk XX; COA/IND jaarverslagen) ───
// ⬇ Update deze constanten wanneer nieuwe begrotingscijfers beschikbaar zijn.
const ECONOMIE = {
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

// ── Herkomst over tijd (eerste asielaanvragen 2015–2025) ──────────────────
// Bron: CBS Open Data 80059NED. Top 7 landen + nationaal totaal.
const HERKOMST_TIJDREEKS = {
  jaren: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  series: [
    { land: 'Syrië',       kleur: '#b91c1c', data: [18675, 2865, 2970, 2960, 3675, 4070, 8380, 12650, 13030, 11525, 3285] },
    { land: 'Eritrea',     kleur: '#d97706', data: [ 7360, 1860, 1590, 1410,  500,  370,  770,  1365,  2345,  1465, 3135] },
    { land: 'Turkije',     kleur: '#0d2d6b', data: [   55,  235,  480, 1300, 1250,  990, 2460,  2685,  2860,  1870, 1480] },
    { land: 'Irak',        kleur: '#7c2d12', data: [ 3010,  960,  845,  745,  620,  335,  745,   670,  1495,  2220,  575] },
    { land: 'Afghanistan', kleur: '#15803d', data: [ 2550, 1025,  320,  325,  435,  390, 3005,  2730,   670,   490,  765] },
    { land: 'Jemen',       kleur: '#4a90d9', data: [   50,   45,  170,  530,  645,  410, 1190,  2430,  1980,  1080,  510] },
    { land: 'Somalië',     kleur: '#a16207', data: [  265,  155,  125,  135,  220,  200,  905,  1455,  1805,  1075, 1290] },
  ],
  totaal: [43095, 19370, 16145, 20510, 22540, 13720, 24740, 35535, 38375, 32175, 24140],
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
