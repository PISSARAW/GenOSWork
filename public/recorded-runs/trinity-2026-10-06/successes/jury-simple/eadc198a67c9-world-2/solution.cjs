'use strict';
function decide({ prize, pick, host }) {
  for (const door of [prize, pick, host]) {
    if (!Number.isInteger(door) || door < 0 || door > 2) {
      throw new RangeError('Doors must be integers from 0 to 2');
    }
  }
  if (host === pick || host === prize) {
    throw new RangeError('Host must open an unpicked goat door');
  }
  const remaining = [0, 1, 2].find(door => door !== pick && door !== host);
  return { stay: pick === prize, swap: remaining === prize };
}
module.exports = { decide };
