import { Link } from "react-router-dom";
import { Badge } from "../../../componentes/ui/Badge/Badge";
import { Botao } from "../../../componentes/ui/Botao/Botao";
import { Marquee } from "../../../componentes/ui/Marquee/Marquee";
import {
    Sparkles,
    Target,
    Zap,
    ShieldCheck,
    HeartHandshake,
    CheckCircle2,
    ArrowRight,
    Code2,
    Layers,
    Rocket,
    Clock,
    Users,
} from "lucide-react";
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

export const QuemSomosPage = () => {
    return (
        <div className='w-full overflow-hidden'>
            <HeroQuemSomos />
            <MarqueeValores />
            <HistoriaSecao />
            <PilaresSecao />
            <ProcessoSecao />
            <EquipeSecao />
            <CTAQuemSomos />
        </div>
    );
};

/* =========================================================================
   1. HERO SECTION
   ========================================================================= */
const HeroQuemSomos = () => {
    const metricas = [
        { valor: "+50", rotulo: "Projetos entregues com excelência" },
        { valor: "100%", rotulo: "Projetos construídos sob medida" },
        { valor: "99%", rotulo: "Índice de aprovação dos clientes" },
        { valor: "5+", rotulo: "Anos de experiência em tecnologia" },
    ];

    return (
        <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-[url('/bg.png')] bg-cover bg-center">
            {/* Overlay gradiente escuro de fundo */}
            <div className='absolute inset-0 bg-linear-to-b from-preto-escuro/90 via-preto-escuro/95 to-preto-escuro z-0' />

            <div className='content-section relative z-10'>
                <div className='max-w-3xl mx-auto text-center flex flex-col items-center'>
                    <Badge textoBadge='CONHEÇA A WEB INEXUS' />

                    <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold font-titulo leading-[1.1] tracking-tight text-white mt-2 mb-6'>
                        Criamos soluções digitais para quem{" "}
                        <span className='text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-roxo-principal to-roxo-claro'>
                            não aceita ficar para trás.
                        </span>
                    </h1>

                    <p className='font-corpo text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mb-10'>
                        Somos um estúdio de engenharia e design digital focado em
                        gerar autoridade e conversão. Combinamos estratégia de
                        negócios, interfaces memoráveis e tecnologia de alta
                        performance para fazer sua marca evoluir.
                    </p>

                    <div className='flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto'>
                        <Botao
                            href='https://wa.me/5500000000000'
                            target='_blank'
                            rel='noopener noreferrer'
                            iconCTA={
                                <ArrowRight className='w-4 h-4 text-white' />
                            }
                        >
                            <FaWhatsapp className='w-5 h-5 text-white shrink-0' />
                            <span>FALAR COM UM ESPECIALISTA</span>
                        </Botao>
                        <Botao
                            tipoBotao='outline'
                            href='/portfolio'
                            className='border-white/20 text-white hover:bg-white/10'
                        >
                            VER NOSSOS TRABALHOS
                        </Botao>
                    </div>
                </div>

                {/* Métricas e Estatísticas */}
                <div className='mt-16 sm:mt-20 pt-12 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
                    {metricas.map((item, idx) => (
                        <div
                            key={idx}
                            className='flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xs'
                        >
                            <span className='font-titulo font-bold text-3xl sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-linear-to-r from-white via-purple-200 to-roxo-claro mb-2'>
                                {item.valor}
                            </span>
                            <span className='font-corpo text-xs sm:text-sm text-gray-400 max-w-[180px]'>
                                {item.rotulo}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* =========================================================================
   2. MARQUEE DE VALORES
   ========================================================================= */
const MarqueeValores = () => {
    return (
        <section className='bg-linear-to-r from-roxo-escuro to-roxo-principal py-1'>
            <Marquee reverse={true}>
                <li>Estratégia Digital</li>
                <li>Design de Alto Nível</li>
                <li>Performance Extrema</li>
                <li>Arquitetura Escalável</li>
                <li>Soluções Sob Medida</li>
                <li>Foco em Conversão</li>
                <li>Parceria de Longo Prazo</li>
                <li>Inovação Sem Rodeios</li>
            </Marquee>
        </section>
    );
};

/* =========================================================================
   3. NOSSA HISTÓRIA & MANIFESTO
   ========================================================================= */
const HistoriaSecao = () => {
    return (
        <section className='py-20 lg:py-28 bg-preto-escuro relative'>
            <div className='content-section'>
                <div className='grid lg:grid-cols-12 gap-12 lg:gap-16 items-center'>
                    {/* Coluna Visual / Imagem Conceitual */}
                    <div className='lg:col-span-5 relative'>
                        <div className='relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group'>
                            <img
                                src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80'
                                alt='Equipe Web iNexus desenvolvendo soluções digitais'
                                className='w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700'
                            />
                            {/* Overlay escuro com toque roxo */}
                            <div className='absolute inset-0 bg-linear-to-t from-preto-escuro via-preto-escuro/40 to-transparent' />

                            {/* Card Flutuante com Slogan */}
                            <div className='absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-preto-fosco/90 border border-white/15 backdrop-blur-md shadow-xl'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <div className='w-3 h-3 rounded-full bg-roxo-principal animate-pulse' />
                                    <span className='font-titulo font-bold text-xs uppercase tracking-wider text-purple-300'>
                                        Manifesto Web iNexus
                                    </span>
                                </div>
                                <p className='font-corpo text-sm text-gray-200 leading-snug'>
                                    &ldquo;Não criamos apenas sites; construímos
                                    plataformas que valorizam o que você
                                    construiu.&rdquo;
                                </p>
                            </div>
                        </div>

                        {/* Brilho decorativo no fundo */}
                        <div className='absolute -bottom-10 -left-10 w-60 h-60 bg-roxo-principal/20 rounded-full blur-3xl pointer-events-none' />
                    </div>

                    {/* Coluna Texto / Narrativa */}
                    <div className='lg:col-span-7 flex flex-col items-start'>
                        <Badge textoBadge='NOSSA TRAJETÓRIA' />

                        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-titulo leading-[1.15] text-white mb-6'>
                            Nascemos para romper o padrão das{" "}
                            <span className='text-transparent bg-clip-text bg-linear-to-r from-roxo-claro to-roxo-principal'>
                                soluções genéricas.
                            </span>
                        </h2>

                        <div className='space-y-4 font-corpo text-gray-300 text-sm sm:text-base leading-relaxed'>
                            <p>
                                Percebemos que o mercado estava saturado de
                                soluções feitas às pressas: templates lentos,
                                cópias superficiais e plataformas que não
                                refletiam a real grandeza dos negócios por trás
                                delas.
                            </p>
                            <p>
                                A{" "}
                                <strong className='text-white font-semibold'>
                                    Web iNexus
                                </strong>{" "}
                                foi fundada para ser a antítese disso. Desde o
                                primeiro dia, nosso compromisso é tratar cada
                                projeto com singularidade. Investigamos a fundo
                                as necessidades do cliente, o perfil do seu
                                consumidor e os objetivos reais de conversão.
                            </p>
                            <p>
                                Seja no desenvolvimento de um sistema complexo,
                                em uma landing page de alta conversão ou na
                                reformulação de uma identidade visual, unimos
                                rigor técnico e sensibilidade estética em cada
                                detalhe.
                            </p>
                        </div>

                        <div className='mt-8 p-5 rounded-2xl bg-white/[0.03] border-l-4 border-roxo-principal border-y border-r border-white/5'>
                            <p className='font-titulo text-sm sm:text-base text-gray-200 font-medium italic'>
                                &ldquo;Nosso trabalho não é medido por linhas de
                                código entregues, mas pelo impacto e pelo
                                crescimento sustentável que levamos aos nossos
                                parceiros.&rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* =========================================================================
   4. NOSSOS PILARES / VALORES
   ========================================================================= */
const PilaresSecao = () => {
    const pilares = [
        {
            icone: Target,
            titulo: "Estratégia antes de Execução",
            descricao:
                "Nenhuma linha de código ou escolha visual é feita por acaso. Entendemos o modelo de negócio para desenhar caminhos que realmente trazem retorno.",
        },
        {
            icone: Zap,
            titulo: "Performance sem Atalhos",
            descricao:
                "Sistemas rápidos, código modular limpo, carregamento quase instantâneo e total responsividade para que seu cliente tenha a melhor experiência em qualquer dispositivo.",
        },
        {
            icone: ShieldCheck,
            titulo: "Transparência Absoluta",
            descricao:
                "Você participa e acompanha cada avanço com clareza. Prazos combinados, escopos bem definidos e comunicação constante sem termos técnicos desnecessários.",
        },
        {
            icone: HeartHandshake,
            titulo: "Parceria além da Entrega",
            descricao:
                "Não abandonamos o projeto após o deploy. Continuamos presentes para evoluir sua solução, dar suporte contínuo e acompanhar o crescimento do seu negócio.",
        },
    ];

    return (
        <section className='py-20 lg:py-28 bg-[#0a0a14] relative'>
            <div className='content-section'>
                <div className='text-center max-w-2xl mx-auto mb-16'>
                    <Badge textoBadge='NOSSOS PILARES' />
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-titulo leading-tight text-white mb-4'>
                        Os princípios que guiam cada{" "}
                        <span className='text-transparent bg-clip-text bg-linear-to-r from-roxo-claro to-roxo-principal'>
                            entrega da Web iNexus
                        </span>
                    </h2>
                    <p className='font-corpo text-sm sm:text-base text-gray-400'>
                        Fundamentos sólidos que garantem qualidade técnica,
                        consistência visual e tranquilidade para o seu negócio.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
                    {pilares.map((pilar, index) => {
                        const Icone = pilar.icone;
                        return (
                            <div
                                key={index}
                                className='p-8 sm:p-10 rounded-3xl bg-preto-fosco border border-white/5 hover:border-roxo-principal/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl shadow-black/20 relative overflow-hidden'
                            >
                                <div className='w-14 h-14 rounded-2xl bg-linear-to-br from-roxo-escuro to-roxo-principal flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-900/30 group-hover:scale-110 transition-transform'>
                                    <Icone className='w-7 h-7' />
                                </div>

                                <h3 className='font-titulo font-bold text-xl sm:text-2xl text-white mb-3'>
                                    {pilar.titulo}
                                </h3>

                                <p className='font-corpo text-sm sm:text-base text-gray-400 leading-relaxed'>
                                    {pilar.descricao}
                                </p>

                                <div className='absolute top-0 right-0 w-32 h-32 bg-roxo-principal/5 rounded-full blur-2xl group-hover:bg-roxo-principal/15 transition-all pointer-events-none' />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

/* =========================================================================
   5. NOSSO PROCESSO DE TRABALHO
   ========================================================================= */
const ProcessoSecao = () => {
    const etapas = [
        {
            passo: "01",
            titulo: "Diagnóstico & Imersão",
            descricao:
                "Compreendemos o seu modelo de negócio, suas dores, o público-alvo e os diferenciais que precisam ser exaltados.",
        },
        {
            passo: "02",
            titulo: "Design UI/UX & Arquitetura",
            descricao:
                "Planejamos a jornada do usuário e criamos layouts modernos com alto apelo visual, focados em clareza e conversão.",
        },
        {
            passo: "03",
            titulo: "Desenvolvimento & Integrações",
            descricao:
                "Escrevemos código moderno, modular e ultra veloz. Integramos APIs, gateways de pagamento e automações necessárias.",
        },
        {
            passo: "04",
            titulo: "Homologação & Lançamento",
            descricao:
                "Testes minuciosos em múltiplos dispositivos, configuração de domínio, SEO e acompanhamento pós-lançamento.",
        },
    ];

    return (
        <section className='py-20 lg:py-28 bg-preto-escuro relative'>
            <div className='content-section'>
                <div className='text-center max-w-2xl mx-auto mb-16'>
                    <Badge textoBadge='COMO ATUAMOS' />
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-titulo leading-tight text-white mb-4'>
                        Do primeiro contato ao{" "}
                        <span className='text-transparent bg-clip-text bg-linear-to-r from-roxo-claro to-roxo-principal'>
                            lançamento oficial
                        </span>
                    </h2>
                    <p className='font-corpo text-sm sm:text-base text-gray-400'>
                        Um método estruturado para transformar objetivos em
                        resultados tangíveis, sem estresse e sem atrasos.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative'>
                    {etapas.map((etapa, idx) => (
                        <div
                            key={idx}
                            className='p-7 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between'
                        >
                            <div>
                                <span className='font-titulo font-black text-4xl sm:text-5xl text-purple-500/25 block mb-4'>
                                    {etapa.passo}
                                </span>
                                <h3 className='font-titulo font-bold text-lg sm:text-xl text-white mb-3'>
                                    {etapa.titulo}
                                </h3>
                                <p className='font-corpo text-xs sm:text-sm text-gray-400 leading-relaxed'>
                                    {etapa.descricao}
                                </p>
                            </div>

                            <div className='mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-roxo-claro text-xs font-semibold uppercase tracking-wider'>
                                <span>Etapa Concluída</span>
                                <CheckCircle2 className='w-4 h-4' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* =========================================================================
   6. EQUIPE / QUEM ESTÁ POR TRÁS
   ========================================================================= */
const EquipeSecao = () => {
    const time = [
        {
            nome: "Especialista em Engenharia",
            funcao: "Tech Lead & Full-Stack",
            bio: "Arquitetura escalável, automações robustas e integrações completas com foco em velocidade e segurança.",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        },
        {
            nome: "Especialista em Produto & UI",
            funcao: "UI/UX & Creative Director",
            bio: "Criação de identidades visuais memoráveis, interfaces intuitivas e experiências com forte apelo estético.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        },
        {
            nome: "Especialista em Estratégia",
            funcao: "Growth & Performance",
            bio: "Otimização de conversão, posicionamento de mercado e estruturação de jornada de compra eficiente.",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        },
    ];

    return (
        <section className='py-20 lg:py-28 bg-[#0a0a14] relative'>
            <div className='content-section'>
                <div className='text-center max-w-2xl mx-auto mb-16'>
                    <Badge textoBadge='NOSSO TIME' />
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-titulo leading-tight text-white mb-4'>
                        Pessoas apaixonadas por{" "}
                        <span className='text-transparent bg-clip-text bg-linear-to-r from-roxo-claro to-roxo-principal'>
                            fazer acontecer
                        </span>
                    </h2>
                    <p className='font-corpo text-sm sm:text-base text-gray-400'>
                        Uma equipe multidisciplinar que une tecnologia, arte e
                        estratégia para entregar valor real ao seu projeto.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {time.map((membro, index) => (
                        <div
                            key={index}
                            className='rounded-3xl bg-preto-fosco border border-white/5 overflow-hidden hover:border-roxo-principal/40 transition-all duration-300 group hover:-translate-y-1'
                        >
                            <div className='relative h-64 overflow-hidden'>
                                <img
                                    src={membro.avatar}
                                    alt={membro.nome}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                />
                                <div className='absolute inset-0 bg-linear-to-t from-preto-fosco via-transparent to-transparent' />
                            </div>

                            <div className='p-6'>
                                <span className='text-xs font-semibold text-roxo-claro uppercase tracking-wider block mb-1'>
                                    {membro.funcao}
                                </span>
                                <h3 className='font-titulo font-bold text-xl text-white mb-3'>
                                    {membro.nome}
                                </h3>
                                <p className='font-corpo text-xs sm:text-sm text-gray-400 leading-relaxed mb-6'>
                                    {membro.bio}
                                </p>

                                <div className='flex items-center gap-3 pt-4 border-t border-white/5'>
                                    <a
                                        href='#'
                                        className='w-8 h-8 rounded-full bg-white/5 hover:bg-roxo-principal text-gray-400 hover:text-white flex items-center justify-center transition-colors'
                                        title='LinkedIn'
                                    >
                                        <FaLinkedinIn className='w-3.5 h-3.5' />
                                    </a>
                                    <a
                                        href='#'
                                        className='w-8 h-8 rounded-full bg-white/5 hover:bg-roxo-principal text-gray-400 hover:text-white flex items-center justify-center transition-colors'
                                        title='GitHub'
                                    >
                                        <FaGithub className='w-3.5 h-3.5' />
                                    </a>
                                    <a
                                        href='#'
                                        className='w-8 h-8 rounded-full bg-white/5 hover:bg-roxo-principal text-gray-400 hover:text-white flex items-center justify-center transition-colors'
                                        title='Instagram'
                                    >
                                        <FaInstagram className='w-3.5 h-3.5' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* =========================================================================
   7. CTA FINAL DA PÁGINA
   ========================================================================= */
const CTAQuemSomos = () => {
    return (
        <section className='py-20 lg:py-28 bg-preto-escuro relative'>
            <div className='content-section'>
                <div className='relative rounded-3xl sm:rounded-[36px] bg-linear-to-br from-roxo-escuro via-[#6a15ca] to-[#8d23ea] p-8 sm:p-14 lg:p-16 text-center overflow-hidden shadow-2xl'>
                    {/* Elementos decorativos de fundo */}
                    <div className='absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none' />
                    <div className='absolute -bottom-24 -right-24 w-72 h-72 bg-black/30 rounded-full blur-3xl pointer-events-none' />

                    <div className='relative z-10 max-w-2xl mx-auto flex flex-col items-center'>
                        <Badge
                            variante='branco'
                            uppercase={false}
                            textoBadge='Vamos construir juntos'
                        />

                        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold font-titulo leading-[1.15] text-white mt-2 mb-6'>
                            Pronto para colocar sua marca em outro patamar?
                        </h2>

                        <p className='font-corpo text-sm sm:text-base text-white/90 leading-relaxed mb-8 max-w-xl'>
                            Conte-nos sobre o seu projeto ou sua ideia. Nossa
                            equipe está pronta para entender suas necessidades e
                            traçar o plano ideal de execução.
                        </p>

                        <Botao
                            tipoBotao='branco'
                            href='https://wa.me/5500000000000'
                            target='_blank'
                            rel='noopener noreferrer'
                            iconCTA={
                                <ArrowRight className='w-4 h-4 text-white' />
                            }
                            className='w-full sm:w-auto text-[#7b1fe1] hover:text-[#6510c4]'
                        >
                            <FaWhatsapp className='w-5 h-5 text-[#7b1fe1] shrink-0' />
                            <span>QUERO EVOLUIR MEU NEGÓCIO</span>
                        </Botao>
                    </div>
                </div>
            </div>
        </section>
    );
};

