import React, { createContext, useState, useContext } from "react";

const BambalinasContext = createContext();

export function BambalinasProvider({ children }) {
    // 1. Estados de los Chats del Copiloto
    const [chats, setChats] = useState({
        whatsapp: [
            { id: 1, sender: "ia", text: "Hola Vicente. Estoy listo para ayudarte a redactar y despachar alertas masivas por WhatsApp. Actualmente la tasa de apertura promedio en tus obras es del 95.3%." },
            { id: 2, sender: "user", text: "Necesito enviar una alerta de última hora para la función de Shrek de este sábado, nos quedan 40 butacas." },
            { id: 3, sender: "ia", text: "Perfecto. He redactado una alerta dirigida al segmento 'Espectadores Impulsivos + Inactivos'. ¿Quieres que la despache ahora mismo a sus WhatsApps?" }
        ],
        audiences: [
            { id: 1, sender: "ia", text: "Canal de Audiencias activado. Puedo estructurar segmentos cruzando datos de PostgreSQL." },
            { id: 2, sender: "user", text: "Filtra a todos los usuarios que hayan venido más de 2 veces a ver 'La Guitarra'." },
            { id: 3, sender: "ia", text: "Query completada. Encontré 342 espectadores que cumplen el criterio. Los he guardado bajo el nuevo segmento estratégico: **'Súper Fans - La Guitarra'**." }
        ],
        campanas: [
            { id: 1, sender: "ia", text: "Centro de control de campañas de marketing automatizado listo." },
            { id: 2, sender: "user", text: "Oye, agendemos el estreno de 'El Acordeón Secreto' para el 15 de octubre. Deja lista una alerta de descuento automática para los súper fans de la guitarra." },
            { id: 3, sender: "ia", text: "¡Entendido! He registrado la nueva obra en el sistema y creé la regla lógica: *Si compra 'La Guitarra' → Esperar 1 mes antes del estreno → Enviar 20% descuento para 'El Acordeón Secreto' via WhatsApp*." }
        ]
    });

    // 2. Estado de la Temporada Actual para el Dashboard
    const [currentSeason] = useState({
        season: "Temporada de Invierno 2026",
        currentPlay: "Shrek: El Musical",
        theaterRoom: "Sala Principal (Bambalinas Central)",
        metrics: {
            occupancyRate: "88.4%",
            ticketsSold: 1240,
            totalSeats: 1400,
            revenuePlay: "$14,880,000",
            activeAutomations: 8
        },
        roomZoning: [
            { id: "pb", name: "Platea Baja Preferencial", sold: 480, capacity: 500, price: "$25,000", status: "Crítico (96%)" },
            { id: "pa", name: "Platea Alta General", sold: 610, capacity: 700, price: "$15,000", status: "Estable (87%)" },
            { id: "pk", name: "Palcos VIP Izq/Der", sold: 150, capacity: 200, price: "$40,000", status: "Acción Requerida (75%)" }
        ],
        recentPerformances: [
            { date: "Viernes 26/06", occupancy: "94%", revenue: "$3,120,000", conversion: "34%" },
            { date: "Sábado 27/06", occupancy: "98%", revenue: "$3,450,000", conversion: "41%" },
            { date: "Domingo 28/06", occupancy: "82%", revenue: "$2,890,000", conversion: "22%" }
        ],
        aiSystemLogs: [
            { id: 1, time: "Hace 4 min", type: "success", text: "Segmento 'Súper Fans - La Guitarra' exportado con éxito a PostgreSQL (342 registros)." },
            { id: 2, time: "Hace 18 min", type: "warning", text: "Alerta de ocupación: Palcos VIP por debajo del umbral óptimo para la función del sábado." },
            { id: 3, time: "Hace 1 hora", type: "info", text: "Regla lógica inyectada: Flujo automatizado listo para el estreno de 'El Acordeón Secreto'." }
        ]
    });

    // 3. Función de Envío de Mensajes (Definida explícitamente antes del return)
    const sendMessage = (category, text, sender = "user") => {
        const newMessage = { id: Date.now(), sender, text };
        setChats(prev => ({
            ...prev,
            [category]: [...prev[category], newMessage]
        }));
    };

    return (
        <BambalinasContext.Provider value={{ chats, sendMessage, currentSeason }}>
            {children}
        </BambalinasContext.Provider>
    );
}

export const useBambalinas = () => useContext(BambalinasContext);