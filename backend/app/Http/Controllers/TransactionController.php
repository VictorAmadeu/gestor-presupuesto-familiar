<?php

namespace App\Http\Controllers; // Define el espacio de nombres del controlador

use App\Models\Transaction; // Importa el modelo Transaction para interactuar con la base de datos
use Illuminate\Http\Request; // Importa la clase Request para manejar peticiones HTTP
use Illuminate\Support\Facades\Auth; // Importa Auth para gestionar la autenticación del usuario

/**
 * Controlador para gestionar las transacciones (ingresos/gastos).
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
        // Obtiene el usuario autenticado
        $user = Auth::user();

        // Si no hay un usuario autenticado, devuelve un error 401 (No autorizado)
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        // Obtiene solo las transacciones del usuario autenticado
        $transactions = Transaction::where('user_id', $user->id)->get();

        // Devuelve las transacciones en formato JSON con un código HTTP 200 (OK)
        return response()->json($transactions, 200);
    }

    /**
     * Crear una nueva transacción.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Valida los datos de la solicitud antes de crear la transacción
        $request->validate([
            'amount' => 'required|numeric', // El monto es obligatorio y debe ser un número
            'transaction_date' => 'required|date', // La fecha de la transacción es obligatoria y debe ser una fecha válida
            'category_id' => 'required|exists:categories,id' // La categoría debe existir en la tabla categories
        ]);

        // Obtiene el usuario autenticado
        $userId = Auth::id();

        // Crea la nueva transacción con los datos recibidos
        $transaction = Transaction::create([
            'amount' => $request->amount, // Asigna el monto
            'description' => $request->description, // Asigna la descripción (opcional)
            'transaction_date' => $request->transaction_date, // Asigna la fecha de la transacción
            'category_id' => $request->category_id, // Asigna la categoría a la que pertenece
            'user_id' => $userId // Asigna la transacción al usuario autenticado
        ]);

        // Devuelve un mensaje de éxito junto con la transacción creada
        return response()->json([
            'message' => 'Transacción creada exitosamente',
            'transaction' => $transaction
        ], 201); // Código HTTP 201 (Creado)
    }

    /**
     * Mostrar detalle de una transacción específica.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Busca la transacción por su ID
        $transaction = Transaction::find($id);

        // Si no se encuentra, devuelve un error 404 (No encontrado)
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }

        // Devuelve la transacción en formato JSON con un código HTTP 200 (OK)
        return response()->json($transaction, 200);
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
        // Busca la transacción por su ID
        $transaction = Transaction::find($id);

        // Si no se encuentra, devuelve un error 404 (No encontrado)
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }

        // Valida los datos de la solicitud antes de actualizar la transacción
        $request->validate([
            'amount' => 'required|numeric', // El monto es obligatorio y debe ser un número
            'transaction_date' => 'required|date', // La fecha de la transacción es obligatoria y debe ser una fecha válida
            'category_id' => 'required|exists:categories,id' // La categoría debe existir en la tabla categories
        ]);

        // Actualiza la transacción con los nuevos valores recibidos
        $transaction->update([
            'amount' => $request->amount, // Actualiza el monto
            'description' => $request->description, // Actualiza la descripción (opcional)
            'transaction_date' => $request->transaction_date, // Actualiza la fecha de la transacción
            'category_id' => $request->category_id // Actualiza la categoría a la que pertenece
        ]);

        // Devuelve un mensaje de éxito junto con la transacción actualizada
        return response()->json([
            'message' => 'Transacción actualizada',
            'transaction' => $transaction
        ], 200); // Código HTTP 200 (OK)
    }

    /**
     * Eliminar una transacción.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Busca la transacción por su ID
        $transaction = Transaction::find($id);

        // Si no se encuentra, devuelve un error 404 (No encontrado)
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }

        // Elimina la transacción de la base de datos
        $transaction->delete();

        // Devuelve un mensaje de éxito indicando que la transacción fue eliminada
        return response()->json(['message' => 'Transacción eliminada'], 200); // Código HTTP 200 (OK)
    }
}