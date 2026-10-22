import { ArrowRight } from "lucide-react";
import { Botao } from "../../../../componentes/ui/Botao/Botao";
import { Badge } from "../../../../componentes/ui/Badge/Badge";
import { Marquee } from "../../../../componentes/ui/Marquee/Marquee";
import { GaleriaProjetos } from "../../../../componentes/layout/GaleriaProjetos/GaleriaProjetos";

export const HomePage = () => {
    return (
        <>
            <HeroSection />
            <MarqueeSection />
            <SobreMimSection />
            <MarqueeSection reverse />
            <PortfolioSection />
        </>
    );
};

// Hero Section
const HeroSection = () => {
    return (
        <section id='inicio' className='relative w-full overflow-hidden '>
            <div className='content-section flex flex-col-reverse lg:flex-row items-center lg:items-center justify-between min-h-140 lg:min-h-160'>
                {/* Lado Esquerdo - Conteúdo Textual e CTAs */}
                <div className='div-content-texto  w-full lg:w-1/2 flex flex-col items-start py-12 sm:py-16 lg:py-20 z-10'>
                    {/* Badge */}
                    <div className='reveal'>
                        <Badge />
                    </div>

                    {/* Título Principal */}
                    <h1
                        className='font-black text-white tracking-tight uppercase lg:leading-[50%] font-titulo reveal'
                        style={{ "--reveal-i": 1 }}
                    >
                        JESSE RODRIGUES
                    </h1>

                    {/* Subtítulo Destaque */}
                    <div
                        className='text-2xl sm:text-3xl lg:text-[38px] font-black tracking-tight uppercase leading-tight font-titulo mt-2 sm:mt-3 reveal'
                        style={{ "--reveal-i": 2 }}
                    >
                        <span className='text-roxo-principal'>
                            DEV, DESIGNER{" "}
                        </span>
                        <span className='text-white font-thin'>
                            & UM POUCO MAIS
                        </span>
                    </div>

                    {/* Descrição */}
                    <p
                        className='text-zinc-200 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-lg mt-4 mb-8 font-corpo reveal'
                        style={{ "--reveal-i": 3 }}
                    >
                        Aqui você verá um pouco do meu mundo. Explore tudo sobre
                        mim e caso querias saber um pouco mais, fique a vontade
                        para entrar em contato comigo.
                    </p>

                    <div
                        className='flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto reveal'
                        style={{ "--reveal-i": 4 }}
                    >
                        <Botao
                            textoCTA='Fale Comigo'
                            iconCTA={
                                <ArrowRight className='w-4 h-4 text-white' />
                            }
                        />
                        <Botao
                            textoCTA={"Ver meus trabalhos"}
                            tipoBotao='secundario'
                            href='#trabalhos'
                            iconCTA={
                                <ArrowRight className='w-4 h-4 text-white' />
                            }
                        />
                    </div>
                </div>

                {/* Lado Direito - Imagem do Jesse */}
                <div className='div-imagem  w-full h-full lg:w-1/2  flex justify-cecnter lg:justify-center  items-end relative '>
                    <img
                        src='/jesse.png'
                        alt='Jesse Rodrigues'
                        className='h-full max-w-90 sm:max-w-115 lg:max-w-[1800px] mx-auto pointer-events-none select-none'
                    />
                </div>
            </div>
        </section>
    );
};

// MarqueeSection
const MarqueeSection = ({ reverse = false }) => {
    return (
        <Marquee reverse={reverse}>
            <li>Desenvolvimento de sistemas</li>
            <li>Gestão de projetos</li>
            <li>Automações</li>
            <li>Negócios</li>
            <li>Criação de sites</li>
            <li>Soluções digitais</li>
            <li>APIs e integrações</li>
            <li>Landing pages</li>
            <li>Full-stack</li>
            <li>Otimização de performance</li>
        </Marquee>
    );
};

const SobreMimSection = () => {
    return (
        <section id='sobre-mim' className=' w-full  py-30'>
            <div className='mx-auto content-section flex-col flex  lg:grid grid-cols-2   items-center justify-between gap-8 lg:flex-row lg:gap-12'>
                <div className='div-img relative overflow-hidden rounded-2xl border border-[#b24eff] bg-[#100813] p-1 h-full reveal'>
                    <img
                        src='/jesse.png'
                        alt='Jesse Rodrigues'
                        className='h-full w-full object-cover'
                    />
                </div>

                <div className='w-full '>
                    <div className='reveal'>
                        <Badge textoBadge='Sobre mim' />
                    </div>

                    <h2 className='reveal' style={{ "--reveal-i": 1 }}>
                        <span className='block'>
                            Desenvolvimento, automação e tecnologia aplicados a
                            <strong> problemas reais.</strong>
                        </span>
                    </h2>

                    <div
                        className='mt-6 space-y-5 text-base leading-snug text-zinc-200 sm:text-lg reveal'
                        style={{ "--reveal-i": 2 }}
                    >
                        <p>
                            Sou um profissional versátil, com experiência em
                            tecnologia, administração e design. Ao longo da
                            minha trajetória, desenvolvi mais de 200 projetos e
                            adquiri experiência com sistemas, sites, soluções
                            digitais, design, atendimento e organização de
                            processos.
                        </p>

                        <p>
                            Minha principal característica é a capacidade de
                            aprender e me adaptar rapidamente a diferentes
                            ambientes e desafios. Combino conhecimentos de
                            tecnologia e experiência administrativa para
                            encontrar soluções práticas, organizar processos e
                            tornar as atividades mais eficientes.
                        </p>

                        <p>
                            Busco oportunidades em que possa contribuir com
                            minhas diferentes habilidades, continuar aprendendo
                            e assumir novos desafios.
                        </p>
                    </div>

                    <div
                        className='mt-8 flex flex-wrap items-center gap-4 sm:gap-5 reveal'
                        style={{ "--reveal-i": 3 }}
                    >
                        <Botao>Meus trabalhos</Botao>
                        <Botao tipoBotao='secundario'>Mais sobre mim</Botao>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Portfólio — mesma seção da Web iNexus (Badge + h2 + GaleriaProjetos)
const PortfolioSection = () => {
    return (
        <section
            id='trabalhos'
            className='content-section py-20 lg:py-28 text-center'
        >
            <div className='max-w-2xl mx-auto reveal'>
                <Badge textoBadge='Portfólio' className='justify-center' />
                <h2 className='mb-4'>Alguns dos trabalhos</h2>
                <p className='text-gray-400 mb-8'>
                    Uma amostra do que já construí. Cada projeto, um negócio
                    real com um problema real resolvido.
                </p>
            </div>

            <GaleriaProjetos />
        </section>
    );
};
