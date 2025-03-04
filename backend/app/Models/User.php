<?php // Indica que este archivo contiene código PHP

namespace App\Models; // Define el espacio de nombres (namespace) para la clase User

use Illuminate\Database\Eloquent\Factories\HasFactory; // Importa la trait HasFactory para crear factories de Eloquent
use Illuminate\Foundation\Auth\User as Authenticatable; // Importa la clase base Authenticatable para la autenticación
use Illuminate\Notifications\Notifiable;               // Importa la trait Notifiable para manejar notificaciones

use App\Models\Category;     // Importa el modelo Category (asegúrate de que exista en app/Models/Category.php)
use App\Models\Transaction;  // Importa el modelo Transaction (asegúrate de que exista en app/Models/Transaction.php)

/**
 * Clase User que representa la tabla 'users' en la base de datos.
 * Se extiende de Authenticatable para utilizar las funcionalidades de autenticación.
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable; // Se incluyen las traits HasFactory y Notifiable en la clase

    /**
     * @var string $table 
     * Nombre de la tabla en la base de datos asociada a este modelo.
     * Aunque por convención ya es 'users', lo definimos explícitamente.
     */
    protected $table = 'users';

    /**
     * @var array<int, string> $fillable
     * Campos que se pueden asignar de forma masiva (mass assignment).
     * Estos campos pueden rellenarse directamente con métodos como create() o fill().
     */
    protected $fillable = [
        'name',       // Campo para el nombre del usuario
        'email',      // Campo para el correo electrónico del usuario
        'password',   // Campo para la contraseña (se guarda encriptada)
        'role'        // Campo para el rol del usuario (ejemplo: 'admin' o 'member')
    ];

    /**
     * Relación con el modelo Category.
     * Un usuario puede tener muchas categorías (hasMany).
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function categories()
    {
        // Retorna todas las categorías asociadas a este usuario
        return $this->hasMany(Category::class);
    }

    /**
     * Relación con el modelo Transaction.
     * Un usuario puede tener muchas transacciones (hasMany).
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transactions()
    {
        // Retorna todas las transacciones asociadas a este usuario
        return $this->hasMany(Transaction::class);
    }

    /**
     * @var array<int, string> $hidden
     * Atributos que se deben ocultar al serializar este modelo (por ejemplo, en JSON).
     */
    protected $hidden = [
        'password',        // Se oculta la contraseña para no exponerla en las respuestas
        'remember_token',  // Se oculta el token de "remember me" de Laravel
    ];

    /**
     * @var array<string, string> $casts
     * Define la transformación (casting) de atributos al leer o escribir en la base de datos.
     */
    protected $casts = [
        'email_verified_at' => 'datetime', // Convierte el campo email_verified_at en un objeto de tipo DateTime
        'password'          => 'hashed',   // Aplica hashing automático al campo "password" (Laravel 10+)
    ];
}