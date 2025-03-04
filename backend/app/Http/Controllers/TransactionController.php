<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Controlador para gestionar las transacciones (ingresos/gastos).
 */
class TransactionController extends Controller
{
    /**
     * Listar todas las transacciones.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Si cada usuario sólo ve sus transacciones:
        // $transactions = Transaction::where('user_id', Auth::id())->get();

        // O manejar roles (admin vs. member):
        // if (Auth::user()->role == 'admin') { ... } else { ... }

        // Para simplificar, mostramos todas:
        $transactions = Transaction::all();

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
        $request->validate([
            'amount' => 'required|numeric',
            'transaction_date' => 'required|date',
            'category_id' => 'required|exists:categories,id'
        ]);

        // Ejemplo para asignar el user_id al usuario autenticado:
        // $userId = Auth::id();

        $transaction = Transaction::create([
            'amount' => $request->amount,
            'description' => $request->description,
            'transaction_date' => $request->transaction_date,
            'category_id' => $request->category_id,
            'user_id' => null // Reemplaza con $userId si quieres vincularlo al usuario actual
        ]);

        return response()->json([
            'message' => 'Transacción creada exitosamente',
            'transaction' => $transaction
        ], 201);
    }

    /**
     * Mostrar detalle de una transacción.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }
        return response()->json($transaction, 200);
    }

    /**
     * Actualizar una transacción.
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }

        $request->validate([
            'amount' => 'required|numeric',
            'transaction_date' => 'required|date',
            'category_id' => 'required|exists:categories,id'
        ]);

        $transaction->update([
            'amount' => $request->amount,
            'description' => $request->description,
            'transaction_date' => $request->transaction_date,
            'category_id' => $request->category_id
        ]);

        return response()->json([
            'message' => 'Transacción actualizada',
            'transaction' => $transaction
        ], 200);
    }

    /**
     * Eliminar una transacción.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }

        $transaction->delete();
        return response()->json(['message' => 'Transacción eliminada'], 200);
    }
}