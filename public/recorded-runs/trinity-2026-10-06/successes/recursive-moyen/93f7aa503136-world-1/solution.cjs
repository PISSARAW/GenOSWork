'use strict';

// Positive integer denominations, reusable without limit.
exports.minCoins = function minCoins(n, coins) {
  if (!Number.isSafeInteger(n) || n < 0) {
    throw new RangeError('n must be a nonnegative safe integer');
  }
  if (!Array.isArray(coins) || coins.some(c => !Number.isSafeInteger(c) || c <= 0)) {
    throw new TypeError('coins must be an array of positive safe integers');
  }
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let amount = 1; amount <= n; amount++) {
    for (const coin of coins) {
      if (coin <= amount) dp[amount] = Math.min(dp[amount], 1 + dp[amount - coin]);
    }
  }
  return dp[n];
};
