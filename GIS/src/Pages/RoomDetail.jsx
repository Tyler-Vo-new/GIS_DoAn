import { useParams } from "react-router-dom";
import RoomImageViewer from "../Components/RoomImageViewer";
import RoomForm from "../Components/RoomForm";
import "../Styles/Components/RoomDetail.css";

const mockRoom = {
    id: "P01",
    type: "Phòng ngủ cao cấp",
    area: "50m2",
    furniture: "Full nội thất: giường ngủ, tủ, bàn ghế, TV, tủ lạnh, máy giặt",
    price: "15.000.000/tháng",
    status: "Trống",
    images: [
        "/rooms/P101/1.jpg",
        "/rooms/P101/2.jpg",
        "/rooms/P101/3.jpg",
    ],
};

export default function RoomDetail() {
    const { roomId } = useParams();

    // later: fetch by roomId
    const room = { ...mockRoom, id: roomId };

    return (
        <div className="room-detail">
            <RoomImageViewer images={room.images} />
            <RoomForm room={room} />
        </div>
    );
}
