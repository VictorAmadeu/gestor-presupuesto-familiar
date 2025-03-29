<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    /**
     * Nombre de la tabla asociada (opcional si sigue la convención).
     */
    protected $table = 'categories';

    /**
     * Campos que pueden asignarse de forma masiva.
     */
    protected $fillable = [
        'name',
        'type',
        'user_id'
    ];

    /**
     * Relación inversa: cada categoría pertenece a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación directa: una categoría puede tener muchas transacciones.
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Método que se ejecuta automáticamente cuando se elimina una categoría.
     * Se encarga de eliminar todas las transacciones asociadas a esa categoría.
     */
    protected static function boot()
    {
        parent::boot();

        // Cuando se elimine una categoría, también se eliminarán sus transacciones relacionadas
        static::deleting(function ($category) {
            $category->transactions()->delete();
        });
    }
}