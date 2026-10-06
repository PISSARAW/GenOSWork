'use strict';
// Exact dynamic programming over feasible completed-job subsets.
exports.solve = function solve(jobs) {
  if (!Array.isArray(jobs)) throw new TypeError('jobs must be an array');
  const ids = new Map();
  jobs.forEach((j, i) => {
    if (!j || typeof j.id !== 'string' || ids.has(j.id))
      throw new TypeError('job ids must be unique strings');
    if (!Number.isFinite(j.duration) || j.duration < 0 ||
        !Number.isFinite(j.weight) || j.weight < 0 || !Array.isArray(j.deps))
      throw new TypeError('invalid duration, weight or dependencies');
    ids.set(j.id, i);
  });
  const bits = jobs.map((_, i) => 1n << BigInt(i));
  const requirements = jobs.map(j => j.deps.reduce((mask, id) => {
    if (!ids.has(id)) throw new TypeError('unknown dependency: ' + id);
    return mask | bits[ids.get(id)];
  }, 0n));
  let layer = new Map([[0n, { time: 0, cost: 0, order: [] }]]);
  for (let depth = 0; depth < jobs.length; depth++) {
    const next = new Map();
    for (const [mask, state] of layer) {
      for (let i = 0; i < jobs.length; i++) {
        if ((mask & bits[i]) !== 0n || (mask & requirements[i]) !== requirements[i]) continue;
        const newMask = mask | bits[i];
        const time = state.time + jobs[i].duration;
        const cost = state.cost + jobs[i].weight * time;
        if (!Number.isFinite(time) || !Number.isFinite(cost))
          throw new RangeError('numeric overflow');
        const old = next.get(newMask);
        if (!old || cost < old.cost)
          next.set(newMask, { time, cost, order: [...state.order, jobs[i].id] });
      }
    }
    if (!next.size) throw new Error('dependency cycle');
    layer = next;
  }
  const best = layer.values().next().value;
  return { order: best.order, objective: best.cost };
};
