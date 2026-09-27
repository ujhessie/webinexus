import React from "react";
import { Link } from "react-router-dom";

/**
 * Componente modular de Botão para o projeto Web iNexus e Ujhessie.
 *
 * @param {Object} props
 * @param {'cta' | 'cabecalho' | 'navegacao' | 'padrao' | 'branco' | 'cta-branco' | 'acao-seta' | 'vidro-seta'} [props.variante='padrao'] - Variante de estilo do botão
 * @param {boolean} [props.ativo=false] - Define se a variante 'navegacao' está em estado ativo
 * @param {string} [props.href] - Se fornecido, renderiza <Link> (para rotas internas) ou <a> em vez de <button>
 * @param {React.ReactNode} [props.children] - Conteúdo interno do botão
 * @param {string} [props.className] - Classes Tailwind adicionais para customização
 * @param {Function} [props.onClick] - Handler de clique
 */
export const Botao = ({
    variante = "padrao",
    ativo = false,
    href,
    children,
    className = "",
    onClick,
    ...outrasProps
}) => {
    // Helper para renderizar Link (rotas internas), <a> ou <button>
    const RenderTag = ({
        children: conteudo,
        className: classesTag,
        ...propsElemento
    }) => {
        if (href) {
            if (href.startsWith("/") && !href.startsWith("/#")) {
                return (
                    <Link
                        to={href}
                        className={classesTag}
                        onClick={onClick}
                        {...propsElemento}
                        {...outrasProps}
                    >
                        {conteudo}
                    </Link>
                );
            }
            return (
                <a
                    href={href}
                    className={classesTag}
                    onClick={onClick}
                    {...propsElemento}
                    {...outrasProps}
                >
                    {conteudo}
                </a>
            );
        }
        return (
            <button
                type='button'
                className={classesTag}
                onClick={onClick}
                {...propsElemento}
                {...outrasProps}
            >
                {conteudo}
            </button>
        );
    };

    // Ícone padrão do WhatsApp
    const IconeWhatsApp = ({ className: iconeClass = "w-[18px] h-[18px]" }) => (
        <svg
            className={`fill-current shrink-0 ${iconeClass}`}
            viewBox='0 0 24 24'
        >
            <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z' />
            <path d='M12 2C6.477 2 2 6.477 2 12c0 2.137.672 4.116 1.819 5.74L2 22l4.384-1.782A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.802 0-3.479-.478-4.933-1.31l-.353-.203-2.607 1.059.972-2.532-.224-.361A7.956 7.956 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z' />
        </svg>
    );

    // Variante CTA Hero principal (com WhatsApp)
    if (variante === "cta") {
        return (
            <RenderTag
                className={`group relative overflow-hidden flex items-center justify-between gap-3.5 px-[22px] py-[14px] bg-gradiente-botao rounded-[16px] text-white font-titulo text-[13.5px] sm:text-[15.5px] font-bold tracking-wide shadow-glow-botao transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-glow-botao-hover hover:bg-gradiente-botao-hover cta-shine cursor-pointer no-underline ${className}`}
            >
                <div className='w-[26px] h-[26px] flex items-center justify-center shrink-0'>
                    <IconeWhatsApp className='w-[24px] h-[24px]' />
                </div>
                <span className='flex-1 text-center whitespace-normal sm:whitespace-nowrap uppercase tracking-[0.03em]'>
                    {children || "QUERO UM SITE PROFISSIONAL"}
                </span>
                <div className='w-9 h-9 rounded-full bg-white/22 backdrop-blur-md flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/35'>
                    <svg
                        className='w-[18px] h-[18px] stroke-white'
                        viewBox='0 0 24 24'
                        fill='none'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <line x1='5' y1='12' x2='19' y2='12' />
                        <polyline points='12 5 19 12 12 19' />
                    </svg>
                </div>
            </RenderTag>
        );
    }

    // Variante Ação com Seta (Hero Ujhessie / CTA roxo sem WhatsApp)
    if (variante === "acao-seta" || variante === "heroi-primario") {
        return (
            <RenderTag
                className={`group relative overflow-hidden inline-flex items-center justify-between gap-3.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-gradiente-botao rounded-[14px] text-white font-titulo text-[13px] sm:text-[14.5px] font-bold tracking-wider uppercase shadow-glow-botao transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-glow-botao-hover hover:bg-gradiente-botao-hover cta-shine cursor-pointer no-underline ${className}`}
            >
                <span className='whitespace-nowrap'>{children}</span>
                <div className='w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/30'>
                    <svg
                        className='w-4 h-4 stroke-white'
                        viewBox='0 0 24 24'
                        fill='none'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <line x1='5' y1='12' x2='19' y2='12' />
                        <polyline points='12 5 19 12 12 19' />
                    </svg>
                </div>
            </RenderTag>
        );
    }

    // Variante Vidro com Seta (Hero Secundário Ujhessie)
    if (variante === "vidro-seta" || variante === "heroi-secundario") {
        return (
            <RenderTag
                className={`group relative overflow-hidden inline-flex items-center justify-between gap-3.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/25 rounded-[14px] text-white font-titulo text-[13px] sm:text-[14.5px] font-bold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/40 cursor-pointer no-underline ${className}`}
            >
                <span className='whitespace-nowrap'>{children}</span>
                <div className='w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/30'>
                    <svg
                        className='w-4 h-4 stroke-white'
                        viewBox='0 0 24 24'
                        fill='none'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <line x1='5' y1='12' x2='19' y2='12' />
                        <polyline points='12 5 19 12 12 19' />
                    </svg>
                </div>
            </RenderTag>
        );
    }

    // Variante Branca (CTA com fundo branco, ícone WhatsApp e seta roxa)
    if (variante === "branco" || variante === "cta-branco") {
        return (
            <RenderTag
                className={`group relative inline-flex items-center justify-between gap-4 px-6 py-4 bg-white rounded-full text-[#7B1FE1] font-titulo font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:bg-slate-50 no-underline cursor-pointer ${className}`}
            >
                <div className='w-5 h-5 flex items-center justify-center shrink-0 text-[#7B1FE1]'>
                    <IconeWhatsApp className='w-5 h-5 text-[#7B1FE1]' />
                </div>
                <span className='flex-1 text-center whitespace-normal sm:whitespace-nowrap'>
                    {children || "QUERO EVOLUIR MEU NEGÓCIO"}
                </span>
                <div className='w-8 h-8 rounded-full bg-[#7B1FE1] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5'>
                    <svg
                        className='w-4 h-4 stroke-white'
                        viewBox='0 0 24 24'
                        fill='none'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <line x1='5' y1='12' x2='19' y2='12' />
                        <polyline points='12 5 19 12 12 19' />
                    </svg>
                </div>
            </RenderTag>
        );
    }

    // Variante Cabeçalho (Ação Fale Conosco)
    if (variante === "cabecalho") {
        return (
            <RenderTag
                className={`font-titulo inline-flex items-center justify-center gap-[9px] px-8 py-3.5 bg-gradiente-botao rounded-[10px] text-white no-underline text-[15px] sm:text-[16px] font-bold tracking-[0.04em] leading-none shadow-glow-botao transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-botao-hover hover:bg-gradiente-botao-hover whitespace-nowrap cursor-pointer ${className}`}
            >
                <IconeWhatsApp className='w-[20px] h-[20px]' />
                <span>{children || "FALE CONOSCO"}</span>
            </RenderTag>
        );
    }

    // Variante Navegação (Links da Navbar estilo pílula)
    if (variante === "navegacao") {
        return (
            <RenderTag
                className={`font-titulo text-sm px-[20px] sm:px-[22px] py-[8px] sm:py-[9px] rounded-full transition-all duration-300 whitespace-nowrap no-underline leading-normal inline-block ${
                    ativo
                        ? "bg-gradiente-botao text-white font-semibold shadow-glow-pilula"
                        : "text-white/70 font-medium hover:text-white hover:bg-white/5"
                } ${className}`}
            >
                {children}
            </RenderTag>
        );
    }

    // Variante Padrão / Genérica
    return (
        <RenderTag
            className={`font-titulo inline-flex items-center justify-center px-6 py-3 bg-roxo-principal text-white font-semibold rounded-xl hover:bg-roxo-hoverPrincipal transition-all duration-300 shadow-md ${className}`}
        >
            {children}
        </RenderTag>
    );
};

export default Botao;
