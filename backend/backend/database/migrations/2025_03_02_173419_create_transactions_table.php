<?php // Apertura del código PHP para que el servidor interprete este archivo como un script de PHP

use Illuminate\Database\Migrations\Migration; // Importamos la clase 'Migration' de Laravel
use Illuminate\Database\Schema\Blueprint;     // Importamos la clase 'Blueprint' para definir columnas y propiedades de la tabla
use Illuminate\Support\Facades\Schema;       // Importamos 'Schema' para crear y manipular tablas en la base de datos

return new class extends Migration // Retornamos una clase anónima que hereda de 'Migration' y define nuestras migraciones
{
    public function up(): void // Declaramos el método 'up' que se ejecuta al aplicar la migración
    {
        Schema::create('transactions', function (Blueprint $table) { // Llamamos a 'Schema::create' para crear la tabla 'transactions'
            $table->id(); // Crea una columna 'id' autoincremental y primaria
            $table->decimal('amount', 10, 2); // Crea la columna 'amount' de tipo decimal con 10 dígitos y 2 decimales
            $table->text('description')->nullable(); // Crea la columna 'description' de tipo texto y la define como opcional (nullable)
            $table->date('transaction_date'); // Crea la columna 'transaction_date' de tipo fecha para almacenar la fecha de la transacción
            $table->unsignedBigInteger('category_id'); // Crea la columna 'category_id' de tipo entero sin signo para relacionar con 'categories'
            $table->unsignedBigInteger('user_id')->nullable();
            $table->timestamps(); // Crea las columnas 'created_at' y 'updated_at' para llevar registro de creación y actualización

            $table->foreign('category_id') // Declaramos la clave foránea 'category_id'
                  ->references('id') // que hace referencia a la columna 'id'
                  ->on('categories') // de la tabla 'categories'
                  ->onDelete('cascade'); // si se elimina un registro en 'categories', se eliminan también sus transacciones

            $table->foreign('user_id') // Declaramos la clave foránea 'user_id'
                  ->references('id') // que hace referencia a la columna 'id'
                  ->on('users') // de la tabla 'users'
                  ->onDelete('cascade'); // si se elimina un usuario, se eliminan también sus transacciones
        });
    }

    public function down(): void // Declaramos el método 'down' que se ejecuta al revertir la migración
    {
        Schema::dropIfExists('transactions'); // Elimina la tabla 'transactions' si existe, revirtiendo los cambios
    }
};