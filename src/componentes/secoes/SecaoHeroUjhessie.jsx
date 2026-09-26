import React from 'react';
import Selo from '../ui/Selo';
import Botao from '../ui/Botao';

/**
 * Seção Hero do site Ujhessie.
 * Fundo estilo estúdio cinza com tipografia imponente, selo de boas-vindas,
 * botões de ação estilizados e imagem de destaque recortada.
 */
export default function SecaoHeroUjhessie() {
  return (
    <section className="relative w-full bg-[#8c8c91] bg-gradient-to-br from-[#929297] via-[#8c8c91] to-[#828287] overflow-hidden flex items-center min-h-[calc(100vh-84px)] lg:min-h-[640px]">
      
      {/* Container de Conteúdo */}
      <div className="max-w-conteiner w-full mx-auto px-5 sm:px-[30px] lg:px-[70px] relative z-10 pt-10 sm:pt-14 pb-0 sm:pb-4 lg:py-16">
        <div className="max-w-[560px] flex flex-col items-start">
          
          {/* Selo de Boas-Vindas */}
          <Selo
            texto="BEM VINDOS!"
            className="mb-5 sm:mb-6 !bg-[#7B1FE1]/20 !border-[#B62DFE]/40 !text-[#f3e8ff] shadow-none hover:!bg-[#7B1FE1]/30 hover:!border-[#B62DFE]/60"
          />

          {/* Título Principal */}
          <h1 className="font-titulo text-[40px] sm:text-[50px] lg:text-[58px] font-extrabold leading-[1.08] tracking-tight text-white mb-4 sm:mb-5">
            JESSE RODRIGUES<br />
            <span className="text-roxo-secundario">DEV, DESIGNER</span>{' '}
            <span className="text-white">& UM POUCO MAIS</span>
          </h1>

          {/* Texto de Apresentação */}
          <p className="font-corpo text-[15px] sm:text-[16px] leading-[1.65] text-white/90 max-w-[490px] mb-8 sm:mb-9 font-normal">
            Aqui você verá um pouco do meu mundo. Explore tudo sobre mim e caso querias saber um pouco mais, fique a vontade para entrar em contato comigo
          </p>

          {/* Botões de Ação com Seta */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4.5 mb-8 lg:mb-0">
            <Botao variante="acao-seta" href="/sobre">
              MAIS SOBRE MIM
            </Botao>
            <Botao variante="vidro-seta" href="/trabalhos">
              MEUS TRABALHOS
            </Botao>
          </div>

        </div>
      </div>

      {/* Imagem de Destaque (Jesse Rodrigues) */}
      <div className="relative lg:absolute lg:right-4 xl:right-12 lg:bottom-0 w-full lg:w-[48%] xl:w-[50%] max-w-[640px] flex items-end justify-center lg:justify-end pointer-events-none z-10">
        <img
          src="/jesse.png"
          alt="Jesse Rodrigues - Dev, Designer & um pouco mais"
          className="w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[600px] max-h-[460px] sm:max-h-[560px] lg:max-h-[640px] object-contain object-bottom drop-shadow-[-16px_12px_28px_rgba(0,0,0,0.32)]"
        />
      </div>

    </section>
  );
}
