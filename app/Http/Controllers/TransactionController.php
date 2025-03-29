<?php

namespace App\Http\Controllers; // Define el espacio de nombres del controlador

use App\Models\Transaction; // Importa el modelo Transaction para trabajar con la base de datos
use Illuminate\Http\Request; // Importa la clase Request para manejar solicitudes HTTP
use Illuminate\Support\Facades\Auth; // Importa la clase Auth para obtener el usuario autenticado

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

        // Verifica si hay un usuario autenticado
        if (!$user) {
            // Si no hay usuario, devuelve error de no autorizado (401)
            return response()->json(['message' => 'No autorizado'], 401);
        }

        // Obtiene todas las transacciones del usuario autenticado
        $transactions = Transaction::where('user_id', $user->id)->get();

        // Devuelve las transacciones como JSON con código 200 (OK)
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
        // Valida los campos requeridos antes de guardar
        $request->validate([
            'amount' => 'required|numeric', // Monto obligatorio y numérico
            'transaction_date' => 'required|date', // Fecha obligatoria y válida
            'category_id' => 'required|exists:categories,id' // La categoría debe existir
        ]);

        // Obtiene el ID del usuario autenticado
        $userId = Auth::id();

        // Crea la transacción con los datos enviados
        $transaction = Transaction::create([
            'amount' => $request->amount,
            'description' => $request->description,
            'transaction_date' => $request->transaction_date,
            'category_id' => $request->category_id,
            'user_id' => $userId
        ]);

        // Devuelve mensaje y datos de la transacción creada
        return response()->json([
            'message' => 'Transacción creada exitosamente',
            'transaction' => $transaction
        ], 201); // Código 201: creado con éxito
    }

    /**
     * Mostrar una transacción específica por su ID.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Busca la transacción con el ID indicado
        $transaction = Transaction::find($id);

        // Si no existe, devuelve error 404
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }

        // Devuelve la transacción encontrada
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

        // Si no se encuentra, devuelve error 404
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }

        // Valida los nuevos datos
        $request->validate([
            'amount' => 'required|numeric',
            'transaction_date' => 'required|date',
            'category_id' => 'required|exists:categories,id'
        ]);

        // Actualiza los datos en la base de datos
        $transaction->update([
            'amount' => $request->amount,
            'description' => $request->description,
            'transaction_date' => $request->transaction_date,
            'category_id' => $request->category_id
        ]);

        // Devuelve la transacción actualizada
        return response()->json([
            'message' => 'Transacción actualizada',
            'transaction' => $transaction
        ], 200);
    }

    /**
     * Eliminar una transacción por ID.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
{
    // Obtém usuário autenticado
    $userId = Auth::id();

    // Busca a transação filtrando por usuário autenticado
    $transaction = Transaction::where('user_id', $userId)->find($id);

    // Se não encontrada para esse usuário, retorna erro
    if (!$transaction) {
        return response()->json(['message' => 'Transacción no encontrada'], 404);
    }

    // Deleta transação
    $transaction->delete();

    // Retorna sucesso
    return response()->json(['message' => 'Transacción eliminada'], 200);
}


    /**
     * Obtener todas las transacciones tipo gasto, según la categoría asociada.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getGastos()
    {
        // Obtiene el ID del usuario actual
        $userId = Auth::id();

        // Filtra transacciones del usuario cuyas categorías sean tipo 'gasto'
        $gastos = Transaction::where('user_id', $userId)
            ->whereHas('category', function ($query) {
                $query->where('type', 'gasto'); // Asegúrate que en DB sea 'gasto'
            })
            ->with('category') // Incluye los datos de la categoría
            ->get();

        // Devuelve los gastos como JSON
        return response()->json($gastos);
    }

    /**
     * Obtener todas las transacciones tipo ingreso, según la categoría asociada.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getIngresos()
    {
        // Obtiene el ID del usuario actual
        $userId = Auth::id();

        // Filtra transacciones del usuario cuyas categorías sean tipo 'ingreso'
        $ingresos = Transaction::where('user_id', $userId)
            ->whereHas('category', function ($query) {
                $query->where('type', 'ingreso'); // Asegúrate que en DB sea 'ingreso'
            })
            ->with('category') // Incluye los datos de la categoría
            ->get();

        // Devuelve los ingresos como JSON
        return response()->json($ingresos);
    }
}