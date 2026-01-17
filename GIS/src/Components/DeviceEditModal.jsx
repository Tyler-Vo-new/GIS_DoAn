import { useEffect, useMemo, useState } from "react";
import "../Styles/Components/DeviceEditModal.css";
import Modal from "./Modal";
import Button from "./Button";
import FormField from "./FormField";
import ImageUpload from "./ImageUpload";
import {
  DEVICE_LABELS,
  FLOOR_OPTIONS,
  STATUS_OPTIONS_BY_TYPE,
} from "../Constants/utilitiesOptions";

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

const DeviceEditModal = ({ open, deviceType, device, onSave, onClose }) => {
  const [formState, setFormState] = useState(() => buildInitialState(deviceType, device));

  useEffect(() => {
    setFormState(buildInitialState(deviceType, device));
  }, [deviceType, device]);

  const statusOptions = useMemo(
    () => STATUS_OPTIONS_BY_TYPE[deviceType] ?? STATUS_OPTIONS_BY_TYPE.camera,
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

  const deviceLabel = DEVICE_LABELS[deviceType] ?? "Thiết bị";

  const handleImageChange = (url) => {
    setFormState((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  return (
    <Modal
      open={open}
      title={`Chỉnh sửa ${deviceLabel}`}
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
        <ImageUpload value={formState.imageUrl} onChange={handleImageChange} />

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
                {FLOOR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
