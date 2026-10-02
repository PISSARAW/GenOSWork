export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    version: "1.0.0",
    evaluations: [
      { id: "locomo", status: "REPORTED EVALUATION", route: "/benchmarks" },
      { id: "swe-bench-lite", status: "PARTIAL DATASET EVALUATION", route: "/benchmarks" },
      { id: "agow-diffusion", status: "LOCAL EXPERIMENT · SYNTHETIC", route: "/benchmarks" },
      { id: "planning-policy", status: "LOCAL SUITE · 12 TASKS", route: "/benchmarks" },
    ],
    protocolsWithoutCampaign: ["a-team", "holobiont-longitudinal", "syncytium", "eab"],
    principle: "A score without environment, version, protocol, population, and limits is not comparable.",
  });
}
