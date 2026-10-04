import { questions } from './demo-data.js';
import { matchQuestion, questionsIn, renderAnswer, renderPreview, renderScopes, renderStatus, renderSuggestions, renderTabs } from './demo-render.js';

const root = document.querySelector('.workspace');
if (root) {
  const $ = (selector) => root.querySelector(selector);
  const input = $('#demo-query');
  const state = { scope: 'all', question: questions[0], source: 0 };

  function render() {
    const { scope, question, source } = state;
    $('#demo-scopes').innerHTML = renderScopes(scope);
    $('#demo-suggestions').innerHTML = renderSuggestions(scope, question?.id);
    $('#demo-status').innerHTML = renderStatus(scope, question);
    $('#demo-answer').innerHTML = renderAnswer(question, source);
    $('#demo-tabs').innerHTML = renderTabs(question, source);
    const preview = $('#source-preview');
    preview.innerHTML = renderPreview(question, source);
    preview.hidden = !question;
  }

  function ask(question) {
    state.question = question;
    state.source = 0;
    render();
  }

  // Re-rendering replaces the clicked button, so hand keyboard focus to its replacement.
  function restoreFocus(clicked) {
    const container = clicked.parentElement.id;
    const key = Object.keys(clicked.dataset)[0];
    root.querySelector(`#${container} [data-${key}="${clicked.dataset[key]}"]`)?.focus();
  }

  root.addEventListener('click', (event) => {
    const scope = event.target.closest('[data-scope]');
    const suggestion = event.target.closest('[data-question]');
    const source = event.target.closest('[data-source]');
    if (scope) {
      state.scope = scope.dataset.scope;
      if (!state.question || !state.question.scopes.includes(state.scope)) {
        state.question = questionsIn(state.scope)[0];
        input.value = state.question.text;
      }
      state.source = 0;
      render();
      restoreFocus(scope);
    } else if (suggestion) {
      const question = questions.find((q) => q.id === suggestion.dataset.question);
      input.value = question.text;
      ask(question);
      restoreFocus(suggestion);
    } else if (source) {
      state.source = Number(source.dataset.source);
      render();
      restoreFocus(source);
    }
  });

  $('#demo-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value.trim()) ask(matchQuestion(input.value, state.scope));
  });
}
