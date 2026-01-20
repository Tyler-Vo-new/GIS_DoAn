import "../Styles/Pages/System.css";
import { Gi3dStairs } from "react-icons/gi";
import { useState, useEffect } from "react";
import { FaBolt, FaFan, FaTint } from "react-icons/fa";
import { getAllStorey, createFloor, getShaftsByStorey, getRoomsByStorey, updateConnection, updateShaft, getConnectionsByStorey, getRoomInfoById } from "../api.js";
import SystemPopup from "../Components/SystemPopup.jsx";
import SystemEditPopup from "../Components/SystemEditPopup.jsx";

/* ================== SYSTEM DEFINITIONS ================== */
const SYSTEMS = {
    electricity: {
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

/* ================== STATUS ================== */
const STATUS_STYLE = {
    active: { color: null, glow: null },
    maintenance: { color: "orange", glow: "orange" },
    error: { color: "#000", glow: "red" },
};

/* ================== CORRIDOR ================== */
const CORRIDOR = {
    x1: 180,
    x2: 360,
    y1: 40,
    y2: 880,
};

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
    const [storeys, setStoreys] = useState([]);

    const [rooms, setRooms] = useState([]);
    const [shafts, setShafts] = useState([]);
    const [connections, setConnections] = useState([]);
    const [selectedStorey, setSelectedStorey] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedConnection, setSelectedConnection] = useState(null);

    const [visibleSystems, setVisibleSystems] = useState({
        electricity: true,
        ventilation: true,
        water: true,
    });

    const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 600, h: 900 });
    const [panning, setPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [tooltip, setTooltip] = useState(null);
    const [popup, setPopup] = useState(null);
    const [editPopup, setEditPopup] = useState(null);

    /* ================== LOAD FROM BACKEND ================== */
    useEffect(() => {
        async function loadStoreys() {
            try {
                const data = await getAllStorey();
                setStoreys(data);
                // auto chọn tầng đầu tiên (LƯU OBJECT)
                if (data.length > 0) {
                    setSelectedStorey(data[0].code); // ✅ object
                }
            } catch (err) {
                console.error("Không load được storey", err);
            }
        }

        loadStoreys();
    }, []);


    useEffect(() => { 
        if (!selectedStorey) return;

        getShaftsByStorey(selectedStorey)
            .then(data => {
                setShafts(data.shafts)
            })
            .catch(err => console.error("Không load được shaft", err));
        
        getRoomsByStorey(selectedStorey)
            .then(data => {
                setRooms(data.rooms)
            })
            .catch(err => console.error("Không load được rooms", err));
        
        getConnectionsByStorey(selectedStorey)
            .then(data => {
                setConnections(data.connections)
            })
            .catch(err => console.error("Không load được rooms", err));
    }, [selectedStorey])

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

    function getRoomSystemsStatus(roomId, connections) {
        const result = {};

        connections
            .filter(c => c.room_id === roomId)
            .forEach(c => {
                result[c.system] = c.status;
            });

        return result;
    }

    function statusLabel(status) {
        switch (status) {
            case "active":
                return "Hoạt động";
            case "maintenance":
                return "Bảo trì";
            case "error":
                return "Lỗi";
            default:
                return status;
        }
    }

    function storeyLabel(code) {
        return storeys.find(s => s.code === code)?.label || code;
    }

    async function systemPopupInfo(type, popup) {
        let title = null;
        let room = null;
        let shaft = null;
        let connection = null;
        let s = systemLabel(popup["system"]);
        if (type == "shaft") {
            title = `Trục ${s} chính tầng ${selectedStorey} toà nhà AB`
            shaft = popup.id;
        } else {
            room = await getRoomInfoById(popup.room_id);
            title = `Trục ${s} chính tầng ${selectedStorey} nối Phòng ${room.code}`;
            connection = popup.id
        }
        let statusV = statusLabel(popup.status);
        return {
            "title": title,
            "storey": selectedStorey,
            "room": room,
            "systemE": popup.system,
            "systemV": s,
            "statusE": popup.status,
            "statusV": statusV,
            "shaft": shaft,
            "connection": connection
        }
    }

    async function handleReportIssue(data) {
        if (data.shaft) {
            await updateShaft(data.shaft, "maintenance");

            setShafts(prev =>
                prev.map(s =>
                    s.id === data.shaft
                        ? { ...s, status: "maintenance" }
                        : s
                )
            );
        }

        if (data.connection) {
            await updateConnection(data.connection, "maintenance");

            setConnections(prev =>
                prev.map(c =>
                    c.id === data.connection
                        ? { ...c, status: "maintenance" }
                        : c
                )
            );
        }

        // update popup realtime
        setPopup(prev => ({
            ...prev,
            data: {
                ...prev.data,
                statusE: "maintenance",
                statusV: "Bảo trì"
            }
        }));
    }




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
                        {storeys.map(storey => (
                            <li
                                key={storey.id}
                                className={storey.code === selectedStorey ? "active" : ""}
                                onClick={() => {
                                    clearSelection();
                                    setSelectedStorey(storey.code)
                                }}
                            >
                                {storey.label}
                            </li>
                        ))}
                    </ul>

                    <button
                        style={{
                            margin: "10px",
                            padding: "8px 12px",
                            background: "#1976d2",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                        }}
                        onClick={async () => {
                            if (!window.confirm("Tạo dữ liệu tầng + phòng + trục?")) return;
                            try {
                                await createFloor();
                                alert("Tạo dữ liệu thành công. Reload để xem.");
                            } catch (e) {
                                alert("Lỗi tạo dữ liệu");
                            }
                        }}
                    >
                        ⚙️ Khởi tạo dữ liệu
                    </button>
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
                    {shafts.map(shaft => {
                        const s = SYSTEMS[shaft.system];
                        if (!s) return null;                 // ✅
                        if (!visibleSystems[shaft.system]) return null;

                        const active =
                            !selectedConnection &&
                            !selectedRoom &&
                            selectedSystem === shaft.system;

                        const style = STATUS_STYLE[shaft.status];

                        return (
                            <g key={shaft.id}>
                                {/* HIT AREA */}
                                <line
                                    x1={shaft.x + s.offset}
                                    y1={shaft.y1}
                                    x2={shaft.x + s.offset}
                                    y2={shaft.y2}
                                    stroke="transparent"
                                    strokeWidth={16}
                                    pointerEvents="stroke"
                                    onClick={async e => {
                                        e.stopPropagation();
                                        clearSelection();
                                        setSelectedSystem(shaft.system);
                                        let data = await systemPopupInfo("shaft", shaft)
                                        setPopup({
                                            data: data
                                        })
                                    }}
                                    onMouseEnter={e => {
                                        setTooltip({
                                            x: e.clientX,
                                            y: e.clientY,
                                            title: `Trục ${systemLabel(shaft.system)}`,
                                            lines: [
                                                `Tầng: ${storeyLabel(selectedStorey)}`,
                                                `Tình trạng: ${statusLabel(shaft.status)}`
                                            ]
                                        });
                                    }}
                                    onMouseMove={e => {
                                        setTooltip(t => t && { ...t, x: e.clientX, y: e.clientY });
                                    }}
                                    onMouseLeave={() => setTooltip(null)}

                                />

                                {/* LINE THẬT */}
                                <line
                                    x1={shaft.x + s.offset}
                                    y1={shaft.y1}
                                    x2={shaft.x + s.offset}
                                    y2={shaft.y2}
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
                    {connections.map(conn => {
                        const sys = SYSTEMS[conn.system];
                        if (!sys) return null;
                        if (!visibleSystems[conn.system]) return null;

                        const shaft = shafts.find(s => s.id === conn.shaft_id);

                        const resolvedStatus = resolveConnectionStatus(
                            shaft?.status,
                            conn.status
                        );

                        const style = STATUS_STYLE[resolvedStatus];

                        const isConnectionSelected =
                            selectedConnection?.id === conn.id;

                        const isRoomSelected =
                            !selectedConnection && selectedRoom === conn.room_id;

                        const isSystemSelected =
                            !selectedConnection &&
                            !selectedRoom &&
                            selectedSystem === conn.system;

                        const active =
                            isConnectionSelected || isRoomSelected || isSystemSelected;

                        const d = conn.path
                            .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
                            .join(" ");

                        return (
                            <path
                                key={conn.id}
                                d={d}
                                fill="none"
                                stroke={style.color || sys.color}
                                strokeWidth={active ? 4 : 2}
                                strokeDasharray={sys.dash}
                                style={{
                                    animation:
                                        active && conn.status === "active"
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
                                onClick={async e => {
                                    e.stopPropagation();
                                    setSelectedConnection(conn);
                                    setSelectedRoom(conn.room_id);
                                    setSelectedSystem(conn.system); 
                                    let data = await systemPopupInfo("connection", conn)
                                    setPopup({
                                        data: data
                                    })
                                    
                                }}
                                onMouseEnter={e => {
                                    setTooltip({
                                        x: e.clientX,
                                        y: e.clientY,
                                        title: `Đường ${systemLabel(conn.system)}`,
                                        lines: [
                                            `Room ID: ${conn.room_id}`,
                                            `Tầng: ${storeyLabel(selectedStorey)}`,
                                            `Tình trạng: ${statusLabel(conn.status)}`,
                                        ],
                                    });
                                }}
                                onMouseMove={e => {
                                    setTooltip(t => t && { ...t, x: e.clientX, y: e.clientY });
                                }}
                                onMouseLeave={() => setTooltip(null)}
                            />
                        );
                    })}

                    {/* ================== ROOMS ================== */}
                    {rooms.map(room => (
                        <g
                            key={room.id}
                            onClick={e => {
                                e.stopPropagation();
                                setSelectedRoom(room.id);
                                setSelectedConnection(null);
                            }}
                            onMouseEnter={e => {
                                const systemsStatus = getRoomSystemsStatus(room.id, connections);

                                setTooltip({
                                    x: e.clientX,
                                    y: e.clientY,
                                    title: `Phòng ${room.code}`,
                                    lines: Object.entries(systemsStatus).map(
                                        ([sys, status]) =>
                                            `${systemLabel(sys)}: ${statusLabel(status)}`
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
                                x={room.label_x}
                                y={room.label_y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={13}
                            >
                                {room.code}
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

            <SystemPopup
                popup={popup}
                onClose={() => setPopup(null)}
                onReport={handleReportIssue}
                onEdit={(data) => {
                    setEditPopup({
                        id: data.shaft || data.connection,
                        type: data.shaft ? "shaft" : "connection",
                        data
                    });
                }}
            />
            
            {editPopup && (
                <SystemEditPopup
                    popup={editPopup}
                    onClose={() => setEditPopup(null)}
                    onSubmit={async (status, note) => {
                        if (editPopup.type === "shaft") {
                            await updateShaft(editPopup.id, status, note);
                            setShafts(prev =>
                                prev.map(s =>
                                    s.id === editPopup.id ? { ...s, status } : s
                                )
                            );
                        } else {
                            await updateConnection(editPopup.id, status, note);
                            setConnections(prev =>
                                prev.map(c =>
                                    c.id === editPopup.id ? { ...c, status } : c
                                )
                            );
                        }

                        setEditPopup(null);
                    }}
                />
            )}
            
        </div>
    );
};


export default System;