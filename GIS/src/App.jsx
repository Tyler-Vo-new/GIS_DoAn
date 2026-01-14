import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar_Admin from "./Components/NavBar_Admin";
import StatusBar from "./Components/StatusBar";
import Map from "./Pages/Map";
import Search from "./Pages/Search";
import Rooms from "./Pages/Rooms";
import Dashboard from "./Pages/Dashboard";
import Utilities from "./Pages/Utilities";
import System from "./Pages/System";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
    <div className="pageContainer">
        <NavBar_Admin />
      <div className="mainWrapper">
          <StatusBar page="Trang chủ" />
          <main>
            <Routes>
              <Route path="/" element={<Map />} />
              <Route path="/search" element={<Search />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/utilities" element={<Utilities />} />
              <Route path="/system" element={<System />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
      </div>
    </div>
    </BrowserRouter>
  );

}

export default App;
