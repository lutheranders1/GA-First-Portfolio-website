// ====== THEME TOGGLE ======
const root = document.documentElement;
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const savedTheme = localStorage.getItem('theme');
function applyTheme(theme){
  if(theme === 'light'){ root.classList.add('light'); }
  else { root.classList.remove('light'); }
}
applyTheme(savedTheme ?? (prefersLight ? 'light' : 'dark'));

document.getElementById('themeToggle').addEventListener('click', () => {
  const isLight = root.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ====== NAV TOGGLE (mobile) ======
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// ====== YEAR ======
document.getElementById('year').textContent = new Date().getFullYear();

// ====== COUNTERS ======
const counters = document.querySelectorAll('.num');
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = +el.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.round(target/60));
      const i = setInterval(() => {
        cur += step;
        if(cur >= target){ cur = target; clearInterval(i); }
        el.textContent = cur.toLocaleString();
      }, 16);
      obs.unobserve(el);
    }
  });
}, {threshold: 0.6});
counters.forEach(c => obs.observe(c));

// ====== PROJECT DATA ======
// Edit this array to reflect your real projects. Use images you already have in the repo.
const PROJECTS = [
  {
    title: 'Operations Access Tracker',
    thumb: 'TabDash1.PNG',
    tags: ['Power BI', 'DAX', 'Operations'],
    role: 'Data Analyst',
    year: 2025,
    blurb: 'Built an Access/FMLA tracker for field technicians—automated data refresh and KPI rollups.',
    details: 'Reduced manual tracking by 8+ hours/week. Implemented row-level security and scheduled refresh; designed DAX measures for absence rates.',
    links: [
      { label: 'Case study', href: 'projects.html#access-tracker' }
    ],
    shots: ['TabDash.PNG','TabDash2.PNG']
  },
  {
    title: 'Simple Interest Calculator (Refactor)',
    thumb: 'Screenshot 2022-04-19 194732.png',
    tags: ['JavaScript', 'HTML/CSS'],
    role: 'Developer',
    year: 2022,
    blurb: 'Refactored a vanilla JS calculator for better state handling and a11y.',
    details: 'Removed jQuery dependency, added input validation and keyboard support, and improved layout with CSS grid.',
    links: [
      { label: 'GitHub', href: 'https://github.com/lutheranders1/GA-First-Portfolio-website' }
    ],
    shots: ['Screenshot 2022-04-21 005157.png']
  },
  {
    title: 'Customer Segmentation for LMI',
    thumb: 'ScreenshotResume.jpg',
    tags: ['Python', 'Pandas', 'Segmentation'],
    role: 'Data Analyst',
    year: 2025,
    blurb: 'Clustered LMI customer segments to target assistance and reduce arrears risk.',
    details: 'Engineered behavioral features, ran k-means and validated with silhouette score, delivered Power BI dashboard for ops.',
    links: [
      { label: 'Overview', href: 'projects.html#lmi-segmentation' }
    ],
    shots: []
  }
];

// ====== RENDER FILTERS ======
const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort();
const filtersEl = document.getElementById('filters');
const selected = new Set(); // active filters

function renderFilters(){
  filtersEl.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'chip' + (selected.size === 0 ? ' active' : '');
  allBtn.textContent = 'All';
  allBtn.addEventListener('click', () => { selected.clear(); renderFilters(); renderGrid(); });
  filtersEl.appendChild(allBtn);

  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'chip' + (selected.has(tag) ? ' active' : '');
    btn.textContent = tag;
    btn.addEventListener('click', () => {
      if(selected.has(tag)) selected.delete(tag); else selected.add(tag);
      renderFilters(); renderGrid();
    });
    filtersEl.appendChild(btn);
  });
}
renderFilters();

// ====== RENDER GRID ======
const grid = document.getElementById('projectGrid');
const search = document.getElementById('projectSearch');

function matchesFilters(p){
  if(selected.size === 0) return true;
  return [...selected].every(t => p.tags.includes(t));
}
function matchesSearch(p){
  const q = search.value.trim().toLowerCase();
  if(!q) return true;
  const hay = [p.title, p.blurb, p.details, p.tags.join(' ')].join(' ').toLowerCase();
  return hay.includes(q);
}
function renderGrid(){
  const items = PROJECTS.filter(p => matchesFilters(p) && matchesSearch(p));
  grid.innerHTML = items.map((p, idx) => `
    <article class="card" role="listitem">
      <img class="card__thumb" src="${p.thumb}" alt="${p.title} thumbnail" />
      <div class="card__body">
        <h3 class="card__title">${p.title}</h3>
        <p class="card__meta">${p.role} • ${p.year}</p>
        <p>${p.blurb}</p>
        <div class="card__tags">
          ${p.tags.map(t => `<span class="badge">${t}</span>`).join('')}
        </div>
        <div style="margin-top:.6rem;">
          <button class="btn btn--sm" data-open="${idx}">Quick view</button>
        </div>
      </div>
    </article>
  `).join('');

  // bind modal buttons
  grid.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => openModal(+btn.dataset.open));
  });
}
renderGrid();
search.addEventListener('input', renderGrid);

// ====== MODAL ======
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');

function openModal(i){
  const p = PROJECTS[i];
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalMeta').textContent = `${p.role} • ${p.year} — ${p.tags.join(', ')}`;
  document.getElementById('modalDesc').textContent = p.details;
  const links = document.getElementById('modalLinks');
  links.innerHTML = (p.links || []).map(l => `<a class="btn btn--ghost" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('');
  const shots = document.getElementById('modalShots');
  shots.innerHTML = (p.shots || []).map(s => `<img src="${s}" alt="${p.title} screenshot">`).join('');
  if(typeof modal.showModal === 'function'){ modal.showModal(); }
  else { modal.setAttribute('open',''); } // Safari iOS fallback
}
modalClose.addEventListener('click', () => {
  if(typeof modal.close === 'function'){ modal.close(); }
  else { modal.removeAttribute('open'); }
});
modal.addEventListener('click', (e) => {
  const rect = modal.querySelector('.modal__content').getBoundingClientRect();
  const inDialog = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
  if(!inDialog){ modalClose.click(); }
});

