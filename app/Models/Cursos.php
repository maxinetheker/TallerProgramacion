<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cursos extends Model
{
    //
    use HasFactory;
    protected $table = 'table_cursos';
    protected $fillable = [
        'id',
        'id_users',
        'curso',
    ];
}
