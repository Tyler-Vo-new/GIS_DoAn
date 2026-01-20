import cameraDevices from "./dummy/cameraDevices";
import sensorDevices from "./dummy/sensorDevices";
import fireDevices from "./dummy/fireDevices";

const defaultCoordinates = {
  coordinateX: "120.5",
  coordinateY: "85.3",
};

const enrichCommon = (item, note) => ({
  imageUrl: item.imageUrl ?? "",
  note: item.note ?? note,
  coordinateX: item.coordinateX ?? defaultCoordinates.coordinateX,
  coordinateY: item.coordinateY ?? defaultCoordinates.coordinateY,
  ...item,
});

const enrichFire = (item) => {
  const name = item.name?.toLowerCase() ?? "";
  const cylinderType = name.includes("co2") ? "CO2" : name.includes("bột") ? "Bột" : "Foam";
  return {
    ...enrichCommon(item, "Bình chữa cháy lắp đặt ngày 15/01/2024"),
    cylinderType: item.cylinderType ?? cylinderType,
    capacity: item.capacity ?? "5kg",
    pressure: item.pressure ?? "5",
    manufactureDate: item.manufactureDate ?? "2023-01-15",
    inspectionDate: item.inspectionDate ?? "2024-07-15",
  };
};

const typePrefixMap = {
  camera: "CAM",
  sensor: "SEN",
  fire: "FIR",
};

const generateNextCode = (deviceType) => {
  const prefix = typePrefixMap[deviceType] ?? "DEV";
  const list = devicesByType[deviceType] ?? [];
  const maxNumber = list.reduce((maxValue, item) => {
    const match = item.code?.match(/\d+/g);
    const current = match ? parseInt(match.join(""), 10) : 0;
    return Math.max(maxValue, Number.isNaN(current) ? 0 : current);
  }, 0);
  const nextNumber = String(maxNumber + 1).padStart(3, "0");
  return `${prefix}${nextNumber}`;
};

const normalizeDevice = (deviceType, payload) => {
  if (deviceType === "fire") {
    return enrichFire({
      ...payload,
      range: payload.range ?? payload.pressure ?? payload.range,
    });
  }

  const note = deviceType === "sensor"
    ? "Cảm biến lắp đặt ngày 15/01/2024"
    : "Camera lắp đặt ngày 15/01/2024";

  return enrichCommon(payload, note);
};

let devicesByType = {
  camera: cameraDevices.map((item) => enrichCommon(item, "Camera lắp đặt ngày 15/01/2024")),
  sensor: sensorDevices.map((item) => enrichCommon(item, "Cảm biến lắp đặt ngày 15/01/2024")),
  fire: fireDevices.map(enrichFire),
};

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const getUtilitiesData = async ({ deviceType, page = 1, pageSize = 8 }) => {
  await sleep(500);
  const list = devicesByType[deviceType] ?? [];
  const totalCount = list.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const items = list.slice(startIndex, startIndex + pageSize);

  return {
    deviceType,
    items,
    totalCount,
    page: currentPage,
    pageSize,
    totalPages,
  };
};

export const deleteUtilityDevice = async ({ deviceType, code }) => {
  await sleep(300);
  const list = devicesByType[deviceType] ?? [];
  devicesByType = {
    ...devicesByType,
    [deviceType]: list.filter((item) => item.code !== code),
  };
  return { success: true };
};

export const updateUtilityDevice = async ({ deviceType, code, updates }) => {
  await sleep(300);
  const list = devicesByType[deviceType] ?? [];
  const nextList = list.map((item) => {
    if (item.code !== code) return item;
    return {
      ...normalizeDevice(deviceType, item),
      ...normalizeDevice(deviceType, updates),
    };
  });
  devicesByType = {
    ...devicesByType,
    [deviceType]: nextList,
  };
  return { success: true };
};

export const createUtilityDevice = async ({ deviceType, payload }) => {
  await sleep(300);
  const list = devicesByType[deviceType] ?? [];
  const code = payload.code?.trim() ? payload.code.trim() : generateNextCode(deviceType);
  const newItem = normalizeDevice(deviceType, {
    ...payload,
    code,
  });
  devicesByType = {
    ...devicesByType,
    [deviceType]: [newItem, ...list],
  };
  return { success: true, item: newItem };
};
