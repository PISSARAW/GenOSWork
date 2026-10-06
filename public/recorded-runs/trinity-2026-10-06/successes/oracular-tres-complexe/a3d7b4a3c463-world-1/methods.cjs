'use strict';
// Bounded fixture domain: nonnegative graph weights, integer capacities, universal implications.
const relation=s=>{const m=/^all (\w+) are (\w+)$/.exec(s);if(!m)throw Error('Unsupported implication');return m.slice(1);};
function edges(p){return p.directed?p.edges:p.edges.flatMap(([a,b,w])=>[[a,b,w],[b,a,w]]);}
function trace(p, symbolic=false){const env={x:p.initial};const expressions={x:()=>p.initial};for(const s of p.trace){const m=/^(\w+)=(\w+)(?:\+(\d+))?$/.exec(s);if(!m)throw Error('Unsupported trace');const [,a,b,k]=m;if(!(b in env))throw Error('Uninitialized register');env[a]=env[b]+Number(k||0);if(symbolic){const prior=expressions[b],delta=Number(k||0);expressions[a]=()=>prior()+delta;}}return symbolic?expressions.x():env.x;}
function models(p, reverse=false){const rs=p.premises.map(relation),[a,b]=relation(p.conclusion),names=[...new Set([...rs.flat(),a,b])];if(names.length>20)throw Error('Model bound exceeded');for(let i=0;i<2**names.length;i++){const mask=reverse?2**names.length-1-i:i;const has=n=>Boolean(mask&(2**names.indexOf(n)));if(rs.every(([x,y])=>!has(x)||has(y))&&has(a)&&!has(b))return false;}return true;}
function paths(p){let best=Infinity;const es=edges(p);function visit(u,d,seen){if(u===p.end){best=Math.min(best,d);return;}for(const [a,b,w]of es)if(a===u&&!seen.has(b)){visit(b,d+w,new Set([...seen,b]));}}visit(p.start,0,new Set([p.start]));return best;}
function subsets(p, reverse=false){let best=0;function visit(i,w,v){if(w>p.capacity)return;if(i===p.items.length){best=Math.max(best,v);return;}const x=p.items[i];if(reverse){visit(i+1,w+x.weight,v+x.value);visit(i+1,w,v);}else{visit(i+1,w,v);visit(i+1,w+x.weight,v+x.value);}}visit(0,0,0);return best;}
function montyCheck(p){if(p.doors<3||!p.hostKnows||!p.hostAlwaysOpensGoat||!p.hostAlwaysOffersSwitch)throw Error('Host protocol unsupported');}
function exhaustive(p){switch(p.type){
case 'prime':if(p.n<2)return false;for(let d=2;d<p.n;d++)if(p.n%d===0)return false;return true;
case 'shortestPath':return paths(p);
case 'knapsack':return subsets(p);
case 'montyHall':montyCheck(p);{let wins=0,total=0;for(let prize=0;prize<p.doors;prize++)for(let pick=0;pick<p.doors;pick++){wins+=prize!==pick;total++;}return wins/total;}
case 'entailment':return models(p);
case 'lostUpdate':return trace(p);
case 'factorialZeros':{let f=1n;for(let i=2;i<=p.n;i++)f*=BigInt(i);let z=0;while(f%10n===0n){z++;f/=10n;}return z;}
case 'minCoins':{let best=Infinity;function search(i,left,count){if(left===0){best=Math.min(best,count);return;}if(i===p.coins.length||count>=best)return;const c=p.coins[i];for(let n=Math.floor(left/c);n>=0;n--)search(i+1,left-n*c,count+n);}search(0,p.target,0);return best;}
case 'divisibility':{const out=[];for(let n=p.min;n<=p.max;n++)if(p.divisibleBy.every(d=>n%d===0)&&n%p.notDivisibleBy!==0)out.push(n);return out;}
case 'twoDice':{let count=0;for(let a=1;a<=p.sides;a++)for(let b=1;b<=p.sides;b++)count+=a+b===p.sum;return count/p.sides**2;}
default:throw Error('Unknown type');}}
function structured(p){switch(p.type){
case 'prime':if(p.n<2)return false;for(let d=2;d*d<=p.n;d++)if(p.n%d===0)return false;return true;
case 'shortestPath':{const dist=Object.fromEntries(p.nodes.map(n=>[n,Infinity]));dist[p.start]=0;for(let i=1;i<p.nodes.length;i++)for(const [a,b,w]of edges(p))dist[b]=Math.min(dist[b],dist[a]+w);return dist[p.end];}
case 'knapsack':{const dp=Array(p.capacity+1).fill(0);for(const {weight,value}of p.items)for(let c=p.capacity;c>=weight;c--)dp[c]=Math.max(dp[c],dp[c-weight]+value);return dp[p.capacity];}
case 'montyHall':montyCheck(p);return (p.doors-1)/p.doors;
case 'entailment':{const rs=p.premises.map(relation),[a,b]=relation(p.conclusion),seen=new Set([a]);let changed=true;while(changed){changed=false;for(const [x,y]of rs)if(seen.has(x)&&!seen.has(y)){seen.add(y);changed=true;}}return seen.has(b);}
case 'lostUpdate':return trace(p,true);
case 'factorialZeros':{let z=0;for(let q=Math.floor(p.n/5);q>0;q=Math.floor(q/5))z+=q;return z;}
case 'minCoins':{const dp=Array(p.target+1).fill(Infinity);dp[0]=0;for(let n=1;n<=p.target;n++)for(const c of p.coins)if(c<=n)dp[n]=Math.min(dp[n],dp[n-c]+1);return dp[p.target];}
case 'divisibility':{const gcd=(a,b)=>b?gcd(b,a%b):a;const step=p.divisibleBy.reduce((a,b)=>a/gcd(a,b)*b,1),out=[];for(let n=Math.ceil(p.min/step)*step;n<=p.max;n+=step)if(n%p.notDivisibleBy!==0)out.push(n);return out;}
case 'twoDice':return Math.max(0,Math.min(p.sides,p.sum-1)-Math.max(1,p.sum-p.sides)+1)/p.sides**2;
default:throw Error('Unknown type');}}
function falsification(p){switch(p.type){
case 'prime':if(p.n<2)return false;for(let d=Math.floor(Math.sqrt(p.n));d>=2;d--)if(p.n%d===0)return false;return true;
case 'shortestPath':{const es=edges(p),d=Object.fromEntries(p.nodes.map(n=>[n,Infinity])),pending=new Set(p.nodes);d[p.start]=0;while(pending.size){const u=[...pending].reduce((a,b)=>d[a]<d[b]?a:b);pending.delete(u);if(d[u]===Infinity)break;for(const [a,b,w]of es){if(w<0)throw Error('Negative edge unsupported');if(a===u&&d[b]>d[u]+w)d[b]=d[u]+w;}}return d[p.end];}
case 'knapsack':return subsets(p,true); // Every feasible subset challenges the current value bound.
case 'montyHall':montyCheck(p);{let failures=0;for(let prize=0;prize<p.doors;prize++)if(prize===0)failures++;return 1-failures/p.doors;}
case 'entailment':return models(p,true);
case 'lostUpdate':{let x=p.initial;const regs=new Map();for(const s of p.trace){let m=/^(\w+)=x$/.exec(s);if(m){regs.set(m[1],x);continue;}m=/^x=(\w+)\+(\d+)$/.exec(s);if(!m||!regs.has(m[1]))throw Error('Unsupported trace');x=regs.get(m[1])+Number(m[2]);}return x;}
case 'factorialZeros':{let twos=0,fives=0;for(let i=2;i<=p.n;i++){let a=i,b=i;while(a%2===0){twos++;a/=2;}while(b%5===0){fives++;b/=5;}}return Math.min(twos,fives);}
case 'minCoins':{let layer=new Set([0]),seen=new Set([0]);for(let count=0;layer.size;count++){if(layer.has(p.target))return count;const next=new Set();for(const n of layer)for(const c of p.coins)if(n+c<=p.target&&!seen.has(n+c)){seen.add(n+c);next.add(n+c);}layer=next;}return Infinity;}
case 'divisibility':{const candidates=Array.from({length:Math.max(0,p.max-p.min+1)},(_,i)=>i+p.min);return candidates.filter(n=>!p.divisibleBy.some(d=>n%d!==0)&&n%p.notDivisibleBy!==0);}
case 'twoDice':{let failures=0;for(let a=1;a<=p.sides;a++)for(let b=1;b<=p.sides;b++)if(a+b!==p.sum)failures++;return 1-failures/p.sides**2;}
default:throw Error('Unknown type');}}
module.exports={exhaustive,structured,falsification};
