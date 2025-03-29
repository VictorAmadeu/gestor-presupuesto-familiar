// src/components/Login.js

// Importa React y los hooks useState y useContext para manejar el estado y acceder a contextos.
import React, { useState, useContext } from "react";
// Importa useNavigate para realizar redirecciones programáticas.
import { useNavigate } from "react-router-dom";
// Importa la instancia personalizada de axios configurada para comunicarse con el backend.
import api from "../services/api";
// Importa el contexto de autenticación para acceder a la función de login.
import AuthContext from "../context/AuthContext";

const Login = () => {
  // Define el estado local para almacenar el correo ingresado por el usuario.
  const [email, setEmail] = useState("");
  // Define el estado local para almacenar la contraseña ingresada por el usuario.
  const [password, setPassword] = useState("");
  // Define el estado local para mostrar mensajes de éxito o error.
  const [mensaje, setMensaje] = useState("");

  // Extrae la función 'login' del contexto de autenticación.
  const { login } = useContext(AuthContext);
  // Obtiene la función navigate para redireccionar al usuario tras el login.
  const navigate = useNavigate();

  // Función asíncrona que se ejecuta al enviar el formulario.
  const handleSubmit = async (e) => {
    // Previene el comportamiento por defecto del formulario (recarga de la página).
    e.preventDefault();

    try {
      // Realiza la petición POST a la ruta 'login' enviando email y password.
      const res = await api.post("login", { email, password });
      // Al obtener una respuesta exitosa, llama a la función 'login' del contexto
      // para almacenar el token y el rol del usuario.
      login(res.data.token, res.data.user.role);
      // Actualiza el estado 'mensaje' con un mensaje de éxito.
      setMensaje("Inicio de sesión exitoso");
      // Redirige al usuario a la ruta '/dashboard'.
      navigate("/dashboard");
    } catch (error) {
      // En caso de error, actualiza 'mensaje' con un mensaje de error.
      setMensaje("Credenciales inválidas. Intente de nuevo.");
    }
  };

  // Retorna la interfaz de usuario del formulario de inicio de sesión.
  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form
        onSubmit={handleSubmit}
        className="card p-4"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label className="form-label">Correo:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@ejemplo.com"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
