import "../Styles/Components/StatusTag.css";

const StatusTag = ({ label, tone = "info" }) => {
  return <span className={`status-tag status-tag--${tone}`}>{label}</span>;
};

export default StatusTag;
