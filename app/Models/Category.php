<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    /**
     * La tabla asociada (opcional si sigue la convención 'categories').
     */
    protected $table = 'categories';

    /**
     * Campos que se pueden asignar masivamente.
     */
    protected $fillable = [
        'name',
        'type',
        'user_id'
    ];

    /**
     * Relación inversa con User (cada categoría pertenece a un usuario).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación con Transaction (una categoría puede tener muchas transacciones).
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}