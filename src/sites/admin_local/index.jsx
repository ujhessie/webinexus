export const Admin_local = () => {
    return (
        <div>
            Site para gerenciar os projetos
            <div className='div'></div>
        </div>
    );
};


// Essa será uma página para gerenciar os projetos dos nossos portfólios
// Os projetos estão em "../../data/projetos.js"
// Essa parte do projeto irá manipular esses arquivos, salvando os mesmos em tempo real (mas funcionará somente em localhost)
// Essa página / Site funcionará somente em localhost
// Aqui eu vou poder editar, excluir, mover pra lixeira, editar a url das imagens e monitorar a pasta "/imagens_projetos" listando todos os arquivos e imagens em um grid e mostrando quais delas não estão sendo utilizadas
// O projeto será um dashboard bem simples, que funcionará em localhost, manipulando os arquivos sem a necessidade de criar um backend pra isso
// export const projetos = [
//     {
//         id: "loja-virtual-multitech",
//         titulo: "Loja Virtual Multitech - Eletrônicos",
//         categorias: ["sites", "uiux"],
//         imagens: {
//             capa: "/imagens_projetos/loja-virtual-multitech/capa.png",
//         },
//         status: "visivel" // Poderá ser "lixeira"
//     },
//     {
//         id: "landingpage-barbearia",
//         titulo: "Landingpage Barbearia",
//         categorias: ["sites", "uiux", ],
//          imagens: {
//             capa: "/imagens_projetos/",
//         },
//     }
// ];

// Preciso que o projeto seja simples, mas com uma interface intuitiva
// {
//         id: "landing-inexus",
//         titulo: "Landing Inexus",
//         breveDescricao: "Página institucional com foco em conversão.",
//         descricao:
//             "Landing page desenvolvida para apresentar os serviços da Inexus, com seções de destaque, prova social e formulário de contato.",
//         categorias: ["sites", "uiux"],
//         tags: ["React", "Tailwind", "Vite"],
//         destaque: true,
//         imagens: {
//             banner: "/imagens_projetos/placeholder-projeto.jpg",
//             capa: "/imagens_projetos/placeholder-projeto.jpg",
//             galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
//         },
//         links: [
//             {
//                 texto: "Visitar projeto",
//                 url: "https://exemplo.com",
//                 principal: true,
//             },
//             { texto: "GitHub", url: "https://github.com/exemplo" },
//         ],
//     },
//     {
//         id: "dashboard-financeiro",
//         titulo: "Dashboard Financeiro",
//         breveDescricao: "Painel de controle de receitas e despesas.",
//         descricao:
//             "Sistema web para acompanhamento financeiro pessoal, com gráficos de fluxo de caixa e exportação de relatórios.",
//         categorias: ["sistemas", "uiux"],
//         tags: ["React", "Node.js", "PostgreSQL"],
//         destaque: true,
//         imagens: {
//             banner: "/imagens_projetos/placeholder-projeto.jpg",
//             capa: "/imagens_projetos/placeholder-projeto.jpg",
//             galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
//         },
//         links: [
//             { texto: "Ver demo", url: "https://exemplo.com", principal: true },
//             { texto: "GitHub", url: "https://github.com/exemplo" },
//         ],
//     },
//     {
//         id: "api-agendamentos",
//         titulo: "API de Agendamentos",
//         breveDescricao: "Backend para sistema de marcação de horários.",
//         descricao:
//             "API REST para gerenciamento de agendamentos, com autenticação e controle de disponibilidade.",
//         categorias: ["automacoes", "sistemas"],
//         tags: ["Node.js", "Express", "Prisma"],
//         destaque: false,
//         imagens: {
//             banner: "/imagens_projetos/placeholder-projeto.jpg",
//             capa: "/imagens_projetos/placeholder-projeto.jpg",
//             galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
//         },
//         links: [
//             {
//                 texto: "Documentação",
//                 url: "https://exemplo.com",
//                 principal: true,
//             },
//             { texto: "GitHub", url: "https://github.com/exemplo" },
//         ],
//     },
//     {
//         id: "bot-whatsapp",
//         titulo: "Bot de Atendimento WhatsApp",
//         breveDescricao: "Automação de respostas e triagem de mensagens.",
//         descricao:
//             "Bot para automatizar o primeiro atendimento no WhatsApp, com fluxo de triagem e encaminhamento para atendentes.",
//         categorias: ["automacoes"],
//         tags: ["Node.js", "WhatsApp API"],
//         destaque: false,
//         imagens: {
//             banner: "/imagens_projetos/placeholder-projeto.jpg",
//             capa: "/imagens_projetos/placeholder-projeto.jpg",
//             galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
//         },
//         links: [
//             { texto: "Ver caso", url: "https://exemplo.com", principal: true },
//         ],
//     },
//     {
//         id: "identidade-cafeteria",
//         titulo: "Identidade Visual Cafeteria",
//         breveDescricao: "Marca completa para cafeteria artesanal.",
//         descricao:
//             "Identidade visual com logotipo, paleta de cores, tipografia e aplicações em papelaria e fachada.",
//         categorias: ["identidade", "artes"],
//         tags: ["Branding", "Illustrator", "Figma"],
//         destaque: true,
//         imagens: {
//             banner: "/imagens_projetos/placeholder-projeto.jpg",
//             capa: "/imagens_projetos/placeholder-projeto.jpg",
//             galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
//         },
//         links: [
//             {
//                 texto: "Ver projeto",
//                 url: "https://exemplo.com",
//                 principal: true,
//             },
//         ],
//     },
//     {
//         id: "social-clinica",
//         titulo: "Kit Social Media Clínica",
//         breveDescricao: "Pacote de artes para redes sociais.",
//         descricao:
//             "Templates e artes digitais para redes sociais de uma clínica, com identidade consistente e guia de uso.",
//         categorias: ["social", "artes", "uiux"],
//         tags: ["Figma", "Photoshop"],
//         destaque: false,
//         imagens: {
//             banner: "/imagens_projetos/placeholder-projeto.jpg",
//             capa: "/imagens_projetos/placeholder-projeto.jpg",
//             galeria: ["/imagens_projetos/placeholder-projeto.jpg"],
//         },
//         links: [
//             {
//                 texto: "Ver galeria",
//                 url: "https://exemplo.com",
//                 principal: true,
//             },
//         ],
//     },
// ]




// Assim as imagens poderao ser
// /imagens_projetos/

// ├── loja-virtual-multitech/
// │   ├── capa.png
// │   ├── banner.png
// │   └── produto-01.png
// │
// ├── landing-inexus/
// │   ├── capa.png
// │   └── banner.png
// │
// └── imagem-solta.png

// O dashboard poderia identificar:
// ✓ utilizada
// ✓ utilizada
// ✓ utilizada

// ⚠ não utilizada
// ⚠ não utilizada




// ┌──────────────────────────────────────────────┐
// │ Projetos                         [+ Novo]    │
// ├──────────────────────────────────────────────┤
// │ 🔎 Buscar...     Categoria ▼    Status ▼    │
// ├──────────────────────────────────────────────┤
// │                                              │
// │ ┌─────────────┐ ┌─────────────┐             │
// │ │   imagem    │ │   imagem    │             │
// │ │             │ │             │             │
// │ │ Multitech   │ │ Landing     │             │
// │ │ Sites       │ │ Sites       │             │
// │ │             │ │             │             │
// │ │ Editar      │ │ Editar      │             │
// │ └─────────────┘ └─────────────┘             │
// └──────────────────────────────────────────────┘



// React
//   ↓
// Dashboard
//   ↓
// Vite / Node local
//   ↓
// Sistema de arquivos



// 