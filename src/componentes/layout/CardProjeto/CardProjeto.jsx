import { Link } from "react-router-dom";
import { useProjetos } from "../../../contexts/ProjetosContext.jsx";
import { FolderGit2 } from "lucide-react";
import "./cardProjeto.css";

export const CardProjeto = ({ id, basePath = "/projetos" }) => {
    const { getProjetoPorId } = useProjetos();
    const projeto = getProjetoPorId(id);

    if (!projeto) return null;

    const { titulo, imagens = {} } = projeto;
    const temCapaValida = Boolean(imagens.capa && imagens.capa.trim().length > 18);

    return (
        <Link to={`${basePath}/${id}`} className="block group">
            <article
                className='
                    card-projeto
                    relative overflow-hidden
                    bg-preto-fosco
                    border border-white/10
                    flex flex-col justify-end
                    p-4
                    rounded-xl
                    aspect-3/4
                    bg-cover bg-center
                    transition-all duration-300 ease-out
                    hover:scale-[1.02]
                    hover:-translate-y-1
                    hover:border-roxo-principal/50
                    hover:shadow-[0_12px_30px_-8px_rgba(183,47,254,0.35)]
                    cursor-pointer
                '
                style={{
                    backgroundImage: temCapaValida ? `url(${imagens.capa})` : undefined,
                }}
            >
                {/* Fallback elegante caso não haja imagem de capa */}
                {!temCapaValida && (
                    <div className="absolute inset-0 bg-linear-to-br from-roxo-escuro/20 via-preto-fosco to-preto-escuro flex items-center justify-center pointer-events-none">
                        <FolderGit2 className="w-10 h-10 text-white/15" />
                    </div>
                )}

                {/* Overlay gradiente escuro na base do card para contraste */}
                <div className="absolute inset-0 bg-linear-to-t from-preto-escuro/90 via-preto-escuro/20 to-transparent pointer-events-none" />

                <div
                    className='
                        relative z-10
                        transition-all duration-300 ease-out
                        content-card-projeto
                        p-3.5
                        rounded-lg
                        bg-linear-to-r from-roxo-escuro to-roxo-principal
                        lg:opacity-0 opacity-100
                        translate-y-2 lg:translate-y-3 group-hover:translate-y-0 group-hover:opacity-100
                        shadow-md
                    '
                >
                    <p className='font-titulo text-white text-[13px] font-semibold leading-[120%] line-clamp-2'>
                        {titulo}
                    </p>
                </div>
            </article>
        </Link>
    );
};
