<?php
// Inicia el bloque de código PHP, habilitando la sintaxis de PHP en este archivo.

use Illuminate\Database\Migrations\Migration;
// Importa la clase 'Migration' para crear y gestionar migraciones en Laravel.

use Illuminate\Database\Schema\Blueprint;
// Importa la clase 'Blueprint', utilizada para definir la estructura de las tablas (columnas, índices, llaves foráneas, etc.).

use Illuminate\Support\Facades\Schema;
// Importa la fachada 'Schema', que provee métodos para crear, modificar o eliminar tablas en la base de datos.

return new class extends Migration
// Retorna una instancia de una clase anónima que extiende de 'Migration'.
// Este patrón es común en Laravel 8+ para declarar las migraciones en archivos individuales.
{
    /**
     * Run the migrations.
     *
     * Crea la tabla 'categories' para almacenar categorías de gastos/ingresos.
     */
    public function up(): void
    // El método 'up()' se ejecuta cuando lanzamos 'php artisan migrate', aplicando los cambios a la base de datos.
    {
        Schema::create('categories', function (Blueprint $table) {
            // Llama al método 'create' de la fachada 'Schema' para crear la tabla 'categories'.
            // Recibe una instancia de 'Blueprint' en la variable '$table', que usamos para definir columnas y llaves.

            $table->id();
            // Define una columna incremental (auto-increment) de tipo BIGINT como llave primaria, con el nombre 'id'.

            $table->string('name');
            // Define una columna de tipo VARCHAR llamada 'name' para almacenar el nombre de la categoría (por ejemplo, "Alimentos").

            $table->enum('type', ['income','expense'])->default('expense');
            // Define una columna de tipo ENUM llamada 'type', cuyos valores pueden ser 'income' o 'expense'.
            // Por defecto, se asigna 'expense' si no se especifica ningún valor.

            $table->unsignedBigInteger('user_id')->nullable();
            // Define una columna entera sin signo (BIGINT) llamada 'user_id', que puede ser nula (nullable).
            // Esto se utilizará para vincular la categoría a un usuario específico en la tabla 'users'.

            $table->timestamps();
            // Crea automáticamente dos columnas: 'created_at' y 'updated_at',
            // las cuales registran cuándo se creó y se actualizó la fila.

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
            // Crea una llave foránea que vincula 'user_id' con la columna 'id' de la tabla 'users'.
            // 'onDelete(\'cascade\')' indica que si se elimina el usuario, se eliminarán sus categorías asociadas.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    // El método 'down()' se ejecuta cuando lanzamos 'php artisan migrate:rollback', revirtiendo los cambios hechos por 'up()'.
    {
        Schema::dropIfExists('categories');
        // Elimina la tabla 'categories' si existe en la base de datos, volviendo el esquema al estado anterior.
    }
};