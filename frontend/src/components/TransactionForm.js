// src/components/TransactionForm.js
import React, { useState, useEffect } from "react";
// Importa React y los hooks useState y useEffect para manejar el estado y efectos secundarios en el componente.

import api from "../services/api";
// Importa el objeto "api" desde el servicio, el cual se usará para hacer llamadas HTTP a la API.

const TransactionForm = ({ onTransactionCreated }) => {
  // Define el componente funcional TransactionForm, recibiendo como prop la función onTransactionCreated.

  const [amount, setAmount] = useState("");
  // Declara la variable de estado "amount" para almacenar el monto de la transacción y su función de actualización "setAmount". Inicialmente es una cadena vacía.

  const [description, setDescription] = useState("");
  // Declara la variable de estado "description" para almacenar la descripción de la transacción.

  const [transactionDate, setTransactionDate] = useState("");
  // Declara la variable de estado "transactionDate" para almacenar la fecha de la transacción.

  const [categoryId, setCategoryId] = useState("");
  // Declara la variable de estado "categoryId" para almacenar el ID de la categoría seleccionada.

  const [categories, setCategories] = useState([]);
  // Declara la variable de estado "categories" para almacenar el listado de categorías obtenido de la API. Se inicializa como un arreglo vacío.

  const [mensaje, setMensaje] = useState("");
  // Declara la variable de estado "mensaje" para almacenar mensajes de éxito o error y mostrarlos al usuario.

  useEffect(() => {
    // Hook useEffect que se ejecuta al montar el componente.
    api.get("categories").then((res) => setCategories(res.data));
    // Realiza una petición GET a la ruta 'categories' y, al obtener la respuesta, actualiza el estado "categories" con los datos recibidos.
  }, []);
  // El arreglo vacío [] indica que este efecto se ejecuta solo una vez cuando el componente se monta.

  const handleSubmit = async (e) => {
    // Define la función handleSubmit, la cual se ejecuta al enviar el formulario.
    e.preventDefault();
    // Evita que el formulario se envíe de forma predeterminada y provoque la recarga de la página.
    try {
      // Intenta ejecutar la solicitud para crear la transacción.
      await api.post("transactions", {
        // Realiza una petición POST a la ruta 'transactions' enviando los datos del formulario.
        amount,
        // Envía el valor de "amount".
        description,
        // Envía el valor de "description".
        transaction_date: transactionDate,
        // Envía la fecha de transacción, renombrando la variable al formato esperado por la API.
        category_id: categoryId,
        // Envía el ID de la categoría, renombrando la variable al formato esperado.
      });
      setMensaje("Transacción creada con éxito");
      // Al crear la transacción correctamente, se actualiza el estado "mensaje" para notificar el éxito.

      setAmount("");
      // Limpia el campo "amount" volviendo a una cadena vacía.
      setDescription("");
      // Limpia el campo "description".
      setTransactionDate("");
      // Limpia el campo "transactionDate".
      setCategoryId("");
      // Limpia el campo "categoryId".

      onTransactionCreated && onTransactionCreated();
      // Si se pasó la prop "onTransactionCreated", se invoca para notificar al componente padre que se ha creado una transacción.
    } catch (error) {
      // Si ocurre algún error durante la creación de la transacción:
      setMensaje("Error al crear transacción.");
      // Se actualiza el estado "mensaje" con un mensaje de error.
    }
  };

  return (
    // Renderiza el JSX del componente.
    <form onSubmit={handleSubmit}>
      {/* Formulario que utiliza la función handleSubmit al enviarse */}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {/* Si existe un mensaje, se muestra dentro de un div con clases de Bootstrap para alertas de éxito */}

      <div className="mb-3">
        {/* Contenedor con margen inferior para el campo de Monto */}
        <label className="form-label">Monto:</label>
        {/* Etiqueta con la clase "form-label" de Bootstrap */}
        <input
          className="form-control"
          // Clase de Bootstrap para estilizar inputs
          type="number"
          // Define el tipo de input como número
          value={amount}
          // El valor del input está ligado al estado "amount"
          onChange={(e) => setAmount(e.target.value)}
          // Actualiza el estado "amount" cada vez que el usuario cambia el valor
          required
          // Campo obligatorio
        />
      </div>

      <div className="mb-3">
        {/* Contenedor para el campo de Descripción */}
        <label className="form-label">Descripción:</label>
        {/* Etiqueta para el campo de descripción */}
        <input
          className="form-control"
          // Input estilizado con Bootstrap
          type="text"
          // Tipo de input de texto
          value={description}
          // Valor ligado al estado "description"
          onChange={(e) => setDescription(e.target.value)}
          // Actualiza el estado "description" al cambiar el valor
        />
      </div>

      <div className="mb-3">
        {/* Contenedor para el campo de Fecha */}
        <label className="form-label">Fecha:</label>
        {/* Etiqueta para el campo de fecha */}
        <input
          className="form-control"
          // Input con estilos de Bootstrap
          type="date"
          // Define el tipo de input como fecha
          value={transactionDate}
          // Valor ligado al estado "transactionDate"
          onChange={(e) => setTransactionDate(e.target.value)}
          // Actualiza el estado "transactionDate" al cambiar el valor
          required
          // Campo obligatorio
        />
      </div>

      <div className="mb-3">
        {/* Contenedor para el campo de Categoría */}
        <label className="form-label">Categoría:</label>
        {/* Etiqueta para el selector de categorías */}
        <select
          className="form-select"
          // Selector estilizado con la clase "form-select" de Bootstrap
          value={categoryId}
          // Valor ligado al estado "categoryId"
          onChange={(e) => setCategoryId(e.target.value)}
          // Actualiza el estado "categoryId" al cambiar la opción seleccionada
          required
          // Campo obligatorio
        >
          <option value="">Seleccionar...</option>
          {/* Opción por defecto que invita al usuario a seleccionar una categoría */}
          {categories.map((cat) => (
            // Recorre el arreglo "categories" y mapea cada categoría a una opción del select
            <option key={cat.id} value={cat.id}>
              {/* Cada opción tiene un "key" único basado en el id de la categoría y su "value" es también el id */}
              {cat.name}
              {/* Muestra el nombre de la categoría */}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary w-100" type="submit">
        Guardar Transacción
      </button>
      {/* Botón de envío con clases de Bootstrap para botón primario y ancho completo */}
    </form>
  );
};

export default TransactionForm;
// Exporta el componente TransactionForm para poder ser utilizado en otros lugares de la aplicación.
