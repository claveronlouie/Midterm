import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "2rem" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPage;
