import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BarChart } from '@mui/x-charts';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth, contacto }) {
    const [cursos, setCursos] = useState([]);
    const [cursosFiltrados, setCursosFiltrados] = useState([]);
    const colores = [
        '#4caf50',
        '#2196f3',
        '#ff9800',
        '#e91e63',
        '#9c27b0',
        '#f44336',
        '#00bcd4',
        '#8bc34a',
        '#ffc107',
        '#3f51b5',
        '#795548',
        '#607d8b',
        '#ff5722',
        '#009688',
        '#cddc39',
    ];

    const nombresCursos = {
        scrum: 'Scrum Master',
        pm: 'Project Management',
        'excel-avanzado': 'Excel Avanzado',
        powerbi: 'Power BI',
        python: 'Python para análisis de datos',
        sql: 'SQL para bases de datos',
        cyberseguridad: 'Fundamentos de Ciberseguridad',
        redes: 'Redes Cisco CCNA',
        aws: 'AWS Cloud Practitioner',
        azure: 'Microsoft Azure Fundamentals',
        java: 'Programación en Java',
        'html-css-js': 'Desarrollo Web (HTML, CSS, JS)',
        react: 'React.js Básico',
        devops: 'DevOps Fundamentals',
        office: 'Microsoft Office (Word, Excel, PowerPoint)',
        sap: 'Gestión Empresarial con SAP',
    };
    useEffect(() => {
        console.log(auth.user);
        const conteoCursos = contacto.reduce((acc, item) => {
            const nombreCurso = nombresCursos[item.curso] || item.curso;
            acc[nombreCurso] = (acc[nombreCurso] || 0) + 1;
            return acc;
        }, {});
        setCursos(conteoCursos);
        setCursosFiltrados(contacto);
    }, [contacto]);

    useEffect(() => {}, [cursosFiltrados]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {auth.user.permisos == 'Administrador' ? (
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 font-bold text-gray-900">
                                Cantidad de Solicitudes
                            </div>
                            <div>
                                <BarChart
                                    xAxis={[
                                        {
                                            data: Object.keys(cursos),
                                        },
                                    ]}
                                    series={[
                                        {
                                            data: Object.values(cursos),
                                        },
                                    ]}
                                    height={300}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between overflow-hidden bg-white p-4 shadow-sm sm:rounded-lg">
                            <p className="text-lg font-bold">
                                Solicitudes de Contacto
                            </p>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                                <input
                                    type="text"
                                    className="rounded-lg p-2 pl-10"
                                    placeholder="Filtrar por curso"
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        setCursosFiltrados(
                                            contacto.filter((contacto) =>
                                                nombresCursos[contacto.curso]
                                                    .toLowerCase()
                                                    .includes(
                                                        valor.toLowerCase(),
                                                    ),
                                            ),
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-2 border-slate-300">
                                        <th>Curso</th>
                                        <th>Nombre</th>
                                        <th className="hidden sm:table-cell">
                                            Email
                                        </th>
                                        <th>Celular</th>
                                        <th>Fecha de Solicitud</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cursosFiltrados.map(
                                        (cursosFiltrados, index) => (
                                            <tr
                                                className="border-2 border-slate-300 text-center"
                                                key={index}
                                            >
                                                <td className="py-2">
                                                    {nombresCursos[
                                                        cursosFiltrados.curso
                                                    ] || cursosFiltrados.curso}
                                                </td>
                                                <td>{cursosFiltrados.name}</td>
                                                <td className="hidden sm:table-cell">
                                                    {cursosFiltrados.email}
                                                </td>
                                                <td>{cursosFiltrados.phone}</td>
                                                <td>
                                                    {
                                                        /*formatear fecha */
                                                        new Date(
                                                            cursosFiltrados.created_at,
                                                        ).toLocaleDateString()
                                                    }
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 font-bold text-gray-900">
                                Bienvenido!
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
