// Importamos React porque estamos usando JSX en este componente.
import React from "react";

// Importamos `Navigate` de `react-router-dom` para poder redirigir a los usuarios no autenticados.
import { Navigate } from "react-router-dom";

// Definimos un componente funcional llamado `ProtectedRoute` que recibe `children` como prop.
const ProtectedRoute = ({ children }) => {
  // Obtenemos el `token` almacenado en `localStorage` después de que el usuario haya iniciado sesión.
  const token = localStorage.getItem("token");

  // Si el `token` NO existe (es `null` o `undefined`), redirigimos al usuario a la página de inicio ("/").
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si el `token` existe (el usuario está autenticado), mostramos el contenido dentro de `children`.
  return children;
};

// Exportamos el componente `ProtectedRoute` para que pueda ser usado en otros archivos.
export default ProtectedRoute;
