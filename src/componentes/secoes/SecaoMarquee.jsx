import React from 'react';

/**
 * Componente da seção Marquee (Faixa de Qualidades).
 * Exibe um banner roxo com rolagem infinita (marquee) alternando qualidades da empresa com a logo oficial.
 */
export default function SecaoMarquee({ reverso = false }) {
  const qualidades = [
    'Designs que convertem',
    'Sistemas que aumentam a produtividade',
    'Automações que geram resultados',
    'Desenvolvimento Web de Alta Performance',
    'Experiências Digitais Incríveis',
    'Soluções Sob Medida',
  ];

  // Duplicamos a lista de itens para criar o loop contínuo sem interrupções
  const itensMarquee = [...qualidades, ...qualidades];
  const classeAnimacao = reverso ? 'animate-marquee-reverso' : 'animate-marquee';

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#7B1FE1] via-[#9B25F0] to-[#B62DFE] py-4 sm:py-5 border-y border-white/10 shadow-[0_0_30px_rgba(123,31,225,0.3)] z-20 select-none">
      <div className={`${classeAnimacao} flex items-center whitespace-nowrap`}>
        {itensMarquee.map((qualidade, index) => (
          <React.Fragment key={index}>
            <span className="text-white font-titulo font-bold text-sm sm:text-base tracking-wide uppercase px-4 sm:px-6 flex items-center">
              {qualidade}
            </span>
            <div className="flex items-center px-4 sm:px-6 shrink-0">
              <img
                src="/logo-branca.svg"
                alt="Web iNexus"
                className="h-5 sm:h-6 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
