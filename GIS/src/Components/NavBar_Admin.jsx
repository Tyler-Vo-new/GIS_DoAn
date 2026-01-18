import { NavLink, useNavigate } from "react-router-dom";
import '../Styles/Components/NavBar.css';
import Logo from '../assets/logo.png';
import { LuMapPinned } from "react-icons/lu";
import { SlMagnifier } from "react-icons/sl";
import { MdOutlineBedroomParent } from "react-icons/md";
import { BsFileBarGraph } from "react-icons/bs";
import { TbTool } from "react-icons/tb";
import { PiSecurityCamera } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const NavBar_Admin = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleNavBar = () => {
        goToTop();
    }

    const goToTop = () => {
        window.scrollTo({
            top: 0
        });
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleLogoClick = () => {
        navigate("/");
        goToTop();
    }
    
    return (
        <div className="navWrapper">
            <div className="navLogo" onClick={handleLogoClick}>
                <div className="navlogo">
                    <img src={Logo} alt="logo" width="80px" height="80px" />
                </div>
                <p>Quản lý Tòa nhà Dân cư</p>
            </div>
            <div className="navList">
                <NavLink
                    to='/' onClick={toggleNavBar}
                    className='navLink'
                >
                    <LuMapPinned className="icon"/>
                    <span>Bản đồ</span>
                </NavLink>
                <NavLink
                    to='/search' onClick={toggleNavBar}
                    className='navLink'
                >
                    <SlMagnifier className="icon" />
                    <span>Tìm kiếm và Định hướng</span>
                </NavLink>
                <NavLink
                    to='/rooms' onClick={toggleNavBar}
                    className='navLink'
                >
                    <MdOutlineBedroomParent className="icon" />
                    <span>Quản lý Phòng</span>
                </NavLink>
                <NavLink
                    to='/dashboard' onClick={toggleNavBar}
                    className='navLink'
                >
                    <BsFileBarGraph className="icon" />
                    <span>Dashboard Thống kê</span>
                </NavLink>
                <NavLink
                    to='/utilities' onClick={toggleNavBar}
                    className='navLink'
                >
                    <PiSecurityCamera className="icon" />
                    <span>Quản lý Thiết bị</span>
                </NavLink>
                <NavLink
                    to='/exit' onClick={toggleNavBar}
                    className='navLink'
                >
                    <GiExitDoor className="icon" />
                    <span>Quản lý Lối thoát hiểm</span>
                </NavLink>
                <NavLink
                    to='/system' onClick={toggleNavBar}
                    className='navLink'
                >
                    <TbTool className="icon" />
                    <span>Sơ đồ Hệ thống</span>
                </NavLink>
                {!isLoggedIn && (
                    <NavLink
                        to='/login' onClick={toggleNavBar}
                        className='navLink'
                    >
                        <FaRegUser className="icon" />
                        <span>Đăng nhập</span>
                    </NavLink>
                )}
                {isLoggedIn && (
                    <NavLink
                        to='/profile' onClick={toggleNavBar}
                        className='navLink'
                    >
                        <FaRegUser className="icon" />
                        <span>Tài khoản cá nhân</span>
                    </NavLink>
                )}
                {isLoggedIn && (
                    <button className='navLogout' onClick={handleLogout}>
                        <GiExitDoor className="icon" />
                        <span>Đăng xuất</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default NavBar_Admin;
