import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useProjetos } from "../../../contexts/ProjetosContext.jsx";
import { CardProjeto } from "../../layout/CardProjeto/CardProjeto.jsx";

export const GaleriaProjetos = ({ limite }) => {
    const { filtros, getProjetosPorGrupo } = useProjetos();
    const [filtroAtivo, setFiltroAtivo] = useState("todos");

    const projetosFiltrados = getProjetosPorGrupo(filtroAtivo);
    const projetosExibidos = limite
        ? projetosFiltrados.slice(0, limite)
        : projetosFiltrados;

    return (
        <div>
            {/* Filtros */}
            <div className='flex flex-wrap lg:inline-flex gap-1 bg-white rounded-full py-2 px-2 sm:px-3 mb-6 max-w-full'>
                <span className='hidden lg:flex items-center gap-2 px-3 text-preto-escuro/70 font-titulo text-sm shrink-0'>
                    <SlidersHorizontal className='w-4 h-4 text-roxo-escuro' />
                    Filtrar
                </span>
                {filtros.map((filtro) => {
                    const isAtivo = filtroAtivo === filtro.id;
                    return (
                        <button
                            key={filtro.id}
                            type='button'
                            onClick={() => setFiltroAtivo(filtro.id)}
                            aria-pressed={isAtivo}
                            className={`button-press font-titulo text-sm whitespace-nowrap rounded-full px-4 py-2 transition-[background-color,color,box-shadow] ${
                                isAtivo
                                    ? "grad-btn sombra-btn text-white font-semibold"
                                    : "text-preto-escuro/80 hover:bg-black/5"
                            }`}
                        >
                            {filtro.label}
                        </button>
                    );
                })}
            </div>

            {/* Grid de projetos */}
            <div
                key={filtroAtivo}
                className='grid grid-cols-2 lg:grid-cols-3 gap-4'
            >
                {projetosExibidos.map((projeto, index) => (
                    <div
                        key={projeto.id}
                        className='card-entrada'
                        style={{ animationDelay: `${index * 70}ms` }}
                    >
                        <CardProjeto id={projeto.id} />
                    </div>
                ))}
            </div>

            {projetosExibidos.length === 0 && (
                <p className='text-gray-400 text-sm py-10 text-center'>
                    Nenhum projeto nessa categoria por enquanto — chama no
                    WhatsApp que a gente conta o que está saindo do forno.
                </p>
            )}
        </div>
    );
};
