/********************************************************************
 *  AuthContext.js
 *  ---------------------------------------------------------------
 *  Proveedor (Provider) de contexto para la gestión de autenticación
 *  en toda la aplicación. Maneja estados de usuario, token y login.
 *  Se elimina el uso de 'useNavigate' para evitar el error:
 *  "useNavigate() may be used only in the context of a <Router> component."
 ********************************************************************/

import React, { createContext, useState, useEffect } from "react";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 1) Importamos las funciones y componentes básicos de React:
//    - createContext para crear un contexto de autenticación
//    - useState para manejar estados (token, user)
//    - useEffect para ejecutar efectos secundarios al cambiar el token

/********************************************************************
 * 1. Creación del contexto
 ********************************************************************/
const AuthContext = createContext();
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 2) Creamos un contexto llamado 'AuthContext'. Este se usará para
//    compartir información de autenticación en toda la aplicación.

/********************************************************************
 * 2. Definición y export del Provider
 ********************************************************************/
export const AuthProvider = ({ children }) => {
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // 3) Componente 'AuthProvider' que envuelve a toda la app y provee
  //    datos y métodos de autenticación.

  /********************************************************************
   * 2.1 Estados locales: user y token
   ********************************************************************/
  const [user, setUser] = useState(null);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // 4) 'user' guardará la info del usuario, p.ej. rol, nombre, etc.

  const [token, setToken] = useState(localStorage.getItem("token"));
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // 5) 'token' guardará el token de autenticación.
  //    Se inicializa leyendo el token que pueda existir en 'localStorage'.

  /********************************************************************
   * 2.2 Efecto: Vigilar cambios en 'token'
   ********************************************************************/
  useEffect(() => {
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 6) Cada vez que 'token' cambie, este 'useEffect' se ejecuta.

    if (token) {
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // 7) Si hay 'token', significa que el usuario está "logueado".

      setUser({
        role: localStorage.getItem("userRole"),
      });
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // 8) Leemos el rol del usuario desde localStorage y lo guardamos
      //    en nuestro estado 'user'.
    }
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 9) Si no hay 'token', 'user' se queda como null.
  }, [token]);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // 10) El array de dependencias: [token].
  //     Esto significa que se re-ejecuta cuando 'token' cambia.

  /********************************************************************
   * 2.3 Función de login
   ********************************************************************/
  const login = (newToken, role) => {
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 11) 'login' recibe un 'newToken' y un 'role'.

    localStorage.setItem("token", newToken);
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 12) Guardamos el 'newToken' en localStorage para persistencia.

    localStorage.setItem("userRole", role);
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 13) Guardamos también el 'role' en localStorage para recuperarlo tras recarga.

    setToken(newToken);
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 14) Actualizamos el estado 'token'.

    setUser({ role });
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 15) Actualizamos el estado 'user' con el rol proporcionado.
  };

  /********************************************************************
   * 2.4 Función de logout (cerrar sesión)
   ********************************************************************/
  const logout = () => {
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 16) 'logout' cierra la sesión.

    localStorage.removeItem("token");
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 17) Eliminamos el 'token' de localStorage.

    localStorage.removeItem("userRole");
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 18) Eliminamos también el 'userRole'.

    setToken(null);
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 19) Ponemos 'token' en null, indicando que no hay sesión activa.

    setUser(null);
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 20) Ponemos 'user' en null, indicando que no hay datos de usuario.

    // NO USAMOS useNavigate AQUI
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // 21) Eliminamos el redireccionamiento con 'useNavigate', para evitar
    //     el error "useNavigate() may be used only in the context of a <Router>".
  };

  /********************************************************************
   * 2.5 Retorno del Provider
   ********************************************************************/
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {/* 
        22) 'value' es el objeto que compartimos con todos los componentes
        que consuman este AuthContext. Pueden leer 'user', 'token' y 
        llamar a 'login' y 'logout'.
      */}
      {children}
      {/* 23) 'children' es lo que se renderiza dentro de <AuthProvider> 
         en App.js, o sea, toda la app. */}
    </AuthContext.Provider>
  );
};

/********************************************************************
 * 3. Export por defecto del Contexto
 ********************************************************************/
export default AuthContext;
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// 24) Exportamos 'AuthContext' para poder usarlo en otros componentes.
//     Ejemplo: import AuthContext from "../context/AuthContext";
