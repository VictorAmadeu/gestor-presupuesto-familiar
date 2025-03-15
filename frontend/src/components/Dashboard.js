// src/components/Dashboard.js
import React from "react"; // Importamos React para poder utilizar JSX y definir componentes
import CategoryForm from "./CategoryForm"; // Importamos el componente para el formulario de categorías
import CategoryList from "./CategoryList"; // Importamos el componente que lista las categorías
import TransactionForm from "./TransactionForm"; // Importamos el componente para el formulario de transacciones
import TransactionList from "./TransactionList"; // Importamos el componente que lista las transacciones
import ReportChart from "./ReportChart"; // Importamos el componente que muestra el gráfico de reportes
import { useContext } from "react"; // Importamos el hook useContext para acceder al contexto
import AuthContext from "../context/AuthContext"; // Importamos el contexto de autenticación

const Dashboard = () => {
  // Definimos el componente funcional Dashboard
  const { user, logout } = useContext(AuthContext);
  // Extraemos 'user' y 'logout' desde AuthContext usando useContext para manejar la sesión del usuario

  return (
    // Inicio del bloque JSX que define la interfaz de usuario del componente
    <div className="container mt-4">
      {" "}
      {/* Contenedor principal de Bootstrap con margen superior (mt-4) */}
      <h2 className="mb-4">Panel Principal</h2>{" "}
      {/* Título principal con margen inferior (mb-4) para separación visual */}
      <div className="alert alert-primary">
        {" "}
        {/* Alerta de Bootstrap para resaltar el mensaje de bienvenida */}
        Bienvenido, rol: <strong>{user?.role}</strong>
        {/* Muestra el rol del usuario utilizando optional chaining para evitar errores si 'user' es undefined */}
      </div>
      <button className="btn btn-secondary mb-3" onClick={logout}>
        {/* Botón de Bootstrap para cerrar sesión, con margen inferior (mb-3); al hacer clic, ejecuta la función logout */}
        Cerrar sesión {/* Texto del botón */}
      </button>
      <div className="row">
        {" "}
        {/* Fila de Bootstrap para organizar el contenido en columnas */}
        <div className="col-md-6">
          {" "}
          {/* Columna que ocupa la mitad del ancho en pantallas medianas */}
          <div className="card shadow-sm mb-4">
            {" "}
            {/* Tarjeta de Bootstrap con sombra pequeña (shadow-sm) y margen inferior (mb-4) */}
            <div className="card-header bg-primary text-white">
              Gestión de Categorías
              {/* Encabezado de la tarjeta con fondo azul (bg-primary) y texto blanco, indica la sección de categorías */}
            </div>
            <div className="card-body">
              {" "}
              {/* Cuerpo de la tarjeta para incluir los componentes relacionados con categorías */}
              <CategoryForm /> {/* Componente para crear nuevas categorías */}
              <hr />{" "}
              {/* Línea horizontal para separar visualmente el formulario de la lista */}
              <CategoryList />{" "}
              {/* Componente para listar las categorías existentes */}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {" "}
          {/* Columna que ocupa la otra mitad del ancho en pantallas medianas */}
          <div className="card shadow-sm mb-4">
            {" "}
            {/* Tarjeta de Bootstrap con sombra pequeña y margen inferior */}
            <div className="card-header bg-success text-white">
              Gestión de Transacciones
              {/* Encabezado de la tarjeta con fondo verde (bg-success) y texto blanco, indica la sección de transacciones */}
            </div>
            <div className="card-body">
              {" "}
              {/* Cuerpo de la tarjeta para incluir los componentes relacionados con transacciones */}
              <TransactionForm />{" "}
              {/* Componente para crear nuevas transacciones */}
              <hr />{" "}
              {/* Línea horizontal para separar visualmente el formulario de la lista */}
              <TransactionList />{" "}
              {/* Componente para listar las transacciones existentes */}
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-sm">
        {" "}
        {/* Tarjeta de Bootstrap para el reporte de transacciones, con sombra pequeña */}
        <div className="card-header bg-info text-white">
          Reporte de Transacciones
          {/* Encabezado de la tarjeta con fondo info (bg-info) y texto blanco, para el reporte */}
        </div>
        <div className="card-body">
          {" "}
          {/* Cuerpo de la tarjeta que contiene el gráfico de reportes */}
          <ReportChart />{" "}
          {/* Componente que muestra el gráfico basado en las transacciones registradas */}
        </div>
      </div>
    </div>
  ); // Fin del bloque JSX
};

export default Dashboard;
// Exportamos el componente Dashboard para poder utilizarlo en otras partes de la aplicación
