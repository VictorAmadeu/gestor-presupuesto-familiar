// Linha 1: Importa o React e os hooks useState e useEffect da biblioteca React
import React, { useState, useEffect } from "react";

// Linha 2: Importa o objeto 'api' que permite fazer chamadas HTTP para a API
import api from "../services/api";

// Linha 4: Início do componente funcional TransactionForm
// Recebe duas props:
// - onTransactionCreated: função chamada após criar uma transação com sucesso
// - refreshCategories: sinal vindo do Dashboard para recarregar categorias
const TransactionForm = ({ onTransactionCreated, refreshCategories }) => {
  // Linha 8: Estado para armazenar o valor da transação
  const [amount, setAmount] = useState("");

  // Linha 11: Estado para armazenar a descrição da transação
  const [description, setDescription] = useState("");

  // Linha 14: Estado para armazenar a data da transação
  const [transactionDate, setTransactionDate] = useState("");

  // Linha 17: Estado para armazenar o ID da categoria selecionada
  const [categoryId, setCategoryId] = useState("");

  // Linha 20: Estado para armazenar a lista de categorias disponíveis no select
  const [categories, setCategories] = useState([]);

  // Linha 23: Estado para exibir uma mensagem de sucesso ou erro
  const [mensaje, setMensaje] = useState("");

  // Linha 26: Hook que carrega (ou recarrega) as categorias toda vez que 'refreshCategories' mudar
  useEffect(() => {
    // Linha 27: Faz uma requisição GET para buscar todas as categorias
    api
      .get("categories")
      .then((res) => setCategories(res.data)) // Linha 29: Atualiza o estado com as categorias recebidas
      .catch((err) => console.error("Erro ao carregar categorias:", err)); // Linha 30: Exibe erro no console caso falhe
  }, [refreshCategories]); // Linha 31: Executa sempre que 'refreshCategories' for alterado

  // Linha 34: Função chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Linha 35: Evita recarregar a página

    try {
      // Linha 38: Envia os dados para a rota POST /transactions
      await api.post("transactions", {
        amount, // Linha 39: Valor da transação
        description, // Linha 40: Descrição opcional
        transaction_date: transactionDate, // Linha 41: Data no formato esperado pela API
        category_id: categoryId, // Linha 42: ID da categoria selecionada
      });

      // Linha 45: Exibe mensagem de sucesso
      setMensaje("Transacción creada con éxito");

      // Linhas 48–51: Limpa os campos do formulário após o envio
      setAmount("");
      setDescription("");
      setTransactionDate("");
      setCategoryId("");

      // Linha 54: Dispara a função passada por props, caso exista, para atualizar a lista
      onTransactionCreated && onTransactionCreated();
    } catch (error) {
      // Linha 57: Exibe mensagem de erro no console
      console.error("Erro:", error);

      // Linha 59: Atualiza o estado para exibir mensagem de erro para o usuário
      setMensaje("Error al crear transacción.");
    }
  };

  // Linha 63: Retorna a interface do formulário em JSX
  return (
    <form onSubmit={handleSubmit}>
      {/* Linha 65: Exibe a mensagem, caso exista */}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {/* Linha 67: Campo para digitar o valor da transação */}
      <div className="mb-3">
        <label className="form-label">Monto:</label>
        <input
          className="form-control" // Classe Bootstrap
          type="number" // Campo numérico
          value={amount} // Valor controlado por estado
          onChange={(e) => setAmount(e.target.value)} // Atualiza estado
          required // Obrigatório
        />
      </div>

      {/* Linha 75: Campo para digitar a descrição */}
      <div className="mb-3">
        <label className="form-label">Descripción:</label>
        <input
          className="form-control"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Linha 83: Campo para selecionar a data */}
      <div className="mb-3">
        <label className="form-label">Fecha:</label>
        <input
          className="form-control"
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          required
        />
      </div>

      {/* Linha 91: Campo para selecionar uma categoria existente */}
      <div className="mb-3">
        <label className="form-label">Categoría:</label>
        <select
          className="form-select"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Seleccionar...</option>
          {/* Linha 100: Renderiza todas as opções de categoria */}
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Linha 106: Botão de envio */}
      <button className="btn btn-primary w-100" type="submit">
        Guardar Transacción
      </button>
    </form>
  );
};

// Linha 111: Exporta o componente para que possa ser usado em outras partes do sistema
export default TransactionForm;
