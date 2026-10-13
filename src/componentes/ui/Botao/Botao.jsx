export const Botao = ({
    tipoBotao = "primario",
    children,
    textoCTA,
    id,
    href = "#",
    className = "",
    iconCTA,
    ...props
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

        branco:
            "bg-white hover:bg-neutral-100 text-roxo-escuro shadow-lg shadow-black/10",
    };

    const classeTipoBotao = tiposBotao[tipoBotao] ?? tiposBotao.primario;
    const ehBranco = tipoBotao === "branco";

    return (
        <a
            href={href}
            id={id}
            className={`${classeGlobal} ${classeTipoBotao} ${className}`}
            {...props}
        >
            {children}
            {textoCTA}
            {iconCTA ? (
                <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        ehBranco
                            ? "bg-roxo-escuro text-white"
                            : "border border-white/40 bg-white/10"
                    }`}
                >
                    {iconCTA}
                </span>
            ) : null}
        </a>
    );
};
