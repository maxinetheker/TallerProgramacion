import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';

export default function MisCursos({ auth, miscursos }) {
    useEffect(() => {
        console.log('Mis cursos raw:', miscursos);
        console.log('Usuario:', auth.user);
    }, [miscursos, auth.user]);

    const cursosDisponibles = useMemo(
        () => [
            {
                id: 1,
                titulo: 'SAP S/4 HANA',
                imagen: 'img/courses/1.png',
                duracionHoras: 120,
                instructor: 'María Pérez',
                progreso: '0%',
                descripcion: 'ERP empresarial de última generación.',
            },
            {
                id: 2,
                titulo: 'ITIL V4',
                imagen: 'img/courses/2.png',
                duracionHoras: 80,
                instructor: 'José Gómez',
                progreso: '0%',
                descripcion:
                    'Buenas prácticas para gestión de servicios de TI.',
            },
            {
                id: 3,
                titulo: 'Desarrollo Web Full Stack',
                imagen: 'img/courses/8.jpg',
                duracionHoras: 150,
                instructor: 'Ana Rodríguez',
                progreso: '0%',
                descripcion: 'Front‑end y back‑end con tecnologías demandadas.',
            },
            {
                id: 4,
                titulo: 'SAP S/4HANA SD',
                imagen: 'img/courses/3.png',
                duracionHoras: 90,
                instructor: 'Luis Fernández',
                progreso: '0%',
                descripcion: 'Gestión de ventas y distribución en SAP SD.',
            },
            {
                id: 5,
                titulo: 'Python Expert',
                imagen: 'img/courses/5.png',
                duracionHoras: 60,
                instructor: 'Carmen Torres',
                progreso: '0%',
                descripcion:
                    'Programación avanzada en Python para automatización.',
            },
            {
                id: 6,
                titulo: 'Business One Funcional',
                imagen: 'img/courses/6.png',
                duracionHoras: 60,
                instructor: 'Raúl Díaz',
                progreso: '0%',
                descripcion: 'Uso funcional de SAP Business One para pymes.',
            },
            {
                id: 7,
                titulo: 'BIG DATA',
                imagen: 'img/courses/7.png',
                duracionHoras: 80,
                instructor: 'Sandra Gómez',
                progreso: '0%',
                descripcion:
                    'Procesamiento y análisis de grandes volúmenes de datos.',
            },
            {
                id: 8,
                titulo: 'Control de Costos Nivel Consultor',
                imagen: 'img/courses/9.png',
                duracionHoras: 40,
                instructor: 'Eduardo Martínez',
                progreso: '0%',
                descripcion:
                    'Herramientas y técnicas para control de costos empresariales.',
            },
            {
                id: 9,
                titulo: 'SQL Server 2019 Expert',
                imagen: 'img/courses/10.png',
                duracionHoras: 80,
                instructor: 'Patricia Ruiz',
                progreso: '0%',
                descripcion:
                    'Administración y optimización de bases de datos SQL Server.',
            },
            {
                id: 10,
                titulo: 'Power BI Expert',
                imagen: 'img/courses/11.png',
                duracionHoras: 80,
                instructor: 'Diego Castillo',
                progreso: '0%',
                descripcion:
                    'Creación de dashboards e informes interactivos con Power BI.',
            },
        ],
        [],
    );

    const misCursosDetalles = useMemo(
        () =>
            miscursos
                .map((mc) =>
                    cursosDisponibles.find((c) => c.id === Number(mc.curso)),
                )
                .filter(Boolean),
        [miscursos, cursosDisponibles],
    );

    const duracionTotalHoras = useMemo(
        () => misCursosDetalles.reduce((sum, c) => sum + c.duracionHoras, 0),
        [misCursosDetalles],
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-bold text-gray-800">Mis Cursos</h2>
            }
        >
            <Head title="Mis Cursos" />

            <div className="mx-auto max-w-4xl space-y-12 px-4 py-8">
                {/* Banner profesional */}
                <div className="border-l-4 border-blue-700 bg-white p-6">
                    <p className="text-lg text-gray-800">
                        ¡Hola,{' '}
                        <span className="font-medium">{auth.user.nombres}</span>
                        ! Tienes{' '}
                        <span className="font-medium">
                            {misCursosDetalles.length}
                        </span>{' '}
                        {misCursosDetalles.length === 1 ? 'curso' : 'cursos'}{' '}
                        con un total de{' '}
                        <span className="font-medium">
                            {duracionTotalHoras} horas
                        </span>{' '}
                        por completar.
                    </p>
                </div>

                {/* Lista de tarjetas */}
                <div className="flex flex-col gap-8">
                    {misCursosDetalles.map((curso) => (
                        <div
                            key={curso.id}
                            className="flex flex-col overflow-hidden border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md md:flex-row"
                        >
                            <div className="md:w-1/3">
                                <img
                                    src={curso.imagen}
                                    alt={curso.titulo}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-between p-6 md:w-2/3">
                                <div>
                                    <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                                        {curso.titulo}
                                    </h3>
                                    <p className="mb-4 text-gray-700">
                                        {curso.descripcion}
                                    </p>
                                    <ul className="space-y-1 text-gray-600">
                                        <li>
                                            <strong>Instructor:</strong>{' '}
                                            {curso.instructor}
                                        </li>
                                        <li>
                                            <strong>Duración:</strong>{' '}
                                            {curso.duracionHoras} horas
                                        </li>
                                        <li>
                                            <strong>Progreso:</strong>{' '}
                                            {curso.progreso}
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        className="relative inline-block bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onClick={() =>
                                            console.log(
                                                `Iniciar curso ${curso.id}`,
                                            )
                                        }
                                    >
                                        Iniciar curso
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {misCursosDetalles.length === 0 && (
                        <p className="text-center text-gray-600">
                            No tienes cursos.{' '}
                            <a
                                href="/cursos"
                                className="text-blue-700 underline"
                            >
                                Visita la tienda
                            </a>
                            .
                        </p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
