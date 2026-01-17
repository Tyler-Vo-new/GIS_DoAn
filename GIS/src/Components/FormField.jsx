import "../Styles/Components/FormField.css";

const FormField = ({ label, required = false, children, className = "" }) => {
  return (
    <label className={`form-field ${className}`}>
      <span className="form-field-label">
        {label}
        {required ? <span className="required"> *</span> : null}
      </span>
      {children}
    </label>
  );
};

export default FormField;
