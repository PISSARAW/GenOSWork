'use strict';
const answer = require('./answer.json');
function replay(design, events) {
 let state = design.states[0];
 for (const event of events) {
  const matches = design.transitions.filter(t => t.from === state && t.trigger === event);
  if (matches.length !== 1) throw new Error('Transition absente ou ambiguë: ' + state + '/' + event);
  state = matches[0].to;
 }
 return state;
}
function replayPopulation(design, eventSequences) {
 if (eventSequences.length !== 100) throw new Error('100 séquences requises');
 return eventSequences.map(events => replay(design, events));
}
module.exports = { designs: answer.designs, replay, replayPopulation };

