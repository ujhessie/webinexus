import { Badge } from "../../../componentes/ui/Badge/Badge";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Botao } from "../../../componentes/ui/Botao/Botao";
import { Marquee } from "../../../componentes/ui/Marquee/Marquee";

export const HomePage = () => {
    return (
        <>
            <HeroSection />
            <MarqueeSection />
            <PortfolioSection />
        </>
    );
};

export const HeroSection = () => {
    const itensHero = [
        "Sites que apresentam seu negócio",
        "Sistemas que simplificam sua operação",
        "Identidade que torna sua marca reconhecida",
        "Design que valoriza cada detalhe",
    ];

    const Lista = ({ lista }) => {
        return (
            <ul className='flex flex-col gap-1 my-6'>
                {lista.map((item, index) => (
                    <li
                        key={index}
                        className='flex items-center gap-3 text-gray-200'
                    >
                        <CheckCircle2 className='w-5 h-5 text-purple-500 shrink-0' />
                        <span className='text-base'>{item}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <section className="bg-[url('/bg.png')] bg-cover bg-center relative overflow-hidden  flex items-center">
            {/* Gradiente de fundo */}
            <div className='gradiente-bg bg-linear-to-r from-preto-escuro via-preto-escuro/90 to-preto-escuro/40 absolute w-full h-full inset-0 z-0'></div>

            <div className='content-section relative py-20 lg:py-24 z-10 container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid lg:w-1/2 gap-12 items-center  '>
                    <div className='div-text flex flex-col items-start'>
                        <Badge />

                        <h1 className='text-4xl sm:text-4xl lg:text-5xl font-bold '>
                            MOSTRE PARA O MUNDO O QUE{" "}
                            <span className='text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-600'>
                                VOCÊ CONSTRUIU.
                            </span>
                        </h1>

                        <p className='text-gray-300 mt-4  lg:text-[20px] leading-snug'>
                            Sua empresa merece ser vista, lembrada e escolhida.
                            Criamos experiências digitais, marcas e soluções que
                            valorizam o que você construiu e ajudam seu negócio
                            a ocupar o espaço que merece no mercado.
                        </p>

                        <Lista lista={itensHero} />

                        <div className='w-full sm:w-auto mt-2'>
                            <Botao
                                iconCTA={
                                    <ArrowRight className='w-5 h-5 text-white' />
                                }
                                className='w-full sm:w-auto justify-center'
                            >
                                QUERO UM SITE PROFISSIONAL
                            </Botao>
                        </div>

                        <p className='text-xs sm:text-sm text-gray-400 mt-4 max-w-md'>
                            Sites, sistemas, identidades visuais e peças
                            digitais pensados para transformar sua presença e
                            fortalecer seu negócio.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const MarqueeSection = ({ reverse = false }) => {
    return (
        <section className='bg-linear-to-r from-roxo-escuro to-roxo-principal'>
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
        </section>
    );
};

const PortfolioSection = () => {
    return <>Portfolio Section</>;
};
