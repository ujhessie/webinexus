import { Badge } from "../../../../componentes/ui/Badge/Badge";
import { Botao } from "../../../../componentes/ui/Botao/Botao";
import { FaWhatsapp } from "react-icons/fa";

export const HeroSection = () => {
    const metricas = [
        { valor: "+5 anos", rotulo: "de experiência com a web" },
        { valor: "100%", rotulo: "soluções personalizadas" },
        { valor: "24h", rotulo: "retorno em até um dia útil" },
        { valor: "No prazo", rotulo: "entregas dentro do combinado" },
    ];

    return (
        <section className='relative pt-24 pb-20 lg:pt-32 lg:pb-28 bg-[url(/bg.png)] bg-cover bg-center'>
            {/* Véu escuro sobre a foto de fundo */}
            <div className='scrim absolute inset-0 z-0' />

            <div className='content-section relative z-10'>
                <div className='max-w-6xl mx-auto text-center flex flex-col items-center'>
                    <div className='reveal'>
                        <Badge textoBadge='SOLUÇÕES DIGITAIS PARA O SEU NEGÓCIO' />
                    </div>

                    <h1
                        className='text-3xl uppercase sm:text-5xl lg:text-6xl font-bold font-titulo leading-[1.1] tracking-tight text-white mt-2 mb-6 reveal'
                        style={{ "--reveal-i": 1 }}
                    >
                        Soluções digitais que{" "}
                        <span className='grad-texto-hero'>
                            trabalham pelo seu negócio.
                        </span>{" "}
                        Não o contrário.
                    </h1>

                    <p
                        className='font-corpo text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mb-10 reveal'
                        style={{ "--reveal-i": 2 }}
                    >
                        Desenvolvemos soluções para negócios que querem crescer
                        na internet — do site à ferramenta que organiza o seu
                        dia a dia. Seu negócio fica fácil de achar, passa mais
                        credibilidade e você para de perder cliente na bagunça
                        do WhatsApp.
                    </p>

                    <div
                        className='flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto reveal'
                        style={{ "--reveal-i": 3 }}
                    >
                        <Botao
                            href='https://wa.me/5598988740103'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Quero uma solução pro meu negócio — abre o WhatsApp'
                            iconCTA={<FaWhatsapp className='w-4 h-4' />}
                        >
                            QUERO UMA SOLUÇÃO PRO MEU NEGÓCIO
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

                {/* Métricas */}
                <div className='mt-16 sm:mt-20 pt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
                    {metricas.map((item, idx) => (
                        <div
                            key={item.valor}
                            className='reveal flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.02] transition-colors duration-300 hover:bg-white/[0.05]'
                            style={{ "--reveal-i": idx }}
                        >
                            <span className='tabular font-titulo font-bold text-3xl sm:text-4xl lg:text-5xl grad-texto-metrica mb-2'>
                                {item.valor}
                            </span>
                            <span className='font-corpo text-sm text-gray-300 max-w-[180px]'>
                                {item.rotulo}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
