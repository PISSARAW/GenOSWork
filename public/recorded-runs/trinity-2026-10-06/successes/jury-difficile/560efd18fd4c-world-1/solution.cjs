'use strict';
function simulate(events) {
  if (!Array.isArray(events)) throw new TypeError('events must be an array');
  const ids = new Map(), seqs = new Map(), replayed = [], acks = [];
  let duplicates = 0, connected = true;
  const ordered = () => [...ids.values()].sort((a,b) => a.seq-b.seq);
  for (const e of events) {
    if (!e || typeof e !== 'object') throw new TypeError('invalid event');
    if (e.type === 'send') {
      if (typeof e.id !== 'string' || !e.id || !Number.isSafeInteger(e.seq) || e.seq < 1) throw new TypeError('invalid message');
      const msg = {id:e.id, seq:e.seq, body:e.body};
      if (ids.has(e.id)) {
        const old = ids.get(e.id);
        if (old.seq !== e.seq || JSON.stringify(old.body) !== JSON.stringify(e.body)) throw new Error('id conflict');
        duplicates++;
      } else {
        if (seqs.has(e.seq)) throw new Error('seq conflict');
        ids.set(e.id, msg); seqs.set(e.seq, e.id);
      }
      // Persistence is modeled as atomic map insertion, before ACK creation.
      if (connected) acks.push({id:e.id, seq:e.seq});
    } else if (e.type === 'disconnect') connected = false;
    else if (e.type === 'reconnect') {
      if (!Number.isSafeInteger(e.after) || e.after < 0) throw new TypeError('invalid cursor');
      connected = true;
      replayed.push(...ordered().filter(m => m.seq > e.after));
    } else throw new TypeError('unknown event type');
  }
  return {durable:ordered(), replayed, duplicates, acks};
}
module.exports = {simulate};
