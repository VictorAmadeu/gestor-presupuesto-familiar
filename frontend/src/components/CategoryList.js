// Linha 1: Importa o React e os hooks useEffect e useState da biblioteca React
import React, { useEffect, useState } from "react";

// Linha 2: Importa o objeto de API para fazer chamadas HTTP à API backend
import api from "../services/api";

// Linha 4: Declara o componente funcional CategoryList, que recebe duas props:
// - 'refresh' indica quando recarregar os dados
// - 'onCategoryDeleted' é uma função callback para ser executada após exclusão
const CategoryList = ({ refresh, onCategoryDeleted }) => {
  // Linha 6: Declara o estado 'categories', um array que armazenará as categorias
  const [categories, setCategories] = useState([]);

  // Linha 9: useEffect é executado sempre que o valor de 'refresh' mudar
  // Isso serve para recarregar as categorias sempre que for necessário
  useEffect(() => {
    // Linha 11: Faz uma requisição GET para obter a lista de categorias
    api.get("categories").then((res) => setCategories(res.data));
    // Quando a resposta chega, atualiza o estado com as categorias obtidas
  }, [refresh]); // Linha 13: O array de dependências contém 'refresh'

  // Linha 16: Função para excluir uma categoria do backend e atualizar a lista
  const handleDelete = async (id) => {
    // Linha 17: Envia uma requisição DELETE à API com o ID da categoria
    await api.delete(`categories/${id}`);

    // Linha 19: Atualiza o estado local removendo a categoria excluída
    setCategories((prev) => prev.filter((cat) => cat.id !== id));

    // Linha 22: Se a prop 'onCategoryDeleted' foi fornecida, chama a função
    // Isso permite que o componente pai saiba que houve uma exclusão
    onCategoryDeleted && onCategoryDeleted();
  };

  // Linha 27: Retorna o JSX que renderiza a tabela de categorias
  return (
    <div>
      {/* Linha 29: Tabela com classe do Bootstrap para estilo */}
      <table className="table table-striped">
        <thead>
          <tr>
            {/* Linha 33: Cabeçalhos da tabela */}
            <th>Categoría</th>
            <th>Tipo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {/* Linha 39: Mapeia cada categoria do array 'categories' para uma linha da tabela */}
          {categories.map((cat) => (
            <tr key={cat.id}>
              {/* Linha 41: Exibe o nome da categoria */}
              <td>{cat.name}</td>

              {/* Linha 43: Exibe o tipo da categoria (gasto ou ingreso) */}
              <td>{cat.type}</td>

              {/* Linha 45: Botão para excluir a categoria */}
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  // Linha 48: Ao clicar no botão, chama a função handleDelete passando o ID da categoria
                  onClick={() => handleDelete(cat.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Linha 57: Exporta o componente CategoryList para ser usado em outros arquivos
export default CategoryList;
