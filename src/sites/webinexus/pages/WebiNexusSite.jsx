import React from "react";
import Cabecalho from "../../componentes/layout/Cabecalho";
import SecaoHero from "../../componentes/secoes/SecaoHero";
import SecaoMarquee from "../../componentes/secoes/SecaoMarquee";
import SecaoPorQueEscolher from "../../componentes/secoes/SecaoPorQueEscolher";
import SecaoServicos from "../../componentes/secoes/SecaoServicos";

export default function WebiNexusSite() {
    return (
        <div className='min-h-screen bg-fundo text-[#1E293B] font-corpo selection:bg-roxo-secundario selection:text-white'>
            <Cabecalho />
            <main>
                <SecaoHero />
                <SecaoMarquee />
                <SecaoPorQueEscolher />
                <SecaoMarquee reverso={true} />
                <SecaoServicos />
            </main>
        </div>
    );
}
