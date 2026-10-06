'use strict';
// Shared parsing only; no fixture IDs or expected answers enter solver code.
function rules(p){return [...p.premises,p.conclusion].map(s=>{const m=/^all (\w+) are (\w+)$/.exec(s);if(!m)throw Error('Unsupported logic');return m.slice(1);});}
function arcs(p){return p.edges.flatMap(([a,b,w])=>p.directed?[[a,b,w]]:[[a,b,w],[b,a,w]]);}
function trace(p,mode){const env={x:p.initial};for(const line of p.trace){const m=/^(\w+)=(\w+)(?:\+(\d+))?$/.exec(line);if(!m||!(m[2] in env))throw Error('Invalid trace');const value=env[m[2]]+Number(m[3]||0);env[m[1]]=value;}return env.x;}
function guard(p){if(p.type==='montyHall'&&(!p.hostKnows||!p.hostAlwaysOpensGoat||!p.hostAlwaysOffersSwitch||p.doors<3))throw Error('Unsupported host protocol');if(p.type==='shortestPath'&&p.edges.some(e=>e[2]<0))throw Error('Nonnegative weights required');if(p.type==='minCoins'&&p.coins.some(c=>!Number.isInteger(c)||c<=0))throw Error('Positive integer coins required');}
function exhaustive(p){guard(p);switch(p.type){
case 'prime':if(p.n<2)return false;for(let d=2;d<p.n;d++)if(p.n%d===0)return false;return true;
case 'shortestPath':{const es=arcs(p);let best=Infinity;function visit(v,c,seen){if(v===p.end){best=Math.min(best,c);return;}for(const[a,b,w]of es)if(a===v&&!seen.has(b))visit(b,c+w,new Set([...seen,b]));}visit(p.start,0,new Set([p.start]));return best;}
case 'knapsack':{function rec(i,c){if(i===p.items.length)return 0;const t=p.items[i];return Math.max(rec(i+1,c),t.weight<=c?t.value+rec(i+1,c-t.weight):-Infinity);}return rec(0,p.capacity);}
case 'montyHall':{let wins=0;for(let prize=0;prize<p.doors;prize++)for(let pick=0;pick<p.doors;pick++)if(prize!==pick)wins++;return wins/(p.doors*p.doors);}
case 'entailment':{const r=rules(p),names=[...new Set(r.flat())],con=r.pop();for(let mask=0;mask<2**names.length;mask++){const has=n=>Math.floor(mask/2**names.indexOf(n))%2===1;if(r.every(([a,b])=>!has(a)||has(b))&&has(con[0])&&!has(con[1]))return false;}return true;}
case 'lostUpdate':return trace(p);
case 'factorialZeros':{let f=1n;for(let i=2;i<=p.n;i++)f*=BigInt(i);let n=0;while(f%10n===0n){n++;f/=10n;}return n;}
case 'minCoins':{let best=Infinity;function visit(i,left,count){if(left===0){best=Math.min(best,count);return;}if(i===p.coins.length||count>=best)return;const c=p.coins[i];for(let n=Math.floor(left/c);n>=0;n--)visit(i+1,left-n*c,count+n);}visit(0,p.target,0);return best;}
case 'divisibility':{const out=[];for(let n=p.min;n<=p.max;n++)if(p.divisibleBy.every(d=>n%d===0)&&n%p.notDivisibleBy!==0)out.push(n);return out;}
case 'twoDice':{let count=0;for(let a=1;a<=p.sides;a++)for(let b=1;b<=p.sides;b++)if(a+b===p.sum)count++;return count/p.sides**2;}
default:throw Error('Unknown problem type');}}
function structured(p){guard(p);switch(p.type){
case 'prime':if(p.n<2)return false;for(let d=2;d*d<=p.n;d++)if(p.n%d===0)return false;return true;
case 'shortestPath':{const d=Object.fromEntries(p.nodes.map(n=>[n,Infinity])),todo=new Set(p.nodes);d[p.start]=0;while(todo.size){const u=[...todo].reduce((a,b)=>d[a]<=d[b]?a:b);todo.delete(u);for(const[a,b,w]of arcs(p))if(a===u)d[b]=Math.min(d[b],d[a]+w);}return d[p.end];}
case 'knapsack':{const dp=Array(p.capacity+1).fill(0);for(const t of p.items)for(let c=p.capacity;c>=t.weight;c--)dp[c]=Math.max(dp[c],dp[c-t.weight]+t.value);return dp[p.capacity];}
case 'montyHall':return (p.doors-1)/p.doors;
case 'entailment':{const r=rules(p),[a,b]=r.pop(),seen=new Set([a]);let changed=true;while(changed){changed=false;for(const[x,y]of r)if(seen.has(x)&&!seen.has(y)){seen.add(y);changed=true;}}return seen.has(b);}
case 'lostUpdate':return trace(p);
case 'factorialZeros':{let count=0;for(let n=Math.floor(p.n/5);n>0;n=Math.floor(n/5))count+=n;return count;}
case 'minCoins':{const d=Array(p.target+1).fill(Infinity);d[0]=0;for(let n=1;n<=p.target;n++)for(const c of p.coins)if(c<=n)d[n]=Math.min(d[n],d[n-c]+1);return d[p.target];}
case 'divisibility':{const gcd=(a,b)=>b?gcd(b,a%b):a;const step=p.divisibleBy.reduce((a,b)=>a/gcd(a,b)*b,1),out=[];for(let n=Math.ceil(p.min/step)*step;n<=p.max;n+=step)if(n%p.notDivisibleBy)out.push(n);return out;}
case 'twoDice':return Math.max(0,Math.min(p.sides,p.sum-1)-Math.max(1,p.sum-p.sides)+1)/p.sides**2;
default:throw Error('Unknown problem type');}}
function falsification(p){guard(p);switch(p.type){
case 'prime':{if(p.n<2)return false;const composite=Array(p.n+1).fill(false);for(let i=2;i*i<=p.n;i++)if(!composite[i])for(let j=i*i;j<=p.n;j+=i)composite[j]=true;return !composite[p.n];}
case 'shortestPath':{const d=Object.fromEntries(p.nodes.map(n=>[n,Infinity]));d[p.start]=0;for(let i=1;i<p.nodes.length;i++)for(const[a,b,w]of arcs(p))if(d[b]>d[a]+w)d[b]=d[a]+w;return d[p.end];}
case 'knapsack':{let states=[[0,0]];for(const t of p.items){const next=states.map(([w,v])=>[w+t.weight,v+t.value]).filter(([w])=>w<=p.capacity);states=states.concat(next);}return Math.max(...states.map(s=>s[1]));}
case 'montyHall':{let stay=0;for(let prize=0;prize<p.doors;prize++)if(prize===0)stay++;return 1-stay/p.doors;}
case 'entailment':{const r=rules(p),[a,b]=r.pop(),forced=new Set([a]);for(let i=0;i<=r.length;i++)for(const[x,y]of r)if(forced.has(x))forced.add(y);return forced.has(b);}
case 'lostUpdate':{const versions={x:[p.initial]};for(const line of p.trace){const m=/^(\w+)=(\w+)(?:\+(\d+))?$/.exec(line);if(!m||!versions[m[2]])throw Error('Invalid trace');const v=versions[m[2]].at(-1)+Number(m[3]||0);(versions[m[1]]??=[]).push(v);}return versions.x.at(-1);}
case 'factorialZeros':{let twos=0,fives=0;for(let i=2;i<=p.n;i++){let a=i;while(a%2===0){twos++;a/=2;}a=i;while(a%5===0){fives++;a/=5;}}return Math.min(twos,fives);}
case 'minCoins':{let frontier=new Set([0]),seen=new Set([0]),depth=0;while(frontier.size){if(frontier.has(p.target))return depth;const next=new Set();for(const n of frontier)for(const c of p.coins)if(n+c<=p.target&&!seen.has(n+c)){seen.add(n+c);next.add(n+c);}frontier=next;depth++;}return Infinity;}
case 'divisibility':{const out=[];for(let n=p.min;n<=p.max;n++){let rejected=n%p.notDivisibleBy===0;for(const d of p.divisibleBy)if(n%d!==0)rejected=true;if(!rejected)out.push(n);}return out;}
case 'twoDice':{let rejected=0;for(let a=1;a<=p.sides;a++)for(let b=1;b<=p.sides;b++)if(a+b!==p.sum)rejected++;return 1-rejected/p.sides**2;}
default:throw Error('Unknown problem type');}}
module.exports={exhaustive,structured,falsification};
