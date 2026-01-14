import { NavLink } from "react-router-dom";
import '../Styles/Components/NavBar.css';
import Logo from '../assets/logo.png';
import { LuMapPinned } from "react-icons/lu";
import { SlMagnifier } from "react-icons/sl";
import { MdOutlineBedroomParent } from "react-icons/md";
import { BsFileBarGraph } from "react-icons/bs";
import { TbTool } from "react-icons/tb";
import { PiSecurityCamera } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";

const NavBar_Admin = () => {
    const toggleNavBar = () => {
        goToTop();
    }

    const goToTop = () => {
        window.scrollTo({
            top: 0
        });
    }
    
    return (
        <div className="navWrapper">
            <div className="navLogo">
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
                    to='/system' onClick={toggleNavBar}
                    className='navLink'
                >
                    <TbTool className="icon" />
                    <span>Sơ đồ Hệ thống</span>
                </NavLink>
                <NavLink
                    to='/login' onClick={toggleNavBar}
                    className='navLink'
                >
                    <FaRegUser className="icon" />
                    <span>Đăng nhập</span>
                </NavLink>
            </div>
        </div>
    );
}

export default NavBar_Admin;
