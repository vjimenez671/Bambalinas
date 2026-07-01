import React, { useState, useEffect } from "react";
import "../styles/Audiencias.css";

export default function Audiencias() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("Todos");
    const [isDragging, setIsDragging] = useState(false);
    
    // Estado simulado de la base de datos (PostgreSQL)
    const [spectators, setSpectators] = useState([
        { id: 1, name: "Catalina Silva", email: "catasilva@email.com", phone: "+56 9 8765 4321", label: "Impulsivo", match: "Ticketera", lastShow: "Shrek el Musical" },
        { id: 2, name: "Ignacio Aravena", email: "iaravena@email.com", phone: "+56 9 7654 3210", label: "Dupla / QR", match: "QR Sala", lastShow: "Hamlet" },
        { id: 3, name: "Javiera Toledo", email: "jtoledo@email.com", phone: "+56 9 6543 2109", label: "Impulsivo", match: "Ticketera", lastShow: "Shrek el Musical" },
        { id: 4, name: "José Tomás Pardo", email: "jtpardo@email.com", phone: "+56 9 5432 1098", label: "Súper Fan", match: "Cruce Retroactivo", lastShow: "La Obra de la Guitarra" },
        { id: 5, name: "Francisca Reyes", email: "fran.reyes@email.com", phone: "+56 9 4321 0987", label: "Súper Fan", match: "Ticketera", lastShow: "La Obra de la Guitarra" },
        { id: 6, name: "Matías Muñoz", email: "mmunoz@email.com", phone: "+56 9 3210 9876", label: "Inactivo", match: "QR Sala", lastShow: "Mamma Mia (2025)" }
    ]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Simulación de carga de archivo Excel/CSV
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            alert(`📊 Archivo "${files[0].name}" detectado correctamente. Parseando filas e inyectando datos indexados en PostgreSQL...`);
            // Aquí iría la lógica con la librería 'xlsx' o el envío por FormData al backend
        }
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            alert(`📊 Cargando "${files[0].name}"... Sincronizando registros con la base de datos.`);
        }
    };

    // Edición Inline Simulada (Edita directamente en la tabla)
    const handleCellChange = (id, field, value) => {
        setSpectators(prev => 
            prev.map(item => item.id === id ? { ...item, [field]: value } : item)
        );
    };

    // Lógica de Filtrado combinada (Buscador + Tags Laterales)
    const filteredSpectators = spectators.filter(spec => {
        const matchesSearch = spec.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              spec.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              spec.lastShow.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (selectedFilter === "Todos") return matchesSearch;
        return matchesSearch && spec.label === selectedFilter;
    });

    return (
        <main className="audiences-unique-context">
            <div className="audiences-container">
                
                {/* ENCABEZADO */}
                <header className="audiences-premium-header">
                    <div className="header-title-area">
                        <span className="audiences-tag-premium">CRM & Segmentación</span>
                        <h1 className="audiences-display-h1">Base de <span>Audiencias.</span></h1>
                    </div>
                </header>

                {/* ZONA DE CARGA DROPZONE */}
                <section 
                    className={`audiences-dropzone ${isDragging ? "dragging" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="dropzone-content">
                        <i className="fa-solid fa-file-excel dropzone-icon"></i>
                        <h3>Importar Temporada Reciente</h3>
                        <p>Arrastra tu archivo Excel (.xlsx) o CSV aquí, o explora tus archivos locales</p>
                        <label className="dropzone-file-btn">
                            Seleccionar Archivo
                            <input type="file" accept=".xlsx, .csv" onChange={handleFileSelect} hidden />
                        </label>
                    </div>
                </section>

                {/* CONTENIDO PRINCIPAL: FILTROS + TABLA */}
                <div className="audiences-workspace-layout">
                    
                    {/* BARRA LATERAL DE FILTROS (SEGMENTOS) */}
                    <aside className="audiences-sidebar-filters">
                        <h4>Segmentos de la IA</h4>
                        <div className="filter-buttons-stack">
                            {["Todos", "Súper Fan", "Impulsivo", "Dupla / QR", "Inactivos"].map((filter) => (
                                <button
                                    key={filter}
                                    className={`filter-sidebar-btn ${selectedFilter === filter ? "active" : ""}`}
                                    onClick={() => setSelectedFilter(filter)}
                                >
                                    <i className="fa-solid fa-layer-group"></i>
                                    <span>{filter === "Inactivos" ? "Inactivo" : filter}</span>
                                </button>
                            ))}
                        </div>
                        <div className="sidebar-info-box">
                            <i className="fa-solid fa-circle-info"></i>
                            <p>Los cambios y nuevos segmentos guardados aquí se reflejarán inmediatamente en el panel de control del Copiloto IA.</p>
                        </div>
                    </aside>

                    {/* CONTENEDOR DE LA TABLA */}
                    <section className="audiences-card-premium table-panel">
                        <div className="table-panel-header">
                            <div className="search-bar-wrapper">
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <input 
                                    type="text" 
                                    placeholder="Buscar por nombre, correo u obra..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <span className="table-counter">Mostrando {filteredSpectators.length} registros</span>
                        </div>

                        <div className="audiences-table-responsive-wrapper">
                            <table className="audiences-datagrid">
                                <thead>
                                    <tr>
                                        <th>Nombre del Espectador</th>
                                        <th>Email</th>
                                        <th>Teléfono</th>
                                        <th>Última Función</th>
                                        <th>Categoría IA</th>
                                        <th>Origen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSpectators.length > 0 ? (
                                        filteredSpectators.map((spectator) => (
                                            <tr key={spectator.id} className="datagrid-row">
                                                <td className="col-name">
                                                    <input 
                                                        type="text" 
                                                        value={spectator.name} 
                                                        onChange={(e) => handleCellChange(spectator.id, "name", e.target.value)}
                                                        className="inline-cell-input bold"
                                                    />
                                                </td>
                                                <td>
                                                    <input 
                                                        type="email" 
                                                        value={spectator.email} 
                                                        onChange={(e) => handleCellChange(spectator.id, "email", e.target.value)}
                                                        className="inline-cell-input"
                                                    />
                                                </td>
                                                <td>
                                                    <input 
                                                        type="text" 
                                                        value={spectator.phone} 
                                                        onChange={(e) => handleCellChange(spectator.id, "phone", e.target.value)}
                                                        className="inline-cell-input numeric"
                                                    />
                                                </td>
                                                <td className="col-show">{spectator.lastShow}</td>
                                                <td>
                                                    <span className={`badge-tag label-tag ${spectator.label.toLowerCase().replace(/ \/ /g, '-').replace(/ú/g, 'u')}`}>
                                                        {spectator.label}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge-tag match-tag">{spectator.match}</span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="table-empty-state">
                                                No se encontraron espectadores con los filtros aplicados.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>

                {/* FOOTER */}
                <footer className="audiences-premium-footer">
                    <p>Bambalinas IA • Conexión cifrada a PostgreSQL activa en producción.</p>
                    <div className="footer-line"></div>
                </footer>

            </div>
        </main>
    );
}