import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../../../componentes/ui/Badge/Badge";
import { GaleriaProjetos } from "../../../../componentes/layout/GaleriaProjetos/GaleriaProjetos";
import {
    ArrowRight,
    ArrowUpRight,
    LayoutTemplate,
    MessageSquareText,
    HeartHandshake,
    MonitorSmartphone,
    Search,
    Settings2,
    Palette,
    FileText,
    Code2,
    Rocket,
    ChevronDown,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Botao } from "../../../../componentes/ui/Botao/Botao";
import { Marquee } from "../../../../componentes/ui/Marquee/Marquee";
import { HeroSection } from "./HeroSection";
import { CTAQuemSomos } from "../../../../componentes/Compartilhados";

export const HomePage = () => {
    return (
        <>
            <HeroSection />
            <MarqueeSection />
            <QuemSomosSection />
            <OQueOferecemosSection />
            <ComoFuncionaSection />
            <PorQueEscolherSection />
            <MarqueeSection reverse />
            <PortfolioSection />
            <FaqSection />
            <CTAQuemSomos />
        </>
    );
};

const MarqueeSection = ({ reverse = false }) => (
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

const QuemSomosSection = () => {
    const diferenciais = [
        {
            icone: LayoutTemplate,
            titulo: "Projeto personalizado para o seu negócio",
        },
        {
            icone: MessageSquareText,
            titulo: "Comunicação clara, sem termos técnicos",
        },
        {
            icone: HeartHandshake,
            titulo: "Acompanhamento do início ao fim",
        },
    ];

    return (
        <section className='relative overflow-hidden bg-preto-fosco py-20 lg:py-28'>
            {/* Brilho decorativo de fundo */}
            <div className='absolute -top-24 -right-24 w-96 h-96 bg-roxo-principal/10 blur-3xl rounded-full pointer-events-none' />

            <div className='content-section relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                {/* Coluna Texto */}
                <div>
                    <div className='reveal'>
                        <Badge textoBadge='QUEM SOMOS' />
                    </div>
                    <h2 className='mb-5 reveal' style={{ "--reveal-i": 1 }}>
                        Um parceiro que resolve —{" "}
                        <strong>e fala a sua língua.</strong>
                    </h2>
                    <p
                        className='text-gray-300 leading-relaxed mb-8 reveal'
                        style={{ "--reveal-i": 2 }}
                    >
                        A Web iNexus une estratégia, design e tecnologia para
                        construir soluções que funcionam de verdade. Há mais de
                        5 anos criamos presenças online para negócios que
                        querem crescer — sem enrolação e sem termo técnico
                        difícil. Você conta o problema, nós mostramos a solução
                        e fazemos acontecer.
                    </p>
                    <div className='reveal' style={{ "--reveal-i": 3 }}>
                        <Botao
                            href='/quem-somos'
                            iconCTA={<ArrowRight className='w-5 h-5 text-white' />}
                        >
                            CONHEÇA A WEB INEXUS
                        </Botao>
                    </div>
                </div>

                {/* Coluna Diferenciais */}
                <div className='flex flex-col gap-4'>
                    {diferenciais.map(({ icone: Icone, titulo }, i) => (
                        <div
                            key={titulo}
                            className='reveal flex items-center gap-4 p-5 rounded-2xl bg-preto-escuro hover:bg-[#101120] transition-colors duration-300'
                            style={{ "--reveal-i": i }}
                        >
                            <span className='shrink-0 w-11 h-11 rounded-xl grad-icon flex items-center justify-center'>
                                <Icone className='w-5 h-5 text-white' />
                            </span>
                            <p className='font-titulo font-semibold'>{titulo}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const SERVICOS = [
    {
        icone: MonitorSmartphone,
        titulo: "Criação de Sites",
        texto: "Sites profissionais e institucionais, feitos para valorizar o seu negócio e transformar visitantes em clientes.",
    },
    {
        icone: Search,
        titulo: "Presença no Google",
        texto: "Colocamos o seu negócio onde as pessoas procuram, para você ser encontrado antes do concorrente.",
    },
    {
        icone: Settings2,
        titulo: "Sistemas sob medida",
        texto: "Ferramentas que organizam a sua rotina: agendamentos, pedidos, automações e mais.",
    },
    {
        icone: Palette,
        titulo: "Design",
        texto: "Identidade visual e peças que dão à sua marca uma cara profissional e memorável.",
    },
];

const OQueOferecemosSection = () => (
    <section className='py-20 lg:py-28 bg-preto-escuro'>
        <div className='content-section'>
            <div className='max-w-3xl reveal'>
                <Badge textoBadge='O QUE OFERECEMOS' />
                <h2>
                    Soluções que resolvem o <strong>seu dia a dia</strong>
                </h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10'>
                {SERVICOS.map(({ icone: Icone, titulo, texto }, i) => (
                    <div
                        key={titulo}
                        className='reveal group p-6 rounded-2xl bg-preto-fosco hover:-translate-y-1 transition-[transform,background-color] duration-300 hover:bg-[#1c1d2e]'
                        style={{ "--reveal-i": i }}
                    >
                        <span className='w-12 h-12 rounded-xl bg-roxo-principal/10 text-roxo-claro flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105'>
                            <Icone className='w-6 h-6' />
                        </span>
                        <h3 className='font-titulo font-bold text-lg mb-2'>
                            {titulo}
                        </h3>
                        <p className='text-gray-300'>{texto}</p>
                    </div>
                ))}
            </div>

            <Link
                to='/servicos'
                className='reveal group mt-5 block p-6 sm:p-7 rounded-2xl grad-btn transition-colors duration-300'
            >
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <div>
                        <h3 className='text-white mb-1'>
                            Ver todos os serviços
                        </h3>
                        <p className='text-white/80 text-sm'>
                            Conheça tudo o que podemos construir para o seu
                            negócio.
                        </p>
                    </div>
                    <span className='inline-flex items-center gap-2 text-white font-titulo font-bold text-sm tracking-wider uppercase shrink-0'>
                        Explorar
                        <ArrowUpRight className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' />
                    </span>
                </div>
            </Link>
        </div>
    </section>
);

const ETAPAS = [
    {
        passo: "01", // taste-skill-ignore: numeração de etapa 01–04 é parte do design original
        icone: MessageSquareText,
        titulo: "Conversa inicial",
        texto: "Você conta o que precisa e a gente entende o seu negócio, sem complicação.",
    },
    {
        passo: "02", // taste-skill-ignore: numeração de etapa 01–04 é parte do design original
        icone: FileText,
        titulo: "Proposta clara",
        texto: "Mostramos o que vamos fazer, o prazo e o valor. Sem surpresa.",
    },
    {
        passo: "03", // taste-skill-ignore: numeração de etapa 01–04 é parte do design original
        icone: Code2,
        titulo: "Desenvolvimento",
        texto: "Mãos à obra, com você acompanhando cada etapa.",
    },
    {
        passo: "04", // taste-skill-ignore: numeração de etapa 01–04 é parte do design original
        icone: Rocket,
        titulo: "Entrega e suporte",
        texto: "Projeto no ar e a gente segue por perto pra ajustar o que for preciso.",
    },
];

const ComoFuncionaSection = () => (
    <section className='py-20 lg:py-28 bg-preto-fosco'>
        <div className='content-section'>
            <div className='text-center max-w-3xl mx-auto reveal'>
                <Badge textoBadge='COMO FUNCIONA' className='justify-center' />
                <h2>
                    Simples do <strong>começo ao fim</strong>
                </h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10'>
                {ETAPAS.map(({ passo, icone: Icone, titulo, texto }, i) => (
                    <div
                        key={passo}
                        className='reveal group p-6 rounded-2xl bg-preto-escuro hover:bg-[#0c0d1a] transition-[transform,background-color] duration-300'
                        style={{ "--reveal-i": i }}
                    >
                        <span className='tabular block font-black text-4xl text-roxo-principal/25 mb-3'>
                            {passo}
                        </span>
                        <span className='w-12 h-12 rounded-xl grad-icon flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105'>
                            <Icone className='w-6 h-6 text-white' />
                        </span>
                        <h3 className='font-titulo font-bold text-lg mb-2'>
                            {titulo}
                        </h3>
                        <p className='text-gray-300'>{texto}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CARDS_DIFERENCIAIS = [
    {
        id: "personalizado",
        titulo: "Solução personalizada pro seu negócio",
        conteudo: (
            <>
                Cada projeto é personalizado pensando no seu público e no que
                você realmente precisa.{" "}
                <strong>Nada de solução genérica.</strong>
            </>
        ),
    },
    {
        id: "acompanhamento",
        titulo: "Você acompanha tudo de perto",
        conteudo: (
            <>
                Do primeiro papo até a entrega,{" "}
                <strong>você sabe exatamente o que está acontecendo</strong>,
                sem ficar no escuro.
            </>
        ),
    },
    {
        id: "estrategia",
        titulo: "A solução vem antes do código",
        conteudo: (
            <>
                Primeiro{" "}
                <strong>entendemos o seu negócio e o seu problema</strong>. Só
                depois vem o design e o desenvolvimento.
            </>
        ),
    },
    {
        id: "prazo-preco",
        titulo: "Prazo e preço combinados, sem surpresa",
        conteudo: (
            <>
                Você sabe o que vai receber, quanto custa e quando fica pronto.{" "}
                <strong>Sem letra miúda.</strong>
            </>
        ),
    },
    {
        id: "parceria",
        titulo: "Não desaparecemos depois da entrega",
        conteudo: (
            <>
                Projeto no ar não é o fim.{" "}
                <strong>Continuamos por perto</strong> pra ajustar e ajudar seu
                negócio a crescer.
            </>
        ),
    },
];

export const PorQueEscolherSection = () => (
    <section className='grad-section text-white py-20 lg:py-28'>
        <div className='content-section flex flex-col lg:flex-row gap-10 lg:gap-14'>
            {/* Coluna Esquerda: Fixa no scroll desktop */}
            <div className='lg:w-5/12 lg:sticky lg:top-32 self-start'>
                <div className='flex justify-center lg:justify-start reveal'>
                    <Badge
                        variante='branco'
                        uppercase={false}
                        textoBadge='Para quem quer ir além!'
                    />
                </div>
                <h2 className='uppercase mb-6 reveal' style={{ "--reveal-i": 1 }}>
                    Por que escolher a Web iNexus?
                </h2>
                <div className='flex reveal' style={{ "--reveal-i": 2 }}>
                    <Botao
                        tipoBotao='branco'
                        href='https://wa.me/5598988740103'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='!text-[#7818e3]'
                        iconCTA={<FaWhatsapp className='w-4 h-4' />}
                    >
                        QUERO EVOLUIR MEU NEGÓCIO
                        <ArrowRight className='w-5 h-5' />
                    </Botao>
                </div>
            </div>

            {/* Coluna Direita: Cards Magnéticos Empilháveis */}
            <div className='lg:w-7/12 flex flex-col gap-6'>
                {CARDS_DIFERENCIAIS.map((card, index) => (
                    <article
                        key={card.id}
                        className='card-stack-item sticky sombra-pilha bg-white rounded-xl sm:rounded-2xl p-7 sm:p-9 lg:p-10' /* taste-skill-ignore: cartões da pilha "por que escolher" precisam de profundidade para empilhar */
                        style={{
                            "--card-index": index,
                            zIndex: 10 + index,
                        }}
                    >
                        <h3 className='text-roxo-principal uppercase font-bold text-xl sm:text-2xl mb-3'>
                            {card.titulo}
                        </h3>
                        <p className='text-neutral-600'>{card.conteudo}</p>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

const PortfolioSection = () => (
    <section className='content-section py-20 lg:py-28 text-center'>
        <div className='max-w-2xl mx-auto reveal'>
            <Badge textoBadge='Portfólio' className='justify-center' />
            <h2 className='mb-4'>Alguns dos trabalhos</h2>
            <p className='text-gray-400 mb-8'>
                Uma amostra do que já construímos. Cada projeto, um negócio
                real com um problema real resolvido.
            </p>
        </div>

        <div className='lg:hidden'>
            <GaleriaProjetos limite={4} />
        </div>
        <div className='hidden lg:block'>
            <GaleriaProjetos limite={6} />
        </div>

        <div className='mt-8 flex justify-center reveal'>
            <Botao href='/portfolio' tipoBotao='secundario'>
                VER TODOS OS TRABALHOS
                <ArrowRight className='w-5 h-5' />
            </Botao>
        </div>
    </section>
);

const PERGUNTAS_FREQUENTES = [
    {
        pergunta: "Quanto custa fazer um site?",
        resposta:
            "O valor depende do tamanho do projeto e do que o seu negócio precisa. Na conversa inicial a gente entende o que você quer e te entrega uma proposta clara, com preço e prazo fechados. Sem surpresa e sem taxa escondida.",
    },
    {
        pergunta: "Em quanto tempo o site fica pronto?",
        resposta:
            "Depende do projeto, mas o prazo já vem combinado na proposta — e nós cumprimos. O que não existe aqui é projeto que arrasta sem fim. Você acompanha cada etapa e sabe exatamente quando entra no ar.",
    },
    {
        pergunta: "Preciso entender de tecnologia?",
        resposta:
            "Não. Você conta o problema do seu negócio em linguagem de gente normal, e a parte técnica é com a gente. A gente que traduz tudo pra você, sem termo difícil.",
    },
    {
        pergunta: "O que eu preciso ter pronto pra começar?",
        resposta:
            "Basicamente: saber o que você quer resolver. Fotos, textos e logo — se você ainda não tiver, a gente orienta o que é necessário e ajuda a resolver.",
    },
    {
        pergunta: "Meu negócio é pequeno, vale a pena ter site?",
        resposta:
            "Vale, e é justamente quem mais precisa. Quando alguém procura um serviço perto de casa, a decisão acontece no Google. Sem presença online, é o concorrente que aparece e leva o cliente.",
    },
    {
        pergunta: "E depois que o site fica no ar?",
        resposta:
            "A gente não desaparece. Seguimos por perto pra ajustar, atualizar e acompanhar o crescimento do seu negócio. Entregar o site não é o fim da parceria.",
    },
];

const FaqSection = () => {
    const [perguntaAberta, setPerguntaAberta] = useState(0);

    return (
        <section className='py-20 lg:py-28 bg-preto-escuro'>
            <div className='content-section grid lg:grid-cols-12 gap-10'>
                {/* Coluna Texto */}
                <div className='lg:col-span-5 reveal'>
                    <Badge textoBadge='DÚVIDAS FREQUENTES' />
                    <h2 className='mb-4'>
                        O que perguntam <strong>antes de contratar.</strong>
                    </h2>
                    <p className='text-gray-400 mb-6'>
                        Transparência desde o primeiro papo. Se ficou alguma
                        dúvida que não está aqui, é só chamar no WhatsApp — a
                        gente responde.
                    </p>
                    <a
                        href='https://wa.me/5598988740103'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='button-press inline-flex items-center gap-2 text-roxo-claro hover:text-white font-titulo font-semibold transition-colors'
                    >
                        Tirar uma dúvida no WhatsApp
                        <ArrowUpRight className='w-4 h-4' />
                    </a>
                </div>

                {/* Coluna Perguntas */}
                <div className='lg:col-span-7'>
                    <div
                        className='flex flex-col' /* taste-skill-ignore: espaçamento entre itens do acordeão substitui os separadores */
                    >
                        {PERGUNTAS_FREQUENTES.map((item, index) => {
                            const estaAberta = perguntaAberta === index;
                            return (
                                <div
                                    key={index}
                                    className='rounded-2xl px-4 transition-colors duration-300 reveal'
                                    style={
                                        estaAberta
                                            ? {
                                                  backgroundColor:
                                                      "rgba(255,255,255,0.04)",
                                                  "--reveal-i": index,
                                              }
                                            : { "--reveal-i": index }
                                    }
                                >
                                    <button
                                        type='button'
                                        onClick={() =>
                                            setPerguntaAberta(
                                                estaAberta ? null : index
                                            )
                                        }
                                        aria-expanded={estaAberta}
                                        className='w-full flex justify-between items-center gap-4 py-5 text-left group'
                                    >
                                        <span
                                            className={`font-titulo font-semibold transition-colors ${
                                                estaAberta
                                                    ? "text-roxo-claro"
                                                    : "text-white group-hover:text-roxo-claro"
                                            }`}
                                        >
                                            {item.pergunta}
                                        </span>
                                        <span className='shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center'>
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-300 ${
                                                    estaAberta
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </span>
                                    </button>

                                    <div
                                        className='grid transition-[grid-template-rows] duration-300 ease-out'
                                        style={{
                                            gridTemplateRows: estaAberta
                                                ? "1fr"
                                                : "0fr",
                                        }}
                                    >
                                        <div className='overflow-hidden'>
                                            <p className='text-base text-gray-300 pr-10 pb-5'>
                                                {item.resposta}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
