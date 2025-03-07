// src/components/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Lee el token almacenado tras el login
  const token = localStorage.getItem("token");

  // Si NO hay token, redirige a "/"
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si hay token, renderiza el contenido (Dashboard, por ejemplo)
  return children;
};

export default ProtectedRoute;
// src/components/Dashboard.js 