import "../Styles/Components/Button.css";

const Button = ({
  children,
  variant = "secondary",
  className = "",
  type = "button",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`app-btn app-btn--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
