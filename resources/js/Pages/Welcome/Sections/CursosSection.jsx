import React from 'react';
import { Link } from '@inertiajs/react';

export default function CursosSection() {
    const cursos = [
        {
            id: 1,
            titulo: 'SAP S/4 HANA',
            descripcion: 'Aprende a utilizar el sistema ERP líder en el mercado empresarial.',
            imagen: 'img/courses/1.png',
            nivel: 'Intermedio',
            duracion: '10 semanas',
            estudiantes: 120,
            precio: 'S/. 1,500'
        },
        {
            id: 2,
            titulo: 'ITIL V4',
            descripcion: 'Gestión de servicios de TI con las mejores prácticas del mercado.',
            imagen: 'img/courses/2.png',
            nivel: 'Avanzado',
            duracion: '8 semanas',
            estudiantes: 85,
            precio: 'S/. 1,200'
        },
        {
            id: 3,
            titulo: 'Desarrollo Web Full Stack',
            descripcion: 'Domina las tecnologías front-end y back-end más demandadas.',
            imagen: 'img/courses/8.jpg',
            nivel: 'Todos los niveles',
            duracion: '12 semanas',
            estudiantes: 150,
            precio: 'S/. 1,800'
        }
    ];

    return (
        <section id="cursos" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">Nuestros Cursos</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Descubre nuestra selección de cursos diseñados para impulsar tu carrera profesional
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cursos.map((curso) => (
                        <div key={curso.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                            <div className="h-48 bg-gray-300 relative overflow-hidden">
                                <img 
                                    src={curso.imagen} 
                                    alt={curso.titulo} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = 'img/courses/8.jpg';
                                    }}
                                />
                                <div className="absolute top-4 right-4 bg-[#d82a4e] text-white text-sm font-bold py-1 px-3 rounded">
                                    {curso.precio}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{curso.titulo}</h3>
                                <p className="text-gray-600 mb-4">{curso.descripcion}</p>
                                <div className="flex justify-between text-sm text-gray-500 mb-4">
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {curso.duracion}
                                    </span>
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {curso.estudiantes} estudiantes
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        {curso.nivel}
                                    </span>
                                    <Link href={`/cursos/${curso.id}`} className="bg-[#0B60F7] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link 
                        href="/cursos" 
                        className="bg-[#0B60F7] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center"
                    >
                        Ver todos los cursos
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}