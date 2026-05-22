// ── Laatste update ──────────────────────────────────────────────────────
// Wordt bij elke git push handmatig bijgewerkt naar het exacte pushmoment.
// JS hieronder injecteert deze waarde onderaan elke .site-footer.
const LAST_UPDATE = '22 mei 2026, 09:00';

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

// Chart defaults
Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
Chart.defaults.color = '#64748b';
Chart.defaults.plugins.legend.labels.boxWidth = 12;

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
