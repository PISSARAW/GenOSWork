'use strict';
const answer = require('./answer.json');
function replay(family, events) {
  const design = answer.designs.find(d => d.family === family);
  if (!design) throw new Error('Unknown family');
  let state = design.states[0];
  for (const event of events) {
    const matches = design.transitions.filter(t => t.from === state && t.trigger === event);
    if (matches.length !== 1) throw new Error('Invalid or ambiguous event: ' + event);
    state = matches[0].to;
  }
  return state;
}
module.exports = { designs: answer.designs, replay };
