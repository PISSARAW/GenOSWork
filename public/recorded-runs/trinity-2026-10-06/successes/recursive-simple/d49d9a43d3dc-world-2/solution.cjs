'use strict';

exports.zeros = function zeros(n) {
  if (!Number.isSafeInteger(n) || n < 0) {
    throw new RangeError('n must be a nonnegative safe integer');
  }
  let total = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    total += n;
  }
  return total;
};
