import "../Styles/Components/FormField.css";

const FormField = ({ label, required = false, error = "", children, className = "" }) => {
  return (
    <label className={`form-field ${error ? "form-field--error" : ""} ${className}`}>
      <span className="form-field-label">
        {label}
        {required ? <span className="required"> *</span> : null}
      </span>
      {children}
      {error ? <span className="form-field-message">{error}</span> : null}
    </label>
  );
};

export default FormField;
