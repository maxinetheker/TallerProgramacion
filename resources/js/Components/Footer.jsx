import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { href: 'https://facebook.com/miempresa', label: 'Facebook', icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
        {/* svg path Facebook */}
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.12 8.44 9.88v-6.99H7.9v-2.9h2.54V9.41c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v6.99C18.34 21.12 22 17 22 12z" />
      </svg>
    )
  },
  { href: 'https://twitter.com/miempresa', label: 'Twitter', icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
        {/* svg path Twitter */}
        <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.3 4.3 0 0 0 1.88-2.38 8.6 8.6 0 0 1-2.72 1.03 4.3 4.3 0 0 0-7.37 3.92A12.2 12.2 0 0 1 3.16 4.78a4.3 4.3 0 0 0 1.33 5.72 4.27 4.27 0 0 1-1.95-.54v.05a4.3 4.3 0 0 0 3.45 4.21 4.3 4.3 0 0 1-1.94.07 4.3 4.3 0 0 0 4.01 2.98A8.62 8.62 0 0 1 2 19.54a12.15 12.15 0 0 0 6.58 1.93c7.9 0 12.22-6.54 12.22-12.22 0-.19-.01-.39-.02-.58A8.73 8.73 0 0 0 24 4.56a8.5 8.5 0 0 1-2.54.7z" />
      </svg>
    )
  },
  { href: 'https://instagram.com/miempresa', label: 'Instagram', icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
        {/* svg path Instagram */}
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-3a1.5 1.5 0 1 0 .002 3.002A1.5 1.5 0 0 0 16.5 4z" />
      </svg>
    )
  }
];

export default function Footer() {
  const footerRef = useRef(null);
  const iconRefs = useRef([]);

  useEffect(() => {
    if (!iconRefs.current.length) return;

    gsap.from(iconRefs.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Datos de contacto */}
        <div>
          <h3 className="font-bold text-lg mb-2">Contáctanos</h3>
          <p>Av. Principal 123, Lima, Perú</p>
          <p>contacto@miempresa.pe</p>
          <p>+51 987 654 321</p>
        </div>

        {/* Enlaces */}
        <div>
          <h3 className="font-bold text-lg mb-2">Enlaces</h3>
          <ul className="space-y-1">
            <li><a href="#cursos" className="hover:text-gray-300 transition">Cursos</a></li>
            <li><a href="#nosotros" className="hover:text-gray-300 transition">Nosotros</a></li>
            <li><a href="#blog" className="hover:text-gray-300 transition">Blog</a></li>
            <li><a href="#faq" className="hover:text-gray-300 transition">FAQ</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-2">Síguenos</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            {socialLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                ref={el => el && iconRefs.current.push(el)}
                className="text-gray-400 hover:text-white transition transform hover:scale-110"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Derechos */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © 2025 NEXTECH Todos los derechos reservados.
      </div>
    </footer>
  );
}