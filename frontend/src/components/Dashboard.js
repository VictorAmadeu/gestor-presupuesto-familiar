/********************************************************************
 * Dashboard.js
 * ---------------------------------------------------------------
 * Componente principal para el panel de control (Dashboard) donde
 * se gestionan categorías, transacciones y se visualizan reportes.
 * Ahora manejamos el "logout" usando 'useNavigate' dentro de este
 * componente (en vez de usarlo dentro de AuthContext).
 ********************************************************************/

import React, { useContext, useState } from "react";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 1) Importamos React y algunos hooks:
//    - useContext para consumir el AuthContext (user, logout).
//    - useState para manejar triggers de refresco.

import { useNavigate } from "react-router-dom";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 2) Importamos 'useNavigate' para redirigir tras hacer logout.

import CategoryForm from "./CategoryForm";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 3) Formulario para crear nuevas categorías.

import CategoryList from "./CategoryList";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 4) Lista para mostrar todas las categorías.

import TransactionForm from "./TransactionForm";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 5) Formulario para crear nuevas transacciones.

import TransactionList from "./TransactionList";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 6) Lista para mostrar todas las transacciones.

import ReportChart from "./ReportChart";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 7) Componente para mostrar gráficos (reporte) de las transacciones.

import AuthContext from "../context/AuthContext";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 8) Importamos nuestro contexto de autenticación para leer 'user' y 'logout'.

/********************************************************************
 * Definición del componente Dashboard
 ********************************************************************/
const Dashboard = () => {
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // 9) Iniciamos el componente funcional 'Dashboard'.

  const { user, logout } = useContext(AuthContext);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // 10) Extraemos 'user' y 'logout' desde el contexto AuthContext.
  //     'user' contiene la info (ej: user.role) y 'logout' cierra la sesión.

  const navigate = useNavigate();
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // 11) Hook de React Router para redirigir luego de 'logout'.

  const [refreshCategories, setRefreshCategories] = useState(false);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // 12) Estado para forzar la recarga de CategoryList. Con 'false' por defecto.

  const handleCategoryCreated = () => {
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 13) Cada vez que se cree una categoría, alternamos 'refreshCategories'
    //     para que CategoryList se refresque y muestre la nueva categoría.
    setRefreshCategories(!refreshCategories);
  };

  const [refreshTransactions, setRefreshTransactions] = useState(false);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // 14) Estado para forzar la recarga de TransactionList.

  const handleTransactionCreated = () => {
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 15) Al crear una transacción, alternamos 'refreshTransactions'
    //     para que TransactionList se refresque con la nueva transacción.
    setRefreshTransactions(!refreshTransactions);
  };

  /********************************************************************
   * Manejador de logout con redirección
   ********************************************************************/
  const handleLogout = () => {
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 16) Cuando el usuario hace clic en "Cerrar sesión":
    logout();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 17) Llamamos la función 'logout' (AuthContext) para limpiar token y user.
    navigate("/");
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 18) Redirigimos inmediatamente a la ruta raíz (Login).
  };

  /********************************************************************
   * Render principal del componente
   ********************************************************************/
  return (
    <div className="container mt-4">
      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         19) 'container mt-4': Clase de Bootstrap que brinda margen top. */}

      <h2 className="mb-4">Panel Principal</h2>
      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         20) Título principal con margen inferior. */}

      <div className="alert alert-primary">
        {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
           21) Alerta de Bootstrap con color primario (azul claro). */}
        Bienvenido, rol: <strong>{user?.role}</strong>
        {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
           22) Mostramos el rol del usuario si existe 'user'. */}
      </div>

      <button className="btn btn-secondary mb-3" onClick={handleLogout}>
        {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
           23) Botón que cierra sesión y luego redirige con handleLogout. */}
        Cerrar sesión
      </button>

      <div className="row">
        {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
           24) 'row': Clase de Bootstrap para organizar columnas. */}

        <div className="col-md-6">
          {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
             25) Columna de 6 para Categorías. */}
          <div className="card shadow-sm mb-4">
            {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
               26) Tarjeta con sombra y margen inferior. */}
            <div className="card-header bg-primary text-white">
              {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 27) Encabezado con fondo azul y texto blanco. */}
              Gestión de Categorías
            </div>
            <div className="card-body">
              {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 28) Cuerpo de la tarjeta. Aquí se ubica el formulario y la lista. */}

              <CategoryForm onCategoryCreated={handleCategoryCreated} />
              {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 29) Al crear una categoría, llama 'handleCategoryCreated'
                     para refrescar la lista. */}

              <hr />
              {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 30) Línea horizontal para separar la sección. */}

              <CategoryList refresh={refreshCategories} />
              {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 31) 'refreshCategories' cambia al crear una categoría,
                     forzando CategoryList a re-renderizar. */}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
             32) Columna de 6 para las Transacciones. */}
          <div className="card shadow-sm mb-4">
            {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
               33) Tarjeta con sombra y margen inferior. */}
            <div className="card-header bg-success text-white">
              {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 34) Encabezado verde para Transacciones. */}
              Gestión de Transacciones
            </div>
            <div className="card-body">
              {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 35) Contenido de la tarjeta. Formulario + Lista. */}

              <TransactionForm
                onTransactionCreated={handleTransactionCreated}
              />
              {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 36) Al crear transacción, llama 'handleTransactionCreated'. */}

              <hr />
              {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 37) Línea horizontal como separador. */}

              <TransactionList refresh={refreshTransactions} />
              {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                 38) La lista de transacciones se refresca cuando 
                     'refreshTransactions' cambia. */}
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
           39) Tarjeta adicional para el Reporte de Transacciones. */}
        <div className="card-header bg-info text-white">
          {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
             40) Fondo info (celeste) y texto blanco. */}
          Reporte de Transacciones
        </div>
        <div className="card-body">
          {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
             41) Cuerpo de la tarjeta. Aquí va el gráfico con Recharts. */}
          <ReportChart />
          {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
             42) Muestra el gráfico en base a tus transacciones. */}
        </div>
      </div>
    </div>
  );
};

/********************************************************************
 * Exportar el componente
 ********************************************************************/
export default Dashboard;
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 43) Exportamos 'Dashboard' para poder usarlo en las rutas de la app.
