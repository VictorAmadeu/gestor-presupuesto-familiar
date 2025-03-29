<?php
// Importa la clase Request de Laravel para manejar solicitudes HTTP (como POST, GET, etc.)
use Illuminate\Http\Request;

// Importa la clase Route que permite definir rutas dentro de Laravel
use Illuminate\Support\Facades\Route;

// Importa el controlador encargado de manejar autenticación (registro, login)
use App\Http\Controllers\AuthController;

// Importa el controlador de categorías, donde se gestionan las categorías de ingresos y gastos
use App\Http\Controllers\CategoryController;

// Importa el controlador de transacciones, que maneja el registro de movimientos financieros
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Este archivo define las rutas de la API que usarán los clientes frontend.
| Todas las rutas aquí definidas serán accesibles a través del prefijo /api.
| Por ejemplo, una ruta como 'Route::get("categories")' será accesible en
| 'http://localhost:8000/api/categories'.
|
*/

/**
 * Rutas de Autenticación:
 * Estas rutas permiten a los usuarios registrarse e iniciar sesión.
 * No requieren autenticación previa, ya que cualquier usuario podrá usarlas
 * sin estar logueado.
 */

// Ruta para registrar un nuevo usuario (POST http://localhost:8000/api/register)
Route::post('register', [AuthController::class, 'register']);

// Ruta para iniciar sesión de usuario (POST http://localhost:8000/api/login)
Route::post('login', [AuthController::class, 'login']);

/**
 * Rutas protegidas por autenticación:
 * Todas las rutas dentro de este grupo sólo pueden ser accedidas si el usuario
 * ha iniciado sesión correctamente (mediante token Sanctum).
 */
Route::middleware('auth:sanctum')->group(function () {

    // Define un conjunto completo de rutas RESTful para categorías
    // (GET, POST, PUT, DELETE /api/categories)
    Route::apiResource('categories', CategoryController::class);

    // Define un conjunto completo de rutas RESTful para transacciones
    // (GET, POST, PUT, DELETE /api/transactions)
    Route::apiResource('transactions', TransactionController::class);
});

// -----------------------------------------------------------------------------
// NUEVAS RUTAS PARA GASTOS E INGRESOS - ACCESO LIBRE (NO REQUIERE AUTENTICACIÓN)
// -----------------------------------------------------------------------------
// Estas rutas devuelven datos filtrados de transacciones según el tipo:
// - gastos → tipo: 'gasto'
// - ingresos → tipo: 'ingreso'

// Ruta para obtener todas las transacciones que sean de tipo "gasto"
// GET http://localhost:8000/api/gastos
Route::get('/gastos', [TransactionController::class, 'getGastos']);

// Ruta para obtener todas las transacciones que sean de tipo "ingreso"
// GET http://localhost:8000/api/ingresos
Route::get('/ingresos', [TransactionController::class, 'getIngresos']);