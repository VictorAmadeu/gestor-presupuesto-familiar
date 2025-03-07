// src/components/Login.js

import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Petición de login a la API
      const response = await api.post("login", {
        email,
        password,
      });

      // 1) GUARDA el token en localStorage
      localStorage.setItem("token", response.data.token);

      // 2) Muestra mensaje de éxito
      setMensaje("Login exitoso");

      // 3) Redirige al Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en login:", error);
      setMensaje("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
// src/components/CategoryList.js 