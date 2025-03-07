// Importamos React desde la librería 'react', necesario para usar JSX y componentes.
import React from "react";

// Importamos componentes específicos de React Router DOM para manejar rutas en la app.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importamos el componente Login desde su ubicación en 'components/Login.js'
import Login from "./components/Login";

// Importamos el componente Dashboard desde su ubicación en 'components/Dashboard.js'
import Dashboard from "./components/Dashboard";

// Definimos el componente principal de nuestra aplicación, llamado 'App'.
function App() {
  // La función retorna el JSX que renderiza la estructura completa de la aplicación.
  return (
    // Router es el componente principal que envuelve toda nuestra aplicación, habilitando la navegación.
    <Router>
      {/* Un div principal para aplicar estilos generales en toda la aplicación */}
      <div className="App">
        {/* 'Routes' define un conjunto de rutas que la aplicación puede manejar */}
        <Routes>
          {/* Aquí definimos la primera ruta "/" (ruta raíz). */}
          <Route
            path="/" // Ruta raíz o principal del proyecto, generalmente usada para login.
            element={<Login />} // Renderiza el componente Login cuando el usuario ingresa a esta ruta.
          />

          {/* Ruta específica '/dashboard' que mostrará el componente Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

// Exportamos el componente App para que pueda ser utilizado en 'index.js'
export default App;
