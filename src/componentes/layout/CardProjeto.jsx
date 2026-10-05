import { useProjetos } from "../../contexts/ProjetosContext";

export const CardProjeto = ({ id }) => {
    const { getProjetoPorId } = useProjetos();
    const projeto = getProjetoPorId(id);

    if (!projeto) return null;

    const { titulo, breveDescricao, imagens } = projeto;

    return (
        <article className='card-projeto bg-preto-fosco p-2 rounded-md'>
            <img
                src={imagens.capa}
                alt={`Capa do projeto ${titulo}`}
                className='aspect-3/4 object-cover rounded-sm w-full'
            />
            <div className='pt-3 px-1'>
                <h3 className='font-titulo text-white text-lg'>{titulo}</h3>
                <p className='text-cinza-claro text-sm'>{breveDescricao}</p>
            </div>
        </article>
    );
};
