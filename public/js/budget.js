import { $, initNav, store, money } from './app.js';
initNav();

const ICONS = { Flights: '✈️', Stay: '🏨', Food: '🍽️', Activities: '🎟️', Transport: '🚕', Other: '🧾' };
let budget = store.get('budgetTotal', 3000);
let expenses = store.get('expenses', [
  { id: 1, title: 'Return flights', cat: 'Flights', amount: 780, date: '2026-08-02' },
  { id: 2, title: 'Boutique hotel · 4 nights', cat: 'Stay', amount: 640, date: '2026-08-03' },
  { id: 3, title: 'Food & cafés', cat: 'Food', amount: 210, date: '2026-08-04' },
]);

const save = () => { store.set('expenses', expenses); store.set('budgetTotal', budget); };

function render() {
  const spent = expenses.reduce((s, e) => s + Number(e.amount), 0);
  $('#total').textContent = money(budget);
  $('#spent').textContent = money(spent);
  $('#left').textContent = money(budget - spent);
  $('#budgetInput').value = budget;

  $('#expList').innerHTML = expenses.length ? expenses.map((e) => `
    <div class="exp-row fade-up">
      <div style="min-width:0">
        <h4>${ICONS[e.cat] || '🧾'} ${e.title}</h4>
        <p class="muted" style="font-size:.8rem">${e.cat} · ${e.date}</p>
      </div>
      <span class="amt grad-text">${money(e.amount)}</span>
      <button class="del btn btn-sm" data-id="${e.id}">Remove</button>
    </div>`).join('') : '<p class="empty">No expenses logged yet.</p>';
}

$('#expList').addEventListener('click', (e) => {
  const b = e.target.closest('[data-id]');
  if (!b) return;
  expenses = expenses.filter((x) => x.id !== Number(b.dataset.id));
  save(); render();
});

$('#expForm').addEventListener('submit', (e) => {
  e.preventDefault();
  expenses.unshift({
    id: Date.now(),
    title: $('#eTitle').value.trim(),
    cat: $('#eCat').value,
    amount: Number($('#eAmount').value),
    date: $('#eDate').value || new Date().toISOString().slice(0, 10),
  });
  save(); render(); e.target.reset();
});

$('#budgetInput').addEventListener('change', (e) => {
  budget = Number(e.target.value) || 0;
  save(); render();
});

render();
