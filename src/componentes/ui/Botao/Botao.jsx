export const Botao = ({
    tipoBotao = "primario",
    children,
    textoCTA,
    id,
    href = "#",
    className = "",
    iconCTA,
}) => {
    const classeGlobal =
        "flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-6 py-3.5 font-titulo font-bold text-xs sm:text-sm tracking-wider uppercase transition-all rounded-2xl hover:-translate-y-0.5 ";

    const tiposBotao = {
        primario:
            "bg-roxo-principal hover:bg-roxo-claro bg-linear-to-r from-roxo-escuro to-roxo-claro text-white shadow-roxo-principal  ",

        secundario:
            "bg-white/10 hover:bg-white/15 text-white border border-white/10",

        outline:
            "bg-transparent hover:bg-[#8722ee]/10 text-[#8722ee] border border-[#8722ee] hover:border-[#9732fa]",
    };

    const classeTipoBotao = tiposBotao[tipoBotao] ?? tiposBotao.primario;

    return (
        <a
            href={href}
            id={id}
            className={`${classeGlobal} ${classeTipoBotao} ${className}`}
        >
            {children}
            {textoCTA}
            {iconCTA ? (
                <span className='w-7 h-7 rounded-full border border-white/40 bg-white/10 flex items-center justify-center '>
                    {iconCTA}
                </span>
            ) : null}
        </a>
    );
};
