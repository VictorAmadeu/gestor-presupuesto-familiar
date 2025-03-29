// Linha 1: Importa o React e o hook useState para controlar o estado local do componente
import React, { useState } from "react";

// Linha 2: Importa o módulo de API (axios configurado) para fazer requisições ao backend
import api from "../services/api";

// Linha 3: Define o componente funcional CategoryForm
// Recebe como prop uma função chamada "onCategoryCreated" que será chamada ao criar uma nova categoria
const CategoryForm = ({ onCategoryCreated }) => {
  // Linha 4: Estado "name" para armazenar o nome da nova categoria
  const [name, setName] = useState("");

  // Linha 5: Estado "type" para armazenar o tipo da categoria ('expense' ou 'income')
  const [type, setType] = useState("expense");

  // Linha 6: Estado "mensaje" para exibir mensagens de sucesso ou erro ao usuário
  const [mensaje, setMensaje] = useState("");

  // Linha 8: Função que será executada quando o formulário for enviado
  const handleSubmit = async (e) => {
    e.preventDefault(); // Linha 9: Impede que o formulário recarregue a página ao ser enviado

    try {
      // Linha 11: Envia uma requisição POST para a API criando uma nova categoria com os dados do formulário
      await api.post("categories", { name, type });

      // Linha 13: Atualiza o estado "mensaje" com uma mensagem de sucesso
      setMensaje("Categoría creada con éxito");

      // Linha 14: Limpa o campo de nome após o envio bem-sucedido
      setName("");

      // Linha 15: Reseta o tipo para "expense" por padrão
      setType("expense");

      // Linha 17: Se a função "onCategoryCreated" foi passada como prop, chama ela para atualizar a interface
      onCategoryCreated && onCategoryCreated();
    } catch (error) {
      // Linha 20: Caso ocorra um erro na requisição, exibe uma mensagem de erro ao usuário
      setMensaje("Error al crear categoría.");

      // Linha 21: Também exibe o erro no console do navegador para facilitar o debug
      console.error("Erro:", error);
    }
  };

  // Linha 24: Retorna o JSX que representa o formulário na interface
  return (
    // Linha 25: Define o evento onSubmit do formulário, que executa a função handleSubmit
    <form onSubmit={handleSubmit}>
      {/* Linha 26: Se existir uma mensagem no estado, exibe dentro de um alerta Bootstrap */}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {/* Linha 28: Grupo de formulário para o campo de nome */}
      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input
          className="form-control" // Linha 31: Classe do Bootstrap para estilizar o input
          type="text" // Linha 32: Define o tipo do input como texto
          value={name} // Linha 33: O valor do input está vinculado ao estado "name"
          onChange={(e) => setName(e.target.value)} // Linha 34: Atualiza o estado "name" sempre que o usuário digita
          required // Linha 35: Torna o campo obrigatório
        />
      </div>

      {/* Linha 38: Grupo de formulário para o campo de seleção do tipo */}
      <div className="mb-3">
        <label className="form-label">Tipo:</label>
        <select
          className="form-select" // Linha 41: Classe do Bootstrap para estilizar o select
          value={type} // Linha 42: O valor selecionado está vinculado ao estado "type"
          onChange={(e) => setType(e.target.value)} // Linha 43: Atualiza o estado "type" sempre que o usuário altera
        >
          {/* Linha 45: Opção de categoria do tipo 'expense' */}
          <option value="expense">Gasto</option>

          {/* Linha 47: Opção de categoria do tipo 'income' */}
          <option value="income">Ingreso</option>
        </select>
      </div>

      {/* Linha 51: Botão de envio do formulário */}
      <button className="btn btn-primary w-100" type="submit">
        Guardar Categoría
      </button>
    </form>
  );
};

// Linha 56: Exporta o componente para ser usado em outros lugares da aplicação
export default CategoryForm;
