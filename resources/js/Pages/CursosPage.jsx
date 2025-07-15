import WelcomeLayout from '@/Layouts/WelcomeLayout';
import { Head, router } from '@inertiajs/react';
import {
    CheckCheckIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    ShoppingBasket,
    Star,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Importar Swiper y sus módulos
import {
    Autoplay,
    EffectCoverflow,
    Navigation,
    Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CursoAutocomplete from '@/Components/CursoAutocomplete';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    miscursos,
}) {
    const [compras, setCompras] = useState([]);
    const [cursosFiltrados, setCursosFiltrados] = useState([]);

    useEffect(() => {
        localStorage.setItem('compras', JSON.stringify(compras));
        window.dispatchEvent(new Event('local-storage-compras'));
    }, [compras]);

    const cursos = [
        {
            id: 1,
            titulo: 'SAP S/4 HANA',
            descripcion:
                'Aprende a utilizar el sistema ERP líder en el mercado empresarial.',
            imagen: 'img/courses/1.png',
            nivel: 'Intermedio',
            duracion: '10 semanas',
            estudiantes: 120,
            precio: 'S/. 1,500',
            rating: 4.8,
            categoria: 'ERP',
            color: 'from-blue-500 to-purple-600',
        },
        {
            id: 2,
            titulo: 'ITIL V4',
            descripcion:
                'Gestión de servicios de TI con las mejores prácticas del mercado.',
            imagen: 'img/courses/2.png',
            nivel: 'Avanzado',
            duracion: '8 semanas',
            estudiantes: 85,
            precio: 'S/. 1,200',
            rating: 4.9,
            categoria: 'Gestión TI',
            color: 'from-green-500 to-teal-600',
        },
        {
            id: 3,
            titulo: 'Desarrollo Web Full Stack',
            descripcion:
                'Domina las tecnologías front-end y back-end más demandadas.',
            imagen: 'img/courses/8.jpg',
            nivel: 'Todos los niveles',
            duracion: '12 semanas',
            estudiantes: 150,
            precio: 'S/. 1,800',
            rating: 4.7,
            categoria: 'Desarrollo',
            color: 'from-orange-500 to-red-600',
        },
        {
            id: 4,
            titulo: 'SAP S/4HANA SD',
            descripcion:
                'Gestiona las ventas y los procesos de distribución de la organización',
            imagen: 'img/courses/3.png',
            nivel: 'Principiante',
            duracion: '6 semanas',
            estudiantes: 200,
            precio: 'S/. 1,600',
            rating: 4.6,
            categoria: 'ERP',
            color: 'from-indigo-500 to-blue-600',
        },
        {
            id: 5,
            titulo: 'Python Expert',
            descripcion: 'Aprende a programar con Python desde cero',
            imagen: 'img/courses/5.png',
            nivel: 'Avanzado',
            duracion: '6 semanas',
            estudiantes: 56,
            precio: 'S/. 300',
            rating: 4.8,
            categoria: 'Programación',
            color: 'from-yellow-500 to-orange-600',
        },
        {
            id: 6,
            titulo: 'Business One Funcional',
            descripcion: 'Aprende a utilizar software del mercado empresarial.',
            imagen: 'img/courses/6.png',
            nivel: 'Intermedio',
            duracion: '6 semanas',
            estudiantes: 102,
            precio: 'S/. 800',
            rating: 4.5,
            categoria: 'Business',
            color: 'from-pink-500 to-rose-600',
        },
        {
            id: 7,
            titulo: 'BIG DATA',
            descripcion: 'Vuélvete un experto en el manejo de datos masivos',
            imagen: 'img/courses/7.png',
            nivel: 'Intermedio',
            duracion: '8 semanas',
            estudiantes: 460,
            precio: 'S/. 110',
            rating: 4.7,
            categoria: 'Data Science',
            color: 'from-cyan-500 to-blue-600',
        },
        {
            id: 8,
            titulo: 'Control de Costos Nivel Consultor',
            descripcion: 'Aprende a controlar los costos de tu empresa',
            imagen: 'img/courses/9.png',
            nivel: 'Intermedio',
            duracion: '4 semanas',
            estudiantes: 250,
            precio: 'S/. 600',
            rating: 4.4,
            categoria: 'Finanzas',
            color: 'from-emerald-500 to-green-600',
        },
        {
            id: 9,
            titulo: 'SQL Server 2019 Expert',
            descripcion: 'Aprende a manejar bases de datos con SQL Server',
            imagen: 'img/courses/10.png',
            nivel: 'Avanzado',
            duracion: '8 semanas',
            estudiantes: 78,
            precio: 'S/. 300',
            rating: 4.6,
            categoria: 'Bases de Datos',
            color: 'from-violet-500 to-purple-600',
        },
        {
            id: 10,
            titulo: 'Power BI Expert',
            descripcion: 'Aprende a crear informes y dashboards interactivos',
            imagen: 'img/courses/11.png',
            nivel: 'Avanzado',
            duracion: '8 semanas',
            estudiantes: 81,
            precio: 'S/. 300',
            rating: 4.8,
            categoria: 'BI',
            color: 'from-amber-500 to-yellow-600',
        },
    ];

    useEffect(() => {
        const data = localStorage.getItem('compras');
        if (data) {
            setCompras(JSON.parse(data));
        }
        setCursosFiltrados(cursos);
    }, []);

    const addCarrito = (index) => {
        if (auth.user) {
            const set = new Set(compras);
            set.add(cursosFiltrados[index]);
            setCompras([...set]);
        } else {
            router.visit('/login');
        }
    };

    const getNivelColor = (nivel) => {
        switch (nivel.toLowerCase()) {
            case 'principiante':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'intermedio':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'avanzado':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    return (
        <>
            <Head title="Bienvenido" />
            <WelcomeLayout
                auth={auth}
                laravelVersion={laravelVersion}
                phpVersion={phpVersion}
            >
                {(setMostrarFormulario) => (
                    <>
                        <section
                            id="section"
                            className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-16"
                        >
                            <div className="mx-auto max-w-7xl">
                                {/* Header Section */}
                                <div className="mb-6 text-center">
                                    <div className="animate-float mb-4 inline-block rounded-full bg-blue-100 p-2">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                                            <svg
                                                className="h-8 w-8 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
                                        Nuestros Cursos
                                    </h1>
                                    <p className="mx-auto max-w-2xl text-xl text-gray-600">
                                        Descubre una amplia variedad de cursos
                                        diseñados para impulsar tu carrera
                                        profesional
                                    </p>
                                </div>
                                <CursoAutocomplete
                                    cursos={cursos}
                                    cursosFiltrados={cursosFiltrados}
                                    setCursosFiltrados={setCursosFiltrados}
                                />

                                <div className="relative">
                                    <Swiper
                                        modules={[
                                            Navigation,
                                            Pagination,
                                            Autoplay,
                                            EffectCoverflow,
                                        ]}
                                        spaceBetween={30}
                                        slidesPerView={1}
                                        centeredSlides={true}
                                        loop={true}
                                        autoplay={{
                                            delay: 4000,
                                            disableOnInteraction: false,
                                        }}
                                        effect="coverflow"
                                        coverflowEffect={{
                                            rotate: 50,
                                            stretch: 0,
                                            depth: 100,
                                            modifier: 1,
                                            slideShadows: true,
                                        }}
                                        navigation={{
                                            nextEl: '.swiper-button-next-custom',
                                            prevEl: '.swiper-button-prev-custom',
                                        }}
                                        pagination={{
                                            clickable: true,
                                            dynamicBullets: true,
                                        }}
                                        breakpoints={{
                                            640: {
                                                slidesPerView: 1,
                                                spaceBetween: 20,
                                            },
                                            768: {
                                                slidesPerView: 2,
                                                spaceBetween: 25,
                                            },
                                            1024: {
                                                slidesPerView: 3,
                                                spaceBetween: 30,
                                            },
                                            1280: {
                                                slidesPerView: 3,
                                                spaceBetween: 35,
                                            },
                                        }}
                                        className="pb-16"
                                    >
                                        {cursosFiltrados.map((curso, index) => (
                                            <SwiperSlide key={curso.id}>
                                                <div className="course-card h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                                                    <div className="relative h-56 overflow-hidden">
                                                        <div
                                                            className={`absolute inset-0 bg-gradient-to-r ${curso.color} opacity-10`}
                                                        ></div>
                                                        <img
                                                            src={curso.imagen}
                                                            alt={curso.titulo}
                                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                                            onError={(e) => {
                                                                e.target.src =
                                                                    'img/courses/8.jpg';
                                                            }}
                                                        />

                                                        <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 shadow-lg backdrop-blur-sm">
                                                            <span className="text-lg font-bold text-gray-800">
                                                                {curso.precio}
                                                            </span>
                                                        </div>

                                                        <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
                                                            <span className="text-sm font-medium text-white">
                                                                {
                                                                    curso.categoria
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex h-full flex-col p-6">
                                                        <div className="mb-3 flex items-start justify-between">
                                                            <h3 className="mr-2 line-clamp-2 flex-1 text-xl font-bold text-gray-800">
                                                                {curso.titulo}
                                                            </h3>
                                                            <div className="flex items-center rounded-full bg-yellow-50 px-2 py-1">
                                                                <Star className="h-4 w-4 fill-current text-yellow-500" />
                                                                <span className="ml-1 text-sm font-medium text-yellow-700">
                                                                    {
                                                                        curso.rating
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <p className="mb-4 line-clamp-3 flex-1 text-gray-600">
                                                            {curso.descripcion}
                                                        </p>

                                                        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                                                            <div className="flex items-center">
                                                                <Clock className="mr-1 h-4 w-4" />
                                                                <span>
                                                                    {
                                                                        curso.duracion
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Users className="mr-1 h-4 w-4" />
                                                                <span>
                                                                    {
                                                                        curso.estudiantes
                                                                    }{' '}
                                                                    estudiantes
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="mb-4">
                                                            <span
                                                                className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${getNivelColor(curso.nivel)}`}
                                                            >
                                                                {curso.nivel}
                                                            </span>
                                                        </div>

                                                        <div className="mt-auto flex items-center justify-between gap-3">
                                                            {!miscursos.some(
                                                                (m) =>
                                                                    m.id ==
                                                                    curso.id,
                                                            ) ? (
                                                                <>
                                                                    {!compras.some(
                                                                        (c) =>
                                                                            c.id ==
                                                                            curso.id,
                                                                    ) ? (
                                                                        <button
                                                                            onClick={() =>
                                                                                addCarrito(
                                                                                    index,
                                                                                )
                                                                            }
                                                                            className="flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600 hover:shadow-lg"
                                                                        >
                                                                            <ShoppingBasket className="h-4 w-4" />
                                                                            <span className="text-sm">
                                                                                Agregar
                                                                            </span>
                                                                        </button>
                                                                    ) : (
                                                                        <button className="flex cursor-default items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2 font-medium text-white">
                                                                            <ShoppingBasket className="h-4 w-4" />
                                                                            <span className="text-sm">
                                                                                Agregado
                                                                            </span>
                                                                        </button>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <button className="flex cursor-default items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 font-medium text-white">
                                                                    <CheckCheckIcon className="h-4 w-4" />
                                                                    <span className="text-sm">
                                                                        Comprado
                                                                    </span>
                                                                </button>
                                                            )}

                                                            <a
                                                                href={`/cursos/${curso.id}`}
                                                                className="flex-1 transform rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-center font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
                                                            >
                                                                Ver Detalles
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    <div className="swiper-button-prev-custom group absolute left-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:shadow-xl">
                                        <ChevronLeft className="h-6 w-6 text-blue-600 transition-colors group-hover:text-white" />
                                    </div>
                                    <div className="swiper-button-next-custom group absolute right-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:shadow-xl">
                                        <ChevronRight className="h-6 w-6 text-blue-600 transition-colors group-hover:text-white" />
                                    </div>
                                </div>

                                <div className="mt-16 text-center">
                                    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
                                        <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                            <div className="mb-2 text-3xl font-bold text-blue-600">
                                                {cursos.length}
                                            </div>
                                            <div className="text-gray-600">
                                                Cursos Disponibles
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                            <div className="mb-2 text-3xl font-bold text-green-600">
                                                {cursos.reduce(
                                                    (acc, curso) =>
                                                        acc + curso.estudiantes,
                                                    0,
                                                )}
                                            </div>
                                            <div className="text-gray-600">
                                                Estudiantes
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                            <div className="mb-2 text-3xl font-bold text-purple-600">
                                                4.7
                                            </div>
                                            <div className="text-gray-600">
                                                Rating Promedio
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                            <div className="mb-2 text-3xl font-bold text-orange-600">
                                                24/7
                                            </div>
                                            <div className="text-gray-600">
                                                Soporte
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </WelcomeLayout>
        </>
    );
}
