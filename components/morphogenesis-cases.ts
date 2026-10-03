export type GraphNode = {
  id: string;
  label: string;
  kind: "input" | "operator" | "topology" | "gate" | "outcome";
  x: number;
  y: number;
  note?: string;
};

export type GraphEdge = { from: string; to: string; label?: string };

export type MorphogenesisCase = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  scenario: string;
  recipe: string;
  operators: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
  why: string[];
  boundary: string;
};

export const morphogenesisCases: MorphogenesisCase[] = [
  {
    slug: "revue-de-changement",
    number: "01",
    title: "Independent change review",
    shortTitle: "Change review",
    summary: "Review a patch through two distinct paths, then begin integration only after an explicit check.",
    scenario: "A team wants to evaluate a code change without mistaking a persuasive analysis for sufficient evidence. Two parallel branches produce separate reports; an explicit condition then determines what happens next.",
    recipe: "SEQUENCE(PARALLEL(Trinity, Rhizome), GATE(Rhizome, A-Team, Trinity))",
    operators: ["PARALLEL", "GATE", "SEQUENCE"],
    nodes: [
      { id: "sequence", label: "SEQUENCE", kind: "operator", x: 70, y: 160, note: "step order" },
      { id: "parallel", label: "PARALLEL", kind: "operator", x: 245, y: 160, note: "step 1" },
      { id: "trinity", label: "Trinity", kind: "topology", x: 420, y: 85, note: "candidates" },
      { id: "rhizome", label: "Rhizome", kind: "topology", x: 420, y: 225, note: "exploration" },
      { id: "gate", label: "GATE", kind: "gate", x: 535, y: 160, note: "step 2" },
      { id: "condition", label: "Rhizome", kind: "topology", x: 710, y: 55, note: "condition" },
      { id: "accept", label: "A-Team", kind: "topology", x: 710, y: 150, note: "if true" },
      { id: "revise", label: "Trinity", kind: "topology", x: 710, y: 245, note: "if false" },
    ],
    edges: [
      { from: "sequence", to: "parallel", label: "step 1" }, { from: "sequence", to: "gate", label: "step 2" },
      { from: "parallel", to: "trinity" }, { from: "parallel", to: "rhizome" },
      { from: "gate", to: "condition" }, { from: "gate", to: "accept", label: "then" }, { from: "gate", to: "revise", label: "else" },
    ],
    why: ["Parallel branches finish before the next step and each keeps its own execution receipt; receipts are traces, not proof.", "The gate has three explicit children: a conditional topology, followed by the then and else branches.", "The condition inspects the previous output; only the selected branch runs."],
    boundary: "This composition follows the pattern covered by the SEQUENCE(PARALLEL, GATE, A-Team) test, with Rhizome as the condition and A-Team/Trinity as branches. A receipt records graph activity; supply evidence separately for the gate. Configure the condition and its expression for the mission; topology controllers remain simplified.",
  },
  {
    slug: "migration-de-donnees",
    number: "02",
    title: "Migration with ordered steps",
    shortTitle: "Data migration",
    summary: "Prepare, check several risks in parallel, then submit the next step to a promotion decision.",
    scenario: "Before a migration, prepare the plan, independently review the schema and data, then decide whether the candidate meets the release conditions. A negative condition can route the mission to fallback analysis.",
    recipe: "SEQUENCE(A-Team, PARALLEL(Trinity, Syncytium), GATE(Biocenosis, A-Team, Trinity))",
    operators: ["SEQUENCE", "PARALLEL", "GATE"],
    nodes: [
      { id: "sequence", label: "SEQUENCE", kind: "operator", x: 70, y: 190, note: "declared order" },
      { id: "plan", label: "A-Team", kind: "topology", x: 230, y: 70, note: "step 1 · prepare" },
      { id: "parallel", label: "PARALLEL", kind: "operator", x: 230, y: 185, note: "step 2" },
      { id: "gate", label: "GATE", kind: "gate", x: 230, y: 315, note: "step 3" },
      { id: "schema", label: "Trinity", kind: "topology", x: 430, y: 125, note: "plan review" },
      { id: "state", label: "Syncytium", kind: "topology", x: 430, y: 205, note: "state / invariants" },
      { id: "condition", label: "Biocenosis", kind: "topology", x: 430, y: 320, note: "condition" },
      { id: "accept", label: "A-Team", kind: "topology", x: 635, y: 275, note: "if true" },
      { id: "revise", label: "Trinity", kind: "topology", x: 635, y: 380, note: "if false" },
    ],
    edges: [
      { from: "sequence", to: "plan", label: "step 1" }, { from: "sequence", to: "parallel", label: "step 2" }, { from: "sequence", to: "gate", label: "step 3" },
      { from: "parallel", to: "schema" }, { from: "parallel", to: "state" },
      { from: "gate", to: "condition" }, { from: "gate", to: "accept", label: "then" }, { from: "gate", to: "revise", label: "else" },
    ],
    why: ["SEQUENCE makes preparation, checks, and the conditional decision visible.", "Trinity and Syncytium are children of PARALLEL; their outputs feed the next step.", "The gate names the condition and both executable branches."],
    boundary: "This example describes a composition and its possible decisions. It does not run a real migration; a Biocenose ballot must be supplied explicitly, and plugins remain subject to their contracts.",
  },
  {
    slug: "analyse-imbriquee",
    number: "03",
    title: "Nested analysis inside a team",
    shortTitle: "Nested analysis",
    summary: "Delegate a difficult question to a local graph, then return its result to a host team.",
    scenario: "An architecture review spans several domains. The host team keeps the work on track and frames a sub-analysis that compares two paths before returning its results.",
    recipe: "NEST(A-Team, PARALLEL(Trinity, Rhizome))",
    operators: ["NEST", "PARALLEL"],
    nodes: [
      { id: "nest", label: "NEST", kind: "operator", x: 90, y: 180, note: "host + subgraph" },
      { id: "host", label: "A-Team", kind: "topology", x: 290, y: 95, note: "host" },
      { id: "parallel", label: "PARALLEL", kind: "operator", x: 290, y: 250, note: "inner graph" },
      { id: "trinity", label: "Trinity", kind: "topology", x: 495, y: 205, note: "options" },
      { id: "rhizome", label: "Rhizome", kind: "topology", x: 495, y: 295, note: "exploration" },
    ],
    edges: [
      { from: "nest", to: "host" }, { from: "nest", to: "parallel", label: "inner graph" },
      { from: "parallel", to: "trinity" }, { from: "parallel", to: "rhizome" },
    ],
    why: ["NEST expresses a boundary between the host role and the inner graph.", "The parallel subgraph keeps results separate until its join barrier.", "A host team can integrate the local result into the wider mission."],
    boundary: "This is the pattern covered by the NEST(A-Team, PARALLEL(Trinity, Rhizome)) composition proof. Nesting does not automatically make every topology capability or advanced service available.",
  },
  {
    slug: "promotion-sous-gate",
    number: "04",
    title: "Gate-controlled promotion",
    shortTitle: "Promotion gate",
    summary: "Make both outcomes of a check visible: continue integration or reopen analysis based on the condition.",
    scenario: "A decision record must compare the evidence received against a stated condition. The graph then selects either an integration branch or a review branch.",
    recipe: "GATE(Biocenosis, A-Team, Trinity)",
    operators: ["GATE"],
    nodes: [
      { id: "gate", label: "GATE", kind: "gate", x: 130, y: 170, note: "conditional selection" },
      { id: "condition", label: "Biocenosis", kind: "topology", x: 370, y: 65, note: "condition" },
      { id: "promote", label: "A-Team", kind: "topology", x: 370, y: 165, note: "branche then" },
      { id: "rework", label: "Trinity", kind: "topology", x: 370, y: 265, note: "branche else" },
    ],
    edges: [
      { from: "gate", to: "condition" }, { from: "gate", to: "promote", label: "condition true" }, { from: "gate", to: "rework", label: "condition false" },
    ],
    why: ["GATE takes three explicit children: a condition topology, a then branch, and an else branch.", "Only the selected branch runs; its identifier and decision appear in an execution receipt, which is not itself evidence.", "Define the condition from mission data; the gate does not infer a business threshold on its own."],
    boundary: "The gate is a graph decision based on its inputs. By itself, it is not human approval, deployment, or a guarantee of correctness.",
  },
];
