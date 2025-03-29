// src/components/CategoryList.js

import React, { useEffect, useState } from "react";
import api from "../services/api";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Función para obtener categorías
  const fetchCategories = async () => {
    try {
      const res = await api.get("categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      setMensaje("No se pudieron cargar las categorías.");
    }
  };

  // Eliminar categoría
  const handleDelete = async (id) => {
    try {
      await api.delete(`categories/${id}`);
      setMensaje("Categoría eliminada correctamente.");
      // Actualiza la lista tras eliminar
      fetchCategories();
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      setMensaje("Ocurrió un error al eliminar la categoría.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h3>Lista de Categorías</h3>
      {mensaje && <p>{mensaje}</p>}
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name} ({cat.type})
            <button onClick={() => handleDelete(cat.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
