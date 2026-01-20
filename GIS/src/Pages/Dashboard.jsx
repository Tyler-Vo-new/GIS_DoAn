import React from "react";

import OccupancyDonut from "../Components/Dashboard/OccupancyDonut.jsx";
import FloorOccupancyBars from "../Components/Dashboard/FloorOccupancyBars.jsx";
import AlertsPanel from "../Components/Dashboard/AlertsPanel.jsx";
import RoomsTable from "../Components/Dashboard/RoomsTable.jsx";
import DevicesStatusTable from "../Components/Dashboard/DevicesStatusTable.jsx";
import { devicesData } from "../Components/Dashboard/Data/devicesData.js";

import { roomsData } from "../Components/Dashboard/Data/roomsData.js";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Row charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 20,
        }}
      >
        <OccupancyDonut rented={32} total={38} />

        <FloorOccupancyBars
          rows={[
            { floorLabel: "Tầng 1", rented: 6, total: 6 },
            { floorLabel: "Tầng 2", rented: 7, total: 8 },
            { floorLabel: "Tầng 3", rented: 5, total: 8 },
            { floorLabel: "Tầng 4", rented: 6, total: 8 },
          ]}
        />

        <AlertsPanel
          items={[
            {
              id: "a1",
              title: "Thông báo sự cố điện",
              statusText: "Đã khắc phục",
              timeLabel: "18:30 • 16/01/2026",
              areaLabel: "Tầng 2",
              detail: "Mất điện do chạm điện",
            },
            {
              id: "a2",
              title: "Thông báo sự cố điện",
              statusText: "Đã khắc phục",
              timeLabel: "18:30 • 08/10/2025",
              areaLabel: "Tầng 4",
              detail: "Mất điện do chạm điện",
            },
          ]}
        />
      </div>

      {/* Table */}
      <RoomsTable rows={roomsData} title="Danh sách phòng" />
      <DevicesStatusTable rows={devicesData} />
    </div>
  );
}
