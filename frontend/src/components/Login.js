// ********************************************************************************************
// 1) Se importan las librerías y módulos necesarios para el correcto funcionamiento del Login.
// ********************************************************************************************
import React, { useState, useContext } from "react"; // 'React' para crear componentes; 'useState' y 'useContext' son hooks de React.
import { useNavigate } from "react-router-dom"; // 'useNavigate' habilita la navegación programática en React Router.
import api from "../services/api"; // 'api' es nuestra instancia personalizada de axios para el backend.
import AuthContext from "../context/AuthContext"; // 'AuthContext' provee estado y funciones para la autenticación en la app.

// *****************************************************************************
// 2) Se define el componente funcional 'Login' que representa la pantalla de login.
// *****************************************************************************
const Login = () => {
  // ------------------------------------------------------------------------------------------
  // A) Declaración de estados locales para almacenar los valores de email, password y mensajes.
  // ------------------------------------------------------------------------------------------
  const [email, setEmail] = useState(""); // Guarda el correo ingresado por el usuario.
  const [password, setPassword] = useState(""); // Guarda la contraseña ingresada por el usuario.
  const [mensaje, setMensaje] = useState(""); // Guarda un mensaje para feedback al usuario (éxito o error).

  // ------------------------------------------------------------------------------------------------
  // B) Se obtienen funciones del contexto y herramientas de React Router para manejar autenticación.
  // ------------------------------------------------------------------------------------------------
  const { login } = useContext(AuthContext); // Función 'login' que asigna token y rol al usuario en la app.
  const navigate = useNavigate(); // Permite redirigir al usuario a otra ruta tras el login.

  // -------------------------------------------------------------------------------------------------------------------
  // 3) Función asíncrona que maneja el evento 'submit' del formulario para procesar el inicio de sesión en el backend.
  // -------------------------------------------------------------------------------------------------------------------
  const handleSubmit = async (evento) => {
    evento.preventDefault(); // Evita la recarga de página por defecto al enviar el formulario.

    try {
      // Se envían 'email' y 'password' al endpoint 'login' del backend con método POST.
      const respuesta = await api.post("login", { email, password });

      // Si la autenticación es exitosa, 'respuesta.data' contiene el token y la información del usuario.
      // Se llama la función 'login' del contexto para almacenar en el estado global:
      //  - El token de acceso.
      //  - El rol (member, admin, etc.).
      login(respuesta.data.token, respuesta.data.user.role);

      // Se actualiza el estado 'mensaje' para notificar que todo salió bien.
      setMensaje("Inicio de sesión exitoso");

      // Redirige al usuario al Dashboard.
      navigate("/dashboard");
    } catch (error) {
      // Si ocurre algún error (credenciales inválidas o fallo en el servidor), se muestra un mensaje al usuario.
      setMensaje("Credenciales inválidas. Intente de nuevo.");
    }
  };

  // ********************************************************************************
  // 4) Estructura de la interfaz gráfica (JSX) que se renderiza en pantalla.
  // ********************************************************************************
  return (
    // ----------------------------------------------------------------------------------------
    // A) Contenedor principal que ocupa toda la altura de la ventana (vh-100) y centra el card.
    //    'd-flex' para usar flexbox, 'justify-content-center' y 'align-items-center' centran.
    // ----------------------------------------------------------------------------------------
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* --------------------------------------------------------------------------------------------
          B) 'card' con sombra (shadow-sm), padding de 4 (p-4) y ancho fijo de 350px para el formulario.
          -------------------------------------------------------------------------------------------- */}
      <div className="card shadow-sm p-4" style={{ width: "350px" }}>
        {/* -------------------------------------------------------------------------
            Título del formulario. 'text-center mb-4' para centrar y margen inferior.
            ------------------------------------------------------------------------- */}
        <h3 className="text-center mb-4">Inicia Sesión</h3>

        {/* -------------------------------------------------------------
            C) Formulario que llama a 'handleSubmit' en el evento onSubmit.
            ------------------------------------------------------------- */}
        <form onSubmit={handleSubmit}>
          {/* ------------------------------------------------------------------------
              Campo para el email, usa el estado 'email' y se actualiza con setEmail.
              'form-control' de Bootstrap para estilo y 'mb-3' para espaciado inferior.
              ------------------------------------------------------------------------ */}
          <input
            className="form-control mb-3"
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            placeholder="Email"
            required
          />
          {/* ----------------------------------------------------------------------------
              Campo para la contraseña, usa el estado 'password' y se actualiza con setPassword.
              'form-control mb-3' para estilo y espacio; 'type=password' para ocultar caracteres.
              ---------------------------------------------------------------------------- */}
          <input
            className="form-control mb-3"
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            placeholder="Contraseña"
            required
          />
          {/* -------------------------------------------------------------------
              Botón de envío ocupa todo el ancho (w-100) y se estiliza con btn-primary.
              ------------------------------------------------------------------- */}
          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>

        {/* -------------------------------------------------------------------------------------
            D) Mensaje de feedback: si 'mensaje' tiene valor, se muestra dentro de una alerta.
            'mt-3' agrega margen superior para separar la alerta del formulario.
            ------------------------------------------------------------------------------------- */}
        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}

        {/* ----------------------------------------------------------------------------------------------------
            E) Enlace para usuarios que no tienen cuenta, dirige a la ruta '/register' para registrarse.
            'text-center mt-3' para centrar el texto y dar margen superior.
            ---------------------------------------------------------------------------------------------------- */}
        <p className="text-center mt-3">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-decoration-none">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

// ***************************************************************************
// 5) Se exporta el componente Login para poder importarlo en otros archivos.
// ***************************************************************************
export default Login;
