import React from "react";
import { Link } from "react-router-dom";

// Componente Navbar que muestra una barra de navegación moderna utilizando Bootstrap y React Router
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      {/* Navbar con fondo oscuro, texto claro y sombra pequeña para realzar */}
      <div className="container">
        {/* Título o logo de la aplicación con ícono y estilo de fuente en negrita */}
        <Link className="navbar-brand fw-bold" to="/">
          💰 Gestor Familiar
        </Link>
        {/* Botón hamburguesa para activar la visualización del menú en pantallas pequeñas */}
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Contenedor del menú de navegación que se colapsa en pantallas pequeñas */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Enlace a la página de Login */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
            {/* Enlace a la página de Registro */}
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Registro
              </Link>
            </li>
            {/* Enlace a la página del Dashboard */}
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
