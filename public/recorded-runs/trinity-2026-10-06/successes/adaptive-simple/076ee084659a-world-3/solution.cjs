'use strict';
function exhaustive() {
  const result = [];
  for (let n = 1; n <= 100; n++) {
    if (n > 50 && n % 4 === 0 && n % 6 === 0 && n % 5 !== 0) result.push(n);
  }
  return result;
}
function multiples() {
  const result = [];
  for (let n = 12; n <= 100; n += 12) {
    if (n > 50 && n % 5 !== 0) result.push(n);
  }
  return result;
}
function intersection() {
  const fours = new Set();
  for (let n = 4; n <= 100; n += 4) fours.add(n);
  const result = [];
  for (let n = 6; n <= 100; n += 6) {
    if (fours.has(n) && n > 50 && n % 5 !== 0) result.push(n);
  }
  return result;
}
exports.solve = function solve() {
  const result = exhaustive();
  for (const candidate of [multiples(), intersection()]) {
    if (JSON.stringify(candidate) !== JSON.stringify(result)) {
      throw new Error('Independent approaches disagree');
    }
  }
  return result;
};
exports.approaches = { exhaustive, multiples, intersection };
