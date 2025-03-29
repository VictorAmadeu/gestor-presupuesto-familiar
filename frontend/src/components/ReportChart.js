// Linha 1: Importa React e os hooks useEffect e useState
import React, { useEffect, useState } from "react";

// Linha 2-7: Importa componentes do Recharts para criar gráficos
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Linha 9: Importa o serviço de API
import api from "../services/api";

// Linha 11: Componente funcional que exibe o gráfico de barras
const ReportChart = ({ refresh }) => {
  const [data, setData] = useState([]); // Linha 13: Estado para dados do gráfico

  useEffect(() => {
    // Linha 15: Hook executado sempre que 'refresh' mudar
    const fetchTransactions = async () => {
      const response = await api.get("transactions"); // Busca dados
      const processedData = response.data.map((tran) => ({
        name: tran.transaction_date, // Nome do eixo X
        amount: parseFloat(tran.amount), // Valor (convertido)
      }));
      setData(processedData); // Atualiza estado
    };

    fetchTransactions(); // Executa função
  }, [refresh]); // ✅ Reexecuta sempre que transações forem alteradas

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;
