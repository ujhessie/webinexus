import { useProjetos } from "../../../contexts/ProjetosContext.jsx";
import "./cardProjeto.css";

export const CardProjeto = ({ id }) => {
    const { getProjetoPorId } = useProjetos();
    const projeto = getProjetoPorId(id);

    if (!projeto) return null;

    const { titulo, imagens } = projeto;

    return (
        <article
            className='
                card-projeto
                bg-preto-fosco
                flex flex-col justify-end
                p-4
                rounded-md
                aspect-3/4
                bg-cover bg-center
                transition-all duration-300 ease-out
                hover:scale-[1.02]
                hover:-translate-y-1
                hover:shadow-lg
                cursor-pointer
            '
            style={{ backgroundImage: `url(${imagens.capa})` }}
        >
            <div
                className='
                transition-all
                    content-card-projeto
                    pt-3 px-1 lg:opacity-0 opacity-100
                    bg-linear-to-r from-roxo-escuro to-roxo-principal
                    p-4
                    rounded-md
                     duration-300 ease-out
                    group-hover:translate-y-0 
                '
            >
                <p className='font-titulo text-white text-[12px] leading-[110%]'>
                    {titulo}
                </p>
            </div>
        </article>
    );
};
