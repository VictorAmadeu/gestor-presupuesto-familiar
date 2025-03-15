// src/components/CategoryForm.js

import React, { useState } from "react";
import api from "../services/api";

const CategoryForm = ({ onCategoryCreated }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("categories", { name, type });
      setMensaje("Categoría creada con éxito");
      setName("");
      setType("expense");
      onCategoryCreated && onCategoryCreated();
    } catch (error) {
      setMensaje("Error al crear categoría.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tipo:</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>
      </div>
      <button className="btn btn-primary w-100" type="submit">
        Guardar Categoría
      </button>
    </form>
  );
};

export default CategoryForm;
