import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function HeaderFixed({
    auth,
    setMenu,
    compras,
    setMostrarFormulario,
    headerFirstRef,
}) {
    const headerRef = useRef(null);

    useLayoutEffect(() => {
        if (headerFirstRef) {
            console.log(headerFirstRef);
            gsap.to(headerRef.current,
                {
                    
                    translateY: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: headerFirstRef,
                        start: 'top top ',
                        end: 'bottom 80%',
                        scrub: true,
                        
                    },
                    onStart: () => {
                        headerRef.current.style.display = 'flex';
                    },
                },
            );
        }
    }, [headerFirstRef]);

    useLayoutEffect(() => {});
    return (
        <header
            ref={headerRef}
            className="hidden opacity-0 -tanslate-y-[200px] sm:max-w-screen fixed inset-0 h-6 w-screen flex-row items-center justify-center gap-2 bg-white/90 py-10 pl-6 sm:bg-white/90 lg:grid-cols-3"
        >
            <div className="flex w-screen items-center justify-center xl:max-w-[80vw] 2xl:max-w-[60vw]">
                <Link href={route('home')}>
                    <ApplicationLogo className={'w-40'}></ApplicationLogo>
                </Link>
                <nav className="flex flex-1 items-center justify-evenly gap-6 sm:mr-10 sm:justify-end">
                    <Link
                        className="hidden text-[#727070] hover:text-white sm:inline"
                        href="#cursos"
                    >
                        CURSOS
                    </Link>
                    <Link
                        className="hidden text-[#727070] hover:text-white sm:inline"
                        href="#nosotros"
                    >
                        NOSOTROS
                    </Link>
                    <Link
                        className="hidden text-[#727070] hover:text-white sm:inline"
                        href="#"
                    >
                        BLOG
                    </Link>
                    <Link className="hidden text-[#727070] hover:text-white sm:inline">
                        CONTACTO
                    </Link>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="hidden rounded-md px-3 py-2  ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] sm:inline text-[#727070]"
                        >
                            Inicio
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="hidden rounded-2xl bg-[#0B60F7] px-3 py-2 text-sm uppercase text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] sm:inline dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Iniciar Sesión
                            </Link>
                        </>
                    )}
                    <span className="hidden sm:inline">|</span>

                    <Link className="relative box-content hover:scale-110">
                        <div className="bg-red absolute inset-0 -translate-y-4 translate-x-3 rounded-full bg-red-500 text-center">
                            {compras}
                        </div>
                        <img
                            src="img/shop-black.png"
                            className="hidden h-6 max-w-[30px] hover:brightness-200 sm:inline"
                            alt=""
                        />
                        <img
                            src="img/shop-black.png"
                            className="inline h-6 max-w-[30px] hover:brightness-200 sm:hidden"
                            alt=""
                        />
                    </Link>
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
            </div>
        </header>
    );
}
