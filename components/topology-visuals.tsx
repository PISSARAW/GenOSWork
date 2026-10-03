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
  if (variant === "delphi_community") return <>
    <Label x={72} y={47} className="diagram-micro">PRIVATE · ANONYMOUS · CONTROLLED FEEDBACK</Label>
    {[{x:70,t:"ROUND 0",n:"private estimates"},{x:300,t:"ROUND 1",n:"anonymous aggregate"},{x:530,t:"ROUND 2+",n:"reconsider / stability"}].map((item,i)=><g key={item.t}><Node x={item.x} y={88} w={160} title={item.t} note={item.n} className="diagram-node diagram-member"/><g className="diagram-anon-cloud"><circle cx={item.x+30} cy="168" r="10"/><circle cx={item.x+55} cy="168" r="10"/><circle cx={item.x+80} cy="168" r="10"/><circle cx={item.x+105} cy="168" r="10"/><circle cx={item.x+130} cy="168" r="10"/></g>{i<2&&<Link d={`M${item.x+160} 111 H${item.x+230}`} className="diagram-link diagram-round-link"/>}</g>)}
    <Node x={275} y={215} w={210} h={43} title="SPREAD / IQR" note="convergence is not required" className="diagram-node diagram-gate"/>
    <Label x={254} y={285} className="diagram-micro">stop: spread threshold · max rounds · budget exhausted</Label>
  </>;
  if (variant === "adversarial_assembly") return <>
    <Node x={303} y={20} w={154} title="SEALED CLAIMS" note="reveal after commitment" className="diagram-node diagram-source"/>
    <Node x={70} y={108} w={178} title="RED REVIEWERS" note="attack · counterexample" className="diagram-node diagram-adversary"/>
    <Node x={512} y={108} w={178} title="BLUE DEFENDERS" note="respond with evidence" className="diagram-node diagram-defender"/>
    <Node x={303} y={104} w={154} h={46} title="CLAIM / ARGUMENT" note="shared review target" className="diagram-node diagram-source"/>
    <Link d="M380 62 V104" className="diagram-link diagram-community-link"/><Link d="M248 132 H303" className="diagram-link diagram-attack"/><Link d="M457 132 H512" className="diagram-link diagram-defend"/>
    <Node x={292} y={194} w={176} title="NEUTRAL VERIFIER" note="check evidence / refutation" className="diagram-node diagram-gate"/>
    <Link d="M159 156 L330 194" className="diagram-link diagram-attack"/><Link d="M601 156 L430 194" className="diagram-link diagram-defend"/>
    <Label x={251} y={276} className="diagram-micro">persuasion is not authority · verified counterexample can block</Label>
  </>;
  if (variant === "forecasting_crowd") return <>
    <Node x={300} y={18} w={160} title="QUESTION / EVENT" note="outcome unresolved" className="diagram-node diagram-source"/>
    {[0,1,2,3,4].map(i=><g key={i}><circle cx={108+i*136} cy="115" r="20" className="diagram-forecaster"/><Label x={92+i*136} y={119} className="diagram-node-title">F{i+1}</Label><Label x={87+i*136} y={154} className="diagram-micro">p={([".2", ".4", ".5", ".7", ".8"])[i]}</Label><Link d={`M${108+i*136} 135 V184 H380`} className="diagram-link diagram-forecast-link" markerEnd={false}/></g>)}
    <Node x={280} y={185} w={200} title="WEIGHTED AGGREGATE" note="calibration + independence" className="diagram-node diagram-gate"/>
    <Link d="M380 233 V255"/><Node x={300} y={255} w={160} h={38} title="RESOLVED OUTCOME" note="external ground truth" className="diagram-node diagram-source"/>
    <Label x={513} y={277} className="diagram-micro">Brier score after resolution</Label>
  </>;
  if (variant === "argumentation_community") return <>
    <Label x={276} y={43} className="diagram-micro">CLAIMS + SOURCED RELATIONS · PERSISTENT GRAPH</Label>
    <Link d="M207 113 L332 82 M419 82 L540 119 M190 146 L250 221 M390 100 L354 214 M495 146 L412 221" className="diagram-link diagram-argument-edge" markerEnd={true}/>
    <Node x={90} y={96} w={120} title="CLAIM A" note="source ref" className="diagram-node diagram-member"/>
    <Node x={330} y={57} w={120} title="CLAIM B" note="source ref" className="diagram-node diagram-member"/>
    <Node x={540} y={96} w={120} title="CLAIM C" note="counterclaim" className="diagram-node diagram-member"/>
    <Node x={190} y={214} w={124} title="CLAIM D" note="qualifies A" className="diagram-node diagram-member"/>
    <Node x={412} y={214} w={124} title="CLAIM E" note="refutes C" className="diagram-node diagram-member"/>
    <Label x={260} y={108} className="diagram-edge-label">SUPPORT</Label><Label x={471} y={108} className="diagram-edge-label">ATTACK</Label><Label x={436} y={191} className="diagram-edge-label">REFUTE</Label>
    <Label x={277} y={286} className="diagram-micro">graph records relations · it does not prove logical validity</Label>
  </>;
  if (variant === "polycentric_council") return <>
    {[{x:80,t:"LOCAL COUNCIL A",n:"local views + dissent"},{x:300,t:"LOCAL COUNCIL B",n:"local views + dissent"},{x:520,t:"LOCAL COUNCIL C",n:"local views + dissent"}].map((item,i)=><g key={item.t}><circle cx={item.x+80} cy="137" r="72" className="diagram-council-boundary"/><Node x={item.x} y={111} w={160} title={item.t} note={item.n} className="diagram-node diagram-member"/><Link d={`M${item.x+80} 183 V221 H380 V246`} className="diagram-link diagram-council-link"/></g>)}
    <Node x={282} y={246} w={196} h={42} title="CENTRAL COUNCIL" note="aggregate without erasing dissent" className="diagram-node diagram-gate"/>
  </>;
  if (variant === "byzantine_resilient_community") return <>
    <rect x="255" y="59" width="250" height="154" rx="8" className="diagram-trust-boundary"/><Label x={303} y={52} className="diagram-micro">TRUST BOUNDARY · QUARANTINE IS AUDITED</Label>
    <Node x={38} y={100} w={152} title="MEMBER SIGNALS" note="provenance required" className="diagram-node diagram-adversary"/>
    <Link d="M190 124 H255" className="diagram-link diagram-attack"/><Node x={278} y={88} w={204} title="FILTER / ROUTE" note="exclude quarantined ids" className="diagram-node diagram-source"/>
    <Link d="M380 136 V163"/><Node x={280} y={163} w={200} title="EVIDENCE VERIFIER" note="no receipt → unverified" className="diagram-node diagram-gate"/>
    <Link d="M482 124 H553" className="diagram-link diagram-council-link"/><Node x={553} y={100} w={168} title="ACTIVE COMMUNITY" note="review verified evidence" className="diagram-node diagram-member"/>
    <Node x={83} y={224} w={164} h={40} title="QUARANTINE" note="reversible · auditable" className="diagram-node diagram-advisory-node"/>
    <Label x={286} y={280} className="diagram-micro">resilience tools exist · no Byzantine fault-tolerance guarantee</Label>
  </>;
  if (variant === "minority_preserving_jury") return <>
    <Node x={303} y={18} w={154} title="CRITICAL CLAIM" note="evidence + risk" className="diagram-node diagram-source"/>
    {[0,1,2].map(i=><g key={i}><Node x={78+i*230} y={95} w={150} title={`JUROR ${i+1}`} note={i===2?"minority view":"independent ballot"} className="diagram-node diagram-member"/><Link d={`M${153+i*230} 143 L${380} 178`} className="diagram-link diagram-community-link"/></g>)}
    <Node x={285} y={174} w={190} title="COMMUNITY JUDGMENT" note="consensus · uncertainty" className="diagram-node diagram-gate"/>
    <Link d="M360 222 V250 H188" className="diagram-link diagram-dissent-link"/><Node x={70} y={250} w={178} h={39} title="DISSENT LEDGER" note="append-only" className="diagram-node diagram-advisory-node"/>
    <Link d="M400 222 V250 H568" className="diagram-link diagram-attack"/><Node x={510} y={250} w={190} h={39} title="VERIFIED MINORITY VETO" note="can block promotion" className="diagram-node diagram-adversary"/>
  </>;
  if (variant === "representative_community") return <>
    <Node x={40} y={123} w={170} title="POPULATION" note="perspectives / domains" className="diagram-node diagram-source"/>
    <Link d="M210 147 H280"/><Node x={280} y={97} w={200} h={100} title="PANEL SAMPLE" note="representative design · partial" className="diagram-node diagram-gate"/>
    {[0,1,2].map(i=><g key={i}><circle cx={320+i*62} cy="169" r="7" className="diagram-sample-dot"/></g>)}
    <Link d="M480 147 H550"/><Node x={550} y={123} w={170} title="DISTRIBUTION" note="weights + minorities" className="diagram-node diagram-member"/>
    <Label x={286} y={244} className="diagram-micro">do not turn panel summary into a unanimous vote</Label>
    <Label x={305} y={267} className="diagram-micro">runtime does not yet implement representative sampling</Label>
  </>;
  if (variant === "persistent_community") return <>
    <Node x={54} y={93} w={170} title="PRIOR SESSIONS" note="history · partial" className="diagram-node diagram-source"/>
    <Link d="M224 117 H285"/><Node x={285} y={86} w={190} h={74} title="CURRENT ROUND" note="claims · review · judgment" className="diagram-node diagram-member"/>
    <Link d="M475 117 H536"/><Node x={536} y={93} w={170} title="APPEND-ONLY RECORD" note="belief revisions" className="diagram-node diagram-gate"/>
    <Link d="M620 141 V205 H140 V141" className="diagram-link diagram-round-link"/>
    <Node x={260} y={220} w={240} h={46} title="DISSENT + CALIBRATION HISTORY" note="inter-mission reputation partial" className="diagram-node diagram-advisory-node"/>
    <Label x={285} y={291} className="diagram-micro">session history persists · full reputation lifecycle is not implemented</Label>
  </>;
  if (variant === "human_ai_deliberation") return <>
    <Label x={279} y={50} className="diagram-micro">ATTRIBUTED COMMITMENTS · HUMAN JUDGMENT REQUIRED</Label>
    <Node x={83} y={107} w={170} title="AI REVIEWERS" note="evidence + alternatives" className="diagram-node diagram-member"/>
    <Node x={507} y={107} w={170} title="AI REVIEWERS" note="dissent + uncertainty" className="diagram-node diagram-member"/>
    <Node x={290} y={181} w={180} title="JOINT REVIEW" note="keep views attributed" className="diagram-node diagram-source"/>
    <Link d="M253 131 L320 181"/><Link d="M507 131 L440 181"/>
    <Link d="M380 229 V250" className="diagram-link diagram-dissent-link"/><Node x={291} y={250} w={178} h={40} title="HUMAN DECISION" note="normative authority" className="diagram-node diagram-gate"/>
  </>;
  if (variant === "hybrid_oracle_community") return <>
    <Node x={301} y={20} w={158} title="COMMUNITY CLAIMS" note="propose · discuss · cite" className="diagram-node diagram-source"/>
    <Link d="M340 68 V104 H175 V131 M420 68 V104 H585 V131"/>
    <Node x={82} y={131} w={186} title="DETERMINISTIC CHECK" note="tests · proof · oracle" className="diagram-node diagram-gate"/>
    <Node x={492} y={131} w={186} title="COMMUNITY REVIEW" note="context · limitations" className="diagram-node diagram-member"/>
    <Link d="M175 179 V215 H380 M585 179 V215 H380"/><Node x={286} y={215} w={188} title="EVIDENCE-FIRST RESULT" note="failed check can block" className="diagram-node diagram-gate"/>
    <Label x={260} y={281} className="diagram-micro">facts remain unverified when no eligible verifier is supplied</Label>
  </>;
  return <>
    <Node x={303} y={18} w={154} title="SHARED CLAIM + EVIDENCE" note="independent sealed judgments" className="diagram-node diagram-source"/>
    {[{x:75,t:"JUDGE A",n:"expert profile"},{x:305,t:"JUDGE B",n:"expert profile"},{x:535,t:"JUDGE C",n:"expert profile"}].map(item=><g key={item.t}><Link d={`M380 66 V91 H${item.x+75} V117`} className="diagram-link diagram-community-link"/><Node x={item.x} y={117} w={150} title={item.t} note={item.n} className="diagram-node diagram-member"/><Label x={item.x+8} y={184} className="diagram-micro">sealed commitment</Label></g>)}
    <Link d="M150 165 V215 H380 M380 165 V215 M610 165 V215 H380"/><Node x={278} y={215} w={204} h={42} title="REVEAL → EVIDENCE REVIEW" note="after all active commitments" className="diagram-node diagram-gate"/>
    <Label x={286} y={284} className="diagram-micro">independent verdicts · explicit evidence · no direct confrontation</Label>
  </>;
}

function Holobionte({ variant }: Props) {
  if (variant === "organelle") return <>
    <circle cx="380" cy="156" r="116" className="diagram-host-boundary diagram-core-ring"/><Label x={310} y={31} className="diagram-micro">CORE CAPABILITIES · HOST AUTHORITY</Label>
    <circle cx="380" cy="156" r="47" className="diagram-host-core"/><Label x={350} y={153} className="diagram-node-title">HOST CORE</Label><Label x={342} y={173} className="diagram-node-note">identity · invariants</Label>
    {[{x:260,y:73,t:"MEMORY",n:"lineage"},{x:426,y:73,t:"SPECIALIST",n:"core capability"},{x:260,y:193,t:"IMMUNE",n:"validation"},{x:426,y:193,t:"SPECIALIST",n:"core capability"}].map(item=><g key={`${item.t}-${item.x}-${item.y}`}><Link d={`M380 156 L${item.x+56} ${item.y+23}`} className="diagram-link diagram-symbiosis"/><Node x={item.x} y={item.y} w={112} title={item.t} note={item.n} className="diagram-node diagram-symbiont"/></g>)}
    <Label x={255} y={285} className="diagram-micro">concept: deeply integrated residents · any core replacement needs host approval</Label>
  </>;
  if (variant === "adaptive-microbiome") return <>
    <Node x={28} y={127} w={142} title="CAPABILITY GAP" note="mission need changes" className="diagram-node diagram-source"/>
    <Link d="M170 151 H208"/><Node x={208} y={98} w={150} title="CANDIDATE" note="contract + evidence" className="diagram-node diagram-symbiont"/>
    <Link d="M358 122 H395"/><Node x={395} y={98} w={150} title="BOUNDED TRIAL" note="contribution measured" className="diagram-node diagram-member"/>
    <Link d="M545 122 H582"/><Node x={582} y={98} w={150} title="RESIDENT" note="host-approved" className="diagram-node diagram-gate"/>
    <Node x={278} y={194} w={204} title="SUCCESSION / REASSIGNMENT" note="plan + evidence · partial" className="diagram-node diagram-advisory-node"/>
    <Link d="M470 146 V194" className="diagram-link diagram-context"/><Label x={275} y={274} className="diagram-micro">adaptive acquisition and replacement are not automatic in every path</Label>
  </>;
  if (variant === "immune-critical") return <>
    <Node x={303} y={18} w={154} title="SYMBIONT OUTPUT" note="declared threat model" className="diagram-node diagram-source"/>
    <Link d="M380 60 V86 H175 V111 M380 86 V111 M380 86 H585 V111"/>
    <Node x={82} y={111} w={186} title="THREAT SCREEN" note="unknown signal → hold" className="diagram-node diagram-adversary"/>
    <Node x={287} y={111} w={186} title="INDEPENDENT REVIEWER" note="verify claim / evidence" className="diagram-node diagram-gate"/>
    <Node x={492} y={111} w={186} title="HOST VETO" note="approve · refine · reject" className="diagram-node diagram-gate"/>
    <Link d="M175 159 V199 H380 M380 159 V199 M585 159 V199 H380" className="diagram-link diagram-immune-link"/><Node x={286} y={199} w={188} title="CONTROLLED RESULT" note="human escalation if critical" className="diagram-node diagram-gate"/>
    <Label x={280} y={280} className="diagram-micro">immune functions are primitives · no universal immune loop is guaranteed</Label>
  </>;
  if (variant === "local-first") return <>
    <rect x="44" y="42" width="506" height="218" rx="12" className="diagram-local-boundary"/><Label x={67} y={65} className="diagram-micro">LOCAL TRUST / DATA BOUNDARY</Label>
    <circle cx="288" cy="157" r="44" className="diagram-host-core"/><Label x={258} y={154} className="diagram-node-title">LOCAL HOST</Label><Label x={258} y={174} className="diagram-node-note">authority + budget</Label>
    <Node x={82} y={118} w={135} title="LOCAL SPECIALIST" note="local executor" className="diagram-node diagram-symbiont"/><Node x={361} y={118} w={150} title="LOCAL MEMORY" note="provenance kept local" className="diagram-node diagram-symbiont"/>
    <Link d="M217 142 L246 157 M332 157 L361 142" className="diagram-link diagram-symbiosis"/>
    <Node x={588} y={120} w={152} title="REMOTE EGRESS" note="restricted by policy" className="diagram-node diagram-advisory-node"/><Link d="M550 157 H588" className="diagram-link diagram-attack"/>
    <Label x={83} y={239} className="diagram-micro">placement depends on an available local executor · not guaranteed</Label>
  </>;
  if (variant === "regenerative") return <>
    <Node x={36} y={125} w={150} title="HEALTH SIGNAL" note="resident lost / degraded" className="diagram-node diagram-source"/>
    <Link d="M186 149 H227"/><Node x={227} y={125} w={150} title="RECOVERY RESERVE" note="budget + fallback" className="diagram-node diagram-member"/>
    <Link d="M377 149 H418"/><Node x={418} y={125} w={150} title="RESTORE PLAN" note="candidate succession" className="diagram-node diagram-advisory-node"/>
    <Link d="M568 149 H605"/><Node x={605} y={125} w={132} title="HOST GATE" note="evidence required" className="diagram-node diagram-gate"/>
    <Label x={259} y={225} className="diagram-micro">verify restoration evidence and compatibility before a transition</Label>
    <Label x={312} y={253} className="diagram-micro">recovery is proposed · no automatic repair</Label>
  </>;
  if (variant === "cloud-core/edge-symbionts") return <>
    <rect x="38" y="46" width="286" height="204" rx="10" className="diagram-cloud-boundary"/><Label x={73} y={68} className="diagram-micro">CLOUD CONTROL PLANE</Label>
    <circle cx="180" cy="146" r="48" className="diagram-host-core"/><Label x={150} y={143} className="diagram-node-title">CLOUD HOST</Label><Label x={150} y={163} className="diagram-node-note">policy · coordination</Label>
    <rect x="408" y="46" width="310" height="204" rx="10" className="diagram-edge-boundary"/><Label x={505} y={68} className="diagram-micro">EDGE EXECUTION ZONE</Label>
    <Node x={445} y={100} w={112} title="EDGE A" note="near data" className="diagram-node diagram-symbiont"/><Node x={578} y={100} w={112} title="EDGE B" note="local capability" className="diagram-node diagram-symbiont"/>
    <Link d="M228 146 H335 V123 H445 M335 123 H578" className="diagram-link diagram-context"/><Node x={449} y={180} w={228} title="LEASE + PROVENANCE" note="adapter required for execution" className="diagram-node diagram-gate"/>
    <Label x={197} y={282} className="diagram-micro">placement is a policy concept · edge execution requires a supplied adapter</Label>
  </>;
  if (variant === "edge-core/cloud-symbionts") return <>
    <rect x="38" y="46" width="286" height="204" rx="10" className="diagram-edge-boundary"/><Label x={86} y={68} className="diagram-micro">LOCAL / EDGE TRUST ZONE</Label>
    <circle cx="180" cy="146" r="48" className="diagram-host-core"/><Label x={150} y={143} className="diagram-node-title">EDGE HOST</Label><Label x={150} y={163} className="diagram-node-note">local authority</Label>
    <rect x="408" y="46" width="310" height="204" rx="10" className="diagram-cloud-boundary"/><Label x={510} y={68} className="diagram-micro">CLOUD CAPABILITIES</Label>
    <Node x={448} y={112} w={112} title="CLOUD A" note="proxy capability" className="diagram-node diagram-symbiont"/><Node x={578} y={112} w={112} title="CLOUD B" note="proxy capability" className="diagram-node diagram-symbiont"/>
    <Node x={442} y={184} w={236} title="REDACT · MINIMIZE · PROXY" note="no peripheral inheritance" className="diagram-node diagram-gate"/><Link d="M228 146 H352 V139 H448 M352 139 H578" className="diagram-link diagram-context"/>
    <Label x={265} y={282} className="diagram-micro">cloud access is bounded by the edge host's data and authority policy</Label>
  </>;
  if (variant === "memory-rich") return <>
    <Node x={303} y={18} w={154} title="HOST MISSION" note="memory contract" className="diagram-node diagram-source"/>
    <circle cx="380" cy="153" r="48" className="diagram-host-core"/><Label x={350} y={150} className="diagram-node-title">HOST</Label><Label x={348} y={170} className="diagram-node-note">authority</Label>
    {[{x:62,t:"SEMANTIC",n:"facts + sources"},{x:237,t:"EPISODIC",n:"events + lineage"},{x:412,t:"PROCEDURAL",n:"bounded know-how"},{x:587,t:"CONFLICTS",n:"retain provenance"}].map(item=><g key={item.t}><Link d={`M380 201 V228 H${item.x+55} V244`} className="diagram-link diagram-symbiosis"/><Node x={item.x} y={244} w={110} h={42} title={item.t} note={item.n} className="diagram-node diagram-symbiont"/></g>)}
    <Label x={274} y={220} className="diagram-micro">memory symbiont · provenance before reuse</Label>
  </>;
  if (variant === "competitive-partner") return <>
    <Node x={300} y={18} w={160} title="CAPABILITY NEED" note="shared task contract" className="diagram-node diagram-source"/>
    <Link d="M380 66 V94 H190 V119 M380 94 H570 V119"/>
    <Node x={94} y={119} w={192} title="SYMBIONT A · TRIAL" note="equal budget · isolated" className="diagram-node diagram-symbiont"/>
    <Node x={474} y={119} w={192} title="SYMBIONT B · TRIAL" note="equal budget · isolated" className="diagram-node diagram-symbiont"/>
    <Link d="M190 167 V207 H380 M570 167 V207 H380"/><Node x={280} y={207} w={200} title="COMPARE VERIFIED RESULTS" note="quality · cost · risk" className="diagram-node diagram-gate"/>
    <Label x={254} y={282} className="diagram-micro">lasting assignment requires host approval · variant remains partial</Label>
  </>;
  if (variant === "procedural") return <>
    <Node x={28} y={130} w={142} title="CAPABILITY GAP" note="declared by mission" className="diagram-node diagram-source"/>
    <Link d="M170 154 H203"/><Node x={203} y={130} w={145} title="PROCEDURE PLAN" note="ordered steps" className="diagram-node diagram-member"/>
    <Link d="M348 154 H381"/><Node x={381} y={130} w={145} title="BOUNDED STEP 1…N" note="contracted executor" className="diagram-node diagram-symbiont"/>
    <Link d="M526 154 H559"/><Node x={559} y={130} w={170} title="MISSION STOP" note="condition / budget" className="diagram-node diagram-gate"/>
    <Label x={275} y={236} className="diagram-micro">recruitment is a proposal · procedure stays within the mission contract</Label>
  </>;
  if (variant === "tool") return <>
    <Node x={48} y={126} w={142} title="HOST REQUEST" note="declared capability" className="diagram-node diagram-source"/>
    <Link d="M190 150 H235"/><rect x="235" y="86" width="291" height="135" rx="9" className="diagram-sandbox-boundary"/><Label x={288} y={107} className="diagram-micro">TOOL LEASE / SANDBOX BOUNDARY</Label>
    <Node x={262} y={126} w={112} title="MANIFEST" note="capabilities" className="diagram-node diagram-member"/><Link d="M374 150 H414"/><Node x={414} y={126} w={94} title="TOOL" note="API / CLI" className="diagram-node diagram-symbiont"/>
    <Link d="M526 150 H573"/><Node x={573} y={126} w={154} title="SCHEMA CHECK" note="stop conditions" className="diagram-node diagram-gate"/>
    <Label x={251} y={263} className="diagram-micro">external capability runs only through its declared manifest and lease</Label>
  </>;
  if (variant === "cloud-core/edge-sync") return <>
    <rect x="38" y="46" width="286" height="204" rx="10" className="diagram-cloud-boundary"/><Label x={73} y={68} className="diagram-micro">CLOUD HOST / CONTROL</Label>
    <circle cx="180" cy="146" r="48" className="diagram-host-core"/><Label x={150} y={143} className="diagram-node-title">CLOUD HOST</Label><Label x={150} y={163} className="diagram-node-note">versioned state</Label>
    <rect x="408" y="46" width="310" height="204" rx="10" className="diagram-edge-boundary"/><Label x={516} y={68} className="diagram-micro">EDGE RESIDENTS</Label>
    <Node x={437} y={111} w={122} title="EDGE A" note="event queue" className="diagram-node diagram-symbiont"/><Node x={575} y={111} w={122} title="EDGE B" note="event queue" className="diagram-node diagram-symbiont"/>
    <Link d="M228 137 H361 V123 H437 M361 123 H575" className="diagram-link diagram-async-link"/><Link d="M437 153 H361 V177 H228" className="diagram-link diagram-async-link"/>
    <Node x={471} y={184} w={202} title="PROVENANCE / FRESHNESS" note="reject stale state" className="diagram-node diagram-gate"/>
    <Label x={228} y={282} className="diagram-micro">asynchronous sync concept · stale or unattributed events must not merge</Label>
  </>;
  return <>
    <circle cx="380" cy="158" r="105" className="diagram-host-boundary"/><Label x={340} y={43} className="diagram-micro">CAPABILITY CONTRACT BOUNDARY</Label>
    <circle cx="380" cy="158" r="55" className="diagram-host-core"/><Label x={350} y={153} className="diagram-node-title">HOST</Label><Label x={344} y={173} className="diagram-node-note">identity · lifecycle</Label>
    {[{x:242,y:75,t:"SPECIALIST",n:"contracted capability"},{x:426,y:75,t:"IMMUNE",n:"declared verifier"},{x:238,y:197,t:"MEMORY",n:"provenance store"},{x:430,y:197,t:"SPECIALIST",n:"bounded resource"}].map(item=><g key={`${item.t}-${item.x}-${item.y}`}><Link d={`M380 158 L${item.x+58} ${item.y+23}`} className="diagram-link diagram-symbiosis"/><Node x={item.x} y={item.y} w={116} h={46} title={item.t} note={item.n} className="diagram-node diagram-symbiont"/></g>)}
    <Node x={275} y={270} w={210} h={34} title="HOST DECISION · CONTRACT GATE" className="diagram-node diagram-gate"/>
  </>;
}

function Syncytium({ variant }: Props) {
  if (variant === "hard") return <>
    <Node x={70} y={128} w={148} title="PROPOSED WRITE" note="authority + preconditions" className="diagram-node diagram-source"/>
    <Link d="M218 152 H276"/><Node x={276} y={112} w={190} h={80} title="STRICT INVARIANTS" note="validate affected rules" className="diagram-node diagram-invariant"/>
    <Link d="M466 152 H522"/><Node x={522} y={100} w={190} title="COORDINATE / REJECT" note="invalid merge cannot pass" className="diagram-node diagram-gate"/>
    <Link d="M618 148 V218 H380" className="diagram-link diagram-reject-path"/><Label x={251} y={247} className="diagram-micro">coordination required when independent writes cannot preserve the invariant</Label>
    <Label x={280} y={275} className="diagram-micro">design model · no runtime gate is implemented</Label>
  </>;
  if (variant === "soft") return <>
    {[{x:65,t:"REPLICA A",n:"local state S₀"},{x:303,t:"REPLICA B",n:"local state S₀"},{x:541,t:"REPLICA C",n:"local state S₀"}].map(item=><Node key={item.t} x={item.x} y={92} w={154} title={item.t} note={item.n} className="diagram-node diagram-replica"/>)}
    <Link d="M142 140 V184 H380 M380 140 V184 M618 140 V184 H380" className="diagram-link diagram-delta"/><Node x={282} y={184} w={196} title="MERGE DELTAS" note="only supported merge types" className="diagram-node diagram-shared-state"/>
    <Link d="M380 232 V254"/><Node x={285} y={254} w={190} h={38} title="RECONCILE CONFLICTS" note="convergence is conditional" className="diagram-node diagram-gate"/>
    <Label x={259} y={55} className="diagram-micro">temporary divergence · causal and delivery assumptions matter</Label>
  </>;
  if (variant === "code") return <>
    <Node x={299} y={20} w={162} title="SHARED CODE BASE" note="versioned starting point" className="diagram-node diagram-source"/>
    <Link d="M380 68 V94 H178 V119 M380 94 H582 V119"/>
    <Node x={83} y={119} w={190} title="EDIT BRANCH A" note="artifact + patch" className="diagram-node diagram-replica"/><Node x={487} y={119} w={190} title="EDIT BRANCH B" note="artifact + patch" className="diagram-node diagram-replica"/>
    <Link d="M178 167 V199 H380 M582 167 V199 H380" className="diagram-link diagram-delta"/><Node x={279} y={199} w={202} title="MERGE / REPLAY CHECKS" note="imports · tests · provenance" className="diagram-node diagram-gate"/>
    <Label x={276} y={277} className="diagram-micro">illustrative shared-code protocol · no concurrent runtime merge</Label>
  </>;
  if (variant === "document") return <>
    <Node x={293} y={18} w={174} title="SHARED DOCUMENT" note="versioned text state" className="diagram-node diagram-source"/>
    {[{x:58,t:"AUTHOR A",n:"paragraph delta"},{x:303,t:"AUTHOR B",n:"section delta"},{x:548,t:"AUTHOR C",n:"comment delta"}].map(item=><g key={item.t}><Node x={item.x} y={114} w={154} title={item.t} note={item.n} className="diagram-node diagram-replica"/><Link d={`M${item.x+77} 162 V202 H380`} className="diagram-link diagram-document-delta"/></g>)}
    <Node x={279} y={202} w={202} title="RECONCILE CAUSAL ORDER" note="text merge ≠ semantic agreement" className="diagram-node diagram-gate"/>
    <Label x={290} y={277} className="diagram-micro">a document CRDT needs its own delivery and merge assumptions</Label>
  </>;
  if (variant === "graph") return <>
    <Label x={289} y={38} className="diagram-micro">NODES + EDGES · SHARED DEPENDENCY GRAPH</Label>
    <Link d="M204 108 H320 M440 108 H555 M144 132 V188 H260 V218 M615 132 V188 H500 V218 M320 242 H440" className="diagram-link diagram-graph-edge" markerEnd={true}/>
    <Node x={84} y={84} w={120} title="NODE A" note="dependency" className="diagram-node diagram-replica"/><Node x={320} y={84} w={120} title="NODE B" note="shared parent" className="diagram-node diagram-replica"/><Node x={555} y={84} w={120} title="NODE C" note="dependency" className="diagram-node diagram-replica"/>
    <Node x={200} y={218} w={120} title="EDGE Δ" note="add / update" className="diagram-node diagram-source"/><Node x={440} y={218} w={120} title="VALIDATE" note="cycles · dangling" className="diagram-node diagram-gate"/>
    <Label x={281} y={279} className="diagram-micro">projection rebuild or edge removal · graph merge remains conceptual</Label>
  </>;
  if (variant === "transactional") return <>
    <Node x={62} y={130} w={146} title="PRECONDITIONS" note="version · resources" className="diagram-node diagram-source"/>
    <Link d="M208 154 H245"/><rect x="245" y="79" width="278" height="150" rx="8" className="diagram-transaction-boundary"/><Label x={323} y={99} className="diagram-micro">ATOMIC TRANSACTION</Label>
    <Node x={266} y={119} w={108} title="WRITE A" note="field delta" className="diagram-node diagram-replica"/><Link d="M374 143 H400"/><Node x={400} y={119} w={108} title="WRITE B" note="field delta" className="diagram-node diagram-replica"/>
    <Node x={568} y={130} w={154} title="COMMIT / ROLLBACK" note="on failure · all-or-none" className="diagram-node diagram-gate"/>
    <Link d="M523 154 H568" className="diagram-link diagram-transaction-link"/>
    <Label x={260} y={269} className="diagram-micro">transaction isolation and rollback are design requirements, not current guarantees</Label>
  </>;
  if (variant === "epistemic") return <>
    <Node x={296} y={18} w={168} title="VERSIONED FACT MAP" note="claim · source · confidence" className="diagram-node diagram-shared-state"/>
    <Node x={50} y={116} w={160} title="SOURCE A" note="supports claim" className="diagram-node diagram-source"/><Node x={550} y={116} w={160} title="SOURCE B" note="counterevidence" className="diagram-node diagram-adversary"/>
    <Link d="M210 140 H252 V42 H296" className="diagram-link diagram-evidence-link"/><Link d="M550 140 H508 V42 H464" className="diagram-link diagram-reject-path"/>
    <Node x={287} y={168} w={186} title="PRESERVE BOTH" note="contradiction stays linked" className="diagram-node diagram-gate"/>
    <Link d="M130 164 V192 H287 M630 164 V192 H473" className="diagram-link diagram-evidence-link"/>
    <Label x={293} y={267} className="diagram-micro">provenance is part of the value · do not overwrite the counterclaim</Label>
  </>;
  if (variant === "blackboard") return <>
    <rect x="244" y="54" width="272" height="174" rx="7" className="diagram-board-boundary"/><Label x={328} y={75} className="diagram-micro">SHARED BLACKBOARD</Label>
    {[{x:273,y:93,t:"QUESTION"},{x:399,y:93,t:"EVIDENCE"},{x:273,y:153,t:"HYPOTHESIS"},{x:399,y:153,t:"OPEN ISSUE"}].map(item=><Node key={item.t} x={item.x} y={item.y} w={106} h={40} title={item.t} note="board entry" className="diagram-node diagram-board-entry"/>)}
    {[{x:53,t:"AGENT A",n:"subscribe / post"},{x:574,t:"AGENT B",n:"subscribe / post"}].map(item=><g key={item.t}><Node x={item.x} y={123} w={133} title={item.t} note={item.n} className="diagram-node diagram-replica"/><Link d={item.x<100?"M186 147 H244":"M574 147 H516"} className="diagram-link diagram-delta"/></g>)}
    <Node x={284} y={241} w={192} h={40} title="EVENT HISTORY" note="retain attribution" className="diagram-node diagram-gate"/>
    <Label x={282} y={292} className="diagram-micro">unanswered critical question blocks closure</Label>
  </>;
  if (variant === "localFirst") return <>
    <rect x="42" y="48" width="274" height="204" rx="10" className="diagram-replica-boundary"/><rect x="444" y="48" width="274" height="204" rx="10" className="diagram-replica-boundary"/>
    <Label x={116} y={69} className="diagram-micro">LOCAL REPLICA A · OFFLINE</Label><Label x={521} y={69} className="diagram-micro">LOCAL REPLICA B · RECONNECTED</Label>
    <Node x={95} y={102} w={166} title="LOCAL WRITE" note="queued delta" className="diagram-node diagram-replica"/><Node x={499} y={102} w={166} title="REMOTE DELTA" note="causal context" className="diagram-node diagram-source"/>
    <Node x={95} y={174} w={166} title="OUTBOX" note="partition queue" className="diagram-node diagram-advisory-node"/><Node x={499} y={174} w={166} title="RECONCILE" note="check limits" className="diagram-node diagram-gate"/>
    <Link d="M261 126 H386 V198 H499" className="diagram-link diagram-async-link"/><Label x={318} y={155} className="diagram-micro">sync on reconnect</Label>
    <Label x={273} y={280} className="diagram-micro">offline-first is a design mode · partition budget and merge rules must be defined</Label>
  </>;
  if (variant === "speculative") return <>
    <Node x={303} y={18} w={154} title="BASELINE STATE" note="immutable starting point" className="diagram-node diagram-source"/>
    <Link d="M380 66 V92 H190 V116 M380 92 H570 V116" className="diagram-link diagram-speculative-link"/>
    <rect x="65" y="106" width="250" height="119" rx="8" className="diagram-branch-boundary"/><rect x="445" y="106" width="250" height="119" rx="8" className="diagram-branch-boundary"/>
    <Node x={96} y={133} w={188} title="BRANCH A" note="isolated assumptions" className="diagram-node diagram-replica"/><Node x={476} y={133} w={188} title="BRANCH B" note="isolated assumptions" className="diagram-node diagram-replica"/>
    <Link d="M190 181 V241 H380 M570 181 V241 H380"/><Node x={279} y={241} w={202} h={42} title="VALIDATE → DISCARD / PROPOSE" note="promotion gate required" className="diagram-node diagram-gate"/>
  </>;
  if (variant === "hierarchical") return <>
    <Node x={300} y={22} w={160} title="PARENT STATE" note="global constraints" className="diagram-node diagram-shared-state"/>
    <Link d="M380 70 V100 H150 V126 M380 100 V126 M380 100 H610 V126" className="diagram-link diagram-hierarchy-link"/>
    {[{x:70,t:"REGION A",n:"local details"},{x:310,t:"REGION B",n:"local details"},{x:550,t:"REGION C",n:"local details"}].map(item=><Node key={item.t} x={item.x} y={126} w={160} title={item.t} note={item.n} className="diagram-node diagram-replica"/>)}
    <Link d="M150 174 V220 H380 M390 174 V220 M630 174 V220 H390" className="diagram-link diagram-async-link"/><Node x={282} y={220} w={196} title="RECONCILE AT BOUNDARY" note="propagate constraints down" className="diagram-node diagram-gate"/>
    <Label x={270} y={284} className="diagram-micro">local detail ↔ regional summary · boundary invariant must hold</Label>
  </>;
  if (variant === "realtimeControl") return <>
    <Node x={36} y={132} w={140} title="SIGNAL" note="timestamped input" className="diagram-node diagram-source"/>
    <Link d="M176 156 H207"/><Node x={207} y={132} w={148} title="CONTROL DELTA" note="bounded action" className="diagram-node diagram-replica"/>
    <Link d="M355 156 H386"/><Node x={386} y={132} w={148} title="SAFETY MONITOR" note="limits + latency" className="diagram-node diagram-gate"/>
    <Link d="M534 156 H565"/><Node x={565} y={132} w={164} title="STOP / REPAIR" note="on safety signal" className="diagram-node diagram-adversary"/>
    <Label x={226} y={229} className="diagram-micro">requires target-system latency bounds and a measured control loop</Label>
    <Label x={291} y={258} className="diagram-micro">concept only · not a live control path</Label>
  </>;
  if (variant === "humanAi") return <>
    <Label x={276} y={48} className="diagram-micro">ATTRIBUTED MUTATIONS · TRACEABLE AUTHORITY</Label>
    <Node x={74} y={106} w={176} title="AI CONTRIBUTION" note="signed proposal" className="diagram-node diagram-replica"/><Node x={510} y={106} w={176} title="HUMAN CONTRIBUTION" note="attributed edit" className="diagram-node diagram-source"/>
    <Link d="M250 130 L302 164 M510 130 L458 164" className="diagram-link diagram-delta"/><Node x={291} y={164} w={178} title="SHARED VERSIONED STATE" note="provenance per change" className="diagram-node diagram-shared-state"/>
    <Link d="M380 212 V245" className="diagram-link diagram-hierarchy-link"/><Node x={278} y={245} w={204} h={42} title="REVIEW / ATTRIBUTED UNDO" note="consent and authority" className="diagram-node diagram-gate"/>
  </>;
  return <>
    <Node x={278} y={118} w={204} h={92} title="SHARED STATE" note="versioned · invariant-bound" className="diagram-node diagram-shared-state"/>
    {[{x:61,y:48,t:"AGENT A"},{x:569,y:48,t:"AGENT B"},{x:61,y:225,t:"AGENT C"},{x:569,y:225,t:"AGENT D"}].map(item=><g key={item.t}><Node x={item.x} y={item.y} w={130} title={item.t} note="participant" className="diagram-node diagram-member"/><Link d={`M${item.x < 300 ? 191 : 569} ${item.y + 24} ${item.x < 300 ? "H240" : "H520"} V164 ${item.x < 300 ? "H278" : "H482"}`} className="diagram-link diagram-replica"/></g>)}
    <Node x={280} y={268} w={200} h={36} title="MERGE + INVARIANT CHECK" className="diagram-node diagram-gate"/>
    <Label x={278} y={231} className="diagram-micro">generic shared-state concept · convergence depends on the chosen protocol</Label>
  </>;
}

function Rhizome({ variant }: Props) {
  if (variant === "routing") return <>
    <Node x={30} y={131} w={145} title="CAPABILITY NEED" note="cost · trust · evidence" className="diagram-node diagram-source"/>
    <Link d="M175 155 H222"/><Node x={222} y={113} w={142} title="BOUNDED BFS" note="active graph edges" className="diagram-node diagram-gate"/>
    <Link d="M364 137 L430 96 M364 151 H430 M364 165 L430 217" className="diagram-link diagram-route-candidate"/>
    <Node x={430} y={73} w={146} title="PATH A" note="score · route receipt" className="diagram-node diagram-member"/><Node x={430} y={129} w={146} title="PATH B" note="score · route receipt" className="diagram-node diagram-member"/><Node x={430} y={195} w={146} title="PATH C" note="score · route receipt" className="diagram-node diagram-member"/>
    <Link d="M576 96 L600 151 M576 151 H600 M576 217 L600 151" className="diagram-link diagram-route-candidate" markerEnd={false}/>
    <Link d="M576 151 H623" className="diagram-link diagram-route-selected"/>
    <Node x={623} y={128} w={118} title="PROVIDER" note="adapter runs it" className="diagram-node diagram-gate"/>
    <Label x={270} y={274} className="diagram-micro">rank bounded candidate paths · external worker start is not implied</Label>
  </>;
  if (variant === "exploratory") return <>
    <rect x="62" y="52" width="636" height="196" rx="10" className="diagram-explore-boundary"/><Label x={84} y={73} className="diagram-micro">SCOUT FRONTIER · BOUNDED SEARCH DEPTH</Label>
    <Link d="M180 151 L300 108 M180 151 L300 188 M370 108 L491 91 M370 108 L491 148 M370 188 L491 207 M561 91 L631 133 M561 148 H631 M561 207 L631 157" className="diagram-link diagram-trace-network" markerEnd={false}/>
    <Node x={80} y={128} w={100} title="SCOUT" note="start" className="diagram-node diagram-source"/><Node x={300} y={84} w={140} title="FRONTIER A" note="new capability" className="diagram-node diagram-member"/><Node x={300} y={166} w={140} title="FRONTIER B" note="new domain" className="diagram-node diagram-member"/>
    <Node x={491} y={68} w={140} title="OBSERVE" note="trace deposit" className="diagram-node diagram-symbiont"/><Node x={491} y={126} w={140} title="FOLLOW TRACE" note="bounded next hop" className="diagram-node diagram-symbiont"/><Node x={491} y={185} w={140} title="SCOUT" note="continue / stop" className="diagram-node diagram-symbiont"/><Node x={631} y={110} w={113} title="GAP / STOP" note="budget reached" className="diagram-node diagram-gate"/>
    <Label x={274} y={278} className="diagram-micro">exploration prioritizes scouting · growth still passes the admission gates</Label>
  </>;
  if (variant === "growth") return <>
    <Node x={28} y={129} w={140} title="CAPABILITY GAP" note="versioned diagnosis" className="diagram-node diagram-source"/>
    <Link d="M168 153 H200"/><Node x={200} y={105} w={145} title="GROWTH PLAN" note="candidate + evidence" className="diagram-node diagram-member"/>
    <Link d="M345 129 H375"/><Node x={375} y={105} w={145} title="BUDGET / UTILITY" note="reuse before create" className="diagram-node diagram-invariant"/>
    <Link d="M520 129 H550"/><Node x={550} y={105} w={178} title="VERIFIER RECEIPT" note="trusted provider gate" className="diagram-node diagram-gate"/>
    <Link d="M639 153 V210 H380" className="diagram-link diagram-context"/><Node x={281} y={210} w={198} title="ADMIT CAPABILITY NODE" note="graph version must still match" className="diagram-node diagram-gate"/>
    <Label x={272} y={279} className="diagram-micro">admission does not prove the external worker or service started</Label>
  </>;
  if (variant === "resilient") return <>
    <Node x={30} y={128} w={136} title="ROUTE REQUEST" note="declared constraints" className="diagram-node diagram-source"/>
    <Link d="M166 152 H209 V100 H263 M209 152 V210 H263" className="diagram-link diagram-route-candidate"/>
    <Node x={263} y={77} w={142} title="PATH A" note="failed edge" className="diagram-node diagram-failed-route"/>
    <Node x={263} y={187} w={142} title="PATH B" note="edge-disjoint route" className="diagram-node diagram-route-live"/>
    <Link d="M405 101 H462 V152 H516 M405 211 H462 V152 H516" className="diagram-link diagram-route-live"/>
    <Node x={516} y={128} w={190} title="ALTERNATE PROVIDER" note="route result + receipt" className="diagram-node diagram-gate"/>
    <Node x={269} y={256} w={224} h={38} title="EXPLICIT RECOVERY OPERATION" className="diagram-node diagram-advisory-node"/>
  </>;
  if (variant === "sparse") return <>
    <Label x={291} y={53} className="diagram-micro">LOW-DENSITY GRAPH · BRANCH / COST BOUNDS</Label>
    <Link d="M180 140 H325 M395 140 H553 M180 157 L260 217" className="diagram-link diagram-rhizome-link"/>
    <Link d="M180 140 L274 209 M465 140 H553 M395 166 L552 221" className="diagram-link diagram-proposed-edge" markerEnd={false}/>
    <Node x={70} y={118} w={110} title="ROOT A" note="active" className="diagram-node diagram-member"/><Node x={325} y={118} w={140} title="BRIDGE B" note="active" className="diagram-node diagram-source"/><Node x={553} y={118} w={140} title="CAPABILITY C" note="active" className="diagram-node diagram-member"/>
    <Node x={200} y={208} w={140} title="BRANCH D" note="active" className="diagram-node diagram-member"/><Node x={552} y={208} w={140} title="OPTIONAL EDGE" note="prune by budget" className="diagram-node diagram-advisory-node"/>
    <Label x={278} y={281} className="diagram-micro">keep declared density and hop limits · dotted links are not admitted</Label>
  </>;
  if (variant === "persistent") return <>
    <rect x="52" y="62" width="436" height="176" rx="8" className="diagram-session-boundary"/><Label x={81} y={83} className="diagram-micro">PERSISTED RHIZOME SESSION · GRAPH VERSION vₙ</Label>
    <Link d="M149 150 H265 M363 150 H421" className="diagram-link diagram-rhizome-link"/><Node x={80} y={126} w={138} title="CAPABILITY A" note="route lineage" className="diagram-node diagram-member"/><Node x={265} y={126} w={138} title="MEMBER B" note="bounded lease" className="diagram-node diagram-source"/>
    <Node x={522} y={101} w={190} title="TRACE STORE" note="positive + negative" className="diagram-node diagram-gate"/><Link d="M403 150 H522" className="diagram-link diagram-trace-network"/>
    <Node x={279} y={235} w={202} h={40} title="MAINTAIN / EXPIRE / PRUNE" note="versioned operation" className="diagram-node diagram-advisory-node"/>
    <Label x={272} y={292} className="diagram-micro">persistent traces and bounded leases survive across session steps</Label>
  </>;
  if (variant === "ephemeral") return <>
    <rect x="83" y="54" width="590" height="188" rx="10" className="diagram-ephemeral-boundary"/><Label x={102} y={74} className="diagram-micro">MISSION SESSION · TEMPORARY GRAPH</Label>
    <Node x={127} y={115} w={148} title="SHORT ROUTES" note="bounded hops" className="diagram-node diagram-source"/><Link d="M275 139 H325"/><Node x={325} y={115} w={148} title="FAST TRACE DECAY" note="short-lived state" className="diagram-node diagram-member"/><Link d="M473 139 H523"/><Node x={523} y={115} w={130} title="SESSION CLOSE" note="discard graph" className="diagram-node diagram-gate"/>
    <Link d="M588 163 V211 H380" className="diagram-link diagram-context"/><Node x={280} y={211} w={200} h={38} title="SUMMARY FOSSIL ONLY" note="no mission artifacts" className="diagram-node diagram-advisory-node"/>
    <Label x={256} y={281} className="diagram-micro">ephemeral close removes the graph · optional fossil summarizes the session</Label>
  </>;
  if (variant === "small_world") return <>
    <Link d="M153 124 L351 80 M153 124 L351 218 M455 80 L596 124 M455 218 L596 124 M153 124 L596 124" className="diagram-link diagram-rhizome-link" markerEnd={false}/>
    <Node x={76} y={102} w={154} title="LOCAL MEMBER A" note="observed edge" className="diagram-node diagram-member"/><Node x={351} y={57} w={154} title="OBSERVED HUB" note="short path · verified" className="diagram-node diagram-gate"/><Node x={351} y={195} w={154} title="LOCAL MEMBER B" note="alternate route" className="diagram-node diagram-member"/><Node x={596} y={102} w={154} title="TARGET CAPABILITY" note="selected provider" className="diagram-node diagram-source"/>
    <Label x={252} y={277} className="diagram-micro">prefer observed hubs · shortcut edges still require admission and proof</Label>
  </>;
  if (variant === "private") return <>
    <rect x="47" y="54" width="383" height="190" rx="10" className="diagram-trust-boundary"/><Label x={76} y={75} className="diagram-micro">TRUSTED DOMAIN · PRIVATE ROUTES</Label>
    <Node x={84} y={119} w={130} title="PRIVATE A" note="admitted" className="diagram-node diagram-member"/><Node x={285} y={119} w={130} title="PRIVATE B" note="trusted route" className="diagram-node diagram-source"/><Link d="M214 143 H285" className="diagram-link diagram-private-link"/>
    <Node x={508} y={112} w={200} title="DOMAIN GATEWAY" note="signed admission proof" className="diagram-node diagram-gate"/><Link d="M430 143 H508" className="diagram-link diagram-context"/>
    <Node x={518} y={207} w={174} h={40} title="QUARANTINED NODE" note="excluded from routes" className="diagram-node diagram-failed-route"/>
    <Label x={265} y={281} className="diagram-micro">cross-domain paths require a context-bound proof · trust score alone is insufficient</Label>
  </>;
  if (variant === "cross_representation") return <>
    <Node x={34} y={129} w={136} title="TEXT" note="source form" className="diagram-node diagram-source"/><Link d="M170 153 H208"/>
    <rect x="208" y="78" width="348" height="154" rx="8" className="diagram-bridge-boundary"/><Label x={300} y={98} className="diagram-micro">VERIFIED REPRESENTATION BRIDGE</Label>
    <Node x={230} y={122} w={128} title="TRANSLATE" note="loss measured" className="diagram-node diagram-member"/><Link d="M358 146 H386"/><Node x={386} y={122} w={148} title="ROUND-TRIP CHECK" note="semantic equivalence" className="diagram-node diagram-gate"/>
    <Link d="M556 153 H594"/><Node x={594} y={129} w={136} title="CODE / GRAPH" note="target form" className="diagram-node diagram-source"/>
    <Label x={263} y={265} className="diagram-micro">compatibility threshold + verifier receipt gate the bridge</Label>
  </>;
  if (variant === "procedural") return <>
    <Label x={299} y={52} className="diagram-micro">TYPED PROCEDURE · MAXIMUM DECLARED DEPTH</Label>
    {[{x:40,t:"STEP 1",n:"input contract"},{x:180,t:"STEP 2",n:"local evidence"},{x:320,t:"STEP 3",n:"transform"},{x:460,t:"STEP 4",n:"test"},{x:600,t:"STEP 5·6",n:"causal check"}].map((item,i)=><g key={item.t}><Node x={item.x} y={128} w={122} title={item.t} note={item.n} className={i===4?"diagram-node diagram-gate":"diagram-node diagram-member"}/>{i<4&&<Link d={`M${item.x+122} 152 H${item.x+140}`} className="diagram-link diagram-context"/>}</g>)}
    <Label x={258} y={225} className="diagram-micro">each handoff carries local proof before the next step runs</Label>
    <Label x={281} y={252} className="diagram-micro">causal validation · compatible output · bounded pipeline</Label>
  </>;
  if (variant === "self_healing") return <>
    <Node x={34} y={130} w={140} title="ROUTE FAILURE" note="verified receipt" className="diagram-node diagram-failed-route"/>
    <Link d="M174 154 H210"/><Node x={210} y={130} w={142} title="DIAGNOSE" note="failed edge / domain" className="diagram-node diagram-source"/>
    <Link d="M352 154 H388"/><Node x={388} y={130} w={146} title="ALTERNATE ROUTE" note="bounded disjoint path" className="diagram-node diagram-route-live"/>
    <Link d="M534 154 H570"/><Node x={570} y={130} w={160} title="REPAIR GATE" note="≤ 5 rounds · evidence" className="diagram-node diagram-gate"/>
    <Label x={267} y={234} className="diagram-micro">reconfiguration is bounded · no unlimited autonomous healing loop</Label>
    <Label x={267} y={263} className="diagram-micro">adapter and verifier still govern the repaired capability</Label>
  </>;
  return <>
    <Link d="M230 123 L352 79 M230 123 L352 216 M488 79 L596 123 M488 216 L596 123 M230 123 L596 123" className="diagram-link diagram-rhizome-link" markerEnd={false}/>
    {[{x:76,y:101,t:"COORDINATOR",n:"provisional locus"},{x:352,y:55,t:"CAPABILITY NODE",n:"declared skill"},{x:352,y:192,t:"LOCAL BRIDGE",n:"contract + evidence"},{x:596,y:101,t:"MEMBER",n:"direct selection"}].map(item=><Node key={item.t} x={item.x} y={item.y} w={136} title={item.t} note={item.n} className="diagram-node diagram-member"/>)}
    <Label x={278} y={270} className="diagram-micro">revisioned graph · local relationship · attributed stigmergic trace</Label>
  </>;
}

function MetapopDeme({ x, y, title, note, kind = "diagram-member", w = 132 }: { x: number; y: number; title: string; note: string; kind?: string; w?: number }) {
  return <g className="diagram-patch"><circle cx={x + w / 2} cy={y + 27} r="55"/><Node x={x} y={y} w={w} h={54} title={title} note={note} className={`diagram-node ${kind}`}/></g>;
}

function Metapopulation({ variant }: Props) {
  if (variant === "classic_patch") return <>
    <Label x={80} y={49} className="diagram-micro">PATCH OCCUPANCY IS SEPARATE FROM DEME LIFECYCLE</Label>
    <MetapopDeme x={48} y={111} title="DEME A" note="COLLAPSED" kind="diagram-failed-route"/>
    <Link d="M180 138 H228" className="diagram-link diagram-reject-path"/>
    <Node x={228} y={114} w={126} title="PATCH A" note="VACANT" className="diagram-node diagram-advisory-node"/>
    <Link d="M354 138 H392" className="diagram-link diagram-context"/>
    <Node x={392} y={103} w={156} h={68} title="FOUNDER TRIAL" note="2 distinct lineages" className="diagram-node diagram-source"/>
    <Link d="M548 137 H582"/>
    <Node x={582} y={111} w={142} title="LOCAL EVALUATOR" note="viability proof" className="diagram-node diagram-gate"/>
    <Link d="M653 165 V216 H472" className="diagram-link diagram-evidence-link"/>
    <Node x={352} y={216} w={240} h={44} title="NEW DEME · ACTIVE ONLY AFTER PROOF" className="diagram-node diagram-gate"/>
    <Label x={249} y={284} className="diagram-micro">classic_patch starts the bounded trial · evaluator decides viability</Label>
  </>;
  if (variant === "island_search") return <>
    <Label x={285} y={43} className="diagram-micro">INDEPENDENT SEARCH · POLICY-GATED RING MIGRATION</Label>
    <Link d="M186 105 H558 M624 157 V253 H120 V157" className="diagram-link diagram-corridor" markerEnd={false}/>
    <MetapopDeme x={54} y={80} title="ISLAND A" note="local search"/>
    <MetapopDeme x={558} y={80} title="ISLAND B" note="local search"/>
    <MetapopDeme x={558} y={180} title="ISLAND C" note="local search"/>
    <MetapopDeme x={54} y={180} title="ISLAND D" note="local search"/>
    <Link d="M186 92 H558" className="diagram-link diagram-resource-flow"/>
    <Label x={285} y={75} className="diagram-edge-label">PERIODIC ELITE + COUNTEREXAMPLE</Label>
    <Label x={282} y={277} className="diagram-micro">local incumbents move around the ring · diversity stays local between exchanges</Label>
  </>;
  if (variant === "heterogeneous_islands") return <>
    <Label x={282} y={45} className="diagram-micro">COMPLEMENTARY REGIONS · DIFFERENT SEARCH METHODS</Label>
    <Link d="M190 124 L312 95 M442 95 L566 124 M190 155 L312 182 M442 182 L566 155" className="diagram-link diagram-corridor" markerEnd={false}/>
    <MetapopDeme x={58} y={104} title="SAT ISLAND" note="constraint search" w={132}/>
    <MetapopDeme x={310} y={70} title="ILP ISLAND" note="exact optimization" kind="diagram-source" w={132}/>
    <MetapopDeme x={566} y={104} title="EVOLUTION ISLAND" note="population search" w={132}/>
    <MetapopDeme x={310} y={155} title="LOCAL SEARCH" note="neighborhood method" w={132}/>
    <Node x={270} y={239} w={220} h={40} title="COMPLEMENTARY PROPAGULES" note="receiver validates locally" className="diagram-node diagram-gate"/>
    <Label x={281} y={291} className="diagram-micro">algorithm · provider · lineage diversity</Label>
  </>;
  if (variant === "source_sink") return <>
    <Label x={284} y={49} className="diagram-micro">DIRECTED SUPPORT · A → B DOES NOT IMPLY B → A</Label>
    <Link d="M222 138 H327 M458 128 L554 95 M458 151 L554 191" className="diagram-link diagram-resource-flow"/>
    <MetapopDeme x={88} y={111} title="SOURCE DEME" note="net contributor" kind="diagram-source" w={134}/>
    <MetapopDeme x={326} y={104} title="SOURCE / SINK" note="role can rotate" w={132}/>
    <MetapopDeme x={554} y={70} title="SINK B" note="targeted pull" kind="diagram-advisory-node" w={132}/>
    <MetapopDeme x={554} y={175} title="SINK C" note="rescue candidate" kind="diagram-failed-route" w={132}/>
    <Label x={284} y={270} className="diagram-micro">migration utility + directed corridor gate · temporal roles need supplied history</Label>
  </>;
  if (variant === "rescue_network") return <>
    <Label x={276} y={45} className="diagram-micro">REDUNDANT CORRIDORS · TARGETED AT-RISK RESCUE</Label>
    <Link d="M180 110 L310 76 M442 76 L570 110 M180 151 L310 199 M442 199 L570 151 M376 101 V176 M180 130 H570" className="diagram-link diagram-corridor" markerEnd={false}/>
    <MetapopDeme x={48} y={102} title="SOURCE A" note="compatible lineage" kind="diagram-source"/>
    <MetapopDeme x={310} y={50} title="SOURCE B" note="alternate route" kind="diagram-source"/>
    <MetapopDeme x={570} y={102} title="AT-RISK DEME" note="protected capability" kind="diagram-failed-route"/>
    <MetapopDeme x={310} y={155} title="REFUGE" note="fallback population"/>
    <Node x={279} y={242} w={202} h={40} title="FITNESS + ROLLBACK GATE" note="receiver adapter required" className="diagram-node diagram-gate"/>
    <Label x={258} y={290} className="diagram-micro">rescue plan is explicit and bounded · no fixed recovery SLA</Label>
  </>;
  if (variant === "stepping_stone") return <>
    <Label x={263} y={49} className="diagram-micro">LOCAL CORRIDORS ONLY · NO DIRECT A → C JUMP</Label>
    <Link d="M183 150 H246 M378 150 H441 M573 150 H636" className="diagram-link diagram-corridor"/>
    <MetapopDeme x={51} y={123} title="PATCH A" note="local source" w={132}/>
    <MetapopDeme x={246} y={123} title="PATCH B" note="relay + local test" w={132}/>
    <MetapopDeme x={441} y={123} title="PATCH C" note="relay + local test" w={132}/>
    <MetapopDeme x={636} y={123} title="PATCH D" note="local receiver" w={112}/>
    <Link d="M183 128 H246 M378 128 H441 M573 128 H636" className="diagram-link diagram-trace-network"/>
    <Label x={289} y={240} className="diagram-edge-label">NOVELTY / CULTURAL PROPAGULE · RECEIVER QUARANTINE</Label>
    <Label x={276} y={277} className="diagram-micro">each hop tests compatibility before the next corridor</Label>
  </>;
  if (variant === "anti_synchrony") return <>
    <Label x={287} y={44} className="diagram-micro">CORRELATED ERRORS · ADAPTIVE FIREBREAKS</Label>
    <Link d="M190 122 H321 M440 122 H570 M190 188 H321 M440 188 H570" className="diagram-link diagram-corridor" markerEnd={false}/>
    <Link d="M190 140 H321 M440 140 H570" className="diagram-link diagram-reject-path" markerEnd={false}/>
    <MetapopDeme x={58} y={96} title="DEME A" note="error pattern α" w={132}/>
    <MetapopDeme x={308} y={96} title="DEME B" note="correlated α" kind="diagram-failed-route" w={132}/>
    <MetapopDeme x={558} y={96} title="DEME C" note="independent β" kind="diagram-source" w={132}/>
    <Node x={299} y={222} w={162} h={42} title="CORRIDOR GOVERNOR" note="reduce weight / freeze" className="diagram-node diagram-gate"/>
    <Link d="M374 222 V204" className="diagram-link diagram-context"/>
    <Label x={267} y={288} className="diagram-micro">firebreak limits contagion · does not trigger extinction or recolonization</Label>
  </>;
  if (variant === "federated") return <>
    <Label x={286} y={41} className="diagram-micro">DATA SOVEREIGNTY · VERIFIED PROPAGULES ONLY</Label>
    <rect x="38" y="62" width="270" height="164" rx="9" className="diagram-trust-boundary"/><rect x="452" y="62" width="270" height="164" rx="9" className="diagram-trust-boundary"/>
    <Label x={65} y={82} className="diagram-edge-label">REGION A · LOCAL STATE</Label><Label x={480} y={82} className="diagram-edge-label">REGION B · LOCAL STATE</Label>
    <MetapopDeme x={101} y={119} title="DEME A" note="private workspace" w={144}/><MetapopDeme x={514} y={119} title="DEME B" note="private workspace" w={144}/>
    <Node x={322} y={112} w={116} h={62} title="CLASSIFY" note="verify + authorize" className="diagram-node diagram-gate"/>
    <Link d="M245 146 H322 M438 146 H514" className="diagram-link diagram-federated-link"/>
    <Label x={286} y={258} className="diagram-micro">only admitted, attested summaries or propagules cross the boundary</Label>
  </>;
  if (variant === "ephemeral_patch") return <>
    <Label x={284} y={44} className="diagram-micro">DYNAMIC PATCH AVAILABILITY · DORMANCY / REATTACHMENT</Label>
    <MetapopDeme x={55} y={111} title="ACTIVE DEME" note="temporary patch" kind="diagram-source" w={144}/>
    <Link d="M199 138 H250" className="diagram-link diagram-corridor"/>
    <Node x={250} y={111} w={142} title="PATCH LOST" note="unavailable" className="diagram-node diagram-failed-route"/>
    <Link d="M392 138 H438" className="diagram-link diagram-context"/>
    <Node x={438} y={103} w={122} h={68} title="SPORE STORE" note="dormant state" className="diagram-node diagram-advisory-node"/>
    <Link d="M560 138 H604" className="diagram-link diagram-trace-network"/>
    <Node x={604} y={111} w={142} title="PATCH RETURNS" note="reattach / trial" className="diagram-node diagram-gate"/>
    <Label x={262} y={250} className="diagram-micro">cryptobiosis and reactivation are service-backed; patch quality still needs review</Label>
    <Label x={285} y={278} className="diagram-micro">volatile patch does not mean unbounded automatic recreation</Label>
  </>;
  if (variant === "persistent") return <>
    <rect x="38" y="54" width="684" height="190" rx="9" className="diagram-session-boundary"/>
    <Label x={62} y={75} className="diagram-micro">RESIDENT DEMES · VERSIONED REGIONAL SESSION ACROSS MISSIONS</Label>
    <Link d="M202 145 H310 M442 145 H550" className="diagram-link diagram-corridor"/>
    <MetapopDeme x={70} y={118} title="RESIDENT A" note="local lineage" w={132}/>
    <MetapopDeme x={310} y={118} title="RESIDENT B" note="episodic memory" kind="diagram-source" w={132}/>
    <MetapopDeme x={550} y={118} title="RESIDENT C" note="lease validated" w={132}/>
    <Node x={284} y={207} w={192} h={35} title="SESSION MEMORY + HISTORY" className="diagram-node diagram-gate"/>
    <Link d="M376 172 V207" className="diagram-link diagram-trace-network"/>
    <Label x={287} y={279} className="diagram-micro">resident daemons require explicit, current leases</Label>
  </>;
  if (variant === "evolutionary") return <>
    <Label x={276} y={44} className="diagram-micro">LOCAL REPRODUCTION · SELECTION · SELECTIVE MIGRATION</Label>
    <Link d="M196 121 H328 M460 121 H592" className="diagram-link diagram-corridor"/>
    <MetapopDeme x={64} y={94} title="DEME A" note="evaluate local fitness" w={132}/>
    <MetapopDeme x={328} y={94} title="DEME B" note="evaluate local fitness" kind="diagram-source" w={132}/>
    <MetapopDeme x={592} y={94} title="DEME C" note="evaluate local fitness" w={132}/>
    <Node x={85} y={195} w={150} h={44} title="MUTATE / SELECT" note="local offspring" className="diagram-node diagram-member"/>
    <Node x={317} y={195} w={154} h={44} title="MIGRATE" note="elite + novelty" className="diagram-node diagram-gate"/>
    <Node x={525} y={195} w={168} h={44} title="ENGINE ADAPTER" note="required for Rust path" className="diagram-node diagram-advisory-node"/>
    <Link d="M160 195 V176 M394 176 V195 M658 176 V195" className="diagram-link diagram-context"/>
    <Label x={284} y={278} className="diagram-micro">evolutionary mechanisms remain partial and adapter-dependent</Label>
  </>;
  if (variant === "cultural") return <>
    <Label x={280} y={44} className="diagram-micro">AGENTS STAY RESIDENT · PROCEDURES / ARTIFACTS TRAVEL</Label>
    <MetapopDeme x={73} y={102} title="DEME A" note="resident agents" w={132}/>
    <MetapopDeme x={329} y={102} title="DEME B" note="resident agents" kind="diagram-source" w={132}/>
    <MetapopDeme x={585} y={102} title="DEME C" note="resident agents" w={132}/>
    <Node x={288} y={204} w={214} h={48} title="CULTURAL PROPAGULE" note="procedure · artifact · test" className="diagram-node diagram-gate"/>
    <Link d="M139 156 V185 H288 M502 228 H535 V185 H651 V156" className="diagram-link diagram-resource-flow"/>
    <Label x={288} y={281} className="diagram-micro">receiver provenance and compatibility gates apply to each transfer</Label>
  </>;
  if (variant === "conservative") return <>
    <Label x={296} y={48} className="diagram-micro">COUNTEREVIDENCE FIRST · STRICT REGIONAL QUORUM</Label>
    <Link d="M210 137 H302 M458 137 H550" className="diagram-link diagram-corridor"/>
    <MetapopDeme x={78} y={110} title="REGION A" note="claim + provenance" w={132}/>
    <Node x={302} y={108} w={156} h={58} title="COUNTEREXAMPLE" note="challenge propagule" className="diagram-node diagram-adversary"/>
    <MetapopDeme x={550} y={110} title="REGION B" note="local review" kind="diagram-source" w={132}/>
    <Node x={295} y={207} w={170} h={46} title="WEIGHTED QUORUM" note="ABSTAIN blocks support" className="diagram-node diagram-gate"/>
    <Link d="M144 164 V186 H295 M616 164 V186 H465" className="diagram-link diagram-evidence-link"/>
    <Label x={270} y={280} className="diagram-micro">quorum is independent of the local migration policy · no fixed threshold here</Label>
  </>;
  if (variant === "exploratory") return <>
    <Label x={278} y={45} className="diagram-micro">NOVELTY PROPAGULES · DIVERSE LOCAL SEARCH</Label>
    <Link d="M190 140 L311 102 M443 102 L563 140 M190 158 L311 206 M443 206 L563 158" className="diagram-link diagram-corridor" markerEnd={false}/>
    <MetapopDeme x={58} y={115} title="FRONTIER A" note="new hypothesis" kind="diagram-source" w={132}/>
    <MetapopDeme x={311} y={76} title="REGION B" note="novelty accepted" w={132}/>
    <MetapopDeme x={563} y={115} title="FRONTIER C" note="alternate method" w={132}/>
    <MetapopDeme x={311} y={180} title="REGION D" note="local exploration" w={132}/>
    <Label x={270} y={279} className="diagram-micro">novel candidates cross admitted corridors · receiving region evaluates locally</Label>
  </>;
  if (variant === "balanced") return <>
    <Label x={284} y={43} className="diagram-micro">REGIONAL COVERAGE · EXPLORATION · RECOVERY BALANCED BY POLICY</Label>
    <Link d="M186 121 L312 80 M444 80 L570 121 M186 155 L312 189 M444 189 L570 155 M378 104 V164" className="diagram-link diagram-corridor" markerEnd={false}/>
    <MetapopDeme x={54} y={111} title="DEME A" note="local capability" w={132}/>
    <MetapopDeme x={312} y={54} title="DEME B" note="complementary" kind="diagram-source" w={132}/>
    <MetapopDeme x={570} y={111} title="DEME C" note="local capability" w={132}/>
    <MetapopDeme x={312} y={164} title="DEME D" note="recovery reserve" w={132}/>
    <Node x={302} y={249} w={152} h={40} title="WEIGHTED QUORUM" note="policy-defined" className="diagram-node diagram-gate"/>
  </>;
  if (variant === "resilient") return <>
    <Label x={291} y={43} className="diagram-micro">LOCAL FAILURES · CONTINUITY THROUGH ALTERNATE REGIONS</Label>
    <Link d="M195 116 H316 M448 116 H565 M195 150 L316 187 M448 187 L565 150 M382 140 V160" className="diagram-link diagram-corridor" markerEnd={false}/>
    <MetapopDeme x={63} y={105} title="DEME A" note="critical function" kind="diagram-source" w={132}/>
    <MetapopDeme x={316} y={88} title="DEME B" note="at risk" kind="diagram-failed-route" w={132}/>
    <MetapopDeme x={565} y={105} title="DEME C" note="alternate capability" w={132}/>
    <MetapopDeme x={316} y={160} title="DEME D" note="refuge / recovery" w={132}/>
    <Node x={282} y={249} w={200} h={40} title="EXPLICIT RECOVERY PLAN" note="evidence + budget gates" className="diagram-node diagram-gate"/>
  </>;
  return <>
    <Label x={284} y={43} className="diagram-micro">REGIONAL POPULATIONS · DIRECTED CORRIDORS · LOCAL STATE</Label>
    <Link d="M186 121 L312 80 M444 80 L570 121 M186 155 L312 208 M444 208 L570 155 M378 104 V184" className="diagram-link diagram-corridor" markerEnd={false}/>
    <MetapopDeme x={54} y={111} title="DEME A" note="local work" w={132}/>
    <MetapopDeme x={312} y={54} title="DEME B" note="regional source" kind="diagram-source" w={132}/>
    <MetapopDeme x={570} y={111} title="DEME C" note="local work" w={132}/>
    <MetapopDeme x={312} y={184} title="DEME D" note="regional sink" w={132}/>
    <Label x={280} y={278} className="diagram-micro">patch = opportunity · deme = population · migration requires an admitted corridor</Label>
  </>;
}

function Biome({ variant }: Props) {
  if (variant === "resource") return <>
    <Node x={275} y={20} w={210} h={48} title="MISSION RESOURCE POOL" note="tokens · time · quota · CPU / GPU" className="diagram-node diagram-source"/>
    <Link d="M380 68 V91 H142 V116 M380 91 V116 M380 91 H618 V116" className="diagram-link diagram-resource-flow"/>
    <Node x={43} y={116} w={198} title="RESEARCH NICHE" note="demand + minimum" className="diagram-node diagram-member"/>
    <Node x={281} y={116} w={198} title="COMPUTE NICHE" note="quota + capacity" className="diagram-node diagram-member"/>
    <Node x={519} y={116} w={198} title="VERIFY NICHE" note="evidence reserve" className="diagram-node diagram-member"/>
    <rect x="60" y="184" width="164" height="8" rx="4" className="diagram-budget-track"/><rect x="60" y="184" width="108" height="8" rx="4" className="diagram-budget-fill"/>
    <rect x="298" y="184" width="164" height="8" rx="4" className="diagram-budget-track"/><rect x="298" y="184" width="72" height="8" rx="4" className="diagram-budget-fill"/>
    <rect x="536" y="184" width="164" height="8" rx="4" className="diagram-budget-track"/><rect x="536" y="184" width="94" height="8" rx="4" className="diagram-budget-fill"/>
    <Link d="M142 197 V217 H310 M380 197 V217 M618 197 V217 H450" className="diagram-link diagram-context"/>
    <Node x={292} y={217} w={176} h={48} title="RESERVE + CONSTRAINTS" note="Σ allocation ≤ budget" className="diagram-node diagram-gate"/>
    <Label x={267} y={286} className="diagram-micro">this cycle records yield · it does not learn productivity across missions</Label>
  </>;
  if (variant === "exploration") return <>
    <Label x={273} y={45} className="diagram-micro">PATCH YIELD · CURIOSITY · EVIDENCE ARCHIVE</Label>
    <Link d="M157 145 H184 M326 145 H360 M510 145 H548" className="diagram-link diagram-resource-flow"/>
    <Node x={25} y={119} w={132} title="PATCH A" note="yield below baseline" className="diagram-node diagram-advisory-node"/>
    <Node x={184} y={119} w={142} title="SCOUT" note="curiosity + stagnation" className="diagram-node diagram-source"/>
    <Node x={360} y={119} w={150} title="LEVY STEP" note="local / macro proposal" className="diagram-node diagram-member"/>
    <Node x={548} y={119} w={172} title="PATCH ARCHIVE" note="proof + transfer target" className="diagram-node diagram-gate"/>
    <Label x={263} y={204} className="diagram-edge-label">compare marginal yield with expected environment return</Label>
    <Link d="M634 167 V226 H531" className="diagram-link diagram-context"/>
    <Node x={345} y={226} w={186} h={42} title="WORKER PATCH REQUEST" note="worker performs execution" className="diagram-node diagram-gate"/>
    <Label x={270} y={287} className="diagram-micro">foraging and movement are bounded proposals · patch execution is a worker request</Label>
  </>;
  if (variant === "quality_diversity") return <>
    <Label x={303} y={43} className="diagram-micro">DESCRIPTOR SPACE · ELITE PER CELL</Label>
    <Label x={395} y={67} className="diagram-edge-label">DESCRIPTOR 1 →</Label>
    <Label x={70} y={153} className="diagram-edge-label">DESCRIPTOR 2 ↑</Label>
    {[0,1,2,3].map((col)=><g key={`qd-col-${col}`}>{[0,1,2].map((row)=><rect key={`qd-cell-${row}-${col}`} x={234+col*78} y={82+row*43} width="72" height="37" rx="3" className="diagram-matrix-frame"/>)}</g>)}
    {[{x:258,y:100},{x:362,y:143},{x:492,y:100},{x:520,y:186},{x:285,y:185}].map((dot,i)=><circle key={`qd-elite-${i}`} cx={dot.x} cy={dot.y} r="6" className="diagram-sample-dot"/>)}
    <Label x={245} y={220} className="diagram-micro">local elite · novelty · competition</Label>
    <Node x={60} y={235} w={196} h={44} title="VARIATION QUEUE" note="caller supplies operators" className="diagram-node diagram-source"/>
    <Link d="M256 257 H294 M466 257 H504" className="diagram-link diagram-context"/>
    <Node x={294} y={235} w={172} h={44} title="OFFSPRING" note="mutation / crossover" className="diagram-node diagram-member"/>
    <Node x={504} y={235} w={196} h={44} title="FITNESS EVALUATOR" note="external evidence" className="diagram-node diagram-gate"/>
    <Label x={274} y={293} className="diagram-micro">descriptors and fitness are inputs · the archive preserves diverse candidates</Label>
  </>;
  if (variant === "successional") return <>
    <Label x={284} y={48} className="diagram-micro">POPULATION PHASES ADVANCE ONLY WHEN THEIR GATES PASS</Label>
    <Node x={45} y={126} w={134} title="PIONEER" note="colonize niche" className="diagram-node diagram-member"/>
    <Link d="M179 150 H207"/>
    <Node x={207} y={120} w={116} h={60} title="EVIDENCE GATE" note="proof + yield" className="diagram-node diagram-gate"/>
    <Link d="M323 150 H350"/>
    <Node x={350} y={126} w={134} title="SPECIALIST" note="exploit validated niche" className="diagram-node diagram-source"/>
    <Link d="M484 150 H511"/>
    <Node x={511} y={120} w={116} h={60} title="STABILITY GATE" note="measure supplied" className="diagram-node diagram-gate"/>
    <Link d="M627 150 H652"/>
    <Node x={652} y={126} w={96} title="STABILIZER" note="late phase" className="diagram-node diagram-member"/>
    <Label x={258} y={225} className="diagram-micro">stability evidence missing? transition stays blocked</Label>
    <Label x={282} y={274} className="diagram-micro">each advance_variant call records one bounded phase change</Label>
  </>;
  if (variant === "resilience") return <>
    <Label x={286} y={44} className="diagram-micro">REDUNDANCY · KEYSTONE IMPACT · FUNDED RECOVERY</Label>
    <ellipse cx="380" cy="145" rx="300" ry="86" className="diagram-session-boundary"/>
    <Node x={49} y={108} w={156} title="NICHE A" note="critical function" className="diagram-node diagram-member"/>
    <Node x={302} y={108} w={156} title="KEYSTONE NICHE" note="impact if removed" className="diagram-node diagram-gate"/>
    <Node x={555} y={108} w={156} title="BACKUP NICHE" note="functional redundancy" className="diagram-node diagram-source"/>
    <Link d="M205 132 H302 M458 132 H555" className="diagram-link diagram-corridor" markerEnd={false}/>
    <Node x={57} y={209} w={178} h={42} title="CONFIRMED DISTURBANCE" note="evidence required" className="diagram-node diagram-failed-route"/>
    <Node x={291} y={209} w={178} h={42} title="RECOVERY RESERVE" note="fund refuge / restore" className="diagram-node diagram-invariant"/>
    <Node x={525} y={209} w={178} h={42} title="LOCAL RECOVERY" note="explicit operation" className="diagram-node diagram-gate"/>
    <Link d="M235 230 H291 M469 230 H525" className="diagram-link diagram-context"/>
    <Label x={271} y={281} className="diagram-micro">deletion needs confirmed evidence · recovery reserve is explicit, not a background loop</Label>
  </>;
  if (variant === "persistent") return <>
    <rect x="38" y="57" width="684" height="195" rx="9" className="diagram-session-boundary"/>
    <Label x={61} y={78} className="diagram-micro">PERSISTENCE KEY · RESUME THE SAME ECOLOGICAL SESSION</Label>
    <Node x={57} y={110} w={155} title="MISSION 01" note="niches + populations" className="diagram-node diagram-member"/>
    <Node x={303} y={110} w={155} title="BIOFILM / MEMORY" note="season + evidence" className="diagram-node diagram-gate"/>
    <Node x={548} y={110} w={155} title="MISSION 02" note="resumed state" className="diagram-node diagram-source"/>
    <Link d="M212 134 H303 M458 134 H548" className="diagram-link diagram-trace-network"/>
    <Node x={274} y={193} w={212} h={48} title="RETENTION / DECAY" note="configured session policy" className="diagram-node diagram-advisory-node"/>
    <Link d="M380 158 V193" className="diagram-link diagram-context"/>
    <Label x={272} y={281} className="diagram-micro">persisted history survives between calls · no autonomous seasonal daemon</Label>
  </>;
  if (variant === "open_ended") return <>
    <Label x={281} y={43} className="diagram-micro">BOUNDED CHILD ENVIRONMENTS · VERIFY BEFORE OPENING A NICHE</Label>
    <Node x={34} y={120} w={150} title="CHILD WORLD" note="bounded generation" className="diagram-node diagram-source"/>
    <Link d="M184 144 H218"/>
    <Node x={218} y={120} w={150} title="NOVELTY ARCHIVE" note="candidate environment" className="diagram-node diagram-member"/>
    <Link d="M368 144 H402"/>
    <Node x={402} y={114} w={160} h={60} title="VERIFIER" note="utility + cost + proof" className="diagram-node diagram-gate"/>
    <Link d="M562 144 H596"/>
    <Node x={596} y={120} w={150} title="NEW NICHE" note="opened on evidence" className="diagram-node diagram-member"/>
    <Link d="M480 174 V222 H270" className="diagram-link diagram-reject-path"/>
    <Node x={117} y={222} w={153} h={42} title="NO EVIDENCE" note="do not open niche" className="diagram-node diagram-advisory-node"/>
    <Node x={498} y={222} w={184} h={42} title="STERILE-CYCLE PAUSE" note="after five cycles" className="diagram-node diagram-failed-route"/>
    <Link d="M270 243 H498" className="diagram-link diagram-reject-path"/>
    <Label x={268} y={286} className="diagram-micro">the verifier supplies evidence · repeated sterile search pauses</Label>
  </>;
  if (variant === "adversarial") return <>
    <Label x={284} y={44} className="diagram-micro">ABSTRACT CHALLENGE / DEFENSE · NO REAL ATTACK EXECUTION</Label>
    <rect x="46" y="70" width="274" height="150" rx="9" className="diagram-trust-boundary"/><rect x="440" y="70" width="274" height="150" rx="9" className="diagram-local-boundary"/>
    <Label x={70} y={91} className="diagram-edge-label">CHALLENGE POPULATION</Label><Label x={464} y={91} className="diagram-edge-label">DEFENSE POPULATION</Label>
    <Node x={83} y={116} w={196} title="ABSTRACT SCENARIO" note="bounded challenge" className="diagram-node diagram-adversary"/>
    <Node x={482} y={116} w={196} title="MITIGATION" note="evidence + response" className="diagram-node diagram-defender"/>
    <Link d="M279 140 H342 M418 140 H482" className="diagram-link diagram-attack"/>
    <Node x={342} y={115} w={76} h={54} title="GATE" note="reject exec" className="diagram-node diagram-gate"/>
    <Node x={276} y={239} w={208} h={43} title="COUNTEREXAMPLE ARCHIVE" note="references only" className="diagram-node diagram-source"/>
    <Link d="M180 164 V199 H276 M580 164 V199 H484" className="diagram-link diagram-context"/>
    <Label x={279} y={288} className="diagram-micro">scenario-level coevolution only · payloads and live exploits are excluded</Label>
  </>;
  if (variant === "knowledge") return <>
    <Label x={291} y={44} className="diagram-micro">SOURCE COLLECTIONS ARE NICHES · PROVENANCE STAYS ATTACHED</Label>
    <ellipse cx="380" cy="161" rx="345" ry="90" className="diagram-explore-boundary"/>
    <Node x={57} y={103} w={154} title="SOURCE A" note="freshness + credibility" className="diagram-node diagram-source"/>
    <Node x={303} y={78} w={154} title="SOURCE B" note="duplication check" className="diagram-node diagram-member"/>
    <Node x={549} y={103} w={154} title="SOURCE C" note="contradiction scan" className="diagram-node diagram-member"/>
    <Link d="M211 127 L303 102 M457 102 L549 127" className="diagram-link diagram-evidence-link"/>
    <Node x={279} y={199} w={202} h={46} title="THEME NICHE" note="cross-pollinate with citations" className="diagram-node diagram-gate"/>
    <Link d="M134 151 V174 H279 M380 126 V199 M626 151 V174 H481" className="diagram-link diagram-trace-network"/>
    <Label x={274} y={278} className="diagram-micro">source discovery and verification remain external to the Biome cycle</Label>
  </>;
  if (variant === "compute") return <>
    <Label x={299} y={44} className="diagram-micro">FEASIBILITY → COST / LATENCY / ENERGY RECOMMENDATION</Label>
    <Node x={38} y={112} w={160} title="WORKLOAD" note="memory + parallelism" className="diagram-node diagram-source"/>
    <Link d="M198 136 H235"/>
    <Node x={235} y={104} w={178} h={64} title="RESOURCE PROFILE" note="CPU · GPU · RAM · quota" className="diagram-node diagram-invariant"/>
    <Link d="M413 136 H449"/>
    <Node x={449} y={104} w={160} h={64} title="FEASIBLE OPTIONS" note="locality + migration cost" className="diagram-node diagram-member"/>
    <Link d="M609 136 H640"/>
    <Node x={640} y={112} w={108} title="RANK" note="recommend" className="diagram-node diagram-gate"/>
    <Label x={280} y={216} className="diagram-edge-label">candidate providers: estimated price · latency · energy</Label>
    <Node x={263} y={238} w={234} h={43} title="RECOMMENDATION ONLY" note="does not move worker or call provider" className="diagram-node diagram-advisory-node"/>
    <Label x={278} y={288} className="diagram-micro">placement and provider execution require a separate caller</Label>
  </>;
  if (variant === "multi_scale") return <>
    <Label x={303} y={43} className="diagram-micro">AGGREGATE UP · PROPAGATE CONSTRAINTS DOWN</Label>
    {[{x:48,t:"INDIVIDUALS",n:"local signals"},{x:224,t:"POPULATIONS",n:"fitness + diversity"},{x:400,t:"COMMUNITIES",n:"relationships"},{x:576,t:"ECOSYSTEM",n:"global summary"}].map((item,i)=><g key={item.t}><Node x={item.x} y={90} w={136} title={item.t} note={item.n} className={i===3?"diagram-node diagram-gate":"diagram-node diagram-member"}/>{i<3&&<Link d={`M${item.x+136} 114 H${item.x+176}`} className="diagram-link diagram-context"/>}</g>)}
    <Link d="M644 139 V218 H468 V139 M468 218 H292 V139 M292 218 H116 V139" className="diagram-link diagram-hierarchy-link"/>
    {[{x:83,t:"i₁"},{x:118,t:"i₂"},{x:259,t:"P₁"},{x:294,t:"P₂"},{x:435,t:"C₁"},{x:470,t:"C₂"},{x:611,t:"Σ"},{x:646,t:"↧"}].map((item,i)=><g key={`${item.t}-${i}`}><circle cx={item.x} cy="173" r="11" className="diagram-sample-dot"/><Label x={item.x-3} y={176} className="diagram-edge-label">{item.t}</Label></g>)}
    <Label x={276} y={247} className="diagram-micro">apply only authorized policies at each resolution</Label>
    <Label x={284} y={276} className="diagram-micro">summaries flow upward · constraints flow down · no nested topology generation</Label>
  </>;
  return <>
    <Node x={293} y={20} w={174} title="MISSION ENVIRONMENT" note="resources · signals · evidence" className="diagram-node diagram-source"/>
    <Link d="M380 68 V95 H150 V118 M380 95 V118 M380 95 H610 V118" className="diagram-link diagram-resource-flow"/>
    {[{x:68,t:"NICHE A",n:"specialist work"},{x:310,t:"NICHE B",n:"local population"},{x:550,t:"NICHE C",n:"verification"}].map((item,i)=><g key={item.t}><ellipse cx={item.x+80} cy="179" rx="82" ry="54" className={`diagram-niche niche-${i+1}`}/><Node x={item.x} y={147} w={160} title={item.t} note={item.n} className="diagram-node diagram-member"/></g>)}
    <Node x={288} y={243} w={184} h={42} title="BOUNDED VARIANT CYCLE" note="observe → constrain → verify" className="diagram-node diagram-gate"/>
    <Label x={274} y={296} className="diagram-micro">the caller advances each session cycle · no autonomous ecology loop</Label>
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
    <g className="diagram-stage"><rect x="18" y="299" width="724" height="1"/><text x="22" y="316">{family === "syncytium" ? "DISTRIBUTED TARGET · PARTIAL RUNTIME" : `POLICY STAGE ${String(activeStep + 1).padStart(2, "0")} / ${String(stepCount).padStart(2, "0")}`}</text><text x="738" y="316" textAnchor="end">{variant.replaceAll("_", " ").replaceAll("-", " ").toUpperCase()}</text></g>
  </svg>;
}
