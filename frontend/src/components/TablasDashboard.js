// Línea 1: Importamos React y los hooks useEffect y useState
import React, { useEffect, useState } from "react";

// Línea 2: Importamos axios para hacer llamadas HTTP al backend
import axios from "axios";

// Línea 3: Definimos el componente funcional TablasDashboard que recibe la prop 'refresh'
function TablasDashboard({ refresh }) {
    // Línea 4: Estado local que almacena todas las transacciones obtenidas del backend
    const [transacciones, setTransacciones] = useState([]);

    // Línea 7: Hook useEffect que se ejecuta cada vez que cambia 'refresh'
    useEffect(() => {
        // Línea 8: Llama a la función que obtiene las transacciones
        obtenerTransacciones();
        // Línea 9: Se ejecutará también cuando se cree o elimine una transacción
    }, [refresh]);

    // Línea 12: Función asincrónica para obtener las transacciones desde la API
    const obtenerTransacciones = async () => {
        try {
            // Línea 14: Petición GET al endpoint de transacciones con el token del usuario
            const respuesta = await axios.get("/api/transactions", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Enviamos el token almacenado
                },
            });

            // Línea 19: Guardamos las transacciones en el estado local
            setTransacciones(respuesta.data);
        } catch (error) {
            // Línea 21: En caso de error, mostramos en consola
            console.error("Erro ao buscar transações:", error);
        }
    };

    // Línea 25: Función que agrupa transacciones por categoría y tipo
    const agruparPorCategoria = (transacciones) => {
        // Línea 26: Creamos un objeto vacío para guardar agrupaciones
        const resultado = {};

        // Línea 29: Recorremos todas las transacciones una a una
        transacciones.forEach((t) => {
            // Línea 30: Obtenemos el nombre de la categoría o usamos "Sin Categoria"
            const categoria = t.category?.name || "Sin Categoria";

            // Línea 31: Obtenemos el tipo de la categoría o usamos "Sin Tipo"
            const tipo = t.category?.type || "Sin Tipo";

            // Línea 32: Creamos una clave única combinando nombre y tipo
            const chave = `${categoria}-${tipo}`;

            // Línea 34: Si esa clave aún no existe en el resultado, la inicializamos
            if (!resultado[chave]) {
                resultado[chave] = {
                    categoria, // Guardamos el nombre de la categoría
                    tipo, // Guardamos el tipo (gasto / ingreso)
                    total: 0, // Inicializamos el total acumulado
                };
            }

            // Línea 41: Sumamos el monto de la transacción al total acumulado de esa categoría
            resultado[chave].total += parseFloat(t.amount);
        });

        // Línea 44: Devolvemos un array con los valores agrupados
        return Object.values(resultado);
    };

    // Línea 48: Llamamos a la función de agrupación pasando las transacciones actuales
    const categoriasAgrupadas = agruparPorCategoria(transacciones);

    // Línea 51: Retornamos el JSX con la tabla consolidada
    return (
        <div className="container mt-4">
            {/* Línea 53: Título principal de la sección */}
            <h2>Tabela Consolidada por Categorias</h2>

            {/* Línea 56: Tabla que muestra los resultados agrupados */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Tipo</th>
                        <th>Total (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Línea 64: Mapeamos cada item agrupado y lo renderizamos como fila */}
                    {categoriasAgrupadas.map((item, index) => (
                        <tr key={index}>
                            <td>{item.categoria}</td>
                            <td>{item.tipo}</td>
                            <td>{item.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Línea 74: Exportamos el componente TablasDashboard para usarlo en otras partes del proyecto
export default TablasDashboard;
