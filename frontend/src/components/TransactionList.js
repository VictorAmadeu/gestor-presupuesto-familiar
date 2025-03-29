// Linha 1: Importa React e os hooks useEffect e useState
import React, { useEffect, useState } from "react";

// Linha 2: Importa o serviço de requisições HTTP (axios já configurado)
import api from "../services/api";

// Linha 4: Define o componente funcional TransactionList
// Recebe como props:
// - refresh: para recarregar quando houver mudança externa
// - onTransactionDeleted: função de callback chamada ao deletar uma transação
const TransactionList = ({ refresh, onTransactionDeleted }) => {
  // Linha 8: Estado local que guarda as transações obtidas da API
  const [transactions, setTransactions] = useState([]);

  // Linha 11: useEffect que é executado sempre que 'refresh' muda
  // Serve para buscar as transações mais atualizadas
  useEffect(() => {
    api.get("transactions").then((res) => setTransactions(res.data));
  }, [refresh]); // Linha 14: Dependência 'refresh' força recarregamento

  // Linha 17: Função que lida com exclusão de transações
  const handleDelete = async (id) => {
    // Linha 18: Chama a API para deletar a transação específica
    await api.delete(`transactions/${id}`);

    // Linha 20: Atualiza a lista removendo a transação excluída
    setTransactions((prev) => prev.filter((trans) => trans.id !== id));

    // Linha 22: Dispara callback para atualizar componentes pai (como gráfico)
    if (onTransactionDeleted) {
      onTransactionDeleted();
    }
  };

  // Linha 27: Calcula o total de todas as transações somando os valores
  const total = transactions.reduce(
    (acc, trans) => acc + parseFloat(trans.amount),
    0 // valor inicial = 0
  );

  // Linha 32: JSX de retorno do componente
  return (
    <div>
      {/* Linha 34: Início da tabela de transações com Bootstrap */}
      <table className="table table-striped">
        <thead>
          <tr>
            {/* Linha 38–42: Cabeçalhos das colunas */}
            <th>Fecha</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Monto (€)</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {/* Linha 45: Mapeia cada transação em uma linha da tabela */}
          {transactions.map((trans) => (
            <tr key={trans.id}>
              {/* Linha 47–51: Exibe os dados de cada transação */}
              <td>{trans.transaction_date}</td>
              <td>{trans.category?.name}</td>
              <td>{trans.description}</td>
              <td>{parseFloat(trans.amount).toFixed(2)}</td>
              <td>
                {/* Linha 52: Botão para excluir transação */}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(trans.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {/* Linha 59: Linha adicional que mostra o total de todas as transações */}
          <tr>
            {/* Linha 60: Célula mesclada para o rótulo "Total" alinhado à direita */}
            <td colSpan="3" className="text-end fw-bold">
              Total
            </td>
            {/* Linha 62: Valor total formatado com 2 casas decimais */}
            <td className="fw-bold">{total.toFixed(2)}</td>
            {/* Linha 63: Célula vazia na última coluna (Ação) */}
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Linha 69: Exporta o componente para ser utilizado em outras partes do app
export default TransactionList;
