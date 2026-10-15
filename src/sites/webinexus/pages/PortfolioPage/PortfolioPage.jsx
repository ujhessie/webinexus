import { Badge } from "../../../../componentes/ui/Badge/Badge";
import { GaleriaProjetos } from "../../../../componentes/layout/GaleriaProjetos/GaleriaProjetos";
import { CTAQuemSomos } from "../QuemSomosPage";
import { SlidersHorizontal } from "lucide-react";

export const PortfolioPage = () => {
    return (
        <div className='w-full overflow-hidden'>
            <HeroTrabalhos />
            <GaleriaSecao />
            <CTAQuemSomos />
        </div>
    );
};

/* =========================================================================
   1. HERO DA PÁGINA
   ========================================================================= */
const HeroTrabalhos = () => {
    return (
        <section className="relative overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-16 bg-[url('/bg.png')] bg-cover bg-center">
            <div className='absolute inset-0 bg-linear-to-b from-preto-escuro/90 via-preto-escuro/95 to-preto-escuro z-0' />

            <div className='content-section relative z-10'>
                <div className='flex flex-col items-start'>
                    <Badge textoBadge='NOSSOS TRABALHOS' />

                    <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold font-titulo leading-[1.1] tracking-tight text-white mt-2 mb-6 max-w-3xl'>
                        Projetos{" "}
                        <span className='text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-roxo-principal to-roxo-claro'>
                            sob medida
                        </span>
                        , do problema à entrega.
                    </h1>

                    <p className='font-corpo text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mb-6'>
                        Sites, sistemas, automações e peças de design criados
                        para negócios reais. Use os filtros para navegar por
                        área e abra qualquer card para ver o contexto completo
                        de cada projeto.
                    </p>

                    <span className='inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 font-corpo text-xs text-gray-400'>
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
        <section className='pb-20 lg:pb-28 bg-preto-escuro'>
            <div className='content-section'>
                <GaleriaProjetos />
            </div>
        </section>
    );
};
