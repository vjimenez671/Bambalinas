import React, { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { BambalinasProvider } from "./context/BambalinasContext";
import Sidebar from "./components/Sidebar";
import CopilotoPersistente from "./components/CopilotoPersistente";

// 1. Módulos principales del Negocio
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Audiencias = lazy(() => import("./pages/Audiencias.jsx"));
const Campanas = lazy(() => import("./pages/Campanas.jsx"));

// 2. Las 3 Nuevas Vistas Dedicadas para cada Chat del Copiloto IA
const CopilotoWsp = lazy(() => import("./pages/CopilotoWsp.jsx"));
const CopilotoAudiencias = lazy(() => import("./pages/CopilotoAudiencias.jsx"));
const CopilotoCampanas = lazy(() => import("./pages/CopilotoCampanas.jsx"));

const AppLayout = () => {
  return (
    <BambalinasProvider>
      {/* Estructura maestra del espacio de trabajo de la App */}
      <div className="app-workspace-master-layout">
        
        {/* Columna Izquierda: Menú con subcategorías */}
        <Sidebar />
        
        {/* Columna Central: Contenido centrado y flexible */}
        <div className="app-main-view-container">
          <Suspense fallback={
            <div style={{ 
              background: '#0a0a0c', color: '#ffffff', minHeight: '50vh', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif'
            }}>
              <i className="fa-solid fa-circle-notch fa-spin" style={{ color: '#7b2cbf', marginRight: '10px' }}></i> 
              Iniciando canal contextual...
            </div>
          }>
            <Outlet />
          </Suspense>
        </div>

        {/* Columna Derecha: Panel flotante persistente */}
        <CopilotoPersistente />
        
      </div>
    </BambalinasProvider>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Landing / Vistas públicas fuera de la App corporativa */}
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
        <Route path="/" element={<h1>Home Pública</h1>} />
      </Route>

      {/* Workspace Privado (Contenedor con Sidebar + Copiloto Derecho) */}
      <Route element={<AppLayout />}>
        {/* Rutas estándar */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/audiencias" element={<Audiencias />} />
        <Route path="/campanas" element={<Campanas />} />
        
        {/* Rutas exclusivas para las vistas completas de la IA */}
        <Route path="/copiloto/whatsapp" element={<CopilotoWsp />} />
        <Route path="/copiloto/audiencias" element={<CopilotoAudiencias />} />
        <Route path="/copiloto/campanas" element={<CopilotoCampanas />} />
      </Route>
    </>
  )
);