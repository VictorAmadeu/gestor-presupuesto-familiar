<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Controlador para gestionar las categorías (ingresos o gastos).
 */
class CategoryController extends Controller
{
    /**
     * Listar todas las categorías.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Si quieres que cada usuario sólo vea sus categorías, podrías usar:
        // $categories = Category::where('user_id', Auth::id())->get();

        // Si son globales (o el admin las ve todas), simplemente:
        $categories = Category::all();

        return response()->json($categories, 200);
    }

    /**
     * Crear una nueva categoría.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:income,expense'
        ]);

        // Ejemplo para asociar categoría al usuario logueado:
        // $userId = Auth::id();

        $category = Category::create([
            'name' => $request->name,
            'type' => $request->type,
            'user_id' => null // Reemplaza con $userId si deseas vincularla al usuario
        ]);

        return response()->json([
            'message' => 'Categoría creada exitosamente',
            'category' => $category
        ], 201);
    }

    /**
     * Mostrar una categoría específica.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
        return response()->json($category, 200);
    }

    /**
     * Actualizar una categoría.
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:income,expense'
        ]);

        $category->update([
            'name' => $request->name,
            'type' => $request->type
        ]);

        return response()->json([
            'message' => 'Categoría actualizada',
            'category' => $category
        ], 200);
    }

    /**
     * Eliminar una categoría.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        $category->delete();
        return response()->json(['message' => 'Categoría eliminada'], 200);
    }
}