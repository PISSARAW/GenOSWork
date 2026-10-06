'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const f=JSON.parse(fs.readFileSync('fixture.json','utf8'));
const a=JSON.parse(fs.readFileSync('answer.json','utf8'));
const eq=(x,y)=>assert.deepEqual([...x].sort(),[...y].sort());
function front(c){return c.filter(x=>!c.some(y=>y[0]!==x[0]&&y.slice(1).every((v,i)=>v<=x[i+1])&&y.slice(1).some((v,i)=>v<x[i+1]))).map(x=>x[0]);}
if(f.variant==='pareto'){
 eq(a.paretoFront,front(f.candidates));
 assert.ok(Array.isArray(a.tradeoffs)&&a.tradeoffs.length>=a.paretoFront.length,'document every tradeoff');
 if(f.constraint){const ix=f.dimensions.indexOf(f.constraint.dimension)+1;eq(a.constrainedFront,front(f.candidates.filter(c=>c[ix]<=f.constraint.maximum)));}
 assert.ok(typeof a.explanation==='string'&&a.explanation.length>100);
 console.log(JSON.stringify({passed:true,method:'componentwise exhaustive dominance',front:front(f.candidates),candidates:f.candidates.length}));
}else{
 const names=Object.keys(f.factors);
 const grid=names.reduce((g,k)=>g.flatMap(x=>f.factors[k].map(v=>({...x,[k]:v}))),[{}]);
 assert.equal(a.cells.length,grid.length);
 let qualities=[];
 const orders=[];
 function perms(p,remaining){if(!remaining.length){if(p.indexOf('A')<p.indexOf('C')&&p.indexOf('B')<p.indexOf('D'))orders.push(p);return;}for(const x of remaining)perms([...p,x],remaining.filter(y=>x!==y));}
 perms([],['A','B','C','D']);
 function metric(order,objective){let t=0,sum=0,min=Infinity;const duration={A:3,B:2,C:4,D:1},deadline={A:8,B:6,C:12,D:7};for(const x of order){t+=duration[x];sum+=t;min=Math.min(min,deadline[x]-t);}return objective==='temps'?sum:min;}
 for(const cell of grid){const c=a.cells.filter(c=>names.every(k=>c.factors[k]===cell[k]));assert.equal(c.length,1);const r=c[0];assert.ok(typeof r.trace==='string'&&r.trace.length>20);let q=1;
 if(f.id==='factorial-simple')eq(r.solutions,Array.from({length:12},(_,i)=>i+1).filter(x=>x%2===0&&x>5&&x%3===0));
 if(f.id==='factorial-moyen')eq(r.solutions,Array.from({length:20},(_,i)=>i+1).filter(x=>x%2&&x%3===2&&x>10&&[...String(x)].reduce((s,d)=>s+Number(d),0)===8));
 if(f.id==='factorial-difficile'){const dp=[0];for(let t=1;t<=6;t++)dp[t]=Math.min(...[1,3,4].filter(x=>x<=t).map(x=>dp[t-x]+1));assert.equal(r.count,cell.strategie==='DP'?dp[6]:3);assert.equal(r.coins.reduce((s,n)=>s+n,0),6);assert.equal(r.coins.length,r.count);assert.ok(r.coins.every(x=>[1,3,4].includes(x)));q=r.count===dp[6]?1:0;}
 if(f.id==='factorial-tres-complexe'){assert.ok(orders.some(x=>x.join(',')===r.order.join(',')));const vals=orders.map(x=>metric(x,cell.objectif));const optimum=cell.objectif==='temps'?Math.min(...vals):Math.max(...vals);if(cell.recherche==='heuristique')eq(r.order.map((x,i)=>i+':'+x),['0:B','1:D','2:A','3:C']);else assert.equal(metric(r.order,cell.objectif),optimum);assert.equal(r.objectiveValue,metric(r.order,cell.objectif));q=metric(r.order,cell.objectif)===optimum?1:0;assert.equal(r.quality,q);}
 qualities.push({factors:cell,q});}
 assert.ok(a.analysis&&typeof a.analysis.mainEffects==='object'&&typeof a.analysis.interactions==='object');
 const mean=qualities.reduce((s,c)=>s+c.q,0)/qualities.length;
 for(const k of names){for(const v of f.factors[k]){const subset=qualities.filter(c=>c.factors[k]===v);const effect=subset.reduce((s,c)=>s+c.q,0)/subset.length-mean;assert.ok(Math.abs(a.analysis.mainEffects[k][v]-effect)<1e-8,'main effect '+k+'/'+v);}}
 for(let i=0;i<names.length;i++)for(let j=i+1;j<names.length;j++){const k=names[i],l=names[j],key=k+'*'+l;assert.ok(a.analysis.interactions[key],'interaction '+key);for(const v of f.factors[k])for(const w of f.factors[l]){const s=qualities.filter(c=>c.factors[k]===v&&c.factors[l]===w);const expected=s.reduce((z,c)=>z+c.q,0)/s.length-mean-a.analysis.mainEffects[k][v]-a.analysis.mainEffects[l][w];assert.ok(Math.abs(a.analysis.interactions[key][v+'|'+w]-expected)<1e-8);}}
 console.log(JSON.stringify({passed:true,method:'exhaustive independent oracle and factorial effects',cells:grid.length,grandMean:mean}));
}