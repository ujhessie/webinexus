import { Link } from "react-router-dom";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Menu, X } from "lucide-react";

export const Header = ({
    logo = "/ujhessie-logo.svg",
    links = {},
    configCTA = {},
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(
        Object.keys(links)[0] || "Início",
    );

    return (
        <header className='relative w-full bg-preto-escuro z-50'>
            <div className='max-w-7xl mx-auto px-6 sm:px-10 py-5 sm:py-6 flex items-center justify-between'>
                <Logo logo={logo} />

                <NavDesktop
                    links={links}
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                />

                <BotaoCTA configCTA={configCTA} />

                <BotaoHamburguer
                    isOpen={isMenuOpen}
                    onToggle={() => setIsMenuOpen(!isMenuOpen)}
                />
            </div>

            <MenuMobile
                isOpen={isMenuOpen}
                links={links}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
                configCTA={configCTA}
                onClose={() => setIsMenuOpen(false)}
            />
        </header>
    );
};

const Logo = ({ logo, href = "/" }) => {
    return (
        <Link
            to={href}
            className='flex items-center hover:opacity-90 transition-opacity'
        >
            <img
                src={logo}
                alt='UJHESSIE'
                className='h-6 sm:h-7 w-auto object-contain'
            />
        </Link>
    );
};

const NavDesktop = ({ links = {}, activeLink, setActiveLink }) => {
    return (
        <nav className='hidden md:flex items-center bg-white/6 border border-white/10 rounded-full p-1.5 backdrop-blur-md shadow-lg shadow-black/20'>
            <ul className='flex items-center gap-1 list-none m-0 p-0'>
                {Object.entries(links).map(([texto, url]) => {
                    const isActive = activeLink === texto;
                    return (
                        <li key={texto}>
                            <Link
                                to={url}
                                onClick={() => setActiveLink(texto)}
                                className={`font-titulo text-sm px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap block ${
                                    isActive
                                        ? "bg-linear-to-r from-[#7B1FE1] to-[#B62DFE] text-white font-semibold shadow-[0_4px_18px_rgba(123,31,225,0.5)]"
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
        <div className='hidden md:flex items-center'>
            <a
                href={urlCTA || "#"}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2.5 px-5 py-2.5 bg-linear-to-r from-roxo-escuro to-roxo-principal hover:from-roxo-principal hover:to-roxo-claro text-white font-titulo font-bold text-xs tracking-wider uppercase rounded-xl shadow-[0_8px_25px_-4px_rgba(123,31,225,0.65)] hover:-translate-y-0.5 transition-all'
            >
                <FaWhatsapp />
                <span>{textoCTA}</span>
            </a>
        </div>
    );
};

const BotaoHamburguer = ({ isOpen, onToggle }) => {
    return (
        <button
            type='button'
            onClick={onToggle}
            className='md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none'
            aria-label='Alternar menu'
        >
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
    );
};

const MenuMobile = ({
    isOpen,
    links = {},
    activeLink,
    setActiveLink,
    configCTA = {},
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className='md:hidden absolute top-full left-0 w-full bg-[#0a0a0c]/98 border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl backdrop-blur-xl z-50'>
            <nav className='flex flex-col gap-1.5'>
                {Object.entries(links).map(([texto, url]) => {
                    const isActive = activeLink === texto;
                    return (
                        <Link
                            key={texto}
                            to={url}
                            onClick={() => {
                                setActiveLink(texto);
                                onClose();
                            }}
                            className={`px-4 py-3 rounded-xl font-titulo text-sm transition-all ${
                                isActive
                                    ? "bg-linear-to-r from-roxo-escuro to-roxo-principal text-white font-semibold shadow-md"
                                    : "text-white/80 hover:text-white hover:bg-white/5 font-medium"
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
                    className='flex items-center justify-center gap-2.5 px-5 py-3.5 bg-linear-to-r from-roxo-escuro to-roxo-principal text-white font-titulo font-bold text-xs tracking-wider uppercase rounded-xl shadow-lg mt-2'
                >
                    <FaWhatsapp />
                    <span>{configCTA.textoCTA}</span>
                </a>
            )}
        </div>
    );
};
