<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historial extends Model
{
    use HasFactory;

    protected $table = 'historial'; // Nombre de la tabla

    protected $fillable = [
        'id_usuario',
        'estado',
        'enlinea',
        'num_ingresos',
        'fec_creacion',
        'fec_modificacion',
        'fec_eliminacion',
        'fec_ultimo_acceso',
        'creado_por',
        'modificado_por',
        'eliminado_por',
        'hora_creacion',
        'hora_modificacion',
        'hora_eliminacion',
        'hora_ultimo_acceso',
    ];
}