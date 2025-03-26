import React, { useEffect, useState } from "react"; // Importamos React y los hooks useEffect y useState
import api from "../services/api"; // Importamos la instancia de Axios configurada (api.js)

// Declaramos el componente CategoryList, recibiendo por props un valor llamado "refresh"
const CategoryList = ({ refresh }) => {
  const [categories, setCategories] = useState([]); // Hook de estado que almacenará las categorías
  const [mensaje, setMensaje] = useState(""); // Hook de estado para mostrar mensajes de éxito o error

  // useEffect se ejecutará cada vez que el valor de "refresh" cambie (además de al montar el componente)
  useEffect(() => {
    // Llamamos a la API para obtener la lista de categorías
    api
      .get("categories")
      .then((res) => {
        setCategories(res.data); // Actualizamos el estado con las categorías recibidas
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error); // Mostramos el error en consola
        setMensaje("No se pudieron cargar las categorías."); // Mostramos un mensaje de error en pantalla
      });
  }, [refresh]); // Al incluir [refresh], cada vez que "refresh" cambie, se vuelve a ejecutar este efecto

  // Función para eliminar una categoría de la lista
  const handleDelete = async (id) => {
    // Recibe el ID de la categoría a eliminar
    try {
      await api.delete(`categories/${id}`); // Llama al endpoint /categories/:id con método DELETE
      setMensaje("Categoría eliminada correctamente."); // Actualiza el mensaje indicando éxito al eliminar

      // Después de eliminar, volvemos a cargar la lista para mostrar los cambios en pantalla
      api
        .get("categories")
        .then((res) => {
          setCategories(res.data); // Actualiza el estado con la nueva lista de categorías
        })
        .catch((error) => {
          console.error("Error al actualizar categorías:", error); // Muestra error en la consola
          setMensaje("No se pudieron refrescar las categorías."); // Mensaje de error al usuario
        });
    } catch (error) {
      console.error("Error al eliminar categoría:", error); // Muestra en consola el error
      setMensaje("Ocurrió un error al eliminar la categoría."); // Mensaje de error al usuario
    }
  };

  return (
    // Renderizamos el contenido en el return
    <div>
      {" "}
      {/* Contenedor principal del componente */}
      <h3>Lista de Categorías</h3> {/* Título de la sección */}
      {mensaje && <p>{mensaje}</p>}{" "}
      {/* Si existe mensaje, lo mostramos en un párrafo */}
      <ul>
        {" "}
        {/* Lista no ordenada para mostrar las categorías */}
        {categories.map(
          (
            cat // Recorremos el array "categories" para dibujar cada elemento
          ) => (
            <li key={cat.id}>
              {" "}
              {/* Cada ítem necesita una key única, usamos el id de la categoría */}
              {cat.name} ({cat.type}){" "}
              {/* Mostramos el nombre y el tipo de cada categoría */}
              <button onClick={() => handleDelete(cat.id)}>
                Eliminar
              </button>{" "}
              {/* Botón para eliminar la categoría */}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default CategoryList; // Exportamos el componente para usarlo en otras partes de la aplicación
