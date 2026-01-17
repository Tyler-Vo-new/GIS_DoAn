import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import "../Styles/Components/Profile.css";
import avatar from "../assets/avatar.png"; // ảnh đại diện

const Profile = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        window.location.href = "/login";
    };

    return (
        <div className="profile-page">

            {/* Cột trái */}
            <div className="profile-left">

                <div className="profile-card avatar-card">
                    <h3>Chi tiết tài khoản</h3>
                    <img src={avatar} alt="avatar" className="profile-avatar" />
                    <p className="profile-username">lisa02</p>
                </div>

                <div className="profile-card contact-card">
                    <h3>Thông tin liên hệ</h3>

                    <div className="contact-item">
                        <span>📞</span>
                        <p>0909123456</p>
                    </div>

                    <div className="contact-item">
                        <span>✉️</span>
                        <p>lisa02@gmail.com</p>
                    </div>

                    <div className="contact-item">
                        <span>👤</span>
                        <p>Khách thuê</p>
                    </div>

                    
                </div>
            </div>

            {/* Cột phải */}
            <div className="profile-right">
                <div className="profile-card profile-form-card">
                    <h3>Thông tin cá nhân</h3>

                    <div className="profile-form">

                        <div className="form-row">
                            <label>Họ và tên</label>
                            <input type="text" value="Lisa Lin" disabled />
                        </div>

                        <div className="form-row">
                            <label>Ngày sinh</label>
                            <input type="text" value="01/01/2000" disabled />
                        </div>

                        <div className="form-row">
                            <label>Giới tính</label>
                            <input type="text" value="Nữ" disabled />
                        </div>

                        <div className="form-row">
                            <label>Loại giấy tờ</label>
                            <input type="text" value="Căn cước công dân" disabled />
                        </div>

                        <div className="form-row">
                            <label>Số CMND / CCCD / HC</label>
                            <input type="text" value="01234567890" disabled />
                        </div>

                        <div className="form-row">
                            <label>Mật khẩu</label>
                            <input type="password" value="12345678" disabled />
                        </div>

                        <div className="form-row">
                            <label>Mã căn</label>
                            <input type="text" value="S10.0120.03" disabled />
                        </div>

                        <button className="btn-update">Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
