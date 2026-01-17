import "../Styles/Components/RoomImageViewer.css";

export default function RoomImageViewer({ images }) {
    return (
        <div className="room-image-viewer">
            <img src={images[0]} alt="Room" />
            <button className="nav left">‹</button>
            <button className="nav right">›</button>
            <div className="image-counter">1 / {images.length}</div>
        </div>
    );
}
