export type ConceptSlug = "maladies" | "memoire" | "cortex" | "ontogenese" | "ontologie";
export type ConceptDiagram = "clinical" | "memory" | "cortex" | "ontogenesis" | "ontology";

export type Concept = {
  slug: ConceptSlug;
  number: string;
  title: string;
  eyebrow: string;
  intro: string;
  status: string;
  statusTone: "green" | "amber" | "purple";
  diagram: ConceptDiagram;
  diagramTitle: string;
  diagramDescription: string;
  steps: { title: string; body: string }[];
  scopeTitle: string;
  scope: string;
  source: string;
  sourceLabel: string;
};

export const concepts: Concept[] = [
  {
    slug: "maladies", number: "01", title: "Failure modes", eyebrow: "COMPUTATIONAL PATHOLOGY",
    intro: "GenOS models potential failures in an agent system: excessive alerts, cross-workspace contamination, unintended intervention effects, or degraded performance.",
    status: "Clinical model · partially connected", statusTone: "amber", diagram: "clinical",
    diagramTitle: "Monitor, isolate, reassess",
    diagramDescription: "A monitor collects signals, an evaluator classifies the issue, a bounded measure is applied, and the resulting state is checked.",
    steps: [
      { title: "Observe", body: "Track the simulated clinical state, budgets, alerts, and propagation signals." },
      { title: "Classify", body: "Classify the failure as autoimmune, nosocomial, iatrogenic, or degenerative." },
      { title: "Contain", body: "Depending on the case, isolate a workspace, reduce an alert, or correct an excessive intervention." },
      { title: "Verify", body: "Measure the new state and decide whether to reintegrate, take another action, or stop." },
    ],
    scopeTitle: "A software analogy, not a medical tool",
    scope: "These “diseases” describe simulated agent states and their governance mechanisms. They are not human diseases, and GenOS does not diagnose or treat people. The documentation notes that only some primitives and effects are connected; the other scenarios remain proposals.",
    source: "01-concepts/nosologie/pathologie-et-medecine.md", sourceLabel: "Computational pathology and medicine",
  },
  {
    slug: "memoire", number: "02", title: "Memory", eyebrow: "EXPERIENCE · RETRIEVAL · CONSOLIDATION",
    intro: "GenOS memory helps retrieve useful experiences, connect decisions, and avoid known dead ends. It combines detailed episodes with indexed facts and provenance signals.",
    status: "Implemented · multiple mechanisms", statusTone: "green", diagram: "memory",
    diagramTitle: "From experience to retrieval",
    diagramDescription: "Experiences and knowledge are indexed, ranked by relevance, and recalled to inform a mission. Consolidation and pruning cycles maintain the corpus.",
    steps: [
      { title: "Encode", body: "Episodic memory preserves the context, action, observation, and outcome of an experience." },
      { title: "Index", body: "Facts and decisions can be found through lexical and vector search." },
      { title: "Rank", body: "Retrieval combines similarity, lexical match, recency, credibility, and success or failure signals." },
      { title: "Consolidate", body: "Plasticity adjusts some links; consolidation and pruning limit low-value memories." },
    ],
    scopeTitle: "Retrieval is a selection, not proof",
    scope: "Memory can inform a decision, but recalling an item does not make it true. GenOS preserves provenance and distinguishes experience, retrieval score, and independent verification.",
    source: "01-concepts/memoire-et-apprentissage.md", sourceLabel: "Memory and learning",
  },
  {
    slug: "cortex", number: "03", title: "Cortex", eyebrow: "AN ARCHITECTURAL METAPHOR",
    intro: "In GenOS, “cortex” describes some retrieval and association functions. It does not mean a unified artificial brain: these mechanisms are distributed across indexes, memories, agents, and controllers.",
    status: "Documented analogy · explicit limits", statusTone: "purple", diagram: "cortex",
    diagramTitle: "A distributed retrieval function",
    diagramDescription: "A request searches episodic and semantic memories; ranking prepares recalled context for an agent, whose output is then checked.",
    steps: [
      { title: "Receive a request", body: "A mission or question provides the search context." },
      { title: "Search memories", body: "Lexical and vector indexes find related episodes, facts, and decisions." },
      { title: "Assemble context", body: "Ranked results are provided to the agent with their provenance." },
      { title: "Check the output", body: "The agent produces a response or action that remains subject to its own verification requirements." },
    ],
    scopeTitle: "Not a simulation of the human brain",
    scope: "The documentation presents cortex, hippocampus, and synapse imagery as design analogies. They do not establish neurobiological equivalence, perception, or subjective experience. Semantic search is a software retrieval function.",
    source: "01-concepts/memoire-et-apprentissage.md", sourceLabel: "Semantic memory and the cortex analogy",
  },
  {
    slug: "ontogenese", number: "04", title: "Ontogenesis", eyebrow: "PROJECT CONTINUITY",
    intro: "Ontogenesis is the resident controller that follows a project between missions: it selects a task, starts a bounded run, examines evidence, and coordinates integration or resumption.",
    status: "Partial · loop and states connected", statusTone: "amber", diagram: "ontogenesis",
    diagramTitle: "A loop of verified missions",
    diagramDescription: "The project plans, executes, verifies, and integrates a mission. Failure returns to planning; a constraint can put the loop on hold.",
    steps: [
      { title: "Plan", body: "Choose an eligible backlog task based on dependencies, priorities, and budgets." },
      { title: "Execute", body: "Delegate a bounded mission to the GenOS runtime and preserve its state." },
      { title: "Verify", body: "Examine the evidence; without enough evidence, return the mission to planning." },
      { title: "Integrate and reassess", body: "Integrate an accepted result, record failures, and choose what to do next or wait for an event." },
    ],
    scopeTitle: "The controller is not a living organism",
    scope: "The development analogy describes a project moving through software states and resource constraints. The documentation marks Ontogenesis as partial: the loop, selection policies, and persistence mechanisms exist, but transparent recovery for every scenario is not guaranteed.",
    source: "01-concepts/ontogenese.md", sourceLabel: "Ontogenesis: resident project controller",
  },
  {
    slug: "ontologie", number: "05", title: "Ontology", eyebrow: "ENTITIES · RELATIONS · POSSIBLE WORLDS",
    intro: "The operational ontology provides structures for describing entities, identity criteria, relationships, and hypothetical scenarios. It supports analysis without deciding on its own what should be executed.",
    status: "Bounded analysis · non-executing", statusTone: "purple", diagram: "ontology",
    diagramTitle: "Describe before acting",
    diagramDescription: "Entities and properties structure a question; relationships or possible worlds can be analyzed with provenance and uncertainty without triggering an action.",
    steps: [
      { title: "Define", body: "Describe an entity with explicit properties and identity criteria." },
      { title: "Connect", body: "Record a relationship or continuity observation between entities." },
      { title: "Explore", body: "Build and compare possible worlds with stated assumptions." },
      { title: "Qualify", body: "Present the analysis with provenance and uncertainty; hypothetical worlds remain unverified." },
    ],
    scopeTitle: "Analysis does not validate reality",
    scope: "Ontology operations describe or compare hypothetical structures. They do not grant authorization, promote a result, or prove that a scenario occurred in the real world.",
    source: "03-reference/ontologie-operationnelle.md", sourceLabel: "Operational ontology contract",
  },
];

export function getConcept(slug: string) {
  return concepts.find((concept) => concept.slug === slug);
}
