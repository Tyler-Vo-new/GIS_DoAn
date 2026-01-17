import "../Styles/Components/UtilitiesTable.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import StatusTag from "./StatusTag";

const UtilitiesTable = ({ data, isLoading, statusMap, onEdit, onDelete }) => {
  return (
    <div className="utilities-table-card">
      <table className="utilities-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Mã TB</th>
            <th>Tên thiết bị</th>
            <th>Tầng</th>
            <th>Vị trí</th>
            <th>Phạm vi</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={8} className="utilities-empty">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={8} className="utilities-empty">
                Chưa có thiết bị
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
                  <td>{item.location}</td>
                  <td>{item.range}</td>
                  <td>
                    <StatusTag label={statusInfo.label} tone={statusInfo.tone} />
                  </td>
                  <td>
                    <div className="utilities-actions-cell">
                      <button
                        className="icon-btn edit"
                        type="button"
                        onClick={() => onEdit(item)}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="icon-btn delete"
                        type="button"
                        onClick={() => onDelete(item)}
                      >
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

export default UtilitiesTable;
