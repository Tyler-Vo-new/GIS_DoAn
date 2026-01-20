import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function OccupancyDonut({ rented, total, title = "Phòng đã thuê" }) {
  const empty = Math.max(total - rented, 0);

  const data = [
    { name: "Đã thuê", value: rented },
    { name: "Phòng trống", value: empty },
  ];

  const COLORS = ["#22C55E", "#E5E7EB"];

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title}</div>

      <div style={{ marginTop: 14, width: "100%", height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={70} outerRadius={95} dataKey="value" stroke="none">
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx]} />
              ))}
            </Pie>

            <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle"
              style={{ fontSize: 18, fontWeight: 700, fill: "#111827" }}>
              {rented} / {total}
            </text>

            <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle"
              style={{ fontSize: 18, fontWeight: 600, fill: "#374151" }}>
              {title}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 20, fontSize: 12, color: "#4B5563" }}>
        <LegendItem color="#22C55E" label="Đã thuê" />
        <LegendItem color="#E5E7EB" label="Phòng trống" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 10, height: 10, background: color, display: "inline-block" }} />
      <span>{label}</span>
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
