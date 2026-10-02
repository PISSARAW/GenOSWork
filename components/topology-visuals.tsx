import type { ReactNode } from "react";

type Props = { family: string; variant: string; activeStep: number; stepCount: number };

function Label({ x, y, children, className = "diagram-label" }: { x: number; y: number; children: ReactNode; className?: string }) {
  return <text className={className} x={x} y={y}>{children}</text>;
}

function Node({ x, y, w = 130, h = 48, title, note, className = "diagram-node" }: { x: number; y: number; w?: number; h?: number; title: string; note?: string; className?: string }) {
  return <g className={className}><rect x={x} y={y} width={w} height={h} rx="5"/><text x={x + 12} y={y + 20} className="diagram-node-title">{title}</text>{note && <text x={x + 12} y={y + 36} className="diagram-node-note">{note}</text>}</g>;
}

function Link({ d, className = "diagram-link", markerEnd = true }: { d: string; className?: string; markerEnd?: boolean }) {
  return <path d={d} className={className} markerEnd={markerEnd ? "url(#diagram-arrow)" : undefined}/>;
}

function Trinity({ variant, activeStep }: Props) {
  const worlds = [
    { x: 48, name: "WORLD 01 · DIRECT", approach: "Minimum added assumptions" },
    { x: 280, name: "WORLD 02 · STRUCTURED", approach: "Plan from constraints" },
    { x: 512, name: "WORLD 03 · FALSIFICATION", approach: "Seek counterexamples" },
  ];
  const cues: Record<string, [string, string, string]> = {
    controlled: ["fixed strategy", "fixed strategy", "fixed strategy"],
    heterogeneous: ["strategy A · provider preferred", "strategy B · provider preferred", "strategy C · provider preferred"],
    adversarial: ["independent report", "independent report", "counterexample review"],
    counterfactual: ["baseline", "favorable change", "unfavorable change"],
    factorial: ["strategy × model cell", "isolated experiment cell", "strategy × tool cell"],
    pareto: ["quality · cost", "coverage · latency", "risk · robustness"],
    jury: ["sealed report", "sealed report", "sealed report"],
    recursive: ["parent result", "bounded subproblem", "parent result"],
    adaptive: ["continuation budget", "continuation budget", "continuation budget"],
    temporal: ["short horizon", "medium horizon", "long horizon"],
    oracular: ["prediction", "candidate result", "external verification"],
    exploratory: ["direct option", "structured option", "novel option"],
  };
  const labels = cues[variant] ?? cues.controlled;
  const isAdaptive = variant === "adaptive";
  const terminal = variant === "jury" ? "BLIND ADVISORY · GATE UNCHANGED" : variant === "pareto" ? "EVIDENCE BARRIER · NON-DOMINATED SET" : variant === "factorial" || variant === "recursive" || variant === "oracular" ? "RECOGNIZED · NOT LAUNCHABLE IN V1" : "COMPARATIVE EVIDENCE BARRIER";
  return <>
    <Node x={285} y={15} w={150} h={42} title="MISSION SNAPSHOT" note="same read-only start" className="diagram-node diagram-source"/>
    {worlds.map((world, index) => {
      const center = world.x + 98;
      const current = activeStep === 1 || activeStep === 2;
      return <g key={world.name} className={`diagram-world world-${index + 1} ${current ? "is-active" : ""}`}>
        <Link d={`M360 57 V75 H${center} V91`} className="diagram-link diagram-branch"/>
        <rect x={world.x} y="92" width="196" height="91" rx="7" className="diagram-world-frame"/>
        <Label x={world.x + 12} y={111} className="diagram-world-title">{world.name}</Label>
        <Label x={world.x + 12} y={132} className="diagram-world-copy">{world.approach}</Label>
        <rect x={world.x + 12} y="146" width="172" height="25" rx="3" className="diagram-world-artifact"/>
        <Label x={world.x + 20} y={163} className="diagram-world-cue">{labels[index]}</Label>
        <Label x={world.x + 13} y={198} className="diagram-micro">{variant === "heterogeneous" ? "strategy differs · provider not guaranteed" : "isolated workspace · sealed dossier"}</Label>
        {isAdaptive && <g className="diagram-budget"><rect x={world.x + 18} y="211" width="160" height="6" rx="3"/><rect x={world.x + 18} y="211" width={[72, 104, 54][index]} height="6" rx="3" className="diagram-budget-fill"/><Label x={world.x + 18} y={232} className="diagram-micro">all 3 continue · budget follows uncertainty</Label></g>}
      </g>;
    })}
    <Link d="M146 184 V252 H281"/><Link d="M378 184 V252"/><Link d="M610 184 V252 H479"/>
    <Node x={268} y={238} w={224} h={49} title={terminal} note={variant === "counterfactual" ? "compare conditional deltas" : "check evidence · constraints · provenance"} className="diagram-node diagram-gate"/>
    {variant === "jury" && <g><Link d="M492 261 H562" className="diagram-link diagram-advisory"/><Node x={562} y={239} w={140} h={45} title="BLIND JURY" note="after comparison" className="diagram-node diagram-advisory-node"/></g>}
    {variant === "oracular" && <g><Node x={36} y={239} w={176} h={45} title="ORACLE PREDICTION" note="score after verification" className="diagram-node diagram-advisory-node"/><Link d="M212 261 H268" className="diagram-link diagram-advisory"/></g>}
  </>;
}

function ATeam({ variant }: Props) {
  if (variant === "pipeline") return <>
    <Node x={24} y={138} w={112} title="INPUT" note="typed contract" className="diagram-node diagram-source"/>
    {[{x:160,t:"EXTRACT",n:"schema + bounded retry"},{x:340,t:"VERIFY",n:"accept / repair"},{x:520,t:"SYNTHESIZE",n:"validated output"}].map((item,i)=><g key={item.t}><Link d={`M${i ? item.x - 38 : 136} 162 H${item.x}`}/><Node x={item.x} y={132} w={142} title={item.t} note={item.n} className={i===2?"diagram-node diagram-gate":"diagram-node diagram-member"}/><Label x={item.x + 10} y={202} className="diagram-micro">{i < 2 ? `typed handoff ${i+1} → ${i+2}` : "integration barrier"}</Label></g>)}
  </>;
  if (variant === "relay_team") return <>
    <Label x={292} y={48} className="diagram-micro">ONE OWNER HOLDS CONTEXT AT A TIME</Label>
    {[{x:56,t:"SPECIALIST A",n:"context owner"},{x:250,t:"SPECIALIST B",n:"acknowledge package"},{x:444,t:"SPECIALIST C",n:"acknowledge package"},{x:638,t:"INTEGRATOR",n:"validated result"}].map((item,i)=><g key={item.t}><Node x={item.x} y={122} w={120} title={item.t} note={item.n} className={i===3?"diagram-node diagram-gate":"diagram-node diagram-member"}/>{i<3&&<><Link d={`M${item.x+120} 147 H${item.x+194}`} className="diagram-link diagram-context"/><Label x={item.x+128} y={181} className="diagram-micro">{i===0?"transfer + version":"ack / rollback"}</Label></>}</g>)}
    <Node x={278} y={225} w={204} h={40} title="CONTEXT HANDOFF RECORD" note="integrity · exclusive transfer" className="diagram-node diagram-source"/>
  </>;
  if (variant === "project_dag") return <>
    <Node x={304} y={18} w={152} title="WORK GRAPH" note="acyclic dependencies" className="diagram-node diagram-source"/>
    <Link d="M380 66 V91 H190 V116 M380 91 H570 V116"/>
    <Node x={100} y={116} w={180} title="DOCUMENTATION" note="READY · independent branch" className="diagram-node diagram-member"/>
    <Node x={480} y={116} w={180} title="TESTS" note="READY · independent branch" className="diagram-node diagram-member"/>
    <Link d="M190 164 V195 H380 V216 M570 164 V195 H380 V216"/>
    <Node x={290} y={216} w={180} title="BUILD / VALIDATE" note="waits for both outputs" className="diagram-node diagram-gate"/>
    <Link d="M380 264 V276"/><Label x={291} y={292} className="diagram-micro">failed branch blocks its consumers · independent work can continue</Label>
  </>;
  if (variant === "expert_committee") return <>
    <Node x={305} y={18} w={150} title="REVIEW QUESTION" note="shared evidence contract" className="diagram-node diagram-source"/>
    <Link d="M380 66 V94 H150 V117 M380 94 V117 M380 94 H610 V117"/>
    {[{x:70,t:"ARCHITECTURE",n:"independent report"},{x:310,t:"SECURITY",n:"independent report"},{x:550,t:"OPERATIONS",n:"independent report"}].map(item=><Node key={item.t} x={item.x} y={117} w={170} title={item.t} note={item.n} className="diagram-node diagram-member"/>)}
    <Link d="M155 165 V204 H380 M395 165 V204 M635 165 V204 H395"/><Node x={286} y={204} w={188} title="EVIDENCE QUORUM / VOTE" note="consensus is explicit" className="diagram-node diagram-gate"/>
    <Link d="M380 252 V267"/><Label x={323} y={287} className="diagram-micro">integrator assembles after specialist review</Label>
  </>;
  if (variant === "cross_functional_pod") return <>
    <circle cx="380" cy="160" r="87" className="diagram-pod-boundary"/><Label x={340} y={61} className="diagram-micro">CROSS-FUNCTIONAL POD</Label>
    <Node x={311} y={132} w={138} h={56} title="SHARED DELIVERABLE" note="one accountable owner" className="diagram-node diagram-gate"/>
    {[{x:96,y:91,t:"DESIGN",n:"consults build"},{x:534,y:91,t:"BUILD",n:"consults design"},{x:96,y:204,t:"TEST",n:"consults operations"},{x:534,y:204,t:"OPERATIONS",n:"continuous sync"}].map(item=><g key={item.t}><Link d={`M${item.x<300?226:534} ${item.y+22} L${item.x<300?311:449} 160`} className="diagram-link diagram-pod-link"/><Node x={item.x} y={item.y} w={130} title={item.t} note={item.n} className="diagram-node diagram-member"/></g>)}
    <Label x={306} y={276} className="diagram-micro">consultations + cadence are declared by the policy</Label>
  </>;
  if (variant === "boundary_spanner") return <>
    <Node x={40} y={120} w={160} title="DOMAIN A" note="source contract" className="diagram-node diagram-member"/>
    <Node x={300} y={104} w={160} h={80} title="BOUNDARY SPANNER" note="owns assigned interface" className="diagram-node diagram-gate"/>
    <Node x={560} y={120} w={160} title="DOMAIN B" note="consumer contract" className="diagram-node diagram-member"/>
    <Link d="M200 144 H300"/><Link d="M460 144 H560"/>
    <Node x={270} y={218} w={220} title="VERSIONED INTERFACE" note="translate only when required" className="diagram-node diagram-source"/>
    <Link d="M120 168 V239 H270" className="diagram-link diagram-context"/><Link d="M640 168 V239 H490" className="diagram-link diagram-context"/>
    <Label x={291} y={286} className="diagram-micro">validate schema · semantics · provenance at the boundary</Label>
  </>;
  if (variant === "matrix_team") return <>
    <Label x={82} y={52} className="diagram-micro">FUNCTIONAL AUTHORITY ↓</Label><Label x={455} y={52} className="diagram-micro">PRODUCT AXIS →</Label>
    <rect x="118" y="74" width="526" height="170" rx="4" className="diagram-matrix-frame"/>
    {[0,1,2].map(i=><g key={i}><line x1={118+i*175} y1="74" x2={118+i*175} y2="244" className="diagram-grid-line"/><line x1="118" y1={74+i*56} x2="644" y2={74+i*56} className="diagram-grid-line"/></g>)}
    {[{x:175,y:110,t:"PRODUCT A"},{x:350,y:110,t:"PRODUCT B"},{x:525,y:110,t:"PRODUCT C"},{x:175,y:166,t:"ENGINEERING"},{x:350,y:166,t:"DESIGN"},{x:525,y:166,t:"SECURITY"},{x:175,y:222,t:"CONSULT"},{x:350,y:222,t:"CONSULT"},{x:525,y:222,t:"CONSULT"}].map((item,i)=><Label key={`${item.x}-${item.y}`} x={item.x} y={item.y} className={i<3?"diagram-world-title":"diagram-node-note"}>{item.t}</Label>)}
    <Node x={278} y={258} w={204} h={40} title="DECISION-TYPE ROUTING" note="consult both authorities" className="diagram-node diagram-gate"/>
  </>;
  if (variant === "tiger_team") return <>
    <rect x="74" y="44" width="612" height="214" rx="8" className="diagram-mandate-boundary"/><Label x={94} y={64} className="diagram-micro">TIME-BOXED MANDATE · ALLOWED SCOPE · STOP AT EXPIRY</Label>
    <Node x={296} y={83} w={168} title="CRITICAL QUESTION" note="risk / vulnerability" className="diagram-node diagram-source"/>
    {[{x:118,t:"INVESTIGATE",n:"evidence"},{x:315,t:"REPRODUCE",n:"bounded probe"},{x:512,t:"RECOMMEND",n:"remediation"}].map((item,i)=><g key={item.t}><Link d={`M380 131 V157 H${item.x+75} V173`}/><Node x={item.x} y={173} w={150} title={item.t} note={item.n} className="diagram-node diagram-member"/>{i<2&&<Link d={`M${item.x+150} 197 H${item.x+197}`} className="diagram-link diagram-context"/>}</g>)}
    <Label x={258} y={284} className="diagram-micro">out-of-scope action rejected · mandate expiry stops the team</Label>
  </>;
  if (variant === "incident_command") return <>
    <Node x={300} y={30} w={160} h={48} title="INCIDENT COMMAND" note="objectives · period" className="diagram-node diagram-gate"/>
    <Link d="M380 78 V111 H150 V133 M380 111 V133 M380 111 H610 V133"/>
    {[{x:70,t:"OPERATIONS",n:"response actions"},{x:310,t:"PLANNING",n:"SITREP · next period"},{x:550,t:"LOGISTICS",n:"resources"}].map(item=><Node key={item.t} x={item.x} y={133} w={170} title={item.t} note={item.n} className="diagram-node diagram-member"/>)}
    <Node x={310} y={218} w={140} title="SAFETY" note="constraints" className="diagram-node diagram-advisory-node"/>
    <Link d="M155 181 V198 H310 M395 181 V218 M635 181 V198 H450" className="diagram-link diagram-context"/>
    <Label x={270} y={282} className="diagram-micro">explicit coordination roles · automatic cadence is not started here</Label>
  </>;
  if (variant === "multiteam") return <>
    <Node x={300} y={20} w={160} title="PROGRAM GRAPH" note="explicit subteam contracts" className="diagram-node diagram-source"/>
    <Link d="M380 68 V91 H165 V116 M380 91 H595 V116"/>
    <Node x={80} y={116} w={170} title="TEAM A" note="contract + budget" className="diagram-node diagram-member"/>
    <Node x={510} y={116} w={170} title="TEAM B" note="contract + budget" className="diagram-node diagram-member"/>
    <Link d="M165 164 V189 H380 V210 M595 164 V189 H380 V210" className="diagram-link diagram-context"/>
    <Node x={300} y={210} w={160} title="TEAM C" note="waits for both proofs" className="diagram-node diagram-gate"/>
    <Label x={258} y={281} className="diagram-micro">subteam runner needs a verified executeTeam adapter</Label>
  </>;
  if (variant === "adaptive") return <>
    <Node x={34} y={133} w={132} title="ASSESS NEEDS" note="capability gaps" className="diagram-node diagram-source"/>
    {[{x:205,t:"PHASE 1",n:"current staffing"},{x:390,t:"PHASE 2",n:"revised roles"}].map((item,i)=><g key={item.t}><Link d={`M${i?337:166} 157 H${item.x}`}/><Node x={item.x} y={133} w={132} title={item.t} note={item.n} className="diagram-node diagram-member"/></g>)}
    <Link d="M522 157 H574"/><Node x={574} y={133} w={152} title="STAFFING PROPOSAL" note="evidence · budget · stability" className="diagram-node diagram-gate"/>
    <Label x={233} y={222} className="diagram-micro">phase policy is explicit · reassignment is proposed and gated</Label>
  </>;
  return <>
    <Node x={305} y={18} w={150} title="MISSION REQUIREMENTS" note="multiple skills · one deliverable" className="diagram-node diagram-source"/>
    <Link d="M380 66 V100 H150 V128 M380 100 V128 M380 100 H610 V128"/>
    {[{x:70,t:"SPECIALIST A",n:"verified domain"},{x:310,t:"SPECIALIST B",n:"verified domain"},{x:550,t:"INTEGRATOR",n:"artifact owner"}].map(item=><Node key={item.t} x={item.x} y={128} w={170} title={item.t} note={item.n} className="diagram-node diagram-member"/>)}
    <Link d="M155 176 V218 H380 M395 176 V218 M635 176 V218 H395"/><Node x={290} y={218} w={180} title="HANDOFF + PROOF GATE" note="integration after acceptance" className="diagram-node diagram-gate"/>
    <Label x={264} y={281} className="diagram-micro">complementary contributions · no specialist winner selection</Label>
  </>;
}

function Biocenose({ variant }: Props) {
  const center = variant.includes("jury") || variant.includes("community") ? "EVIDENCE AGGREGATE" : variant.includes("delphi") ? "ANONYMOUS MEDIAN" : variant.includes("forecast") ? "CALIBRATED FORECAST" : "COMMUNITY DECISION";
  return <>
    <circle cx="380" cy="157" r="70" className="diagram-community-boundary"/><Label x={324} y={78} className="diagram-micro">COMMUNITY · ROLES / QUORUM</Label>
    {[
      {x:92,y:102,t:"EXPERT A",n:"claim + evidence"},{x:538,y:102,t:"EXPERT B",n:"review / attack"},
      {x:92,y:200,t:"EXPERT C",n:"independent view"},{x:538,y:200,t:"EXPERT D",n:"minority / dissent"},
    ].map(item=><g key={item.t}><Link d={`M${item.x < 300 ? 222 : 538} ${item.y + 22} L${item.x < 300 ? 313 : 447} 157`} className="diagram-link diagram-community-link"/><Node x={item.x} y={item.y} w={130} h={45} title={item.t} note={item.n} className="diagram-node diagram-member"/></g>)}
    <circle cx="380" cy="157" r="44" className="diagram-aggregate"/><Label x={332} y={153} className="diagram-node-title">{center}</Label><Label x={348} y={171} className="diagram-node-note">explicit ballots</Label>
    <Node x={280} y={259} w={200} h={36} title={variant.includes("adversarial") ? "COUNTEREXAMPLE CAN VETO" : "PRESERVE DISSENT"} className="diagram-node diagram-gate"/>
  </>;
}

function Holobionte({ variant }: Props) {
  const local = variant.includes("local") || variant.includes("edge");
  return <>
    <circle cx="380" cy="158" r="105" className="diagram-host-boundary"/><Label x={340} y={43} className="diagram-micro">{local ? "LOCAL / EDGE BOUNDARY" : "CAPABILITY CONTRACT BOUNDARY"}</Label>
    <circle cx="380" cy="158" r="55" className="diagram-host-core"/><Label x={350} y={153} className="diagram-node-title">{variant === "organelle" ? "HOST CORE" : "HOST"}</Label><Label x={344} y={173} className="diagram-node-note">identity · lifecycle</Label>
    {[
      {x:242,y:75,t:"SYMBIONT A",n:"capability"},{x:426,y:75,t:"SYMBIONT B",n:"specialist"},
      {x:238,y:197,t:"SYMBIONT C",n:variant.includes("immune") ? "independent verifier" : "contracted skill"},{x:430,y:197,t:"SYMBIONT D",n:variant.includes("memory") ? "provenance memory" : "bounded resource"},
    ].map(item=><g key={item.t}><Link d={`M380 158 L${item.x + 58} ${item.y + 23}`} className="diagram-link diagram-symbiosis"/><Node x={item.x} y={item.y} w={116} h={46} title={item.t} note={item.n} className="diagram-node diagram-symbiont"/></g>)}
    <Node x={275} y={270} w={210} h={34} title={variant.includes("immune") ? "VETO / THREAT CHECK" : "ADMIT · TRIAL · VERIFY"} className="diagram-node diagram-gate"/>
  </>;
}

function Syncytium({ variant }: Props) {
  const local = variant.toLowerCase().includes("local");
  return <>
    <Node x={278} y={118} w={204} h={92} title={variant === "blackboard" ? "SHARED BLACKBOARD" : "SHARED STATE"} note={variant === "epistemic" ? "facts + provenance" : "versioned snapshot · invariant"} className="diagram-node diagram-shared-state"/>
    {[{x:61,y:48,t:"AGENT A"},{x:569,y:48,t:"AGENT B"},{x:61,y:225,t:"AGENT C"},{x:569,y:225,t:"AGENT D"}].map((item,i)=><g key={item.t}><Node x={item.x} y={item.y} w={130} title={item.t} note={i === 0 && local ? "local replica" : "subscriber"} className="diagram-node diagram-member"/><Link d={`M${item.x < 300 ? 191 : 569} ${item.y + 24} ${item.x < 300 ? "H240" : "H520"} V164 ${item.x < 300 ? "H278" : "H482"}`} className={local && i < 2 ? "diagram-link diagram-replica-queued" : "diagram-link diagram-replica"}/></g>)}
    <Label x={286} y={231} className="diagram-micro">{local ? "partition → queue → reconcile" : "delta → selective replication → reconcile"}</Label>
    <Node x={280} y={268} w={200} h={36} title="INVARIANT / CONFLICT CHECK" className="diagram-node diagram-gate"/>
  </>;
}

function Rhizome({ variant }: Props) {
  const nodes = [{x:130,y:80,t:"CAPABILITY A"},{x:350,y:38,t:"MEMBER B"},{x:550,y:92,t:"CAPABILITY C"},{x:96,y:214,t:"MEMBER D"},{x:337,y:204,t:"NEED / MATCH"},{x:568,y:221,t:"MEMBER E"}];
  return <>
    <Link d="M255 104 L350 65 M467 65 L550 104 M195 126 L150 214 M235 236 L337 227 M467 227 L568 244 M195 104 L337 218 M467 65 L409 204" className="diagram-link diagram-rhizome-link" markerEnd={false}/>
    {nodes.map((item,i)=><Node key={item.t} x={item.x} y={item.y} w={130} title={item.t} note={i === 4 ? "direct member selection" : "capability · trace"} className={`diagram-node ${i === 4 ? "diagram-gate" : "diagram-member"}`}/>)}
    <Label x={271} y={121} className="diagram-micro">stigmergic trace · revisioned event</Label>
    <Label x={340} y={287} className="diagram-micro">{variant === "growth" ? "growth proposal · explicit audited mutation" : "selection from composed members · local relationships"}</Label>
  </>;
}

function Metapopulation({ variant }: Props) {
  const patches = [{x:79,y:95,t:"PATCH A",n:"local deme"},{x:280,y:50,t:"PATCH B",n:"source"},{x:500,y:93,t:"PATCH C",n:"local deme"},{x:180,y:214,t:"PATCH D",n:"refuge"},{x:410,y:214,t:"PATCH E",n:"sink"}];
  return <>
    <Link d="M199 119 L280 82 M410 82 L500 118 M147 143 L216 214 M346 82 L250 214 M410 82 L464 214 M310 238 H410" className={`diagram-link ${variant === "federated" ? "diagram-federated-link" : "diagram-corridor"}`} markerEnd={false}/>
    {patches.map((item,i)=><g key={item.t} className="diagram-patch"><circle cx={item.x + 63} cy={item.y + 30} r="57"/><Node x={item.x} y={item.y} w={126} h={54} title={item.t} note={item.n} className={`diagram-node ${i === 1 ? "diagram-source" : "diagram-member"}`}/></g>)}
    <Label x={275} y={294} className="diagram-micro">{variant === "federated" ? "sovereign regions · attested results cross boundary" : variant === "anti_synchrony" ? "circuit breakers · limit contagion" : "local work · weighted quorum · recovery corridors"}</Label>
  </>;
}

function Biome({ variant }: Props) {
  const scales = variant === "multi_scale";
  return <>
    <Node x={293} y={15} w={174} title="MISSION RESOURCES" note={variant === "compute" ? "CPU · GPU · quota" : "budget · evidence · signals"} className="diagram-node diagram-source"/>
    <Link d="M380 63 V89 H150 V111 M380 89 V111 M380 89 H610 V111" className="diagram-link diagram-resource-flow"/>
    {[{x:68,t:variant === "exploration" ? "UNKNOWN PATCH" : "NICHE A",n:"observe / forage"},{x:310,t:variant === "quality_diversity" ? "NICHE B · ELITE" : "NICHE B",n:"specialist population"},{x:550,t:variant === "adversarial" ? "CHALLENGE NICHE" : "NICHE C",n:"verify / recover"}].map((item,i)=><g key={item.t}><ellipse cx={item.x + 80} cy="171" rx="82" ry="54" className={`diagram-niche niche-${i+1}`}/><Node x={item.x} y={139} w={160} title={item.t} note={item.n} className="diagram-node diagram-member"/><rect x={item.x + 17} y="204" width={[85,54,104][i]} height="6" rx="3" className="diagram-budget-fill"/></g>)}
    {scales && <g><Link d="M150 220 V253 H380 M390 220 V253 M610 220 V253 H380" className="diagram-link"/><Node x={292} y={253} w={176} title="ECOSYSTEM SUMMARY" note="constraints propagate down" className="diagram-node diagram-gate"/></g>}
    {!scales && <Label x={274} y={271} className="diagram-micro">{variant === "resilience" ? "reserve → refuge → recolonization" : variant === "successional" ? "pioneer → evidence gate → specialist → stabilizer" : "allocate within budget · verify yield"}</Label>}
  </>;
}

const drawings: Record<string, (props: Props) => ReactNode> = {
  trinity: (props) => <Trinity {...props}/>,
  "a-team": (props) => <ATeam {...props}/>,
  biocenose: (props) => <Biocenose {...props}/>,
  holobionte: (props) => <Holobionte {...props}/>,
  syncytium: (props) => <Syncytium {...props}/>,
  rhizome: (props) => <Rhizome {...props}/>,
  metapopulation: (props) => <Metapopulation {...props}/>,
  biome: (props) => <Biome {...props}/>,
};

export function TopologyDiagram({ family, variant, activeStep, stepCount }: Props) {
  const draw = drawings[family] ?? drawings.trinity;
  return <svg className={`topology-sim-svg topology-diagram topology-diagram-${family}`} data-variant={variant} viewBox="0 0 760 320" role="img" aria-label={`${family} topology structure, ${variant} variant, stage ${activeStep + 1} of ${stepCount}`}>
    <defs><marker id="diagram-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" className="diagram-arrowhead"/></marker></defs>
    {draw({ family, variant, activeStep, stepCount })}
    <g className="diagram-stage"><rect x="18" y="299" width="724" height="1"/><text x="22" y="316">POLICY STAGE {String(activeStep + 1).padStart(2, "0")} / {String(stepCount).padStart(2, "0")}</text><text x="738" y="316" textAnchor="end">{variant.replaceAll("_", " ").replaceAll("-", " ").toUpperCase()}</text></g>
  </svg>;
}
