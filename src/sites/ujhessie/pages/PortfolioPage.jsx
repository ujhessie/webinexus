import { HeroInterno, CTAQuemSomos } from "../../../componentes/Compartilhados";
import { GaleriaProjetos } from "../../../componentes/layout/GaleriaProjetos/GaleriaProjetos";

/* Meus trabalhos — mesma estrutura do portfólio da Web iNexus:
   hero + galeria com filtros + CTA final (em 1ª pessoa, tom do Ujhessie) */
export const PortfolioPage = () => {
    return (
        <>
            <HeroInterno
                badge='MEUS TRABALHOS'
                titulo='Projetos que eu'
                destaque='coloquei no ar.'
                paragrafo='Uma seleção do que já desenvolvi: sites, sistemas, automações e peças de design. Use os filtros pra navegar por área e clique em qualquer card pra ver os detalhes de cada projeto.'
            />

            <section className='pb-20 lg:pb-28'>
                <div className='content-section'>
                    <GaleriaProjetos />
                </div>
            </section>

            <CTAQuemSomos
                badge='Bora conversar?'
                titulo='Tem um projeto em mente? Me chama.'
                texto='Me conta o que você precisa em uma frase. Eu respondo, a gente alinha o caminho e já começa — sem enrolação.'
                textoBotao='FALAR COMIGO NO WHATSAPP'
            />
        </>
    );
};
