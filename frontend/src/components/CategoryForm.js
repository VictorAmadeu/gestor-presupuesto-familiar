// src/components/CategoryForm.js

import React, { useState } from "react";
import api from "../services/api";

const CategoryForm = ({ onCategoryCreated }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  const [mensaje, setMensaje] = useState("");

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("categories", {
        name,
        type,
      });
      setMensaje("Categoría creada con éxito");
      setName("");
      setType("expense");

      // Notifica al padre que se ha creado una nueva categoría
      if (onCategoryCreated) {
        onCategoryCreated();
      }
    } catch (error) {
      console.error("Error al crear categoría:", error);
      setMensaje("Ocurrió un error al crear la categoría.");
    }
  };

  return (
    <div>
      <h3>Crear Categoría</h3>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CategoryForm;
