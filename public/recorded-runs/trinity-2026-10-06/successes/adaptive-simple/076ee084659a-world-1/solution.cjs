'use strict';
function exhaustive() {
  const numbers = [];
  for (let n = 1; n <= 100; n++) {
    if (n > 50 && n % 4 === 0 && n % 6 === 0 && n % 5 !== 0) numbers.push(n);
  }
  return numbers;
}
function multiplesOfLcm() {
  const numbers = [];
  for (let n = 12; n <= 100; n += 12) {
    if (n > 50 && n % 5 !== 0) numbers.push(n);
  }
  return numbers;
}
function setIntersection() {
  const fours = new Set();
  const sixes = new Set();
  for (let k = 1; k <= 25; k++) fours.add(4 * k);
  for (let k = 1; k <= 16; k++) sixes.add(6 * k);
  return [...fours].filter(n => sixes.has(n) && n > 50 && n % 5 !== 0);
}
exports.solve = function solve() {
  const result = exhaustive();
  for (const candidate of [multiplesOfLcm(), setIntersection()]) {
    if (JSON.stringify(candidate) !== JSON.stringify(result)) throw new Error('Disagreement between designs');
  }
  return result;
};
exports.designs = { exhaustive, multiplesOfLcm, setIntersection };
