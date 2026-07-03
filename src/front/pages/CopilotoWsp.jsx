import React, { useState, useRef, useEffect } from "react";
import { useBambalinas } from "../context/BambalinasContext";
import "../styles/CopilotoWsp.css";

export default function CopilotoWsp() {
    const { chats, sendMessage } = useBambalinas();
    const [inputVal, setInputVal] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats.whatsapp]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputVal.trim()) return;
        sendMessage("whatsapp", inputVal, "user");
        setInputVal("");

        setTimeout(() => {
            sendMessage("whatsapp", "Comando procesado desde la vista de WhatsApp. Sincronizando la cola de mensajería masiva de Bambalinas...", "ia");
        }, 1000);
    };

    return (
        <div className="copiloto-wsp-view grid-center-content fade-in">
            <div className="wsp-chat-card-premium">
                <header className="wsp-chat-header">
                    <div className="wsp-title-group">
                        <span className="wsp-tag-premium">Canal de Difusión</span>
                        <h1>Copiloto: <span>WhatsApp Masivo</span></h1>
                        <p>Redacta, aprueba plantillas oficiales (HSM) y gatilla alertas en tiempo real.</p>
                    </div>
                    <div className="wsp-icon-badge"><i className="fa-brands fa-whatsapp"></i></div>
                </header>

                <div className="wsp-chat-body">
                    {chats.whatsapp.map(msg => (
                        <div key={msg.id} className={`wsp-msg-row ${msg.sender}`}>
                            <div className="wsp-avatar-circle">{msg.sender === "ia" ? "🤖" : "U"}</div>
                            <div className="wsp-msg-bubble" dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSend} className="wsp-chat-footer-form">
                    <input type="text" placeholder="Escribe un mensaje o pide una plantilla para WhatsApp..." value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                    <button type="submit">Enviar Alerta <i className="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
    );
}