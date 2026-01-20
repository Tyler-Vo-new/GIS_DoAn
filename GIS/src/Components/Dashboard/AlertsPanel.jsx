import React from "react";

export default function AlertsPanel({ items = [] }) {
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((it) => (
          <div key={it.id} style={innerCard}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={iconBox}>⚠</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{it.title}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>Thông tin sự cố</div>
                </div>
              </div>

              <div style={{ fontSize: 12, fontWeight: 700, color: "#16A34A" }}>{it.statusText}</div>
            </div>

            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
              <Field label="Thời gian sự cố" value={it.timeLabel} />
              <Field label="Khu vực ảnh hưởng" value={it.areaLabel} />
              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="Thông tin sự cố" value={it.detail} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "#6B7280" }}>{label}</div>
      <div style={{ color: "#111827" }}>{value}</div>
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

const innerCard = {
  border: "1px solid #E5E7EB",
  borderRadius: 12,
  padding: 14,
  background: "#fff",
};

const iconBox = {
  width: 32,
  height: 32,
  borderRadius: 10,
  background: "#FFFBEB",
  color: "#D97706",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
};
