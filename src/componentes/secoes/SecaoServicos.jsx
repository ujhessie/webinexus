import React from 'react';

/**
 * Componente da Seção de Serviços (Cards de Serviços).
 * Inicialmente com o primeiro card: "SEU NEGÓCIO PRECISA DE UM SITE?"
 * utilizando a imagem placeholder-card-servicos.png.
 */
export default function SecaoServicos() {
  return (
    <section id="servicos" className="relative w-full bg-[#080214] py-20 sm:py-28 lg:py-32 text-white overflow-hidden">
      {/* Glow decorativo sutil de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-roxo-principal/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-conteiner w-full mx-auto px-5 sm:px-[30px] lg:px-[70px] relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Selo / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-roxo-secundario/40 bg-roxo-secundario/10 backdrop-blur-md text-xs sm:text-sm font-medium text-texto-selo mb-5 shadow-[0_0_20px_rgba(182,45,254,0.15)]">
            <svg className="w-4 h-4 fill-current text-roxo-secundario shrink-0" viewBox="0 0 24 24">
              <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
            </svg>
            <span>Um pouco do que podemos oferecer</span>
          </div>

          {/* Título */}
          <h2 className="font-titulo font-bold text-[34px] sm:text-5xl lg:text-[58px] leading-[1.15] text-white max-w-[850px] tracking-tight">
            soluções digitais para{' '}
            <span className="text-[#8B2CF5] drop-shadow-[0_0_25px_rgba(139,44,245,0.4)]">
              impulsionar seu negócio
            </span>
          </h2>
        </div>

        {/* Lista de Cards de Serviços */}
        <div className="flex flex-col gap-10">
          
          {/* Card 1: SEU NEGÓCIO PRECISA DE UM SITE? */}
          <div className="relative bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Lado Superior (Mobile) / Lado Esquerdo (Desktop): Fundo Roxo e Mockups */}
            <div className="lg:col-span-7 relative w-full h-[280px] sm:h-[380px] lg:h-full lg:min-h-[460px] overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#7B1FE1] to-[#8B2CF5]">
              {/* Forma Roxa com corte diagonal no desktop */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#7B1FE1] to-[#8B2CF5] [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)] hidden lg:block" 
              />

              {/* Imagem Desktop */}
              <img
                src="/placeholder-card-servicos.png"
                alt="Exemplos de sites criados pela Web iNexus"
                className="hidden lg:block relative z-10 w-[110%] max-w-none h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.35)] -translate-x-6 hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Imagem Mobile */}
              <img
                src="/placeholder-card-servicos-mobile.png"
                alt="Exemplos de sites criados pela Web iNexus"
                className="absolute top-0 lg:hidden  z-10 w-full  object-contain  drop-shadow-[0_12px_25px_rgba(0,0,0,0.25)]"
              />
            </div>

            {/* Lado Inferior (Mobile) / Lado Direito (Desktop): Conteúdo de Texto e CTA */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-center text-center lg:text-left">
              <h3 className="font-titulo font-black text-[26px] sm:text-[32px] lg:text-[38px] leading-[1.08] tracking-tight uppercase text-slate-950 mb-4 sm:mb-6">
                SEU NEGÓCIO <span className="text-[#8B2CF5]">PRECISA</span>{' '}
                <span className="text-[#8B2CF5] block">DE UM SITE?</span>
              </h3>

              <p className="text-slate-700 mb-6 sm:mb-8 max-w-[460px] mx-auto lg:mx-0">
                Sites profissionais, com{' '}
                <strong className="font-bold text-slate-950">
                  ótimos designs e totalmente personalizados
                </strong>{' '}
                para o seu empreendimento
              </p>

              <div className="flex justify-center lg:justify-start">
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#7B1FE1] to-[#B62DFE] hover:from-[#8B2CF5] hover:to-[#C446FE] text-white rounded-full font-titulo font-bold text-xs sm:text-[13.5px] tracking-wider uppercase shadow-[0_10px_25px_rgba(123,31,225,0.4)] transition-all duration-300 hover:shadow-[0_14px_32px_rgba(123,31,225,0.6)] hover:scale-[1.02] no-underline cursor-pointer"
                >
                  <span>QUERO UM SITE PROFISSIONAL</span>
                  <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                    <svg className="w-3.5 h-3.5 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
