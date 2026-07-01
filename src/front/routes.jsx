import React, { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { BambalinasProvider } from "./context/BambalinasContext";
import Sidebar from "./components/Sidebar";

// Lazy load de las páginas públicas y privadas
const Home = lazy(() => import("./pages/Home"));
const Single = lazy(() => import("./pages/Single").then(module => ({ default: module.Single })));
const Demo = lazy(() => import("./pages/Demo").then(module => ({ default: module.Demo })));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Copilot = lazy(() => import("./pages/Copilot.jsx"));
const Audiencias = lazy(() => import("./pages/Audiencias.jsx")); // <- Nueva página importada con Lazy Load

// Layout Privado simplificado al máximo: Solo inyecta el Contexto y Suspense 
// para evitar comportamientos extraños con las estructuras CSS propias de tus páginas.
const AppLayout = () => (
  <BambalinasProvider>
    <Sidebar />
    <Suspense fallback={
      <div style={{ 
        background: '#0a0a0c', 
        color: '#ffffff', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontFamily: 'sans-serif'
      }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ color: '#7b2cbf', marginRight: '10px' }}></i> 
        Cargando...
      </div>
    }>
      <Outlet />
    </Suspense>
  </BambalinasProvider>
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* 1. SECCIÓN PÚBLICA */}
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
        <Route path="/" element={<Home />} />
        <Route path="/single/:theId" element={<Single />} />
        <Route path="/demo" element={<Demo />} />
      </Route>

      {/* 2. SECCIÓN APLICACIÓN PRIVADA */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/copiloto" element={<Copilot />} />
        <Route path="/audiencias" element={<Audiencias />} /> {/* <- Nueva ruta agregada */}
      </Route>
    </>
  )
);