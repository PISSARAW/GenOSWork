import { ImageResponse } from "next/og";

export const alt = "GenOS — open-source agent runtime and work continuity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f2efe5",
          color: "#201f29",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, letterSpacing: 4 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "#201f29", display: "flex", alignItems: "center", justifyContent: "center", color: "#d9f279", fontSize: 27, fontWeight: 700 }}>G</div>
          <span>GENOS · OPEN-SOURCE AGENT RUNTIME</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
          <div style={{ fontSize: 72, lineHeight: 1.08, fontWeight: 700 }}>Keep the work legible over time.</div>
          <div style={{ fontSize: 27, color: "#5c5965" }}>Decisions, changes, execution context, and evidence in one durable record.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 15, fontSize: 19, letterSpacing: 2 }}>
          {[
            ["CONTEXT", "#d9f279"],
            ["DECISION", "#e9a56d"],
            ["CHANGE", "#c7b8e8"],
            ["REVIEW", "#d9f279"],
          ].map(([label, color], index) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 15 }}>
              <div style={{ padding: "13px 18px", borderRadius: 8, background: color, fontWeight: 700 }}>{label}</div>
              {index < 3 ? <span style={{ color: "#8c8992" }}>→</span> : null}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
