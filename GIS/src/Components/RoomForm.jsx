import "../Styles/Components/RoomForm.css";

export default function RoomForm({ room }) {
    return (
        <div className="room-form">
            <label>
                Mã phòng
                <input value={room.id} disabled />
            </label>

            <label>
                Loại phòng
                <input value={room.type} />
            </label>

            <label>
                Diện tích
                <input value={room.area} />
            </label>

            <label>
                Nội thất
                <textarea value={room.furniture} />
            </label>

            <label>
                Giá thuê
                <input value={room.price} />
            </label>

            <label>
                Trạng thái
                <input value={room.status} />
            </label>

            <div className="form-actions">
                <button className="btn primary">Lưu Thay Đổi</button>
                <button className="btn">Hủy Bỏ</button>
            </div>
        </div>
    );
}
