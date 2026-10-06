exports.compute=function(answer){const ts=answer.designs.flatMap(d=>d.transitions);return [ts.filter(t=>t.scope==='relayed').length/ts.length,ts.filter(t=>t.requiresConfirmation).length/ts.length];};
