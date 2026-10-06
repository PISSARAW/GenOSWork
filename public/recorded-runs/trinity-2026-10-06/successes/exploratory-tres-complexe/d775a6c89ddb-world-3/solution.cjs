'use strict';
exports.replay = function(design, events) {
 let state = design.states[0];
 for (const event of events) {
  const matches = design.transitions.filter(t => t.from === state && t.trigger === event);
  if (matches.length !== 1) throw new Error('Transition absente ou ambiguë: ' + state + '/' + event);
  state = matches[0].to;
 }
 return state;
};

