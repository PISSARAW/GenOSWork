'use strict';
function zeros(n) {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('n must be a nonnegative safe integer');
  let count = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}
module.exports = { zeros };
