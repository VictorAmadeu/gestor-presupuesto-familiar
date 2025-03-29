<?php

namespace App\Http\Controllers; // Define el espacio de nombres del controlador. Ayuda a Laravel a ubicar correctamente este archivo dentro de la estructura del proyecto.

use App\Models\Transaction; // Importa el modelo Transaction, que representa la tabla de transacciones en la base de datos.
use Illuminate\Http\Request; // Importa la clase Request, usada para acceder a los datos enviados por el usuario (por ejemplo, en formularios).
use Illuminate\Support\Facades\Auth; // Importa el facade Auth, que se utiliza para obtener información del usuario autenticado.

/**
 * Controlador para gestionar las transacciones (ingresos y gastos).
 */
class TransactionController extends Controller
{
    /**
     * Listar todas las transacciones del usuario autenticado.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user(); // Obtiene el usuario autenticado actualmente.

        if (!$user) { // Si no hay usuario autenticado...
            return response()->json(['message' => 'No autorizado'], 401); // ... se devuelve un error 401 (no autorizado).
        }

        $transactions = Transaction::where('user_id', $user->id)->get(); // Se buscan todas las transacciones asociadas al usuario autenticado.

        return response()->json($transactions, 200); // Se devuelven las transacciones encontradas en formato JSON con código HTTP 200 (OK).
    }

    /**
     * Crear una nueva transacción.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validación de los campos del formulario enviados en la solicitud.
        $request->validate([
            'amount' => 'required|numeric', // El campo "amount" es obligatorio y debe ser un número.
            'transaction_date' => 'required|date', // El campo "transaction_date" es obligatorio y debe tener formato de fecha.
            'category_id' => 'required|exists:categories,id' // La categoría debe existir en la tabla de categorías (categories).
        ]);

        $userId = Auth::id(); // Obtiene el ID del usuario autenticado actualmente.

        // Crea una nueva transacción en la base de datos con los datos validados.
        $transaction = Transaction::create([
            'amount' => $request->amount, // Asigna el monto recibido.
            'description' => $request->description, // Asigna la descripción opcional.
            'transaction_date' => $request->transaction_date, // Asigna la fecha de la transacción.
            'category_id' => $request->category_id, // Asocia la transacción con la categoría indicada.
            'user_id' => $userId // Asocia la transacción al usuario que la creó.
        ]);

        // Devuelve un mensaje de éxito junto con la transacción recién creada.
        return response()->json([
            'message' => 'Transacción creada exitosamente',
            'transaction' => $transaction
        ], 201); // Código HTTP 201 (Creado).
    }

    /**
     * Mostrar detalle de una transacción específica.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $transaction = Transaction::find($id); // Busca la transacción por su ID.

        if (!$transaction) { // Si no se encuentra...
            return response()->json(['message' => 'Transacción no encontrada'], 404); // ... devuelve error 404 (no encontrado).
        }

        return response()->json($transaction, 200); // Si se encuentra, devuelve la transacción con código 200 (OK).
    }

    /**
     * Actualizar una transacción existente.
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id); // Busca la transacción por su ID.

        if (!$transaction) { // Si no se encuentra...
            return response()->json(['message' => 'Transacción no encontrada'], 404); // ... devuelve error 404.
        }

        // Valida los datos recibidos antes de actualizar.
        $request->validate([
            'amount' => 'required|numeric', // El monto es obligatorio y debe ser numérico.
            'transaction_date' => 'required|date', // La fecha de la transacción debe ser válida.
            'category_id' => 'required|exists:categories,id' // La categoría debe existir en la base de datos.
        ]);

        // Actualiza los campos de la transacción con los nuevos valores.
        $transaction->update([
            'amount' => $request->amount, // Actualiza el monto.
            'description' => $request->description, // Actualiza la descripción.
            'transaction_date' => $request->transaction_date, // Actualiza la fecha.
            'category_id' => $request->category_id // Actualiza la categoría asociada.
        ]);

        // Devuelve mensaje de éxito junto con los nuevos datos de la transacción.
        return response()->json([
            'message' => 'Transacción actualizada',
            'transaction' => $transaction
        ], 200); // Código 200 OK.
    }

    /**
     * Eliminar una transacción existente.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $transaction = Transaction::find($id); // Busca la transacción por su ID.

        if (!$transaction) { // Si no se encuentra...
            return response()->json(['message' => 'Transacción eliminada'], 404); // ... devuelve error 404.
        }

        $transaction->delete(); // Elimina la transacción de la base de datos.

        return response()->json(['message' => 'Transacción eliminada'], 200); // Mensaje de éxito y código 200 OK.
    }

    /**
     * Obtener solo las transacciones que son GASTOS.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getGastos()
    {
        $user = Auth::user(); // Obtiene el usuario autenticado.

        if (!$user) { // Verifica si hay usuario.
            return response()->json(['message' => 'No autorizado'], 401); // Si no lo hay, devuelve error 401.
        }

        // Busca las transacciones de tipo "gasto" que pertenezcan al usuario.
        $gastos = Transaction::where('user_id', $user->id)
                             ->whereHas('category', function ($query) {
                                 $query->where('type', 'gasto'); // Asegura que la categoría tenga tipo 'gasto'.
                             })
                             ->get();

        return response()->json($gastos, 200); // Devuelve los gastos en formato JSON.
    }

    /**
     * Obtener solo las transacciones que son INGRESOS.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getIngresos()
    {
        $user = Auth::user(); // Obtiene el usuario autenticado.

        if (!$user) { // Verifica si hay usuario autenticado.
            return response()->json(['message' => 'No autorizado'], 401); // Si no, devuelve error 401.
        }

        // Busca las transacciones de tipo "ingreso" que pertenezcan al usuario.
        $ingresos = Transaction::where('user_id', $user->id)
                               ->whereHas('category', function ($query) {
                                   $query->where('type', 'ingreso'); // Asegura que la categoría tenga tipo 'ingreso'.
                               })
                               ->get();

        return response()->json($ingresos, 200); // Devuelve los ingresos en formato JSON.
    }
}