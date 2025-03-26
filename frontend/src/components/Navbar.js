// [LÍNEA 1] Importamos la librería principal de React, necesaria para crear componentes.
import React from "react";
// [LÍNEA 2] Importamos el componente Link desde 'react-router-dom' para manejar la navegación sin recargar la página.
import { Link } from "react-router-dom";

// [LÍNEA 3] Definimos el componente funcional 'Navbar' que mostrará nuestra barra de navegación.
const Navbar = () => {
  // [LÍNEA 4] Retornamos el JSX que describe la estructura y estilos de nuestra barra de navegación.
  return (
    // [LÍNEA 5] Etiqueta <nav> de HTML, que define la barra de navegación. Le asignamos clases de Bootstrap
    // y un estilo inline para establecer un color de fondo personalizado (#004080).
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#004080" }}
    >
      {/* [LÍNEA 6] Dentro de la barra, usamos un contenedor de Bootstrap para alinear y espaciar el contenido. */}
      <div className="container">
        {/* [LÍNEA 7] Este Link sirve de "marca" o "logo" de la aplicación, con el ícono y nombre. 
            'to="/" ' indica que se redirige a la ruta raíz (login, en este caso). 
            'navbar-brand' es una clase de Bootstrap para resaltar la marca.
            'fw-bold' da una fuente en negrita. */}
        <Link className="navbar-brand fw-bold" to="/">
          💰 Gestor Familiar
        </Link>

        {/* [LÍNEA 8] Este botón aparece en pantallas pequeñas y permite colapsar o expandir el menú de navegación. */}
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          {/* [LÍNEA 9] Icono de la "hamburguesa" que se ve en dispositivos móviles para abrir/cerrar el menú. */}
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* [LÍNEA 10] Contenedor que se colapsa en pantallas pequeñas. Tiene la clase 'collapse navbar-collapse'. 
            'id="navbarNav"' se vincula al 'data-bs-target' del botón anterior para mostrarse u ocultarse. */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* [LÍNEA 11] Lista de enlaces de navegación, alineada a la derecha gracias a 'ms-auto' de Bootstrap. */}
          <ul className="navbar-nav ms-auto">
            {/* [LÍNEA 12] Primer ítem de la lista: enlace a la ruta '/', asociada al Login. */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>

            {/* [LÍNEA 13] Segundo ítem de la lista: enlace a '/register', asociado al formulario de Registro. */}
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Registro
              </Link>
            </li>

            {/* [LÍNEA 14] Tercer ítem de la lista: enlace a '/dashboard', la vista principal tras iniciar sesión. */}
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

// [LÍNEA 15] Exportamos el componente 'Navbar' para poder usarlo en otros archivos de la aplicación.
export default Navbar;
