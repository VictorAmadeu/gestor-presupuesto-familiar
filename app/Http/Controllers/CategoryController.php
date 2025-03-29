<?php

namespace App\Http\Controllers; // Define el espacio de nombres del controlador

use App\Models\Category; // Importa el modelo Category, que representa la tabla 'categories'
use Illuminate\Http\Request; // Importa la clase Request para manejar las solicitudes HTTP
use Illuminate\Support\Facades\Auth; // Importa la clase Auth para obtener el usuario autenticado

/**
 * Controlador para gestionar las categorías (ingresos o gastos).
 */
class CategoryController extends Controller
{
    /**
     * Listar todas las categorías del usuario autenticado.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Obtener el usuario autenticado
        $user = Auth::user(); 

        // Si no hay usuario autenticado, devolver error 401 (No autorizado)
        if (!$user) {
            return response()->json(['message' => 'No autorizado'], 401);
        }

        // Obtener solo las categorías del usuario autenticado
        $categories = Category::where('user_id', $user->id)->get();

        // Retornar las categorías en formato JSON con código 200 (OK)
        return response()->json($categories, 200);
    }

    /**
     * Crear una nueva categoría asociada al usuario autenticado.
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos en la solicitud
        $request->validate([
            'name' => 'required|string', // El nombre es obligatorio y debe ser un string
            'type' => 'required|in:income,expense' // El tipo debe ser 'income' o 'expense'
        ]);

        // Obtener el ID del usuario autenticado
        $userId = Auth::id();

        // Crear una nueva categoría asociada al usuario autenticado
        $category = Category::create([
            'name' => $request->name,
            'type' => $request->type,
            'user_id' => $userId // Asignar la categoría al usuario autenticado
        ]);

        // Retornar un mensaje de éxito y la categoría creada con código 201 (Creado)
        return response()->json([
            'message' => 'Categoría creada exitosamente',
            'category' => $category
        ], 201);
    }

    /**
     * Mostrar una categoría específica si pertenece al usuario autenticado.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Buscar la categoría por ID y asegurarse de que pertenece al usuario autenticado
        $category = Category::where('id', $id)
                            ->where('user_id', Auth::id())
                            ->first();

        // Si la categoría no existe o no pertenece al usuario, devolver error 404
        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        // Retornar la categoría en formato JSON con código 200 (OK)
        return response()->json($category, 200);
    }

    /**
     * Actualizar una categoría si pertenece al usuario autenticado.
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Buscar la categoría y asegurarse de que pertenece al usuario autenticado
        $category = Category::where('id', $id)
                            ->where('user_id', Auth::id())
                            ->first();

        // Si la categoría no existe o no pertenece al usuario, devolver error 404
        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        // Validar los datos de la solicitud
        $request->validate([
            'name' => 'required|string', // El nombre es obligatorio y debe ser un string
            'type' => 'required|in:income,expense' // El tipo debe ser 'income' o 'expense'
        ]);

        // Actualizar los datos de la categoría
        $category->update([
            'name' => $request->name,
            'type' => $request->type
        ]);

        // Retornar un mensaje de éxito con código 200 (OK)
        return response()->json([
            'message' => 'Categoría actualizada',
            'category' => $category
        ], 200);
    }

    /**
     * Eliminar una categoría si pertenece al usuario autenticado.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
{
    $userId = Auth::id();

    $category = Category::where('user_id', $userId)->find($id);

    if (!$category) {
        return response()->json(['message' => 'Categoría no encontrada'], 404);
    }

    $category->delete();

    return response()->json(['message' => 'Categoría eliminada'], 200);
}

}