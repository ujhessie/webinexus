import { ProjetosContext, categorias, filtros } from "./ProjetosContext.jsx";
import { projetos } from "../data/projetos";

/* ------------------------------------------------------------------ */
/* Provider — fica em um arquivo próprio para o fast refresh do Vite   */
/* funcionar (arquivo só com componente).                              */
/* ------------------------------------------------------------------ */

export const ProjetosProvider = ({ children }) => {
    // Projetos que podem aparecer publicamente (lixeira fica de fora)
    const projetosVisiveis = projetos.filter((p) => p.status !== "lixeira");

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
