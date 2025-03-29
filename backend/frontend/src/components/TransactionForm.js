// ****************************************************************************************************
// Línea 1: Importa React y los hooks useState y useEffect para manejar estado y efectos secundarios.
import React, { useState, useEffect } from "react";

// ****************************************************************************************************
// Línea 2: Importa el objeto Axios configurado desde los servicios, usado para hacer llamadas HTTP.
import api from "../services/api";

// ****************************************************************************************************
// Línea 4: Define el componente funcional "TransactionForm".
// Este componente recibe como prop una función llamada "onTransactionCreated" que se ejecuta tras crear una transacción.
const TransactionForm = ({ onTransactionCreated }) => {
    // Línea 5: Estado para almacenar el monto de la transacción. Se inicia como cadena vacía.
    const [amount, setAmount] = useState("");

    // Línea 6: Estado para almacenar la descripción opcional de la transacción.
    const [description, setDescription] = useState("");

    // Línea 7: Estado para la fecha de la transacción, que el usuario seleccionará.
    const [transactionDate, setTransactionDate] = useState("");

    // Línea 8: Estado para almacenar el ID de la categoría seleccionada por el usuario.
    const [categoryId, setCategoryId] = useState("");

    // Línea 9: Estado que almacena el listado de todas las categorías existentes.
    const [categories, setCategories] = useState([]);

    // Línea 10: Estado que guarda mensajes de éxito o error para mostrarlos en pantalla.
    const [mensaje, setMensaje] = useState("");

    // ****************************************************************************************************
    // Línea 12: Hook useEffect que se ejecuta al montar el componente por primera vez.
    useEffect(() => {
        // Línea 13: Realiza una petición GET a la API para obtener todas las categorías disponibles.
        api.get("categories").then((res) => setCategories(res.data));
        // Línea 14: Cuando recibe la respuesta, actualiza el estado 'categories' con los datos obtenidos.
    }, []);
    // Línea 15: El arreglo vacío [] indica que este efecto solo se ejecuta una vez al montar el componente.

    // ****************************************************************************************************
    // Línea 17: Función que maneja el envío del formulario.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Línea 18: Previene el comportamiento por defecto (recargar la página).

        try {
            // Línea 20: Enviamos los datos al backend con una solicitud POST a /api/transactions
            await api.post("transactions", {
                amount, // Línea 21: Monto de la transacción
                description, // Línea 22: Descripción opcional
                transaction_date: transactionDate, // Línea 23: Fecha de la transacción
                category_id: categoryId, // Línea 24: ID de la categoría seleccionada
            });

            // Línea 26: Si la solicitud fue exitosa, mostramos mensaje de éxito.
            setMensaje("Transacción creada con éxito");

            // Líneas 28-31: Reseteamos los campos del formulario para dejarlo limpio.
            setAmount("");
            setDescription("");
            setTransactionDate("");
            setCategoryId("");

            // Línea 33: Si se pasó una función onTransactionCreated, la ejecutamos para actualizar datos en el componente padre.
            onTransactionCreated && onTransactionCreated();
        } catch (error) {
            // Línea 36: Si ocurre un error en la solicitud, mostramos mensaje de error.
            setMensaje("Error al crear transacción.");
        }
    };

    // ****************************************************************************************************
    // Línea 41: Retornamos el JSX que define la estructura visual del formulario.
    return (
        <form onSubmit={handleSubmit}>
            {" "}
            {/* Línea 42: Formulario que al enviarse ejecuta handleSubmit */}
            {/* Línea 43: Si existe un mensaje, se muestra con una alerta de Bootstrap */}
            {mensaje && <div className="alert alert-success">{mensaje}</div>}
            {/* Línea 45: Campo de entrada para el monto de la transacción */}
            <div className="mb-3">
                <label className="form-label">Monto:</label>{" "}
                {/* Línea 46: Etiqueta del campo */}
                <input
                    className="form-control" // Línea 48: Estilo Bootstrap
                    type="number" // Línea 49: Tipo de dato numérico
                    value={amount} // Línea 50: Valor actual del input
                    onChange={(e) => setAmount(e.target.value)} // Línea 51: Actualiza el estado 'amount'
                    required // Línea 52: Campo obligatorio
                />
            </div>
            {/* Línea 55: Campo para descripción opcional */}
            <div className="mb-3">
                <label className="form-label">Descripción:</label>{" "}
                {/* Línea 56: Etiqueta */}
                <input
                    className="form-control" // Línea 58: Estilo Bootstrap
                    type="text" // Línea 59: Tipo de input
                    value={description} // Línea 60: Valor actual del input
                    onChange={(e) => setDescription(e.target.value)} // Línea 61: Actualiza 'description'
                />
            </div>
            {/* Línea 64: Campo para seleccionar la fecha */}
            <div className="mb-3">
                <label className="form-label">Fecha:</label>{" "}
                {/* Línea 65: Etiqueta */}
                <input
                    className="form-control" // Línea 67: Estilo Bootstrap
                    type="date" // Línea 68: Tipo de input: calendario
                    value={transactionDate} // Línea 69: Valor actual del input
                    onChange={(e) => setTransactionDate(e.target.value)} // Línea 70: Actualiza 'transactionDate'
                    required // Línea 71: Campo obligatorio
                />
            </div>
            {/* Línea 74: Campo para seleccionar una categoría */}
            <div className="mb-3">
                <label className="form-label">Categoría:</label>{" "}
                {/* Línea 75: Etiqueta */}
                <select
                    className="form-select" // Línea 77: Estilo Bootstrap
                    value={categoryId} // Línea 78: Valor actual del select
                    onChange={(e) => setCategoryId(e.target.value)} // Línea 79: Actualiza 'categoryId'
                    required // Línea 80: Campo obligatorio
                >
                    <option value="">Seleccionar...</option>{" "}
                    {/* Línea 82: Opción por defecto */}
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {" "}
                            {/* Línea 84: Opción por cada categoría */}
                            {cat.name}{" "}
                            {/* Línea 85: Texto visible del select */}
                        </option>
                    ))}
                </select>
            </div>
            {/* Línea 89: Botón para enviar el formulario */}
            <button className="btn btn-primary w-100" type="submit">
                Guardar Transacción
            </button>
            {/* Línea 91: El botón ocupa todo el ancho y usa estilo Bootstrap */}
        </form> // Línea 92: Fin del formulario
    );
};

// ****************************************************************************************************
// Línea 95: Exporta el componente para poder ser utilizado en otras partes del proyecto.
export default TransactionForm;
