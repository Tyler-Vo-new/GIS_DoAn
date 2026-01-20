import "../Styles/Components/Modal.css";
import { FiX } from "react-icons/fi";

const Modal = ({ open, title, onClose, children, footer }) => {
  if (!open) return null;

  return (
    <div className="app-modal-overlay" role="dialog" aria-modal="true">
      <div className="app-modal">
        <div className="app-modal-header">
          <h3>{title}</h3>
          <button className="app-modal-close" type="button" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="app-modal-body">{children}</div>
        {footer ? <div className="app-modal-footer">{footer}</div> : null}
      </div>
    </div>
  );
};

export default Modal;
