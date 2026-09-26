import React from 'react';

/**
 * Componente de lista de diferenciais (Checklist) com ícone de marcação roxo brilhante.
 * 
 * @param {Object} props
 * @param {Array<string>} [props.itens] - Lista de strings com os diferenciais
 * @param {string} [props.className] - Classes Tailwind adicionais
 */
export default function ListaDiferenciais({
  itens = [
    'Sites que apresentam seu negócio',
    'Sistemas que simplificam sua operação',
    'Identidade que torna sua marca reconhecível',
    'Design que valoriza cada detalhe',
  ],
  className = '',
}) {
  return (
    <ul className={`list-none flex flex-col gap-3.5 mb-10 ${className}`}>
      {itens.map((item, index) => (
        <li key={index} className="font-corpo flex items-center gap-3 text-[14.5px] sm:text-[15px] font-medium text-texto-corpo">
          <div className="w-[22px] h-[22px] flex items-center justify-center text-roxo-secundario shrink-0 filter drop-shadow-[0_0_10px_rgba(182,45,254,0.5)]">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8.5 12.3L10.8 14.6L15.8 9.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
