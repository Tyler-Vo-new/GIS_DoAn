import { useState } from "react";

const System = () => {
    /* ================== STATE ================== */
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [visibleSystems, setVisibleSystems] = useState({
        electric: true,
        ventilation: true,
        water: true,
    });

    const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 600, h: 900 });
    const [tooltip, setTooltip] = useState(null);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });

    /* ================== DATA ================== */
    const SYSTEMS = {
        electric: { color: "red", dash: "6,4", offset: -6, label: "Điện" },
        ventilation: { color: "green", dash: "4,4", offset: 0, label: "Thông gió" },
        water: { color: "blue", dash: "", offset: 6, label: "Nước" },
    };

    const rooms = [
        { id: "P101", x: 40, y: 700, w: 120, h: 70 },
        { id: "P102", x: 40, y: 610, w: 120, h: 70 },
        { id: "P103", x: 40, y: 520, w: 120, h: 70 },
        { id: "P111", x: 420, y: 700, w: 120, h: 70 },
        { id: "P112", x: 420, y: 610, w: 120, h: 70 },
        { id: "P113", x: 420, y: 520, w: 120, h: 70 },
    ];

    const mainShaftX = 300;

    const connections = rooms.flatMap(room => {
        const centerY = room.y + room.h / 2;
        const roomEdgeX =
            room.x < mainShaftX ? room.x + room.w : room.x;

        return Object.keys(SYSTEMS).map(system => ({
            roomId: room.id,
            system,
            points: [
                [mainShaftX + SYSTEMS[system].offset, centerY],
                [roomEdgeX, centerY],
            ],
        }));
    });

    /* ================== HANDLERS ================== */
    const toggleSystem = sys =>
        setVisibleSystems(s => ({ ...s, [sys]: !s[sys] }));

    const zoom = factor =>
        setViewBox(v => ({
            ...v,
            w: v.w * factor,
            h: v.h * factor,
        }));
    
    const onMouseDown = e => {
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
    };

    const onMouseMove = e => {
        if (!isPanning) return;

        const dx = (panStart.x - e.clientX) * (viewBox.w / 600);
        const dy = (panStart.y - e.clientY) * (viewBox.h / 900);

        setViewBox(v => ({
            ...v,
            x: v.x + dx,
            y: v.y + dy,
        }));

        setPanStart({ x: e.clientX, y: e.clientY });
    };

    const onMouseUp = () => setIsPanning(false);

    /* ================== RENDER ================== */
    return (
        <div>
            {/* ===== CONTROLS ===== */}
            <div style={{ marginBottom: 10 }}>
                {Object.entries(SYSTEMS).map(([key, sys]) => (
                    <label key={key} style={{ marginRight: 15 }}>
                        <input
                            type="checkbox"
                            checked={visibleSystems[key]}
                            onChange={() => toggleSystem(key)}
                        />{" "}
                        <span style={{ color: sys.color }}>{sys.label}</span>
                    </label>
                ))}

                <button onClick={() => zoom(0.8)}>➕ Zoom</button>
                <button onClick={() => zoom(1.25)} style={{ marginLeft: 5 }}>
                    ➖ Zoom
                </button>
            </div>

            {/* ===== SVG ===== */}
            <svg
                width="600"
                height="900"
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                style={{ cursor: isPanning ? "grabbing" : "grab" }}
            >
                {/* ===== MAIN SHAFT ===== */}
                {Object.entries(SYSTEMS).map(
                    ([key, sys]) =>
                        visibleSystems[key] && (
                            <line
                                key={key}
                                x1={mainShaftX + sys.offset}
                                y1={50}
                                x2={mainShaftX + sys.offset}
                                y2={850}
                                stroke={sys.color}
                                strokeWidth={3}
                                strokeDasharray={sys.dash}
                            />
                        )
                )}

                {/* ===== CONNECTIONS ===== */}
                {connections.map((c, i) => {
                    const highlight = selectedRoom === c.roomId;

                    if (!visibleSystems[c.system]) return null;

                    return (
                        <polyline
                            key={i}
                            points={c.points.map(p => p.join(",")).join(" ")}
                            fill="none"
                            stroke={SYSTEMS[c.system].color}
                            strokeWidth={highlight ? 4 : 2}
                            strokeDasharray={SYSTEMS[c.system].dash}
                            opacity={selectedRoom && !highlight ? 0.2 : 1}
                            onMouseEnter={e =>
                                setTooltip({
                                    x: e.clientX,
                                    y: e.clientY,
                                    text: `${c.roomId} – ${SYSTEMS[c.system].label}`,
                                })
                            }
                            onMouseLeave={() => setTooltip(null)}
                        />
                    );
                })}

                {/* ===== ROOMS ===== */}
                {rooms.map(room => (
                    <g
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        style={{ cursor: "pointer" }}
                    >
                        <rect
                            x={room.x}
                            y={room.y}
                            width={room.w}
                            height={room.h}
                            fill={
                                selectedRoom === room.id ? "#ffd966" : "#e6f0ff"
                            }
                            stroke="#7aa2ff"
                            strokeWidth={2}
                        />
                        <text
                            x={room.x + room.w / 2}
                            y={room.y + room.h / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={14}
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
