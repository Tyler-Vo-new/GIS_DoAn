import React, { useMemo, useState } from "react";

export default function DevicesStatusTable({
  rows = [],
  title = "Trạng thái hoạt động thiết bị",
}) {
  const [pageSize] = useState(10);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, safePage, pageSize]);

  function goPage(p) {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
  }

  return (
    <div style={card}>
      <div style={cardHeader}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
          {title}
        </div>
      </div>

      <div style={{ padding: 14 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>THIẾT BỊ</th>
                <th style={th}>STATUS</th>
                <th style={th}>CẢNH BÁO SỰ CỐ</th>
                <th style={th}>RECENT ACTIVITY</th>
              </tr>
            </thead>

            <tbody>
              {pageRows.map((r) => (
                <tr key={r.id}>
                  <td style={td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <DeviceIcon type={r.icon} />
                      <span style={{ fontSize: 13, color: "#111827" }}>
                        {r.deviceName}
                      </span>
                    </div>
                  </td>

                  <td style={td}>
                    <StatusDot status={r.status} />
                  </td>

                  <td style={td}>
                    <span style={badge}>
                      {r.alertText || "Hoạt động bình thường"}
                    </span>
                  </td>

                  <td style={tdMuted}>{r.recent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={footer}>
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            Showing {(safePage - 1) * pageSize + 1} to{" "}
            {Math.min(safePage * pageSize, rows.length)} of {rows.length} entries
          </div>

          <Pagination page={safePage} totalPages={totalPages} onChange={goPage} />
        </div>
      </div>
    </div>
  );
}

/* ---------- sub components ---------- */

function StatusDot({ status }) {
  // ok -> xanh, warn -> cam (giống ảnh)
  const isOk = status === "ok";
  const bg = isOk ? "#DCFCE7" : "#FFEDD5";
  const dot = isOk ? "#22C55E" : "#F97316";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: 999,
        background: bg,
      }}
      title={status}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: dot,
          display: "inline-block",
        }}
      />
    </span>
  );
}

function DeviceIcon({ type }) {
  // icon mini giống ảnh (màu theo type)
  const cfg = {
    "panel-blue": { c: "#0EA5E9" },
    "panel-green": { c: "#22C55E" },
    "panel-red": { c: "#EF4444" },
    cloud: { c: "#6B7280" },
    flame: { c: "#F97316" },
    plug: { c: "#22C55E" },
  }[type] || { c: "#6B7280" };

  return (
    <span
      style={{
        width: 18,
        height: 18,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: cfg.c,
      }}
    >
      {/* SVG icon đơn giản */}
      {type.includes("panel") ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 9h3M8 13h3M14 9h2M14 13h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : type === "cloud" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 11.6 3.5 3.5 0 0 0 7 18Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ) : type === "flame" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22c4 0 7-3 7-7 0-3-2-5-3-6 0 2-1 3-2 4 0-3-2-6-5-9 0 3-2 5-2 8-2 1-3 3-3 5 0 4 3 5 8 5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 2v6m6-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M7 8h10v6a5 5 0 0 1-10 0V8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

function Pagination({ page, totalPages, onChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <button style={pageBtn} onClick={() => onChange(1)} disabled={page === 1}>
        {"<<"}
      </button>
      <button style={pageBtn} onClick={() => onChange(page - 1)} disabled={page === 1}>
        {"<"}
      </button>

      {pages.slice(0, 5).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          style={{
            ...pageBtn,
            background: p === page ? "#4F46E5" : "#F3F4F6",
            color: p === page ? "#fff" : "#111827",
            boxShadow: p === page ? "0 6px 12px rgba(79,70,229,0.25)" : "none",
          }}
        >
          {p}
        </button>
      ))}

      <button style={pageBtn} onClick={() => onChange(page + 1)} disabled={page === totalPages}>
        {">"}
      </button>
      <button style={pageBtn} onClick={() => onChange(totalPages)} disabled={page === totalPages}>
        {">>"}
      </button>
    </div>
  );
}

/* ---------- styles ---------- */

const card = {
  background: "#fff",
  border: "1px solid #EEF2F7",
  borderRadius: 10,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const cardHeader = {
  padding: "14px 16px",
  borderBottom: "1px solid #EEF2F7",
};

const table = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  minWidth: 760,
};

const th = {
  textAlign: "left",
  fontSize: 11,
  letterSpacing: 0.4,
  color: "#6B7280",
  padding: "12px 12px",
  borderBottom: "1px solid #EEF2F7",
  background: "#fff",
  whiteSpace: "nowrap",
};

const td = {
  padding: "12px 12px",
  borderBottom: "1px solid #F1F5F9",
  fontSize: 13,
  color: "#374151",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
};

const tdMuted = { ...td, color: "#6B7280" };

const badge = {
  display: "inline-flex",
  alignItems: "center",
  height: 20,
  padding: "0 10px",
  borderRadius: 999,
  background: "#DCFCE7",
  color: "#16A34A",
  fontSize: 12,
  fontWeight: 600,
};

const footer = {
  marginTop: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
};

const pageBtn = {
  width: 32,
  height: 32,
  borderRadius: 6,
  border: "1px solid #E5E7EB",
  background: "#F3F4F6",
  cursor: "pointer",
};
