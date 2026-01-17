import exitDevices from "./dummy/exitDevices";

let exits = [...exitDevices];

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const generateNextCode = () => {
  const maxNumber = exits.reduce((maxValue, item) => {
    const match = item.code?.match(/\d+/g);
    const current = match ? parseInt(match.join(""), 10) : 0;
    return Math.max(maxValue, Number.isNaN(current) ? 0 : current);
  }, 0);
  const nextNumber = String(maxNumber + 1).padStart(3, "0");
  return `EX${nextNumber}`;
};

export const getExitData = async ({ page = 1, pageSize = 8 }) => {
  await sleep(400);
  const totalCount = exits.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const items = exits.slice(startIndex, startIndex + pageSize);

  return {
    items,
    totalCount,
    page: currentPage,
    pageSize,
    totalPages,
  };
};

export const createExitDevice = async ({ payload }) => {
  await sleep(300);
  const code = payload.code?.trim() ? payload.code.trim() : generateNextCode();
  const newItem = {
    ...payload,
    code,
  };
  exits = [newItem, ...exits];
  return { success: true, item: newItem };
};

export const updateExitDevice = async ({ code, updates }) => {
  await sleep(300);
  exits = exits.map((item) => (item.code === code ? { ...item, ...updates } : item));
  return { success: true };
};

export const deleteExitDevice = async ({ code }) => {
  await sleep(300);
  exits = exits.filter((item) => item.code !== code);
  return { success: true };
};
