import "../Styles/Pages/System.css";
import { Gi3dStairs } from "react-icons/gi";
import { useState, useMemo } from "react";
import { FaBolt , FaFan, FaTint } from "react-icons/fa";

/* ================== SYSTEM DEFINITIONS ================== */
const SYSTEMS = {
    electric: {
        color: "#d32f2f",
        dash: "8,2",
        offset: -10,
        slot: -12,
        label: "Điện",
        animate: true,
        icon: FaBolt
    },
    ventilation: {
        color: "#388e3c",
        dash: "8,2",
        offset: 0,
        slot: 0,
        label: "Thông gió",
        animate: true,
        icon: FaFan
    },
    water: {
        color: "#1976d2",
        dash: "8,2",
        offset: 10,
        slot: 12,
        label: "Nước",
        animate: true,
        icon: FaTint
    },
};

function systemLabel(sys) {
    return SYSTEMS[sys]?.label || sys;
}

function storeyLabel(id) {
    return STOREYS.find(s => s.id === id)?.label || id;
}
/* ================== STATUS ================== */
const STATUS_STYLE = {
    active: { color: null, glow: null },
    maintenance: { color: "orange", glow: "orange" },
    error: { color: "#000", glow: "red" },
};

/* ================== SHAFT STATE (mock Django) ================== */
const SHAFT_STATE = {
    electric: "active",
    ventilation: "active",
    water: "active",
}

/* ================== ROOMS (POLYGONS) ================== */
const ROOMS = [
    {
        id: "P106",
        points: [[40, 60], [180, 60], [180, 150], [40, 150]],
        label: { x: 110, y: 105 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P105",
        points: [[40, 150], [180, 150], [180, 240], [40, 240]],
        label: { x: 110, y: 195 },
        systems: { electric: "active", water: "maintenance", ventilation: "active" },
    },
    {
        id: "P104",
        points: [[40, 240], [180, 240], [180, 280], [150, 280], [150, 320], [40, 320]],
        label: { x: 110, y: 280 },
        systems: { electric: "error", water: "active", ventilation: "active" },
    },
    {
        id: "P103",
        points: [[40, 320], [180, 320], [180, 400], [40, 400]],
        label: { x: 110, y: 360 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P102",
        points: [[40, 400], [180, 400], [180, 480], [40, 480]],
        label: { x: 110, y: 440 },
        systems: { electric: "active", water: "active", ventilation: "maintenance" },
    },
    {
        id: "P101",
        points: [[40, 480], [180, 480], [180, 570], [40, 570]],
        label: { x: 110, y: 525 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    
    {
        id: "P107",
        points: [[360, 60], [500, 60], [500, 150], [360, 150]],
        label: { x: 430, y: 105 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P108",
        points: [[360, 150], [500, 150], [500, 240], [360, 240]],
        label: { x: 430, y: 195 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P109",
        points: [[360, 240], [500, 240], [500, 320], [390, 320], [390, 280], [360, 280]],
        label: { x: 430, y: 280 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P110",
        points: [[360, 320], [500, 320], [500, 400], [360, 400]],
        label: { x: 430, y: 360 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },

    {
        id: "P111",
        points: [[360, 400], [500, 400], [500, 500], [360, 500]],
        label: { x: 430, y: 450 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P112",
        points: [[360, 500], [500, 500], [500, 580], [360, 580]],
        label: { x: 430, y: 540 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P113",
        points: [[360, 580], [500, 580], [500, 660], [360, 660]],
        label: { x: 430, y: 620 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P114",
        points: [[360, 660], [500, 660], [500, 740], [360, 740]],
        label: { x: 430, y: 700 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P115",
        points: [[360, 740], [500, 740], [500, 820], [360, 820]],
        label: { x: 430, y: 780 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },

    {
        id: "P119",
        points: [[40, 580], [180, 580], [180, 660], [40, 660]], label: { x: 110, y: 620 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P118",
        points: [[40, 660], [180, 660], [180, 740], [40, 740]],
        label: { x: 110, y: 700 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P117",
        points: [[40, 740], [180, 740], [180, 820], [40, 820]],
        label: { x: 110, y: 780 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
    {
        id: "P116",
        points: [[40, 820], [180, 820], [180, 900], [40, 900]],
        label: { x: 110, y: 860 },
        systems: { electric: "active", water: "active", ventilation: "active" },
    },
];

const STOREYS = [
    { id: "B1", label: "Tầng hầm Tòa AB" },
    { id: "F1", label: "Tầng 1 Tòa AB" },
    { id: "F2", label: "Tầng 2 Tòa AB" },
    { id: "F3", label: "Tầng 3 Tòa AB" },
    { id: "F4", label: "Tầng 4 Tòa AB" },
];


/* ================== CORRIDOR ================== */
const CORRIDOR = {
    x1: 180,
    x2: 360,
    y1: 40,
    y2: 880,
};

const MAIN_SHAFT_X = (CORRIDOR.x1 + CORRIDOR.x2) / 2;

/* ================== GEOMETRY HELPERS ================== */
function getRoomPort(room, systemKey) {
    const xs = room.points.map(p => p[0]);
    const ys = room.points.map(p => p[1]);
    const isLeft = Math.max(...xs) < MAIN_SHAFT_X;

    return {
        x: isLeft ? Math.max(...xs) : Math.min(...xs),
        y: (Math.min(...ys) + Math.max(...ys)) / 2 + SYSTEMS[systemKey].slot,
        dir: isLeft ? 1 : -1,
    };
}

function getCorridorPort(room, systemKey) {
    const ys = room.points.map(p => p[1]);
    const isLeft = Math.max(...room.points.map(p => p[0])) < MAIN_SHAFT_X;

    return {
        x: isLeft ? CORRIDOR.x1 : CORRIDOR.x2,
        y: (Math.min(...ys) + Math.max(...ys)) / 2 + SYSTEMS[systemKey].slot,
        dir: isLeft ? 1 : -1,
    };
}

function buildPath(roomPort, corridorPort, shaftX) {
    const elbowX = corridorPort.x + corridorPort.dir * 20;
    return `
        M ${roomPort.x} ${roomPort.y}
        L ${elbowX} ${roomPort.y}
        L ${elbowX} ${corridorPort.y}
        L ${corridorPort.x} ${corridorPort.y}
        L ${shaftX} ${corridorPort.y}
    `;
}

function resolveConnectionStatus(shaftStatus, roomStatus) {
    if (shaftStatus === "error") return "error";
    if (shaftStatus === "maintenance") return "maintenance";
    return roomStatus; // shaft active
}

/* ================== COLOR RESOLUTION ================== */
function deriveShaftStatus(rooms, system) {
    const states = rooms.map(r => r.systems[system]);
    if (states.includes("error")) return "error";
    if (states.includes("maintenance")) return "maintenance";
    return "active";
}

/* ================== COMPONENT ================== */

const System = () => {
    const [selectedStorey, setSelectedStorey] = useState("F1");
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedConnection, setSelectedConnection] = useState(null);

    const [visibleSystems, setVisibleSystems] = useState({
        electric: true,
        ventilation: true,
        water: true,
    });

    const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 600, h: 900 });
    const [panning, setPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });

    const shaftStatus = SHAFT_STATE;
    const [tooltip, setTooltip] = useState(null);

    /* ================== PAN / ZOOM ================== */
    const onMouseDown = e => {
        e.preventDefault();
        setPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
    };

    const onMouseMove = e => {
        if (!panning) return;

        const dx = panStart.x - e.clientX;
        const dy = panStart.y - e.clientY;

        setViewBox(v => ({
            ...v,
            x: v.x + dx,
            y: v.y + dy,
        }));

        setPanStart({ x: e.clientX, y: e.clientY });
    };

    const onMouseUp = () => setPanning(false);

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

    /* ================== CLEAR SELECTION ================== */
    const clearSelection = () => {
        setSelectedRoom(null);
        setSelectedSystem(null);
        setSelectedConnection(null);
    };

    return (
        <div className="sysWrapper">
            <div className="leftPanel">
                <div className="sStore">
                    <label>
                        <Gi3dStairs className="sIcon" />
                        <p>Danh sách tầng</p>
                    </label>
                </div>

                <div className="sSelection">
                    <h3>Danh sách Tầng</h3>
                    <ul className="storeyList">
                        {STOREYS.map(storey => (
                            <li
                                key={storey.id}
                                className={storey.id === selectedStorey ? "active" : ""}
                                onClick={() => setSelectedStorey(storey.id)}
                            >
                                {storey.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="rightPanel">
                {/* ================== SYSTEM TOGGLE ================== */}
                <div className="sIcons">
                    {Object.entries(SYSTEMS).map(([k, s]) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={k}
                                onClick={() =>
                                    setVisibleSystems(v => ({ ...v, [k]: !v[k] }))
                                }
                                style={{ cursor: "pointer", marginRight: 15 }}
                            >
                                <Icon
                                    size={42}
                                    color={visibleSystems[k] ? s.color : "#ccc"}
                                />
                                <span>{s.label}</span>
                            </div>
                        );
                    })}
                </div>

                {/* ================== SVG ================== */}
                <svg
                    width="100%"
                    height="100%"
                    viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    onWheel={onWheel}
                    onClick={clearSelection}
                    style={{ cursor: panning ? "grabbing" : "grab" }}
                >
                    <defs>
                        <style>{`
                            @keyframes flowDown {
                                to { stroke-dashoffset: 1000; }
                            }
                        `}</style>
                    </defs>

                    {/* ================== CORRIDOR ================== */}
                    <rect
                        x={CORRIDOR.x1}
                        y={CORRIDOR.y1}
                        width={CORRIDOR.x2 - CORRIDOR.x1}
                        height={CORRIDOR.y2 - CORRIDOR.y1}
                        fill="#f5f5f5"
                        stroke="#bbb"
                        strokeDasharray="6,4"
                        onClick={e => {
                            e.stopPropagation();
                            clearSelection();
                        }}
                    />

                    {/* ================== SHAFTS ================== */}
                    {Object.entries(SYSTEMS).map(([sys, s]) => {
                        if (!visibleSystems[sys]) return null;

                        const active =
                            !selectedConnection &&
                            !selectedRoom &&
                            selectedSystem === sys;

                        const style = STATUS_STYLE[shaftStatus[sys]];

                        return (
                            <g>
                                {/* HIT AREA (vô hình nhưng dễ hover) */}
                                <line
                                    x1={MAIN_SHAFT_X + s.offset}
                                    y1={40}
                                    x2={MAIN_SHAFT_X + s.offset}
                                    y2={880}
                                    stroke="transparent"
                                    strokeWidth={16}
                                    pointerEvents="stroke"
                                    onClick={e => { e.stopPropagation(); setSelectedSystem(sys); setSelectedRoom(null); setSelectedConnection(null); }}
                                    onMouseEnter={e => {
                                        setTooltip({
                                            x: e.clientX,
                                            y: e.clientY,
                                            title: `Trục ${systemLabel(sys)} chính`,
                                            lines: [
                                                `Tầng: ${storeyLabel(selectedStorey)}`,
                                                `Tình trạng: ${shaftStatus[sys]}`
                                            ]
                                        });
                                    }}
                                    onMouseMove={e => { setTooltip(t => t && { ...t, x: e.clientX, y: e.clientY }); }}
                                    onMouseLeave={() => setTooltip(null)}
                                />

                                {/* LINE THẬT */}
                                <line
                                    x1={MAIN_SHAFT_X + s.offset}
                                    y1={40}
                                    x2={MAIN_SHAFT_X + s.offset}
                                    y2={880}
                                    stroke={style.color || s.color}
                                    strokeWidth={active ? 6 : 3}
                                    strokeDasharray={s.dash}
                                    style={{
                                        animation: active ? "flowDown 20s linear infinite" : "none",
                                        filter: style.glow
                                            ? `drop-shadow(0 0 6px ${style.glow})`
                                            : "none",
                                    }}
                                />
                            </g>
                        );
                    })}

                    {/* ================== CONNECTIONS ================== */}
                    {ROOMS.flatMap(room =>
                        Object.keys(SYSTEMS).map(sys => {
                            if (!visibleSystems[sys]) return null;

                            const r = getRoomPort(room, sys);
                            const c = getCorridorPort(room, sys);
                            const shaftX = MAIN_SHAFT_X + SYSTEMS[sys].offset;

                            const finalStatus = resolveConnectionStatus(
                                shaftStatus[sys],
                                room.systems[sys]
                            );

                            const isConnectionSelected =
                                selectedConnection &&
                                selectedConnection.roomId === room.id &&
                                selectedConnection.system === sys;

                            const isRoomSelected =
                                !selectedConnection && selectedRoom === room.id;

                            const isSystemSelected =
                                !selectedConnection &&
                                !selectedRoom &&
                                selectedSystem === sys;

                            const active =
                                isConnectionSelected ||
                                isRoomSelected ||
                                isSystemSelected;

                            const style = STATUS_STYLE[finalStatus];

                            return (
                                <path
                                    key={`${room.id}-${sys}`}
                                    d={buildPath(r, c, shaftX)}
                                    fill="none"
                                    stroke={style.color || SYSTEMS[sys].color}
                                    strokeWidth={active ? 4 : 2}
                                    strokeDasharray={SYSTEMS[sys].dash}
                                    style={{
                                        animation:
                                            active && finalStatus === "active"
                                                ? "flowDown 20s linear infinite"
                                                : "none",
                                        filter:
                                            isConnectionSelected
                                                ? "drop-shadow(0 0 6px rgba(0,0,0,0.6))"
                                                : style.glow
                                                    ? `drop-shadow(0 0 4px ${style.glow})`
                                                    : "none",
                                        opacity:
                                            selectedConnection && !isConnectionSelected
                                                ? 0.2
                                                : 1,
                                        cursor: "pointer",
                                    }}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setSelectedConnection({
                                            roomId: room.id,
                                            system: sys,
                                        });
                                        setSelectedRoom(room.id);
                                        setSelectedSystem(sys);
                                    }}

                                    onMouseEnter={e => {
                                        setTooltip({
                                            x: e.clientX,
                                            y: e.clientY,
                                            title: `Đường ${systemLabel(sys)}`,
                                            lines: [
                                                `Trục chính → ${room.id}`,
                                                `Tầng: ${storeyLabel(selectedStorey)}`,
                                                `Tình trạng: ${finalStatus}`
                                            ]
                                        });
                                    }}
                                    onMouseMove={e => {
                                        setTooltip(t => t && { ...t, x: e.clientX, y: e.clientY });
                                    }}
                                    onMouseLeave={() => setTooltip(null)}
                                />
                            );
                        })
                    )}

                    {/* ================== ROOMS ================== */}
                    {ROOMS.map(room => (
                        <g
                            key={room.id}
                            onClick={e => {
                                e.stopPropagation();
                                setSelectedRoom(room.id);
                                setSelectedConnection(null);
                            }}
                            onMouseEnter={e => {
                                setTooltip({
                                    x: e.clientX,
                                    y: e.clientY,
                                    title: `Phòng ${room.id}`,
                                    lines: Object.entries(room.systems).map(
                                        ([sys, st]) => `${systemLabel(sys)}: ${st}`
                                    )
                                });
                            }}
                            onMouseLeave={() => setTooltip(null)}
                        >
                            <polygon
                                points={room.points.map(p => p.join(",")).join(" ")}
                                fill={selectedRoom === room.id ? "#ffe082" : "#e3f2fd"}
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
                {tooltip && (
                    <div
                        style={{
                            position: "fixed",
                            top: tooltip.y + 12,
                            left: tooltip.x + 12,
                            background: "#1e1e1e",
                            color: "#fff",
                            padding: "8px 12px",
                            fontSize: 13,
                            borderRadius: 6,
                            pointerEvents: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                            maxWidth: 260,
                        }}
                    >
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>
                            {tooltip.title}
                        </div>
                        {tooltip.lines.map((l, i) => (
                            <div key={i} style={{ opacity: 0.9 }}>
                                {l}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default System;