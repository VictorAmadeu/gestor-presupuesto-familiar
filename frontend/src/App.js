// src/App.js

import React from "react";
// 1. Importa React, que es necesario para trabajar con JSX y crear componentes funcionales o de clase.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// 2. Importa componentes del paquete react-router-dom:
//    - BrowserRouter: gestiona el enrutamiento de la aplicación mediante el historial del navegador.
//    - Routes: contenedor que agrupa todas las rutas de la aplicación.
//    - Route: define cada una de las rutas (páginas) y qué componente mostrar.

import "bootstrap-icons/font/bootstrap-icons.css";
// 3. Importa los íconos de Bootstrap desde el paquete bootstrap-icons para poder usarlos en toda la aplicación.
//    Ejemplos: <i className="bi bi-house"></i>, <i className="bi bi-gear"></i>, etc.
//    Esto es útil para mejorar la interfaz visual con íconos modernos sin tener que usar imágenes externas.

import Navbar from "./components/Navbar";
// 4. Importa el componente Navbar, que actúa como menú de navegación principal y estará visible en todas las páginas.

import Login from "./components/Login";
// 5. Importa el componente Login, que contiene el formulario de inicio de sesión.

import Register from "./components/Register";
// 6. Importa el componente Register, que permite a nuevos usuarios registrarse en la aplicación.

import Dashboard from "./components/Dashboard";
// 7. Importa el componente Dashboard, que es la página principal del sistema (sólo accesible después de iniciar sesión).

import ProtectedRoute from "./components/ProtectedRoute";
// 8. Importa el componente ProtectedRoute, que sirve para proteger rutas privadas.
//    Este componente verifica si el usuario está autenticado antes de mostrar el contenido.

import { AuthProvider } from "./context/AuthContext";
// 9. Importa el AuthProvider, que es un componente de contexto que proporciona el estado de autenticación
//    a todos los componentes hijos. Esto permite saber si el usuario está logueado y quién es.

function App() {
  // 10. Define el componente funcional App, que representa la estructura principal de la aplicación.
  return (
    // 11. Envolvemos todo el contenido con <AuthProvider> para que todos los componentes tengan acceso al contexto de autenticación.
    <AuthProvider>
      {/* 12. <Router> permite usar navegación mediante rutas definidas con react-router-dom. */}
      <Router>
        {/* 13. El componente Navbar se mostrará en la parte superior de todas las páginas, sin importar la ruta. */}
        <Navbar />

        {/* 14. <Routes> contiene todas las rutas de la aplicación, que definen qué componente se muestra para cada URL. */}
        <Routes>
          {/* 15. Ruta principal "/" → muestra el componente Login cuando el usuario accede a la raíz del sitio. */}
          <Route path="/" element={<Login />} />

          {/* 16. Ruta "/register" → muestra el componente Register para crear una cuenta nueva. */}
          <Route path="/register" element={<Register />} />

          {/* 17. Ruta "/dashboard" → protegida. Sólo se accede si el usuario está autenticado. */}
          <Route
            path="/dashboard"
            element={
              // 18. Envuelve el Dashboard dentro de <ProtectedRoute> para restringir el acceso si el usuario no está logueado.
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// 19. Exporta el componente App como default para que pueda ser utilizado en el archivo index.js y lanzar la aplicación.
export default App;
