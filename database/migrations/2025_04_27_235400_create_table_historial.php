<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('historial', function (Blueprint $table) {
            $table->id(); // id autoincremental primario
            $table->integer('id_usuario'); // id del usuario
            $table->string('estado')->default('1');   // Activo / Desactivo / Eliminado / Bloqueado
            $table->boolean('enlinea')->default(0); // 1 en sesión, 0 fuera
            $table->integer('num_ingresos')->default(0); // Cantidad de ingresos
            $table->date('fec_creacion')->nullable();
            $table->date('fec_modificacion')->nullable();
            $table->date('fec_eliminacion')->nullable();
            $table->date('fec_ultimo_acceso')->nullable();
            $table->string('creado_por')->nullable();
            $table->string('modificado_por')->nullable();
            $table->string('eliminado_por')->nullable();
            $table->time('hora_creacion')->nullable();
            $table->time('hora_modificacion')->nullable();
            $table->time('hora_eliminacion')->nullable();
            $table->time('hora_ultimo_acceso')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial');
    }
};
