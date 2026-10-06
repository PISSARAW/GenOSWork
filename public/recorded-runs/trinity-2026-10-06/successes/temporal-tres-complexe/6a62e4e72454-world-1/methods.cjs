'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

// Portable domain: JSON trees, no silent coercion or loss of values.
function validate(value, ancestors = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number' && Number.isFinite(value) && !Object.is(value, -0)) return;
  if (typeof value !== 'object') throw new TypeError('Unsupported JSON value');
  if (ancestors.has(value)) throw new TypeError('Cyclic configuration');
  const array = Array.isArray(value);
  if (!array && Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)
    throw new TypeError('Configuration must be a JSON tree');
  ancestors.add(value);
  const keys = Reflect.ownKeys(value).filter(k => !(array && k === 'length'));
  if (array && (keys.length !== value.length || keys.some((k, i) => k !== String(i))))
    throw new TypeError('Sparse or extended array');
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== 'string' || !descriptor.enumerable || !('value' in descriptor))
      throw new TypeError('Unsupported property');
    validate(descriptor.value, ancestors);
  }
  ancestors.delete(value);
}
function roundTrip(config) {
  validate(config);
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'portable-config-'));
  try {
    const filename = path.join(directory, 'config.json');
    fs.writeFileSync(filename, JSON.stringify(config), { encoding: 'utf8', flag: 'wx', mode: 0o600 });
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}
module.exports = { roundTrip };

