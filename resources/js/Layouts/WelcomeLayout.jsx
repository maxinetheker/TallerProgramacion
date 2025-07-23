import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';
import FirstMenu from '@/Pages/Welcome/FirstSection/FirstMenu';
import MenuLateral from '@/Pages/Welcome/MenuLateral';
import ModalFormulario from '@/Pages/Welcome/ModalFormulario';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
//Swiper

// Import Swiper styles
import HeaderFixed from '@/Pages/Welcome/FirstSection/HeaderFixed';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function WelcomeLayout({
    auth,
    laravelVersion,
    phpVersion,
    children,
}) {
    const [compras, setCompras] = useState(0);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const modalRef = useRef(null);
    const headerFirstRef = useRef(null);
    const [menu, setMenu] = useState(false);

    const [carro, setCarro] = useState([]);
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

    const page = usePage();

    // Al montar o cambiar de página, verifica si hay hash y scrollea
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const el = document.getElementById(hash.replace('#', ''));
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            }
        }
    }, [page.url]);

    useEffect(() => {
        const PrimeraVez = () => {
            const comprasObtenidas = JSON.parse(
                localStorage.getItem('compras'),
            );
            setCarro(comprasObtenidas);
        };
        PrimeraVez();
        const handleStorage = (event) => {
            const comprasObtenidas = JSON.parse(event.newValue);
            setCarro(comprasObtenidas);
        };

        const handleCustomEvent = () => {
            const comprasObtenidas = JSON.parse(
                localStorage.getItem('compras'),
            );
            setCarro(comprasObtenidas);
        };

        window.addEventListener('storage', handleStorage);
        window.addEventListener('local-storage-compras', handleCustomEvent);

        if (mostrarFormulario) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener('storage', handleStorage);
        };
    }, [mostrarFormulario]);

    const ProcederCompra = (cantidad) => {
        if (cantidad > 0) {
            router.get(route('pasarela') + '#PasarelaPrincipal');
        }
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
            <div className="relative overflow-hidden bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    onError={handleImageError}
                    id="background"
                    className="absolute top-0 h-[100vh] w-[200vw] max-w-[200vw] -translate-x-[35%] sm:w-[100vw] sm:max-w-[100vw] sm:-translate-x-0 sm:object-cover"
                    src="img/sliderfirst.webp"
                />
                <section
                    ref={headerFirstRef}
                    className="relative flex h-screen min-h-screen flex-col items-center selection:bg-[#FF2D20] selection:text-white"
                >
                    <div className="relative w-full max-w-2xl sm:px-6 lg:max-w-7xl">
                        <header className="flex h-6 w-screen flex-row items-center justify-center gap-2 bg-white py-10 pl-6 sm:w-full sm:bg-transparent lg:grid-cols-3">
                            <Link href={route('home')}>
                                <ApplicationLogo
                                    className={'w-40'}
                                ></ApplicationLogo>
                            </Link>
                            <nav className="-mx-3 flex flex-1 items-center justify-evenly gap-6 sm:justify-end">
                                <a
                                    className="underline-hover hidden text-[#727070] hover:text-white sm:inline"
                                    href={
                                        route().current('home')
                                            ? '#cursos'
                                            : route('home') + '#cursos'
                                    }
                                >
                                    CURSOS
                                </a>
                                <a
                                    className="underline-hover hidden text-[#727070] hover:text-white sm:inline"
                                    href={
                                        route().current('home')
                                            ? '#nosotros'
                                            : route('home') + '#nosotros'
                                    }
                                >
                                    NOSOTROS
                                </a>

                                <a
                                    className="underline-hover hidden text-[#727070] hover:text-white sm:inline"
                                    href={
                                        route().current('home')
                                            ? '#blog'
                                            : route('home') + '#blog'
                                    }
                                >
                                    BLOG
                                </a>

                                <a
                                    className="underline-hover hidden text-[#727070] hover:text-white sm:inline"
                                    href={
                                        route().current('home')
                                            ? '#contacto'
                                            : route('home') + '#contacto'
                                    }
                                >
                                    CONTACTO
                                </a>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="underline-hover hidden rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] sm:inline dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        DASHBOARD
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="hidden text-white rounded-2xl bg-[#0B60F7] px-3 py-2 text-sm uppercase text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] sm:inline dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                    </>
                                )}
                                {!route().current('pasarela') && (
                                    <>
                                        <span className="hidden sm:inline">
                                            |
                                        </span>

                                        <div
                                            className="relative box-content cursor-pointer hover:scale-110"
                                            onClick={() => {
                                                ProcederCompra(
                                                    carro?.length || 0,
                                                );
                                            }}
                                        >
                                            <div className="bg-red absolute inset-0 -translate-y-4 translate-x-3 rounded-full bg-red-500 text-center">
                                                {carro?.length || 0}
                                            </div>
                                            <img
                                                src="img/shop.png"
                                                className="hidden h-6 max-w-[30px] hover:brightness-200 sm:inline"
                                                alt=""
                                            />
                                            <img
                                                src="img/shop-black.png"
                                                className="inline h-6 max-w-[30px] hover:brightness-200 sm:hidden"
                                                alt=""
                                            />
                                        </div>
                                    </>
                                )}
                                <span
                                    className="relative box-content hover:scale-110"
                                    href=""
                                    onClick={() => setMenu(true)}
                                >
                                    <img
                                        src="img/menu.png"
                                        className="inline h-8 hover:brightness-200 sm:hidden"
                                        alt=""
                                    />
                                </span>
                            </nav>
                        </header>
                        <HeaderFixed
                            auth={auth}
                            setMenu={setMenu}
                            compras={carro?.length || 0}
                            setMostrarFormulario={setMostrarFormulario}
                            ProcederCompra={ProcederCompra}
                            headerFirstRef={headerFirstRef.current ?? ''}
                        ></HeaderFixed>
                        <main className="mt-10 flex h-[70vh] flex-col items-start justify-center gap-16 p-10 text-neutral-900 sm:gap-8 sm:p-0">
                            <FirstMenu
                                setMostrarFormulario={setMostrarFormulario}
                            ></FirstMenu>
                        </main>

                        <ModalFormulario
                            ref={modalRef}
                            mostrarFormulario={mostrarFormulario}
                            setMostrarFormulario={setMostrarFormulario}
                        ></ModalFormulario>
                        <MenuLateral
                            menu={menu}
                            setMenu={setMenu}
                        ></MenuLateral>
                    </div>
                </section>

                {/* Nuevas secciones de cursos */}
                {children(setMostrarFormulario, carro)}

                <footer className="text-center text-sm text-black dark:text-white/70">
                    {/*                Laravel v{laravelVersion} (PHP v{phpVersion}) */}
                    <Footer></Footer>
                </footer>
            </div>
        </>
    );
}
