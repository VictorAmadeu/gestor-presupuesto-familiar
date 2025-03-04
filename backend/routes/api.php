<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí definimos las rutas que responden a /api/...
| Por ejemplo: POST /api/register, GET /api/categories, etc.
|
*/

Route::post('register', [AuthController::class, 'register']); // POST /api/register
Route::post('login', [AuthController::class, 'login']);       // POST /api/login

// Rutas de categorías y transacciones
// Si quieres protegerlas con auth, activa el middleware y usa Sanctum/Passport
// Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('transactions', TransactionController::class);
// });