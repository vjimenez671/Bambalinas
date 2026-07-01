import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBambalinas } from "../context/BambalinasContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentShow, metrics, alerts } = useBambalinas();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="dashboard-unique-context">
      <div className="dashboard-container">
        
        {/* ENCABEZADO */}
        <header className="dashboard-premium-header">
          <div className="header-title-area">
            <span className="dashboard-tag-premium">{currentShow.season}</span>
            <h1 className="dashboard-display-h1">Panel de Control <br /><span>{currentShow.title}.</span></h1>
          </div>
        </header>

        {/* MÉTRICAS PRINCIPALES */}
        <section className="dashboard-metrics-grid">
          <div className="dashboard-card-premium metric-box">
            <div className="metric-header">
              <span className="metric-title">Audiencia Total</span>
              <i className="fa-solid fa-users icon-purple"></i>
            </div>
            <div className="metric-number">{metrics.totalAudience}</div>
            <p className="metric-subtext">Espectadores únicos registrados en BD</p>
          </div>

          <div className="dashboard-card-premium metric-box">
            <div className="metric-header">
              <span className="metric-title">Butacas Salvadas</span>
              <i className="fa-solid fa-chair icon-cyan"></i>
            </div>
            <div className="metric-number">{metrics.seatsSaved}</div>
            <p className="metric-subtext">Vórtice de conversión por campañas IA</p>
          </div>

          <div className="dashboard-card-premium metric-box">
            <div className="metric-header">
              <span className="metric-title">Créditos WhatsApp</span>
              <i className="fa-brands fa-whatsapp icon-green"></i>
            </div>
            <div className="metric-number">{metrics.creditsLeft} <span>/ {metrics.creditsTotal}</span></div>
            <p className="metric-subtext">Disponibles para notificaciones push</p>
          </div>
        </section>

        {/* SECCIÓN CENTRAL */}
        <div className="dashboard-details-layout">
          
          {/* GRÁFICO DE BARRAS */}
          <section className="dashboard-card-premium main-chart-area">
            <h2 className="section-title-premium">Segmentación de Compra</h2>
            <p className="section-subtitle-premium">Ocupación general: {currentShow.occupancy}%</p>
            
            <div className="bar-chart-mock">
              <div className="bar-wrapper">
                <span className="bar-percentage">{currentShow.breakdown.planificados}%</span>
                <div className="bar-fill planificados" style={{ height: `${currentShow.breakdown.planificados}%` }}></div>
                <span className="bar-label">Planificados</span>
              </div>
              <div className="bar-wrapper">
                <span className="bar-percentage">{currentShow.breakdown.dudosos}%</span>
                <div className="bar-fill dudosos" style={{ height: `${currentShow.breakdown.dudosos}%` }}></div>
                <span className="bar-label">Dudosos</span>
              </div>
              <div className="bar-wrapper">
                <span className="bar-percentage">{currentShow.breakdown.impulsivos}%</span>
                <div className="bar-fill impulsivos" style={{ height: `${currentShow.breakdown.impulsivos}%` }}></div>
                <span className="bar-label">Impulsivos</span>
              </div>
            </div>
          </section>

          {/* CRÍTICAS Y ALERTAS DEL COPILOTO */}
          <section className="dashboard-card-premium copilot-alerts-area">
            <h2 className="section-title-premium">Copiloto Alertas</h2>
            
            <div className="alerts-stack">
              {alerts.map((alert) => (
                <div key={alert.id} className={`alert-item-box ${alert.type}`}>
                  <div className="alert-indicator"></div>
                  <div className="alert-content">
                    <p>{alert.text}</p>
                    <span className="alert-timestamp">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="dashboard-action-btn-primary" onClick={() => navigate("/copiloto")}>
              <i className="fa-solid fa-brain"></i>
              <span>Abrir Bambalinas Copiloto</span>
            </button>
          </section>

        </div>

        <footer className="dashboard-premium-footer">
          <p>Bambalinas Core System v1.0.0 • Gestión Avanzada de Audiencias Teatrales</p>
        </footer>

      </div>
    </main>
  );
}