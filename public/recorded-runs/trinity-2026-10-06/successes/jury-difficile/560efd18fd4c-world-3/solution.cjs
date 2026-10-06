'use strict';
function simulate(events) {
  const byId = new Map(), bySeq = new Map();
  let duplicates = 0, replayed = [];
  for (const e of events) {
    if (e.type === 'send') {
      if (typeof e.id !== 'string' || !Number.isSafeInteger(e.seq) || e.seq < 0) throw new Error('invalid message');
      if (byId.has(e.id)) {
        const old = byId.get(e.id);
        if (old.seq !== e.seq || old.body !== e.body) throw new Error('conflicting id');
        duplicates++;
        continue;
      }
      if (bySeq.has(e.seq)) throw new Error('conflicting seq');
      const message = {id:e.id, seq:e.seq, body:e.body};
      byId.set(e.id, message);
      bySeq.set(e.seq, e.id);
      // This insertion models successful persistence; ACK is allowed only here.
    } else if (e.type === 'reconnect') {
      if (!Number.isSafeInteger(e.after) || e.after < 0) throw new Error('invalid cursor');
      replayed = [...byId.values()].filter(m => m.seq > e.after).sort((a,b) => a.seq-b.seq);
    } else if (e.type !== 'disconnect') throw new Error('unknown event');
  }
  return {durable:[...byId.values()].sort((a,b) => a.seq-b.seq), replayed, duplicates};
}
module.exports = {simulate};
