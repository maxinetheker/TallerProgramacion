import React, { useState, useRef, useEffect } from 'react';

export default function CursoAutocomplete({ cursos, cursosFiltrados, setCursosFiltrados }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setSuggestions([]);
      setCursosFiltrados(cursos);
    } else {
      const filtered = cursos.filter((c) =>
        c.titulo.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setCursosFiltrados(filtered);
    }
  };

  const handleSelect = (curso) => {
    setInputValue(curso.titulo);
    setSuggestions([]);
    setCursosFiltrados([curso]);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md mb-10 mx-auto" ref={suggestionsRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Busca un curso..."
        className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white text-black border rounded w-full mt-1 max-h-60 overflow-auto">
          {suggestions.map((c) => (
            <li
              key={c.id}
              onClick={() => handleSelect(c)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {c.titulo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
