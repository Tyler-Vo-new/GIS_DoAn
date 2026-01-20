import "../Styles/Components/ExitTable.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import StatusTag from "./StatusTag";

const ExitTable = ({ data, isLoading, statusMap, onEdit, onDelete }) => {
  return (
    <div className="exit-table-card">
      <table className="exit-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Mã lối thoát</th>
            <th>Tên lối thoát</th>
            <th>Tầng</th>
            <th>Loại lối thoát</th>
            <th>Chiều rộng</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={8} className="exit-empty">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={8} className="exit-empty">
                Chưa có lối thoát hiểm
              </td>
            </tr>
          ) : (
            data.map((item) => {
              const statusInfo = statusMap[item.status] ?? statusMap.active;
              return (
                <tr key={item.code}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="mono">{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.floor}</td>
                  <td>{item.exitTypeLabel}</td>
                  <td>{item.width}m</td>
                  <td>
                    <StatusTag label={statusInfo.label} tone={statusInfo.tone} />
                  </td>
                  <td>
                    <div className="exit-actions-cell">
                      <button className="icon-btn edit" type="button" onClick={() => onEdit(item)}>
                        <FiEdit2 />
                      </button>
                      <button className="icon-btn delete" type="button" onClick={() => onDelete(item)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExitTable;
