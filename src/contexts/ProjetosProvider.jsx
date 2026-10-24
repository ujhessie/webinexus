import { ProjetosContext, categorias, filtros } from "./ProjetosContext.jsx";
import { projetos } from "../data/projetos";

/* ------------------------------------------------------------------ */
/* Provider — fica em um arquivo próprio para o fast refresh do Vite   */
/* funcionar (arquivo só com componente).                              */
/* ------------------------------------------------------------------ */

// Destaques primeiro, sem bagunçar a ordem dos demais (sort estável)
const ordenarDestaquesPrimeiro = (a, b) =>
    Number(Boolean(b.destaque)) - Number(Boolean(a.destaque));

export const ProjetosProvider = ({ children }) => {
    // Projetos que podem aparecer publicamente (lixeira fica de fora),
    // com os destaques sempre na frente da galeria dos sites
    const projetosVisiveis = projetos
        .filter((p) => p.status !== "lixeira")
        .sort(ordenarDestaquesPrimeiro);

    // helpers opcionais — economizam lógica nos componentes
    const getProjetoPorId = (id) =>
        projetosVisiveis.find((p) => p.id === id);

    const getCategoria = (chave) => categorias[chave];

    const getProjetosPorGrupo = (grupo) => {
        if (grupo === "todos") return projetosVisiveis;
        return projetosVisiveis.filter((p) =>
            p.categorias.some((cat) => categorias[cat]?.grupo === grupo),
        );
    };

    const value = {
        projetos: projetosVisiveis,
        categorias,
        filtros,
        getProjetoPorId,
        getCategoria,
        getProjetosPorGrupo,
    };

    return (
        <ProjetosContext.Provider value={value}>
            {children}
        </ProjetosContext.Provider>
    );
};
