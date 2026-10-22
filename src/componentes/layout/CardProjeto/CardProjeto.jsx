import { Link } from "react-router-dom";
import { useProjetos } from "../../../contexts/ProjetosContext.jsx";
import { FolderGit2 } from "lucide-react";

export const CardProjeto = ({ id, basePath = "/projetos" }) => {
    const { getProjetoPorId } = useProjetos();
    const projeto = getProjetoPorId(id);

    if (!projeto) return null;

    const { titulo, imagens = {} } = projeto;
    const temCapaValida = Boolean(
        imagens.capa && imagens.capa.trim().length > 18
    );

    return (
        <Link
            to={`${basePath}/${id}`}
            className='block group'
            aria-label={`Ver projeto ${titulo}`}
        >
            <article className='card-projeto relative aspect-[4/3] rounded-xl overflow-hidden bg-preto-fosco group-hover:scale-[1.02] group-hover:-translate-y-1'>
                {temCapaValida ? (
                    <img
                        src={imagens.capa}
                        alt={titulo}
                        loading='lazy'
                        className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                ) : (
                    <div className='img-fallback absolute inset-0 flex items-center justify-center'>
                        <FolderGit2 className='w-10 h-10 text-white/15' />
                    </div>
                )}

                {/* Overlay de contraste na base do card */}
                <div className='overlay-card absolute inset-0' />

                <div className='absolute inset-x-0 bottom-0 p-4'>
                    <span className='inline-block content-card-projeto grad-btn rounded-lg px-3 py-1.5 transition-[opacity,transform] duration-300 lg:opacity-0 lg:translate-y-3 group-hover:opacity-100 group-hover:translate-y-0'>
                        <span className='block font-titulo text-white text-[13px] font-semibold leading-[120%] line-clamp-2'>
                            {titulo}
                        </span>
                    </span>
                </div>
            </article>
        </Link>
    );
};
