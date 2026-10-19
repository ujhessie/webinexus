import { Link } from "react-router-dom";

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
        "button-press flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-6 py-3.5 font-titulo font-bold text-sm tracking-wider uppercase rounded-2xl hover:-translate-y-0.5 "; // taste-skill-ignore: botão uppercase com tracking é o padrão da marca

    const tiposBotao = {
        primario: "grad-btn sombra-btn text-white",

        secundario:
            "bg-white/10 hover:bg-white/15 text-white border border-white/10",

        outline:
            "border border-[#8722ee] text-[#8722ee] hover:bg-[#8722ee]/10 hover:text-[#9732fa]",

        branco: "bg-white text-roxo-escuro hover:bg-neutral-100",
    };

    const classeTipoBotao = tiposBotao[tipoBotao] ?? tiposBotao.primario;
    const ehBranco = tipoBotao === "branco";

    const conteudo = (
        <>
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
        </>
    );

    const classeFinal = `${classeGlobal} ${classeTipoBotao} ${className}`;

    // Rota interna → <Link> do router (navegação SPA sem recarregar a página)
    if (typeof href === "string" && href.startsWith("/")) {
        return (
            <Link to={href} id={id} className={classeFinal} {...props}>
                {conteudo}
            </Link>
        );
    }

    return (
        <a href={href} id={id} className={classeFinal} {...props}>
            {conteudo}
        </a>
    );
};
