// Importamos React y los hooks 'useEffect' y 'useState' para manejar el estado y efectos secundarios en el componente
import React, { useEffect, useState } from "react";

// Importamos 'useNavigate' de React Router para permitir la navegación programada entre diferentes rutas de la aplicación
import { useNavigate } from "react-router-dom";

// Importamos el componente 'CategoryList' para mostrar la lista de categorías en el dashboard
import CategoryList from "./CategoryList";

// Importamos el componente 'CategoryForm' para permitir la creación de nuevas categorías en la aplicación
import CategoryForm from "./CategoryForm";

// Importamos el componente 'TransactionList' para mostrar la lista de transacciones en el dashboard
import TransactionList from "./TransactionList";

// Importamos el componente 'TransactionForm' para permitir la creación de nuevas transacciones en la aplicación
import TransactionForm from "./TransactionForm";

// Importamos el componente 'ReportChart' que nos permitirá visualizar un gráfico con los datos de transacciones
import ReportChart from "./ReportChart";

// Definimos el componente funcional 'Dashboard'
const Dashboard = () => {
  // Creamos una instancia de 'navigate' para manejar la navegación dentro de la aplicación
  const navigate = useNavigate();

  // Definimos un estado 'role' para almacenar el rol del usuario (admin o member)
  const [role, setRole] = useState("");

  // Usamos 'useEffect' para obtener el rol del usuario almacenado en 'localStorage' cuando el componente se monta
  useEffect(() => {
    // Recuperamos el rol del usuario almacenado en 'localStorage' bajo la clave "userRole"
    const userRole = localStorage.getItem("userRole");

    // Actualizamos el estado 'role' con el valor recuperado de 'localStorage'
    setRole(userRole);
  }, []); // El array vacío '[]' indica que este efecto solo se ejecuta una vez al montar el componente

  // Definimos la función 'handleLogout' que cierra la sesión del usuario
  const handleLogout = () => {
    // Eliminamos el token de autenticación almacenado en 'localStorage'
    localStorage.removeItem("token");

    // Eliminamos el rol del usuario almacenado en 'localStorage'
    localStorage.removeItem("userRole");

    // Redirigimos al usuario a la página de inicio de sesión ("/")
    navigate("/");
  };

  // Retornamos el JSX que define la estructura visual del componente 'Dashboard'
  return (
    // Contenedor principal del Dashboard
    <div>
      {/* Título principal que indica que el usuario está en el dashboard */}
      <h2>Dashboard</h2>

      {/* Mostramos el rol actual del usuario en pantalla */}
      <p>Rol: {role}</p>

      {/* Si el usuario es administrador, mostramos la sección de gestión de usuarios */}
      {role === "admin" && (
        <div>
          {/* Subtítulo indicando que esta es la sección de gestión de usuarios */}
          <h3>Gestión de Usuarios</h3>

          {/* Mensaje explicativo de que solo los administradores pueden acceder a esta sección */}
          <p>Solo los administradores pueden ver esta sección.</p>

          {/* Aquí podríamos agregar futuros componentes para administrar usuarios */}
        </div>
      )}

      {/* Primera sección para manejar categorías: creación y visualización */}
      <section>
        {/* Si el usuario es administrador, le permitimos crear nuevas categorías */}
        {role === "admin" && <CategoryForm />}

        {/* Mostramos la lista de categorías, accesible para todos los usuarios */}
        <CategoryList />
      </section>

      {/* Segunda sección para manejar transacciones: creación y visualización */}
      <section>
        {/* Formulario para crear una nueva transacción, accesible para todos los usuarios */}
        <TransactionForm />

        {/* Lista de transacciones existentes en la base de datos, visible para todos los usuarios */}
        <TransactionList />
      </section>

      {/* Sección donde se muestra el gráfico de reportes de transacciones */}
      <section>
        {/* Título que indica que esta es la sección de reportes */}
        <h3>Reporte de Transacciones</h3>

        {/* Componente que muestra un gráfico basado en las transacciones registradas */}
        <ReportChart />
      </section>

      {/* Botón que permite al usuario cerrar sesión y ser redirigido a la pantalla de login */}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

// Exportamos el componente 'Dashboard' para que pueda ser utilizado en otras partes de la aplicación
export default Dashboard;
