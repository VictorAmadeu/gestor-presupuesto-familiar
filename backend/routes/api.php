<?php // Inicia el archivo PHP que contendrá las rutas de la API

// Importamos Request para manejar solicitudes HTTP entrantes (GET, POST, etc.)
use Illuminate\Http\Request;

// Importamos Route para definir rutas en nuestra aplicación Laravel
use Illuminate\Support\Facades\Route;

// Importamos AuthController que gestionará registro e inicio de sesión
use App\Http\Controllers\AuthController;

// Importamos CategoryController que gestionará operaciones CRUD de categorías
use App\Http\Controllers\CategoryController;

// Importamos TransactionController para gestionar operaciones CRUD de transacciones
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí definimos todas las rutas API para nuestro proyecto. Estas rutas estarán
| accesibles a través del prefijo "/api". Por ejemplo, la ruta:
| Route::get('categorias') sería accesible desde:
| http://localhost:8000/api/categorias
|
*/

/**
 * 🔑 RUTAS DE AUTENTICACIÓN
 * Estas rutas permiten registrar usuarios nuevos e iniciar sesión.
 * Son públicas y no requieren autenticación previa.
 */

// Ruta para registrar un nuevo usuario mediante método POST
// Accesible desde: POST http://localhost:8000/api/register
Route::post('register', [AuthController::class, 'register']);

// Ruta para iniciar sesión (login) mediante método POST
// Accesible desde: POST http://localhost:8000/api/login
Route::post('login', [AuthController::class, 'login']);

/**
 * 🔐 RUTAS PROTEGIDAS POR AUTENTICACIÓN
 * Las siguientes rutas sólo pueden accederse si el usuario envía un token
 * válido de Laravel Sanctum en el header Authorization (Bearer token).
 * Esto garantiza que solamente usuarios autenticados puedan acceder.
 */
Route::middleware('auth:sanctum')->group(function () {

    // ⬇️ Recursos CRUD completos para "categorías"
    // GET, POST, PUT, DELETE en: http://localhost:8000/api/categories
    Route::apiResource('categories', CategoryController::class);

    // ⬇️ Recursos CRUD completos para "transacciones"
    // GET, POST, PUT, DELETE en: http://localhost:8000/api/transactions
    Route::apiResource('transactions', TransactionController::class);

    // ⬇️ Rutas adicionales que filtran por tipo de transacción:
    
    // Ruta para obtener sólo transacciones tipo "gasto"
    // Método: GET en http://localhost:8000/api/gastos
    Route::get('/gastos', [TransactionController::class, 'getGastos']);

    // Ruta para obtener sólo transacciones tipo "ingreso"
    // Método: GET en http://localhost:8000/api/ingresos
    Route::get('/ingresos', [TransactionController::class, 'getIngresos']);

});

// Final del archivo api.php (todas las rutas están correctamente protegidas ahora)