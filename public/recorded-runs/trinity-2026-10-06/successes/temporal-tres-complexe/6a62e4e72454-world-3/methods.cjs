const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
function validate(value, seen = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number' && Number.isFinite(value) && !Object.is(value, -0)) return;
  if (typeof value !== 'object') throw new TypeError('Only lossless JSON values are portable');
  if (seen.has(value)) throw new TypeError('Cycles are not portable');
  const proto = Object.getPrototypeOf(value);
  if (!Array.isArray(value) && proto !== Object.prototype && proto !== null) throw new TypeError('Non-JSON object');
  if (Object.getOwnPropertySymbols(value).length) throw new TypeError('Symbol keys are not portable');
  seen.add(value);
  const keys = Object.keys(value);
  if (Array.isArray(value) && (keys.length !== value.length || keys.some((k,i) => k !== String(i)))) throw new TypeError('Sparse or extended array');
  for (const key of Reflect.ownKeys(value)) {
    if (Array.isArray(value) && key === 'length') continue;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor.enumerable || !('value' in descriptor)) throw new TypeError('Descriptors are not portable');
    validate(descriptor.value, seen);
  }
  seen.delete(value);
}
function roundTrip(config) {
  validate(config);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'portable-config-'));
  try {
    const file = path.join(dir, 'configuration.json');
    fs.writeFileSync(file, JSON.stringify({format:'portable-config', formatVersion:1, config}), {encoding:'utf8', mode:0o600});
    const saved = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (saved.format !== 'portable-config' || saved.formatVersion !== 1) throw new Error('Unsupported envelope');
    return saved.config;
  } finally { fs.rmSync(dir, {recursive:true, force:true}); }
}
module.exports = {roundTrip};
