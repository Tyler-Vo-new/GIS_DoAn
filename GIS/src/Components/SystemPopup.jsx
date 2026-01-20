import "../Styles/Components/SystemPopup.css";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GiBrokenAxe } from "react-icons/gi";

function statusIcon(status) {
    if (status === "active") return <FaCheckCircle className="statusIcon" color="#2e7d32" />;
    if (status === "maintenance") return <FaExclamationTriangle className="statusIcon" color="#f9a825" />;
    if (status === "error") return <GiBrokenAxe className="statusIcon" color="#crgb(0, 0, 0)"/>;
    return null;
}

function statusColor(status) {
    if (status === "active") return { color: "#00ff0d" };        // xanh
    if (status === "maintenance") return { color: "#f9a825" };  // vàng
    if (status === "error") return { color: "#000000" };         // đỏ
    return {};
}

function systemColor(status) {
    if (status === "electricity") return { color: "red" };        // xanh
    if (status === "ventilation") return { color: "green" };  // vàng
    if (status === "water") return { color: "blue" };         // đỏ
    return {};
}

export default function SystemPopup({ popup, onClose, onReport, onEdit }) {
    if (!popup) return null;

    const data = popup.data;
    console.log(data)

    return (
        <div className="popupOverlay" onClick={onClose}>
            <div className="popupCard" onClick={e => e.stopPropagation()}>
                <div className="popupHeader">
                    <h3>
                        {data.title}
                    </h3>
                    {statusIcon(data.statusE)}
                    <IoMdCloseCircleOutline
                        className="closeIcon"
                        onClick={onClose}
                    />
                </div>

                <div className="popupSection">
                    <b>Vị trí</b>
                    <p>Tòa nhà: AB</p>
                    <p>Tầng: Tầng {data.storey}</p>
                    <p>Từ: Sảnh chính</p>
                    <p>Đến: Phòng {data.room ? data.room.code : ""}</p>
                </div>

                <div className="popupSection">
                    <b>Thông tin</b>
                    <p>Loại: <span style={systemColor(data.systemE)}>{data.systemV}</span></p>
                    <p>Trạng thái: <span style={statusColor(data.statusE)}>{data.statusV}</span></p>
                </div>

                <div className="popupSection">
                    <b>Kết nối</b>
                    <p>
                        <span>Sảnh chính</span>
                        <span>{ data.room ? ` nối phòng ${data.room.code}` : ""}</span>
                    </p>
                </div>

                <div className="popupActions">
                    <button
                        className="btnPrimary"
                        onClick={() => {
                            onClose(); // đóng popup hiện tại
                            onEdit(popup.data); // mở popup chỉnh
                        }}
                    >Điều chỉnh</button>
                    <button
                        className="btnWarn"
                        onClick={() => onReport(data)}
                        disabled={data.statusE === "maintenance"}
                    >Báo sự cố</button>
                </div>
            </div>
        </div>
    );
}
