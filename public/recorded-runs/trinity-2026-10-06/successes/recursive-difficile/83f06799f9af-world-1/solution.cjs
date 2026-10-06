'use strict';
exports.solve = function solve(jobs) {
  if (!Array.isArray(jobs)) throw new TypeError('jobs must be an array');
  if (jobs.length > 22) throw new RangeError('Exact solver supports at most 22 jobs');
  const index = new Map();
  jobs.forEach((j, i) => {
    if (!j || typeof j.id !== 'string' || index.has(j.id)) throw new TypeError('Unique string ids required');
    if (!Number.isFinite(j.duration) || j.duration < 0 || !Number.isFinite(j.weight) || j.weight < 0 || !Array.isArray(j.deps)) throw new TypeError('Nonnegative finite duration/weight and deps array required');
    index.set(j.id, i);
  });
  const bits = jobs.map((_, i) => 1 << i);
  const deps = jobs.map(j => j.deps.reduce((mask, id) => {
    if (!index.has(id)) throw new TypeError('Unknown dependency: ' + id);
    return mask | bits[index.get(id)];
  }, 0));
  let layer = new Map([[0, {cost: 0, time: 0, path: null}]]);
  for (let depth = 0; depth < jobs.length; depth++) {
    const next = new Map();
    for (const [mask, state] of layer) {
      for (let i = 0; i < jobs.length; i++) {
        if ((mask & bits[i]) || (mask & deps[i]) !== deps[i]) continue;
        const time = state.time + jobs[i].duration;
        const cost = state.cost + jobs[i].weight * time;
        if (!Number.isFinite(time) || !Number.isFinite(cost)) throw new RangeError('Numeric overflow');
        const target = mask | bits[i];
        const prior = next.get(target);
        if (!prior || cost < prior.cost) next.set(target, {cost, time, path: {id: jobs[i].id, previous: state.path}});
      }
    }
    if (!next.size) throw new Error('Dependency cycle');
    layer = next;
  }
  const final = layer.get((1 << jobs.length) - 1);
  const order = [];
  for (let p = final.path; p; p = p.previous) order.push(p.id);
  return {order: order.reverse(), objective: final.cost};
};
