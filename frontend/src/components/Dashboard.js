/********************************************************************
 * Dashboard.js
 * ---------------------------------------------------------------
 * Componente principal para el panel de control (Dashboard) donde
 * se gestionan categorías, transacciones y se visualizan reportes.
 * Ahora manejamos el "logout" usando 'useNavigate' dentro de este
 * componente (en vez de usarlo dentro de AuthContext).
 ********************************************************************/

import React, { useContext, useState } from "react";
// 1) Importamos React y los hooks useContext y useState.
// - useContext nos permite acceder al contexto de autenticación (AuthContext).
// - useState lo usamos para manejar los refrescos de listas cuando se crean elementos nuevos.

import { useNavigate } from "react-router-dom";
// 2) useNavigate es un hook de React Router que usaremos para redirigir al hacer logout.

import CategoryForm from "./CategoryForm";
// 3) Componente para el formulario de creación de categorías.

import CategoryList from "./CategoryList";
// 4) Componente que muestra la lista de categorías.

import TransactionForm from "./TransactionForm";
// 5) Componente para el formulario de creación de transacciones.

import TransactionList from "./TransactionList";
// 6) Componente que muestra la lista de transacciones.

import ReportChart from "./ReportChart";
// 7) Componente que muestra el gráfico de reportes de transacciones.

import TablasDashboard from "./TablasDashboard";
// 8) NUEVO: Importamos el componente TablasDashboard que contiene las tablas detalladas de gastos e ingresos.

import AuthContext from "../context/AuthContext";
// 9) Importamos el contexto de autenticación para acceder a 'user' y 'logout'.

/********************************************************************
 * Definición del componente Dashboard
 ********************************************************************/
const Dashboard = () => {
    // 10) Definimos el componente funcional principal: Dashboard.

    const { user, logout } = useContext(AuthContext);
    // 11) Usamos el contexto para extraer el usuario actual (user) y la función logout.

    const navigate = useNavigate();
    // 12) Hook de navegación para redirigir cuando el usuario cierre sesión.

    const [refreshCategories, setRefreshCategories] = useState(false);
    // 13) Estado que forzará el refresco de la lista de categorías.

    const handleCategoryCreated = () => {
        // 14) Función que se llama después de crear una categoría.
        // Cambia el estado a su contrario para forzar el re-render.
        setRefreshCategories(!refreshCategories);
    };

    const [refreshTransactions, setRefreshTransactions] = useState(false);
    // 15) Estado que forzará el refresco de la lista de transacciones.

    const handleTransactionCreated = () => {
        // 16) Función que se llama después de crear una transacción.
        setRefreshTransactions(!refreshTransactions);
    };

    const handleLogout = () => {
        // 17) Función que se llama cuando el usuario hace clic en "Cerrar sesión".
        logout(); // 18) Cerramos sesión.
        navigate("/"); // 19) Redirigimos al login.
    };

    /********************************************************************
     * Render principal del componente
     ********************************************************************/
    return (
        <div className="container mt-4">
            {/* 20) Contenedor Bootstrap con margen superior. */}

            <h2 className="mb-4">Panel Principal</h2>
            {/* 21) Título de la página con margen inferior. */}

            <div className="alert alert-primary">
                {/* 22) Alerta azul clara con mensaje de bienvenida. */}
                Bienvenido, rol: <strong>{user?.role}</strong>
                {/* 23) Mostramos el rol del usuario usando optional chaining. */}
            </div>

            <button className="btn btn-secondary mb-3" onClick={handleLogout}>
                {/* 24) Botón que ejecuta 'handleLogout' para cerrar sesión. */}
                Cerrar sesión
            </button>

            <div className="row">
                {/* 25) Fila de Bootstrap para dividir la pantalla en dos columnas. */}

                <div className="col-md-6">
                    {/* 26) Columna izquierda para la sección de Categorías. */}
                    <div className="card shadow-sm mb-4">
                        {/* 27) Tarjeta con sombra y margen inferior. */}
                        <div className="card-header bg-primary text-white">
                            {/* 28) Cabecera azul con texto blanco. */}
                            Gestión de Categorías
                        </div>
                        <div className="card-body">
                            {/* 29) Contenedor del formulario y la lista de categorías. */}
                            <CategoryForm
                                onCategoryCreated={handleCategoryCreated}
                            />
                            {/* 30) Formulario que crea categorías y refresca la lista. */}

                            <hr />
                            {/* 31) Separador horizontal. */}

                            <CategoryList refresh={refreshCategories} />
                            {/* 32) Lista de categorías que se refresca cuando cambia 'refreshCategories'. */}
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    {/* 33) Columna derecha para las Transacciones. */}
                    <div className="card shadow-sm mb-4">
                        {/* 34) Tarjeta con sombra y margen inferior. */}
                        <div className="card-header bg-success text-white">
                            {/* 35) Cabecera verde con texto blanco. */}
                            Gestión de Transacciones
                        </div>
                        <div className="card-body">
                            {/* 36) Contenedor del formulario y la lista de transacciones. */}

                            <TransactionForm
                                onTransactionCreated={handleTransactionCreated}
                            />
                            {/* 37) Formulario que crea transacciones y refresca la lista. */}

                            <hr />
                            {/* 38) Separador horizontal. */}

                            <TransactionList refresh={refreshTransactions} />
                            {/* 39) Lista de transacciones que se refresca al cambiar 'refreshTransactions'. */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mb-4">
                {/* 40) Tarjeta para mostrar el gráfico de reportes. */}
                <div className="card-header bg-info text-white">
                    {/* 41) Cabecera celeste con texto blanco. */}
                    Reporte de Transacciones
                </div>
                <div className="card-body">
                    {/* 42) Contenedor del gráfico. */}
                    <ReportChart />
                    {/* 43) Componente que muestra el gráfico. */}
                </div>
            </div>

            <div className="card shadow-sm mb-5">
                {/* 44) NUEVA tarjeta que contiene las tablas detalladas. */}
                <div className="card-header bg-dark text-white">
                    {/* 45) Cabecera negra con texto blanco para distinguir esta sección. */}
                    Tablas Detalladas de Gastos e Ingresos
                </div>
                <div className="card-body">
                    {/* 46) Contenedor del componente TablasDashboard. */}
                    <TablasDashboard />
                    {/* 47) Mostramos el componente que contiene las dos tablas con filtros y ordenamiento. */}
                </div>
            </div>
        </div>
    );
};

/********************************************************************
 * Exportar el componente
 ********************************************************************/
export default Dashboard;
// 48) Exportamos el componente Dashboard para que pueda ser usado en las rutas.
