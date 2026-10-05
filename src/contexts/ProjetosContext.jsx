import { createContext, useContext } from "react";

/* ------------------------------------------------------------------ */
/* Mocks                                                               */
/* ------------------------------------------------------------------ */

const categorias = {
    sites: { label: "Sites", grupo: "sites-sistemas" },
    sistemas: { label: "Sistemas", grupo: "sites-sistemas" },

    automacoes: { label: "Automações", grupo: "automacoes" },
    apis: { label: "APIs", grupo: "automacoes" },

    uiux: { label: "UI/UX", grupo: "design" },
    identidade: { label: "Identidade Visual", grupo: "design" },
    artes: { label: "Artes Digitais", grupo: "design" },
    social: { label: "Social Media", grupo: "design" },
};

const filtros = [
    { id: "todos", label: "Todos" },
    { id: "sites-sistemas", label: "Sites & Sistemas" },
    { id: "automacoes", label: "Automações" },
    { id: "design", label: "Design & UI UX" },
];

const projetos = [
    {
        id: "landing-inexus",
        titulo: "Landing Inexus",
        breveDescricao: "Página institucional com foco em conversão.",
        descricao:
            "Landing page desenvolvida para apresentar os serviços da Inexus, com seções de destaque, prova social e formulário de contato.",
        categorias: ["sites", "uiux"],
        tags: ["React", "Tailwind", "Vite"],
        destaque: true,
        imagens: {
            banner: "/imagens_projetos/placeholder-projeto.jpg",
            capa: "/imagens_projetos/placeholder-projeto.jpg",
            galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
        },
        links: [
            {
                texto: "Visitar projeto",
                url: "https://exemplo.com",
                principal: true,
            },
            { texto: "GitHub", url: "https://github.com/exemplo" },
        ],
    },
    {
        id: "dashboard-financeiro",
        titulo: "Dashboard Financeiro",
        breveDescricao: "Painel de controle de receitas e despesas.",
        descricao:
            "Sistema web para acompanhamento financeiro pessoal, com gráficos de fluxo de caixa e exportação de relatórios.",
        categorias: ["sistemas", "uiux"],
        tags: ["React", "Node.js", "PostgreSQL"],
        destaque: true,
        imagens: {
            banner: "/imagens_projetos/placeholder-projeto.jpg",
            capa: "/imagens_projetos/placeholder-projeto.jpg",
            galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
        },
        links: [
            { texto: "Ver demo", url: "https://exemplo.com", principal: true },
            { texto: "GitHub", url: "https://github.com/exemplo" },
        ],
    },
    {
        id: "api-agendamentos",
        titulo: "API de Agendamentos",
        breveDescricao: "Backend para sistema de marcação de horários.",
        descricao:
            "API REST para gerenciamento de agendamentos, com autenticação e controle de disponibilidade.",
        categorias: ["automacoes", "sistemas"],
        tags: ["Node.js", "Express", "Prisma"],
        destaque: false,
        imagens: {
            banner: "/imagens_projetos/placeholder-projeto.jpg",
            capa: "/imagens_projetos/placeholder-projeto.jpg",
            galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
        },
        links: [
            {
                texto: "Documentação",
                url: "https://exemplo.com",
                principal: true,
            },
            { texto: "GitHub", url: "https://github.com/exemplo" },
        ],
    },
    {
        id: "bot-whatsapp",
        titulo: "Bot de Atendimento WhatsApp",
        breveDescricao: "Automação de respostas e triagem de mensagens.",
        descricao:
            "Bot para automatizar o primeiro atendimento no WhatsApp, com fluxo de triagem e encaminhamento para atendentes.",
        categorias: ["automacoes"],
        tags: ["Node.js", "WhatsApp API"],
        destaque: false,
        imagens: {
            banner: "/imagens_projetos/placeholder-projeto.jpg",
            capa: "/imagens_projetos/placeholder-projeto.jpg",
            galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
        },
        links: [
            { texto: "Ver caso", url: "https://exemplo.com", principal: true },
        ],
    },
    {
        id: "identidade-cafeteria",
        titulo: "Identidade Visual Cafeteria",
        breveDescricao: "Marca completa para cafeteria artesanal.",
        descricao:
            "Identidade visual com logotipo, paleta de cores, tipografia e aplicações em papelaria e fachada.",
        categorias: ["identidade", "artes"],
        tags: ["Branding", "Illustrator", "Figma"],
        destaque: true,
        imagens: {
            banner: "/imagens_projetos/placeholder-projeto.jpg",
            capa: "/imagens_projetos/placeholder-projeto.jpg",
            galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
        },
        links: [
            {
                texto: "Ver projeto",
                url: "https://exemplo.com",
                principal: true,
            },
        ],
    },
    {
        id: "social-clinica",
        titulo: "Kit Social Media Clínica",
        breveDescricao: "Pacote de artes para redes sociais.",
        descricao:
            "Templates e artes digitais para redes sociais de uma clínica, com identidade consistente e guia de uso.",
        categorias: ["social", "artes", "uiux"],
        tags: ["Figma", "Photoshop"],
        destaque: false,
        imagens: {
            banner: "/imagens_projetos/placeholder-projeto.jpg",
            capa: "/imagens_projetos/placeholder-projeto.jpg",
            galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
        },
        links: [
            {
                texto: "Ver galeria",
                url: "https://exemplo.com",
                principal: true,
            },
        ],
    },
];

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

const ProjetosContext = createContext(null);

export const ProjetosProvider = ({ children }) => {
    // helpers opcionais — economizam lógica nos componentes
    const getProjetoPorId = (id) => projetos.find((p) => p.id === id);

    const getCategoria = (chave) => categorias[chave];

    const getProjetosPorGrupo = (grupo) => {
        if (grupo === "todos") return projetos;
        return projetos.filter((p) =>
            p.categorias.some((cat) => categorias[cat]?.grupo === grupo),
        );
    };

    const value = {
        projetos,
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

export const useProjetos = () => {
    const ctx = useContext(ProjetosContext);
    if (!ctx) {
        throw new Error(
            "useProjetos deve ser usado dentro de <ProjetosProvider>",
        );
    }
    return ctx;
};
