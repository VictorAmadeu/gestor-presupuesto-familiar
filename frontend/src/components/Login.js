// Importamos React y el hook useState desde la librería 'react'.
// useState nos permite crear y manejar estados locales en un componente funcional.
import React, { useState } from "react"; // ← Importación de React y useState

// Importamos la instancia personalizada de axios (api) que configuramos para llamar al backend.
import api from "../services/api"; // ← Importación de la configuración de llamadas a la API

// Importamos el hook useNavigate de 'react-router-dom' para navegar programáticamente entre rutas.
import { useNavigate } from "react-router-dom"; // ← Para redirigir a otra ruta tras el login

// Definimos el componente funcional Login, que será el encargado de manejar el formulario de inicio de sesión.
const Login = () => {
  // ← Inicio de la función del componente Login

  // useNavigate nos provee la capacidad de navegar a otras rutas dentro de la aplicación.
  const navigate = useNavigate(); // ← Hook para redirecciones programáticas

  // Definimos estados locales: 'email', 'password' y 'mensaje'.
  // - email: para almacenar el texto del campo de correo.
  // - password: para almacenar la contraseña ingresada por el usuario.
  // - mensaje: para mostrar mensajes de éxito o error al usuario.
  const [email, setEmail] = useState(""); // ← Estado para email
  const [password, setPassword] = useState(""); // ← Estado para password
  const [mensaje, setMensaje] = useState(""); // ← Estado para mensajes en la pantalla

  // Función que se ejecuta cuando se envía el formulario de inicio de sesión.
  // Es asíncrona porque usaremos await para llamar al backend.
  const handleLogin = async (e) => {
    // ← Inicio de la función handleLogin
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario.
    try {
      // Llamamos a la ruta 'login' de la API, pasando email y password en el cuerpo de la petición.
      // 'api' está configurado en ../services/api con la URL base de nuestro backend.
      const response = await api.post("login", {
        email, // ← Email capturado en el estado
        password, // ← Password capturado en el estado
      });

      // Si la llamada es exitosa, el backend devolverá un token y, opcionalmente, información del usuario.
      // Guardamos ese token en localStorage para mantener la sesión activa.
      localStorage.setItem("token", response.data.token);
      // Guardamos además el rol del usuario (admin o member) si viene en la respuesta.
      localStorage.setItem("userRole", response.data.user.role);

      // Actualizamos el estado 'mensaje' para indicar que el login fue exitoso.
      setMensaje("Login exitoso");

      // Redirigimos al usuario al dashboard utilizando useNavigate.
      navigate("/dashboard");
    } catch (error) {
      // Si hay un error (por ejemplo, credenciales inválidas), mostramos mensaje de error al usuario.
      console.error("Error en login:", error);
      setMensaje("Credenciales inválidas. Inténtalo de nuevo.");
    }
  }; // ← Fin de la función handleLogin

  // El JSX que retorna este componente, que representa la interfaz de inicio de sesión.
  return (
    // Usamos un contenedor <div> para agrupar el contenido.
    <div>
      {/* Título para el formulario de inicio de sesión */}
      <h2>Iniciar Sesión</h2>

      {/* Si 'mensaje' no está vacío, mostramos el texto en un <p> */}
      {mensaje && <p>{mensaje}</p>}

      {/* Formulario que llama a handleLogin cuando se hace submit */}
      <form onSubmit={handleLogin}>
        {/* Campo para ingresar el correo */}
        <div>
          <label>Email:</label>
          {/* 
            Enlazamos el valor del input con la variable de estado 'email'.
            Al cambiar el texto, actualizamos el estado con setEmail.
          */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // ← Campo obligatorio
          />
        </div>

        {/* Campo para ingresar la contraseña */}
        <div>
          <label>Contraseña:</label>
          {/* 
            Enlazamos el valor del input con la variable de estado 'password'.
            Al cambiar el texto, actualizamos el estado con setPassword.
          */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // ← Campo obligatorio
          />
        </div>

        {/* Botón para enviar el formulario y ejecutar handleLogin */}
        <button type="submit">Entrar</button>
      </form>
    </div>
  ); // ← Fin del JSX
}; // ← Fin del componente funcional Login

// Exportamos el componente Login como el export por defecto de este archivo,
// de modo que pueda importarse y utilizarse en otros lugares de la aplicación.
export default Login; // ← Exportación del componente Login
