import { $, $$, initNav, DESTINATIONS } from './app.js';
initNav();

const grid = $('#exploreGrid');
function render() {
  const q = $('#q').value.trim().toLowerCase();
  const cat = $('#cat').value;
  const sort = $('#sort').value;
  let list = DESTINATIONS.filter((d) =>
    (cat === 'all' || d.cat === cat) &&
    (!q || d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))));
  if (sort === 'price') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);

  $('#count').textContent = `${list.length} destination${list.length === 1 ? '' : 's'}`;
  grid.innerHTML = list.length ? list.map((d) => `
    <article class="glass dest-card fade-up">
      <div class="dest-img">${d.emoji}
        <span class="badge weather">${d.sky} ${d.temp}°C</span>
        <span class="badge rate">⭐ ${d.rating}</span>
      </div>
      <div class="dest-body">
        <h3>${d.name}</h3>
        <p class="muted" style="font-size:.88rem">${d.country}</p>
        <div class="tags">${d.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="dest-meta">
          <span><span class="price grad-text">$${d.price}</span> <span class="muted" style="font-size:.78rem">/ person</span></span>
          <a class="btn btn-primary btn-sm" href="itinerary.html">Plan trip</a>
        </div>
      </div>
    </article>`).join('') : '<p class="empty">No destinations match your search.</p>';
}
['#q', '#cat', '#sort'].forEach((s) => $(s).addEventListener('input', render));
render();
