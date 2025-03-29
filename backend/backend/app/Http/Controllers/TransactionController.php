<?php
// ****************************************************************************************************
// Línea 1: Declaración de namespace para que Laravel ubique correctamente este controlador dentro de la estructura.
namespace App\Http\Controllers;

// ****************************************************************************************************
// Líneas 4-6: Importaciones de clases que serán utilizadas.
use App\Models\Transaction;      // Modelo Transaction, representa la tabla 'transactions' en la base de datos.
use Illuminate\Http\Request;     // Para manejar datos de las solicitudes HTTP (GET, POST, etc.)
use Illuminate\Support\Facades\Auth; // Para obtener el usuario autenticado (Auth::user()).

// ****************************************************************************************************
// Línea 9: Definición de la clase 'TransactionController', responsable de crear, leer, actualizar y eliminar
//          transacciones, así como de métodos personalizados (getGastos y getIngresos).
class TransactionController extends Controller
{
    // ************************************************************************************************
    // Método index(): Retorna todas las transacciones del usuario autenticado.
    // Se invoca con GET /api/transactions
    public function index()
    {
        // Línea 16: Se obtiene el usuario autenticado que realiza la petición.
        $user = Auth::user();

        // Línea 19-21: Si no hay usuario autenticado, responde con un JSON de error y código 401.
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        // Línea 24-26: Se obtienen todas las transacciones del usuario, incluyendo la relación 'category'.
        //              Filtramos por user_id para mostrar solo las del usuario autenticado.
        $transactions = Transaction::with('category')
            ->where('user_id', $user->id)
            ->get();

        // Línea 29-31: Devolvemos las transacciones en formato JSON, con código 200 (OK).
        return response()->json($transactions, 200);
    }

    // ************************************************************************************************
    // Método store(): Crea una nueva transacción para el usuario autenticado.
    // Se invoca con POST /api/transactions
    public function store(Request $request)
    {
        // Línea 38-41: Validamos los datos requeridos en la solicitud.
        $request->validate([
            'amount'           => 'required|numeric',
            'transaction_date' => 'required|date',
            'category_id'      => 'required|exists:categories,id'
        ]);

        // Línea 44: Obtenemos el ID del usuario autenticado.
        $userId = Auth::id();

        // Línea 47-54: Creamos la transacción asociada al usuario.
        $transaction = Transaction::create([
            'amount'           => $request->amount,
            'description'      => $request->description,
            'transaction_date' => $request->transaction_date,
            'category_id'      => $request->category_id,
            'user_id'          => $userId
        ]);

        // Línea 57-64: Devolvemos una respuesta JSON con un mensaje de éxito y la transacción creada,
        //              acompañado del código 201 (Created).
        return response()->json([
            'message'     => 'Transacción creada exitosamente',
            'transaction' => $transaction
        ], 201);
    }

    // ************************************************************************************************
    // Método show($id): Muestra una transacción específica por su ID.
    // Se invoca con GET /api/transactions/{id}
    public function show($id)
    {
        // Línea 72: Buscamos la transacción por ID, incluyendo la relación 'category'.
        $transaction = Transaction::with('category')->find($id);

        // Línea 75-77: Si no existe, devolvemos un mensaje de error y código 404 (No encontrado).
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }

        // Línea 80-82: Si existe, devolvemos la transacción en formato JSON y código 200 (OK).
        return response()->json($transaction, 200);
    }

    // ************************************************************************************************
    // Método update($request, $id): Actualiza los datos de una transacción existente.
    // Se invoca con PUT/PATCH /api/transactions/{id}
    public function update(Request $request, $id)
    {
        // Línea 89: Localizamos la transacción por su ID.
        $transaction = Transaction::find($id);

        // Línea 92-94: Si no se encuentra, respondemos con error 404.
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }

        // Línea 97-101: Validamos que los nuevos datos cumplan los requisitos.
        $request->validate([
            'amount'           => 'required|numeric',
            'transaction_date' => 'required|date',
            'category_id'      => 'required|exists:categories,id'
        ]);

        // Línea 104-109: Actualizamos la transacción con los campos recibidos.
        $transaction->update([
            'amount'           => $request->amount,
            'description'      => $request->description,
            'transaction_date' => $request->transaction_date,
            'category_id'      => $request->category_id
        ]);

        // Línea 112-119: Devolvemos respuesta JSON con mensaje de éxito y la transacción actualizada,
        //                acompañado de código 200 (OK).
        return response()->json([
            'message'     => 'Transacción actualizada',
            'transaction' => $transaction
        ], 200);
    }

    // ************************************************************************************************
    // Método destroy($id): Elimina una transacción por su ID.
    // Se invoca con DELETE /api/transactions/{id}
    public function destroy($id)
    {
        // Línea 126: Buscamos la transacción según su ID.
        $transaction = Transaction::find($id);

        // Línea 129-131: Si no se encuentra, respondemos con mensaje y código 404.
        if (!$transaction) {
            return response()->json(['message' => 'Transacción no encontrada'], 404);
        }

        // Línea 134: Eliminamos la transacción de la base de datos.
        $transaction->delete();

        // Línea 137-139: Retornamos un mensaje de éxito en JSON y código 200 (OK).
        return response()->json(['message' => 'Transacción eliminada'], 200);
    }

    // ************************************************************************************************
    // Método getGastos(): Retorna todas las transacciones de tipo 'gasto' para el usuario autenticado.
    // Se invoca con GET /api/gastos
    public function getGastos()
    {
        // Línea 146: Obtenemos el usuario autenticado.
        $user = Auth::user();

        // Línea 149-151: Si no está autenticado, devolvemos 401 (No autorizado).
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        // Línea 154-162: Recuperamos las transacciones (con la relación 'category')
        //                cuyo 'user_id' sea el del usuario autenticado
        //                y cuya categoría tenga 'type' = 'gasto'.
        $gastos = Transaction::with('category')
            ->where('user_id', $user->id)
            ->whereHas('category', function ($query) {
                $query->where('type', 'gasto');
            })
            ->get();

        // Línea 165-167: Retornamos la lista de gastos en JSON con código 200 (OK).
        return response()->json($gastos, 200);
    }

    // ************************************************************************************************
    // Método getIngresos(): Retorna todas las transacciones de tipo 'ingreso' para el usuario autenticado.
    // Se invoca con GET /api/ingresos
    public function getIngresos()
    {
        // Línea 174: Obtenemos el usuario autenticado.
        $user = Auth::user();

        // Línea 177-179: Si no hay usuario autenticado, respondemos con error 401.
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        // Línea 182-190: Recuperamos las transacciones (cargando 'category')
        //                filtrando por 'user_id' y 'type' = 'ingreso' en la categoría.
        $ingresos = Transaction::with('category')
            ->where('user_id', $user->id)
            ->whereHas('category', function ($query) {
                $query->where('type', 'ingreso');
            })
            ->get();

        // Línea 193-195: Retornamos la lista de ingresos en JSON con código 200 (OK).
        return response()->json($ingresos, 200);
    }
}