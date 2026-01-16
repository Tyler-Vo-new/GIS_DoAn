import "../Styles/Components/Login.css";
import buildingBg from "../assets/BGLogin.png";
import logo from "../assets/logo.png";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        agree: false
    });
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length > 8;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
        // Xóa error khi user bắt đầu nhập
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validation
        if (!formData.username.trim()) {
            newErrors.username = "Vui lòng nhập tên đăng nhập!";
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = "Email không đúng định dạng!";
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = "Mật khẩu phải hơn 8 ký tự!";
        }

        if (!formData.agree) {
            newErrors.agree = "Vui lòng đồng ý Chính sách bảo mật và Điều khoản sử dụng!";
        }

        // Nếu có lỗi, hiển thị error
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Đăng ký thành công
        setShowSuccessModal(true);
        login(); // Đăng nhập user
        
        // Tự động đóng modal và chuyển trang sau 2 giây
        setTimeout(() => {
            navigate("/profile");
        }, 2000);
    };
    return (
        <div
            className="login-container"
            style={{ backgroundImage: `url(${buildingBg})` }}
        >
            <div className="login-card">
                <div className="login-logo">
                    <img src={logo} alt="logo" width="70px" height="70px" />
                </div>

                <h2>Đăng ký</h2>
                {/* <p className="login-subtitle">Đăng nhập</p> */}
                <br />
                <br />
                <form className="login-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? "input-error" : ""}
                            required
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Nhập email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "input-error" : ""}
                            required
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu (hơn 8 ký tự)"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? "input-error" : ""}
                            required
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="login-remember">
                        <input 
                            type="checkbox" 
                            id="agree" 
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                        />
                        <label htmlFor="agree">Tôi đồng ý Chính sách bảo mật và Điều khoản sử dụng</label>
                    </div>
                    {errors.agree && <span className="error-message">{errors.agree}</span>}
                    <br />
 

                    <button className="btn-login" type="submit">Đăng ký</button>

                    <p className="login-register">
                        Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                    </p>

                    

                    

                </form>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-icon">✓</div>
                        <h2>Đăng ký thành công!</h2>
                        <p>Chào mừng bạn đến với hệ thống.</p>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
