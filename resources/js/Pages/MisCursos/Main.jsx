import React, { useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function MisCursos({ auth, miscursos }) {
  useEffect(() => {
    console.log('Mis cursos raw:', miscursos);
    console.log('Usuario:', auth.user);
  }, [miscursos, auth.user]);

  const cursosDisponibles = useMemo(() => [
    { id: 1, titulo: 'SAP S/4 HANA', imagen: 'img/courses/1.png', duracionHoras: 120, instructor: 'María Pérez', progreso: '0%', descripcion: 'ERP empresarial de última generación.' },
    { id: 2, titulo: 'ITIL V4', imagen: 'img/courses/2.png', duracionHoras: 80, instructor: 'José Gómez', progreso: '0%', descripcion: 'Buenas prácticas para gestión de servicios de TI.' },
    { id: 3, titulo: 'Desarrollo Web Full Stack', imagen: 'img/courses/8.jpg', duracionHoras: 150, instructor: 'Ana Rodríguez', progreso: '0%', descripcion: 'Front‑end y back‑end con tecnologías demandadas.' }
  ], []);

  const misCursosDetalles = useMemo(
    () => miscursos.map(mc => cursosDisponibles.find(c => c.id === Number(mc.curso))).filter(Boolean),
    [miscursos, cursosDisponibles]
  );

  const duracionTotalHoras = useMemo(
    () => misCursosDetalles.reduce((sum, c) => sum + c.duracionHoras, 0),
    [misCursosDetalles]
  );

  return (
    <AuthenticatedLayout header={<h2 className="text-3xl font-bold text-gray-800">Mis Cursos</h2>}>
      <Head title="Mis Cursos" />

      <div className="py-8 px-4 max-w-4xl mx-auto space-y-12">
        {/* Banner profesional */}
        <div className="bg-white border-l-4 border-blue-700 p-6">
          <p className="text-gray-800 text-lg">
            ¡Hola, <span className="font-medium">{auth.user.nombres}</span>! Tienes <span className="font-medium">{misCursosDetalles.length}</span> {misCursosDetalles.length === 1 ? 'curso' : 'cursos'} con un total de <span className="font-medium">{duracionTotalHoras} horas</span> por completar.
          </p>
        </div>

        {/* Lista de tarjetas */}
        <div className="flex flex-col gap-8">
          {misCursosDetalles.map(curso => (
            <div key={curso.id} className="flex flex-col md:flex-row bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="md:w-1/3">
                <img src={curso.imagen} alt={curso.titulo} className="h-full w-full object-cover" />
              </div>
              <div className="md:w-2/3 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{curso.titulo}</h3>
                  <p className="text-gray-700 mb-4">{curso.descripcion}</p>
                  <ul className="text-gray-600 space-y-1">
                    <li><strong>Instructor:</strong> {curso.instructor}</li>
                    <li><strong>Duración:</strong> {curso.duracionHoras} horas</li>
                    <li><strong>Progreso:</strong> {curso.progreso}</li>
                  </ul>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    className="relative inline-block px-6 py-3 font-semibold text-white bg-blue-700 hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => console.log(`Iniciar curso ${curso.id}`)}
                  >
                    Iniciar curso
                  </button>
                </div>
              </div>
            </div>
          ))}

          {misCursosDetalles.length === 0 && (
            <p className="text-center text-gray-600">
              No tienes cursos. <a href="/cursos" className="text-blue-700 underline">Visita la tienda</a>.
            </p>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
