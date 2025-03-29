<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    /**
     * Nombre de la tabla asociada (por convención 'transactions').
     */
    protected $table = 'transactions';

    /**
     * Campos que se pueden asignar en masa.
     */
    protected $fillable = [
        'amount',
        'description',
        'transaction_date',
        'category_id',
        'user_id'
    ];

    /**
     * Relación inversa: cada transacción pertenece a una categoría.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relación inversa: cada transacción pertenece a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}