import { collections, documents, questions } from './demo-data.js';

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESCAPES[c]);
const typeOf = (name) => documents.find((d) => d.name === name)?.type ?? 'DOC';
const badge = (type) => `<span class="file-type${type === 'MD' ? ' green' : ''}">${type}</span>`;
const shortName = (name) => name.replace(/\.[^.]+$/, '');

export const questionsIn = (scope) => questions.filter((q) => q.scopes.includes(scope));
export const documentsIn = (scope) => documents.filter((d) => scope === 'all' || d.collection === scope);

export function matchQuestion(text, scope) {
  const words = text.toLowerCase().match(/[a-z]{3,}/g) ?? [];
  let best = null, bestScore = 0;
  for (const q of questionsIn(scope)) {
    const haystack = new Set([...q.keywords, ...(q.text.toLowerCase().match(/[a-z]{3,}/g) ?? [])]);
    const score = words.filter((w) => haystack.has(w)).length;
    if (score > bestScore) { best = q; bestScore = score; }
  }
  return best;
}

export function renderScopes(scope) {
  return collections.map((c) => `<button type="button" class="sidebar-item" data-scope="${c.id}" aria-pressed="${c.id === scope}"><span aria-hidden="true">${c.icon}</span> ${esc(c.label)}</button>`).join('');
}

export function renderSuggestions(scope, activeId) {
  return questionsIn(scope).map((q) => `<button type="button" data-question="${q.id}" aria-pressed="${q.id === activeId}">${esc(q.text)}</button>`).join('');
}

export function renderStatus(scope, question) {
  const label = collections.find((c) => c.id === scope).label;
  const n = documentsIn(scope).length;
  const found = question ? `${question.sources.length} relevant ${question.sources.length === 1 ? 'passage' : 'passages'} → Cited answer` : 'No relevant passages';
  return `<span class="status-dot"></span> Searched ${n} ${n === 1 ? 'document' : 'documents'} in ${esc(label)} → ${found}`;
}

export function renderAnswer(question, active = 0) {
  if (!question) return '<p class="demo-answer">This example library has no passages for that question. Try one of the suggestions.</p>';
  return question.answer.map((p) => {
    const src = question.sources[p.cite];
    return `<p class="demo-answer">${esc(p.text)} <button type="button" class="citation" data-source="${p.cite}" aria-controls="source-preview" aria-pressed="${p.cite === active}" aria-label="Show source ${p.cite + 1}: ${esc(shortName(src.doc))}">${p.cite + 1}</button></p>`;
  }).join('');
}

export function renderTabs(question, active = 0) {
  if (!question) return '';
  return question.sources.map((s, i) => `<button type="button" data-source="${i}" aria-controls="source-preview" aria-pressed="${i === active}">${badge(typeOf(s.doc))} ${esc(shortName(s.doc))} ↗</button>`).join('');
}

export function renderPreview(question, active = 0) {
  const s = question?.sources[active];
  if (!s) return '';
  return `<div><span id="source-name">${esc(s.doc)}</span><span id="source-location">${esc(s.location)}</span></div><p id="source-passage">“<mark>${esc(s.highlight)}</mark>${esc(s.remainder)}”</p><span class="source-footnote">Original passage · Illustrative content</span>`;
}
