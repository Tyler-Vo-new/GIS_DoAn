import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import NavBar_Admin from "./Components/NavBar_Admin";
import StatusBar from "./Components/StatusBar";
import Map from "./Pages/Map";
import Search from "./Pages/Search";
import Rooms from "./Pages/Rooms";
import Dashboard from "./Pages/Dashboard";
import Utilities from "./Pages/Utilities";
import System from "./Pages/System";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Exit from "./Pages/Exit";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
                  <Route path="/exit" element={<Exit />} />
                  <Route path="/system" element={<System />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );

}

export default App;
