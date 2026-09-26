import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Botao from '../ui/Botao';

/**
 * Componente de Cabeçalho flutuante responsivo (Cabecalho).
 * Reutilizável entre múltiplos sites (Web iNexus, Ujhessie, etc.).
 * Suporta logo personalizada, lista dinâmica de links, botão CTA configurável e drawer mobile.
 */
export default function Cabecalho({
  logo,
  links = [
    { nome: 'Página Inicial', href: '/' },
    { nome: 'Serviços', href: '#servicos' },
    { nome: 'Nossos projetos', href: '#projetos' },
  ],
  itemAtivoInicial,
  ctaTexto = 'FALE CONOSCO',
  ctaHref = '#',
  className = '',
}) {
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  // Define item ativo inicial com base na rota atual ou na prop
  const getAtivoAtual = () => {
    if (itemAtivoInicial) return itemAtivoInicial;
    const linkCorrespondente = links.find((l) => l.href === location.pathname);
    return linkCorrespondente ? linkCorrespondente.nome : links[0]?.nome || '';
  };

  const [itemAtivo, setItemAtivo] = useState(getAtivoAtual);

  // Sincroniza com a mudança de rota
  useEffect(() => {
    const linkCorrespondente = links.find((l) => l.href === location.pathname);
    if (linkCorrespondente) {
      setItemAtivo(linkCorrespondente.nome);
    }
  }, [location.pathname, links]);

  // Fecha o menu mobile quando a tela for redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMenuAberto(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuAberto((prev) => !prev);
  };

  const fecharMenu = (nomeItem) => {
    setItemAtivo(nomeItem);
    setMenuAberto(false);
  };

  return (
    <header className={`relative w-full z-[1000] py-[18px] lg:py-6 transition-all duration-300 ${className}`}>
      <div className="max-w-conteiner w-full mx-auto px-5 sm:px-[30px] lg:px-[70px] flex items-center justify-between">
        
        {/* Brand Logo */}
        {logo ? (
          typeof logo === 'string' ? (
            <Link
              to="/"
              className="font-titulo text-2xl sm:text-[26px] font-extrabold tracking-wider text-white no-underline hover:opacity-90 transition-opacity"
            >
              {logo}
            </Link>
          ) : (
            logo
          )
        ) : (
          <Link to="/" className="flex items-center no-underline transition-opacity duration-300 hover:opacity-90">
            <img src="/logo.png" alt="Logo" className="h-[28px] sm:h-[34px] w-auto object-contain" />
          </Link>
        )}

        {/* Desktop Navbar (Pílula Glassmorphism) */}
        <nav className="hidden lg:flex items-center bg-white/[0.05] border border-white/5 rounded-full p-1.5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <ul className="flex items-center list-none gap-1 m-0 p-0">
            {links.map((link) => (
              <li key={link.nome}>
                <Botao
                  variante="navegacao"
                  href={link.href}
                  ativo={itemAtivo === link.nome}
                  onClick={() => setItemAtivo(link.nome)}
                >
                  {link.nome}
                </Botao>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Header CTA Button */}
        <div className="hidden lg:block">
          <Botao variante="cabecalho" href={ctaHref}>
            {ctaTexto}
          </Botao>
        </div>

        {/* Hamburger Button (Mobile Toggle) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden relative z-[1001] flex flex-col justify-between w-[26px] h-[19px] bg-transparent border-none cursor-pointer p-0"
          aria-label={menuAberto ? 'Fechar Menu' : 'Abrir Menu'}
        >
          <span
            className={`w-full h-[2px] bg-white rounded-sm transition-all duration-300 ${
              menuAberto ? 'translate-y-[8.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`w-full h-[2px] bg-white rounded-sm transition-all duration-300 ${
              menuAberto ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-full h-[2px] bg-white rounded-sm transition-all duration-300 ${
              menuAberto ? '-translate-y-[8.5px] -rotate-45' : ''
            }`}
          />
        </button>

        {/* Mobile Drawer Sidebar */}
        <div
          className={`
            fixed top-0 right-0 h-screen w-[82%] max-w-[340px] bg-[#06010d]/96 border-l border-roxo-secundario/25 backdrop-blur-2xl p-[95px_28px_40px] flex flex-col justify-between transition-transform duration-400 ease-in-out shadow-[-15px_0_40px_rgba(0,0,0,0.7)] z-[1000] lg:hidden
            ${menuAberto ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <ul className="flex flex-col list-none gap-3 m-0 p-0">
            {links.map((link) => (
              <li key={link.nome}>
                <Botao
                  variante="navegacao"
                  href={link.href}
                  ativo={itemAtivo === link.nome}
                  onClick={() => fecharMenu(link.nome)}
                  className="w-full text-center py-3.5"
                >
                  {link.nome}
                </Botao>
              </li>
            ))}
          </ul>

          {/* Mobile CTA inside Drawer */}
          <div className="mt-6">
            <Botao
              variante="cabecalho"
              href={ctaHref}
              onClick={() => setMenuAberto(false)}
              className="w-full text-center justify-center py-3.5"
            >
              {ctaTexto}
            </Botao>
          </div>
        </div>

      </div>
    </header>
  );
}
