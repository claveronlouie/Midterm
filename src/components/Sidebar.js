import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/main" },
    {name: "Dashboard", path: "/main/dashboard" },
    { name: "Inventory", path: "/main/inventory" },
    { name: "Reports", path: "/main/reports" },
    { name: "Settings", path: "/main/settings" },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Inventory</h2>
      <ul style={styles.menu}>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              style={{
                ...styles.link,
                backgroundColor:
                  location.pathname === item.path ? "#2563eb" : "transparent",
                color:
                  location.pathname === item.path ? "#fff" : "#111827",
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "2rem",
  },
  menu: { listStyleType: "none", padding: 0, margin: 0 },
  link: {
    display: "block",
    padding: "0.75rem 1rem",
    textDecoration: "none",
    borderRadius: "8px",
    marginBottom: "0.5rem",
    transition: "0.2s",
  },
};

export default Sidebar;
