export const EXIT_STATUS_TONE_MAP = {
  active: { label: "Hoạt động", tone: "success" },
  maintenance: { label: "Bảo trì", tone: "warning" },
  blocked: { label: "Bị chặn", tone: "danger" },
};

export const EXIT_STATUS_OPTIONS = [
  { value: "active", label: "Hoạt động" },
  { value: "maintenance", label: "Bảo trì" },
  { value: "blocked", label: "Bị chặn" },
];

export const EXIT_TYPE_OPTIONS = [
  { value: "stairs", label: "Cầu thang bộ" },
  { value: "door", label: "Cửa EXIT" },
  { value: "hall", label: "Hành lang" },
  { value: "elevator", label: "Thang máy PCCC" },
];

export const EXIT_DOOR_OPTIONS = [
  { value: "on", label: "Bật" },
  { value: "off", label: "Tắt" },
];

export const EXIT_BARRIER_OPTIONS = [
  { value: "yes", label: "Có" },
  { value: "no", label: "Không" },
];
