import "../Styles/Components/Login.css";
import buildingBg from "../assets/BGLogin.png";
import logo from "../assets/logo.png";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login();
        navigate("/");
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

                <h2>Đăng nhập</h2>
                {/* <p className="login-subtitle">Đăng nhập</p> */}
                <br />
                <br />
                <form className="login-form">
                    <div className="form-group">
                        <label>Email hoặc Tên đăng nhập</label>
                        <input
                            type="text"
                            placeholder="Nhập email hoặc tên đăng nhập"
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
                        <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                    </div>

                    <br/>

                    <button className="btn-login" onClick={handleLogin}>Đăng nhập</button>

                    <p className="login-register">
                        Bạn chưa có tài khoản? <a href="/register">Tạo tài khoản</a>
                    </p>

                    <div className="login-divider">or</div>

                    <div className="login-social">
                        <button className="social-btn facebook">
                            <FaFacebookF />
                        </button>

                        <button className="social-btn google">
                            <FaGoogle />
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
