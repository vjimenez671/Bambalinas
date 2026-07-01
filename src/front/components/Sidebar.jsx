import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css"; // Asegúrate de que apunte a tu ruta real de estilos del Sidebar

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Cada vez que cambia el estado del Sidebar, actualizamos la variable global de CSS
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isOpen ? "260px" : "80px"
    );
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar-premium ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header-toggle">
        {isOpen && <span className="sidebar-brand-logo">BAMBALINAS <span className="ai-badge-brand">IA</span></span>}
        <button onClick={toggleSidebar} className="sidebar-toggle-btn" aria-label="Toggle Sidebar">
          <i className={`fa-solid ${isOpen ? "fa-chevron-left" : "fa-bars"}`}></i>
        </button>
      </div>

      <nav className="sidebar-nav-menu">
        <NavLink 
          to="/dashboard" 
          end
          className={({ isActive }) => `sidebar-link-item ${isActive ? "active" : ""}`}
        >
          <i className="fa-solid fa-chart-pie"></i>
          {isOpen && <span className="link-text-label">Dashboard</span>}
        </NavLink>

        <NavLink 
          to="/copiloto" 
          className={({ isActive }) => `sidebar-link-item ${isActive ? "active" : ""}`}
        >
          <i className="fa-solid fa-robot"></i>
          {isOpen && <span className="link-text-label">Copiloto IA</span>}
        </NavLink>
      </nav>

      <div className="sidebar-footer-profile">
        <div className="profile-avatar-mini">V</div>
        {isOpen && (
          <div className="profile-info-text">
            <span className="profile-name-user">Vicente Jiménez</span>
            <span className="profile-role-user">Administrador</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;