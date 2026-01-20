import { useState, useMemo } from "react";
import { FaMapMarkerAlt, FaDoorOpen, FaSearch } from "react-icons/fa";
import "../Styles/Components/RoomSidebar.css";

const MOCK_ROOMS = [
  { id: "P101", name: "P101 - Tầng 1 Tòa AB" },
  { id: "P102", name: "P102 - Tầng 1 Tòa AB" },
  { id: "P103", name: "P103 - Tầng 1 Tòa AB" },
  { id: "P104", name: "P104 - Tầng 1 Tòa AB" },
  { id: "P201", name: "P201 - Tầng 2 Tòa AB" },
  { id: "P202", name: "P202 - Tầng 2 Tòa AB" }
];

export default function RoomSidebar() {
  const [keyword, setKeyword] = useState("");
  const [activeRoomId, setActiveRoomId] = useState("P101");

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room =>
      room.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword]);

  return (
    <aside className="room-sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <FaDoorOpen />
        <span>Danh sách phòng</span>
      </div>

      {/* Search */}
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          placeholder="Tìm kiếm phòng..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* List */}
      <ul className="room-list">
        {filteredRooms.map(room => (
          <li
            key={room.id}
            className={`room-item ${
              activeRoomId === room.id ? "active" : ""
            }`}
            onClick={() => setActiveRoomId(room.id)}
          >
            <div className="room-info">
              <span className="room-code">{room.id}</span>
              <span className="room-name">{room.name}</span>
            </div>
            <FaMapMarkerAlt className="pin-icon" />
          </li>
        ))}

        {filteredRooms.length === 0 && (
          <li className="empty">Không tìm thấy phòng</li>
        )}
      </ul>
    </aside>
  );
}
