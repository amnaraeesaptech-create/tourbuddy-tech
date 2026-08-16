import { $, $$, initNav, store } from './app.js';
initNav();

const DEFAULTS = {
  Documents: { icon: '🛂', items: ['Passport / ID', 'Visa copies', 'Travel insurance', 'Flight tickets', 'Hotel bookings'] },
  Electronics: { icon: '🔌', items: ['Phone & charger', 'Power bank', 'Universal adapter', 'Headphones', 'Camera'] },
  Apparel: { icon: '🧥', items: ['Comfortable walking shoes', 'Light jacket', 'Daywear outfits', 'Swimwear', 'Sleepwear'] },
  Toiletries: { icon: '🧴', items: ['Toothbrush & paste', 'Sunscreen SPF 50', 'Medication kit', 'Deodorant', 'Wet wipes'] },
};

let state = store.get('packing', null);
if (!state) {
  state = {};
  Object.entries(DEFAULTS).forEach(([cat, v]) => {
    state[cat] = { icon: v.icon, items: v.items.map((label, i) => ({ id: cat + i, label, done: false })) };
  });
}
const save = () => store.set('packing', state);

const grid = $('#packGrid');
function updateGauge() {
  const all = Object.values(state).flatMap((c) => c.items);
  const done = all.filter((i) => i.done).length;
  const pct = all.length ? Math.round((done / all.length) * 100) : 0;
  $('#pct').textContent = pct + '%';
  $('#gaugeFill').style.width = pct + '%';
  $('#packSummary').textContent = `${done} of ${all.length} items packed`;
}

function render() {
  grid.innerHTML = Object.entries(state).map(([cat, c]) => `
    <section class="glass pack-cat fade-up" data-cat="${cat}">
      <h3>${c.icon} ${cat} <span class="badge" style="margin-left:auto">${c.items.filter((i) => i.done).length}/${c.items.length}</span></h3>
      ${c.items.map((i) => `
        <label class="pack-item ${i.done ? 'done' : ''}">
          <input type="checkbox" data-id="${i.id}" ${i.done ? 'checked' : ''}>
          <span>${i.label}</span>
        </label>`).join('')}
      <form class="add-item" data-cat="${cat}">
        <input placeholder="Add item…" aria-label="Add item to ${cat}">
        <button class="btn btn-primary btn-sm" type="submit">Add</button>
      </form>
    </section>`).join('');
  updateGauge();
}

grid.addEventListener('change', (e) => {
  const id = e.target.dataset.id;
  if (!id) return;
  Object.values(state).forEach((c) => c.items.forEach((i) => { if (i.id === id) i.done = e.target.checked; }));
  save(); render();
});

grid.addEventListener('submit', (e) => {
  e.preventDefault();
  const cat = e.target.dataset.cat;
  const input = e.target.querySelector('input');
  const label = input.value.trim();
  if (!label) return;
  state[cat].items.push({ id: cat + Date.now(), label, done: false });
  save(); render();
});

render();
