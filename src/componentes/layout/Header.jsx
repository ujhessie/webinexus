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
        <header className='relative w-full bg-[#0a0a0c] z-50'>
            <div className='max-w-7xl mx-auto px-6 sm:px-10 py-5 sm:py-6 flex items-center justify-between'>
                {/* Logo */}
                <a
                    href='/'
                    className='flex items-center hover:opacity-90 transition-opacity'
                >
                    <img
                        src={logo}
                        alt='UJHESSIE'
                        className='h-6 sm:h-7 w-auto object-contain'
                    />
                </a>

                {/* Menu Central (Desktop) */}
                <nav className='hidden md:flex items-center bg-white/[0.06] border border-white/10 rounded-full p-1.5 backdrop-blur-md shadow-lg shadow-black/20'>
                    <ul className='flex items-center gap-1 list-none m-0 p-0'>
                        {Object.entries(links).map(([texto, url]) => {
                            const isActive = activeLink === texto;
                            return (
                                <li key={texto}>
                                    <a
                                        href={url}
                                        onClick={() => setActiveLink(texto)}
                                        className={`font-titulo text-sm px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap block ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#7B1FE1] to-[#B62DFE] text-white font-semibold shadow-[0_4px_18px_rgba(123,31,225,0.5)]"
                                                : "text-white/75 hover:text-white hover:bg-white/5 font-medium"
                                        }`}
                                    >
                                        {texto}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* CTA Direito (Desktop) */}
                <div className='hidden md:flex items-center'>
                    {configCTA?.textoCTA && (
                        <a
                            href={configCTA.urlCTA || "#"}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-[#7B1FE1] to-[#B62DFE] hover:from-[#8B2CF5] hover:to-[#C446FE] text-white font-titulo font-bold text-xs tracking-wider uppercase rounded-xl shadow-[0_8px_25px_-4px_rgba(123,31,225,0.65)] hover:-translate-y-0.5 transition-all'
                        >
                            <FaWhatsapp />
                            <span>{configCTA.textoCTA}</span>
                        </a>
                    )}
                </div>

                {/* Botão Hamburguer (Mobile) */}
                <button
                    type='button'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className='md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none'
                    aria-label='Alternar menu'
                >
                    {isMenuOpen ? (
                        <X className='w-6 h-6' />
                    ) : (
                        <Menu className='w-6 h-6' />
                    )}
                </button>
            </div>

            {/* Menu Dropdown Mobile */}
            {isMenuOpen && (
                <div className='md:hidden absolute top-full left-0 w-full bg-[#0a0a0c]/98 border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl backdrop-blur-xl z-50'>
                    <nav className='flex flex-col gap-1.5'>
                        {Object.entries(links).map(([texto, url]) => {
                            const isActive = activeLink === texto;
                            return (
                                <a
                                    key={texto}
                                    href={url}
                                    onClick={() => {
                                        setActiveLink(texto);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`px-4 py-3 rounded-xl font-titulo text-sm transition-all ${
                                        isActive
                                            ? "bg-gradient-to-r from-[#7B1FE1] to-[#B62DFE] text-white font-semibold shadow-md"
                                            : "text-white/80 hover:text-white hover:bg-white/5 font-medium"
                                    }`}
                                >
                                    {texto}
                                </a>
                            );
                        })}
                    </nav>

                    {configCTA?.textoCTA && (
                        <a
                            href={configCTA.urlCTA || "#"}
                            target='_blank'
                            rel='noopener noreferrer'
                            onClick={() => setIsMenuOpen(false)}
                            className='flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-[#7B1FE1] to-[#B62DFE] text-white font-titulo font-bold text-xs tracking-wider uppercase rounded-xl shadow-lg mt-2'
                        >
                            <FaWhatsapp />
                            <span>{configCTA.textoCTA}</span>
                        </a>
                    )}
                </div>
            )}
        </header>
    );
};
