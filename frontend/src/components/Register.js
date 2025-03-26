// Línea 1: Importamos React y dos Hooks específicos (useState, useContext).
import React, { useState, useContext } from "react";

// Línea 2: Importamos useNavigate de react-router-dom para redirigir al usuario.
import { useNavigate } from "react-router-dom";

// Línea 3: Importamos nuestro archivo api, que contiene la configuración de axios para llamadas HTTP.
import api from "../services/api";

// Línea 4: Importamos nuestro contexto de autenticación, donde están las funciones de login, logout, etc.
import AuthContext from "../context/AuthContext";

// Línea 5: Definimos el componente funcional Register, que se encarga de manejar el formulario de registro.
const Register = () => {
  // Línea 6: Creamos un estado local para el campo 'name' del formulario.
  const [name, setName] = useState("");

  // Línea 7: Creamos un estado local para el campo 'email' del formulario.
  const [email, setEmail] = useState("");

  // Línea 8: Creamos un estado local para el campo 'password' del formulario.
  const [password, setPassword] = useState("");

  // Línea 9: Creamos un estado local para 'role', definimos por defecto 'member' para el rol de usuario.
  const [role, setRole] = useState("member");

  // Línea 10: Creamos un estado local para almacenar mensajes al usuario (éxito o error).
  const [mensaje, setMensaje] = useState("");

  // Línea 11: Instanciamos useNavigate para redirigir al usuario después del registro.
  const navigate = useNavigate();

  // Línea 12: Extraemos la función 'login' desde nuestro contexto, para iniciar sesión inmediatamente después de registrar.
  const { login } = useContext(AuthContext);

  // Línea 13: Declaramos la función asincrónica handleRegister, que se ejecuta al hacer submit en el formulario.
  const handleRegister = async (e) => {
    // Línea 14: Prevenimos el comportamiento por defecto del formulario (recargar la página).
    e.preventDefault();

    try {
      // Línea 15: Enviamos la petición POST a la ruta 'register' de nuestro backend, pasando los datos del formulario.
      const response = await api.post("register", {
        name, // Nombre ingresado por el usuario
        email, // Correo ingresado
        password, // Contraseña ingresada
        role, // Rol seleccionado ('member' o 'admin')
      });

      // Línea 16: Actualizamos el mensaje a mostrar, indicando que todo salió bien.
      setMensaje("Registro exitoso. Iniciando sesión automáticamente...");

      // Línea 17: Llamamos a la función login (proporcionada por AuthContext) para iniciar sesión de inmediato con el token y rol.
      login(response.data.token, response.data.user.role);

      // Línea 18: Redirigimos al usuario al Dashboard una vez registrado.
      navigate("/dashboard");
    } catch (error) {
      // Línea 19: Si ocurre algún error en el registro, mostramos un mensaje de error genérico.
      setMensaje("Error al registrar. Verifica los datos.");
    }
  };

  // Línea 20: Retornamos la estructura en JSX que define el formulario de registro.
  return (
    // Línea 21: Usamos un div que centra el contenido (d-flex justify-content-center align-items-center)
    // y ocupa toda la altura de la ventana (vh-100).
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* Línea 22: Creamos una tarjeta con sombra (shadow-sm), padding interno (p-4) y un ancho fijo (width: 350px). */}
      <div className="card shadow-sm p-4" style={{ width: "350px" }}>
        {/* Línea 23: Título centrado y con margen inferior (text-center mb-4). */}
        <h3 className="text-center mb-4">Registro de Usuario</h3>

        {/* Línea 24: Si existe un mensaje en 'mensaje', lo mostramos dentro de una alerta de Bootstrap. */}
        {mensaje && <div className="alert alert-info">{mensaje}</div>}

        {/* Línea 25: Iniciamos el formulario, asignando onSubmit al manejador handleRegister. */}
        <form onSubmit={handleRegister}>
          {/* Línea 26: Agrupamos el campo 'Nombre' con mb-3 para margen inferior. */}
          <div className="mb-3">
            {/* Línea 27: Etiqueta del campo 'Nombre'. */}
            <label className="form-label">Nombre:</label>
            {/* Línea 28: Input tipo texto para ingresar el nombre. */}
            <input
              type="text"
              className="form-control"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Línea 29: Div para el campo 'Correo'. */}
          <div className="mb-3">
            <label className="form-label">Correo:</label>
            {/* Línea 30: Input tipo email para el correo electrónico. */}
            <input
              type="email"
              className="form-control"
              placeholder="usuario@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Línea 31: Div para el campo 'Contraseña'. */}
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            {/* Línea 32: Input tipo password para la contraseña del usuario. */}
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Línea 33: Div para seleccionar el rol (miembro o admin). */}
          <div className="mb-3">
            <label className="form-label">Rol:</label>
            {/* Línea 34: Select con clase form-select para escoger 'member' o 'admin'. */}
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {/* Línea 35: Opción por defecto 'Miembro'. */}
              <option value="member">Miembro</option>
              {/* Línea 36: Opción 'Administrador'. */}
              <option value="admin">Administrador</option>
            </select>
          </div>

          {/* Línea 37: Botón para enviar el formulario, con clase w-100 para ocupar todo el ancho. */}
          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>
        {/* Fin del formulario */}

        {/* Línea 38: Agregamos un texto en la parte inferior para enlazar a la misma página de registro 
            (tal como solicitaste), aunque normalmente esto se usaría en la página de Login.
            Lo dejamos tal cual para cumplir con tu requerimiento literal. */}
        <p className="text-center mt-3">
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
      {/* Fin de la card */}
    </div>
    // Fin del contenedor principal que centra el formulario vertical y horizontalmente
  );
};
// Fin del componente Register

// Línea 39: Exportamos nuestro componente Register para que pueda usarse en otros lugares de la aplicación.
export default Register;
