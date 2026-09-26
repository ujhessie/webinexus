import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cabecalho from '../componentes/layout/Cabecalho';
import SecaoHeroUjhessie from '../componentes/secoes/SecaoHeroUjhessie';

/**
 * Página Inicial do site Ujhessie
 */
function PaginaInicialUjhessie() {
  return (
    <>
      <SecaoHeroUjhessie />
    </>
  );
}

/**
 * Página "Quem eu sou"
 */
function PaginaSobreUjhessie() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center max-w-conteiner mx-auto">
      <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-roxo-secundario bg-roxo-secundario/10 rounded-full border border-roxo-secundario/25">
        Sobre mim
      </span>
      <h1 className="font-titulo text-3xl sm:text-5xl font-bold text-white mb-4">
        Quem Eu Sou
      </h1>
      <p className="font-corpo text-texto-suave text-base sm:text-lg max-w-lg mb-8">
        Conheça mais sobre minha trajetória como desenvolvedor e designer.
      </p>
    </div>
  );
}

/**
 * Página "Meus trabalhos"
 */
function PaginaTrabalhosUjhessie() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center max-w-conteiner mx-auto">
      <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-roxo-secundario bg-roxo-secundario/10 rounded-full border border-roxo-secundario/25">
        Portfólio
      </span>
      <h1 className="font-titulo text-3xl sm:text-5xl font-bold text-white mb-4">
        Meus Trabalhos
      </h1>
      <p className="font-corpo text-texto-suave text-base sm:text-lg max-w-lg mb-8">
        Projetos recentes desenvolvidos com design moderno e tecnologia de ponta.
      </p>
    </div>
  );
}

/**
 * Página "Contatos"
 */
function PaginaContatosUjhessie() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center max-w-conteiner mx-auto">
      <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-roxo-secundario bg-roxo-secundario/10 rounded-full border border-roxo-secundario/25">
        Fale comigo
      </span>
      <h1 className="font-titulo text-3xl sm:text-5xl font-bold text-white mb-4">
        Contatos
      </h1>
      <p className="font-corpo text-texto-suave text-base sm:text-lg max-w-lg mb-8">
        Entre em contato para orçamentos, projetos ou parcerias.
      </p>
    </div>
  );
}

/**
 * Componente principal do site Ujhessie.
 * Gerencia o cabeçalho personalizado e o roteamento interno de suas páginas.
 */
export default function UjhessieSite() {
  const linksUjhessie = [
    { nome: 'Início', href: '/' },
    { nome: 'Quem eu sou', href: '/sobre' },
    { nome: 'Meus trabalhos', href: '/trabalhos' },
    { nome: 'Contatos', href: '/contatos' },
  ];

  return (
    <div className="min-h-screen bg-[#07060a] text-white font-corpo selection:bg-roxo-secundario selection:text-white">
      {/* Cabeçalho Ujhessie */}
      <Cabecalho
        logo="UJHESSIE"
        links={linksUjhessie}
        itemAtivoInicial="Início"
        ctaTexto="FALE CONOSCO"
        ctaHref="/contatos"
        className="bg-[#07060a]"
      />

      {/* Conteúdo com rotas independentes */}
      <main>
        <Routes>
          <Route path="/" element={<PaginaInicialUjhessie />} />
          <Route path="/sobre" element={<PaginaSobreUjhessie />} />
          <Route path="/trabalhos" element={<PaginaTrabalhosUjhessie />} />
          <Route path="/contatos" element={<PaginaContatosUjhessie />} />
          <Route path="*" element={<PaginaInicialUjhessie />} />
        </Routes>
      </main>
    </div>
  );
}
