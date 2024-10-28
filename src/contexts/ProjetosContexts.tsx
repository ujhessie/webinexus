import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

// Interface para o contexto de projetos
export interface Projeto {
    id: number;
    titulo: string;
    desc?: string;
    imagens: {
        imgCapa?: string;
        imgBanner?: string;
        imgSite?: string;
        imgsProjeto?: string[];
    };
    links: {
        linkVisitarProjeto?: string;
        linkDeploy?: string;
    };
    tecnologias?: string[];
    status?: "A desenvolver" | "Em desenvolvimento" | "Concluído";
    tags: string[];
}

interface ProjetosContextProps {
    projetos: Projeto[];
}

const API_BASE_URL = "https://ujhessie.vercel.app";

// Criando o contexto com valor inicial
const ProjetosContext = createContext<ProjetosContextProps>({
    projetos: [],
});

// Provedor do contexto de projetos
export const ProjetosProvider = ({ children }: { children: ReactNode }) => {
    const [projetos, setProjetos] = useState<Projeto[]>([]);

    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/projetos`);
                const data = await response.json();

                // Adicionando a URL base da API para as imagens apenas se necessário
                const projetosComUrlsCompletas = data.map(
                    (projeto: Projeto) => ({
                        ...projeto,
                        imagens: {
                            ...projeto.imagens,
                            imgCapa: projeto.imagens.imgCapa?.startsWith("http")
                                ? projeto.imagens.imgCapa
                                : `${API_BASE_URL}${projeto.imagens.imgCapa}`,
                            imgBanner: projeto.imagens.imgBanner?.startsWith(
                                "http"
                            )
                                ? projeto.imagens.imgBanner
                                : `${API_BASE_URL}${projeto.imagens.imgBanner}`,
                            imgSite: projeto.imagens.imgSite?.startsWith("http")
                                ? projeto.imagens.imgSite
                                : `${API_BASE_URL}${projeto.imagens.imgSite}`,
                            imgsProjeto: projeto.imagens.imgsProjeto?.map(
                                (img) =>
                                    img.startsWith("http")
                                        ? img
                                        : `${API_BASE_URL}${img}`
                            ),
                        },
                    })
                );

                setProjetos(projetosComUrlsCompletas);
            } catch (error) {
                console.error("Erro ao buscar projetos:", error);
            }
        };

        fetchProjetos();
    }, []);

    return (
        <ProjetosContext.Provider value={{ projetos }}>
            {children}
        </ProjetosContext.Provider>
    );
};

// Hook personalizado para usar o contexto de projetos
export const useProjetos = () => useContext(ProjetosContext);
