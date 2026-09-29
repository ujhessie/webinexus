import { ArrowRight, Sparkles } from "lucide-react";
import { Header } from "../../../../componentes/layout/Header";

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

// Hero Section
const HeroSection = () => {
    return (
        <section className='relative w-full overflow-hidden'>
            <div className='content-section max-w-7xl mx-auto px-6 sm:px-10 lg:px-12  pb-0 flex flex-col-reverse lg:flex-row items-center lg:items-center justify-between min-h-[560px] lg:min-h-[640px]'>
                {/* Lado Esquerdo - Conteúdo Textual e CTAs */}
                <div className='div-content-texto  w-full lg:w-1/2 flex flex-col items-start py-12 sm:py-16 lg:py-20 z-10'>
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
                <div className='div-imagem w-full h-full lg:w-1/2 flex justify-cecnter lg:justify-center  items-end relative '>
                    <img
                        src='/jesse.png'
                        alt='Jesse Rodrigues'
                        className='h-full max-w-[360px] sm:max-w-[460px] lg:max-w-[1800px] mx-auto  pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)]'
                    />
                </div>
            </div>
        </section>
    );
};
