import { useState } from "react";
import { ArrowRight, Sparkles, Menu, X } from "lucide-react";

// Ícone do WhatsApp reutilizável
const WhatsappIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor'>
        <path d='M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.776.978-.952 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.783-1.674-2.084-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.928-2.234-.244-.587-.492-.507-.677-.517l-.577-.01c-.2 0-.527.075-.802.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.229 3.111c.15.2 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.723.23 1.38.198 1.9.12.58-.088 1.78-.727 2.03-1.43.25-.703.25-1.305.176-1.43-.076-.125-.276-.2-.577-.35z' />
        <path d='M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.172L2 22l4.98-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.63 0-3.14-.49-4.402-1.332l-.316-.21-2.96.776.79-2.884-.23-.332A8.125 8.125 0 013.833 12c0-4.502 3.665-8.167 8.167-8.167 4.502 0 8.167 3.665 8.167 8.167 0 4.502-3.665 8.167-8.167 8.167z' />
    </svg>
);

export const HomePage = () => {
    const linksHeader = {
        Início: "#inicio",
        "Quem eu sou": "#sobre-mim",
        "Meus trabalhos": "#trabalhos",
        Contatos: "#contato",
    };

    const configCTA = {
        textoCTA: "FALE CONOSCO",
        urlCTA: "https://wa.me/5500000000000",
    };

    return (
        <div className='min-h-screen bg-[#06010d] text-white'>
            <Header
                logo='/ujhessie-logo.svg'
                links={linksHeader}
                configCTA={configCTA}
            />
            <HeroSection />
        </div>
    );
};

// Header configurável e responsivo
const Header = ({
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
                            <WhatsappIcon className='w-4 h-4 fill-white' />
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
                            <WhatsappIcon className='w-4 h-4 fill-white' />
                            <span>{configCTA.textoCTA}</span>
                        </a>
                    )}
                </div>
            )}
        </header>
    );
};

// Hero Section
const HeroSection = () => {
    return (
        <section className='relative w-full bg-[#838286] overflow-hidden'>
            <div className='max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-0 flex flex-col lg:flex-row items-center lg:items-end justify-between min-h-[560px] lg:min-h-[640px]'>
                {/* Lado Esquerdo - Conteúdo Textual e CTAs */}
                <div className='w-full lg:w-1/2 flex flex-col items-start pb-10 lg:pb-24 z-10'>
                    {/* Badge */}
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B62DFE]/50 bg-[#7B1FE1]/15 backdrop-blur-sm text-[#e9d5ff] font-semibold text-xs sm:text-sm tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(182,45,254,0.25)]'>
                        <Sparkles className='w-4 h-4 text-[#B62DFE]' />
                        <span>BEM VINDOS!</span>
                    </div>

                    {/* Título Principal */}
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.08] font-titulo'>
                        JESSE RODRIGUES
                    </h1>

                    {/* Subtítulo Destaque */}
                    <div className='text-2xl sm:text-3xl lg:text-[38px] font-black tracking-tight uppercase leading-tight font-titulo mt-2 sm:mt-3'>
                        <span className='text-[#8423f5]'>DEV, DESIGNER </span>
                        <span className='text-white font-medium'>
                            & UM POUCO MAIS
                        </span>
                    </div>

                    {/* Descrição */}
                    <p className='text-zinc-200 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-lg mt-5 mb-8 font-corpo'>
                        Aqui você verá um pouco do meu mundo. Explore tudo sobre
                        mim e caso querias saber um pouco mais, fique a vontade
                        para entrar em contato comigo
                    </p>

                    {/* Botões de Ação */}
                    <div className='flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto'>
                        <a
                            href='#sobre-mim'
                            className='flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#8722ee] hover:bg-[#9732fa] text-white font-titulo font-bold text-xs sm:text-sm tracking-wider uppercase rounded-2xl transition-all shadow-[0_8px_25px_rgba(135,34,238,0.45)] hover:shadow-[0_12px_32px_rgba(135,34,238,0.65)] hover:-translate-y-0.5'
                        >
                            <span>MAIS SOBRE MIM</span>
                            <span className='w-7 h-7 rounded-full border border-white/40 bg-white/10 flex items-center justify-center flex-shrink-0'>
                                <ArrowRight className='w-4 h-4 text-white' />
                            </span>
                        </a>

                        <a
                            href='#trabalhos'
                            className='flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-[#a855f7] hover:border-[#c084fc] bg-white/10 hover:bg-white/15 text-white font-titulo font-bold text-xs sm:text-sm tracking-wider uppercase rounded-2xl transition-all hover:-translate-y-0.5 backdrop-blur-sm'
                        >
                            <span>MEUS TRABALHOS</span>
                            <span className='w-7 h-7 rounded-full border border-white/40 bg-white/10 flex items-center justify-center flex-shrink-0'>
                                <ArrowRight className='w-4 h-4 text-white' />
                            </span>
                        </a>
                    </div>
                </div>

                {/* Lado Direito - Imagem do Jesse */}
                <div className='w-full lg:w-1/2 flex justify-center lg:justify-end items-end relative mt-6 lg:mt-0'>
                    <img
                        src='/jesse.png'
                        alt='Jesse Rodrigues'
                        className='w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[560px] h-auto object-contain object-bottom pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)]'
                    />
                </div>
            </div>
        </section>
    );
};
