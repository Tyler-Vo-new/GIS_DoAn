import { useEffect, useMemo, useState } from "react";
import "../Styles/Components/DeviceEditModal.css";
import Modal from "./Modal";
import Button from "./Button";
import FormField from "./FormField";

const buildInitialState = (deviceType, device) => {
  const base = {
    code: device?.code ?? "",
    name: device?.name ?? "",
    location: device?.location ?? "",
    floor: device?.floor ?? "T1",
    range: device?.range ?? "",
    coordinateX: device?.coordinateX ?? "",
    coordinateY: device?.coordinateY ?? "",
    status: device?.status ?? "active",
    note: device?.note ?? "",
    imageUrl: device?.imageUrl ?? "",
  };

  if (deviceType === "fire") {
    return {
      ...base,
      cylinderType: device?.cylinderType ?? "CO2",
      capacity: device?.capacity ?? "5kg",
      pressure: device?.pressure ?? "",
      manufactureDate: device?.manufactureDate ?? "",
      inspectionDate: device?.inspectionDate ?? "",
    };
  }

  return base;
};

const statusOptionsByType = {
  camera: [
    { value: "active", label: "Hoạt động" },
    { value: "maintenance", label: "Bảo trì" },
    { value: "error", label: "Hỏng" },
  ],
  sensor: [
    { value: "active", label: "Hoạt động" },
    { value: "maintenance", label: "Bảo trì" },
    { value: "error", label: "Hỏng" },
  ],
  fire: [
    { value: "active", label: "Hoạt động" },
    { value: "maintenance", label: "Bảo trì" },
    { value: "expired", label: "Hết hạn" },
  ],
};

const DeviceEditModal = ({ open, deviceType, device, onSave, onClose }) => {
  const [formState, setFormState] = useState(() => buildInitialState(deviceType, device));

  useEffect(() => {
    setFormState(buildInitialState(deviceType, device));
  }, [deviceType, device]);

  const statusOptions = useMemo(
    () => statusOptionsByType[deviceType] ?? statusOptionsByType.camera,
    [deviceType]
  );

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formState);
  };

  const imagePreview = formState.imageUrl || "https://via.placeholder.com/120x120.png?text=Device";

  return (
    <Modal
      open={open}
      title={`Chỉnh sửa ${deviceType === "camera" ? "Camera" : deviceType === "sensor" ? "Cảm biến" : "Bình chữa cháy"}`}
      onClose={onClose}
      footer={
        <div className="edit-modal-footer">
          <Button variant="ghost" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Lưu
          </Button>
        </div>
      }
    >
      <div className="edit-modal-grid">
        <div className="edit-image-card">
          <img src={imagePreview} alt="device" />
          <div className="edit-upload">Tải ảnh lên hoặc kéo thả</div>
          <span className="edit-upload-hint">Hỗ trợ SVG, PNG, JPG, GIF (tối đa 800 x 400 px)</span>
        </div>

        <div className="edit-form">
          <FormField label="Mã thiết bị" required>
            <input className="edit-input" value={formState.code} disabled />
          </FormField>

          <FormField label="Tên thiết bị" required>
            <input className="edit-input" value={formState.name} onChange={handleChange("name")} />
          </FormField>

          {deviceType === "fire" ? (
            <div className="edit-row">
              <FormField label="Loại bình" required>
                <input className="edit-input" value={formState.cylinderType} onChange={handleChange("cylinderType")} />
              </FormField>
              <FormField label="Khối lượng/Dung tích" required>
                <input className="edit-input" value={formState.capacity} onChange={handleChange("capacity")} />
              </FormField>
            </div>
          ) : null}

          <div className="edit-row">
            <FormField label="Vị trí" required>
              <input className="edit-input" value={formState.location} onChange={handleChange("location")} />
            </FormField>
            <FormField label="Tầng" required>
              <select className="edit-select" value={formState.floor} onChange={handleChange("floor")}>
                <option value="B2">B2 - Tầng hầm 2</option>
                <option value="B1">B1 - Tầng hầm 1</option>
                <option value="T1">T1 - Tầng 1</option>
                <option value="T2">T2 - Tầng 2</option>
                <option value="T3">T3 - Tầng 3</option>
                <option value="T4">T4 - Tầng 4</option>
                <option value="T5">T5 - Tầng 5</option>
                <option value="ST1">ST1 - Sân thượng</option>
              </select>
            </FormField>
          </div>

          <div className="edit-row">
            <FormField label={deviceType === "fire" ? "Áp suất (bar)" : "Phạm vi quan sát (mét)"} required>
              <input
                className="edit-input"
                value={deviceType === "fire" ? formState.pressure : formState.range}
                onChange={handleChange(deviceType === "fire" ? "pressure" : "range")}
              />
            </FormField>
            <FormField label="Tọa độ trên bản đồ 2D (mét)">
              <div className="edit-coordinates">
                <input
                  className="edit-input"
                  value={formState.coordinateX}
                  onChange={handleChange("coordinateX")}
                  placeholder="X"
                />
                <input
                  className="edit-input"
                  value={formState.coordinateY}
                  onChange={handleChange("coordinateY")}
                  placeholder="Y"
                />
              </div>
            </FormField>
          </div>

          {deviceType === "fire" ? (
            <div className="edit-row">
              <FormField label="Ngày sản xuất" required>
                <input
                  className="edit-input"
                  type="date"
                  value={formState.manufactureDate}
                  onChange={handleChange("manufactureDate")}
                />
              </FormField>
              <FormField label="Hạn kiểm định" required>
                <input
                  className="edit-input"
                  type="date"
                  value={formState.inspectionDate}
                  onChange={handleChange("inspectionDate")}
                />
              </FormField>
            </div>
          ) : null}

          <FormField label="Trạng thái lối thoát" required>
            <div className="edit-radio-group">
              {statusOptions.map((option) => (
                <label key={option.value} className="edit-radio">
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={formState.status === option.value}
                    onChange={handleChange("status")}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </FormField>

          <FormField label="Ghi chú">
            <textarea
              className="edit-textarea"
              rows={3}
              value={formState.note}
              onChange={handleChange("note")}
            />
          </FormField>
        </div>
      </div>
    </Modal>
  );
};

export default DeviceEditModal;
