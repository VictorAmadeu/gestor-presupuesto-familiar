<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Contracts\Routing\UrlGenerator;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Si usas la autenticación nativa de Laravel, esta constante define
     * a dónde redirigir tras iniciar sesión.
     */
    public const HOME = '/home';

    /**
     * Define bindings de modelos, filtros de rutas y otras configuraciones.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            // Rutas del API (prefijo /api)
            Route::prefix('api')
                ->middleware('api')
                ->group(base_path('routes/api.php'));

            // Rutas web (usa sesiones, vistas, etc.)
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configura limitadores de velocidad (Rate Limiting).
     */
    protected function configureRateLimiting(): void
    {
        RateLimiter::for('api', function (Request $request) {
            // Límite de 60 requests por minuto por usuario/IP
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}