import React from "react";
import { useBambalinas } from "../context/BambalinasContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const { currentSeason } = useBambalinas();

    if (!currentSeason) {
        return <div className="loading-screen">Sincronizando clúster de analíticas...</div>;
    }

    return (
        <div className="dashboard-unique-context grid-center-content fade-in">
            
            {/* 1. HEADER ESTRATÉGICO */}
            <header className="dashboard-premium-header">
                <div className="header-flex-wrapper">
                    <div>
                        <span className="dashboard-tag-play"><i className="fa-solid fa-tower-broadcast"></i> Modo Operación Activa</span>
                        <h1 className="dashboard-display-h1">{currentSeason.currentPlay} <span>— Executive Desk</span></h1>
                        <p className="dashboard-subtitle">
                            Análisis predictivo de taquilla y flujos de conversión para la <strong>{currentSeason.season}</strong>.
                        </p>
                    </div>
                    <div className="system-status-indicator">
                        <span className="pulse-dot"></span> Core Engine Online
                    </div>
                </div>
            </header>

            {/* 2. KPI METRICS CARDS */}
            <div className="dashboard-metrics-grid">
                <div className="metric-card-premium">
                    <div className="metric-header-icon">
                        <i className="fa-solid fa-users-line icon-cyan"></i>
                        <span>Ocupación de Sala</span>
                    </div>
                    <h2>{currentSeason.metrics.occupancyRate}</h2>
                    <span className="trend-badge positive"><i className="fa-solid fa-arrow-trend-up"></i> +4.2% vs semana anterior</span>
                </div>

                <div className="metric-card-premium">
                    <div className="metric-header-icon">
                        <i className="fa-solid fa-ticket icon-purple"></i>
                        <span>Butacas Emitidas</span>
                    </div>
                    <h2>{currentSeason.metrics.ticketsSold} <span className="max-seats">/ {currentSeason.metrics.totalSeats}</span></h2>
                    <span className="trend-badge neutral">Capacidad Óptima</span>
                </div>

                <div className="metric-card-premium">
                    <div className="metric-header-icon">
                        <i className="fa-solid fa-file-invoice-dollar icon-green"></i>
                        <span>Recaudación Bruta</span>
                    </div>
                    <h2>{currentSeason.metrics.revenuePlay}</h2>
                    <span className="trend-badge positive"><i className="fa-solid fa-arrow-trend-up"></i> 91% del target total</span>
                </div>

                <div className="metric-card-premium">
                    <div className="metric-header-icon">
                        <i className="fa-solid fa-bolt icon-orange"></i>
                        <span>Automatizaciones</span>
                    </div>
                    <h2>{currentSeason.metrics.activeAutomations} <span className="max-seats">RAG</span></h2>
                    <span className="trend-badge ai-glow">IA Asistiendo</span>
                </div>
            </div>

            {/* 3. DISTRIBUCIÓN DE CONTENIDOS PRO (DOS COLUMNAS ASIMÉTRICAS) */}
            <div className="dashboard-split-layout">
                
                {/* COLUMNA IZQUIERDA: CONTROL DE SALA Y TAQUILLA */}
                <div className="dashboard-main-panel">
                    
                    {/* Bloque: Desglose Físico de la Sala */}
                    <section className="dashboard-card-premium section-spacing">
                        <h4 className="panel-section-title"><i className="fa-solid fa-couch"></i> Rendimiento por Sector de Sala</h4>
                        <div className="zoning-list-wrapper">
                            {currentSeason.roomZoning.map(zone => {
                                const percentage = ((zone.sold / zone.capacity) * 100).toFixed(0);
                                return (
                                    <div key={zone.id} className="zone-row-item">
                                        <div className="zone-info-top">
                                            <span className="zone-name"><strong>{zone.name}</strong> <small>({zone.price})</small></span>
                                            <span className={`zone-status-pill ${zone.id}`}>{zone.status}</span>
                                        </div>
                                        <div className="zone-progress-container">
                                            <div className="zone-progress-bar">
                                                <div className={`zone-progress-fill fill-${zone.id}`} style={{ width: `${percentage}%` }}></div>
                                            </div>
                                            <span className="zone-percentage-text">{zone.sold}/{zone.capacity} ({percentage}%)</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Bloque: Historial de Funciones pasadas */}
                    <section className="dashboard-card-premium">
                        <h4 className="panel-section-title"><i className="fa-solid fa-chart-bar"></i> Auditoría Corta de Funciones</h4>
                        <table className="dashboard-internal-table">
                            <thead>
                                <tr><th>Función</th><th>Ocupación</th><th>Boletería</th><th>Conversión Campaña</th></tr>
                            </thead>
                            <tbody>
                                {currentSeason.recentPerformances.map((perf, index) => (
                                    <tr key={index}>
                                        <td><strong>{perf.date}</strong></td>
                                        <td>{perf.occupancy}</td>
                                        <td className="bold-td-white">{perf.revenue}</td>
                                        <td><span className="conversion-rate-tag">{perf.conversion} click rate</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                </div>

                {/* COLUMNA DERECHA: SEGUIMIENTO EN TIEMPO REAL DEL COPILOTO */}
                <div className="dashboard-side-panel">
                    <section className="dashboard-card-premium full-height-card">
                        <h4 className="panel-section-title"><i className="fa-solid fa-brain"></i> Actividad del Copiloto IA</h4>
                        <p className="panel-section-subtitle">Logs en tiempo real de reglas disparadas e indexaciones.</p>
                        
                        <div className="ai-logs-stream">
                            {currentSeason.aiSystemLogs.map(log => (
                                <div key={log.id} className={`log-event-card ${log.type}`}>
                                    <div className="log-event-header">
                                        <span className={`log-indicator-dot ${log.type}`}></span>
                                        <span className="log-time-stamp">{log.time}</span>
                                    </div>
                                    <p className="log-body-text">{log.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="ai-automation-efficiency-widget">
                            <span className="efficiency-title">Carga de Trabajo Automatizada</span>
                            <div className="efficiency-flex">
                                <h3>74.2%</h3>
                                <p>De las comunicaciones masivas de esta temporada se resolvieron de forma autónoma sin intervención humana.</p>
                            </div>
                        </div>
                    </section>
                </div>

            </div>

        </div>
    );
}