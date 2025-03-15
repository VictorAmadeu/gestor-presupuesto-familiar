<?php

namespace App\Http\Middleware; // Define el espacio de nombres del middleware

use Closure; // Importa la clase Closure, que permite manejar funciones anónimas como middleware
use Illuminate\Http\Request; // Importa la clase Request de Laravel para manejar solicitudes HTTP
use Illuminate\Support\Facades\Auth; // Importa el facade Auth para verificar si el usuario está autenticado
use Symfony\Component\HttpFoundation\Response; // Importa la clase Response para definir respuestas HTTP

class AuthMiddleware
{
    /**
     * Maneja una solicitud entrante.
     *
     * @param  \Illuminate\Http\Request  $request  La solicitud HTTP entrante
     * @param  \Closure  $next  La función que permite pasar la solicitud al siguiente middleware
     * @return \Symfony\Component\HttpFoundation\Response  Respuesta HTTP
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verifica si el usuario está autenticado
        if (!Auth::check()) {
            // Si no está autenticado, devuelve una respuesta JSON con un mensaje de error y código 401 (No autorizado)
            return response()->json(['message' => 'No autorizado'], 401);
        }

        // Si el usuario está autenticado, continúa con la solicitud
        return $next($request);
    }
}