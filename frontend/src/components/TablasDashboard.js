// Importa React y sus hooks useEffect y useState para manejar estado y efectos secundarios
import React, { useEffect, useState } from "react";

// Importa Axios, una librería para hacer solicitudes HTTP al backend
import axios from "axios";

// Define el componente funcional TablasDashboard
function TablasDashboard() {
    // Define el estado para almacenar los gastos obtenidos del backend
    const [gastos, setGastos] = useState([]);

    // Define el estado para almacenar los ingresos obtenidos del backend
    const [ingresos, setIngresos] = useState([]);

    // Define el estado del filtro de texto para los gastos
    const [filtroGasto, setFiltroGasto] = useState("");

    // Define el estado del filtro de texto para los ingresos
    const [filtroIngreso, setFiltroIngreso] = useState("");

    // useEffect se ejecuta una sola vez al montar el componente
    useEffect(() => {
        obtenerGastos(); // Llama a la función que obtiene los gastos del backend
        obtenerIngresos(); // Llama a la función que obtiene los ingresos del backend
    }, []);

    // Función para obtener los gastos desde la API
    const obtenerGastos = async () => {
        try {
            // Realiza una solicitud GET a /api/gastos
            const respuesta = await axios.get("/api/gastos");

            // Guarda los datos de gastos en el estado
            setGastos(respuesta.data);
        } catch (error) {
            // Si hay un error, muestra el mensaje en la consola
            console.error(
                "Error obteniendo gastos:",
                error.response?.data || error.message
            );
        }
    };

    // Función para obtener los ingresos desde la API
    const obtenerIngresos = async () => {
        try {
            // Realiza una solicitud GET a /api/ingresos
            const respuesta = await axios.get("/api/ingresos");

            // Guarda los datos de ingresos en el estado
            setIngresos(respuesta.data);
        } catch (error) {
            // Si hay un error, muestra el mensaje en la consola
            console.error(
                "Error obteniendo ingresos:",
                error.response?.data || error.message
            );
        }
    };

    // Función que ordena una lista de transacciones por fecha (de más reciente a más antigua)
    const ordenarPorFecha = (datos) => {
        return datos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    };

    // Renderiza el contenido del componente
    return (
        <div className="container">
            {/* Contenedor general */}

            {/* Título de la sección de gastos */}
            <h2>Tabla de Gastos</h2>

            {/* Input para filtrar gastos por tipo */}
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Filtrar por tipo de gasto..."
                onChange={(e) => setFiltroGasto(e.target.value)} // Actualiza el filtro de gasto
            />

            {/* Tabla de gastos */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Tipo de gasto</th>
                        <th>Descripción</th>
                        <th>Valor (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Filtra y ordena los gastos antes de renderizarlos */}
                    {ordenarPorFecha(
                        gastos.filter(
                            (item) =>
                                item.categoria
                                    ?.toLowerCase()
                                    .includes(filtroGasto.toLowerCase()) // Aplica filtro por texto
                        )
                    ).map((gasto) => (
                        <tr key={gasto.id}>
                            <td>{gasto.fecha}</td> {/* Fecha del gasto */}
                            <td>{gasto.categoria}</td> {/* Tipo de gasto */}
                            <td>{gasto.descripcion}</td> {/* Descripción */}
                            <td>{gasto.valor}</td> {/* Monto en € */}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Título de la sección de ingresos */}
            <h2>Tabla de Ingresos</h2>

            {/* Input para filtrar ingresos por tipo */}
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Filtrar por tipo de ingreso..."
                onChange={(e) => setFiltroIngreso(e.target.value)} // Actualiza el filtro de ingreso
            />

            {/* Tabla de ingresos */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Tipo de ingreso</th>
                        <th>Descripción</th>
                        <th>Valor (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Filtra y ordena los ingresos antes de mostrarlos */}
                    {ordenarPorFecha(
                        ingresos.filter(
                            (item) =>
                                item.categoria
                                    ?.toLowerCase()
                                    .includes(filtroIngreso.toLowerCase()) // Aplica filtro por texto
                        )
                    ).map((ingreso) => (
                        <tr key={ingreso.id}>
                            <td>{ingreso.fecha}</td> {/* Fecha del ingreso */}
                            <td>{ingreso.categoria}</td> {/* Tipo de ingreso */}
                            <td>{ingreso.descripcion}</td> {/* Descripción */}
                            <td>{ingreso.valor}</td> {/* Monto en € */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Exporta el componente para que pueda ser utilizado en otros archivos
export default TablasDashboard;
