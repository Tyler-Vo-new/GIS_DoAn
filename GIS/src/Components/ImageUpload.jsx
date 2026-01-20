import { useRef } from "react";
import "../Styles/Components/ImageUpload.css";

const ImageUpload = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const preview = value || "https://via.placeholder.com/120x120.png?text=Device";

  const handleSelect = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url, file);
  };

  return (
    <div className="image-upload-card">
      <img src={preview} alt="device" />
      <button type="button" className="image-upload-action" onClick={handleSelect}>
        Tải ảnh lên hoặc kéo thả
      </button>
      <span className="image-upload-hint">Hỗ trợ SVG, PNG, JPG, GIF (tối đa 800 x 400 px)</span>
      <input
        ref={inputRef}
        className="image-upload-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;
