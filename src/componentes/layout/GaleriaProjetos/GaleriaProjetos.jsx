import { useState } from "react";
import { useProjetos } from "../../../contexts/ProjetosContext.jsx";
import { CardProjeto } from "../../layout/CardProjeto";

export const GaleriaProjetos = ({ limite }) => {
    const { filtros, getProjetosPorGrupo } = useProjetos();
    const [filtroAtivo, setFiltroAtivo] = useState("todos");

    const projetosFiltrados = getProjetosPorGrupo(filtroAtivo);
    const projetosExibidos = limite
        ? projetosFiltrados.slice(0, limite)
        : projetosFiltrados;

    return (
        <div className='galeria-projetos'>
            <ul
                className='
                filtro
                flex gap-1
                overflow-x-auto whitespace-nowrap
                sm:flex-wrap sm:justify-center sm:overflow-visible
                bg-white py-2 px-3 sm:px-4
                rounded-full
                w-full sm:w-auto
                text-preto-escuro font-titulo
                text-sm sm:text-base lg:text-lg
                mb-4
                scrollbar-none [&::-webkit-scrollbar]:hidden
            '
            >
                {filtros.map((filtro) => {
                    const isAtivo = filtroAtivo === filtro.id;
                    return (
                        <li key={filtro.id}>
                            <button
                                type='button'
                                onClick={() => setFiltroAtivo(filtro.id)}
                                aria-pressed={isAtivo}
                                className={[
                                    "p-2 rounded-full transition-colors cursor-pointer shrink-0",
                                    isAtivo
                                        ? "bg-linear-to-r from-roxo-escuro to-roxo-principal text-white"
                                        : "hover:bg-black/5",
                                ].join(" ")}
                            >
                                {filtro.label}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div
                key={filtroAtivo}
                className='grid grid-cols-2 lg:grid-cols-3 gap-2'
            >
                {projetosExibidos.map((projeto, index) => (
                    <CardProjeto
                        key={projeto.id}
                        id={projeto.id}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};
