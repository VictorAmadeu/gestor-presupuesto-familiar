<?php

// Define el espacio de nombres (namespace) de este archivo dentro de la estructura del proyecto.
namespace App\Http;

// Importa la clase base HttpKernel de Laravel, que maneja la gestión de middleware.
use Illuminate\Foundation\Http\Kernel as HttpKernel;

/**
 * Clase Kernel
 * Esta clase administra el middleware global y los grupos de middleware en la aplicación.
 */
class Kernel extends HttpKernel
{
    /**
     * La pila de middleware global de la aplicación.
     *
     * Estos middleware se ejecutan en **cada solicitud HTTP** enviada a la aplicación.
     *
     * @var array
     */
    protected $middleware = [
        \Illuminate\Http\Middleware\TrustProxies::class, // ✅ Permite que la aplicación confíe en ciertos proxies y configure encabezados de confianza.
        \Illuminate\Http\Middleware\HandleCors::class, // ✅ Maneja las solicitudes CORS (Cross-Origin Resource Sharing), permitiendo peticiones entre dominios seguros.
        \Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance::class, // ✅ Bloquea solicitudes mientras la aplicación está en modo de mantenimiento.
        \Illuminate\Http\Middleware\ValidatePostSize::class, // ✅ Verifica que el tamaño de los datos enviados en solicitudes POST no supere el límite definido en la configuración.
        \App\Http\Middleware\TrimStrings::class, // ✅ Recorta los espacios en blanco al inicio y al final de las cadenas enviadas en solicitudes.
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class, // ✅ Convierte cadenas vacías en `null` para evitar errores en la base de datos.
    ];

    /**
     * Grupos de middleware de la aplicación.
     *
     * Estos middleware pueden agruparse para aplicarse a diferentes conjuntos de rutas.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [ // 🔹 Grupo de middleware para rutas web (vistas, formularios, etc.).
            \App\Http\Middleware\EncryptCookies::class, // ✅ Cifra automáticamente las cookies de la aplicación para seguridad.
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class, // ✅ Administra cookies que deben ser agregadas en la respuesta HTTP.
            \Illuminate\Session\Middleware\StartSession::class, // ✅ Inicia y maneja la sesión del usuario.
            \Illuminate\View\Middleware\ShareErrorsFromSession::class, // ✅ Comparte errores de validación almacenados en la sesión con las vistas.
            \App\Http\Middleware\VerifyCsrfToken::class, // ✅ Protege contra ataques CSRF (Cross-Site Request Forgery).
            \Illuminate\Routing\Middleware\SubstituteBindings::class, // ✅ Resuelve automáticamente las dependencias en las rutas que usan controladores.
        ],

        'api' => [ // 🔹 Grupo de middleware para rutas de la API (solicitudes desde frontend o clientes externos).
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, // ✅ Middleware de Sanctum para manejar autenticación de API.
            'throttle:api', // ✅ Limita la cantidad de solicitudes que un cliente puede hacer en un tiempo determinado (para evitar abusos).
            \Illuminate\Routing\Middleware\SubstituteBindings::class, // ✅ Resuelve automáticamente las dependencias en rutas API.
        ],
    ];

    /**
     * Alias de middleware de la aplicación.
     *
     * Los alias permiten asignar middleware específicos a rutas o grupos de rutas de manera simplificada.
     *
     * @var array
     */
    protected $middlewareAliases = [
        'auth' => \App\Http\Middleware\Authenticate::class, // ✅ Verifica si el usuario está autenticado antes de permitir el acceso a una ruta.
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class, // ✅ Implementa autenticación básica HTTP (poco usada en APIs modernas).
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class, // ✅ Define los encabezados de caché en respuestas HTTP.
        'can' => \Illuminate\Auth\Middleware\Authorize::class, // ✅ Verifica si el usuario tiene permisos específicos para acceder a una ruta.
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class, // ✅ Redirige a usuarios autenticados fuera de rutas reservadas para invitados.
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class, // ✅ Requiere confirmación de contraseña antes de ejecutar ciertas acciones sensibles.
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class, // ✅ Valida firmas digitales en URLs para garantizar su autenticidad.
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class, // ✅ Controla la cantidad de solicitudes permitidas en un período de tiempo.
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class, // ✅ Verifica si el usuario ha confirmado su correo electrónico.

        // 🔥 Middleware personalizado para autenticación API con Sanctum:
        'auth.api' => \App\Http\Middleware\AuthMiddleware::class, // ✅ Middleware que protege rutas API verificando tokens de autenticación.
    ];
}