const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu(){ menu.setAttribute('aria-expanded', 'false'); delete navigation.dataset.open; }
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.dataset.open = String(open);
});
navigation?.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
const sources = [
  { name: 'AI discovery report.pdf', location: 'Page 8 · Discovery principles', highlight: 'Structure content around clear questions and support claims with original evidence.', remainder: ' This gives readers a direct path from an explanation to its underlying research.' },
  { name: 'Content strategy.md', location: 'Section · Consistent language', highlight: 'Keep terminology consistent across product documentation and research.', remainder: ' A shared vocabulary helps readers follow the same concepts across different documents.' }
];
document.querySelectorAll('[data-source]').forEach(button => button.addEventListener('click', () => {
  const index = Number(button.dataset.source);
  const source = sources[index];
  document.querySelector('#source-name').textContent = source.name;
  document.querySelector('#source-location').textContent = source.location;
  const highlighted = document.createElement('mark');
  highlighted.textContent = source.highlight;
  document.querySelector('#source-passage').replaceChildren('“', highlighted, source.remainder + '”');
  document.querySelectorAll('[data-source]').forEach(other => other.setAttribute('aria-pressed', String(Number(other.dataset.source) === index)));
}));
