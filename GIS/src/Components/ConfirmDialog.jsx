import "../Styles/Components/ConfirmDialog.css";
import { FiX, FiTrash2 } from "react-icons/fi";
import Button from "./Button";

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmText = "Xóa",
  cancelText = "Hủy",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true">
      <div className="confirm-dialog">
        <button className="confirm-close" type="button" onClick={onCancel}>
          <FiX />
        </button>
        <div className="confirm-icon">
          <FiTrash2 />
        </div>
        <div className="confirm-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="confirm-actions">
          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
