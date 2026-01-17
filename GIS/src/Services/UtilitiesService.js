import cameraDevices from "./dummy/cameraDevices";
import sensorDevices from "./dummy/sensorDevices";
import fireDevices from "./dummy/fireDevices";

let devicesByType = {
  camera: [...cameraDevices],
  sensor: [...sensorDevices],
  fire: [...fireDevices],
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
