import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import api from "../services/api";

const ReportChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await api.get("transactions");
      const processedData = response.data.map((tran) => ({
        name: tran.transaction_date,
        amount: tran.amount,
      }));
      setData(processedData);
    };

    fetchTransactions();
  }, []);

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
