import ApplicationLogo from '@/Components/ApplicationLogo';
import ModalFormulario from '@/Components/ModalFormulario';
import { Button, Transition } from '@headlessui/react';
import { Head, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [compras, setCompras] = useState(0);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const modalRef = useRef(null);
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Bienvenido" />
            <div className="bg-[#2D49D4] text-white">
                <div className="mx-auto flex w-full max-w-2xl justify-between text-sm lg:max-w-7xl">
                    <ul className="max-xl flex gap-4 px-6">
                        <li className="inline">
                            <Link href={'#soporte'}>SOPORTE</Link>
                        </li>
                        <li className="inline">
                            <Link href={'#cronograma'}>CRONOGRAMA</Link>
                        </li>
                        <li className="inline">
                            <Link href={'#validar'}>VALIDA TU CERTIFICADO</Link>
                        </li>
                    </ul>
                    <Link
                        className="hidden gap-2 sm:flex"
                        href={'informes@nextch.pe'}
                    >
                        <img src="img/mail.png" className="w-5" alt="" />
                        informes@nextch.pe
                    </Link>
                </div>
            </div>
            <div className="relative max-h-[100vh] overflow-hidden bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute top-0 h-[100vh] w-[100vw] max-w-[100vw] object-cover"
                    src="img/sliderfirst.webp"
                />
                <div className="relative flex min-h-screen flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex flex-row items-center justify-center gap-2 py-10 lg:grid-cols-3">
                            <Link href={route('home')}>
                                <ApplicationLogo
                                    className={'w-40'}
                                ></ApplicationLogo>
                            </Link>
                            <nav className="-mx-3 flex flex-1 items-center justify-end gap-6">
                                <Link
                                    className="text-[#727070] hover:text-white"
                                    href="#"
                                >
                                    CURSOS
                                </Link>
                                <Link
                                    className="text-[#727070] hover:text-white"
                                    href="#"
                                >
                                    NOSOTROS
                                </Link>
                                <Link
                                    className="text-[#727070] hover:text-white"
                                    href="#"
                                >
                                    BLOG
                                </Link>
                                <Link className="text-[#727070] hover:text-white">
                                    CONTACTO
                                </Link>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Inicio
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-2xl bg-[#0B60F7] px-3 py-2 uppercase text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                        |
                                        <Link className="relative hover:scale-110">
                                            <div className="bg-red absolute inset-0 -translate-y-4 translate-x-3 rounded-full bg-red-500 text-center">
                                                {compras}
                                            </div>
                                            <img
                                                src="img/shop.png"
                                                className="h-6 hover:brightness-200"
                                                alt=""
                                            />
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6 flex h-[50vh] flex-col items-start justify-center gap-8 text-neutral-900">
                            <h1 className="w-[600px] text-4xl font-extrabold 2xl:text-5xl">
                                IMPULSA TU CARRERA CON NOSOTROS
                            </h1>
                            <p className="w-80 text-neutral-500">
                                Aprende de expertos, certifica tus conocimientos
                                y destaca en el mundo laboral con NEXTECH.
                            </p>
                            <Button
                                className={`rounded-xl bg-[#0B60F7] p-3 py-2 text-white hover:scale-110 hover:brightness-110`}
                                onClick={() => setMostrarFormulario(true)}
                            >
                                Deseo Información
                            </Button>
                        </main>

                            <ModalFormulario ref={modalRef} mostrarFormulario={mostrarFormulario} ></ModalFormulario>
                       
                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            {/*                Laravel v{laravelVersion} (PHP v{phpVersion}) */}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
