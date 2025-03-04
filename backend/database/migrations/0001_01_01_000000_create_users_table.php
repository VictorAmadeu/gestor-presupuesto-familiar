<?php // Apertura de la etiqueta PHP, necesaria para indicar que este archivo contiene código en PHP.

use Illuminate\Database\Migrations\Migration; // Importamos la clase 'Migration' para poder crear migraciones.
use Illuminate\Database\Schema\Blueprint;     // Importamos 'Blueprint' para definir columnas y propiedades de las tablas.
use Illuminate\Support\Facades\Schema;       // Importamos 'Schema' para interactuar con la base de datos (crear, eliminar tablas, etc.).

return new class extends Migration // Iniciamos una clase anónima que extiende de 'Migration'. Esto es propio de las versiones recientes de Laravel.
{
    /**
     * Run the migrations.
     */
    public function up(): void // Definimos el método 'up' que se ejecutará para aplicar la migración (crear o modificar tablas).
    {
        Schema::create('users', function (Blueprint $table) { // Usamos 'Schema::create' para crear la tabla 'users' con un Blueprint que define sus columnas.
            $table->id();                                  // Columna 'id' autoincremental y primaria (Big Integer).
            $table->string('name');                        // Columna 'name' para guardar el nombre del usuario, tipo VARCHAR en la base de datos.
            $table->string('email')->unique();             // Columna 'email', con restricción 'unique' para que no se repita en la tabla.
            $table->timestamp('email_verified_at')->nullable(); 
            // Columna para guardar la fecha/hora en que se verificó el email, puede ser nulo.

            $table->string('password');                    // Columna 'password' para la contraseña encriptada.
            $table->enum('role', ['admin','member'])->default('member'); 
            // Columna 'role' de tipo ENUM, solo puede ser 'admin' o 'member'. Por defecto, 'member'.

            $table->rememberToken();                       // Columna que guarda un token para recordar la sesión del usuario.
            $table->timestamps();                          // Crea columnas 'created_at' y 'updated_at' para seguimiento de registros.
        }); // Fin de la definición de la tabla 'users'.

        Schema::create('password_reset_tokens', function (Blueprint $table) { 
            // Creamos la tabla 'password_reset_tokens' para almacenar tokens de reseteo de contraseña.
            $table->string('email')->primary();           // Columna 'email' que será la clave primaria de esta tabla.
            $table->string('token');                      // Columna 'token' para guardar el token de reseteo.
            $table->timestamp('created_at')->nullable();  // Columna 'created_at' para guardar cuándo se generó el token, puede ser nulo.
        }); // Fin de la definición de la tabla 'password_reset_tokens'.

        Schema::create('sessions', function (Blueprint $table) {
            // Creamos la tabla 'sessions' para almacenar sesiones de usuarios.
            $table->string('id')->primary();              // Columna 'id' que será la clave primaria (ID único de la sesión).
            $table->foreignId('user_id')->nullable()->index(); 
            // 'user_id' que referencia a la tabla de usuarios, puede ser nulo y tiene un índice para mejorar búsquedas.
            $table->string('ip_address', 45)->nullable(); // Columna para guardar la dirección IP, con longitud de 45 caracteres (soporta IPv6).
            $table->text('user_agent')->nullable();       // Columna para guardar información del navegador/cliente, texto largo y opcional.
            $table->longText('payload');                  // Columna que almacena datos serializados de la sesión, tipo LONGTEXT.
            $table->integer('last_activity')->index();    // Columna entera para el timestamp de la última actividad, con índice.
        }); // Fin de la definición de la tabla 'sessions'.
    } // Fin del método 'up'.

    /**
     * Reverse the migrations.
     */
    public function down(): void // Definimos el método 'down' que se ejecuta para revertir la migración (eliminar tablas).
    {
        Schema::dropIfExists('users');                // Elimina la tabla 'users' si existe.
        Schema::dropIfExists('password_reset_tokens'); 
        // Elimina la tabla 'password_reset_tokens' si existe.
        Schema::dropIfExists('sessions');            // Elimina la tabla 'sessions' si existe.
    } // Fin del método 'down'.
}; // Cierre de la clase anónima que extiende de 'Migration'.