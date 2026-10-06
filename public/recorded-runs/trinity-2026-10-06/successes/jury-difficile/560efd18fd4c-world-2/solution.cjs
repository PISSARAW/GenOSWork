'use strict';
function simulate(events) {
  if (!Array.isArray(events)) throw new TypeError('events must be an array');
  const byId = new Map(), bySeq = new Map();
  let duplicates = 0, replayed = [];
  const ordered = () => [...byId.values()].sort((a,b) => a.seq-b.seq).map(m => ({...m}));
  for (const event of events) {
    if (!event || typeof event !== 'object') throw new TypeError('invalid event');
    if (event.type === 'send') {
      const {id,seq,body} = event;
      if (typeof id !== 'string' || !id || !Number.isSafeInteger(seq) || seq < 1) throw new TypeError('invalid message');
      if (byId.has(id)) {
        const old = byId.get(id);
        if (old.seq !== seq || old.body !== body) throw new Error('conflicting duplicate id');
        duplicates++;
        continue;
      }
      if (bySeq.has(seq)) throw new Error('conflicting sequence');
      const message = {id,seq,body};
      // Atomic simulated persistence; acknowledgment is eligible only after both writes.
      byId.set(id,message);
      bySeq.set(seq,id);
    } else if (event.type === 'reconnect') {
      if (!Number.isSafeInteger(event.after) || event.after < 0) throw new TypeError('invalid cursor');
      replayed = ordered().filter(m => m.seq > event.after);
    } else if (event.type !== 'disconnect') {
      throw new TypeError('unknown event type');
    }
  }
  return {durable: ordered(), replayed, duplicates};
}
module.exports = {simulate};
