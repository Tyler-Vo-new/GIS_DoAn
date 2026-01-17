const devicesByType = {
  camera: [
    {
      code: "CAM001",
      name: "Camera sảnh chính",
      floor: "T1",
      location: "Sảnh chính",
      range: "5m",
      status: "active",
    },
    {
      code: "CAM002",
      name: "Camera hành lang 1",
      floor: "T1",
      location: "Hành lang HL-101",
      range: "10m",
      status: "active",
    },
    {
      code: "CAM003",
      name: "Camera thang máy 1",
      floor: "T2",
      location: "Thang máy TM-01",
      range: "4m",
      status: "active",
    },
    {
      code: "CAM004",
      name: "Camera hầm xe 1",
      floor: "B1",
      location: "Bãi xe tầng hầm B1",
      range: "5m",
      status: "maintenance",
    },
    {
      code: "CAM005",
      name: "Camera hành lang 2",
      floor: "T1",
      location: "Hành lang HL-102",
      range: "8m",
      status: "error",
    },
    {
      code: "CAM006",
      name: "Camera sân thượng 1",
      floor: "ST1",
      location: "Sân thượng",
      range: "15m",
      status: "active",
    },
    {
      code: "CAM007",
      name: "Camera thang máy 2",
      floor: "T2",
      location: "Thang máy TM-02",
      range: "4m",
      status: "maintenance",
    },
    {
      code: "CAM008",
      name: "Camera thang máy 3",
      floor: "T2",
      location: "Thang máy TM-03",
      range: "4m",
      status: "maintenance",
    },
  ],
  sensor: [
    {
      code: "SEN001",
      name: "Cảm biến khói sảnh chính",
      floor: "T1",
      location: "Sảnh chính",
      range: "12m",
      status: "active",
    },
    {
      code: "SEN002",
      name: "Cảm biến nhiệt hành lang",
      floor: "T2",
      location: "Hành lang HL-201",
      range: "10m",
      status: "active",
    },
    {
      code: "SEN003",
      name: "Cảm biến khí gas",
      floor: "B1",
      location: "Khu kỹ thuật",
      range: "6m",
      status: "maintenance",
    },
    {
      code: "SEN004",
      name: "Cảm biến chuyển động",
      floor: "T3",
      location: "Hành lang HL-301",
      range: "8m",
      status: "error",
    },
  ],
  fire: [
    {
      code: "FIR001",
      name: "Bình chữa cháy CO2",
      floor: "T1",
      location: "Sảnh chính",
      range: "4m",
      status: "active",
    },
    {
      code: "FIR002",
      name: "Bình chữa cháy bột",
      floor: "T2",
      location: "Phòng kỹ thuật",
      range: "4m",
      status: "maintenance",
    },
    {
      code: "FIR003",
      name: "Bình chữa cháy foam",
      floor: "B1",
      location: "Bãi xe",
      range: "5m",
      status: "active",
    },
  ],
};

export const getUtilitiesData = async ({ deviceType, page = 1, pageSize = 8 }) => {
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
