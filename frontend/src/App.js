// src/App.js
import React from "react"; // 1. Importa React para poder utilizar JSX y crear componentes.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 2. Importa BrowserRouter, Routes y Route de react-router-dom para gestionar la navegación de la aplicación.

// 3. Importa el componente Navbar, que se mostrará en todas las páginas.
import Navbar from "./components/Navbar";

// 4. Importa los componentes de las diferentes páginas de la aplicación.
import Login from "./components/Login"; // 4.1. Componente para la página de inicio de sesión.
import Register from "./components/Register"; // 4.2. Componente para la página de registro de usuarios.
import Dashboard from "./components/Dashboard"; // 4.3. Componente para la página principal, que generalmente requiere autenticación.

// 5. Importa el componente ProtectedRoute y el AuthProvider.
//    ProtectedRoute se utiliza para restringir el acceso a rutas privadas.
//    AuthProvider proporciona el contexto de autenticación para la aplicación.
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  // 6. Define el componente funcional App, que es el núcleo de la aplicación.
  return (
    // 7. Se retorna el JSX que representa la estructura de la aplicación.
    <AuthProvider>
      {" "}
     
      <Router>
        {" "}
        
        {/* Navbar siempre visible en la parte superior */}
        <Navbar /> 
        {/* Rutas de la aplicación */}
        <Routes>
          {" "}
          
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route
            path="/dashboard"
            element={
              // 14. Ruta "/dashboard", protegida por ProtectedRoute.
              <ProtectedRoute>
                {" "}
                
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; // 15. Exporta el componente App para que pueda ser utilizado en otros módulos (por ejemplo, en index.js).
