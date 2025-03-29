<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }
        $transactions = Transaction::with('category')->where('user_id', $user->id)->get();
        return response()->json($transactions, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'transaction_date' => 'required|date',
            'category_id' => 'required|exists:categories,id'
        ]);
        $userId = Auth::id();
        $transaction = Transaction::create([
            'amount' => $request->amount,
            'description' => $request->description,
            'transaction_date' => $request->transaction_date,
            'category_id' => $request->category_id,
            'user_id' => $userId
        ]);
        return response()->json(['message' => 'Transacción creada exitosamente', 'transaction' => $transaction], 201);
    }

    public function show($id)
    {
        $transaction = Transaction::with('category')->find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }
        return response()->json($transaction, 200);
    }

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
        return response()->json(['message' => 'Transacción actualizada', 'transaction' => $transaction], 200);
    }

    public function destroy($id)
    {
        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }
        $transaction->delete();
        return response()->json(['message' => 'Transacción eliminada'], 200);
    }

    public function getGastos()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        $gastos = Transaction::with('category')
            ->where('user_id', $user->id)
            ->whereHas('category', function ($query) {
                $query->whereNotNull('type')->where('type', 'gasto');
            })
            ->get();

        return response()->json($gastos, 200);
    }

    public function getIngresos()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        $ingresos = Transaction::with('category')
            ->where('user_id', $user->id)
            ->whereHas('category', function ($query) {
                $query->whereNotNull('type')->where('type', 'ingreso');
            })
            ->get();

        return response()->json($ingresos, 200);
    }
}