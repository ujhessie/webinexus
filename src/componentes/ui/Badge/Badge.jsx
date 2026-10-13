import { Sparkles } from "lucide-react";

export const Badge = ({
    textoBadge = "BEM VINDOS!",
    variante = "padrao",
    className = "",
    uppercase = true,
}) => {
    const variantes = {
        padrao: "border-roxo-principal/50 bg-roxo-principal/15 text-roxo-principal",
        branco: "border-white/30 bg-white/10 text-white",
    };

    const estiloVariante = variantes[variante] ?? variantes.padrao;

    return (
        <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-sm font-semibold text-xs sm:text-sm tracking-wider mb-4 ${
                uppercase ? "uppercase" : ""
            } ${estiloVariante} ${className}`}
        >
            <Sparkles className='w-4 h-4 shrink-0' />
            <span>{textoBadge}</span>
        </div>
    );
};