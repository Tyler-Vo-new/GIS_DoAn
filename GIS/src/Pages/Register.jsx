import "../Styles/Components/Login.css";
import buildingBg from "../assets/BGLogin.png";
import logo from "../assets/logo.png";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Xử lý đăng ký ở đây
        navigate("/login");
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
                <form className="login-form">
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Nhập email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    <div className="login-remember">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Tôi đồng ý Chính sách bảo mật và Điều khoản sử dụng</label>
                    </div>
                    <br />
 

                    <button className="btn-login" onClick={handleRegister}>Đăng ký</button>

                    <p className="login-register">
                        Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                    </p>

                    

                    

                </form>
            </div>
        </div>
    );
};

export default Register;
