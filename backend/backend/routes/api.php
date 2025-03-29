<?php
// Apertura del archivo PHP, necesario para que Laravel interprete el script correctamente.

use Illuminate\Http\Request; // Importa la clase Request, que permite manejar solicitudes HTTP (por ejemplo, POST, GET).
use Illuminate\Support\Facades\Route; // Importa la clase Route para definir las rutas de la API.
use App\Http\Controllers\AuthController; // Importa el controlador que gestiona el registro e inicio de sesión de usuarios.
use App\Http\Controllers\CategoryController; // Importa el controlador para la gestión de categorías.
use App\Http\Controllers\TransactionController; // Importa el controlador que gestiona las transacciones (gastos e ingresos).

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí se definen todas las rutas de la API para esta aplicación.
| Las rutas definidas en este archivo serán accesibles desde el prefijo /api/
| Por ejemplo: Route::get('categories') será accesible como /api/categories
|
*/

/**
 * Rutas públicas (sin autenticación):
 * Estas rutas se pueden usar sin necesidad de estar autenticado.
 */

// Ruta POST para registrar un nuevo usuario en la aplicación (por ejemplo: /api/register)
Route::post('register', [AuthController::class, 'register']); 

// Ruta POST para iniciar sesión con credenciales válidas (por ejemplo: /api/login)
Route::post('login', [AuthController::class, 'login']);       

/**
 * Rutas protegidas por middleware de autenticación:
 * Solo los usuarios autenticados con Sanctum pueden acceder a estas rutas.
 */
Route::middleware('auth:sanctum')->group(function () { 

    // Ruta RESTful para manejar categorías (GET, POST, PUT, DELETE)
    // Estas rutas son accesibles bajo /api/categories
    Route::apiResource('categories', CategoryController::class);

    // Ruta RESTful para manejar transacciones (GET, POST, PUT, DELETE)
    // Estas rutas son accesibles bajo /api/transactions
    Route::apiResource('transactions', TransactionController::class);

    // Ruta personalizada para obtener solo los gastos del usuario autenticado (GET /api/gastos)
    Route::get('gastos', [TransactionController::class, 'getGastos']);

    // Ruta personalizada para obtener solo los ingresos del usuario autenticado (GET /api/ingresos)
    Route::get('ingresos', [TransactionController::class, 'getIngresos']);
});