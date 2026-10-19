import { Badge } from "../../../../componentes/ui/Badge/Badge";
import { GaleriaProjetos } from "../../../../componentes/layout/GaleriaProjetos/GaleriaProjetos";
import { CTAQuemSomos } from "../../../../componentes/Compartilhados";
import { SlidersHorizontal } from "lucide-react";

export const PortfolioPage = () => {
    return (
        <>
            <HeroTrabalhos />
            <GaleriaSecao />
            <CTAQuemSomos />
        </>
    );
};

/* =========================================================================
   1. HERO DA PÁGINA
   ========================================================================= */
const HeroTrabalhos = () => {
    return (
        <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16 bg-[url(/bg.png)] bg-cover bg-center">
            <div className='scrim absolute inset-0' />

            <div className='content-section relative'>
                <div className='flex flex-col items-start'>
                    <div className='reveal'>
                        <Badge textoBadge='NOSSOS TRABALHOS' />
                    </div>

                    <h1
                        className='text-3xl sm:text-5xl lg:text-6xl font-bold font-titulo leading-[1.1] tracking-tight text-white mt-2 mb-6 max-w-3xl reveal'
                        style={{ "--reveal-i": 1 }}
                    >
                        Projetos{" "}
                        <span className='grad-texto-hero'>sob medida</span>,
                        do problema à entrega.
                    </h1>

                    <p
                        className='font-corpo text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mb-6 reveal'
                        style={{ "--reveal-i": 2 }}
                    >
                        Sites, sistemas, automações e peças de design criados
                        para negócios reais. Use os filtros para navegar por
                        área e abra qualquer card para ver o contexto completo
                        de cada projeto.
                    </p>

                    <span
                        className='reveal inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 font-corpo text-xs text-gray-400'
                        style={{ "--reveal-i": 3 }}
                    >
                        <SlidersHorizontal className='w-4 h-4 text-roxo-claro shrink-0' />
                        Filtre por Sites &amp; Sistemas, Automações ou Design
                    </span>
                </div>
            </div>
        </section>
    );
};

/* =========================================================================
   2. GALERIA DE PROJETOS
   ========================================================================= */
const GaleriaSecao = () => {
    return (
        <section className='py-20 lg:py-28 bg-preto-escuro'>
            <div className='content-section'>
                <GaleriaProjetos />
            </div>
        </section>
    );
};
