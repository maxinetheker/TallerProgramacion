import ApplicationLogo from '@/Components/ApplicationLogo';
import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { forwardRef } from 'react';

const MenuLateral = forwardRef(({ menu, setMenu }, ref) => {
    return (
        <>
            <Transition
                show={menu}
                enter="transition ease-out duration-300 transform"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
            >
                <div
                    ref={ref}
                    className="fixed right-0 top-0 h-screen w-[80vw] bg-white p-10"
                >
                    <div className="flex justify-between border-b-2 border-b-neutral-400 pb-4">
                        <ApplicationLogo className="w-40"></ApplicationLogo>
                        <span
                            className="text-lg font-bold text-neutral-600"
                            onClick={() => {
                                setMenu(false);
                            }}
                        >
                            X
                        </span>
                    </div>
                    <div className='mb-10'>
                        <ul className="mt-4 flex flex-col gap-8">
                            <li>
                                <Link
                                    href="#cursos"
                                    className="flex items-center text-neutral-600"
                                >
                                    <img
                                        src="img/cursos.png"
                                        className="w-10"
                                    ></img>
                                    <span className="pl-6 text-2xl">
                                        Cursos
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#nosotros"
                                    className="flex items-center text-neutral-600"
                                >
                                    <img
                                        src="img/nosotros.png"
                                        className="w-10"
                                    ></img>
                                    <span className="pl-6 text-2xl">
                                        Nosotros
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#nosotros"
                                    className="flex items-center text-neutral-600"
                                >
                                    <img
                                        src="img/blog.png"
                                        className="w-10"
                                    ></img>
                                    <span className="pl-6 text-2xl">Blog</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#nosotros"
                                    className="flex items-center text-neutral-600"
                                >
                                    <img
                                        src="img/contact.png"
                                        className="w-10"
                                    ></img>
                                    <span className="pl-6 text-2xl">
                                        Contacto
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link
                        href={route('login')}
                        className="rounded-lg  bg-[#0B60F7] px-3 py-2 text-sm uppercase text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] sm:inline dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </Transition>
        </>
    );
});

export default MenuLateral;
