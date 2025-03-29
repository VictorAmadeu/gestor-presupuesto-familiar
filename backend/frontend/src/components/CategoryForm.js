// ****************************************************************************************************
// Línea 1: Importa React y el hook useState, que permite manejar estados dentro del componente.
import React, { useState } from "react";

// ****************************************************************************************************
// Línea 2: Importa el objeto "api" configurado con Axios desde el archivo de servicios.
// Este objeto se utiliza para hacer peticiones HTTP al backend de Laravel.
import api from "../services/api";

// ****************************************************************************************************
// Línea 4: Define el componente funcional CategoryForm, que recibe una prop opcional "onCategoryCreated".
// Esta función será llamada después de crear una categoría, para actualizar la lista.
const CategoryForm = ({ onCategoryCreated }) => {
    // Línea 5: Estado local "name" para guardar el nombre de la categoría escrita por el usuario.
    const [name, setName] = useState("");

    // Línea 6: Estado local "type" que define el tipo de categoría: "gasto" o "ingreso".
    // Se inicializa como "gasto", que es lo que espera el backend.
    const [type, setType] = useState("gasto");

    // Línea 7: Estado "mensaje" para mostrar alertas de éxito o error en la interfaz.
    const [mensaje, setMensaje] = useState("");

    // ****************************************************************************************************
    // Línea 9: Función que maneja el evento de envío del formulario.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Línea 10: Previene el comportamiento por defecto del formulario (recargar la página).

        try {
            // Línea 12: Enviamos los datos al backend con una solicitud POST a /api/categories
            await api.post("categories", { name, type });

            // Línea 14: Si la solicitud fue exitosa, mostramos un mensaje de éxito.
            setMensaje("Categoría creada con éxito");

            // Línea 16-18: Limpiamos los campos del formulario para permitir una nueva entrada.
            setName(""); // Limpia el nombre
            setType("gasto"); // Vuelve a seleccionar "gasto" como valor por defecto

            // Línea 20: Si se proporcionó una función "onCategoryCreated", la llamamos para que el padre actualice la lista.
            onCategoryCreated && onCategoryCreated();
        } catch (error) {
            // Línea 23: Si ocurre un error en la solicitud, mostramos un mensaje de error.
            setMensaje("Error al crear categoría.");
        }
    };

    // ****************************************************************************************************
    // Línea 27: JSX que define la estructura visual del formulario.
    return (
        <form onSubmit={handleSubmit}>
            {" "}
            {/* Línea 28: Formulario con evento onSubmit que llama a handleSubmit */}
            {/* Línea 29: Si existe un mensaje (éxito o error), lo mostramos en un div estilizado como alerta */}
            {mensaje && <div className="alert alert-success">{mensaje}</div>}
            {/* Línea 31: Grupo de input para ingresar el nombre de la categoría */}
            <div className="mb-3">
                <label className="form-label">Nombre:</label>{" "}
                {/* Línea 32: Etiqueta para el input de nombre */}
                <input
                    className="form-control" // Línea 34: Clase Bootstrap para estilos
                    type="text" // Línea 35: Tipo de input: texto
                    value={name} // Línea 36: Valor controlado vinculado al estado "name"
                    onChange={(e) => setName(e.target.value)} // Línea 37: Actualiza el estado "name" cuando el usuario escribe
                    required // Línea 38: Campo obligatorio
                />
            </div>
            {/* Línea 41: Grupo de select para elegir el tipo de categoría */}
            <div className="mb-3">
                <label className="form-label">Tipo:</label>{" "}
                {/* Línea 42: Etiqueta para el selector */}
                <select
                    className="form-select" // Línea 44: Clase Bootstrap para estilos del select
                    value={type} // Línea 45: Valor controlado vinculado al estado "type"
                    onChange={(e) => setType(e.target.value)} // Línea 46: Actualiza el estado "type" cuando el usuario cambia
                >
                    {/* Línea 48-49: Opciones disponibles. Ahora están corregidas con los valores esperados por el backend */}
                    <option value="gasto">Gasto</option>{" "}
                    {/* ✅ Valor correcto para categorías tipo "gasto" */}
                    <option value="ingreso">Ingreso</option>{" "}
                    {/* ✅ Valor correcto para categorías tipo "ingreso" */}
                </select>
            </div>
            {/* Línea 53: Botón para enviar el formulario */}
            <button className="btn btn-primary w-100" type="submit">
                Guardar Categoría
            </button>
            {/* Línea 55: El botón ocupa todo el ancho (w-100) y tiene estilo Bootstrap "btn-primary" */}
        </form> // Línea 56: Fin del formulario
    );
};

// ****************************************************************************************************
// Línea 59: Exporta el componente para que pueda ser usado en otras partes de la aplicación.
export default CategoryForm;
