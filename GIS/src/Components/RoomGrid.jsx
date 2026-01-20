import { Star, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../Styles/Components/RoomGrid.css";

const rooms = [
    {
        id: "P101",
        status: "trống",
        desc: "Phòng cao cấp, 2 phòng ngủ, 50m2",
        tags: ["Ban công", "Full nội thất"],
    },
    {
        id: "P102",
        desc: "Phòng cao cấp, 2 phòng ngủ, 50m2",
        tags: ["Cửa sổ trời", "Máy nóng lạnh"],
    },
    {
        id: "P103",
        desc: "Phòng cao cấp, 2 phòng ngủ, 50m2",
        tags: ["Có gác", "Máy nóng lạnh"],
    },
    {
        id: "P201",
        desc: "Phòng giá rẻ, 1 phòng ngủ, 30m2",
        tags: ["Full nội thất"],
    },
    {
        id: "P202",
        status: "trống",
        desc: "Phòng cao cấp, 2 phòng ngủ, 50m2",
        tags: ["Ban công", "Cửa sổ trời"],
    },
    {
        id: "P203",
        desc: "Phòng giá rẻ, 1 phòng ngủ, 25m2",
        tags: ["Cửa sổ trời"],
    },
];

function Tag({ label }) {
    return <span className={`tag tag-${label.replace(/\s+/g, "-")}`}>{label}</span>;
}

function RoomCard({ room }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/rooms/${room.id}`);
    };

    return (
        <div className="room-card" onClick={handleClick} role="button">
            <div className="room-card-header">
                <h3>
                    {room.id}
                    {room.status && <span className="room-status"> ({room.status})</span>}
                </h3>

                {/* prevent click bubbling for icons if needed */}
                <div
                    className="room-actions"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Star size={18} />
                    <MoreVertical size={18} />
                </div>
            </div>

            <p className="room-desc">{room.desc}</p>

            <div className="room-tags">
                {room.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                ))}
            </div>
        </div>
    );
}

export default function RoomGrid() {
    return (
        <div className="room-grid">
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
        </div>
    );
}
