import React from 'react';

/**
 * Componente Selo (Badge / Tag estilo pílula brilhante com ícone)
 * 
 * @param {Object} props
 * @param {string} [props.texto='Para quem quer ir além!'] - Texto do selo
 * @param {string} [props.className] - Classes Tailwind adicionais
 */
export default function Selo({ texto = 'Para quem quer ir além!', className = '' }) {
  return (
    <div className={`font-titulo inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 bg-gradiente-selo border border-borda-selo rounded-full text-xs sm:text-[14.5px] font-semibold text-texto-selo backdrop-blur-md mb-7 shadow-glow-selo transition-all duration-300 hover:bg-roxo-secundario/25 hover:border-roxo-secundario hover:shadow-glow-selo-hover hover:-translate-y-0.5 ${className}`}>
      <svg className="w-4 h-4 text-roxo-secundario shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.35 9.65L22 12L14.35 14.35L12 22L9.65 14.35L2 12L9.65 9.65L12 2Z" fill="currentColor"/>
      </svg>
      <span>{texto}</span>
    </div>
  );
}
