import React, { useState, useRef, useEffect } from "react";
import { useBambalinas } from "../context/BambalinasContext";
import "../styles/CopilotoAudiencias.css";

export default function CopilotoAudiencias() {
    const { chats, sendMessage } = useBambalinas();
    const [inputVal, setInputVal] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats.audiences]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputVal.trim()) return;
        sendMessage("audiences", inputVal, "user");
        setInputVal("");

        setTimeout(() => {
            sendMessage("audiences", "Query e indexación de bases de datos finalizada. El clúster de audiencias ha sido actualizado en la base central.", "ia");
        }, 1000);
    };

    return (
        <div className="copiloto-aud-view grid-center-content fade-in">
            <div className="aud-chat-card-premium">
                <header className="aud-chat-header">
                    <div className="aud-title-group">
                        <span className="aud-tag-premium">Segmentación Inteligente</span>
                        <h1>Copiloto: <span>Audiencias Espectadoras</span></h1>
                        <p>Diseño conceptual de cohortes cruzando comportamientos de compra históricos.</p>
                    </div>
                    <div className="aud-icon-badge"><i className="fa-solid fa-users-viewfinder"></i></div>
                </header>

                <div className="aud-chat-body">
                    {chats.audiences.map(msg => (
                        <div key={msg.id} className={`aud-msg-row ${msg.sender}`}>
                            <div className="aud-avatar-circle">{msg.sender === "ia" ? "🤖" : "U"}</div>
                            <div className="aud-msg-bubble" dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSend} className="aud-chat-footer-form">
                    <input type="text" placeholder="Filtra usuarios o define criterios relacionales para tus segmentos..." value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                    <button type="submit">Modelar Cohorte <i className="fa-solid fa-calculator"></i></button>
                </form>
            </div>
        </div>
    );
}