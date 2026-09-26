import React from 'react';
import Selo from '../ui/Selo';
import ListaDiferenciais from '../ui/ListaDiferenciais';
import Botao from '../ui/Botao';

/**
 * Seção Hero principal da Web iNexus.
 * Título h1 ajustado para 48px no mobile.
 */
export default function SecaoHero() {
  return (
    <section 
      className="relative w-full bg-fundo bg-cover bg-no-repeat bg-[right_center] flex items-center pt-8 sm:pt-14 lg:pt-20 pb-12 sm:pb-16 lg:pb-[80px] overflow-hidden hero-overlay-dark"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="max-w-conteiner w-full mx-auto px-5 sm:px-[30px] lg:px-[70px] relative z-10">
        <div className="max-w-[640px] flex flex-col items-start">
          
          {/* Tag Selo */}
          <Selo texto="Para quem quer ir além!" className="mb-5 sm:mb-7" />

          {/* Título Principal (Ajustado para 48px no mobile) */}
          <h1 className="font-titulo uppercase text-[48px] sm:text-[54px] lg:text-[56px] font-bold leading-[1.08] lg:leading-[1.2] tracking-tight text-white mb-4 sm:mb-5.5">
            Mostre para o mundo<br className="hidden sm:block" />{' '}
            o que <span className="texto-gradiente">você construiu.</span>
          </h1>

          {/* Descrição em parágrafo */}
          <p className="text-texto-suave font-normal mb-6 sm:mb-8">
            Sua empresa merece ser vista, <strong className="text-white font-semibold">lembrada e escolhida.</strong>{' '}
            <strong className="text-white font-semibold">Criamos experiências digitais, marcas e soluções</strong> que valorizam o que você construiu e ajudam seu negócio a ocupar{' '}
            <strong className="text-white font-semibold">o espaço que merece no mercado.</strong>
          </p>

          {/* Lista de Diferenciais / Checklist */}
          <ListaDiferenciais className="mb-7 sm:mb-10" />

          {/* Botão de Chamada para Ação (CTA) */}
          <div className="w-full max-w-[480px] mb-4 sm:mb-5">
            <Botao variante="cta" href="#">
              QUERO UM SITE PROFISSIONAL
            </Botao>
          </div>

          {/* Sub-legenda explicativa */}
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-texto-suave max-w-[460px]">
            Sites, sistemas, identidades visuais e peças digitais pensados para transformar sua presença e fortalecer seu negócio.
          </p>

        </div>
      </div>
    </section>
  );
}
