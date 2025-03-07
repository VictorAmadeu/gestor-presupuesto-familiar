// src/components/TransactionForm.js

import React, { useState, useEffect } from "react";
import api from "../services/api";

const TransactionForm = ({ onTransactionCreated }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const [mensaje, setMensaje] = useState("");

  // Obtener categorías para seleccionar en el formulario
  const fetchCategories = async () => {
    try {
      const res = await api.get("categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("transactions", {
        amount,
        description,
        transaction_date: transactionDate,
        category_id: categoryId,
      });
      setMensaje("Transacción creada con éxito");

      // Limpia los campos
      setAmount("");
      setDescription("");
      setTransactionDate("");
      setCategoryId("");

      if (onTransactionCreated) {
        onTransactionCreated();
      }
    } catch (error) {
      console.error("Error al crear transacción:", error);
      setMensaje("Hubo un problema al crear la transacción.");
    }
  };

  return (
    <div>
      <h3>Crear Transacción</h3>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Monto:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Seleccionar...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.type})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default TransactionForm;
