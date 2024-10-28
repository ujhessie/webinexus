import { useState } from "react";
import { Projeto, useProjetos } from "../../contexts/ProjetosContexts";
import { MaxWidthContainer } from "../MaxWidthContainer/MaxWidthContainer";
import CardProject from "../CardProject/CardProject";

// Tipos de filtros agora baseados em tags ao invés de tecnologias
const filtroTipos = ["Todos", "Site", "Design", "Sistema", "API", "Outros"];

export const Projetos = () => {
    const { projetos } = useProjetos();
    const [filtroSelecionado, setFiltroSelecionado] = useState<string>("Todos");

    // Função para lidar com a seleção de filtros
    const handleFiltroClick = (filtro: string) => {
        setFiltroSelecionado(filtro);
    };

    // Filtrar projetos com base no filtro selecionado
    const projetosFiltrados = projetos.filter((projeto) => {
        if (filtroSelecionado === "Todos") {
            return true;
        }
        // Verifica se tags está definido e filtra com base no filtro selecionado
        return projeto.tags?.includes(filtroSelecionado);
    });

    return (
        <div>
            <MaxWidthContainer className=''>
                <div className='filtros border-2 border-zinc-600 p-4 rounded-lg mb-4'>
                    {filtroTipos.map((tipo) => (
                        <button
                            key={tipo}
                            onClick={() => handleFiltroClick(tipo)}
                            className={
                                filtroSelecionado === tipo
                                    ? "text-zinc-50 bg-zinc-800 p-4 hover:bg-zinc-950/50 rounded-md"
                                    : "text-zinc-50 p-4 hover:bg-zinc-950/50 rounded-md"
                            }
                        >
                            {tipo}
                        </button>
                    ))}
                </div>
            </MaxWidthContainer>

            <MaxWidthContainer id='div-projetos' className='projetos w-full h-full mb-16 gap-4'>
                {projetosFiltrados.map((projeto: Projeto) => (
                    <CardProject key={projeto.id} id={projeto.id} />
                ))}
            </MaxWidthContainer>
        </div>
    );
};
''