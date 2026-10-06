'use strict';
function exhaustive() {
  const result = [];
  for (let n = 1; n <= 100; n++) {
    if (n > 50 && n % 4 === 0 && n % 6 === 0 && n % 5 !== 0) result.push(n);
  }
  return result;
}
function multiplesOfTwelve() {
  const result = [];
  // lcm(4, 6) = 12; 50 < 12k <= 100 implies 5 <= k <= 8.
  for (let k = 5; k <= 8; k++) if (k % 5 !== 0) result.push(12 * k);
  return result;
}
function setIntersection() {
  const fours = new Set(Array.from({length: 25}, (_, i) => 4 * (i + 1)));
  const sixes = Array.from({length: 16}, (_, i) => 6 * (i + 1));
  return sixes.filter(n => fours.has(n) && n > 50 && n % 5 !== 0);
}
exports.solve = function solve() {
  const paths = [exhaustive(), multiplesOfTwelve(), setIntersection()];
  if (!paths.every(xs => JSON.stringify(xs) === JSON.stringify(paths[0]))) {
    throw new Error('Independent calculation paths disagree');
  }
  return paths[0];
};
exports.paths = {exhaustive, multiplesOfTwelve, setIntersection};
