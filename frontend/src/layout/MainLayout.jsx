import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../App.css";

function MainLayout() {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;