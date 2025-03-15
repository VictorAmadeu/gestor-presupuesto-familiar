// src/index.js

import React from "react"; // 1. Importa la biblioteca React para trabajar con JSX y componentes.
import ReactDOM from "react-dom/client"; // 2. Importa ReactDOM desde 'react-dom/client' para usar la nueva API createRoot() de React 18+.
import "./index.css"; // 3. Importa la hoja de estilos global de la aplicación.
import "bootstrap/dist/css/bootstrap.min.css"; // 4. Importa el archivo CSS principal de Bootstrap para aplicar sus estilos.
import App from "./App"; // 5. Importa el componente principal de la aplicación (App).

// 6. Crea la raíz de renderizado utilizando el elemento HTML con id "root".
const root = ReactDOM.createRoot(document.getElementById("root"));

// 7. Renderiza la aplicación dentro de la raíz creada, envolviendo el contenido en React.StrictMode para ayudar a detectar problemas potenciales.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
