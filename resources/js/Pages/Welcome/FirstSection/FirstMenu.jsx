import { Button } from '@headlessui/react';
import 'animate.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function FirstMenu({ setMostrarFormulario }) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.utils.toArray('.fade-item', containerRef.current).forEach((el) => {
                gsap.set(el, { opacity: 1, y: 0 });
                gsap.to(el, {
                    opacity: 0,
                    x: -100,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 20%', // cuando el top del elemento llega al 80% del viewport
                        end: 'bottom 5%', // cuando llega al 30%
                        scrub: true, // animación suave mientras se hace scroll
                       // markers: true,
                        onEnter: () => {
                            el.style.animation = 'none';
                        },
                    },
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className='flex flex-col items-start justify-center gap-16 sm:ml-10 '>
            <h1 className="fade-in-left max-w-[80vw] text-wrap text-4xl font-extrabold sm:w-[600px] 2xl:text-5xl fade-item">
                IMPULSA TU CARRERA CON NOSOTROS
            </h1>
            <p className="fade-in-left w-80 text-neutral-900 fade-item">
                Aprende de expertos, certifica tus conocimientos y destaca en el
                mundo laboral con NEXTECH.
            </p>
            <Button
                className={`animate__animated fade-in-up rounded-xl bg-[#0B60F7] p-3 py-2 text-white hover:scale-110 hover:brightness-110 fade-item`}
                onClick={() => setMostrarFormulario(true)}
                
            >
                Deseo Información
            </Button>
        </div>
    );
}
