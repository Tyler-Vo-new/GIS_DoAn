import { useState } from "react";

/* ================== CONSTANTS ================== */
const SVG_WIDTH = 600;
const SVG_HEIGHT = 900;
const MAIN_SHAFT_X = 300;

/* ================== SYSTEM LAYERS ================== */
const SYSTEMS = {
    electric: {
        color: "#d32f2f",
        dash: "6,4",
        offset: -10,
        slot: -10,
        label: "Điện",
    },
    ventilation: {
        color: "#388e3c",
        dash: "4,4",
        offset: 0,
        slot: 0,
        label: "Thông gió",
    },
    water: {
        color: "#1976d2",
        dash: "",
        offset: 10,
        slot: 10,
        label: "Nước",
    },
};

/* ================== ROOM → SYSTEM RULE ENGINE ================== */
const ROOM_SYSTEMS = {
    P101: ["electric", "water"],
    P102: ["electric", "ventilation"],
    P103: ["electric", "water"],
    P104: ["electric", "ventilation", "water"],
    P105: ["electric"],
    P106: ["electric", "water"],

    P107: ["electric", "ventilation"],
    P108: ["electric"],
    P109: ["electric", "water"],
    P110: ["electric", "ventilation"],

    P111: ["electric", "water"],
    P112: ["electric"],
    P113: ["electric", "ventilation"],
    P114: ["electric", "water"],
    P115: ["electric"],

    P116: ["electric", "water"],
    P117: ["electric"],
    P118: ["electric", "ventilation"],
    P119: ["electric"],
};

/* ================== ROOMS (POLYGON JSON) ================== */
/* Toạ độ được dựng theo đúng bố cục hình bạn gửi */
const ROOMS = [
    // ===== LEFT TOP =====
    {
        id: "P106",
        points: [[40, 60], [180, 60], [180, 150], [40, 150]],
        label: { x: 110, y: 105 },
    },
    {
        id: "P105",
        points: [[40, 150], [180, 150], [180, 240], [40, 240]],
        label: { x: 110, y: 195 },
    },
    {
        id: "P104",
        points: [
            [40, 240],
            [180, 240],
            [180, 280],
            [150, 280],
            [150, 320],
            [40, 320],
        ],
        label: { x: 110, y: 280 },
    },
    {
        id: "P103",
        points: [[40, 320], [180, 320], [180, 400], [40, 400]],
        label: { x: 110, y: 360 },
    },
    {
        id: "P102",
        points: [[40, 400], [180, 400], [180, 480], [40, 480]],
        label: { x: 110, y: 440 },
    },
    {
        id: "P101",
        points: [[40, 480], [180, 480], [180, 570], [40, 570]],
        label: { x: 110, y: 525 },
    },

    // ===== RIGHT TOP =====
    {
        id: "P107",
        points: [[360, 60], [500, 60], [500, 150], [360, 150]],
        label: { x: 430, y: 105 },
    },
    {
        id: "P108",
        points: [[360, 150], [500, 150], [500, 240], [360, 240]],
        label: { x: 430, y: 195 },
    },
    {
        id: "P109",
        points: [
            [360, 240],
            [500, 240],
            [500, 320],
            [390, 320],
            [390, 280],
            [360, 280],
        ],
        label: { x: 430, y: 280 },
    },
    {
        id: "P110",
        points: [[360, 320], [500, 320], [500, 400], [360, 400]],
        label: { x: 430, y: 360 },
    },

    // ===== RIGHT BOTTOM =====
    {
        id: "P111",
        points: [[360, 400], [500, 400], [500, 500], [360, 500]],
        label: { x: 430, y: 450 },
    },
    {
        id: "P112",
        points: [[360, 500], [500, 500], [500, 580], [360, 580]],
        label: { x: 430, y: 540 },
    },
    {
        id: "P113",
        points: [[360, 580], [500, 580], [500, 660], [360, 660]],
        label: { x: 430, y: 620 },
    },
    {
        id: "P114",
        points: [[360, 660], [500, 660], [500, 740], [360, 740]],
        label: { x: 430, y: 700 },
    },
    {
        id: "P115",
        points: [[360, 740], [500, 740], [500, 820], [360, 820]],
        label: { x: 430, y: 780 },
    },

    // ===== LEFT BOTTOM =====
    {
        id: "P119",
        points: [[40, 580], [180, 580], [180, 660], [40, 660]],
        label: { x: 110, y: 620 },
    },
    {
        id: "P118",
        points: [[40, 660], [180, 660], [180, 740], [40, 740]],
        label: { x: 110, y: 700 },
    },
    {
        id: "P117",
        points: [[40, 740], [180, 740], [180, 820], [40, 820]],
        label: { x: 110, y: 780 },
    },
    {
        id: "P116",
        points: [[40, 820], [180, 820], [180, 900], [40, 900]],
        label: { x: 110, y: 860 },
    },
];

/* ================== GEOMETRY HELPERS ================== */

// điểm kết nối tại phòng (tách slot)
function getRoomPort(room, systemKey) {
    const xs = room.points.map(p => p[0]);
    const ys = room.points.map(p => p[1]);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const midY = (Math.min(...ys) + Math.max(...ys)) / 2;

    const isLeft = maxX < MAIN_SHAFT_X;

    return {
        x: isLeft ? maxX : minX,
        y: midY + SYSTEMS[systemKey].slot,
        dir: isLeft ? -1 : 1,
    };
}

// path elbow 90°
function buildElbowPath(start, port) {
    const midX = start.x + port.dir * 30;

    return `
        M ${start.x} ${start.y}
        L ${midX} ${start.y}
        L ${midX} ${port.y}
        L ${port.x} ${port.y}
    `;
}


/* ================== MAIN COMPONENT ================== */
const System = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [visibleSystems, setVisibleSystems] = useState({
        electric: true,
        ventilation: true,
        water: true,
    });

    const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 600, h: 900 });
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [tooltip, setTooltip] = useState(null);

    /* ================== PAN / ZOOM ================== */
    const onMouseDown = e => {
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
    };

    const onMouseMove = e => {
        if (!isPanning) return;
        const dx = (panStart.x - e.clientX) * (viewBox.w / SVG_WIDTH);
        const dy = (panStart.y - e.clientY) * (viewBox.h / SVG_HEIGHT);

        setViewBox(v => ({ ...v, x: v.x + dx, y: v.y + dy }));
        setPanStart({ x: e.clientX, y: e.clientY });
    };

    const onWheel = e => {
        e.preventDefault();
        const factor = e.deltaY > 0 ? 1.1 : 0.9;
        setViewBox(v => ({
            x: v.x + (v.w * (1 - factor)) / 2,
            y: v.y + (v.h * (1 - factor)) / 2,
            w: v.w * factor,
            h: v.h * factor,
        }));
    };

    /* ================== RENDER ================== */
    return (
        <div>
            {/* ===== TOGGLES ===== */}
            {Object.entries(SYSTEMS).map(([k, s]) => (
                <label key={k} style={{ marginRight: 15 }}>
                    <input
                        type="checkbox"
                        checked={visibleSystems[k]}
                        onChange={() =>
                            setVisibleSystems(v => ({ ...v, [k]: !v[k] }))
                        }
                    />{" "}
                    <span style={{ color: s.color }}>{s.label}</span>
                </label>
            ))}

            {/* ===== SVG ===== */}
            <svg
                width={SVG_WIDTH}
                height={SVG_HEIGHT}
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={() => setIsPanning(false)}
                onMouseLeave={() => setIsPanning(false)}
                onWheel={onWheel}
                style={{ border: "1px solid #ccc", cursor: "grab" }}
            >
                {/* ===== SHAFT ===== */}
                {Object.entries(SYSTEMS).map(
                    ([k, s]) =>
                        visibleSystems[k] && (
                            <line
                                key={k}
                                x1={MAIN_SHAFT_X + s.offset}
                                y1={40}
                                x2={MAIN_SHAFT_X + s.offset}
                                y2={880}
                                stroke={s.color}
                                strokeWidth={3}
                                strokeDasharray={s.dash}
                            />
                        )
                )}

                {/* ===== CONNECTIONS ===== */}
                {ROOMS.flatMap(room =>
                    (ROOM_SYSTEMS[room.id] || []).map(sys => {
                        if (!visibleSystems[sys]) return null;

                        const port = getRoomPort(room, sys);
                        const start = {
                            x: MAIN_SHAFT_X + SYSTEMS[sys].offset,
                            y: port.y,
                        };

                        return (
                            <path
                                key={`${room.id}-${sys}`}
                                d={buildElbowPath(start, port)}
                                fill="none"
                                stroke={SYSTEMS[sys].color}
                                strokeWidth={selectedRoom === room.id ? 4 : 2}
                                strokeDasharray={SYSTEMS[sys].dash}
                                strokeLinejoin="round"
                                opacity={
                                    selectedRoom && selectedRoom !== room.id
                                        ? 0.2
                                        : 1
                                }
                                onMouseEnter={e =>
                                    setTooltip({
                                        x: e.clientX,
                                        y: e.clientY,
                                        text: `${room.id} – ${SYSTEMS[sys].label}`,
                                    })
                                }
                                onMouseLeave={() => setTooltip(null)}
                            />
                        );
                    })
                )}

                {/* ===== ROOMS ===== */}
                {ROOMS.map(room => (
                    <g
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        style={{ cursor: "pointer" }}
                    >
                        <polygon
                            points={room.points.map(p => p.join(",")).join(" ")}
                            fill={
                                selectedRoom === room.id
                                    ? "#ffe082"
                                    : "#e3f2fd"
                            }
                            stroke="#1565c0"
                            strokeWidth={2}
                        />
                        <text
                            x={room.label.x}
                            y={room.label.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={13}
                        >
                            {room.id}
                        </text>
                    </g>
                ))}
            </svg>

            {/* ===== TOOLTIP ===== */}
            {tooltip && (
                <div
                    style={{
                        position: "fixed",
                        top: tooltip.y + 10,
                        left: tooltip.x + 10,
                        background: "#333",
                        color: "#fff",
                        padding: "4px 8px",
                        fontSize: 12,
                        borderRadius: 4,
                        pointerEvents: "none",
                    }}
                >
                    {tooltip.text}
                </div>
            )}
        </div>
    );
};

export default System;
