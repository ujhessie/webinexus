import React, { useState, useMemo } from "react";
import {
    Sparkles,
    Palette,
    Layers,
    Copy,
    Check,
    FileCode,
    Layout,
    Type,
    Component,
    Search,
    ArrowRight,
    ExternalLink,
    CheckCircle2,
    Zap,
    BookOpen,
    Code2,
    Eye,
    ShieldCheck,
    FolderTree,
    Terminal,
    Info,
    MoveRight,
    Maximize2,
    Sliders,
    Globe,
    User,
    LayoutDashboard,
} from "lucide-react";

// Componentes Reutilizáveis Oficiais do Projeto
import { Botao } from "../../componentes/ui/Botao/Botao.jsx";
import { Badge } from "../../componentes/ui/Badge/Badge.jsx";
import { Marquee } from "../../componentes/ui/Marquee/Marquee.jsx";
import { CardProjeto } from "../../componentes/layout/CardProjeto/CardProjeto.jsx";
import { Header } from "../../componentes/layout/Header.jsx";
import { Footer } from "../../componentes/layout/Footer.jsx";
import { SmoothScroll } from "../../componentes/layout/SmoothScroll.jsx";
import { SCROLL_CONFIG } from "../../config/scrollConfig.js";
import { useProjetos } from "../../contexts/ProjetosContext.jsx";

// ==========================================
// DADOS DOS DESIGN TOKENS
// ==========================================
const TOKENS_CORES = [
    {
        nome: "Roxo Principal",
        variavel: "--color-roxo-principal",
        classe: "bg-roxo-principal",
        textoClasse: "text-roxo-principal",
        hex: "#b72ffe",
        rgb: "rgb(183, 47, 254)",
        descricao: "Cor de destaque primária da marca. Utilizada em CTAs, bordas ativas e realces.",
        categoria: "marca",
    },
    {
        nome: "Roxo Escuro",
        variavel: "--color-roxo-escuro",
        classe: "bg-roxo-escuro",
        textoClasse: "text-roxo-escuro",
        hex: "#7b1fe1",
        rgb: "rgb(123, 31, 225)",
        descricao: "Início dos gradientes oficiais da marca e estados de sombra profunda.",
        categoria: "marca",
    },
    {
        nome: "Roxo Claro",
        variavel: "--color-roxo-claro",
        classe: "bg-roxo-claro",
        textoClasse: "text-roxo-claro",
        hex: "#b62dfe",
        rgb: "rgb(182, 45, 254)",
        descricao: "Fim dos gradientes e estados hover dos botões primários.",
        categoria: "marca",
    },
    {
        nome: "Preto Fosco",
        variavel: "--color-preto-fosco",
        classe: "bg-preto-fosco",
        textoClasse: "text-preto-fosco",
        hex: "#161724",
        rgb: "rgb(22, 23, 36)",
        descricao: "Superfície de cartões, formulários, modais e containers secundários.",
        categoria: "superficie",
    },
    {
        nome: "Preto Escuro",
        variavel: "--color-preto-escuro",
        classe: "bg-preto-escuro",
        textoClasse: "text-preto-escuro",
        hex: "#050610",
        rgb: "rgb(5, 6, 16)",
        descricao: "Fundo base padrão da aplicação (body, sections e header).",
        categoria: "superficie",
    },
    {
        nome: "Sucesso / Ativo",
        variavel: "emerald-400 / emerald-500",
        classe: "bg-emerald-500",
        textoClasse: "text-emerald-400",
        hex: "#10b981",
        rgb: "rgb(16, 185, 129)",
        descricao: "Status online, aprovações, projetos ativos e confirmações.",
        categoria: "apoio",
    },
    {
        nome: "Atenção / Destaque",
        variavel: "amber-400 / amber-500",
        classe: "bg-amber-400",
        textoClasse: "text-amber-400",
        hex: "#fbbf24",
        rgb: "rgb(251, 191, 36)",
        descricao: "Favoritos, tags em destaque, badges de atenção e alertas.",
        categoria: "apoio",
    },
    {
        nome: "Remoção / Erro",
        variavel: "rose-500 / red-500",
        classe: "bg-rose-500",
        textoClasse: "text-rose-400",
        hex: "#f43f5e",
        rgb: "rgb(244, 63, 94)",
        descricao: "Ações destrutivas, exclusão para lixeira e validações de erro.",
        categoria: "apoio",
    },
];

const GRADIENTES_OFICIAIS = [
    {
        nome: "Gradiente Marca (Horizontal)",
        classe: "bg-linear-to-r from-roxo-escuro to-roxo-principal",
        uso: "Botões primários, badges de destaque, cards ativos e faixas decorativas.",
    },
    {
        nome: "Gradiente Texto (Clipping)",
        classe: "bg-linear-to-r from-roxo-escuro to-roxo-principal bg-clip-text text-transparent",
        uso: "Palavras-chave em títulos (aplicado automaticamente pela tag <strong>).",
    },
    {
        nome: "Gradiente Fundo Seções",
        classe: "bg-linear-to-r from-preto-escuro via-preto-escuro/90 to-preto-escuro/40",
        uso: "Overlays de fundo para banners e seções hero com imagens de background.",
    },
    {
        nome: "Gradiente Overlay Card",
        classe: "bg-linear-to-t from-preto-escuro/90 via-preto-escuro/20 to-transparent",
        uso: "Camada sobreposta em cards de imagem para garantir legibilidade dos textos.",
    },
];

const SECOES_NAV = [
    { id: "visao-geral", rotulo: "Visão Geral", icone: BookOpen },
    { id: "tokens", rotulo: "Tokens & Cores", icone: Palette },
    { id: "tipografia", rotulo: "Tipografia", icone: Type },
    { id: "layout", rotulo: "Layout & Grid", icone: Layout },
    { id: "componentes-ui", rotulo: "Componentes UI", icone: Component },
    { id: "componentes-layout", rotulo: "Layout & Estruturas", icone: Layers },
    { id: "formularios", rotulo: "Formulários & Inputs", icone: Sliders },
    { id: "diretrizes", rotulo: "Checklist de Criação", icone: ShieldCheck },
];

export const DesignSystemSite = () => {
    const [secaoAtiva, setSecaoAtiva] = useState("visao-geral");
    const [busca, setBusca] = useState("");
    const [copiado, setCopiado] = useState(null);

    const copiarTexto = (texto, identificador) => {
        navigator.clipboard.writeText(texto);
        setCopiado(identificador);
        setTimeout(() => setCopiado(null), 2000);
    };

    const tokensFiltrados = useMemo(() => {
        if (!busca.trim()) return TOKENS_CORES;
        const b = busca.toLowerCase();
        return TOKENS_CORES.filter(
            (t) =>
                t.nome.toLowerCase().includes(b) ||
                t.hex.toLowerCase().includes(b) ||
                t.classe.toLowerCase().includes(b) ||
                t.descricao.toLowerCase().includes(b)
        );
    }, [busca]);

    return (
        <div className="min-h-screen bg-preto-escuro text-white font-corpo selection:bg-roxo-principal selection:text-white">
            {/* Topbar / Banner de Identificação */}
            <header className="sticky top-0 z-40 bg-preto-escuro/85 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-roxo-escuro to-roxo-principal flex items-center justify-center text-white shadow-lg shadow-roxo-principal/30">
                            <Layers className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-bold font-titulo tracking-wide text-white">
                                    DESIGN SYSTEM
                                </h1>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-roxo-principal/20 border border-roxo-principal/40 text-roxo-claro">
                                    v2.0 OFICIAL
                                </span>
                            </div>
                            <p className="text-xs text-zinc-400">
                                Guia de padrões para Web Inexus, Ujhessie e Admin
                            </p>
                        </div>
                    </div>

                    {/* Barra de Pesquisa Rápida */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-full md:w-72">
                            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar componente, cor ou token..."
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-xs bg-preto-fosco border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-roxo-principal focus:ring-1 focus:ring-roxo-principal transition"
                            />
                        </div>

                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Ambiente Ativo</span>
                        </div>
                    </div>
                </div>

                {/* Sub-menu horizontal com abas */}
                <nav className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-none flex gap-2 border-t border-white/5 py-2">
                    {SECOES_NAV.map((secao) => {
                        const Icone = secao.icone;
                        const ativo = secaoAtiva === secao.id;
                        return (
                            <button
                                key={secao.id}
                                onClick={() => {
                                    setSecaoAtiva(secao.id);
                                    const el = document.getElementById(secao.id);
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-titulo font-semibold whitespace-nowrap transition ${
                                    ativo
                                        ? "bg-linear-to-r from-roxo-escuro to-roxo-principal text-white shadow-md shadow-roxo-escuro/30"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <Icone className="w-3.5 h-3.5" />
                                <span>{secao.rotulo}</span>
                            </button>
                        );
                    })}
                </nav>
            </header>

            {/* Conteúdo Central */}
            <main className="max-w-7xl mx-auto px-6 py-10 space-y-20">
                {/* 1. VISÃO GERAL */}
                <section id="visao-geral" className="scroll-mt-32 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-roxo-escuro/20 via-preto-fosco to-preto-fosco border border-roxo-principal/30 shadow-xl">
                        <div className="space-y-2 max-w-2xl">
                            <Badge textoBadge="PADRÃO OFICIAL DO PROJETO" />
                            <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                                Regra de Ouro: <strong>Consistência e Reuso</strong>
                            </h2>
                            <p className="text-zinc-300 text-sm leading-relaxed">
                                Sempre que formos criar uma nova tela, design ou funcionalidade,{" "}
                                <span className="text-roxo-claro font-semibold">
                                    busque primeiro neste Design System
                                </span>
                                . Reutilize os componentes existentes. Se precisar criar um novo
                                padrão ou componente global, adicione-o neste arquivo e na pasta
                                correspondente.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 shrink-0">
                            <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 p-3 rounded-2xl border border-white/10">
                                <FolderTree className="w-4 h-4 text-roxo-principal" />
                                <div>
                                    <p className="font-semibold text-white">Componentes UI:</p>
                                    <code className="text-roxo-claro text-[11px]">
                                        src/componentes/ui/
                                    </code>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-300 bg-white/5 p-3 rounded-2xl border border-white/10">
                                <Layout className="w-4 h-4 text-purple-400" />
                                <div>
                                    <p className="font-semibold text-white">Componentes Layout:</p>
                                    <code className="text-purple-300 text-[11px]">
                                        src/componentes/layout/
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cards explicativos das regras */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-5 rounded-2xl bg-preto-fosco border border-white/10 space-y-2">
                            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <h3 className="font-titulo font-bold text-sm text-white">
                                1. Reutilize antes de criar
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Verifique se o botão, card, badge ou container já existe antes de
                                codificar algo novo. Evite duplicidade desnecessária.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-preto-fosco border border-white/10 space-y-2">
                            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                <FileCode className="w-4 h-4" />
                            </div>
                            <h3 className="font-titulo font-bold text-sm text-white">
                                2. Novos Componentes Globais
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Se um novo componente for criado para uso compartilhado, salve em{" "}
                                <code>src/componentes/ui/</code> e documente aqui no Design System.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-preto-fosco border border-white/10 space-y-2">
                            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                <Component className="w-4 h-4" />
                            </div>
                            <h3 className="font-titulo font-bold text-sm text-white">
                                3. Componentes Específicos
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Peças exclusivas de uma página devem permanecer junto à própria
                                página para não sobrecarregar os componentes globais.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2. TOKENS DE CORES & GRADIENTES */}
                <section id="tokens" className="scroll-mt-32 space-y-6">
                    <div className="border-b border-white/10 pb-4">
                        <Badge textoBadge="DESIGN TOKENS" />
                        <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                            Paleta de Cores & <strong>Gradientes</strong>
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Definidas no arquivo global <code>style.css</code> via Tailwind v4{" "}
                            <code>@theme</code>.
                        </p>
                    </div>

                    {/* Grade de Cores */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {tokensFiltrados.map((token) => {
                            const chaveCopiado = `cor-${token.nome}`;
                            return (
                                <div
                                    key={token.nome}
                                    className="p-4 rounded-2xl bg-preto-fosco border border-white/10 hover:border-roxo-principal/50 transition group flex flex-col justify-between"
                                >
                                    <div>
                                        <div
                                            className={`w-full h-20 rounded-xl mb-3 shadow-inner ${token.classe} flex items-end p-2 border border-white/10`}
                                        >
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white font-bold">
                                                {token.hex}
                                            </span>
                                        </div>

                                        <h3 className="font-titulo font-bold text-sm text-white flex items-center justify-between">
                                            <span>{token.nome}</span>
                                            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                                                {token.categoria}
                                            </span>
                                        </h3>

                                        <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                                            {token.descricao}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-zinc-500 font-mono">Classe:</span>
                                            <button
                                                type="button"
                                                onClick={() => copiarTexto(token.classe, `${chaveCopiado}-classe`)}
                                                className="flex items-center gap-1 font-mono text-roxo-claro hover:text-white transition"
                                                title="Copiar classe Tailwind"
                                            >
                                                <span>{token.classe}</span>
                                                {copiado === `${chaveCopiado}-classe` ? (
                                                    <Check className="w-3 h-3 text-emerald-400" />
                                                ) : (
                                                    <Copy className="w-3 h-3 opacity-60" />
                                                )}
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-zinc-500 font-mono">Variável:</span>
                                            <code className="text-zinc-400 font-mono text-[10px]">
                                                {token.variavel}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Gradientes Oficiais */}
                    <div className="pt-4 space-y-4">
                        <h3 className="font-titulo font-bold text-lg text-white">
                            Gradientes Oficiais da Marca
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {GRADIENTES_OFICIAIS.map((grad, i) => {
                                const chaveGrad = `grad-${i}`;
                                return (
                                    <div
                                        key={grad.nome}
                                        className="p-5 rounded-2xl bg-preto-fosco border border-white/10 space-y-3"
                                    >
                                        <div
                                            className={`w-full h-14 rounded-xl ${grad.classe} border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-md`}
                                        >
                                            {grad.nome.includes("Texto") ? (
                                                <span className="text-lg font-titulo font-black bg-linear-to-r from-roxo-escuro to-roxo-principal bg-clip-text text-transparent">
                                                    EXEMPLO DE TEXTO COM GRADIENTE
                                                </span>
                                            ) : (
                                                <span>Preview do Gradiente</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-titulo font-bold text-sm text-white">
                                                    {grad.nome}
                                                </h4>
                                                <p className="text-[11px] text-zinc-400">{grad.uso}</p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => copiarTexto(grad.classe, chaveGrad)}
                                                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition"
                                            >
                                                {copiado === chaveGrad ? (
                                                    <>
                                                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                                                        <span className="text-emerald-400">Copiado</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3.5 h-3.5" />
                                                        <span>Copiar Classe</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <code className="block p-2 rounded-lg bg-black/40 text-[11px] font-mono text-zinc-300 break-all">
                                            {grad.classe}
                                        </code>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 3. TIPOGRAFIA */}
                <section id="tipografia" className="scroll-mt-32 space-y-6">
                    <div className="border-b border-white/10 pb-4">
                        <Badge textoBadge="HIERARQUIA VISUAL" />
                        <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                            Tipografia & <strong>Fontes</strong>
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Combinação de <span className="text-white font-semibold">Space Grotesk</span> para títulos e botões com{" "}
                            <span className="text-white font-semibold">Poppins</span> para corpo e descrições.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* H1 */}
                        <div className="p-6 rounded-2xl bg-preto-fosco border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                                    Título H1 (Hero & Destaque)
                                </span>
                                <code className="text-xs text-zinc-400 font-mono">
                                    font-titulo font-black text-4xl sm:text-5xl lg:text-7xl uppercase
                                </code>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-titulo uppercase text-white">
                                CONSTRUA O FUTURO <strong>DIGITAL</strong>
                            </h1>
                            <p className="text-xs text-zinc-400">
                                💡 Dica: Toda tag <code>&lt;strong&gt;</code> dentro de títulos herda
                                automaticamente o gradiente roxo oficial!
                            </p>
                        </div>

                        {/* H2 */}
                        <div className="p-6 rounded-2xl bg-preto-fosco border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                                    Título H2 (Seções de Conteúdo)
                                </span>
                                <code className="text-xs text-zinc-400 font-mono">
                                    font-titulo text-3xl sm:text-4xl font-bold
                                </code>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-titulo font-bold text-white">
                                Desenvolvimento e tecnologia aplicados a <strong>problemas reais</strong>
                            </h2>
                        </div>

                        {/* H3 */}
                        <div className="p-6 rounded-2xl bg-preto-fosco border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                                    Título H3 (Cards e Subtítulos)
                                </span>
                                <code className="text-xs text-zinc-400 font-mono">
                                    font-titulo text-xl sm:text-2xl font-semibold
                                </code>
                            </div>
                            <h3 className="text-xl font-titulo font-semibold text-white">
                                Sistema de Delivery & E-commerce Integrado
                            </h3>
                        </div>

                        {/* Corpo / Parágrafo */}
                        <div className="p-6 rounded-2xl bg-preto-fosco border border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                                    Corpo de Texto (Parágrafos)
                                </span>
                                <code className="text-xs text-zinc-400 font-mono">
                                    font-corpo text-sm sm:text-base text-zinc-300 leading-relaxed
                                </code>
                            </div>
                            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-corpo max-w-3xl">
                                Desenvolvemos projetos digitais de alta performance, desde interfaces intuitivas até
                                automações completas. Nossa estrutura garante velocidade, clareza e padrão profissional
                                em cada entrega.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. LAYOUT & GRID */}
                <section id="layout" className="scroll-mt-32 space-y-6">
                    <div className="border-b border-white/10 pb-4">
                        <Badge textoBadge="ESTRUTURAÇÃO" />
                        <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                            Layout, Grid & <strong>Containers</strong>
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Padrão de centralização, padding e larguras máximas utilizado em todas as páginas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Container Content-Section */}
                        <div className="p-6 rounded-2xl bg-preto-fosco border border-white/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-titulo font-bold text-base text-white">
                                    Container Universal: <code>.content-section</code>
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => copiarTexto("content-section", "layout-content")}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition"
                                >
                                    {copiado === "layout-content" ? (
                                        <Check className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Utilitário registrado no <code>style.css</code>. Centraliza o conteúdo,
                                define largura máxima de <code>max-w-7xl</code> e aplica padding lateral
                                responsivo (<code>px-6 sm:px-10 lg:px-12</code>).
                            </p>
                            <div className="p-4 rounded-xl border border-dashed border-roxo-principal/40 bg-roxo-principal/5 text-center text-xs text-roxo-claro font-mono">
                                &lt;div className=&quot;content-section&quot;&gt; ...conteúdo... &lt;/div&gt;
                            </div>
                        </div>

                        {/* Espaçamento Vertical de Seções */}
                        <div className="p-6 rounded-2xl bg-preto-fosco border border-white/10 space-y-4">
                            <h3 className="font-titulo font-bold text-base text-white">
                                Espaçamento Vertical de Seções
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Mantenha o respiro visual entre as seções usando os seguintes padrões:
                            </p>
                            <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                    <span>Seções Padrão:</span>
                                    <code className="text-roxo-claro">py-16 sm:py-20 lg:py-24</code>
                                </li>
                                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                    <span>Hero Sections:</span>
                                    <code className="text-roxo-claro">min-h-140 lg:min-h-160</code>
                                </li>
                                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                    <span>Gaps de Grid:</span>
                                    <code className="text-roxo-claro">gap-4 sm:gap-6 lg:gap-8</code>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 5. COMPONENTES UI */}
                <section id="componentes-ui" className="scroll-mt-32 space-y-8">
                    <div className="border-b border-white/10 pb-4">
                        <Badge textoBadge="BIBLIOTECA UI" />
                        <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                            Componentes UI Reutilizáveis (<code>src/componentes/ui/</code>)
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Componentes atomizados prontos para uso em qualquer site da aplicação.
                        </p>
                    </div>

                    {/* COMPONENTE: BOTÃO */}
                    <ComponentDocCard
                        nome="Botao"
                        arquivo="src/componentes/ui/Botao/Botao.jsx"
                        descricao="Botão universal com 4 variantes (primário com gradiente, secundário com efeito vidro, outline e branco para superfícies coloridas/destaque), suporte a ícone CTA estilizado e estados hover com elevação suave."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { Botao } from "../componentes/ui/Botao/Botao.jsx";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Variante Primária
<Botao textoCTA="Fale Conosco" iconCTA={<ArrowRight className="w-4 h-4 text-white" />} />

// Variante Secundária
<Botao tipoBotao="secundario" textoCTA="Ver Projetos" />

// Variante Outline
<Botao tipoBotao="outline" textoCTA="Saiba Mais" />

// Variante Branca (para seções roxas/coloridas)
<Botao tipoBotao="branco" iconCTA={<ArrowRight className="w-4 h-4 text-white" />}>
    <FaWhatsapp className="w-5 h-5 text-roxo-escuro" />
    <span>Quero Evoluir Meu Negócio</span>
</Botao>`}
                        props={[
                            { nome: "tipoBotao", tipo: "'primario' | 'secundario' | 'outline' | 'branco'", padrao: "'primario'", desc: "Estilo visual do botão" },
                            { nome: "textoCTA", tipo: "string", padrao: "-", desc: "Texto exibido no botão" },
                            { nome: "iconCTA", tipo: "ReactNode", padrao: "null", desc: "Ícone exibido dentro do círculo estilizado à direita" },
                            { nome: "href", tipo: "string", padrao: "'#'", desc: "Link de destino (renderiza tag <a>)" },
                            { nome: "className", tipo: "string", padrao: "''", desc: "Classes adicionais para customização" },
                            { nome: "...props", tipo: "HTMLAnchorProps", padrao: "-", desc: "Atributos nativos de âncora (target, rel, onClick, etc.)" },
                        ]}
                    >
                        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
                            <Botao
                                textoCTA="Botão Primário"
                                iconCTA={<ArrowRight className="w-4 h-4 text-white" />}
                            />
                            <Botao
                                tipoBotao="secundario"
                                textoCTA="Botão Secundário"
                                iconCTA={<ArrowRight className="w-4 h-4 text-white" />}
                            />
                            <Botao
                                tipoBotao="outline"
                                textoCTA="Botão Outline"
                            />
                            <div className="p-2 rounded-xl bg-roxo-escuro flex items-center">
                                <Botao
                                    tipoBotao="branco"
                                    textoCTA="Botão Branco"
                                    iconCTA={<ArrowRight className="w-4 h-4 text-white" />}
                                />
                            </div>
                        </div>
                    </ComponentDocCard>

                    {/* COMPONENTE: BADGE */}
                    <ComponentDocCard
                        nome="Badge"
                        arquivo="src/componentes/ui/Badge/Badge.jsx"
                        descricao="Pílula de destaque com ícone Sparkles, borda e fundo translúcidos com backdrop-blur. Suporta variante padrão (roxa) e branca (para fundos contrastantes/seções roxas), além de controle de uppercase."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { Badge } from "../componentes/ui/Badge/Badge.jsx";

// Padrão (Roxo)
<Badge />
<Badge textoBadge="PORTFÓLIO & PROJETOS" />

// Variante Branca (para fundos roxos)
<Badge variante="branco" uppercase={false} textoBadge="Para quem quer ir além!" />`}
                        props={[
                            { nome: "textoBadge", tipo: "string", padrao: "'BEM VINDOS!'", desc: "Texto exibido no badge" },
                            { nome: "variante", tipo: "'padrao' | 'branco'", padrao: "'padrao'", desc: "Tema visual da pílula (padrão roxo ou branco)" },
                            { nome: "uppercase", tipo: "boolean", padrao: "true", desc: "Se true, transforma o texto em caixa alta" },
                            { nome: "className", tipo: "string", padrao: "''", desc: "Classes CSS adicionais" },
                        ]}
                    >
                        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
                            <Badge textoBadge="BEM VINDOS!" />
                            <Badge textoBadge="PORTFÓLIO" />
                            <div className="p-2 rounded-xl bg-roxo-escuro flex items-center">
                                <Badge variante="branco" uppercase={false} textoBadge="Para quem quer ir além!" />
                            </div>
                            <Badge textoBadge="CASES DE SUCESSO" />
                        </div>
                    </ComponentDocCard>

                    {/* COMPONENTE: MARQUEE */}
                    <ComponentDocCard
                        nome="Marquee"
                        arquivo="src/componentes/ui/Marquee/Marquee.jsx"
                        descricao="Faixa letreiro contínua com animação horizontal infinita em CSS puro. Suporta sentido padrão (esquerda) e reverse (direita)."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { Marquee } from "../componentes/ui/Marquee/Marquee.jsx";

<section className="bg-linear-to-r from-roxo-escuro to-roxo-principal">
    <Marquee>
        <li>Criação de sites</li>
        <li>Sistemas Web</li>
        <li>Automações</li>
        <li>APIs & Integrações</li>
    </Marquee>
</section>

// Sentido invertido
<Marquee reverse>
    <li>UI/UX Design</li>
    <li>Identidade Visual</li>
</Marquee>`}
                        props={[
                            { nome: "children", tipo: "ReactNode", padrao: "-", desc: "Itens a serem repetidos no carrossel (geralmente <li>)" },
                            { nome: "reverse", tipo: "boolean", padrao: "false", desc: "Inverte a direção da rolagem contínua" },
                        ]}
                    >
                        <div className="rounded-xl overflow-hidden bg-linear-to-r from-roxo-escuro to-roxo-principal">
                            <Marquee>
                                <li>Desenvolvimento Web</li>
                                <li>Design System</li>
                                <li>Interfaces Modernas</li>
                                <li>Automações Inteligentes</li>
                                <li>APIs Escaláveis</li>
                            </Marquee>
                        </div>
                    </ComponentDocCard>
                </section>

                {/* 6. COMPONENTES DE LAYOUT */}
                <section id="componentes-layout" className="scroll-mt-32 space-y-8">
                    <div className="border-b border-white/10 pb-4">
                        <Badge textoBadge="ESTRUTURAS & LAYOUT" />
                        <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                            Componentes de Layout (<code>src/componentes/layout/</code>)
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Componentes estruturais de navegação, cards de projetos e galerias de dados.
                        </p>
                    </div>

                    {/* COMPONENTE: HEADER */}
                    <ComponentDocCard
                        nome="Header"
                        arquivo="src/componentes/layout/Header.jsx"
                        descricao="Cabeçalho responsivo universal com logotipo, menu em pílula de vidro (desktop), botão CTA para WhatsApp e gaveta de menu hambúrguer para mobile."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { Header } from "../componentes/layout/Header.jsx";

<Header
    logo="/logo.png"
    links={{
        "Início": "/",
        "Quem Somos": "/quem-somos",
        "Portfólio": "/portfolio",
    }}
    configCTA={{
        textoCTA: "Fale Conosco",
        urlCTA: "https://wa.me/5500000000000",
    }}
/>`}
                        props={[
                            { nome: "logo", tipo: "string", padrao: "'/ujhessie-logo.svg'", desc: "Caminho da imagem do logotipo" },
                            { nome: "links", tipo: "object { [rotulo]: url }", padrao: "{}", desc: "Mapa de rotas exibidas no menu" },
                            { nome: "configCTA", tipo: "object { textoCTA, urlCTA }", padrao: "{}", desc: "Configurações do botão de WhatsApp" },
                        ]}
                    >
                        <div className="p-2 rounded-xl bg-preto-escuro border border-white/10 overflow-hidden">
                            <div className="text-[11px] text-zinc-500 mb-2 px-3 pt-2">
                                Pré-visualização do Header (Simulação):
                            </div>
                            <Header
                                logo="/ujhessie-logo.svg"
                                links={{
                                    "Início": "#",
                                    "Serviços": "#",
                                    "Trabalhos": "#",
                                }}
                                configCTA={{
                                    textoCTA: "Fale Conosco",
                                    urlCTA: "#",
                                }}
                            />
                        </div>
                    </ComponentDocCard>

                    {/* COMPONENTE: FOOTER */}
                    <ComponentDocCard
                        nome="Footer"
                        arquivo="src/componentes/layout/Footer.jsx"
                        descricao="Rodapé universal da aplicação com logotipo, slogan, copyright, blocos verticais de links (navegação, soluções e legal) e botões de redes sociais circulares."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { Footer } from "../componentes/layout/Footer.jsx";

<Footer
    logo="/logo.png"
    tagline="Soluções para quem quer evoluir"
    copyright="Direitos Reservados a Web iNexus"
/>`}
                        props={[
                            { nome: "logo", tipo: "string", padrao: "'/logo.png'", desc: "Caminho da imagem do logotipo" },
                            { nome: "tagline", tipo: "string", padrao: "'Soluções para quem quer evoluir'", desc: "Frase ou slogan abaixo do logo" },
                            { nome: "copyright", tipo: "string", padrao: "'Direitos Reservados a Web iNexus'", desc: "Texto de direitos autorais" },
                            { nome: "linksNavegacao", tipo: "Array<{ texto, href }>", padrao: "[...]", desc: "Links da coluna Navegação" },
                            { nome: "solucoes", tipo: "Array<{ texto, href }>", padrao: "[...]", desc: "Links da coluna Soluções" },
                            { nome: "linksLegais", tipo: "Array<{ texto, href }>", padrao: "[...]", desc: "Links da coluna Legal" },
                            { nome: "redesSociais", tipo: "Array<{ nome, href, icone }>", padrao: "[...]", desc: "Lista de redes sociais com ícones circulares" },
                        ]}
                    >
                        <div className="rounded-xl overflow-hidden border border-white/10 bg-preto-escuro">
                            <Footer logo="/logo.png" />
                        </div>
                    </ComponentDocCard>

                    {/* COMPONENTE: SMOOTH SCROLL */}
                    <ComponentDocCard
                        nome="SmoothScroll"
                        arquivo="src/componentes/layout/SmoothScroll.jsx"
                        descricao="Controlador de rolagem suave com atraso e inércia (LERP). Intercepta o scroll da roda do mouse com desaceleração fluida sem interferir no touch móvel nem quebrar elementos com position: sticky."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { SmoothScroll } from "../componentes/layout/SmoothScroll.jsx";
import { SCROLL_CONFIG } from "../config/scrollConfig.js";

// Uso padrão (consome configurações de SCROLL_CONFIG)
<SmoothScroll />

// Customizado por props
<SmoothScroll ativo={true} intensidade={0.08} sensibilidade={1.0} />`}
                        props={[
                            { nome: "ativo", tipo: "boolean", padrao: "SCROLL_CONFIG.ativo (true)", desc: "Ativa ou desativa o efeito de atraso" },
                            { nome: "intensidade", tipo: "number", padrao: "SCROLL_CONFIG.intensidade (0.08)", desc: "Fator LERP de inércia (0.04 a 0.15). Menor = mais atraso" },
                            { nome: "sensibilidade", tipo: "number", padrao: "SCROLL_CONFIG.sensibilidade (1.0)", desc: "Multiplicador de distância a cada giro da roda" },
                        ]}
                    >
                        <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                            <div className="flex items-center justify-between text-xs text-zinc-300">
                                <span>Arquivo de Configuração: <code>src/config/scrollConfig.js</code></span>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[10px]">
                                    ATIVO • LERP: 0.08
                                </span>
                            </div>
                            <p className="text-xs text-zinc-400">
                                Ajustável em tempo real no menu flutuante (canto inferior direito) no ambiente local.
                            </p>
                        </div>
                    </ComponentDocCard>

                    {/* COMPONENTE: CARD PROJETO */}
                    <ComponentDocCard
                        nome="CardProjeto"
                        arquivo="src/componentes/layout/CardProjeto/CardProjeto.jsx"
                        descricao="Card com proporção vertical 3/4, imagem de capa com fallback elegante, overlay escuro e efeito de hover com gradiente roxo revelando o título."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { CardProjeto } from "../componentes/layout/CardProjeto/CardProjeto.jsx";

// Renderização pelo ID cadastrado no contexto de projetos
<CardProjeto id="loja-virtual-multitech" basePath="/projetos" />`}
                        props={[
                            { nome: "id", tipo: "string", padrao: "-", desc: "ID/Slug do projeto cadastrado no ProjetosContext" },
                            { nome: "basePath", tipo: "string", padrao: "'/projetos'", desc: "Prefixo da rota para onde o link redireciona ao clicar" },
                        ]}
                    >
                        <div className="max-w-xs mx-auto p-4 rounded-xl bg-black/40 border border-white/5">
                            <CardProjeto id="loja-virtual-multitech" basePath="/portfolio" />
                        </div>
                    </ComponentDocCard>
                </section>

                {/* 7. FORMULÁRIOS & CONTROLES */}
                <section id="formularios" className="scroll-mt-32 space-y-6">
                    <div className="border-b border-white/10 pb-4">
                        <Badge textoBadge="PADRÃO DE INTERFACE" />
                        <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                            Padrão de Formulários & <strong>Inputs</strong>
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Padrão consistente de caixas de texto, selects e botões de alternância (como no painel Admin).
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-preto-fosco border border-white/10 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Input de Texto */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Input de Texto Padrão:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Título do Projeto ou Nome..."
                                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-roxo-principal focus:ring-1 focus:ring-roxo-principal transition"
                                />
                                <code className="block text-[10px] text-zinc-500 font-mono">
                                    bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 focus:border-roxo-principal
                                </code>
                            </div>

                            {/* Select */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-300">
                                    Select / Dropdown:
                                </label>
                                <select className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-roxo-principal focus:ring-1 focus:ring-roxo-principal transition">
                                    <option value="sites">Sites & Landing Pages</option>
                                    <option value="sistemas">Sistemas Web & Dashboards</option>
                                    <option value="automacoes">Automações & APIs</option>
                                </select>
                                <code className="block text-[10px] text-zinc-500 font-mono">
                                    bg-black/40 border border-white/10 rounded-xl px-4 py-2.5
                                </code>
                            </div>
                        </div>

                        {/* Pills e Tags */}
                        <div className="space-y-2 pt-2 border-t border-white/5">
                            <label className="text-xs font-semibold text-zinc-300">
                                Badges de Categoria & Tags Selecionáveis:
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-linear-to-r from-roxo-escuro to-roxo-principal text-white shadow-sm">
                                    Ativo / Selecionado
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition cursor-pointer">
                                    Inativo / Opção
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                    Status: Visível
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/30">
                                    Status: Lixeira
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. CHECKLIST PARA DESENVOLVEDORES & AGENTES IA */}
                <section id="diretrizes" className="scroll-mt-32 space-y-6">
                    <div className="border-b border-white/10 pb-4">
                        <Badge textoBadge="BOAS PRÁTICAS" />
                        <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                            Checklist: <strong>Criando Novas Telas ou Componentes</strong>
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Siga este fluxo sempre que for criar ou alterar qualquer funcionalidade visual.
                        </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-preto-fosco border border-roxo-principal/30 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-roxo-principal/20 text-roxo-claro flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                                    1
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold font-titulo text-white">
                                        Consulte o Design System Primeiro
                                    </h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Antes de escrever JSX novo, confira se já existe um botão, badge,
                                        card ou header. Reutilize-o diretamente de <code>src/componentes/</code>.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-roxo-principal/20 text-roxo-claro flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                                    2
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold font-titulo text-white">
                                        Aplique as Cores & Fontes do Tema
                                    </h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Use sempre as classes semânticas: <code>bg-roxo-principal</code>,{" "}
                                        <code>bg-preto-fosco</code>, <code>bg-preto-escuro</code>,{" "}
                                        <code>font-titulo</code> (Space Grotesk) e <code>font-corpo</code>{" "}
                                        (Poppins). Não insira cores hexadecimais avulsas quando já houver token.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-roxo-principal/20 text-roxo-claro flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                                    3
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold font-titulo text-white">
                                        Respeite a Estrutura de Pastas
                                    </h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Componentes compartilhados vão para <code>src/componentes/ui/</code> ou{" "}
                                        <code>src/componentes/layout/</code>. Se o componente for exclusivo de
                                        uma página específica (ex: HeroSection da Home), mantenha-o no mesmo
                                        arquivo da página para manter a simplicidade.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-roxo-principal/20 text-roxo-claro flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                                    4
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold font-titulo text-white">
                                        Atualize Esta Página ao Criar Algo Novo
                                    </h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Se criar um novo componente global ou uma nova variante de botão/card,
                                        adicione-o aqui em <code>src/sites/design_system/index.jsx</code> com
                                        uma pré-visualização e documentação das props!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Rodapé do Design System */}
            <footer className="border-t border-white/10 py-8 bg-black/40 text-center text-xs text-zinc-500">
                <p>Web Inexus & Ujhessie Design System • Versão 2.0</p>
                <p className="text-[11px] text-zinc-600 mt-1">
                    Central de Componentes e Diretrizes Visuais Compartilhadas
                </p>
            </footer>
        </div>
    );
};

// ==========================================
// COMPONENTE AUXILIAR: CARD DE DOCUMENTAÇÃO
// ==========================================
const ComponentDocCard = ({
    nome,
    arquivo,
    descricao,
    props = [],
    codigoJSX,
    children,
    copiado,
    aoCopiar,
}) => {
    const [abaAtiva, setAbaAtiva] = useState("preview"); // 'preview' | 'codigo' | 'props'
    const chaveCopia = `cod-${nome}`;

    return (
        <div className="rounded-2xl bg-preto-fosco border border-white/10 overflow-hidden shadow-lg space-y-0">
            {/* Cabeçalho do Card */}
            <div className="p-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/2">
                <div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-titulo font-bold text-white tracking-wide">
                            &lt;{nome} /&gt;
                        </h3>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">
                            Componente Global
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400">
                        <FileCode className="w-3.5 h-3.5 text-roxo-principal" />
                        <code className="text-zinc-300 text-[11px]">{arquivo}</code>
                    </div>
                </div>

                {/* Seletor de Abas */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                    <button
                        type="button"
                        onClick={() => setAbaAtiva("preview")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                            abaAtiva === "preview"
                                ? "bg-white/15 text-white"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Visualização</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setAbaAtiva("codigo")}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                            abaAtiva === "codigo"
                                ? "bg-white/15 text-white"
                                : "text-zinc-400 hover:text-white"
                        }`}
                    >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Código JSX</span>
                    </button>
                    {props.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setAbaAtiva("props")}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                                abaAtiva === "props"
                                    ? "bg-white/15 text-white"
                                    : "text-zinc-400 hover:text-white"
                            }`}
                        >
                            <Sliders className="w-3.5 h-3.5" />
                            <span>Props ({props.length})</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Descrição */}
            <div className="px-5 py-3 bg-white/2 border-b border-white/5 text-xs text-zinc-400">
                {descricao}
            </div>

            {/* Conteúdo da Aba */}
            <div className="p-5">
                {abaAtiva === "preview" && <div>{children}</div>}

                {abaAtiva === "codigo" && (
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => aoCopiar(codigoJSX, chaveCopia)}
                            className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs text-white flex items-center gap-1.5 transition z-10"
                        >
                            {copiado === chaveCopia ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">Copiado!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copiar JSX</span>
                                </>
                            )}
                        </button>
                        <pre className="p-4 rounded-xl bg-black/60 border border-white/5 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                            {codigoJSX}
                        </pre>
                    </div>
                )}

                {abaAtiva === "props" && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-zinc-400">
                                    <th className="py-2 px-3 font-semibold">Prop</th>
                                    <th className="py-2 px-3 font-semibold">Tipo</th>
                                    <th className="py-2 px-3 font-semibold">Padrão</th>
                                    <th className="py-2 px-3 font-semibold">Descrição</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-zinc-300">
                                {props.map((p) => (
                                    <tr key={p.nome} className="hover:bg-white/2">
                                        <td className="py-2 px-3 font-mono text-roxo-claro font-bold">
                                            {p.nome}
                                        </td>
                                        <td className="py-2 px-3 font-mono text-zinc-400">
                                            {p.tipo}
                                        </td>
                                        <td className="py-2 px-3 font-mono text-amber-300/80">
                                            {p.padrao}
                                        </td>
                                        <td className="py-2 px-3">{p.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

