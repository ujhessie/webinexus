// Estrutura de cada projeto:
// {
//   id: string,                // obrigatório, único (usado em rotas)
//   titulo: string,            // obrigatório
//   breveDescricao: string,    // obrigatório
//   descricao: string,         // obrigatório
//   categorias: string[],      // chaves de src/mocks/categorias.js
//   tags: string[],            // opcional, tecnologias/habilidades
//   destaque: boolean,         // opcional, aparece em seções de destaque
//   imagens: {
//     banner: string,
//     capa: string,
//     galeria: string[],
//   },
//   links: Array<{ texto: string, url: string, principal?: boolean }>,
// }

export const projetos = [
  {
    id: "landing-inexus",
    titulo: "Landing Inexus",
    breveDescricao: "Página institucional com foco em conversão.",
    descricao:
      "Landing page desenvolvida para apresentar os serviços da Inexus, com seções de destaque, prova social e formulário de contato. Foco em performance e clareza da proposta de valor.",
    categorias: ["sites", "uiux"],
    tags: ["React", "Tailwind", "Vite"],
    destaque: true,
    imagens: {
      banner: "/imagens_projetos/placeholder-projeto.jpg",
      capa: "/imagens_projetos/placeholder-projeto.jpg",
      galeria: [
        "/imagens_projetos/placeholder-projeto.jpg",
        "/imagens_projetos/placeholder-projeto.jpg",
      ],
    },
    links: [
      { texto: "Visitar projeto", url: "https://exemplo.com", principal: true },
      { texto: "GitHub", url: "https://github.com/exemplo" },
    ],
  },

  {
    id: "dashboard-financeiro",
    titulo: "Dashboard Financeiro",
    breveDescricao: "Painel de controle de receitas e despesas.",
    descricao:
      "Sistema web para acompanhamento financeiro pessoal, com gráficos de fluxo de caixa, categorização de lançamentos e exportação de relatórios.",
    categorias: ["sistemas", "uiux"],
    tags: ["React", "Node.js", "PostgreSQL"],
    destaque: true,
    imagens: {
      banner: "/imagens_projetos/placeholder-projeto.jpg",
      capa: "/imagens_projetos/placeholder-projeto.jpg",
      galeria: [
        "/imagens_projetos/placeholder-projeto.jpg",
        "/imagens_projetos/placeholder-projeto.jpg",
        "/imagens_projetos/placeholder-projeto.jpg",
      ],
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
      "API REST para gerenciamento de agendamentos, com autenticação de usuários, controle de disponibilidade e notificações. Consumida por um front-end separado.",
    categorias: ["automacoes", "sistemas"],
    tags: ["Node.js", "Express", "Prisma"],
    destaque: false,
    imagens: {
      banner: "/imagens_projetos/placeholder-projeto.jpg",
      capa: "/imagens_projetos/placeholder-projeto.jpg",
      galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
    },
    links: [
      { texto: "Documentação", url: "https://exemplo.com", principal: true },
      { texto: "GitHub", url: "https://github.com/exemplo" },
    ],
  },

  {
    id: "bot-whatsapp",
    titulo: "Bot de Atendimento WhatsApp",
    breveDescricao: "Automação de respostas e triagem de mensagens.",
    descricao:
      "Bot desenvolvido para automatizar o primeiro atendimento no WhatsApp, com fluxo de triagem, respostas rápidas e encaminhamento para atendentes humanos quando necessário.",
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
      "Criação de identidade visual incluindo logotipo, paleta de cores, tipografia e aplicações em papelaria e fachada. Projeto focado em transmitir aconchego e autenticidade.",
    categorias: ["identidade", "artes"],
    tags: ["Branding", "Illustrator", "Figma"],
    destaque: true,
    imagens: {
      banner: "/imagens_projetos/placeholder-projeto.jpg",
      capa: "/imagens_projetos/placeholder-projeto.jpg",
      galeria: [
        "/imagens_projetos/placeholder-projeto.jpg",
        "/imagens_projetos/placeholder-projeto.jpg",
      ],
    },
    links: [
      { texto: "Ver projeto", url: "https://exemplo.com", principal: true },
    ],
  },

  {
    id: "social-clinica",
    titulo: "Kit Social Media Clínica",
    breveDescricao: "Pacote de artes para redes sociais.",
    descricao:
      "Conjunto de templates e artes digitais para redes sociais de uma clínica, com identidade consistente, variações para feed e stories, e guia de uso para a equipe interna.",
    categorias: ["social", "artes", "uiux"],
    tags: ["Figma", "Photoshop"],
    destaque: false,
    imagens: {
      banner: "/imagens_projetos/placeholder-projeto.jpg",
      capa: "/imagens_projetos/placeholder-projeto.jpg",
      galeria: [
        "/imagens_projetos/placeholder-projeto.jpg",
        "/imagens_projetos/placeholder-projeto.jpg",
        "/imagens_projetos/placeholder-projeto.jpg",
      ],
    },
    links: [
      { texto: "Ver galeria", url: "https://exemplo.com", principal: true },
    ],
  },
];