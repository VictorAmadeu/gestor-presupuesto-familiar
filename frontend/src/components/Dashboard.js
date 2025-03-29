// Línea 1: Importa React y los hooks useState y useContext para manejar estados y contexto
import React, { useContext, useState } from "react";

// Línea 2: Importa useNavigate para redirigir al usuario tras cerrar sesión
import { useNavigate } from "react-router-dom";

// Líneas 4-7: Importa los componentes del sistema (formularios, listas y gráfico)
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import ReportChart from "./ReportChart";

// Línea 9: Importa el contexto de autenticación para obtener el usuario actual y la función logout
import AuthContext from "../context/AuthContext";

// Línea 11: Define el componente funcional principal del panel de control
const Dashboard = () => {
  // Línea 13: Extrae usuario y función logout desde el contexto
  const { user, logout } = useContext(AuthContext);

  // Línea 15: Hook para navegación programática
  const navigate = useNavigate();

  // Línea 18: Estado para actualizar la sección de categorías
  const [refreshCategories, setRefreshCategories] = useState(false);

  // Línea 20: Función que alterna el estado para forzar actualización de categorías
  const handleCategoryChange = () => setRefreshCategories((prev) => !prev);

  // Línea 23: Estado para actualizar la sección de transacciones
  const [refreshTransactions, setRefreshTransactions] = useState(false);

  // Línea 25: Función que alterna el estado para forzar actualización de transacciones
  const handleTransactionChange = () => setRefreshTransactions((prev) => !prev);

  // Línea 28: Función para cerrar sesión y redirigir al inicio
  const handleLogout = () => {
    logout(); // Cierra sesión desde el contexto
    navigate("/"); // Redirige al login
  };

  // Línea 33: Devuelve el JSX completo del panel de control
  return (
    <div className="container mt-4">
      {/* Línea 35: Título del panel */}
      <h2 className="mb-4">Panel Principal</h2>

      {/* Línea 38: Mensaje de bienvenida con rol del usuario */}
      <div className="alert alert-primary">
        Bienvenido, rol: <strong>{user?.role}</strong>
      </div>

      {/* Línea 42: Botón para cerrar sesión */}
      <button className="btn btn-secondary mb-3" onClick={handleLogout}>
        Cerrar sesión
      </button>

      {/* Línea 46: Contenedor principal con dos columnas */}
      <div className="row">
        {/* Línea 48: Columna izquierda - Gestión de Categorías */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              Gestión de Categorías
            </div>
            <div className="card-body">
              {/* Línea 54: Formulario para añadir categorías */}
              <CategoryForm onCategoryCreated={handleCategoryChange} />

              <hr />

              {/* Línea 58: Lista de categorías con actualización automática */}
              <CategoryList
                refresh={refreshCategories}
                onCategoryDeleted={() => {
                  handleCategoryChange(); // ✅ Refresca categorías
                  handleTransactionChange(); // ✅ También refresca transacciones
                }}
              />
            </div>
          </div>
        </div>

        {/* Línea 67: Columna derecha - Gestión de Transacciones */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-success text-white">
              Gestión de Transacciones
            </div>
            <div className="card-body">
              {/* Línea 73: Formulario de transacciones, escucha cambios en categorías */}
              <TransactionForm
                onTransactionCreated={handleTransactionChange}
                refreshCategories={refreshCategories} // ✅ Actualiza el select
              />

              <hr />

              {/* Línea 79: Lista de transacciones con refresco dinámico */}
              <TransactionList
                refresh={refreshTransactions}
                onTransactionDeleted={handleTransactionChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Línea 87: Sección de reporte en gráfico de barras */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-info text-white">
          Reporte de Transacciones
        </div>
        <div className="card-body">
          <ReportChart refresh={refreshTransactions} />
          {/* ✅ El gráfico se actualiza automáticamente tras crear o eliminar transacciones */}
        </div>
      </div>
    </div>
  );
};

// Línea 95: Exporta el componente para uso en rutas u otros módulos
export default Dashboard;
