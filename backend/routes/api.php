<?php

use Illuminate\Http\Request; // Importa la clase Request para manejar solicitudes HTTP
use Illuminate\Support\Facades\Route; // Importa la clase Route para definir rutas en la API
use App\Http\Controllers\AuthController; // Importa el controlador de autenticación
use App\Http\Controllers\CategoryController; // Importa el controlador de categorías
use App\Http\Controllers\TransactionController; // Importa el controlador de transacciones

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Este archivo define las rutas de la API de la aplicación. Todas las rutas aquí
| serán accesibles desde /api/{ruta}. Esto significa que si defines una ruta 
| como Route::get('categories', ...), será accesible en /api/categories.
|
*/

/**
 * Rutas de Autenticación:
 * Estas rutas permiten a los usuarios registrarse e iniciar sesión.
 * No requieren autenticación previa.
 */

// Ruta para registrar un nuevo usuario (POST /api/register)
Route::post('register', [AuthController::class, 'register']); 

// Ruta para iniciar sesión (POST /api/login)
Route::post('login', [AuthController::class, 'login']);       

/**
 * Rutas protegidas por autenticación:
 * 
 * Ahora agrupamos las rutas de categorías y transacciones bajo un middleware 
 * llamado 'auth.api'. Esto significa que **solo los usuarios autenticados** 
 * podrán acceder a estas rutas.
 */Route::middleware('auth:sanctum')->group(function () { 
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('transactions', TransactionController::class);
});