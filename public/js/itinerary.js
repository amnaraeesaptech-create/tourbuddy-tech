import { $, $$, initNav, store } from './app.js';
initNav();

const ICONS = { Sightseeing: '📸', Food: '🍽️', Adventure: '🧗', Relax: '🧘', Transport: '🚕', Shopping: '🛍️' };
const DEFAULTS = {
  1: [
    { id: 1, time: '09:00', title: 'Arrival & hotel check-in', cat: 'Transport', place: 'City Center', note: 'Keep passport and booking code handy.' },
    { id: 2, time: '13:00', title: 'Old town food walk', cat: 'Food', place: 'Historic Quarter', note: 'Try the local street specialties.' },
    { id: 3, time: '18:30', title: 'Sunset viewpoint', cat: 'Sightseeing', place: 'Hilltop Terrace', note: 'Arrive 30 minutes early for a good spot.' },
  ],
  2: [
    { id: 4, time: '08:00', title: 'Sunrise hiking trail', cat: 'Adventure', place: 'National Park', note: 'Pack water and light snacks.' },
    { id: 5, time: '15:00', title: 'Museum & gallery tour', cat: 'Sightseeing', place: 'Arts District', note: 'Student discount available.' },
  ],
  3: [
    { id: 6, time: '10:00', title: 'Island boat cruise', cat: 'Adventure', place: 'Marina Pier', note: 'Bring sunscreen.' },
    { id: 7, time: '20:00', title: 'Rooftop dinner', cat: 'Food', place: 'Skyline Lounge', note: 'Reservation recommended.' },
  ],
  4: [
    { id: 8, time: '11:00', title: 'Souvenir shopping', cat: 'Shopping', place: 'Central Bazaar', note: 'Bargaining is normal here.' },
    { id: 9, time: '17:00', title: 'Spa & departure prep', cat: 'Relax', place: 'Hotel Spa', note: 'Check-out at 20:00.' },
  ],
};

let data = store.get('itinerary', DEFAULTS);
let day = 1;
const list = $('#timeline');

function save() { store.set('itinerary', data); }

function render() {
  const items = [...(data[day] || [])].sort((a, b) => a.time.localeCompare(b.time));
  list.innerHTML = items.length ? items.map((a) => `
    <article class="glass act fade-up">
      <div class="act-top">
        <div style="min-width:0">
          <span class="act-time">${a.time}</span>
          <h3>${ICONS[a.cat] || '📍'} ${a.title}</h3>
          <div class="act-info"><span>🏷️ ${a.cat}</span><span>📍 ${a.place || '—'}</span></div>
          ${a.note ? `<p class="act-note">${a.note}</p>` : ''}
        </div>
        <button class="del" data-id="${a.id}">Delete</button>
      </div>
    </article>`).join('') : '<p class="empty">No activities yet for this day. Add your first one above.</p>';
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('.del');
  if (!btn) return;
  data[day] = data[day].filter((a) => a.id !== Number(btn.dataset.id));
  save(); render();
});

$$('.day-tabs .chip').forEach((tab) => tab.addEventListener('click', () => {
  $$('.day-tabs .chip').forEach((t) => t.classList.remove('active'));
  tab.classList.add('active');
  day = Number(tab.dataset.day);
  render();
}));

$('#actForm').addEventListener('submit', (e) => {
  e.preventDefault();
  data[day] = data[day] || [];
  data[day].push({
    id: Date.now(),
    time: $('#aTime').value || '09:00',
    title: $('#aTitle').value.trim(),
    cat: $('#aCat').value,
    place: $('#aPlace').value.trim(),
    note: $('#aNote').value.trim(),
  });
  save(); render(); e.target.reset();
});

render();
