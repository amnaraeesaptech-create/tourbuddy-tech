import { $, $$, initNav, bindModal, openModal, DESTINATIONS } from './app.js';
initNav();

/* Trust counters */
function countUp(el) {
  const target = Number(el.dataset.count);
  const dec = el.dataset.dec === 'true';
  let cur = 0; const step = target / 60;
  const tick = () => {
    cur = Math.min(target, cur + step);
    el.textContent = dec ? cur.toFixed(1) : Math.floor(cur).toLocaleString('en-US');
    if (cur < target) requestAnimationFrame(tick);
  };
  tick();
}
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { countUp(e.target); io.unobserve(e.target); } });
}, { threshold: 0.4 });
$$('[data-count]').forEach((el) => io.observe(el));

/* Featured destinations + filter chips */
const grid = $('#featuredGrid');
function renderFeatured(cat = 'all') {
  const list = DESTINATIONS.filter((d) => cat === 'all' || d.cat === cat).slice(0, 8);
  grid.innerHTML = list.map((d) => `
    <article class="glass dest-card fade-up">
      <div class="dest-img">${d.emoji}
        <span class="badge weather">${d.sky} ${d.temp}°C</span>
        <span class="badge rate">⭐ ${d.rating}</span>
      </div>
      <div class="dest-body">
        <h3>${d.name}</h3>
        <p class="muted" style="font-size:.88rem">${d.country}</p>
        <div class="dest-meta"><span class="price grad-text">$${d.price}</span>
          <a class="btn btn-sm" href="explore.html">View</a></div>
      </div>
    </article>`).join('');
}
renderFeatured();
$$('#featuredChips .chip').forEach((chip) => chip.addEventListener('click', () => {
  $$('#featuredChips .chip').forEach((c) => c.classList.remove('active'));
  chip.classList.add('active');
  renderFeatured(chip.dataset.cat);
}));

/* AI Journey Generator */
const modal = $('#tripModal');
bindModal(modal);

const VIBES = {
  relaxed: ['Slow breakfast at a local café', 'Spa & thermal bath session', 'Sunset viewpoint stroll', 'Boutique dinner by the water'],
  adventure: ['Sunrise summit hike', 'Kayaking the coastline', 'Zipline & canyon trail', 'Night sky stargazing camp'],
  culture: ['Old town heritage walk', 'Museum & artisan quarter', 'Traditional cooking class', 'Live folk music evening'],
  luxury: ['Private chauffeur city tour', 'Michelin tasting menu', 'Rooftop infinity pool', 'Yacht sunset cruise'],
};

function buildItinerary(dest, days, vibe) {
  const acts = VIBES[vibe] || VIBES.relaxed;
  let html = `<p class="muted">A ${days}-day <strong>${vibe}</strong> journey through <strong>${dest}</strong>, generated instantly.</p>`;
  for (let d = 1; d <= days; d++) {
    html += `<div class="glass card" style="margin-top:16px;padding:18px">
      <h4 class="grad-text">Day ${d}</h4>
      <ul style="margin-top:10px;padding-left:18px;color:var(--muted);font-size:.92rem">
        ${acts.map((a, i) => `<li>${['09:00', '12:30', '16:00', '19:30'][i]} — ${a}</li>`).join('')}
      </ul></div>`;
  }
  return html;
}

function generate(dest, days, vibe) {
  $('#tripTitle').textContent = `${dest} · ${days} days`;
  $('#tripBody').innerHTML = buildItinerary(dest, Number(days), vibe);
  openModal(modal);
}

$('#heroSearch').addEventListener('submit', (e) => {
  e.preventDefault();
  generate($('#hDest').value.trim() || 'Santorini', $('#hDays').value, $('#hVibe').value);
});
$('#aiForm').addEventListener('submit', (e) => {
  e.preventDefault();
  generate($('#aDest').value.trim() || 'Kyoto', $('#aDays').value, $('#aVibe').value);
});
