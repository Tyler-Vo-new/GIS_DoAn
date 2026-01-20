// src/Components/Dashboard/Data/devicesData.js

export const devicesData = [
  {
    id: "d1",
    deviceName: "Tủ điện tầng 1",
    status: "ok", // ok | warn
    alertText: "Hoạt động bình thường",
    recent: "17 Jan 2026, 18:20",
    icon: "panel-blue", // panel-blue | panel-green | panel-red | cloud | flame | plug
  },
  {
    id: "d2",
    deviceName: "Tủ điện tầng 2",
    status: "ok",
    alertText: "Hoạt động bình thường",
    recent: "17 Jan 2026, 18:20",
    icon: "panel-green",
  },
  {
    id: "d3",
    deviceName: "Tủ điện tầng 3",
    status: "ok",
    alertText: "Hoạt động bình thường",
    recent: "17 Jan 2026, 18:20",
    icon: "panel-red",
  },
  {
    id: "d4",
    deviceName: "Tủ điện tầng 4",
    status: "ok",
    alertText: "Hoạt động bình thường",
    recent: "17 Jan 2026, 18:20",
    icon: "cloud",
  },
  {
    id: "d5",
    deviceName: "Máy bơm tổng",
    status: "warn",
    alertText: "Hoạt động bình thường",
    recent: "17 Jan 2026, 18:20",
    icon: "flame",
  },
  {
    id: "d6",
    deviceName: "Máy bơm tăng áp",
    status: "warn",
    alertText: "Hoạt động bình thường",
    recent: "17 Jan 2026, 18:20",
    icon: "plug",
  },
  // muốn đủ 30 dòng thì copy thêm items và đổi id/deviceName
];
