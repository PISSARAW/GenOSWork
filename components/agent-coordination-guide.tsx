import Link from "next/link";
import { genosSource } from "@/components/product-evidence";
import "./agent-coordination-guide.css";

type GuideSlug = "signal-plane" | "communication-ecology" | "agent-relationships";
type Language = "fr" | "en";

const sources: Record<GuideSlug, string> = {
  "signal-plane": "docs/01-concepts/signal-plane-zero-text.md",
  "communication-ecology": "docs/02-orchestration/communication.md",
  "agent-relationships": "docs/02-orchestration/relations-inter-agents.md",
};

const channelRows = [
  ["0", "Silence", "Silence", "No new information or action needed", "Rien de nouveau ou d'utile à transmettre"],
  ["1", "Stigmergy", "Stigmergie", "Leave a trace in shared state", "Déposer une trace dans l'environnement partagé"],
  ["2", "Zero-text signal", "Signal zéro texte", "Send a typed event to a receptor", "Envoyer un événement typé à un récepteur"],
  ["3", "Direct structured", "Structuré direct", "Send a contract or fingerprint", "Transmettre un contrat ou une empreinte"],
  ["4", "Compiled dialect", "Dialecte compilé", "Use an agreed symbol", "Utiliser un symbole partagé"],
  ["5", "Micro-utterance", "Énoncé bref", "One verbal turn, capped at 200 tokens", "Un tour verbal, plafonné à 200 tokens"],
  ["6", "Bounded dialogue", "Dialogue borné", "Up to eight turns and 2,000 tokens", "Jusqu'à huit tours et 2 000 tokens"],
  ["7", "Human", "Humain", "Escalate a decision that needs a person", "Demander une décision humaine"],
] as const;

const relationGroups = [
  { en: "Lineage", fr: "Filiation", count: "9", types: "parent · child · sibling · twin · ancestor · descendant · chimera · plasmid · graft", exampleEn: "Who derives from whom?", exampleFr: "Qui dérive de qui ?" },
  { en: "Organizational", fr: "Organisation", count: "8", types: "manager · subordinate · colleague · coworker · mentor · collaborator · client · supplier", exampleEn: "How is work arranged?", exampleFr: "Comment le travail est-il organisé ?" },
  { en: "Collaborative", fr: "Collaboration", count: "3", types: "collaborator · colleague · partner", exampleEn: "Who cooperates on a task?", exampleFr: "Qui coopère sur une tâche ?" },
  { en: "Social", fr: "Social", count: "9", types: "stranger · friend · partner · bonded_partner · neighbor · rival · temporary_ally · guardian · dependent", exampleEn: "What social link is declared?", exampleFr: "Quel lien social est déclaré ?" },
  { en: "Epistemic", fr: "Épistémique", count: "2", types: "verifier · reviewer", exampleEn: "Who checks a claim?", exampleFr: "Qui vérifie une affirmation ?" },
  { en: "Adversarial", fr: "Adversarial", count: "1", types: "adversary", exampleEn: "Who challenges a proposal?", exampleFr: "Qui conteste une proposition ?" },
] as const;

export function isCoordinationGuide(slug: string): slug is GuideSlug {
  return slug in sources;
}

export function AgentCoordinationGuide({ slug, language }: { slug: GuideSlug; language: Language }) {
  const fr = language === "fr";
  const base = fr ? "/fr/concepts" : "/concepts";
  return (
    <section className="section-wrap coordination-guide" aria-label={fr ? "Comprendre la coordination entre agents" : "Understand agent coordination"}>
      <div className="coordination-guide-heading">
        <span>{fr ? "GUIDE EXPLICATIF" : "EXPLAINER"}</span>
        <h2>{slug === "signal-plane" ? (fr ? "Zéro prompt inutile : comment ?" : "How does zero unnecessary prompting work?") : slug === "communication-ecology" ? (fr ? "Comment les agents choisissent-ils un canal ?" : "How do agents choose a channel?") : (fr ? "Quels liens existent entre agents ?" : "What links can agents have?")}</h2>
      </div>

      {slug === "signal-plane" && <>
        <p className="coordination-lead">{fr
          ? "Le principe est de réserver le raisonnement par modèle aux cas qui le nécessitent. Un signal courant peut être validé, acheminé et traité par une règle déterministe, sans conversation entre modèles."
          : "The aim is to reserve model reasoning for cases that need it. A routine signal can be validated, routed and handled by a deterministic rule without a conversation between models."}</p>
        <div className="coordination-flow" aria-label={fr ? "Parcours d'un signal" : "Signal path"}>
          {(fr ? ["Événement typé", "Contrôle + regroupement", "Récepteur compatible ?", "Action directe ou examen d'une escalade"] : ["Typed event", "Validate + coalesce", "Matching receptor?", "Direct action or escalation review"]).map((step, i) => <span key={step}>{i + 1}. {step}</span>)}
        </div>
        <div className="coordination-cards">
          <article><h3>{fr ? "Exemple : aucun appel LLM pour traiter le signal" : "Example: no LLM call to handle the signal"}</h3><p>{fr ? "Un composant publie un signal typé DEPLOY_READY. Un récepteur déjà configuré reconnaît le type et déclenche l'action autorisée. La lecture, le routage et ce déclenchement ne demandent aucun prompt au modèle." : "A component publishes a typed DEPLOY_READY signal. A configured receptor recognizes it and triggers an authorized action. Reading, routing and triggering it need no model prompt."}</p></article>
          <article><h3>{fr ? "Quand un modèle peut intervenir" : "When a model may be used"}</h3><p>{fr ? "Si aucun récepteur ne peut agir, le signal peut être soumis à un contrôle d'utilité avant de créer une tâche cognitive. Et une action wake_worker peut lancer ensuite une mission qui utilise un modèle. Zéro prompt pour le traitement du signal ne signifie donc pas zéro modèle dans toute la mission." : "If no receptor can act, a value gate may assess whether to create a cognitive task. A wake_worker action can also start a mission that later uses a model. Zero prompts for signal handling does not mean zero model use throughout the mission."}</p></article>
        </div>
        <p className="coordination-note">{fr ? "Le signal transporte une indication, pas une preuve finale : réception, compréhension, action et vérification sont des étapes distinctes." : "A signal carries an indication, not final proof: delivery, understanding, action and verification are separate steps."}</p>
      </>}

      {slug === "communication-ecology" && <>
        <p className="coordination-lead">{fr ? "Avant d'envoyer quoi que ce soit, la politique examine la nécessité, les destinataires, l'encodage et le coût. Elle peut choisir le silence. Sinon, elle utilise un canal adapté à la quantité d'information et à la preuve de réception attendue." : "Before sending anything, policy considers necessity, recipients, encoding and cost. It can choose silence. Otherwise it selects a channel suited to the information and the required evidence of reception."}</p>
        <div className="coordination-table-wrap"><table><thead><tr><th>{fr ? "Niveau" : "Level"}</th><th>{fr ? "Canal" : "Channel"}</th><th>{fr ? "À quoi il sert" : "Use"}</th></tr></thead><tbody>{channelRows.map(([level, en, french, useEn, useFr]) => <tr key={level}><td>{level}</td><th scope="row">{fr ? french : en}</th><td>{fr ? useFr : useEn}</td></tr>)}</tbody></table></div>
        <div className="coordination-cards">
          <article><h3>{fr ? "Exemple" : "Example"}</h3><p>{fr ? "Un worker termine une sous-tâche connue : un signal typé ou un handoff structuré peut suffire. Si les agents ne partagent pas le sens d'un terme, un court échange verbal peut devenir nécessaire. Une décision sensible peut remonter à l'humain." : "A worker finishes a known subtask: a typed signal or structured handoff may suffice. If agents disagree on a term's meaning, a short verbal exchange may be needed. A sensitive decision may go to a person."}</p></article>
          <article><h3>{fr ? "Ce que la livraison ne prouve pas" : "What delivery does not prove"}</h3><p>{fr ? "La réception technique d'un message ne prouve ni compréhension ni exécution correcte. Les accusés peuvent progresser de la livraison vers la compréhension, l'action, la vérification et, si nécessaire, la confirmation humaine." : "Technical delivery proves neither understanding nor correct execution. Acknowledgment can progress from transport through meaning, action, verification and, where required, human confirmation."}</p></article>
        </div>
        <p className="coordination-note">{fr ? "Le document GenOS qualifie l'intégration générale de partielle : tous les checkpoints de mission ne sont pas raccordés en production et le coût réel en tokens n'est pas automatiquement mesuré pour chaque cycle." : "GenOS documents overall integration as partial: not every mission checkpoint is wired in production, and real token use is not automatically measured for every cycle."}</p>
      </>}

      {slug === "agent-relationships" && <>
        <p className="coordination-lead">{fr ? "Une relation est un lien typé et orienté d'un agent source vers un agent cible. Elle décrit une filiation, une structure de travail ou un contexte de coopération. Elle peut aider au routage et à l'interprétation, mais n'envoie aucun message à elle seule." : "A relationship is a typed, directed edge from one source agent to a target agent. It describes lineage, work structure or a cooperation context. It can inform routing and interpretation, but does not send a message by itself."}</p>
        <div className="coordination-example"><code>agent A → verifier → agent B</code><p>{fr ? "Cette arête indique un rôle de vérification déclaré. Elle ne prouve pas que B a réellement vérifié le résultat, et ne lui accorde aucune permission supplémentaire." : "This edge declares a verification role. It does not prove that B checked a result or grant B any additional permission."}</p></div>
        <div className="coordination-table-wrap"><table><thead><tr><th>{fr ? "Classe" : "Class"}</th><th>{fr ? "Nombre" : "Count"}</th><th>{fr ? "Question" : "Question"}</th><th>{fr ? "Types déclarés" : "Declared types"}</th></tr></thead><tbody>{relationGroups.map((group) => <tr key={group.en}><th scope="row">{fr ? group.fr : group.en}</th><td>{group.count}</td><td>{fr ? group.exampleFr : group.exampleEn}</td><td><code>{group.types}</code></td></tr>)}</tbody></table></div>
        <p className="coordination-note">{fr ? "Les classes totalisent 32 appartenances pour 29 types uniques : colleague, collaborator et partner figurent chacun dans deux classes. Les valeurs initiales de familiarité, confiance ou indépendance sont des profils déclarés, pas des mesures vérifiées." : "The classes contain 32 memberships across 29 unique types: colleague, collaborator and partner each occur in two classes. Initial familiarity, trust and independence values are declared profiles, not verified measurements."}</p>
        <div className="coordination-cards">
          <article><h3>{fr ? "Relation ≠ autorité" : "Relationship ≠ authority"}</h3><p>{fr ? "Une arête manager ou guardian ne change pas les permissions, le budget ou les limites du workspace. Ces pouvoirs relèvent d'autres contrats d'exécution." : "A manager or guardian edge does not change permissions, budget or workspace boundaries. Those powers come from separate execution contracts."}</p></article>
          <article><h3>{fr ? "Relation ≠ communication" : "Relationship ≠ communication"}</h3><p>{fr ? "Le registre garde le lien dans le temps. Un signal, un message ou un handoff est un événement de communication. Une relation peut exister sans échange ; un échange peut se produire sans relation persistée." : "The registry stores the durable link. A signal, message or handoff is a communication event. A relationship can exist without an exchange, and an exchange can occur without a stored relationship."}</p></article>
        </div>
      </>}

      <div className="coordination-footer">
        <a href={genosSource(sources[slug])} target="_blank" rel="noreferrer">{fr ? "Lire la documentation technique de référence ↗" : "Read the pinned technical source ↗"}</a>
        <Link href={`${base}/${slug === "signal-plane" ? "communication-ecology" : slug === "communication-ecology" ? "agent-relationships" : "signal-plane"}`}>{fr ? "Explorer le concept suivant →" : "Explore the next concept →"}</Link>
      </div>
    </section>
  );
}
