import React from "react";

export default function FloorOccupancyBars({ title = "Thuê phòng theo tầng", rows = [] }) {
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title}</div>

      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        {rows.map((r) => {
          const pct = r.total > 0 ? Math.round((r.rented / r.total) * 100) : 0;
          return (
            <div key={r.floorLabel} style={{ display: "grid", gridTemplateColumns: "72px 1fr 56px", gap: 12, alignItems: "center" }}>
              <div style={{ fontSize: 14, color: "#374151" }}>{r.floorLabel}</div>

              <div style={{ height: 12, background: "#E5E7EB", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "#22C55E", borderRadius: 999 }} />
              </div>

              <div style={{ textAlign: "right", fontSize: 14, color: "#374151" }}>
                {r.rented} / {r.total}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  border: "1px solid #E5E7EB",
  borderRadius: 16,
  padding: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const titleStyle = { fontSize: 18, fontWeight: 700, color: "#374151" };
