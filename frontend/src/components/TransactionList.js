// src/components/TransactionList.js

import React, { useEffect, useState } from "react";
import api from "../services/api";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const fetchTransactions = async () => {
    try {
      const res = await api.get("transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Error al obtener transacciones:", error);
      setMensaje("No se pudieron cargar las transacciones.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`transactions/${id}`);
      setMensaje("Transacción eliminada correctamente.");
      fetchTransactions();
    } catch (error) {
      console.error("Error al eliminar transacción:", error);
      setMensaje("Ocurrió un error al eliminar la transacción.");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h3>Lista de Transacciones</h3>
      {mensaje && <p>{mensaje}</p>}
      <ul>
        {transactions.map((tran) => (
          <li key={tran.id}>
            {tran.transaction_date} - {tran.description} - Monto: ${tran.amount}
            <button onClick={() => handleDelete(tran.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
