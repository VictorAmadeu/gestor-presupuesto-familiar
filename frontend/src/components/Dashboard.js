// Línea 1: Importa React y los hooks necesarios para gestionar estado, efecto y contexto
import React, { useContext, useState, useEffect } from "react";

// Línea 2: Importa useNavigate para redirigir al usuario tras cerrar sesión
import { useNavigate } from "react-router-dom";

// Línea 4–8: Importa los componentes del sistema para categorías, transacciones y reportes
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import ReportChart from "./ReportChart";

// Línea 10: Importa el contexto de autenticación para acceder al usuario actual y función de logout
import AuthContext from "../context/AuthContext";

// Línea 12: Importa axios para realizar peticiones HTTP al backend
import axios from "axios";

// Línea 14: Componente funcional principal del Dashboard
const Dashboard = () => {
  // Línea 15: Extrae el usuario actual y la función de logout desde el contexto de autenticación
  const { user, logout } = useContext(AuthContext);

  // Línea 17: Hook que permite redireccionar programáticamente entre rutas
  const navigate = useNavigate();

  // Línea 19: Estado para refrescar la lista de categorías al crear o eliminar una
  const [refreshCategories, setRefreshCategories] = useState(false);

  // Línea 20: Estado para refrescar la lista de transacciones al crear o eliminar una
  const [refreshTransactions, setRefreshTransactions] = useState(false);

  // Línea 22: Estado que almacena el total de gastos sumados desde el backend
  const [totalGastos, setTotalGastos] = useState(0);

  // Línea 23: Estado que almacena el total de ingresos sumados desde el backend
  const [totalIngresos, setTotalIngresos] = useState(0);

  // Línea 24: Estado que almacena el número total de transacciones
  const [totalTransacciones, setTotalTransacciones] = useState(0);

  // Línea 26: Estado que almacena la frase del día que se mostrará dinámicamente
  const [fraseDelDia, setFraseDelDia] = useState("");

  // Línea 28: Array de frases aleatorias con consejos financieros y frases motivacionales
  const frases = [
    "💡 Consejo: Divide tus gastos en Necesidades, Deseos y Ahorros.",
    "📘 Frase: 'El dinero no crece en árboles, pero sí con planificación.'",
    "💸 Consejo: Controla tus pequeños gastos, ¡se acumulan rápido!",
    "🚀 Frase: 'La libertad financiera comienza con un buen hábito.'",
    "📊 Consejo: Registra tus ingresos y gastos cada semana.",
    "💬 Frase: 'No se trata de cuánto ganas, sino de cuánto conservas.'",
    "🔐 Consejo: Establece un fondo de emergencia, aunque sea pequeño.",
    "🧠 Frase: 'La inteligencia financiera supera la suerte.'",
    "📆 Consejo: Revisa tus transacciones al menos una vez por semana.",
    "🌱 Frase: 'Pequeños gastos controlados hoy, grandes logros mañana.'",
  ];

  // Línea 40: useEffect que se ejecuta al cargar el componente
  useEffect(() => {
    // Línea 41: Selecciona un índice aleatorio del array de frases
    const indice = Math.floor(Math.random() * frases.length);

    // Línea 42: Establece la frase seleccionada en el estado
    setFraseDelDia(frases[indice]);
  }, []); // Solo se ejecuta una vez al montar el componente

  // Línea 45: Cambia el estado para forzar la recarga de categorías
  const handleCategoryChange = () => setRefreshCategories((prev) => !prev);

  // Línea 47: Cambia el estado para forzar la recarga de transacciones
  const handleTransactionChange = () => setRefreshTransactions((prev) => !prev);

  // Línea 49: Cierra la sesión y redirige al usuario al login
  const handleLogout = () => {
    logout(); // Finaliza sesión desde el contexto
    navigate("/"); // Redirige al inicio de sesión
  };

  // Línea 53: Hook que calcula los totales y número de transacciones al cambiar transacciones
  useEffect(() => {
    // Línea 54: Función asincrónica que obtiene los datos desde el backend
    const obtenerTotales = async () => {
      try {
        // Línea 56: Realiza una petición para obtener todas las transacciones
        const response = await axios.get("/api/transacciones");
        const transacciones = response.data;

        // Línea 59: Actualiza el estado con el número total de transacciones
        setTotalTransacciones(transacciones.length);

        // Línea 61: Suma todos los montos de tipo gasto
        const gastos = transacciones
          .filter((t) => t.categoria?.tipo === "gasto")
          .reduce((total, t) => total + parseFloat(t.monto), 0);

        // Línea 65: Suma todos los montos de tipo ingreso
        const ingresos = transacciones
          .filter((t) => t.categoria?.tipo === "ingreso")
          .reduce((total, t) => total + parseFloat(t.monto), 0);

        // Línea 69: Guarda los valores calculados en el estado
        setTotalGastos(gastos);
        setTotalIngresos(ingresos);
      } catch (error) {
        // Línea 72: En caso de error, muestra mensaje y reinicia los valores
        console.error("Error al calcular totales:", error);
        setTotalGastos(0);
        setTotalIngresos(0);
        setTotalTransacciones(0);
      }
    };

    // Línea 78: Ejecuta la función para obtener los totales
    obtenerTotales();
  }, [refreshTransactions]); // Línea 79: Se ejecuta cada vez que cambia el estado de refreshTransactions

  // Línea 81: Devuelve el contenido visual del Dashboard
  return (
    <div className="container mt-4">
      {/* Línea 83: Línea con botón izquierdo, título centrado y espaço derecho */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Línea 84: Botón de cerrar sesión en el extremo izquierdo */}
        <button className="btn btn-danger" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left me-2"></i>Cerrar sesión
        </button>

        {/* Línea 87: Título centrado con ícono */}
        <h2 className="text-center flex-grow-1">
          <i className="bi bi-speedometer2 me-2"></i>Panel Principal
        </h2>

        {/* Línea 90: Espacio vacío derecho para balancear diseño */}
        <div style={{ width: "130px" }}></div>
      </div>

      {/* Línea 93: Bienvenida con el rol del usuario */}
      <div className="alert alert-primary text-center">
        Bienvenido, rol: <strong>{user?.role}</strong> 🎉
      </div>

      {/* Línea 97: Frase del día aleatoria y automática */}
      <div className="alert alert-info text-center shadow-sm fs-6">
        🚀 {fraseDelDia}
      </div>

      {/* Línea 101: Sección con dos columnas (categorías y transacciones) */}
      <div className="row">
        {/* Línea 103: Columna izquierda - Gestión de categorías */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              Gestión de Categorías
            </div>
            <div className="card-body">
              <CategoryForm onCategoryCreated={handleCategoryChange} />
              <hr />
              <CategoryList
                refresh={refreshCategories}
                onCategoryDeleted={() => {
                  handleCategoryChange();
                  handleTransactionChange();
                }}
              />
            </div>
          </div>
        </div>

        {/* Línea 120: Columna derecha - Gestión de transacciones */}
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-success text-white">
              Gestión de Transacciones
            </div>
            <div className="card-body">
              <TransactionForm
                onTransactionCreated={handleTransactionChange}
                refreshCategories={refreshCategories}
              />
              <hr />
              <TransactionList
                refresh={refreshTransactions}
                onTransactionDeleted={handleTransactionChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Línea 137: Sección de reporte gráfico */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-info text-white">
          Reporte de Transacciones
        </div>
        <div className="card-body">
          <ReportChart refresh={refreshTransactions} />
        </div>
      </div>
    </div>
  );
};

// Línea 146: Exporta el componente para ser usado en las rutas
export default Dashboard;
