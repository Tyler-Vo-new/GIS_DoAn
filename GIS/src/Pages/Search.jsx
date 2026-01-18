import { useState } from "react";
import "../Styles/Pages/Search.css";
import { CiSearch } from "react-icons/ci";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFireExtinguisher } from "react-icons/fa6";
import { MdOutlineStairs } from "react-icons/md";
import { BiCctv } from "react-icons/bi";
import { LuRadio } from "react-icons/lu";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineAccessTime } from "react-icons/md";

const Search = () => {
    // Tab management
    const [activeTab, setActiveTab] = useState("phong");
    
    // Tìm phòng states
    const [searchRoomText, setSearchRoomText] = useState("");
    const [selectedFloor, setSelectedFloor] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedRoomType, setSelectedRoomType] = useState("all");
    
    // Tìm đường states
    const [startPoint, setStartPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const [shortestPath, setShortestPath] = useState(true);
    const [avoidStairs, setAvoidStairs] = useState(false);
    
    // Tìm thiết bị states
    const [activeDeviceType, setActiveDeviceType] = useState("stairs");
    const [deviceFilter, setDeviceFilter] = useState("all");
    const [deviceFloorFilter, setDeviceFloorFilter] = useState("all");

    // Mock data - Phòng
    const mockRooms = [
        {
            id: "P102",
            name: "Phòng cao cấp, 2 phòng ngủ, 50m2",
            floor: "1",
            status: "available",
            type: "2pn",
            amenities: ["Cửa sổ trời", "Máy nóng lạnh"],
            favorite: false
        },
        {
            id: "P103",
            name: "Phòng cao cấp, 2 phòng ngủ, 50m2",
            floor: "1",
            status: "rented",
            type: "2pn",
            amenities: ["Có gác", "Máy nóng lạnh"],
            favorite: true
        },
        {
            id: "P201",
            name: "Phòng tiêu chuẩn, 1 phòng ngủ, 35m2",
            floor: "2",
            status: "available",
            type: "1pn",
            amenities: ["Máy nóng lạnh"],
            favorite: false
        },
    ];

    // Mock data - Thiết bị
    const mockDevices = {
        stairs: [
            {
                id: "A1",
                name: "Thang thoát hiểm A1",
                floor: "Tầng 1",
                area: "Khu A",
                distance: "45m",
                status: "active",
                lastCheck: "15/12/2025"
            },
            {
                id: "B1",
                name: "Thang thoát hiểm B1",
                floor: "Tầng 1",
                area: "Khu A",
                distance: "56m",
                status: "active",
                lastCheck: "15/12/2025"
            },
            {
                id: "A2",
                name: "Thang thoát hiểm A2",
                floor: "Tầng 1",
                area: "Khu B",
                distance: "78m",
                status: "maintenance",
                lastCheck: "15/12/2025"
            }
        ],
        extinguisher: [
            {
                id: "BC01",
                name: "Bình chữa cháy BC01",
                floor: "Tầng 1",
                area: "Hành lang A",
                distance: "25m",
                status: "active",
                lastCheck: "10/12/2025"
            }
        ],
        camera: [
            {
                id: "CAM01",
                name: "Camera CAM01",
                floor: "Tầng 1",
                area: "Sảnh chính",
                distance: "30m",
                status: "active",
                lastCheck: "20/12/2025"
            }
        ],
        sensor: [
            {
                id: "SEN01",
                name: "Cảm biến khói SEN01",
                floor: "Tầng 1",
                area: "Hành lang B",
                distance: "40m",
                status: "active",
                lastCheck: "18/12/2025"
            }
        ]
    };

    // Mock routes
    const mockRoutes = [
        {
            id: 1,
            name: "Tuyến 1: Thang bộ",
            badge: "Nhanh Nhất",
            distance: "85m",
            time: "2 phút",
            floors: "3 tầng",
            description: "Sảnh chính → Hành lang A → Thang bộ → Tầng 3 → Phòng 301"
        },
        {
            id: 3,
            name: "Tuyến 3: Lối phụ",
            badge: null,
            distance: "155m",
            time: "5 phút",
            floors: "",
            description: "Sảnh chính → Lối phụ → Cầu thang C → Tầng 3 → Phòng 301"
        }
    ];

    // Filter functions
    const getFilteredRooms = () => {
        return mockRooms.filter(room => {
            const matchSearch = room.id.toLowerCase().includes(searchRoomText.toLowerCase()) ||
                              room.name.toLowerCase().includes(searchRoomText.toLowerCase());
            const matchFloor = selectedFloor === "all" || room.floor === selectedFloor;
            const matchStatus = selectedStatus === "all" || room.status === selectedStatus;
            const matchType = selectedRoomType === "all" || room.type === selectedRoomType;
            
            return matchSearch && matchFloor && matchStatus && matchType;
        });
    };

    const getFilteredDevices = () => {
        const devices = mockDevices[activeDeviceType] || [];
        return devices.filter(device => {
            const matchFilter = deviceFilter === "all" || device.status === deviceFilter;
            const matchFloor = deviceFloorFilter === "all" || device.floor.includes(deviceFloorFilter);
            return matchFilter && matchFloor;
        });
    };

    const getDeviceCount = (type) => {
        return mockDevices[type]?.length || 0;
    };

    const getDeviceIcon = (type) => {
        switch(type) {
            case "stairs": return <MdOutlineStairs />;
            case "extinguisher": return <FaFireExtinguisher />;
            case "camera": return <BiCctv />;
            case "sensor": return <LuRadio />;
            default: return null;
        }
    };

    return (
        <div className="searchContainer">
            {/* Tabs */}
            <div className="searchTabs">
                <button 
                    className={`searchTab ${activeTab === "phong" ? "active" : ""}`}
                    onClick={() => setActiveTab("phong")}
                >
                    📍 Phòng
                </button>
                <button 
                    className={`searchTab ${activeTab === "duongdi" ? "active" : ""}`}
                    onClick={() => setActiveTab("duongdi")}
                >
                    🧭 Đường Đi
                </button>
                <button 
                    className={`searchTab ${activeTab === "thietbi" ? "active" : ""}`}
                    onClick={() => setActiveTab("thietbi")}
                >
                    🔧 Thiết Bị
                </button>
            </div>

            <div className="searchContent">
                {/* Left Panel */}
                <div className="searchLeftPanel">
                    
                    {/* TAB: TÌM PHÒNG */}
                    {activeTab === "phong" && (
                        <div className="searchPhongTab">
                            {/* Search Input */}
                            <div className="searchInputWrapper">
                                <CiSearch className="searchIcon" />
                                <input
                                    type="text"
                                    placeholder="Nhập mã phòng hoặc tên phòng"
                                    value={searchRoomText}
                                    onChange={(e) => setSearchRoomText(e.target.value)}
                                    className="searchInput"
                                />
                            </div>

                            {/* Filters - Tầng */}
                            <div className="filterGroup">
                                <h4 className="filterTitle">Tầng</h4>
                                <div className="filterButtons">
                                    <button 
                                        className={`filterBtn ${selectedFloor === "all" ? "active" : ""}`}
                                        onClick={() => setSelectedFloor("all")}
                                    >
                                        Tất Cả
                                    </button>
                                    <button 
                                        className={`filterBtn ${selectedFloor === "1" ? "active" : ""}`}
                                        onClick={() => setSelectedFloor("1")}
                                    >
                                        Tầng 1
                                    </button>
                                    <button 
                                        className={`filterBtn ${selectedFloor === "2" ? "active" : ""}`}
                                        onClick={() => setSelectedFloor("2")}
                                    >
                                        Tầng 2
                                    </button>
                                    <button 
                                        className={`filterBtn ${selectedFloor === "3" ? "active" : ""}`}
                                        onClick={() => setSelectedFloor("3")}
                                    >
                                        Tầng 3
                                    </button>
                                    <button 
                                        className={`filterBtn ${selectedFloor === "4" ? "active" : ""}`}
                                        onClick={() => setSelectedFloor("4")}
                                    >
                                        Tầng 4
                                    </button>
                                </div>
                            </div>

                            {/* Filters - Trạng thái */}
                            <div className="filterGroup">
                                <h4 className="filterTitle">Trạng thái</h4>
                                <div className="filterButtons">
                                    <button 
                                        className={`filterBtn ${selectedStatus === "all" ? "active" : ""}`}
                                        onClick={() => setSelectedStatus("all")}
                                    >
                                        Tất Cả
                                    </button>
                                    <button 
                                        className={`filterBtn ${selectedStatus === "available" ? "active" : ""}`}
                                        onClick={() => setSelectedStatus("available")}
                                    >
                                        Còn Trống
                                    </button>
                                    <button 
                                        className={`filterBtn ${selectedStatus === "rented" ? "active" : ""}`}
                                        onClick={() => setSelectedStatus("rented")}
                                    >
                                        Đã Thuê
                                    </button>
                                </div>
                            </div>

                            {/* Filters - Loại Phòng */}
                            <div className="filterGroup">
                                <h4 className="filterTitle">Loại Phòng</h4>
                                <div className="filterButtons">
                                    <button 
                                        className={`filterBtn ${selectedRoomType === "all" ? "active" : ""}`}
                                        onClick={() => setSelectedRoomType("all")}
                                    >
                                        Tất Cả
                                    </button>
                                    <button 
                                        className={`filterBtn ${selectedRoomType === "1pn" ? "active" : ""}`}
                                        onClick={() => setSelectedRoomType("1pn")}
                                    >
                                        1PN
                                    </button>
                                    <button 
                                        className={`filterBtn ${selectedRoomType === "2pn" ? "active" : ""}`}
                                        onClick={() => setSelectedRoomType("2pn")}
                                    >
                                        2PN
                                    </button>
                                    <button 
                                        className={`filterBtn ${selectedRoomType === "3pn" ? "active" : ""}`}
                                        onClick={() => setSelectedRoomType("3pn")}
                                    >
                                        3PN
                                    </button>
                                </div>
                            </div>

                            {/* Room Results */}
                            <div className="roomResults">
                                {getFilteredRooms().map(room => (
                                    <div key={room.id} className="roomCard">
                                        <div className="roomCardHeader">
                                            <h3 className="roomId">{room.id}</h3>
                                            <div className="roomCardActions">
                                                <button className="iconBtn">
                                                    {room.favorite ? <FaStar className="starIcon filled" /> : <FaRegStar className="starIcon" />}
                                                </button>
                                                <button className="iconBtn">
                                                    <BsThreeDotsVertical />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="roomDescription">{room.name}</p>
                                        <div className="roomAmenities">
                                            {room.amenities.map((amenity, idx) => (
                                                <span key={idx} className="amenityTag">
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: TÌM ĐƯỜNG */}
                    {activeTab === "duongdi" && (
                        <div className="searchDuongTab">
                            {/* Start Point */}
                            <div className="inputGroup">
                                <label className="inputLabel">Nhập Điểm bắt đầu</label>
                                <input
                                    type="text"
                                    placeholder="Nhập Điểm bắt đầu"
                                    value={startPoint}
                                    onChange={(e) => setStartPoint(e.target.value)}
                                    className="routeInput"
                                />
                                <div className="quickOptions">
                                    <button className="quickOptionBtn">📍 Vị Trí Hiện Tại</button>
                                    <button className="quickOptionBtn">🏠 Phòng Tôi</button>
                                </div>
                            </div>

                            {/* Swap Button */}
                            <div className="swapBtnWrapper">
                                <button className="swapBtn">⇅</button>
                            </div>

                            {/* End Point */}
                            <div className="inputGroup">
                                <label className="inputLabel">Nhập Điểm đến</label>
                                <input
                                    type="text"
                                    placeholder="Nhập Điểm đến"
                                    value={endPoint}
                                    onChange={(e) => setEndPoint(e.target.value)}
                                    className="routeInput"
                                />
                            </div>

                            {/* Options */}
                            <div className="routeOptions">
                                <label className="checkboxLabel">
                                    <input
                                        type="checkbox"
                                        checked={shortestPath}
                                        onChange={(e) => setShortestPath(e.target.checked)}
                                    />
                                    <span>Ưu tiên đường ngắn nhất</span>
                                </label>
                                <label className="checkboxLabel">
                                    <input
                                        type="checkbox"
                                        checked={avoidStairs}
                                        onChange={(e) => setAvoidStairs(e.target.checked)}
                                    />
                                    <span>Tránh cầu thang</span>
                                </label>
                            </div>

                            {/* Find Route Button */}
                            <button className="findRouteBtn">Tìm Đường Đi</button>

                            {/* Routes Results */}
                            <div className="routesResults">
                                <h4 className="resultsTitle">Tuyến đường gợi ý ({mockRoutes.length})</h4>
                                {mockRoutes.map(route => (
                                    <div key={route.id} className="routeCard">
                                        <div className="routeCardHeader">
                                            <h4 className="routeName">{route.name}</h4>
                                            {route.badge && (
                                                <span className="routeBadge">{route.badge}</span>
                                            )}
                                        </div>
                                        <div className="routeStats">
                                            <span className="routeStat">{route.distance}</span>
                                            <span className="routeStat">{route.time}</span>
                                            {route.floors && <span className="routeStat">{route.floors}</span>}
                                        </div>
                                        <p className="routeDescription">{route.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: TÌM THIẾT BỊ */}
                    {activeTab === "thietbi" && (
                        <div className="searchThietBiTab">
                            {/* Device Type Buttons */}
                            <div className="deviceTypeButtons">
                                <button 
                                    className={`deviceTypeBtn ${activeDeviceType === "stairs" ? "active" : ""}`}
                                    onClick={() => setActiveDeviceType("stairs")}
                                >
                                    <MdOutlineStairs className="deviceIcon" />
                                    <div className="deviceTypeInfo">
                                        <span className="deviceTypeName">Thang Thoát Hiểm</span>
                                        <span className="deviceTypeCount">{getDeviceCount("stairs")} thiết bị</span>
                                    </div>
                                </button>
                                <button 
                                    className={`deviceTypeBtn ${activeDeviceType === "extinguisher" ? "active" : ""}`}
                                    onClick={() => setActiveDeviceType("extinguisher")}
                                >
                                    <FaFireExtinguisher className="deviceIcon" />
                                    <div className="deviceTypeInfo">
                                        <span className="deviceTypeName">Bình Chữa Cháy</span>
                                        <span className="deviceTypeCount">{getDeviceCount("extinguisher")} thiết bị</span>
                                    </div>
                                </button>
                                <button 
                                    className={`deviceTypeBtn ${activeDeviceType === "camera" ? "active" : ""}`}
                                    onClick={() => setActiveDeviceType("camera")}
                                >
                                    <BiCctv className="deviceIcon" />
                                    <div className="deviceTypeInfo">
                                        <span className="deviceTypeName">Camera</span>
                                        <span className="deviceTypeCount">{getDeviceCount("camera")} thiết bị</span>
                                    </div>
                                </button>
                                <button 
                                    className={`deviceTypeBtn ${activeDeviceType === "sensor" ? "active" : ""}`}
                                    onClick={() => setActiveDeviceType("sensor")}
                                >
                                    <LuRadio className="deviceIcon" />
                                    <div className="deviceTypeInfo">
                                        <span className="deviceTypeName">Cảm Biến</span>
                                        <span className="deviceTypeCount">{getDeviceCount("sensor")} thiết bị</span>
                                    </div>
                                </button>
                            </div>

                            {/* Device Filters */}
                            <div className="filterGroup">
                                <h4 className="filterTitle">Bộ lọc</h4>
                                <div className="filterButtons">
                                    <button 
                                        className={`filterBtn ${deviceFilter === "all" ? "active" : ""}`}
                                        onClick={() => setDeviceFilter("all")}
                                    >
                                        Tất Cả
                                    </button>
                                    <button 
                                        className={`filterBtn ${deviceFilter === "active" ? "active" : ""}`}
                                        onClick={() => setDeviceFilter("active")}
                                    >
                                        Hoạt Động
                                    </button>
                                    <button 
                                        className={`filterBtn ${deviceFilter === "maintenance" ? "active" : ""}`}
                                        onClick={() => setDeviceFilter("maintenance")}
                                    >
                                        Bảo Trì
                                    </button>
                                </div>
                            </div>

                            <div className="filterGroup">
                                <div className="filterButtons">
                                    <button 
                                        className={`filterBtn ${deviceFloorFilter === "all" ? "active" : ""}`}
                                        onClick={() => setDeviceFloorFilter("all")}
                                    >
                                        Tất Cả
                                    </button>
                                    <button 
                                        className={`filterBtn ${deviceFloorFilter === "Tầng 1" ? "active" : ""}`}
                                        onClick={() => setDeviceFloorFilter("Tầng 1")}
                                    >
                                        Tầng 1
                                    </button>
                                    <button 
                                        className={`filterBtn ${deviceFloorFilter === "Tầng 2" ? "active" : ""}`}
                                        onClick={() => setDeviceFloorFilter("Tầng 2")}
                                    >
                                        Tầng 2
                                    </button>
                                    <button 
                                        className={`filterBtn ${deviceFloorFilter === "Tầng 3" ? "active" : ""}`}
                                        onClick={() => setDeviceFloorFilter("Tầng 3")}
                                    >
                                        Tầng 3
                                    </button>
                                    <button 
                                        className={`filterBtn ${deviceFloorFilter === "Tầng 4" ? "active" : ""}`}
                                        onClick={() => setDeviceFloorFilter("Tầng 4")}
                                    >
                                        Tầng 4
                                    </button>
                                </div>
                            </div>

                            {/* Device Results */}
                            <div className="deviceResults">
                                {getFilteredDevices().map(device => (
                                    <div key={device.id} className="deviceCard">
                                        <div className="deviceCardHeader">
                                            <div className="deviceCardTitle">
                                                <h4 className="deviceName">{device.name}</h4>
                                                {device.status === "active" && (
                                                    <IoMdCheckmark className="statusIconActive" />
                                                )}
                                                {device.status === "maintenance" && (
                                                    <MdOutlineAccessTime className="statusIconMaintenance" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="deviceInfo">
                                            <p className="deviceInfoText">{device.floor} - {device.area}</p>
                                            <p className="deviceInfoText">📍 Cách bạn {device.distance}</p>
                                            <p className="deviceInfoText">🔍 Kiểm tra: {device.lastCheck}</p>
                                        </div>
                                        <div className="deviceActions">
                                            <button className="deviceActionBtn">Xem Vị Trí</button>
                                            <button className="deviceActionBtn">Chỉ Đường</button>
                                            <button className="deviceActionBtn primary">Chi Tiết</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel - Map */}
                <div className="searchRightPanel">
                    <div className="mapPlaceholder">
                        <div className="mapControls">
                            <button className="mapControlBtn">+</button>
                            <button className="mapControlBtn">−</button>
                            <button className="mapControlBtn">🧭</button>
                            <button className="mapControlBtn">⛶</button>
                        </div>
                        <p style={{ textAlign: "center", color: "#999", marginTop: "200px" }}>
                            Bản đồ 2D/3D sẽ hiển thị ở đây
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
