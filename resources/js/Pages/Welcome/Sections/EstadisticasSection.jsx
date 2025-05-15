import React, { useEffect, useRef } from 'react';

export default function EstadisticasSection() {
    const statsRef = useRef(null);
    
    useEffect(() => {
        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('.counter-value');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        let count = 0;
                        const updateCounter = () => {
                            const increment = target / 100;
                            if (count < target) {
                                count += increment;
                                counter.innerText = Math.ceil(count);
                                setTimeout(updateCounter, 20);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1
        });

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);

    return (
        <section ref={statsRef} className="py-16 bg-[#0B60F7] text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="p-6">
                        <div className="text-5xl font-bold mb-2">
                            <span className="counter-value" data-target="1500">0</span>+
                        </div>
                        <p className="text-xl">Estudiantes Graduados</p>
                    </div>
                    <div className="p-6">
                        <div className="text-5xl font-bold mb-2">
                            <span className="counter-value" data-target="25">0</span>
                        </div>
                        <p className="text-xl">Cursos Disponibles</p>
                    </div>
                    <div className="p-6">
                        <div className="text-5xl font-bold mb-2">
                            <span className="counter-value" data-target="40">0</span>
                        </div>
                        <p className="text-xl">Instructores Expertos</p>
                    </div>
                    <div className="p-6">
                        <div className="text-5xl font-bold mb-2">
                            <span className="counter-value" data-target="98">0</span>%
                        </div>
                        <p className="text-xl">Tasa de Satisfacción</p>
                    </div>
                </div>
            </div>
        </section>
    );
}