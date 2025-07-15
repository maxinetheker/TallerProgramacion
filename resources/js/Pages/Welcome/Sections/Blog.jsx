import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

// Registrar plugin
gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: "Cómo impulsar tu carrera con tecnología",
    date: "2025-06-15",
    excerpt: "Descubre las últimas tendencias en tecnología y cómo aplicarlas para destacar en el mercado laboral.",
    image: "/img/blog/tech-career.jpg",
  },
  {
    id: 2,
    title: "5 Estrategias de aprendizaje efectivo",
    date: "2025-05-22",
    excerpt: "Aprende técnicas comprobadas para maximizar tu tiempo de estudio y retención de conocimiento.",
    image: "/img/blog/learning-strategies.jpg",
  },
  {
    id: 3,
    title: "Herramientas imprescindibles para desarrolladores",
    date: "2025-04-10",
    excerpt: "Un resumen de las herramientas y librerías más utilizadas por profesionales del desarrollo web.",
    image: "/img/blog/dev-tools.jpg",
  },
];

const BlogSection = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const cards = containerRef.current.querySelectorAll('.blog-card');

    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: `top ${100 - index * 10}%`,
          // no scrub for discrete animation
          toggleActions: 'play none none none',
        },
      });
    });

    // cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="blog" className="bg-gray-100 py-20 scroll-mt-16" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <BookOpen className="mx-auto mb-4 h-12 w-12 text-[#0B60F7]" />
          <h2 className="text-4xl font-bold text-gray-800">Nuestro Blog</h2>
          <p className="text-lg text-gray-600 mt-2">
            Aprende y mantente actualizado con artículos escritos por expertos.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, idx) => (
            <div
              key={post.id}
              className="blog-card opacity-0 translate-y-[50px] bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover"
                onError={e => { e.target.src = '/img/blog/default.jpg'; }}
              />
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString('es-PE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-[#0B60F7] font-semibold hover:underline"
                >
                  Leer más
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
