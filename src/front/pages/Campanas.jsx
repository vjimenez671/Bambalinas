import React, { useState, useEffect } from "react";
import "../styles/Campanas.css";

export default function Campanas() {
    const [selectedTab, setSelectedTab] = useState("historial");
    const [campaigns] = useState([
      { id: 1, name: "Pre-venta Exclusiva: La Guitarra (Temporada Invierno)", type: "Segmentada", target: "Súper Fans", sentDate: "12 May 2026", readRate: "96%", clickRate: "42%", ticketsSold: 142, status: "Completada" },
      { id: 2, name: "Alerta Última Hora: Función Shrek Sábado", type: "Broadcast Alerta", target: "Impulsivos + Inactivos", sentDate: "05 Jun 2026", readRate: "93%", clickRate: "28%", ticketsSold: 68, status: "Completada" },
      { id: 3, name: "Fidelización Post-Función: Feedback & Descuento", type: "Automatizada (Gatillo)", target: "Asistentes del día", sentDate: "En ejecución", readRate: "97%", clickRate: "51%", ticketsSold: 34, status: "Activa" }
    ]);

    return (
        <div className="campanas-unique-context grid-center-content fade-in">
            <header className="campanas-premium-header">
                <div>
                    <span className="campanas-tag-premium">Marketing Automatizado</span>
                    <h1 className="campanas-display-h1">Centro de <span>Campañas.</span></h1>
                    <p className="campanas-subtitle">Monitorea el impacto en boletería y programa flujos inteligentes.</p>
                </div>
                <div className="campanas-tabs-nav">
                    <button className={`tab-nav-btn ${selectedTab === "historial" ? "active" : ""}`} onClick={() => setSelectedTab("historial")}><i className="fa-solid fa-clock-rotate-left"></i> Historial y Métricas</button>
                    <button className={`tab-nav-btn ${selectedTab === "constructor" ? "active" : ""}`} onClick={() => setSelectedTab("constructor")}><i className="fa-solid fa-diagram-project"></i> Constructor de Flujos</button>
                </div>
            </header>

            {selectedTab === "historial" ? (
                <section className="campanas-card-premium">
                    <h4 className="panel-section-title">Campañas Ejecutadas</h4>
                    <div className="campanas-table-wrapper">
                        <table className="campanas-table">
                            <thead>
                                <tr><th>Nombre</th><th>Target</th><th>Fecha</th><th>Apertura</th><th>Clics</th><th>Conversión</th><th>Estado</th></tr>
                            </thead>
                            <tbody>
                                {campaigns.map(camp => (
                                    <tr key={camp.id} className="camp-row">
                                        <td className="camp-name-td">{camp.name}</td>
                                        <td><span className="camp-badge-target">{camp.target}</span></td>
                                        <td>{camp.sentDate}</td>
                                        <td className="bold-td">{camp.readRate}</td>
                                        <td>{camp.clickRate}</td>
                                        <td className="conversion-td">{camp.ticketsSold} tks</td>
                                        <td><span className={`status-pill ${camp.status.toLowerCase()}`}>{camp.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ) : (
                <section className="campanas-card-premium">
                    <div className="visual-flow-builder">
                        <div className="flow-node condicional">
                            <div className="node-icon"><i className="fa-solid fa-ticket"></i></div>
                            <div className="node-details">
                                <span className="node-tag">SI EL ESPECTADOR COMPRA PARA:</span>
                                <select className="node-select"><option>La Obra de la Guitarra (Cualquier temporada)</option></select>
                            </div>
                        </div>
                        <div className="flow-connector-line"><i className="fa-solid fa-arrow-down"></i></div>
                        <div className="flow-node ejecucion">
                            <div className="node-icon green"><i className="fa-brands fa-whatsapp"></i></div>
                            <div className="node-details">
                                <span className="node-tag">ACCIÓN AUTOMÁTICA ENVIAR WHATSAPP:</span>
                                <textarea className="node-textarea" defaultValue="¡Hola! Esperamos que hayas disfrutado la función. Tienes un 20% de dscto para el próximo mes..." />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}