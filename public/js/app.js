// Shared helpers for Smart Travel Companion
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const money = (n) => '$' + Number(n || 0).toLocaleString('en-US');

export const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem('stc:' + key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('stc:' + key, JSON.stringify(value)); } catch { /* ignore */ }
  },
};

export function initNav() {
  const toggle = $('.nav-toggle'); const links = $('.nav-links');
  if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
  const here = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a').forEach((a) => {
    if (a.getAttribute('href') === here) a.classList.add('active');
  });
}

export function openModal(el) { el.classList.add('open'); }
export function closeModal(el) { el.classList.remove('open'); }

export function bindModal(modal) {
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-close')) closeModal(modal);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(modal); });
}

export const DESTINATIONS = [
  { id: 1, name: 'Santorini', country: 'Greece', emoji: '🏖️', cat: 'beach', rating: 4.9, price: 1450, temp: 27, sky: '☀️', tags: ['Sunsets', 'Caldera', 'Cliffside'] },
  { id: 2, name: 'Kyoto', country: 'Japan', emoji: '⛩️', cat: 'culture', rating: 4.8, price: 1720, temp: 21, sky: '🌤️', tags: ['Temples', 'Gardens', 'Tea'] },
  { id: 3, name: 'Reykjavik', country: 'Iceland', emoji: '🌌', cat: 'nature', rating: 4.7, price: 1980, temp: 6, sky: '❄️', tags: ['Aurora', 'Glaciers', 'Springs'] },
  { id: 4, name: 'Dubai', country: 'UAE', emoji: '🏙️', cat: 'urban', rating: 4.6, price: 1320, temp: 35, sky: '☀️', tags: ['Skyline', 'Desert', 'Luxury'] },
  { id: 5, name: 'Hunza Valley', country: 'Pakistan', emoji: '🏔️', cat: 'nature', rating: 4.9, price: 890, temp: 15, sky: '🌤️', tags: ['Peaks', 'Karakoram', 'Cherry'] },
  { id: 6, name: 'Barcelona', country: 'Spain', emoji: '🎨', cat: 'urban', rating: 4.7, price: 1180, temp: 24, sky: '☀️', tags: ['Gaudí', 'Tapas', 'Beach'] },
  { id: 7, name: 'Bali', country: 'Indonesia', emoji: '🌴', cat: 'beach', rating: 4.8, price: 980, temp: 30, sky: '🌦️', tags: ['Rice fields', 'Surf', 'Spa'] },
  { id: 8, name: 'Marrakech', country: 'Morocco', emoji: '🕌', cat: 'culture', rating: 4.5, price: 860, temp: 32, sky: '☀️', tags: ['Souks', 'Riads', 'Sahara'] },
  { id: 9, name: 'Queenstown', country: 'New Zealand', emoji: '🚡', cat: 'nature', rating: 4.8, price: 2100, temp: 12, sky: '🌥️', tags: ['Adventure', 'Lakes', 'Bungee'] },
  { id: 10, name: 'Istanbul', country: 'Türkiye', emoji: '🌉', cat: 'culture', rating: 4.7, price: 940, temp: 26, sky: '🌤️', tags: ['Bosphorus', 'Bazaar', 'History'] },
  { id: 11, name: 'Maldives', country: 'Maldives', emoji: '🐠', cat: 'beach', rating: 4.9, price: 2400, temp: 31, sky: '☀️', tags: ['Reefs', 'Villas', 'Diving'] },
  { id: 12, name: 'Singapore', country: 'Singapore', emoji: '🌃', cat: 'urban', rating: 4.7, price: 1500, temp: 30, sky: '🌦️', tags: ['Gardens', 'Food', 'Design'] },
];
