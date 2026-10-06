'use strict';
function decide({ prize, pick, host }) {
  const doors = [0, 1, 2];
  if (![prize, pick, host].every(d => doors.includes(d)) || host === pick || host === prize) {
    throw new RangeError('Expected doors 0, 1, 2 and a host opening an unchosen goat door.');
  }
  const other = doors.find(d => d !== pick && d !== host);
  return { stay: pick === prize, swap: other === prize };
}
module.exports = { decide };
