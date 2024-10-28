export interface projeto {
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
}

export const projetos: projeto[] = [
    {
        id: 1,
        titulo: "GoodDelivery | Sistema de pedidos online",
        desc: "Um cardápio online integrado com diversos recursos como pedidos diretamente no WhatsApp, painel de gerenciamento de entregas, fácil gerenciamento de produtos e outros recursos bem legais.",
        links: {
            linkVisitarProjeto: "https://good-delivery.vercel.app/",
        },
        tecnologias: ["Wordpress", "Woocommerce", "WhatsApp"],
        imagens: {
            imgCapa: "/images/projetos/1/capa.png",
            imgSite: "",
            imgBanner: "/images/projetos/1/banner.png",
            imgsProjeto: [
                "/images/projetos/1/img1.png",
                "/images/projetos/1/img2.png",
                "/images/projetos/1/img3.png",
            ],
        },
    },
    {
        id: 2,
        titulo: "Prime Store | E-commerce de eletrônicos",
        desc: "Projeto simples e minimalista com foco em uma loja de eletrônicos. O projeto foi feito em Wordpress e possui diversos recursos interessantes para o gerenciamento do site.",
        links: {
            linkVisitarProjeto: "https://primeshop-webinexus.vercel.app/",
        },
        tecnologias: ["Wordpress", "Woocommerce", "Elementor"],
        imagens: {
            imgCapa: "/images/projetos/2/capa.png",
            imgSite: "",
            imgBanner: "",
            imgsProjeto: [
                "/images/projetos/2/img1.png",
                "/images/projetos/2/img2.png",
            ],
        },
    },
    {
        id: 3,
        titulo: "GG Ofertas | Loja para produtos afiliados",
        desc: "Loja para vendedores de produtos afiliados. Feito em React e tem a função de ser rápido e otimizado. Além de ser editável pelo Google Sheets.",
        links: {
            linkVisitarProjeto: "https://ujhessie.github.io/ggofertas/",
            linkDeploy: "https://github.com/ujhessie/ggofertas",
        },
        tecnologias: ["React js", "Sass", "Google Sheets"],
        imagens: {
            imgCapa: "/images/projetos/3/capa.png",
            imgSite: "",
            imgBanner: "",
            imgsProjeto: [],
        },
    },
    {
        id: 4,
        titulo: "DevShop | Loja virtual",
        desc: "Loja virtual feita em WordPress: simples, elegante, otimizada e adaptável a diversas telas. Perfeita para qualquer nicho.",
        links: {},
        tecnologias: ["Wordpress", "Woocommerce", "Elementor"],
        imagens: {
            imgCapa: "/images/projetos/4/capa.png",
            imgSite: "",
            imgBanner: "",
            imgsProjeto: [
                "/images/projetos/4/1.png",
                "/images/projetos/4/2.png",
            ],
        },
    },
    {
        id: 5,
        titulo: "Lablingue | Site curso de inglês",
        desc: "Landingpage para venda de curso de inglês. Simples, moderno, otimizado e escalável para outros projetos.",
        links: {},
        tecnologias: ["Wordpress", "Woocommerce", "Elementor"],
        imagens: {
            imgCapa: "/images/projetos/5/capa.png",
            imgSite: "",
            imgBanner: "",
            imgsProjeto: ["/images/projetos/5/1.png"],
        },
    },
    {
        id: 6,
        titulo: "GIDELIVERY | Sistema de pedidos",
        desc: "Sistema de pedido para pequenas lanchonetes. O sistema é integrado com a função de pedidos via WhatsApp, além de ser escalável para um projeto Saas.",
        links: {},
        tecnologias: ["Next js", "MongoDB", "Figma"],
        imagens: {
            imgCapa: "/images/projetos/6/capa.png",
            imgSite: "",
            imgBanner: "",
            imgsProjeto: [],
        },
        status: "Em desenvolvimento",
    },
    {
        id: 7,
        titulo: "API para upload de arquivos",
        desc: "Loja virtual com sistema de fidelidade. O sistema é feito em Next js, React js, Redux e Typescript.",
        links: {},
        tecnologias: ["Node js", "Multer", "Typescript", "Express"],
        imagens: {
            imgCapa:
                "https://e0.pxfuel.com/wallpapers/86/808/desktop-wallpaper-js-node-js.jpg",
        },
        status: "Em desenvolvimento",
    },
    {
        id: 8,
        titulo: "API | Upload de imagens para o Google Drive",
        desc: "A API de Upload de Imagens é uma aplicação desenvolvida utilizando Express.js e Google Drive, projetada para facilitar o upload, armazenamento e visualização de imagens. O objetivo principal é permitir que usuários façam upload de imagens através de uma interface web, salvem essas imagens no Google Drive e acessem as URLs das imagens diretamente da aplicação. A API gerencia o upload dos arquivos, define permissões de compartilhamento apropriadas e retorna URLs acessíveis para visualização das imagens.",
        links: {
            linkVisitarProjeto: "https://github.com/ujhessie/upload-de-imagens"
        },
        tecnologias: ["Node js", "Multer", "Google API", "Typescript", "Express"],
        imagens: {
            imgCapa: "https://wallpapercave.com/wp/wp5070716.jpg",
        },
       
    },
    {
        id: 9,
        titulo: "Planejador de viagem | NLW Rocketseat 2024",
        desc: "O projeto é um site desktop desenvolvido para facilitar a criação de planos de viagem em grupo, permitindo que os usuários registrem atividades e compartilhem links úteis. Este projeto faz parte do evento NLW Journey, oferecido pela Rocketseat, e visa promover a colaboração e a organização entre amigos durante o planejamento de viagens.",
        links: {},
        tecnologias: ["Vite", "React js", "Tailwind", "Typescript"],
        imagens: {
            imgCapa: "/images/projetos/9/capa.png",
        },
        status: "Em desenvolvimento",
    },
];