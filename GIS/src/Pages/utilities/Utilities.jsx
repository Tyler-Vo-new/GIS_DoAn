import { useEffect, useState } from "react";
import "../../Styles/Components/Utilities.css";
import { getUtilitiesData } from "../../Services/UtilitiesService";
import {
    FiEdit2,
    FiTrash2,
    FiPlus,
    FiDownload,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";

const Utilities = () => {
    const [activeTab, setActiveTab] = useState("camera");
    const [deviceData, setDeviceData] = useState({});
    const [pageByType, setPageByType] = useState({
        camera: 1,
        sensor: 1,
        fire: 1,
    });
    const [isLoading, setIsLoading] = useState(true);

    const tabs = [
        { id: "camera", label: "Camera" },
        { id: "sensor", label: "Cảm biến" },
        { id: "fire", label: "Bình chữa cháy" },
    ];

    const currentPage = pageByType[activeTab] ?? 1;

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setIsLoading(true);
            const data = await getUtilitiesData({
                deviceType: activeTab,
                page: currentPage,
                pageSize: 8,
            });
            if (!isMounted) return;
            setDeviceData((prev) => ({
                ...prev,
                [activeTab]: data,
            }));
            setIsLoading(false);
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [activeTab, currentPage]);

    const statusMap = {
        active: { label: "Hoạt động", className: "status-active" },
        maintenance: { label: "Bảo trì", className: "status-maintenance" },
        error: { label: "Hỏng", className: "status-error" },
    };

    const currentTab = tabs.find((tab) => tab.id === activeTab);
    const currentTabData = deviceData[activeTab] ?? {};
    const currentData = currentTabData.items ?? [];
    const totalCount = currentTabData.totalCount ?? currentData.length;
    const totalPages = currentTabData.totalPages ?? 1;
    const pageSize = currentTabData.pageSize ?? 8;
    const startIndex = currentData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endIndex = currentData.length === 0 ? 0 : startIndex + currentData.length - 1;
    const rangeText = isLoading
        ? "Đang tải dữ liệu..."
        : currentData.length === 0
            ? "Chưa có thiết bị"
            : `Hiển thị ${startIndex}-${endIndex} trong ${totalCount} thiết bị`;

    const handleChangePage = (nextPage) => {
        setPageByType((prev) => ({
            ...prev,
            [activeTab]: nextPage,
        }));
    };

    return (
        <div className="utilities-page">
            <div className="utilities-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`utilities-tab ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                        type="button"
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <section className="utilities-panel">
                <div className="utilities-header">
                    <h2>Danh sách {currentTab?.label}</h2>
                    <div className="utilities-actions">
                        <button className="utilities-btn primary" type="button">
                            <FiPlus /> Thêm mới
                        </button>
                        <button className="utilities-btn" type="button">
                            <FiDownload /> Tải về
                        </button>
                    </div>
                </div>

                <div className="utilities-table-card">
                    <table className="utilities-table">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th>Mã TB</th>
                                <th>Tên thiết bị</th>
                                <th>Tầng</th>
                                <th>Vị trí</th>
                                <th>Phạm vi</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={8} className="utilities-empty">
                                        Đang tải dữ liệu...
                                    </td>
                                </tr>
                            ) : currentData.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="utilities-empty">
                                        Chưa có thiết bị
                                    </td>
                                </tr>
                            ) : (
                                currentData.map((item) => {
                                    const statusInfo = statusMap[item.status] ?? statusMap.active;
                                    return (
                                        <tr key={item.code}>
                                            <td>
                                                <input type="checkbox" />
                                            </td>
                                            <td className="mono">{item.code}</td>
                                            <td>{item.name}</td>
                                            <td>{item.floor}</td>
                                            <td>{item.location}</td>
                                            <td>{item.range}</td>
                                            <td>
                                                <span className={`status-badge ${statusInfo.className}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="utilities-actions-cell">
                                                    <button className="icon-btn edit" type="button">
                                                        <FiEdit2 />
                                                    </button>
                                                    <button className="icon-btn delete" type="button">
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="utilities-footer">
                    <span>{rangeText}</span>
                    <div className="utilities-pagination">
                        <button
                            className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
                            type="button"
                            onClick={() => handleChangePage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                        >
                            <FiChevronLeft />
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <button
                                    key={`page-${pageNumber}`}
                                    className={`page-btn ${currentPage === pageNumber ? "active" : ""}`}
                                    type="button"
                                    onClick={() => handleChangePage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                        <button
                            className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
                            type="button"
                            onClick={() => handleChangePage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Utilities;
