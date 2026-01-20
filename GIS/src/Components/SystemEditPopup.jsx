import "../Styles/Components/SystemEditPopup.css";
import { useState, useEffect } from "react";

function systemColor(status) {
    if (status === "electricity") return { color: "red" };        // xanh
    if (status === "ventilation") return { color: "green" };  // vàng
    if (status === "water") return { color: "blue" };         // đỏ
    return {};
}

function statusColor(status) {
    if (status === "active") return { color: "#00ff0d" };        // xanh
    if (status === "maintenance") return { color: "#f9a825" };  // vàng
    if (status === "error") return { color: "#000000" };         // đỏ
    return {};
}

export default function SystemEditPopup({ popup, onClose, onSubmit }) {
    
    
    const [status, setStatus] = useState(popup.data.statusE);
    const [note, setNote] = useState("");

    useEffect(() => {
        setStatus(popup.data.statusE);
        setNote("");
    }, [popup]);

    function statusLabel(status) {
        switch (status) {
            case "active": return "Hoạt động";
            case "maintenance": return "Bảo trì";
            case "error": return "Lỗi";
            default: return status;
        }
    }

    return (
        <div className="popupOverlay1">
            <div className="popupCard">
                <h3>Chỉnh sửa Chi tiết Hệ thống</h3>

                {/* MÃ HỆ THỐNG */}
                <div className="popupSection">
                    <label>Mã hệ thống *</label>
                    <input value={popup.id} disabled />
                </div>
                

                {/* TÊN */}
                <div className="popupSection">
                    <label>Tên hệ thống *</label>
                    <input value={popup.data.title} disabled />
                </div>
                
                {/* LOẠI */}
                <div className="popupSection">
                    <label>Loại *</label>
                    <input
                        value={popup.data.systemV} disabled
                        style={systemColor(popup.data.systemE)}
                    />
                </div>

                {/* VỊ TRÍ */}
                <div className="popupSection1">
                    <div>
                        <label>Vị trí *</label>
                        <input
                            value="Sảnh chính" disabled
                        />
                    </div>
                    <div>
                        <label>Tòa nhà *</label>
                        <input
                            value="AB - Tòa nhà AB" disabled
                        />
                    </div>
                </div>
                
                <div className="popupSection1">
                    <div>
                        <label>Từ *</label>
                        <input
                            value={`Tầng ${popup.data.storey} tòa AB`} disabled
                        />
                    </div>
                    <div>
                        <label> Đến *</label>
                        <input
                            value={popup.data.room ? `Phòng ${popup.data.room.code}` : ""} disabled
                        />
                    </div>
                </div>

                {/* TRẠNG THÁI */}
                <div className="popupSection2">
                    <label>Trạng thái hệ thống</label>
                    <div className="radioGroup">
                        {["active", "maintenance", "error"].map(s => (
                            <label key={s}>
                                <input
                                    type="radio"
                                    checked={status === s}
                                    onChange={() => setStatus(s)}
                                />
                                <span style={statusColor(s)} >{statusLabel(s)}</span>
                            </label>
                        ))}
                    </div>
                </div>
                
                
                {/* NOTE */}
                <div className="popupSection2">
                    <label>Ghi chú</label>
                    <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    />
                </div>
                

                <div className="popupActions">
                    <button onClick={onClose} className="btnCancel">Hủy</button>
                    <button
                        className="btnPrimary"
                        onClick={() => onSubmit(status, note)}
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}
