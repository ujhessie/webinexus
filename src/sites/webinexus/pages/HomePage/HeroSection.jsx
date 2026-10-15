import { Badge } from "../../../../componentes/ui/Badge/Badge";
import { Botao } from "../../../../componentes/ui/Botao/Botao";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export const HeroSection = () => {
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
            <div className='absolute -top-32 -left-24 w-96 h-96 bg-roxo-principal/20 rounded-full blur-3xl pointer-events-none z-0' />
    
            <div className='content-section relative z-10'>
                <div className='max-w- mx-auto text-center flex flex-col items-center'>
                    <Badge textoBadge='CONHEÇA A WEB INEXUS' />

                    <h1 className='text-3xl uppercase sm:text-5xl lg:text-6xl font-bold font-titulo leading-[1.1] tracking-tight text-white mt-2 mb-6'>
                        Criamos soluções digitais para quem{" "}<br/>
                        <span className='text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-roxo-principal to-roxo-claro'>
                            não aceita ficar para trás.
                        </span>
                    </h1>

                    <p className='font-corpo text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mb-10'>
                        Somos um estúdio de engenharia e design digital focado
                        em gerar autoridade e conversão. Combinamos estratégia
                        de negócios, interfaces memoráveis e tecnologia de alta
                        performance para fazer sua marca evoluir.
                    </p>

                    <div className='flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto'>
                        <Botao
                            href='https://wa.me/5500000000000'
                            target='_blank'
                            rel='noopener noreferrer'
                            iconCTA={
                                <ArrowRight className='w-5 h-5 text-white' />
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
