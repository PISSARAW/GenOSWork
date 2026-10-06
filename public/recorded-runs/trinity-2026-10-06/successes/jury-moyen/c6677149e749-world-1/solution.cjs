'use strict';
function search(sortedArray, target) {
  let lo = 0;
  let hi = sortedArray.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (sortedArray[mid] === target) return mid;
    if (sortedArray[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
module.exports = { search };
