import React, { useState, useRef, useEffect } from "react";
import { useBambalinas } from "../context/BambalinasContext";
import "../styles/CopilotoPersistente.css";

export default function CopilotoPersistente() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [activeTab, setActiveTab] = useState("whatsapp");
    const [inputVal, setInputVal] = useState("");
    const { chats, sendMessage } = useBambalinas();
    const chatEndRef = useRef(null);

    useEffect(() => {
        document.documentElement.style.setProperty("--copiloto-width", isExpanded ? "340px" : "0px");
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [isExpanded, chats, activeTab]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputVal.trim()) return;

        sendMessage(activeTab, inputVal, "user");
        const currentInput = inputVal;
        setInputVal("");

        setTimeout(() => {
            sendMessage(activeTab, `Recibido en canal ${activeTab.toUpperCase()}. Sincronizando cambios en la base de datos de Bambalinas...`, "ia");
        }, 1000);
    };

    return (
        <aside className={`copiloto-persistent-sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
            <button className="toggle-copiloto-btn" onClick={() => setIsExpanded(!isExpanded)}>
                <i className={`fa-solid ${isExpanded ? "fa-chevron-right" : "fa-brain"}`}></i>
            </button>

            {isExpanded && (
                <div className="copiloto-panel-inner">
                    <div className="copiloto-panel-header">
                        <i className="fa-solid fa-robot ai-logo"></i>
                        <div><h3>Bambalinas Copiloto</h3><span className="ai-status-sub">Panel Flotante</span></div>
                    </div>

                    <div className="copiloto-tabs-selector">
                        <button className={`chat-tab-trigger ${activeTab === "whatsapp" ? "active" : ""}`} onClick={() => setActiveTab("whatsapp")}><i className="fa-brands fa-whatsapp"></i> WSP</button>
                        <button className={`chat-tab-trigger ${activeTab === "audiences" ? "active" : ""}`} onClick={() => setActiveTab("audiences")}><i className="fa-solid fa-users"></i> Aud</button>
                        <button className={`chat-tab-trigger ${activeTab === "campanas" ? "active" : ""}`} onClick={() => setActiveTab("campanas")}><i className="fa-solid fa-bullhorn"></i> Cam</button>
                    </div>

                    <div className="copiloto-messages-container">
                        {chats[activeTab].map(msg => (
                            <div key={msg.id} className={`copiloto-msg-wrapper ${msg.sender}`}>
                                <div className="copiloto-bubble" dangerouslySetInnerHTML={{ __html: msg.text }}></div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSend} className="copiloto-form-input">
                        <input type="text" placeholder="Instruir a la IA..." value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                        <button type="submit"><i className="fa-solid fa-paper-plane"></i></button>
                    </form>
                </div>
            )}
        </aside>
    );
}