// src/components/Dashboard.js

import React, { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Función para obtener categorías
  const fetchCategories = async () => {
    try {
      const res = await api.get("categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  // Función para obtener transacciones
  const fetchTransactions = async () => {
    try {
      const res = await api.get("transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
    }
  };

  // Ejecutar al montar el componente
  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Categorías</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name} ({cat.type})
          </li>
        ))}
      </ul>
      <h3>Transacciones</h3>
      <ul>
        {transactions.map((tran) => (
          <li key={tran.id}>
            {tran.transaction_date}: ${tran.amount} - {tran.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
