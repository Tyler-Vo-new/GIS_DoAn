import React, { useMemo, useState } from "react";

export default function RoomsTable({ rows = [], title = "Danh sách phòng" }) {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | pending

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((r) => {
      const matchesSearch =
        !q ||
        r.id.toLowerCase().includes(q) ||
        (r.tenantName || "").toLowerCase().includes(q) ||
        (r.tenantEmail || "").toLowerCase().includes(q);

      const matchesStatus = statusFilter === "all" ? true : r.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pageRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  function goPage(p) {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
  }

  return (
    <div style={card}>
      <div style={cardHeader}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>{title}</div>
      </div>

      <div style={{ padding: 14 }}>
        {/* Toolbar */}
        <div style={toolbar}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: "#6B7280" }}>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              style={select}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search Invoice"
              style={input}
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              style={select}
            >
              <option value="all">Invoice Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead>
              <tr>
                <th style={{ ...th, width: 34 }}>
                  <input type="checkbox" />
                </th>
                <th style={th}>#</th>
                <th style={th}>STATUS</th>
                <th style={th}>KHÁCH THUÊ</th>
                <th style={th}>THANH TOÁN</th>
                <th style={th}>NGÀY THUÊ</th>
                <th style={th}>NGÀY TRẢ PHÒNG</th>
                <th style={{ ...th, textAlign: "center", width: 120 }}>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {pageRows.map((r) => (
                <tr key={r.id} style={tr}>
                  <td style={td}>
                    <input type="checkbox" />
                  </td>

                  <td style={{ ...td, color: "#4F46E5", fontWeight: 600 }}>{r.id}</td>

                  <td style={td}>
                    <StatusDot status={r.status} />
                  </td>

                  <td style={td}>
                    {r.tenantName ? (
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <img
                          src={r.avatar}
                          alt=""
                          style={{ width: 28, height: 28, borderRadius: "999px" }}
                        />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>
                            {r.tenantName}
                          </div>
                          <div style={{ fontSize: 12, color: "#6B7280" }}>{r.tenantEmail}</div>
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: "#9CA3AF" }}>—</span>
                    )}
                  </td>

                  <td style={td}>{r.payment || <span style={{ color: "#9CA3AF" }}>—</span>}</td>
                  <td style={td}>{r.rentDate || <span style={{ color: "#9CA3AF" }}>—</span>}</td>
                  <td style={td}>{r.returnDate || <span style={{ color: "#9CA3AF" }}>—</span>}</td>

                  <td style={{ ...td, textAlign: "center" }}>
                    <ActionIcons />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={footer}>
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            Showing {(safePage - 1) * pageSize + 1} to{" "}
            {Math.min(safePage * pageSize, filtered.length)} of {filtered.length} entries
          </div>

          <Pagination page={safePage} totalPages={totalPages} onChange={goPage} />
        </div>
      </div>
    </div>
  );
}

function StatusDot({ status }) {
  const isActive = status === "active";
  const bg = isActive ? "#DCFCE7" : "#FFEDD5";
  const dot = isActive ? "#22C55E" : "#F97316";

  return (
    <span
      title={status}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 22,
        height: 22,
        borderRadius: "999px",
        background: bg,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "999px",
          background: dot,
          display: "inline-block",
        }}
      />
    </span>
  );
}

function ActionIcons() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#6B7280" }}>
      {/* trash */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 6h18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 6V4h8v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 6l1 16h10l1-16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      {/* eye */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      {/* dots */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 6h.01M12 12h.01M12 18h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
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

/* styles */
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

const toolbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  marginBottom: 12,
};

const input = {
  height: 34,
  padding: "0 10px",
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  outline: "none",
  fontSize: 12,
  width: 170,
};

const select = {
  height: 34,
  padding: "0 10px",
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  outline: "none",
  fontSize: 12,
  background: "#fff",
};

const table = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  minWidth: 900,
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

const tr = {
  background: "#fff",
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
