export const DEVICE_TABS = [
  { id: "camera", label: "Camera" },
  { id: "sensor", label: "Cảm biến" },
  { id: "fire", label: "Bình chữa cháy" },
];

export const DEVICE_LABELS = {
  camera: "Camera",
  sensor: "Cảm biến",
  fire: "Bình chữa cháy",
};

export const FLOOR_OPTIONS = [
  { value: "B2", label: "B2 - Tầng hầm 2" },
  { value: "B1", label: "B1 - Tầng hầm 1" },
  { value: "T1", label: "T1 - Tầng 1" },
  { value: "T2", label: "T2 - Tầng 2" },
  { value: "T3", label: "T3 - Tầng 3" },
  { value: "T4", label: "T4 - Tầng 4" },
  { value: "T5", label: "T5 - Tầng 5" },
  { value: "ST1", label: "ST1 - Sân thượng" },
];

export const STATUS_OPTIONS_BY_TYPE = {
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

export const STATUS_TONE_MAP = {
  active: { label: "Hoạt động", tone: "success" },
  maintenance: { label: "Bảo trì", tone: "warning" },
  error: { label: "Hỏng", tone: "danger" },
  expired: { label: "Hết hạn", tone: "danger" },
};
