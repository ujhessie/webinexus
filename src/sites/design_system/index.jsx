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
    CheckCircle2,
    Zap,
    BookOpen,
    Code2,
    Eye,
    ShieldCheck,
    FolderTree,
    MoveRight,
    Sliders,
} from "lucide-react";

// Componentes Reutilizáveis Oficiais do Projeto
import { Botao } from "../../componentes/ui/Botao/Botao.jsx";
import { Badge } from "../../componentes/ui/Badge/Badge.jsx";
import { Marquee } from "../../componentes/ui/Marquee/Marquee.jsx";
import { CardProjeto } from "../../componentes/layout/CardProjeto/CardProjeto.jsx";
import { GaleriaProjetos } from "../../componentes/layout/GaleriaProjetos/GaleriaProjetos.jsx";
import { Header } from "../../componentes/layout/Header.jsx";
import { Footer } from "../../componentes/layout/Footer.jsx";
import { HeroInterno, CTAQuemSomos } from "../../componentes/Compartilhados.jsx";
import { RevealObserver, ScrollTop } from "../../componentes/RevealObserver.jsx";

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
        classe: "bg-linear-to-r from-roxo-escuro to-roxo-principal", /* taste-skill-ignore: classe oficial da marca é esta, a doc existe pra ensiná-la */
        uso: "Botões primários, badges de destaque, cards ativos e faixas decorativas.",
    },
    {
        nome: "Gradiente Texto (Clipping)",
        classe: "bg-linear-to-r from-roxo-escuro to-roxo-principal bg-clip-text text-transparent", /* taste-skill-ignore: gradiente de texto é assinatura da marca */
        uso: "Palavras-chave em títulos (aplicado automaticamente pela tag <strong>).",
    },
    {
        nome: "Gradiente Fundo Seções",
        classe: "bg-linear-to-r from-preto-escuro via-preto-escuro/90 to-preto-escuro/40", /* taste-skill-ignore: overlay de foto previsto pela regra */
        uso: "Overlays de fundo para banners e seções hero com imagens de background.",
    },
    {
        nome: "Gradiente Overlay Card",
        classe: "bg-linear-to-t from-preto-escuro/90 via-preto-escuro/20 to-transparent", /* taste-skill-ignore: overlay de foto previsto pela regra */
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
    { id: "utilidades", rotulo: "Utilitários CSS", icone: Zap },
    { id: "compartilhados", rotulo: "Compartilhados", icone: MoveRight },
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
        <div className="min-h-svh bg-preto-escuro text-white font-corpo selection:bg-roxo-principal selection:text-white">
            <ScrollTop />
            <RevealObserver />

            {/* Topbar / Banner de Identificação */}
            <header className="sticky top-0 z-40 bg-preto-escuro/85 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="grad-icon w-10 h-10 rounded-2xl flex items-center justify-center text-white">
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
                                className="w-full pl-9 pr-4 py-2 text-xs bg-preto-fosco rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-roxo-principal focus:ring-1 focus:ring-roxo-principal transition"
                            />
                        </div>

                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            <span>Ambiente Ativo</span>
                        </div>
                    </div>
                </div>

                {/* Sub-menu horizontal com abas */}
                <nav className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-none flex gap-2 py-2">
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
                                        ? "grad-btn text-white"
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-preto-fosco border border-roxo-principal/30">
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
                                <Layout className="w-4 h-4 text-roxo-claro" />
                                <div>
                                    <p className="font-semibold text-white">Componentes Layout:</p>
                                    <code className="text-roxo-claro text-[11px]">
                                        src/componentes/layout/
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cards explicativos das regras */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-5 rounded-2xl bg-preto-fosco space-y-2">
                            <div className="w-8 h-8 rounded-xl bg-roxo-principal/15 text-roxo-claro flex items-center justify-center">
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

                        <div className="p-5 rounded-2xl bg-preto-fosco space-y-2">
                            <div className="w-8 h-8 rounded-xl bg-roxo-principal/15 text-roxo-claro flex items-center justify-center">
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

                        <div className="p-5 rounded-2xl bg-preto-fosco space-y-2">
                            <div className="w-8 h-8 rounded-xl bg-roxo-principal/15 text-roxo-claro flex items-center justify-center">
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
                    <div className="pb-4">
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
                                    className="p-4 rounded-2xl bg-preto-fosco border border-transparent hover:border-roxo-principal/50 transition-colors group flex flex-col justify-between"
                                >
                                    <div>
                                        <div
                                            className={`w-full h-20 rounded-xl mb-3 ${token.classe} flex items-end p-2 border border-white/10`}
                                        >
                                            <code className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-white font-bold">
                                                {token.hex}
                                            </code>
                                        </div>

                                        <h3 className="font-titulo font-bold text-sm text-white flex items-center justify-between">
                                            <span>{token.nome}</span>
                                            <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                                                {token.categoria}
                                            </span>
                                        </h3>

                                        <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
                                            {token.descricao}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 space-y-1.5">
                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-zinc-500">Classe:</span>
                                            <button
                                                type="button"
                                                onClick={() => copiarTexto(token.classe, `${chaveCopiado}-classe`)}
                                                className="flex items-center gap-1 text-roxo-claro hover:text-white transition-colors"
                                                title="Copiar classe Tailwind"
                                            >
                                                <code className="font-mono">{token.classe}</code>
                                                {copiado === `${chaveCopiado}-classe` ? (
                                                    <Check className="w-3 h-3 text-emerald-400" />
                                                ) : (
                                                    <Copy className="w-3 h-3 opacity-60" />
                                                )}
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-zinc-500">Variável:</span>
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
                                        className="p-5 rounded-2xl bg-preto-fosco space-y-3"
                                    >
                                        <div
                                            className={`w-full h-14 rounded-xl ${grad.classe} border border-white/10 flex items-center justify-center text-xs font-bold text-white`}
                                        >
                                            {grad.nome.includes("Texto") ? (
                                                <span className={"text-lg font-titulo font-black bg-linear-to-r from-roxo-escuro to-roxo-principal bg-clip-text text-transparent" /* taste-skill-ignore: preview real do texto com gradiente da marca */}>
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
                    <div className="pb-4">
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
                        <div className="p-6 rounded-2xl bg-preto-fosco space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-titulo px-2 py-0.5 rounded bg-roxo-principal/15 text-roxo-claro">
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
                                Dica: Toda tag <code>&lt;strong&gt;</code> dentro de títulos herda
                                automaticamente o gradiente roxo oficial!
                            </p>
                        </div>

                        {/* H2 */}
                        <div className="p-6 rounded-2xl bg-preto-fosco space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-titulo px-2 py-0.5 rounded bg-roxo-principal/15 text-roxo-claro">
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
                        <div className="p-6 rounded-2xl bg-preto-fosco space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-titulo px-2 py-0.5 rounded bg-roxo-principal/15 text-roxo-claro">
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
                        <div className="p-6 rounded-2xl bg-preto-fosco space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-titulo px-2 py-0.5 rounded bg-white/10 text-zinc-300">
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
                    <div className="pb-4">
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
                        <div className="p-6 rounded-2xl bg-preto-fosco space-y-4">
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
                            <div className="p-4 rounded-xl border border-dashed border-roxo-principal/40 bg-roxo-principal/5 text-center text-xs text-roxo-claro">
                                <code className="font-mono">&lt;div className=&quot;content-section&quot;&gt; ...conteúdo... &lt;/div&gt;</code>
                            </div>
                        </div>

                        {/* Espaçamento Vertical de Seções */}
                        <div className="p-6 rounded-2xl bg-preto-fosco space-y-4">
                            <h3 className="font-titulo font-bold text-base text-white">
                                Espaçamento Vertical de Seções
                            </h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                Mantenha o respiro visual entre as seções usando os seguintes padrões:
                            </p>
                            <ul className="space-y-2 text-xs text-zinc-300">
                                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                    <span>Seções Padrão:</span>
                                    <code className="text-roxo-claro font-mono">py-16 sm:py-20 lg:py-24</code>
                                </li>
                                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                    <span>Hero Sections:</span>
                                    <code className="text-roxo-claro font-mono">min-h-140 lg:min-h-160</code>
                                </li>
                                <li className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                    <span>Gaps de Grid:</span>
                                    <code className="text-roxo-claro font-mono">gap-4 sm:gap-6 lg:gap-8</code>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 5. COMPONENTES UI */}
                <section id="componentes-ui" className="scroll-mt-32 space-y-8">
                    <div className="pb-4">
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
                        descricao="Botão universal com 4 variantes (primário com .grad-btn + .sombra-btn, secundário em vidro, outline e branco para superfícies coloridas), feedback tátil .button-press, círculo para ícone CTA e SPA routing: um href iniciado em / renderiza <Link> do react-router."
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
                        descricao="Pílula de destaque com ícone Sparkles, borda fina e fundo translúcido da marca (sem blur). Variantes padrão (roxo) e branco (para fundos contrastantes/seções roxas), controle de uppercase e className extra para posicionamento."
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
                        descricao="Faixa letreiro contínua com animação horizontal infinita em CSS puro (marquee.css). Já renderiza a própria faixa com o gradiente .grad-btn por dentro — use sem wrapper de cor. Sentido padrão (esquerda) e reverse (direita)."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { Marquee } from "../componentes/ui/Marquee/Marquee.jsx";

// O próprio Marquee já renderiza a faixa com .grad-btn por dentro
<Marquee>
    <li>Criação de sites</li>
    <li>Sistemas Web</li>
    <li>Automações</li>
    <li>APIs & Integrações</li>
</Marquee>

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
                        <div className="rounded-xl overflow-hidden">
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
                    <div className="pb-4">
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
                            { nome: "altLogo", tipo: "string", padrao: "'UJHESSIE'", desc: "Texto alternativo do logotipo (acessibilidade)" },
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

                    {/* COMPONENTE: CARD PROJETO */}
                    <ComponentDocCard
                        nome="CardProjeto"
                        arquivo="src/componentes/layout/CardProjeto/CardProjeto.jsx"
                        descricao="Card vertical: capa 4/3 em cima (sem texto sobre a imagem) e bloco de texto embaixo em fundo sólido com título, descrição curta (oculta quando vazia) e tags em pílulas. Fallback .img-fallback quando a imagem falha, zoom da capa e elevação roxa (.card-projeto) somente no hover. Os dados vêm do ProjetosContext pelo id."
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

                    {/* COMPONENTE: GALERIA PROJETOS */}
                    <ComponentDocCard
                        nome="GaleriaProjetos"
                        arquivo="src/componentes/layout/GaleriaProjetos/GaleriaProjetos.jsx"
                        descricao="Grade de projetos com barra de filtros em pílula branca (filtros vêm do ProjetosContext): no celular/tablet a barra é uma linha só com rolagem horizontal e no desktop ela quebra em várias linhas. Grid responsivo de 1 → 2 → 3 colunas e entrada escalonada .card-entrada. Aceita limite opcional de itens."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { GaleriaProjetos } from "../componentes/layout/GaleriaProjetos/GaleriaProjetos.jsx";

// Todos os projetos filtrados
<GaleriaProjetos />

// No máximo 6 itens (como na Home)
<GaleriaProjetos limite={6} />`}
                        props={[
                            { nome: "limite", tipo: "number", padrao: "undefined", desc: "Quantidade máxima de projetos exibidos (sem limite quando omitido)" },
                        ]}
                    >
                        <div className="p-4 rounded-xl bg-black/40">
                            <GaleriaProjetos limite={3} />
                        </div>
                    </ComponentDocCard>
                </section>

                {/* 6.5 UTILITÁRIOS CSS GLOBAIS */}
                <section id="utilidades" className="scroll-mt-32 space-y-6">
                    <div className="pb-4">
                        <Badge textoBadge="CAMADA GLOBAL" />
                        <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                            Utilitários de <strong>style.css</strong>
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Classes autorais do sistema: gradientes da marca, véus de foto, sombras de interação, movimento e números tabulares. Os previews abaixo são funcionais: passe o mouse, role a página e navegue com Tab.
                        </p>
                    </div>

                    <UtilDoc
                        nome=".grad-btn / .grad-icon"
                        arquivo="style.css"
                        descricao="Gradiente oficial da marca em horizontal (botões, faixas e itens ativos) e em diagonal (ladrilhos de ícone). Já trazem fundo, hover e contraste de texto: não empilhe outro gradiente por cima."
                        codigo={`<button className="grad-btn px-6 py-3.5 rounded-2xl text-white">
    Botão da marca
</button>

<span className="grad-icon w-11 h-11 rounded-xl flex items-center justify-center text-white">
    <Icone />
</span>`}
                    >
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="grad-btn button-press px-5 py-3 rounded-2xl text-white font-titulo font-bold text-sm uppercase tracking-wider">
                                Faixa grad-btn
                            </span>
                            <span className="grad-icon w-11 h-11 rounded-xl flex items-center justify-center text-white">
                                <Sparkles className="w-5 h-5" />
                            </span>
                        </div>
                    </UtilDoc>

                    <UtilDoc
                        nome=".grad-cta / .grad-section"
                        arquivo="style.css"
                        descricao="Superfícies maiores: .grad-cta é o cartão do CTA final (combine com .sombra-cta) e .grad-section pinta seções inteiras, como a faixa de parceiros do Ujhessie."
                        codigo={`<div className="grad-cta sombra-cta rounded-3xl p-14 text-center">
    <h2>Precisa de um projeto personalizado?</h2>
</div>

<div className="grad-section py-16">
    {/* seção inteira com a cor da marca */}
</div>`}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grad-cta sombra-cta rounded-3xl p-6 text-center text-white">
                                <p className="font-titulo font-bold text-sm uppercase tracking-wider">
                                    .grad-cta
                                </p>
                                <p className="text-xs text-white/80 mt-1">
                                    Cartão do CTA final
                                </p>
                            </div>
                            <div className="grad-section rounded-3xl p-6 text-center text-white">
                                <p className="font-titulo font-bold text-sm uppercase tracking-wider">
                                    .grad-section
                                </p>
                                <p className="text-xs text-white/80 mt-1">
                                    Seção inteira da marca
                                </p>
                            </div>
                        </div>
                    </UtilDoc>

                    <UtilDoc
                        nome=".grad-texto-hero / .grad-texto-metrica"
                        arquivo="style.css"
                        descricao="Texto com gradiente recortado no próprio elemento. No projeto, todo strong de h1 a h5 já vira gradiente pela regra global; as classes cobrem os casos fora dela (destaques soltos e números de métrica)."
                        codigo={`<h1>Título com <strong>destaque da marca</strong></h1>

<span className="grad-texto-hero">Destaque solto</span>
<span className="grad-texto-metrica tabular text-4xl font-black">200+</span>`}
                    >
                        <div className="space-y-3">
                            <p className="text-3xl font-titulo font-black">
                                <span className="grad-texto-hero">
                                    TEXTO COM GRADIENTE
                                </span>
                            </p>
                            <p className="text-sm text-zinc-400">
                                Métrica isolada:{" "}
                                <span className="grad-texto-metrica tabular text-4xl font-titulo font-black align-middle">
                                    200+
                                </span>
                            </p>
                        </div>
                    </UtilDoc>

                    <UtilDoc
                        nome=".scrim / .overlay-card / .img-fallback"
                        arquivo="style.css"
                        descricao="Véus neutros sobre foto, a exceção de gradiente prevista pelo guia: .scrim garante legibilidade do texto sobre imagem, .overlay-card escurece a base de qualquer bloco sobre foto e .img-fallback desenha o fundo quando a imagem falha."
                        codigo={`<div className="relative rounded-xl overflow-hidden">
    <img src="/bg.png" alt="Foto do projeto" />
    <div className="scrim absolute inset-0" />
    <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-white font-bold">Texto legível sobre a foto</p>
    </div>
</div>`}
                    >
                        <div className="relative h-36 rounded-xl overflow-hidden bg-[url(/bg.png)] bg-cover bg-center">
                            <div className="scrim absolute inset-0" />
                            <div className="absolute inset-x-4 bottom-3">
                                <p className="text-sm font-titulo font-bold text-white">
                                    Texto legível sobre a foto
                                </p>
                                <p className="text-[11px] text-zinc-300">
                                    .scrim resolve o contraste sem caixa nem borda
                                </p>
                            </div>
                        </div>
                    </UtilDoc>

                    <UtilDoc
                        nome=".button-press"
                        arquivo="style.css"
                        descricao="Feedback tátil universal: comprime o elemento em 3% ao pressionar, com transição curta e respeito a prefers-reduced-motion. Todo controle clicável do sistema carrega a classe."
                        codigo={`<button className="button-press grad-btn px-6 py-3.5 rounded-2xl text-white">
    Clique e segure
</button>`}
                    >
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                className="button-press grad-btn px-5 py-3 rounded-xl text-white font-titulo font-bold text-sm uppercase tracking-wider"
                            >
                                Primário
                            </button>
                            <button
                                type="button"
                                className="button-press bg-white/10 hover:bg-white/15 px-5 py-3 rounded-xl text-white font-titulo font-bold text-sm uppercase tracking-wider"
                            >
                                Neutro
                            </button>
                        </div>
                    </UtilDoc>

                    <UtilDoc
                        nome=".reveal (--reveal-i)"
                        arquivo="style.css + RevealObserver"
                        descricao="Entrada em cena ao rolar: o elemento sobe e aparece uma única vez quando entra na tela. --reveal-i (0, 1, 2...) escalona blocos irmãos com 90ms de diferença. Monte o RevealObserver uma vez no layout; a prévia abaixo é funcional, role a página."
                        codigo={`// 1. monte o observer uma vez no layout do site
<RevealObserver />

// 2. marque os elementos que entram em cena
<h2 className="reveal">Entra na tela</h2>
<p className="reveal" style={{ "--reveal-i": 1 }}>Entra 90ms depois</p>`}
                    >
                        <div className="space-y-3">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="reveal p-4 rounded-xl bg-preto-escuro text-sm text-zinc-300"
                                    style={{ "--reveal-i": i }}
                                >
                                    Item {i + 1} com{" "}
                                    <code className="text-roxo-claro font-mono">
                                        reveal
                                    </code>{" "}
                                    escalonado
                                </div>
                            ))}
                        </div>
                    </UtilDoc>

                    <UtilDoc
                        nome=".sombra-btn / .sombra-nav / .sombra-cta / .sombra-pilha"
                        arquivo="style.css"
                        descricao="Sombras declaradas da marca, com taste-skill-ignore no style.css: brilho roxo em botões primários e itens ativos de navegação, profundidade no cartão de CTA e na pilha de cards. Superfícies neutras ficam planas."
                        codigo={`<button className="button-press sombra-btn grad-btn ...">Botão primário</button>

<nav aria-current="page" className="sombra-nav">Item ativo</nav>

<div className="sombra-pilha">Cards empilhados</div>`}
                    >
                        <div className="flex flex-wrap gap-3">
                            <span className="sombra-btn px-5 py-3 rounded-xl bg-preto-escuro text-sm text-zinc-300">
                                .sombra-btn
                            </span>
                            <span className="sombra-nav px-5 py-3 rounded-xl bg-preto-escuro text-sm text-zinc-300">
                                .sombra-nav
                            </span>
                            <span className="sombra-pilha px-5 py-3 rounded-xl bg-preto-escuro text-sm text-zinc-300">
                                .sombra-pilha
                            </span>
                        </div>
                    </UtilDoc>

                    <UtilDoc
                        nome=".tabular + foco global"
                        arquivo="style.css"
                        descricao="Números tabulares para contadores e métricas, foco :focus-visible roxo em todos os controles e prefers-reduced-motion que desliga reveals e animações. Junto com .card-entrada e .animate-fade-in-up, fecha a camada de movimento do sistema."
                        codigo={`<span className="tabular text-4xl font-titulo font-black">+200</span>

/* foco do teclado, já global em style.css */
:focus-visible {
    outline: 2px solid var(--color-roxo-claro);
    outline-offset: 3px;
}`}
                    >
                        <div className="flex flex-wrap items-end gap-8">
                            <div>
                                <p className="tabular text-4xl font-titulo font-black text-white">
                                    +200
                                </p>
                                <p className="text-[11px] text-zinc-400 mt-1">
                                    projetos entregues
                                </p>
                            </div>
                            <div>
                                <p className="tabular text-4xl font-titulo font-black text-[#d28bff]">
                                    98%
                                </p>
                                <p className="text-[11px] text-zinc-400 mt-1">
                                    clientes satisfeitos
                                </p>
                            </div>
                            <p className="text-xs text-zinc-400 max-w-xs">
                                Dê Tab nesta página: o foco do teclado usa contorno
                                roxo visível em todos os controles.
                            </p>
                        </div>
                    </UtilDoc>
                </section>

                {/* 6.6 COMPONENTES COMPARTILHADOS */}
                <section id="compartilhados" className="scroll-mt-32 space-y-8">
                    <div className="pb-4">
                        <Badge textoBadge="REUSO ENTRE SITES" />
                        <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                            Compartilhados (<code>src/componentes/</code>)
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Blocos prontos usados por todos os sites: hero de
                            página interna, CTA final e o par de observer que
                            comanda revelações e rolagem.
                        </p>
                    </div>

                    {/* COMPONENTE: HERO INTERNO */}
                    <ComponentDocCard
                        nome="HeroInterno"
                        arquivo="src/componentes/Compartilhados.jsx"
                        descricao="Hero de página interna com fundo próprio, véu, brilhos opcionais, badge, título com destaque em gradiente (.grad-texto-hero), parágrafo, ações e slot de conteúdo extra. Títulos e blocos já nascem com .reveal."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { HeroInterno } from "../componentes/Compartilhados.jsx";
import { Botao } from "../componentes/ui/Botao/Botao.jsx";

<HeroInterno
    badge="NOSSOS SERVIÇOS"
    titulo="Soluções que"
    destaque="geram resultado"
    paragrafo="Cada projeto começa pelo seu problema real."
    acoes={<Botao textoCTA="Ver serviços" />}
    extras={<p className="text-sm text-zinc-400">Conteúdo opcional abaixo das ações</p>}
/>`}
                        props={[
                            { nome: "badge", tipo: "string", padrao: "-", desc: "Texto do Badge acima do título" },
                            { nome: "titulo", tipo: "string", padrao: "-", desc: "Primeira linha do título" },
                            { nome: "destaque", tipo: "string", padrao: "-", desc: "Trecho final do título com gradiente" },
                            { nome: "paragrafo", tipo: "string", padrao: "-", desc: "Texto de apoio abaixo do título" },
                            { nome: "acoes", tipo: "ReactNode", padrao: "null", desc: "Botões do hero (empilham no mobile)" },
                            { nome: "extras", tipo: "ReactNode", padrao: "null", desc: "Conteúdo opcional abaixo das ações" },
                            { nome: "brilhos", tipo: "boolean", padrao: "true", desc: "Brilhos decorativos de fundo" },
                        ]}
                    >
                        <HeroInterno
                            badge="PRÉVIA"
                            titulo="Página interna com"
                            destaque="assinatura da marca"
                            paragrafo="Prévia funcional do HeroInterno dentro da documentação."
                            acoes={
                                <>
                                    <Botao textoCTA="Botão principal" />
                                    <Botao tipoBotao="secundario" textoCTA="Secundário" />
                                </>
                            }
                        />
                    </ComponentDocCard>

                    {/* COMPONENTE: CTA QUEM SOMOS */}
                    <ComponentDocCard
                        nome="CTAQuemSomos"
                        arquivo="src/componentes/Compartilhados.jsx"
                        descricao="Bloco final de CTA usado em Home, Serviços, Quem Somos e Portfólio: superfície .grad-cta com .sombra-cta, badge branco, título forte e botão de WhatsApp. Prévia funcional abaixo."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { CTAQuemSomos } from "../componentes/Compartilhados.jsx";

// Bloco final de Home, Serviços, Quem Somos e Portfólio
<CTAQuemSomos />`}
                    >
                        <CTAQuemSomos />
                    </ComponentDocCard>

                    {/* COMPONENTE: REVEAL OBSERVER */}
                    <ComponentDocCard
                        nome="RevealObserver / ScrollTop"
                        arquivo="src/componentes/RevealObserver.jsx"
                        descricao="Par de componentes nulos montados uma única vez no layout de cada site. ScrollTop zera a rolagem a cada navegação; RevealObserver ativa os elementos .reveal da página quando entram na tela, uma vez só e respeitando prefers-reduced-motion."
                        copiado={copiado}
                        aoCopiar={copiarTexto}
                        codigoJSX={`import { RevealObserver, ScrollTop } from "../componentes/RevealObserver.jsx";

export const MeuSite = () => (
    <div>
        <ScrollTop />
        <RevealObserver />
        {/* header, rotas e páginas com elementos .reveal */}
    </div>
);`}
                        props={[
                            { nome: "(sem props)", tipo: "-", padrao: "-", desc: "Componentes nulos: monte cada um uma vez, no layout raiz" },
                        ]}
                    >
                        <div className="p-4 rounded-xl bg-black/40 text-xs text-zinc-300 space-y-2">
                            <p>
                                <code className="text-roxo-claro font-mono">
                                    &lt;ScrollTop /&gt;
                                </code>{" "}
                                rola para o topo a cada navegação.
                            </p>
                            <p>
                                <code className="text-roxo-claro font-mono">
                                    &lt;RevealObserver /&gt;
                                </code>{" "}
                                ativa as entradas .reveal desta página,
                                inclusive os previews de .reveal acima.
                            </p>
                        </div>
                    </ComponentDocCard>
                </section>

                {/* 7. FORMULÁRIOS & CONTROLES */}
                <section id="formularios" className="scroll-mt-32 space-y-6">
                    <div className="pb-4">
                        <Badge textoBadge="PADRÃO DE INTERFACE" />
                        <h2 className="text-2xl sm:text-3xl font-titulo font-bold">
                            Padrão de Formulários & <strong>Inputs</strong>
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Padrão consistente de caixas de texto, selects e botões de alternância (como no painel Admin).
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-preto-fosco space-y-6">
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
                        <div className="space-y-2 pt-2">
                            <label className="text-xs font-semibold text-zinc-300">
                                Badges de Categoria & Tags Selecionáveis:
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <span className="button-press px-3 py-1 rounded-full text-xs font-bold grad-btn text-white">
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
                    <div className="pb-4">
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
            <footer className="py-8 bg-black/40 text-center text-xs text-zinc-500">
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
        <div className="rounded-2xl bg-preto-fosco overflow-hidden space-y-0">
            {/* Cabeçalho do Card */}
            <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white/2">
                <div>
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-titulo font-bold text-white tracking-wide">
                            &lt;{nome} /&gt;
                        </h3>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-roxo-principal/10 border border-roxo-principal/30 text-roxo-claro">
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
            <div className="px-5 py-3 bg-white/2 text-xs text-zinc-400">
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
                                <tr className="bg-white/5 text-zinc-400">
                                    <th className="py-2 px-3 font-semibold">Prop</th>
                                    <th className="py-2 px-3 font-semibold">Tipo</th>
                                    <th className="py-2 px-3 font-semibold">Padrão</th>
                                    <th className="py-2 px-3 font-semibold">Descrição</th>
                                </tr>
                            </thead>
                            <tbody className="text-zinc-300">
                                {props.map((p) => (
                                    <tr key={p.nome} className="hover:bg-white/5 odd:bg-white/[0.02]">
                                        <td className="py-2 px-3 text-roxo-claro font-bold">
                                            <code>{p.nome}</code>
                                        </td>
                                        <td className="py-2 px-3 text-zinc-400">
                                            <code>{p.tipo}</code>
                                        </td>
                                        <td className="py-2 px-3 text-amber-300/80">
                                            <code>{p.padrao}</code>
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

/* Card simples para documentar utilitários CSS com preview funcional */
const UtilDoc = ({ nome, arquivo, descricao, codigo, children }) => (
    <div className="rounded-2xl bg-preto-fosco overflow-hidden">
        <div className="p-5 bg-white/2">
            <h3 className="text-lg font-titulo font-bold text-white tracking-wide">
                {nome}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                <FileCode className="w-3.5 h-3.5 text-roxo-principal" />
                <code className="text-zinc-300 text-[11px]">{arquivo}</code>
            </div>
        </div>
        <div className="px-5 py-3 bg-white/2 text-xs text-zinc-400">
            {descricao}
        </div>
        <div className="p-5 space-y-4">
            <div className="p-4 rounded-xl bg-black/40">{children}</div>
            <pre className="p-4 rounded-xl bg-black/60 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
                {codigo}
            </pre>
        </div>
    </div>
);
