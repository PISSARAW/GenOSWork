export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.0.0",
    evaluations: [
      { id: "locomo", status: "REPORTED EVALUATION", route: "/benchmarks", question: "Does GenOS memory improve long-conversation factual recall?", environment: "GenOS V3 · Qwen 2.5 Coder 7B · LoCoMo (1,986 questions)" },
      { id: "swe-bench-lite", status: "PARTIAL DATASET EVALUATION", route: "/benchmarks", question: "Can GenOS resolve real bug-fix tasks end to end?", environment: "WSL Ubuntu 24.04 · DeepSeek Coder V2 · 26 of 300 tasks" },
      { id: "agow-diffusion", status: "LOCAL EXPERIMENT · SYNTHETIC", route: "/benchmarks", question: "Does AGOW diffusion change outcomes on synthetic cases?", environment: "Local campaign · Qwen 2.5 Coder 7B · synthetic cases" },
      { id: "planning-policy", status: "LOCAL SUITE · 12 TASKS", route: "/benchmarks", question: "Does the GenOS planning policy beat ReAct, ToT, and MCTS at equal budget?", environment: "Deterministic harness · 12 synthetic tasks · 240-expansion budget" },
    ],
    protocolsWithoutCampaign: ["a-team", "holobiont-longitudinal", "syncytium", "eab"],
    principle: "A score without environment, version, protocol, population, and limits is not comparable.",
  });
}
