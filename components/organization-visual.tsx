import type { CSSProperties } from "react";
import type { Organization } from "@/components/organizations";
import { organizationGuides } from "@/components/organization-guides";

const points: Record<string, [number, number][]> = {
  hub: [[24, 35], [76, 14], [76, 35], [76, 56]], blind: [[25, 19], [75, 19], [25, 51], [75, 51]], redblue: [[25, 35], [75, 20], [75, 50]], brier: [[18, 35], [48, 18], [48, 52], [82, 35]], quorum: [[18, 35], [42, 17], [42, 35], [42, 53], [82, 35]], trails: [[13, 16], [43, 24], [72, 14], [25, 51], [58, 47], [87, 56]], boids: [[20, 20], [48, 17], [75, 25], [34, 48], [67, 50]], fish: [[17, 18], [26, 49], [73, 15], [82, 48], [51, 35]], slime: [[15, 18], [49, 14], [83, 18], [24, 51], [70, 53]], wolves: [[17, 16], [17, 35], [17, 54], [49, 23], [49, 47], [82, 35]], mycelium: [[14, 35], [40, 17], [42, 52], [72, 17], [75, 51], [91, 34]], roles: [[16, 47], [36, 38], [56, 29], [78, 18]], energy: [[18, 35], [50, 35], [82, 16], [82, 35], [82, 54]], silence: [[18, 35], [47, 35], [78, 35]], arena: [[18, 16], [18, 54], [50, 16], [50, 54], [82, 16], [82, 54]], hierarchy: [[50, 15], [28, 38], [72, 38], [17, 57], [39, 57], [61, 57], [83, 57]], recovery: [[22, 18], [22, 51], [78, 18], [78, 51]], memory: [[17, 18], [17, 35], [17, 52], [51, 35], [83, 35]],
};

const edges: Record<string, [number, number][]> = {
  hub: [[0, 1], [0, 2], [0, 3]], blind: [[0, 1], [2, 3]], redblue: [[0, 1], [0, 2], [1, 2]], brier: [[0, 1], [0, 2], [1, 3], [2, 3]], quorum: [[0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [3, 4]], trails: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [1, 4]], boids: [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4]], fish: [[0, 4], [1, 4], [2, 4], [3, 4]], slime: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 2], [1, 4]], wolves: [[0, 3], [1, 3], [2, 4], [3, 5], [4, 5]], mycelium: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5]], roles: [[0, 1], [1, 2], [2, 3]], energy: [[0, 1], [1, 2], [1, 3], [1, 4]], silence: [[0, 1], [1, 2]], arena: [[0, 2], [1, 3], [2, 4], [3, 5]], hierarchy: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]], recovery: [[0, 2], [1, 3]], memory: [[0, 3], [1, 3], [2, 3], [3, 4]],
};

const colors: Partial<Record<Organization["visual"], string>> = { redblue: "#dc8151", brier: "var(--rust)", quorum: "#178b73", trails: "#178b73", boids: "#dc8151", fish: "var(--rust)", slime: "#178b73", wolves: "var(--rust)", mycelium: "#178b73", roles: "#dc8151", energy: "var(--rust)", silence: "#797780", arena: "#dc8151", recovery: "var(--rust)", memory: "var(--rust)" };

export function OrganizationVisual({ organization, language = "en" }: { organization: Organization; language?: "en" | "fr" }) {
  const nodes = points[organization.visual];
  const lines = edges[organization.visual];
  const accent = colors[organization.visual] ?? "var(--rust)";
  return (
    <svg className="organization-visual" viewBox="0 0 100 70" role="img" aria-label={language === "fr" ? `${organizationGuides[organization.id].nameFr}: ${organizationGuides[organization.id].formula}` : `${organization.name}: ${organization.algorithm}`}>
      {lines.map(([from, to], index) => <line key={`e${index}`} x1={nodes[from][0]} y1={nodes[from][1]} x2={nodes[to][0]} y2={nodes[to][1]} />)}
      {organization.visual === "blind" && <g className="visual-veil"><path d="M50 8v54" /><text x="50" y="39" textAnchor="middle">{language === "fr" ? "AVEUGLE" : "BLIND"}</text></g>}
      {organization.visual === "silence" && <g className="visual-silence"><path d="M39 18l22 34m0-34L39 52" /></g>}
      {nodes.map(([cx, cy], index) => <circle key={`n${index}`} cx={cx} cy={cy} r={organization.visual === "hub" && index === 0 ? 5 : 3.5} className={index === 0 ? "visual-node-primary" : ""} style={{ "--visual-accent": accent } as CSSProperties} />)}
    </svg>
  );
}
