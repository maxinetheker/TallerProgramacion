import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import 'animate.css';

export default function RegistroSection({ setMostrarFormulario }) {
 const registracionRef = useRef(null);
 const contenidoRegistracionRef = useRef(null);


  useEffect(() => {
     const handleIntersection = (entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            registracionRef.current.classList.add("animate__animated", "animate__fadeIn")
            contenidoRegistracionRef.current.classList.remove("hidden")
          }
        })
     }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    })
    if(registracionRef.current){
      observer.observe(registracionRef.current);
    }

  })
  return (
    <section  className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div ref={registracionRef} className="container mx-auto px-6 lg:px-8">
        {/* Reemplazamos Card por un div genérico */}
        <div ref={contenidoRegistracionRef} className="overflow-hidden hidden shadow-2xl rounded-2xl bg-white">
          <div className="lg:flex">
            {/* Lado informativo */}
            <div className="lg:w-1/2 bg-blue-600 p-12 text-white relative">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
                  ¡Impulsa tu futuro ahora!
                </h2>
                <p className="mb-10 text-lg leading-relaxed">
                  Sé parte de la familia Nextech y transforma tu carrera profesional con nuestros cursos especializados.
                </p>
                <ul className="space-y-5">
                  {[
                    'Instructores certificados',
                    'Certificaciones reconocidas',
                    'Acceso a plataforma 24/7',
                    'Soporte técnico permanente'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-6 w-6 mt-1 mr-4 text-white" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <div className="absolute -bottom-12 -right-12 opacity-20">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="100" fill="white" />
                </svg>
              </div>
            </div>

            {/* Lado formulario */}
            <div className="lg:w-1/2 p-12 bg-white">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold mb-6 text-gray-800">
                  ¿Listo para comenzar?
                </h3>
                <p className="mb-8 text-gray-600">
                  Completa el formulario y un asesor se pondrá en contacto contigo para brindarte toda la información que necesitas.
                </p>
                <div className="space-y-4">
                  <Link
                    onClick={() => setMostrarFormulario(true)}
                    className="block w-full text-center py-4 text-lg font-semibold border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition text-gray-600"
                  >
                    Solicitar información
                  </Link>
                  <Link
                    href={route('register')}
                    className="block w-full text-center py-4 text-lg font-semibold border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition text-gray-600"
                  >
                    Registrarme ahora
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}