import { useState } from "react";
import "../Styles/Components/ExitEditModal.css";
import Modal from "./Modal";
import Button from "./Button";
import FormField from "./FormField";
import ImageUpload from "./ImageUpload";
import { FLOOR_OPTIONS } from "../Constants/utilitiesOptions";
import {
  EXIT_BARRIER_OPTIONS,
  EXIT_DOOR_OPTIONS,
  EXIT_STATUS_OPTIONS,
  EXIT_TYPE_OPTIONS,
} from "../Constants/exitOptions";

const buildInitialState = (device) => ({
  code: device?.code ?? "",
  name: device?.name ?? "",
  exitType: device?.exitType ?? "stairs",
  location: device?.location ?? "",
  floor: device?.floor ?? "T1",
  width: device?.width ?? "",
  capacity: device?.capacity ?? "",
  distanceNearest: device?.distanceNearest ?? "",
  coordinateX: device?.coordinateX ?? "",
  coordinateY: device?.coordinateY ?? "",
  exitDoor: device?.exitDoor ?? "on",
  barrier: device?.barrier ?? "no",
  status: device?.status ?? "active",
  note: device?.note ?? "",
  imageUrl: device?.imageUrl ?? "",
});

const ExitEditModal = ({ open, device, mode = "edit", onSave, onClose }) => {
  const [formState, setFormState] = useState(() => buildInitialState(device));
  const [errors, setErrors] = useState({});
  const isCreate = mode === "create";

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formState.name.trim()) nextErrors.name = "Vui lòng nhập tên lối thoát";
    if (!formState.location.trim()) nextErrors.location = "Vui lòng nhập vị trí";
    if (!formState.width.trim()) nextErrors.width = "Vui lòng nhập chiều rộng";
    if (!formState.capacity.trim()) nextErrors.capacity = "Vui lòng nhập sức chứa";
    if (!formState.distanceNearest.trim()) nextErrors.distanceNearest = "Vui lòng nhập khoảng cách";
    if (!formState.status) nextErrors.status = "Vui lòng chọn trạng thái";
    return nextErrors;
  };

  const handleSubmit = () => {
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    onSave(formState);
  };

  const handleImageChange = (url) => {
    setFormState((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  return (
    <Modal
      open={open}
      title={`${isCreate ? "Thêm mới" : "Chỉnh sửa"} Lối thoát hiểm`}
      onClose={onClose}
      footer={
        <div className="edit-modal-footer">
          <Button variant="ghost" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isCreate ? "Tạo mới" : "Lưu"}
          </Button>
        </div>
      }
    >
      <div className="edit-modal-grid">
        <ImageUpload value={formState.imageUrl} onChange={handleImageChange} />

        <div className="edit-form">
          <FormField label="Mã lối thoát" required>
            <input
              className={`edit-input ${errors.code ? "has-error" : ""}`}
              value={formState.code}
              onChange={handleChange("code")}
              disabled={!isCreate}
              placeholder={isCreate ? "Ví dụ: EX009" : ""}
            />
          </FormField>

          <FormField label="Tên lối thoát" required error={errors.name}>
            <input
              className={`edit-input ${errors.name ? "has-error" : ""}`}
              value={formState.name}
              onChange={handleChange("name")}
            />
          </FormField>

          <FormField label="Loại lối thoát" required>
            <select className="edit-select" value={formState.exitType} onChange={handleChange("exitType")}>
              {EXIT_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>

          <div className="edit-row">
            <FormField label="Vị trí" required error={errors.location}>
              <input
                className={`edit-input ${errors.location ? "has-error" : ""}`}
                value={formState.location}
                onChange={handleChange("location")}
              />
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
            <FormField label="Chiều rộng (mét)" required error={errors.width}>
              <input
                className={`edit-input ${errors.width ? "has-error" : ""}`}
                value={formState.width}
                onChange={handleChange("width")}
              />
            </FormField>
            <FormField label="Sức chứa (người)" required error={errors.capacity}>
              <input
                className={`edit-input ${errors.capacity ? "has-error" : ""}`}
                value={formState.capacity}
                onChange={handleChange("capacity")}
              />
            </FormField>
          </div>

          <div className="edit-row">
            <FormField label="Khoảng cách đến điểm xa nhất (mét)" required error={errors.distanceNearest}>
              <input
                className={`edit-input ${errors.distanceNearest ? "has-error" : ""}`}
                value={formState.distanceNearest}
                onChange={handleChange("distanceNearest")}
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

          <div className="edit-row">
            <FormField label="Đèn EXIT" required>
              <div className="edit-radio-group">
                {EXIT_DOOR_OPTIONS.map((option) => (
                  <label key={option.value} className="edit-radio">
                    <input
                      type="radio"
                      name="exitDoor"
                      value={option.value}
                      checked={formState.exitDoor === option.value}
                      onChange={handleChange("exitDoor")}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </FormField>
            <FormField label="Biển chỉ dẫn" required>
              <div className="edit-radio-group">
                {EXIT_BARRIER_OPTIONS.map((option) => (
                  <label key={option.value} className="edit-radio">
                    <input
                      type="radio"
                      name="barrier"
                      value={option.value}
                      checked={formState.barrier === option.value}
                      onChange={handleChange("barrier")}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </FormField>
          </div>

          <FormField label="Trạng thái lối thoát" required error={errors.status}>
            <div className="edit-radio-group">
              {EXIT_STATUS_OPTIONS.map((option) => (
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

export default ExitEditModal;
