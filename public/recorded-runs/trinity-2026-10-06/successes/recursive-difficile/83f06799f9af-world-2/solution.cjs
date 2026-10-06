'use strict';

// Exact iterative dynamic programming over feasible completed-job subsets.
exports.solve = function solve(jobs) {
  if (!Array.isArray(jobs)) throw new TypeError('jobs must be an array');
  const index = new Map();
  jobs.forEach((j, i) => {
    if (!j || typeof j.id !== 'string' || index.has(j.id))
      throw new TypeError('job IDs must be unique strings');
    if (!Number.isFinite(j.duration) || j.duration < 0 ||
        !Number.isFinite(j.weight) || j.weight < 0 || !Array.isArray(j.deps))
      throw new TypeError('finite nonnegative durations/weights and deps arrays required');
    index.set(j.id, i);
  });
  const bits = jobs.map((_, i) => 1n << BigInt(i));
  const dependencies = jobs.map(j => j.deps.reduce((mask, id) => {
    if (!index.has(id)) throw new Error('Unknown dependency: ' + id);
    return mask | bits[index.get(id)];
  }, 0n));
  let layer = new Map([[0n, { cost: 0, time: 0, node: null }]]);
  for (let depth = 0; depth < jobs.length; depth++) {
    const next = new Map();
    for (const [mask, state] of layer) {
      for (let i = 0; i < jobs.length; i++) {
        if ((mask & bits[i]) !== 0n ||
            (mask & dependencies[i]) !== dependencies[i]) continue;
        const time = state.time + jobs[i].duration;
        const cost = state.cost + jobs[i].weight * time;
        if (!Number.isFinite(time) || !Number.isFinite(cost))
          throw new RangeError('Numeric overflow');
        const target = mask | bits[i];
        const old = next.get(target);
        if (!old || cost < old.cost)
          next.set(target, { cost, time, node: { id: jobs[i].id, prev: state.node } });
      }
    }
    if (!next.size) throw new Error('Dependency cycle');
    layer = next;
  }
  const best = layer.values().next().value;
  const order = [];
  for (let node = best.node; node; node = node.prev) order.push(node.id);
  order.reverse();
  return { order, objective: best.cost };
};
