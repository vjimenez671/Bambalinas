import React, { useState, useRef, useEffect } from "react";
import { useBambalinas } from "../context/BambalinasContext";
import "../styles/CopilotoCampanas.css";

export default function CopilotoCampanas() {
    const { chats, sendMessage } = useBambalinas();
    const [inputVal, setInputVal] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats.campanas]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputVal.trim()) return;
        sendMessage("campanas", inputVal, "user");
        setInputVal("");

        setTimeout(() => {
            sendMessage("campanas", "Comando procesado desde la View dedicada de Campañas. Datos inyectados de forma global.", "ia");
        }, 1000);
    };

    return (
        <div className="copiloto-cam-view grid-center-content fade-in">
            <div className="cam-chat-card-premium">
                <header className="cam-chat-header">
                    <div className="cam-title-group">
                        <span className="cam-tag-premium">Módulo de Automatización</span>
                        <h1>Copiloto: <span>Estrategia de Campañas</span></h1>
                        <p>Diseño estructural de triggers lógicos y reglas relacionales automatizadas.</p>
                    </div>
                    <div className="cam-icon-badge"><i className="fa-solid fa-bullhorn"></i></div>
                </header>

                <div className="cam-chat-body">
                    {chats.campanas.map(msg => (
                        <div key={msg.id} className={`cam-msg-row ${msg.sender}`}>
                            <div className="cam-avatar-circle">{msg.sender === "ia" ? "🤖" : "U"}</div>
                            <div className="cam-msg-bubble" dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSend} className="cam-chat-footer-form">
                    <input type="text" placeholder="Modifica reglas de flujos o diseña estrategias de retención..." value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                    <button type="submit">Inyectar Flujo <i className="fa-solid fa-diagram-project"></i></button>
                </form>
            </div>
        </div>
    );
}