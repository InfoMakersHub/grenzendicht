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
  ...Array.from({length: 52}, (_, i) => `2025-W${i+1}`),
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

// Active nav
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});
