import React, { useState, useEffect, useRef } from "react";
import { useBambalinas } from "../context/BambalinasContext";
import "../styles/Copilot.css";

export default function Copilot() {
    const { messages, addMessage, currentShow } = useBambalinas();
    const [inputValue, setInputValue] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        addMessage("user", inputValue);
        const userQuery = inputValue;
        setInputValue("");

        setTimeout(() => {
            let aiResponse = "¡Recibido! Estoy analizando la base de datos en PostgreSQL para procesar tu solicitud.";

            if (userQuery.toLowerCase().includes("salva") || userQuery.toLowerCase().includes("función")) {
                aiResponse = `Entendido. He verificado el segmento para **${currentShow.title}**. El Botón Salvavidas está listo para despachar la plantilla WhatsApp a los 85 espectadores impulsivos detectados.`;
            } else if (userQuery.toLowerCase().includes("filtra") || userQuery.toLowerCase().includes("fans")) {
                aiResponse = "Filtro ejecutado en la tabla `espectadores`. He separado a los usuarios catalogados como **Súper Fans** con asistencia perfecta este año.";
            }

            addMessage("ia", aiResponse);
        }, 1200);
    };

    const targetAudience = [
        { id: 1, name: "Catalina Silva", phone: "+56 9 8765 ----", label: "Impulsivo", match: "Ticketera" },
        { id: 2, name: "Ignacio Aravena", phone: "+56 9 7654 ----", label: "Dupla / QR", match: "QR Sala" },
        { id: 3, name: "Javiera Toledo", phone: "+56 9 6543 ----", label: "Impulsivo", match: "Ticketera" },
        { id: 4, name: "José Tomás Pardo", phone: "+56 9 5432 ----", label: "Súper Fan", match: "Cruce Retroactivo" }
    ];

    return (
        <main className="copilot-unique-context">
            <div className="copilot-container">

                <header className="copilot-premium-header">
                    <div className="header-title-area">
                        <span className="copilot-tag-premium">Copiloto de Production</span>
                        <h1 className="copilot-display-h1">Agente Virtual <br /><span>Bambalinas.</span></h1>
                    </div>
                </header>

                <div className="copilot-workspace-grid">

                    {/* COLUMNA IZQUIERDA */}
                    <section className="copilot-card-premium chat-panel">
                        <div className="panel-header">
                            <div className="ai-status">
                                <i className="fa-solid fa-brain brain-icon-active"></i>
                                <div>
                                    <h3>Bambalinas IA</h3>
                                    <span className="sub-status">Analizando audiencias en tiempo real...</span>
                                </div>
                            </div>
                        </div>

                        <div className="chat-messages-box">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                                    <div className="message-avatar">
                                        {msg.sender === "ia" ? <i className="fa-solid fa-robot"></i> : <i className="fa-solid fa-user"></i>}
                                    </div>
                                    <div
                                        className="message-bubble"
                                        dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                                    ></div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="chat-input-wrapper">
                            <input
                                type="text"
                                placeholder="Ej: 'Sálvame la función de mañana' o 'Filtra por Súper Fans'..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type="submit" className="send-btn">
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </form>
                    </section>

                    {/* COLUMNA DERECHA */}
                    <section className="copilot-card-premium preview-panel">

                        <div className="preview-section-box">
                            <div className="box-header">
                                <i className="fa-solid fa-users-viewfinder box-icon"></i>
                                <h4>Segmento Detectado ({targetAudience.length} de 85 mostrados)</h4>
                            </div>

                            <div className="audience-mini-table">
                                {targetAudience.map((spectator) => (
                                    <div key={spectator.id} className="table-row-item">
                                        <div className="spec-info">
                                            <strong>{spectator.name}</strong>
                                            <span>{spectator.phone}</span>
                                        </div>
                                        <div className="spec-badges">
                                            <span className="badge-tag label-tag">{spectator.label}</span>
                                            <span className="badge-tag match-tag">{spectator.match}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="preview-section-box">
                            <div className="box-header">
                                <i className="fa-brands fa-whatsapp box-icon whatsapp-color"></i>
                                <h4>Vista Previa del Mensaje (WhatsApp Outbound)</h4>
                            </div>

                            <div className="whatsapp-mock-phone">
                                <div className="whatsapp-bubble">
                                    <p>
                                        ¡Hola [Nombre]! 🎭 Soy del equipo de producción de <strong>{currentShow.title}</strong>.<br /><br />
                                        Sabemos que eres de los nuestros y que te encantan las decisiones de última hora. Nos quedan los últimos cupos para la función de este <strong>viernes a las 20:30 hrs</strong> y te liberamos un beneficio del 30% usando el código: <strong>SALVAMELASALA</strong>.<br /><br />
                                        ¡Nos vemos en el teatro! 🎟️<br /><br />
                                        <span className="whatsapp-opt-out">Si no deseas recibir más alertas de esta compañía, responde SALIR.</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button className="copilot-action-btn-trigger" onClick={() => alert("🚀 Petición enviada al Backend simulado. Despachando WhatsApps...")}>
                            <i className="fa-solid fa-rocket"></i>
                            <span>🚀 Despachar Campaña Salvavidas vía WhatsApp</span>
                        </button>

                    </section>

                </div>

                <footer className="copilot-premium-footer">
                    <p>Bambalinas IA • Las campañas masivas requieren confirmación del productor.</p>
                    <div className="footer-line"></div>
                </footer>

            </div>
        </main>
    );
}