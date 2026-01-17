import { useEffect, useState } from "react";
import "../Styles/Components/Utilities.css";
import {
    createUtilityDevice,
    deleteUtilityDevice,
    getUtilitiesData,
    updateUtilityDevice,
} from "../Services/UtilitiesService";
import Button from "../Components/Button";
import Pagination from "../Components/Pagination";
import ConfirmDialog from "../Components/ConfirmDialog";
import UtilitiesTabs from "../Components/UtilitiesTabs";
import UtilitiesTable from "../Components/UtilitiesTable";
import DeviceEditModal from "../Components/DeviceEditModal";
import { DEVICE_TABS, STATUS_TONE_MAP } from "../Constants/utilitiesOptions";
import {
    FiPlus,
    FiDownload,
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
    const [pendingDelete, setPendingDelete] = useState(null);
    const [editingDevice, setEditingDevice] = useState(null);
    const [editMode, setEditMode] = useState("edit");

    const tabs = DEVICE_TABS;

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

    const statusMap = STATUS_TONE_MAP;

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

    const handleDeleteClick = (item) => {
        setPendingDelete(item);
    };

    const handleEditClick = (item) => {
        setEditMode("edit");
        setEditingDevice(item);
    };

    const handleAddClick = () => {
        setEditMode("create");
        setEditingDevice({
            code: "",
            name: "",
            location: "",
            floor: "T1",
            range: "",
            coordinateX: "",
            coordinateY: "",
            status: "active",
            note: "",
            imageUrl: "",
        });
    };

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        setIsLoading(true);
        await deleteUtilityDevice({
            deviceType: activeTab,
            code: pendingDelete.code,
        });
        setPendingDelete(null);
        const data = await getUtilitiesData({
            deviceType: activeTab,
            page: currentPage,
            pageSize: 8,
        });
        const nextPage = Math.min(currentPage, data.totalPages);
        if (nextPage !== currentPage) {
            setPageByType((prev) => ({
                ...prev,
                [activeTab]: nextPage,
            }));
            setIsLoading(false);
            return;
        }
        setDeviceData((prev) => ({
            ...prev,
            [activeTab]: data,
        }));
        setIsLoading(false);
    };

    const handleSaveEdit = async (formData) => {
        if (!editingDevice) return;
        setIsLoading(true);
        const payload = activeTab === "fire"
            ? { ...formData, range: formData.pressure ?? formData.range }
            : formData;

        if (editMode === "create") {
            await createUtilityDevice({
                deviceType: activeTab,
                payload,
            });
            setPageByType((prev) => ({
                ...prev,
                [activeTab]: 1,
            }));
        } else {
            await updateUtilityDevice({
                deviceType: activeTab,
                code: editingDevice.code,
                updates: payload,
            });
        }
        setEditingDevice(null);
        setEditMode("edit");
        const data = await getUtilitiesData({
            deviceType: activeTab,
            page: editMode === "create" ? 1 : currentPage,
            pageSize: 8,
        });
        setDeviceData((prev) => ({
            ...prev,
            [activeTab]: data,
        }));
        setIsLoading(false);
    };

    return (
        <div className="utilities-page">
            <UtilitiesTabs
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            <section className="utilities-panel">
                <div className="utilities-header">
                    <h2>Danh sách {currentTab?.label}</h2>
                    <div className="utilities-actions">
                        <Button variant="primary" onClick={handleAddClick}>
                            <FiPlus /> Thêm mới
                        </Button>
                        <Button variant="primary">
                            <FiDownload /> Tải về
                        </Button>
                    </div>
                </div>

                <UtilitiesTable
                    data={currentData}
                    isLoading={isLoading}
                    statusMap={statusMap}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                />

                <div className="utilities-footer">
                    <span>{rangeText}</span>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handleChangePage}
                    />
                </div>
            </section>
            <ConfirmDialog
                open={Boolean(pendingDelete)}
                title={`Xóa ${currentTab?.label ?? "thiết bị"}`}
                description={
                    pendingDelete
                        ? `Bạn có chắc chắn muốn xóa ${pendingDelete.code} - ${pendingDelete.name}? Dữ liệu sẽ bị xóa vĩnh viễn.`
                        : ""
                }
                confirmText="Xóa"
                cancelText="Hủy"
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
            <DeviceEditModal
                key={`${editMode}-${activeTab}-${editingDevice?.code ?? "new"}`}
                open={Boolean(editingDevice)}
                deviceType={activeTab}
                device={editingDevice}
                mode={editMode}
                onSave={handleSaveEdit}
                onClose={() => setEditingDevice(null)}
            />
        </div>
    );
};

export default Utilities;
