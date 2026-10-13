import { Badge } from "../../../../componentes/ui/Badge/Badge";
import { GaleriaProjetos } from "../../../../componentes/layout/GaleriaProjetos/GaleriaProjetos";
import { CheckCircle2, ArrowRight, Users, Target, Rocket } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Botao } from "../../../../componentes/ui/Botao/Botao";
import { Marquee } from "../../../../componentes/ui/Marquee/Marquee";

export const HomePage = () => {
    return (
        <>
            <HeroSection />
            <MarqueeSection />
            <QuemSomosSection />
            <PorQueEscolherSection />
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
            <ul className='my-6 grid grid-cols-2 items-start gap-2'>
                {lista.map((item, index) => (
                    <li
                        key={index}
                        className='flex items-start gap-3 text-gray-200'
                    >
                        <CheckCircle2 className='w-5 h-5 text-purple-500 shrink-0' />
                        <span className='text-[12px] lg:text-[16px] font-titulo'>
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <section className="bg-[url('/bg.png')] bg-cover bg-center relative overflow-hidden  flex items-center">
            {/* Gradiente de fundo */}
            <div className='gradiente-bg bg-linear-to-r from-preto-escuro via-preto-escuro/90 to-preto-escuro/40 absolute w-full h-full inset-0 z-0'></div>

            <div className='content-section relative py-20 pt-32 lg:py-24 z-10 container mx-auto '>
                <div className='grid lg:w-1/2 gap-12 items-center  '>
                    <div className='div-text flex flex-col items-start'>
                        <Badge />

                        <h1 className='text-[38px] sm:text-[48px] lg:text-6xl font-bold '>
                            MOSTRE PARA O MUNDO O QUE{" "}
                            <span className='text-transparent bg-clip-text bg-linear-to-r from-roxo-escuro to-roxo-principal '>
                                VOCÊ CONSTRUIU.
                            </span>
                        </h1>

                        <p className='text-gray-300 mt-4 text-[14px] lg:text-[20px] leading-snug font-regular'>
                            Sua empresa merece ser vista, lembrada e escolhida.{" "}
                            <strong className='text-roxo-claro'>
                                Criamos experiências digitais, marcas e soluções
                                que valorizam o que você construiu{" "}
                            </strong>
                            e ajudam seu negócio a ocupar o espaço que merece no
                            mercado.
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

                        <p className='text-xs sm:text-sm text-gray-400 mt-4 max-w-md font-medium'>
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

const QuemSomosSection = () => {
    const diferenciais = [
        "Estratégia de negócio antes de qualquer linha de código",
        "Cada projeto construído sob medida, sem soluções prontas",
        "Design e tecnologia focados em conversão e autoridade",
    ];

    const metricas = [
        { valor: "+50", rotulo: "Projetos entregues" },
        { valor: "5+", rotulo: "Anos de experiência" },
        { valor: "100%", rotulo: "Soluções personalizadas" },
        { valor: "99%", rotulo: "Clientes satisfeitos" },
    ];

    const pilares = [
        { icone: Users, texto: "Atendimento próximo" },
        { icone: Target, texto: "Foco em resultado" },
        { icone: Rocket, texto: "Entrega ágil" },
    ];

    return (
        <section className='relative overflow-hidden bg-preto-fosco py-20 lg:py-28'>
            {/* Brilho decorativo de fundo */}
            <div className='absolute -top-24 -right-24 w-96 h-96 bg-roxo-principal/10 rounded-full blur-3xl pointer-events-none' />

            <div className='content-section relative z-10'>
                <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                    {/* Coluna Texto */}
                    <div className='flex flex-col items-start'>
                        <Badge textoBadge='QUEM SOMOS' />

                        <h2 className='font-bold text-white leading-[1.15] mb-6'>
                            Mais que um estúdio digital,{" "}
                            <strong>um parceiro do seu crescimento.</strong>
                        </h2>

                        <p className='font-corpo text-gray-300 text-sm sm:text-base leading-relaxed mb-6'>
                            A Web iNexus une estratégia, design e tecnologia
                            para transformar ideias em soluções digitais que
                            geram resultado. Não entregamos templates: criamos
                            projetos únicos, pensados para valorizar o que você
                            construiu e colocar sua marca no espaço que ela
                            merece.
                        </p>

                        <ul className='flex flex-col gap-3 mb-8'>
                            {diferenciais.map((item, index) => (
                                <li
                                    key={index}
                                    className='flex items-start gap-3'
                                >
                                    <CheckCircle2 className='w-5 h-5 text-roxo-principal shrink-0 mt-0.5' />
                                    <span className='font-corpo text-gray-200 text-sm sm:text-base'>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className='flex flex-wrap items-center gap-3'>
                            <Botao
                                href='/quem-somos'
                                iconCTA={
                                    <ArrowRight className='w-5 h-5 text-white' />
                                }
                            >
                                CONHEÇA A WEB INEXUS
                            </Botao>

                            {pilares.map((pilar, index) => {
                                const Icone = pilar.icone;
                                return (
                                    <span
                                        key={index}
                                        className='hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300 font-titulo'
                                    >
                                        <Icone className='w-4 h-4 text-roxo-claro' />
                                        {pilar.texto}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Coluna Métricas */}
                    <div className='grid grid-cols-2 gap-4 sm:gap-6'>
                        {metricas.map((metrica, index) => (
                            <div
                                key={index}
                                className='p-6 sm:p-8 rounded-3xl bg-preto-escuro border border-white/5 hover:border-roxo-principal/50 transition-all duration-300 flex flex-col gap-2'
                            >
                                <span className='font-titulo font-bold text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-linear-to-r from-roxo-claro to-roxo-principal'>
                                    {metrica.valor}
                                </span>
                                <span className='font-corpo text-xs sm:text-sm text-gray-400'>
                                    {metrica.rotulo}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CARDS_DIFERENCIAIS = [
    {
        id: "personalizado",
        titulo: "Projeto totalmente personalizado",
        conteudo: (
            <>
                Nada de soluções prontas. Criamos{" "}
                <strong className='font-bold text-neutral-900'>
                    cada projeto pensando no seu negócio
                </strong>
                , no seu público e no que você realmente precisa.
            </>
        ),
    },
    {
        id: "compromisso",
        titulo: "Compromisso com cada projeto",
        conteudo: (
            <>
                <strong className='font-bold text-neutral-900'>
                    A gente acompanha tudo de perto
                </strong>
                , do primeiro contato até a entrega, para transformar sua ideia
                em um resultado que você realmente goste.
            </>
        ),
    },
    {
        id: "estrategia",
        titulo: "Estratégia antes de execução",
        conteudo: (
            <>
                <strong className='font-bold text-neutral-900'>
                    Antes de criar, entendemos o problema
                </strong>
                . Assim, cada escolha de design e tecnologia tem um propósito
                claro.
            </>
        ),
    },
    {
        id: "transparencia",
        titulo: "Transparência em cada etapa",
        conteudo: (
            <>
                <strong className='font-bold text-neutral-900'>
                    Você acompanha cada etapa do projeto
                </strong>{" "}
                com clareza, sem ficar no escuro sobre decisões, prazos ou
                próximos passos.
            </>
        ),
    },
    {
        id: "parceria",
        titulo: "Parceria além da entrega",
        conteudo: (
            <>
                Nosso trabalho não termina quando o projeto vai ao ar.{" "}
                <strong className='font-bold text-neutral-900'>
                    Seguimos por perto para ajudar
                </strong>
                , ajustar e fazer a solução evoluir.
            </>
        ),
    },
];

export const PorQueEscolherSection = () => {
    return (
        <section className='bg-linear-to-b from-[#7818e3] via-[#7d1de6] to-[#8722ea] text-white py-20 lg:py-28 relative'>
            <div className='content-section'>
                <div className='flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative'>
                    {/* Coluna Esquerda: Fixo no scroll desktop */}
                    <div className='w-full lg:w-5/12 lg:sticky lg:top-32 self-start flex flex-col items-start pr-0 lg:pr-6'>
                        <Badge
                            variante='branco'
                            uppercase={false}
                            textoBadge='Para quem quer ir além!'
                        />

                        <h2 className='font-bold text-white leading-[1.12] mb-8 uppercase'>
                            Por que escolher a Web iNexus para o seu projeto?
                        </h2>

                        <Botao
                            tipoBotao='branco'
                            href='https://wa.me/5500000000000'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='w-full sm:w-auto text-[#7818e3] hover:text-[#6a12ce]'
                            iconCTA={
                                <ArrowRight className='w-4 h-4 text-white' />
                            }
                        >
                            <FaWhatsapp className='w-5 h-5 text-[#7818e3] shrink-0' />
                            <span>QUERO EVOLUIR MEU NEGÓCIO</span>
                        </Botao>
                    </div>

                    {/* Coluna Direita: Cards Magnéticos Empilháveis */}
                    <div className='w-full lg:w-7/12 flex flex-col gap-6 lg:gap-8 pb-12 lg:pb-24'>
                        {CARDS_DIFERENCIAIS.map((card, index) => (
                            <div
                                key={card.id}
                                className='sticky card-stack-item bg-white rounded-xl sm:rounded-2xl p-7 sm:p-9 lg:p-10 shadow-xl shadow-black/20  border border-white/80 transition-all duration-300   '
                                style={{
                                    "--card-index": index,
                                    zIndex: 10 + index,
                                }}
                            >
                                <div className='textos '>
                                    <h3 className='font-titulo  font-bold text-xl sm:text-2xl lg:text-2xl text-roxo-principal mb-3 sm:mb-4 leading-snug uppercase'>
                                        {card.titulo}
                                    </h3>
                                    <p className='font-corpo text-neutral-600 text-sm sm:text-base leading-relaxed'>
                                        {card.conteudo}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const PortfolioSection = () => {
    return (
        <section>
            <div className='content-section py-20'>
                <div className='text-center'>
                    <Badge textoBadge='Portfólio' />
                    <h2>Alguns dos nossos trabalhos</h2>
                    <p className='mb-8'>
                        Alguns dos projetos que mostram o que somos capazes de
                        fazer.
                    </p>
                    <div className='mobile lg:hidden'>
                        <GaleriaProjetos limite={4} />
                    </div>
                    <div className='desktop hidden lg:block'>
                        <GaleriaProjetos limite={6} />
                    </div>
                </div>
            </div>
        </section>
    );
};
