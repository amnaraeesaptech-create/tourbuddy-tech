import { $, initNav } from './app.js';
initNav();

/* ---- AI chatbot simulator ---- */
const log = $('#chatLog');
const REPLIES = [
  { k: ['visa', 'passport'], a: 'Most destinations need a passport valid 6+ months. Check e-visa options 3 weeks before departure — I can add it to your packing list.' },
  { k: ['budget', 'cheap', 'cost'], a: 'A smart mid-range daily budget is $90–$140: stay $55, food $35, activities $30. Track it live on the Budget page.' },
  { k: ['pack', 'luggage'], a: 'Pack layers, one power adapter, and keep documents in a separate pouch. The Packing page has a ready checklist with a progress gauge.' },
  { k: ['weather', 'rain', 'temperature'], a: 'Shoulder seasons (April–May, Sept–Oct) give mild weather and lower prices. Live forecast is on the right of this page.' },
  { k: ['food', 'eat', 'restaurant'], a: 'Eat where locals queue, book dinner tables early, and keep one splurge meal per trip in your budget.' },
  { k: ['itinerary', 'plan', 'days'], a: 'Try 2 anchor activities per day plus free time. Build it visually on the Itinerary page timeline.' },
];
function reply(text) {
  const t = text.toLowerCase();
  const hit = REPLIES.find((r) => r.k.some((k) => t.includes(k)));
  return hit ? hit.a : 'Great question! Tell me your destination, dates, and travel vibe and I will suggest a day-by-day plan, a budget range, and a packing list.';
}
function push(text, who) {
  const el = document.createElement('div');
  el.className = 'msg ' + who;
  el.textContent = text;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
}
$('#chatForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = $('#chatInput');
  const text = input.value.trim();
  if (!text) return;
  push(text, 'me'); input.value = '';
  push('Typing…', 'bot');
  setTimeout(() => { log.lastChild.textContent = reply(text); }, 650);
});

/* ---- Currency converter ---- */
const RATES = { USD: 1, EUR: 0.92, JPY: 151.4, GBP: 0.78 };
function convert() {
  const amt = Number($('#cAmount').value) || 0;
  const from = $('#cFrom').value; const to = $('#cTo').value;
  const out = (amt / RATES[from]) * RATES[to];
  $('#cOut').textContent = `${out.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${to}`;
  $('#cRate').textContent = `1 ${from} = ${(RATES[to] / RATES[from]).toFixed(3)} ${to}`;
}
['#cAmount', '#cFrom', '#cTo'].forEach((s) => $(s).addEventListener('input', convert));
convert();

/* ---- Weather widget ---- */
const WX = {
  Santorini: { t: 27, s: '☀️', c: 'Sunny', h: 42, w: 14 },
  Kyoto: { t: 21, s: '🌤️', c: 'Partly cloudy', h: 60, w: 9 },
  Dubai: { t: 35, s: '☀️', c: 'Clear & hot', h: 30, w: 18 },
  Reykjavik: { t: 6, s: '❄️', c: 'Cold showers', h: 78, w: 26 },
  Bali: { t: 30, s: '🌦️', c: 'Tropical showers', h: 80, w: 11 },
};
function weather() {
  const city = $('#wCity').value;
  const d = WX[city];
  $('#wIcon').textContent = d.s;
  $('#wTemp').textContent = d.t + '°';
  $('#wCond').textContent = d.c;
  $('#wMeta').textContent = `Humidity ${d.h}% · Wind ${d.w} km/h`;
  const names = ['Mon', 'Tue', 'Wed', 'Thu'];
  $('#wDays').innerHTML = names.map((n, i) => `
    <div class="wx-day"><div>${n}</div><div class="e">${['☀️', '🌤️', '🌦️', '⛅'][i]}</div>
    <div>${d.t + [0, -1, -3, 1][i]}°</div></div>`).join('');
}
$('#wCity').addEventListener('change', weather);
weather();
