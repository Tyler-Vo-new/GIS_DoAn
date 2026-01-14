import "../Styles/Components/StatusBar.css";
import { CiSearch } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";
import { GiNightSky } from "react-icons/gi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import DefaultProfile from "../assets/default.jpg"

const StatusBar = () => {
    return (
        <>
            <div className="statusWrapper">
                <div className="searchWrapper">
                    <button>
                        <CiSearch/>
                    </button>
                    <input type="text" name="search" id="search" className="searchInput" placeholder="Search here" />
                </div>
                <div className="searchBtns">
                    <button>
                        <IoLanguage />
                    </button>
                    <button>
                        <GiNightSky />
                    </button>
                    <button>
                        <MdOutlineDashboardCustomize />
                    </button>
                    <button>
                        <FaRegBell />
                    </button>
                    <button>
                        <img
                            src={DefaultProfile}
                            alt="Profile Image"
                            width="30px" height="30px"
                            style={{ borderRadius: "50%", objectFit: "cover" }}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}

export default StatusBar
