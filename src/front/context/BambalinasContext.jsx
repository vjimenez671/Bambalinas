import React, { createContext, useState, useContext } from "react";

const BambalinasContext = createContext();

export function BambalinasProvider({ children }) {
  // Estado de la obra seleccionada actualmente
  const [currentShow, setCurrentShow] = useState({
    title: "Shrek, El Musical",
    season: "Temporada Invierno 2026",
    occupancy: 68,
    breakdown: { planificados: 45, dudosos: 35, impulsivos: 20 }
  });

  // Métricas generales del Dashboard
  const [metrics, setMetrics] = useState({
    totalAudience: 1420,
    seatsSaved: 342,
    creditsLeft: 145,
    creditsTotal: 350
  });

  // Alertas completas sugeridas por la IA (¡De vuelta a su estado original!)
  const [alerts, setAlerts] = useState([
    { id: 1, type: "emergency", text: "🚨 Alerta Crítica: Baja venta para este viernes en el Teatro Mori. Quedan 42 butacas vacías (45% de ocupación). Sugerencia: Lanzar campaña de Botón Salvavidas.", time: "Hace 10 min" },
    { id: 2, type: "fidelization", text: "📈 Oportunidad de Campaña: Detectamos 120 'Súper Fans' que asistieron a la temporada pasada pero aún no compran para esta. Sugerencia: Enviar recordatorio premium.", time: "Hace 2 horas" },
    { id: 3, type: "success", text: "✅ Campaña Completada: Se despachó el WhatsApp masivo para 'Cruce Retroactivo'. 15 nuevos espectadores adquirieron sus tickets.", time: "Ayer" }
  ]);

  // Historial del chat del Copiloto
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ia",
      text: "¡Hola Vicente! Soy Bambalinas IA. Veo que la función de este viernes para 'Shrek, El Musical' tiene solo un 45% de ocupación (42 butacas vacías). ¿Quieres que activemos el Botón Salvavidas para hacer sala?"
    },
    {
      id: 2,
      sender: "user",
      text: "Sí, porfa. Filtra a los que compran a última hora y armas una campaña."
    },
    {
      id: 3,
      sender: "ia",
      text: "¡Entendido! He activado el escáner en PostgreSQL. Encontré **85 espectadores** clasificados como 'Última Hora / Impulsivos' de la temporada pasada que calzan perfecto. Al lado derecho te dejé la lista detectada y una propuesta de mensaje con sentido de urgencia. ¿Te tinca el texto o le cambiamos algo?"
    }
  ]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { id: Date.now(), sender, text }]);
  };

  return (
    <BambalinasContext.Provider value={{
      currentShow, setCurrentShow,
      metrics, setMetrics,
      messages, addMessage,
      alerts, setAlerts
    }}>
      {children}
    </BambalinasContext.Provider>
  );
}

export function useBambalinas() {
  return useContext(BambalinasContext);
}