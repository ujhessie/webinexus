import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Menu, X } from "lucide-react";

const estaAtivo = (pathname, url) => {
    if (url === "/") return pathname === "/";
    return pathname === url || pathname.startsWith(`${url}/`);
};

export const Header = ({
    logo = "/ujhessie-logo.svg",
    altLogo = "UJHESSIE",
    links = {},
    configCTA = {},
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <header className='relative w-full bg-preto-escuro z-50'>
            <div className='content-section py-5 sm:py-6 flex items-center justify-between'>
                <Logo logo={logo} alt={altLogo} />

                <NavDesktop links={links} pathname={pathname} />

                <BotaoCTA configCTA={configCTA} />

                <BotaoHamburguer
                    isOpen={isMenuOpen}
                    onToggle={() => setIsMenuOpen(!isMenuOpen)}
                />
            </div>

            <MenuMobile
                isOpen={isMenuOpen}
                links={links}
                pathname={pathname}
                configCTA={configCTA}
                onClose={() => setIsMenuOpen(false)}
            />
        </header>
    );
};

const Logo = ({ logo, alt, href = "/" }) => {
    return (
        <Link to={href} aria-label='Voltar para a página inicial'>
            <img
                src={logo}
                alt={alt}
                className='h-6 sm:h-7 w-auto object-contain'
            />
        </Link>
    );
};

const NavDesktop = ({ links = {}, pathname }) => {
    return (
        <nav
            className='hidden lg:flex items-center bg-white/6 border border-white/10 rounded-full p-1.5' /* taste-skill-ignore: contêiner da navegação pede borda fina */
            aria-label='Navegação principal'
        >
            <ul className='flex items-center gap-1 list-none m-0 p-0'>
                {Object.entries(links).map(([texto, url]) => {
                    const isActive = estaAtivo(pathname, url);
                    return (
                        <li key={texto}>
                            <Link
                                to={url}
                                className={`button-press font-titulo text-sm px-5 py-2 rounded-full whitespace-nowrap block transition-colors ${
                                    isActive
                                        ? "grad-btn sombra-nav text-white font-semibold"
                                        : "text-white/75 hover:text-white hover:bg-white/5 font-medium"
                                }`}
                            >
                                {texto}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

const BotaoCTA = ({ configCTA = {} }) => {
    const { textoCTA = "Fale conosco", urlCTA } = configCTA;

    if (!textoCTA) return null;

    return (
        <div className='hidden lg:flex items-center'>
            <a
                href={urlCTA || "#"}
                target='_blank'
                rel='noopener noreferrer'
                className='button-press sombra-btn grad-btn inline-flex items-center gap-3 px-6 py-3.5 text-white font-titulo font-bold text-sm tracking-wider uppercase rounded-xl hover:-translate-y-0.5'
            >
                <FaWhatsapp />
                <span>{textoCTA}</span>
            </a>
        </div>
    );
};

const BotaoHamburguer = ({ isOpen, onToggle }) => (
    <button
        type='button'
        onClick={onToggle}
        className='lg:hidden p-2 -mr-2 text-white rounded-lg hover:bg-white/10 transition-colors'
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
    >
        {isOpen ? <X className='w-7 h-7' /> : <Menu className='w-7 h-7' />}
    </button>
);

const MenuMobile = ({
    isOpen,
    links = {},
    pathname,
    configCTA = {},
    onClose,
}) => (
    <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#0a0a0c]/98 px-6 py-6 flex flex-col gap-4 z-50 transition-[opacity,transform] duration-300 ${
            isOpen
                ? "opacity-100 translate-y-0"
                : "pointer-events-none -translate-y-2 opacity-0"
        }`}
    >
        <nav className='flex flex-col gap-1.5' aria-label='Navegação móvel'>
            {Object.entries(links).map(([texto, url], i) => {
                const isActive = estaAtivo(pathname, url);
                return (
                    <Link
                        key={texto}
                        to={url}
                        onClick={onClose}
                        style={{ animationDelay: `${i * 45}ms` }}
                        className={`px-4 py-3 rounded-xl font-titulo text-sm font-medium animate-fade-in-up transition-colors ${
                            isActive
                                ? "grad-btn sombra-nav text-white font-semibold"
                                : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        {texto}
                    </Link>
                );
            })}
        </nav>

        {configCTA?.textoCTA && (
            <a
                href={configCTA.urlCTA || "#"}
                target='_blank'
                rel='noopener noreferrer'
                onClick={onClose}
                className='button-press sombra-btn grad-btn flex items-center justify-center gap-3 px-5 py-3.5 text-white font-titulo font-bold text-sm tracking-wider uppercase rounded-xl mt-5 w-full'
            >
                <FaWhatsapp />
                <span>{configCTA.textoCTA}</span>
            </a>
        )}
    </div>
);
