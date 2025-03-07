// src/components/Dashboard.js

// Importamos la librería 'React' para poder crear componentes y usar JSX
import React from "react";

// Importamos el componente 'CategoryList' que mostrará la lista de categorías
import CategoryList from "./CategoryList";

// Importamos el componente 'CategoryForm' que nos permitirá crear nuevas categorías
import CategoryForm from "./CategoryForm";

// Importamos el componente 'TransactionList' que mostrará la lista de transacciones
import TransactionList from "./TransactionList";

// Importamos el componente 'TransactionForm' que nos permitirá crear nuevas transacciones
import TransactionForm from "./TransactionForm";

// Definimos el componente funcional 'Dashboard'
const Dashboard = () => {
  // Retornamos el JSX que define la estructura y contenido visual de nuestro componente
  return (
    // Etiqueta contenedora principal de este componente
    <div>
      {/* Título del dashboard que indica la sección principal de la aplicación */}
      <h2>Dashboard</h2>

      {/* Primera sección para manejar categorías: creación y visualización */}
      <section>
        {/* Formulario para crear una nueva categoría */}
        <CategoryForm />
        {/* Lista de categorías existentes en la base de datos */}
        <CategoryList />
      </section>

      {/* Segunda sección para manejar transacciones: creación y visualización */}
      <section>
        {/* Formulario para crear una nueva transacción */}
        <TransactionForm />
        {/* Lista de transacciones existentes en la base de datos */}
        <TransactionList />
      </section>
    </div>
  );
};

// Exportamos el componente 'Dashboard' para que pueda ser utilizado en otras partes de la aplicación
export default Dashboard;
