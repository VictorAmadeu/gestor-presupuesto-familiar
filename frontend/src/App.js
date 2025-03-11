// Importamos React, que es necesario para crear componentes en React
import React from "react";

// Importamos BrowserRouter, Routes y Route desde 'react-router-dom'
// BrowserRouter: Habilita la navegación basada en rutas en nuestra app
// Routes: Contiene todas las rutas de nuestra aplicación
// Route: Define cada ruta y el componente que debe renderizarse cuando la ruta coincida
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importamos los componentes principales de la aplicación
import Login from "./components/Login"; // Componente de inicio de sesión
import Dashboard from "./components/Dashboard"; // Componente del Dashboard (área protegida)
import Register from "./components/Register"; // Componente de registro de usuario

// Importamos ProtectedRoute, que se encargará de proteger rutas que requieren autenticación
import ProtectedRoute from "./components/ProtectedRoute";

// Definimos la función principal App, que es nuestro componente raíz
function App() {
  return (
    // Router es el contenedor principal que maneja la navegación en la aplicación
    <Router>
      {/* Routes actúa como un contenedor para definir todas las rutas */}
      <Routes>
        {/* Ruta raíz: Muestra el componente Login cuando el usuario accede a "/" */}
        <Route path="/" element={<Login />} />

        {/* Ruta de registro: Muestra el componente Register cuando el usuario accede a "/register" */}
        <Route path="/register" element={<Register />} />

        {/* Ruta protegida: Dashboard solo será accesible si el usuario está autenticado */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />{" "}
              {/* Solo se renderiza si ProtectedRoute lo permite */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// Exportamos App para que pueda ser usada en otros archivos (como index.js)
export default App;
