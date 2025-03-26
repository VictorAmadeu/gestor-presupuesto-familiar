<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    /**
     * Tabla asociada, por convención 'transactions'.
     */
    protected $table = 'transactions';

    /**
     * Campos asignables en masa.
     */
    protected $fillable = [
        'amount',
        'description',
        'transaction_date',
        'category_id',
        'user_id'
    ];

    /**
     * Relación inversa con Category (cada transacción pertenece a una categoría).
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relación inversa con User (cada transacción pertenece a un usuario).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}