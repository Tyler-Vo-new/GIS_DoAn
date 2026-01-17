import { useEffect, useMemo, useState } from "react";
import "../Styles/Components/Utilities.css";
import {
    createExitDevice,
    deleteExitDevice,
    getExitData,
    updateExitDevice,
} from "../Services/ExitService";
import Button from "../Components/Button";
import Pagination from "../Components/Pagination";
import ConfirmDialog from "../Components/ConfirmDialog";
import ExitTable from "../Components/ExitTable";
import ExitEditModal from "../Components/ExitEditModal";
import { EXIT_STATUS_TONE_MAP, EXIT_TYPE_OPTIONS } from "../Constants/exitOptions";
import { FiPlus, FiDownload } from "react-icons/fi";

const Exit = () => {
    const [exitData, setExitData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [editingExit, setEditingExit] = useState(null);
    const [editMode, setEditMode] = useState("edit");

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setIsLoading(true);
            const data = await getExitData({ page: currentPage, pageSize: 8 });
            if (!isMounted) return;
            setExitData(data);
            setIsLoading(false);
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [currentPage]);

    const typeLabelMap = useMemo(() => {
        return EXIT_TYPE_OPTIONS.reduce((acc, item) => {
            acc[item.value] = item.label;
            return acc;
        }, {});
    }, []);

    const currentData = (exitData.items ?? []).map((item) => ({
        ...item,
        exitTypeLabel: typeLabelMap[item.exitType] ?? "",
    }));
    const totalCount = exitData.totalCount ?? currentData.length;
    const totalPages = exitData.totalPages ?? 1;
    const pageSize = exitData.pageSize ?? 8;
    const startIndex = currentData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endIndex = currentData.length === 0 ? 0 : startIndex + currentData.length - 1;
    const rangeText = isLoading
        ? "Đang tải dữ liệu..."
        : currentData.length === 0
            ? "Chưa có lối thoát hiểm"
            : `Hiển thị ${startIndex}-${endIndex} trong ${totalCount} lối thoát hiểm`;

    const handleChangePage = (nextPage) => {
        setCurrentPage(nextPage);
    };

    const handleAddClick = () => {
        setEditMode("create");
        setEditingExit({
            code: "",
            name: "",
            exitType: "stairs",
            location: "",
            floor: "T1",
            width: "",
            capacity: "",
            distanceNearest: "",
            coordinateX: "",
            coordinateY: "",
            exitDoor: "on",
            barrier: "no",
            status: "active",
            note: "",
            imageUrl: "",
        });
    };

    const handleEditClick = (item) => {
        setEditMode("edit");
        setEditingExit(item);
    };

    const handleDeleteClick = (item) => {
        setPendingDelete(item);
    };

    const handleConfirmDelete = async () => {
        if (!pendingDelete) return;
        setIsLoading(true);
        await deleteExitDevice({ code: pendingDelete.code });
        setPendingDelete(null);
        const data = await getExitData({ page: currentPage, pageSize: 8 });
        const nextPage = Math.min(currentPage, data.totalPages);
        if (nextPage !== currentPage) {
            setCurrentPage(nextPage);
            setIsLoading(false);
            return;
        }
        setExitData(data);
        setIsLoading(false);
    };

    const handleSaveEdit = async (formData) => {
        if (!editingExit) return;
        setIsLoading(true);
        if (editMode === "create") {
            await createExitDevice({ payload: formData });
            setCurrentPage(1);
        } else {
            await updateExitDevice({
                code: editingExit.code,
                updates: formData,
            });
        }
        setEditingExit(null);
        setEditMode("edit");
        const data = await getExitData({
            page: editMode === "create" ? 1 : currentPage,
            pageSize: 8,
        });
        setExitData(data);
        setIsLoading(false);
    };

    return (
        <div className="utilities-page">
            <section className="utilities-panel">
                <div className="utilities-header">
                    <h2>Danh sách Lối thoát hiểm</h2>
                    <div className="utilities-actions">
                        <Button variant="primary" onClick={handleAddClick}>
                            <FiPlus /> Thêm mới
                        </Button>
                        <Button>
                            <FiDownload /> Tải về
                        </Button>
                    </div>
                </div>

                <ExitTable
                    data={currentData}
                    isLoading={isLoading}
                    statusMap={EXIT_STATUS_TONE_MAP}
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
                title="Xóa Lối thoát hiểm"
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

            <ExitEditModal
                key={`${editMode}-${editingExit?.code ?? "new"}`}
                open={Boolean(editingExit)}
                device={editingExit}
                mode={editMode}
                onSave={handleSaveEdit}
                onClose={() => setEditingExit(null)}
            />
        </div>
    );
};

export default Exit;
