'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
function validate(value, seen = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number' && Number.isFinite(value) && !Object.is(value, -0)) return;
  if (typeof value !== 'object' || seen.has(value)) throw new TypeError('Expected acyclic plain JSON values');
  const array = Array.isArray(value);
  if (!array && Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) throw new TypeError('Expected plain object');
  seen.add(value);
  if (Reflect.ownKeys(value).some(k => typeof k === 'symbol')) throw new TypeError('Symbol keys unsupported');
  if (array && Object.keys(value).length !== value.length) throw new TypeError('Sparse or decorated array unsupported');
  for (const key of Object.getOwnPropertyNames(value)) {
    if (array && key === 'length') continue;
    const d = Object.getOwnPropertyDescriptor(value, key);
    if (!d.enumerable || !Object.hasOwn(d, 'value')) throw new TypeError('Expected enumerable data properties');
    validate(d.value, seen);
  }
  seen.delete(value);
}
function roundTrip(config) {
  validate(config);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'portable-config-'));
  try {
    const file = path.join(dir, 'configuration.json');
    fs.writeFileSync(file, JSON.stringify(config), {encoding:'utf8', mode:0o600});
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } finally { fs.rmSync(dir, {recursive:true, force:true}); }
}
module.exports = { roundTrip };
