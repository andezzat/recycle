import { run } from '@cycle/run';
import { div, label, input, hr, h1, makeDOMDriver } from '@cycle/dom';

import { pipe } from './helpers';


const getInput$ = (selector, eventName) => DOM =>
  DOM.select(selector).events(eventName);

const getName$ = input$ => input$
  .map(e => e.target.value)
  .startWith('');

const getVdom$ = name$ => name$.map(name => div([
  label('Name: '),
  input('.field', { attrs: { type: 'text' } }),
  hr(),
  h1(`Hello ${name}`)
]));

const createVdom$ = pipe(
  getInput$('.field', 'input'),
  getName$,
  getVdom$,
);

const main = ({ DOM }) => ({
  DOM: createVdom$(DOM),
});


run(main, { DOM: makeDOMDriver('#app') });
