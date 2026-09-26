import React from 'react';

/**
 * Componente da Seção "Por que escolher a Web iNexus para o seu projeto?".
 * Exibe o lado esquerdo com título chamativo e botão CTA branco,
 * e o lado direito com 5 cards brancos destacados listando os diferenciais.
 */
export default function SecaoPorQueEscolher() {
  const diferenciais = [
    {
      titulo: 'Projeto totalmente personalizado',
      descricao: (
        <>
          Nada de soluções prontas. Criamos{' '}
          <strong className="font-bold text-slate-900">
            cada projeto pensando no seu negócio
          </strong>
          , no seu público e no que você realmente precisa.
        </>
      ),
    },
    {
      titulo: 'Compromisso com cada projeto',
      descricao: (
        <>
          <strong className="font-bold text-slate-900">
            A gente acompanha tudo de perto
          </strong>
          , do primeiro contato até a entrega, para transformar sua ideia em um resultado que você realmente goste.
        </>
      ),
    },
    {
      titulo: 'Estratégia antes de execução',
      descricao: (
        <>
          <strong className="font-bold text-slate-900">
            Antes de criar, entendemos o problema.
          </strong>{' '}
          Assim, cada escolha de design e tecnologia tem um propósito claro.
        </>
      ),
    },
    {
      titulo: 'Transparência em cada etapa',
      descricao: (
        <>
          <strong className="font-bold text-slate-900">
            Você acompanha cada etapa do projeto
          </strong>{' '}
          com clareza, sem ficar no escuro sobre decisões, prazos ou próximos passos.
        </>
      ),
    },
    {
      titulo: 'Parceria além da entrega',
      descricao: (
        <>
          Nosso trabalho não termina quando o{' '}
          <strong className="font-bold text-slate-900">projeto vai ao ar.</strong>{' '}
          <strong className="font-bold text-slate-900">
            Seguimos por perto para ajudar
          </strong>
          , ajustar e fazer a solução evoluir.
        </>
      ),
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#8B2CF5] via-[#7B1FE1] to-[#6A16C7] py-16 sm:py-24 lg:py-28 text-white">
      <div className="max-w-conteiner w-full mx-auto px-5 sm:px-[30px] lg:px-[70px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Coluna Esquerda: Título, Selo e CTA (Sticky ao longo de toda a seção no desktop) */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-20 flex flex-col items-start z-10">
            
            {/* Selo / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs sm:text-sm font-medium mb-6 sm:mb-8 text-white shadow-sm">
              {/* Ícone Estrela / Sparkle */}
              <svg className="w-4 h-4 text-white fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
              </svg>
              <span>Para quem quer ir além!</span>
            </div>

            {/* Título Principal */}
            <h2 className="font-titulo font-bold text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] lg:leading-[1.2] text-white mb-8 sm:mb-10 tracking-tight">
              Por que escolher a <br />
              <span className="text-white">Web iNexus</span> para o <br />
              seu projeto?
            </h2>

            {/* Botão CTA Branco */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-between gap-4 px-6 py-4 bg-white rounded-full text-[#7B1FE1] font-titulo font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:bg-slate-50 no-underline"
            >
              {/* Ícone WhatsApp */}
              <svg className="w-5 h-5 fill-current shrink-0 text-[#7B1FE1]" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 2.137.672 4.116 1.819 5.74L2 22l4.384-1.782A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.802 0-3.479-.478-4.933-1.31l-.353-.203-2.607 1.059.972-2.532-.224-.361A7.956 7.956 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>

              <span>QUERO EVOLUIR MEU NEGÓCIO</span>

              {/* Círculo com Seta */}
              <div className="w-8 h-8 rounded-full bg-[#7B1FE1] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                <svg className="w-4 h-4 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Coluna Direita: Cards de Diferenciais */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            {diferenciais.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[22px] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
              >
                <h3 className="font-titulo font-bold text-2xl sm:text-[26px] text-[#8B2CF5] mb-2 sm:mb-3">
                  {item.titulo}
                </h3>
                <p className="text-slate-600">
                  {item.descricao}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
