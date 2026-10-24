import { Link } from "react-router-dom";
import { useProjetos } from "../../../contexts/ProjetosContext.jsx";
import { FolderGit2, ArrowUpRight } from "lucide-react";

export const CardProjeto = ({ id, basePath = "/projetos" }) => {
    const { getProjetoPorId } = useProjetos();
    const projeto = getProjetoPorId(id);

    if (!projeto) return null;

    const {
        titulo,
        breveDescricao,
        tags = [],
        imagens = {},
        links = [],
    } = projeto;
    const temCapaValida = Boolean(
        imagens.capa && imagens.capa.trim().length > 18,
    );
    const temDescricao = Boolean(breveDescricao && breveDescricao.trim());

    // Link principal com URL de verdade = projeto no ar. O selo abre o deploy
    // em nova aba, sem tirar o clique do card para a página interna.
    const linkAoVivo = links.find(
        (link) =>
            link.principal &&
            typeof link.url === "string" &&
            /^https?:\/\/.+\..+/i.test(link.url),
    );

    return (
        <article className='relative group h-full'>
            <Link
                to={`${basePath}/${id}`}
                className='block h-full'
                aria-label={`Ver projeto ${titulo}`}
            >
                <div className='card-projeto h-full flex flex-col rounded-xl overflow-hidden bg-preto-fosco border border-white/5 group-hover:scale-[1.02] group-hover:-translate-y-1'>
                    {/* Capa — sem texto por cima */}
                    <div className='relative aspect-[4/3] overflow-hidden shrink-0'>
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
                    </div>

                    {/* Texto — sempre abaixo da capa, em fundo sólido, alinhado à esquerda */}
                    <div className='flex flex-col flex-1 gap-2 p-4 sm:p-5 text-left'>
                        <div className='flex items-start justify-between gap-3'>
                            <h3 className='font-titulo text-white text-[15px] sm:text-base font-semibold leading-[120%] line-clamp-2'>
                                {titulo}
                            </h3>
                            <ArrowUpRight className='w-4 h-4 shrink-0 text-gray-500 transition-colors group-hover:text-roxo-claro' />
                        </div>

                        {temDescricao && (
                            <p className='font-corpo text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2'>
                                {breveDescricao}
                            </p>
                        )}

                        {tags.length > 0 && (
                            <ul className='flex flex-wrap gap-1.5 mt-auto pt-1'>
                                {tags.map((tag) => (
                                    <li
                                        key={tag}
                                        className='px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-corpo text-[10px] sm:text-[11px] text-gray-400'
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </Link>

            {linkAoVivo && (
                <a
                    href={linkAoVivo.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`Visite ${titulo} ao vivo (abre em nova aba)`}
                    className='absolute top-3 left-3 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-preto-escuro/85 px-3 py-1.5 font-titulo text-[11px] font-semibold text-white backdrop-blur-md transition-[transform,color,border-color] duration-300 group-hover:-translate-y-1.5 hover:border-emerald-400/60 hover:text-emerald-200'
                >
                    <span className='relative flex h-2 w-2 shrink-0'>
                        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none' />
                        <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-400' />
                    </span>
                    Ver ao vivo
                    <ArrowUpRight className='h-3.5 w-3.5' />
                </a>
            )}
        </article>
    );
};
