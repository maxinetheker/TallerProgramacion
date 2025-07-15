import { Eye, Handshake, Target } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Nosotros = () => {
    const nosotros = useRef(null);
    useLayoutEffect(() => {
        

            gsap.to(nosotros.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: nosotros.current,
                    start: `top 85%`,
                    end: `bottom 80%`,
                    scrub: true,
                    onEnter: () => {
                        nosotros.current.style.animation = 'none';
                    },
                },
            });

            /*                 gsap.to(el, {
                    opacity: 0,
                    y: -100,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: `top 0%`,
                        end: `bottom ${20-(i*5)}%`,
                        scrub: true,
                        markers: true,
                    }
                }) */
       
    });
    return (
        <section id="nosotros" className="bg-white py-20 text-gray-800 scroll-mt-10">
            <div ref={nosotros}  className="container mx-auto max-w-7xl px-6 opacity-50 translate-y-20 scaleGSAP">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-4xl font-bold">¿Quiénes Somos?</h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        En{' '}
                        <span className="font-semibold text-[#0B60F7]">
                            NEXTECH
                        </span>
                        , formamos profesionales con visión de futuro. Nuestra
                        misión es brindar educación de calidad con el respaldo
                        de expertos y tecnología de vanguardia.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div className="rounded-xl bg-gray-50 p-6 text-center shadow transition duration-300 hover:shadow-lg">
                        <Target
                            /* src="/img/icons/mision.png"  */ alt="Misión"
                            className="mx-auto mb-4 h-16 w-16 text-[#0B60F7]"
                        />
                        <h3 className="mb-2 text-xl font-semibold">
                            Nuestra Misión
                        </h3>
                        <p className="text-gray-600">
                            Capacitar y transformar vidas mediante programas
                            académicos prácticos y certificados.
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-6 text-center shadow transition duration-300 hover:shadow-lg">
                        <Eye
                            /* src="/img/icons/vision.png" */ alt="Visión"
                            className="mx-auto mb-4 h-16 w-16 text-[#0B60F7]"
                        />
                        <h3 className="mb-2 text-xl font-semibold">
                            Nuestra Visión
                        </h3>
                        <p className="text-gray-600">
                            Ser la plataforma líder en educación tecnológica y
                            profesional en toda Latinoamérica.
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-6 text-center shadow transition duration-300 hover:shadow-lg">
                        <Handshake
                            /* src="/img/icons/valores.png" */ alt="Valores"
                            className="mx-auto mb-4 h-16 w-16 text-[#0B60F7]"
                        />
                        <h3 className="mb-2 text-xl font-semibold">
                            Nuestros Valores
                        </h3>
                        <p className="text-gray-600">
                            Compromiso, innovación, excelencia y cercanía con
                            cada uno de nuestros estudiantes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Nosotros;
