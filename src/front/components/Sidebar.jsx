import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showSubmenu, setShowSubmenu] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", isOpen ? "260px" : "80px");
    // Si el usuario colapsa el sidebar principal de forma manual, cerramos el submenú por limpieza visual
    if (!isOpen) {
      setShowSubmenu(false);
    }
  }, [isOpen]);

  // Manejador del clic en el Copiloto IA
  const handleCopilotoClick = () => {
    if (!isOpen) {
      // Si está cerrado, expande el sidebar y abre el submenú simultáneamente
      setIsOpen(true);
      setShowSubmenu(true);
    } else {
      // Si ya estaba abierto, simplemente actúa como toggle del submenú
      setShowSubmenu(!showSubmenu);
    }
  };

  return (
    <div className={`sidebar-premium ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header-toggle">
        {isOpen && <span className="sidebar-brand-logo">BAMBALINAS <span className="ai-badge-brand">IA</span></span>}
        <button onClick={() => setIsOpen(!isOpen)} className="sidebar-toggle-btn" aria-label="Toggle Sidebar">
          <i className={`fa-solid ${isOpen ? "fa-chevron-left" : "fa-bars"}`}></i>
        </button>
      </div>

      <nav className="sidebar-nav-menu">
        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link-item ${isActive ? "active" : ""}`}>
          <i className="fa-solid fa-chart-pie"></i>
          {isOpen && <span className="link-text-label">Dashboard</span>}
        </NavLink>

        <NavLink to="/audiencias" className={({ isActive }) => `sidebar-link-item ${isActive ? "active" : ""}`}>
          <i className="fa-solid fa-users-viewfinder"></i>
          {isOpen && <span className="link-text-label">Audiencias</span>}
        </NavLink>

        <NavLink to="/campanas" className={({ isActive }) => `sidebar-link-item ${isActive ? "active" : ""}`}>
          <i className="fa-solid fa-bullhorn"></i>
          {isOpen && <span className="link-text-label">Campañas</span>}
        </NavLink>

        {/* MENÚ DESPLEGABLE DE COPILOTO */}
        <div className="sidebar-submenu-wrapper">
          {/* Ahora es estructuralmente idéntico al resto de los botones del menú */}
          <button 
            className={`sidebar-link-item ${showSubmenu && isOpen ? "submenu-active-parent" : ""}`} 
            onClick={handleCopilotoClick}
          >
            <i className="fa-solid fa-robot"></i>
            {isOpen && (
              <span className="link-text-label flex-space-between">
                Copiloto IA 
                <i className={`fa-solid fa-chevron-down arrow-sub ${showSubmenu ? "rotated" : ""}`}></i>
              </span>
            )}
          </button>
          
          {showSubmenu && isOpen && (
            <div className="sidebar-sub-links fade-in-sub">
              <NavLink to="/copiloto/whatsapp" className={({ isActive }) => `sub-link-item ${isActive ? "active" : ""}`}>
                <i className="fa-brands fa-whatsapp"></i> Chat WhatsApp
              </NavLink>
              <NavLink to="/copiloto/audiencias" className={({ isActive }) => `sub-link-item ${isActive ? "active" : ""}`}>
                <i className="fa-solid fa-users"></i> Chat Audiencias
              </NavLink>
              <NavLink to="/copiloto/campanas" className={({ isActive }) => `sub-link-item ${isActive ? "active" : ""}`}>
                <i className="fa-solid fa-business-time"></i> Chat Campañas
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="sidebar-footer-profile">
        <div className="profile-avatar-mini">V</div>
        {isOpen && (
          <div className="profile-info-text">
            <span className="profile-name-user">Vicente Jiménez</span>
          </div>
        )}
      </div>
    </div>
  );
}