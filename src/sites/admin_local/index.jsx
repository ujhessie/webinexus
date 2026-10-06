import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    Plus,
    Search,
    Trash2,
    Edit3,
    RotateCcw,
    CheckCircle2,
    AlertCircle,
    Star,
    Image as IconeImagem,
    FolderKanban,
    ExternalLink,
    RefreshCw,
    X,
} from "lucide-react";
import { projetos as projetosIniciais } from "../../data/projetos.js";
import { ModalProjeto } from "./ModalProjeto.jsx";
import { GaleriaImagens } from "./GaleriaImagens.jsx";

const CATEGORIAS_FILTRO = [
    { id: "todas", rotulo: "Todas Categorias" },
    { id: "sites", rotulo: "Sites" },
    { id: "sistemas", rotulo: "Sistemas" },
    { id: "automacoes", rotulo: "Automações" },
    { id: "apis", rotulo: "APIs" },
    { id: "uiux", rotulo: "UI/UX" },
    { id: "identidade", rotulo: "Identidade Visual" },
    { id: "artes", rotulo: "Artes Digitais" },
    { id: "social", rotulo: "Social Media" },
];

export const Admin_local = () => {
    // Estados principais
    const [projetos, setProjetos] = useState(projetosIniciais || []);
    const [imagens, setImagens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    // Navegação e Filtros
    const [abaAtiva, setAbaAtiva] = useState("projetos"); // 'projetos' | 'imagens'
    const [busca, setBusca] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("todas");
    const [filtroStatus, setFiltroStatus] = useState("visivel"); // 'visivel' | 'lixeira' | 'todos'

    // Modais e Feedback
    const [modalProjetoAberto, setModalProjetoAberto] = useState(false);
    const [projetoEmEdicao, setProjetoEmEdicao] = useState(null);
    const [projetoExclusaoId, setProjetoExclusaoId] = useState(null);
    const [modalVincularImagem, setModalVincularImagem] = useState(null); // url da imagem a vincular

    const [notificacao, setNotificacao] = useState(null); // { tipo: 'sucesso' | 'erro', texto: '' }

    // Exibir notificação temporária
    const exibirNotificacao = useCallback((texto, tipo = "sucesso") => {
        setNotificacao({ tipo, texto });
        setTimeout(() => setNotificacao(null), 3500);
    }, []);

    // 1. Carregar dados das APIs locais do Vite
    const carregarDados = useCallback(async () => {
        setCarregando(true);
        try {
            // Busca projetos do arquivo local
            const resProjetos = await fetch("/api/admin/projetos");
            if (resProjetos.ok) {
                const dados = await resProjetos.json();
                if (dados.sucesso && Array.isArray(dados.projetos)) {
                    setProjetos(dados.projetos);
                }
            }

            // Busca imagens da pasta local public/imagens_projetos
            const resImagens = await fetch("/api/admin/imagens");
            if (resImagens.ok) {
                const dadosImg = await resImagens.json();
                if (dadosImg.sucesso && Array.isArray(dadosImg.imagens)) {
                    setImagens(dadosImg.imagens);
                }
            }
        } catch (erro) {
            console.error("Erro ao carregar dados locais:", erro);
            exibirNotificacao(
                "Aviso: Usando dados carregados da memória local.",
                "erro"
            );
        } finally {
            setCarregando(false);
        }
    }, [exibirNotificacao]);

    useEffect(() => {
        carregarDados();
    }, [carregarDados]);

    // 2. Persistir projetos em src/data/projetos.js
    const salvarNoArquivo = async (listaAtualizada) => {
        setSalvando(true);
        try {
            const resposta = await fetch("/api/admin/projetos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projetos: listaAtualizada }),
            });

            const resultado = await resposta.json();
            if (resultado.sucesso) {
                setProjetos(listaAtualizada);
                exibirNotificacao("Alterações salvas com sucesso em src/data/projetos.js!");
                return true;
            } else {
                throw new Error(resultado.erro || "Falha ao salvar no arquivo.");
            }
        } catch (erro) {
            console.error("Erro ao salvar:", erro);
            exibirNotificacao(`Erro ao persistir arquivo: ${erro.message}`, "erro");
            return false;
        } finally {
            setSalvando(false);
        }
    };

    // 3. Ações de Manipulação de Projetos
    const aoSalvarProjeto = async (dadosProjeto) => {
        let listaAtualizada;

        if (projetoEmEdicao) {
            // Atualizando projeto existente
            listaAtualizada = projetos.map((p) =>
                p.id === projetoEmEdicao.id ? dadosProjeto : p
            );
        } else {
            // Verificação de ID duplicado
            const idExiste = projetos.some((p) => p.id === dadosProjeto.id);
            if (idExiste) {
                exibirNotificacao("Já existe um projeto com este ID/Slug!", "erro");
                return;
            }
            listaAtualizada = [dadosProjeto, ...projetos];
        }

        const sucesso = await salvarNoArquivo(listaAtualizada);
        if (sucesso) {
            setModalProjetoAberto(false);
            setProjetoEmEdicao(null);
        }
    };

    const aoMoverParaLixeira = async (id) => {
        const listaAtualizada = projetos.map((p) =>
            p.id === id ? { ...p, status: "lixeira" } : p
        );
        const sucesso = await salvarNoArquivo(listaAtualizada);
        if (sucesso) {
            exibirNotificacao("Projeto movido para a lixeira.");
        }
    };

    const aoRestaurarProjeto = async (id) => {
        const listaAtualizada = projetos.map((p) =>
            p.id === id ? { ...p, status: "visivel" } : p
        );
        const sucesso = await salvarNoArquivo(listaAtualizada);
        if (sucesso) {
            exibirNotificacao("Projeto restaurado para os visíveis!");
        }
    };

    const aoExcluirPermanente = async (id) => {
        const listaAtualizada = projetos.filter((p) => p.id !== id);
        const sucesso = await salvarNoArquivo(listaAtualizada);
        if (sucesso) {
            setProjetoExclusaoId(null);
            exibirNotificacao("Projeto excluído definitivamente.");
        }
    };

    const aoAlternarDestaque = async (id) => {
        const listaAtualizada = projetos.map((p) =>
            p.id === id ? { ...p, destaque: !p.destaque } : p
        );
        salvarNoArquivo(listaAtualizada);
    };

    // Vincular imagem rápida da galeria a um projeto existente
    const confirmarVinculoImagem = async (idProjeto, campo) => {
        if (!modalVincularImagem) return;

        const listaAtualizada = projetos.map((p) => {
            if (p.id !== idProjeto) return p;

            const imagensAtualizadas = { ...p.imagens };
            if (campo === "capa") {
                imagensAtualizadas.capa = modalVincularImagem;
            } else if (campo === "banner") {
                imagensAtualizadas.banner = modalVincularImagem;
            } else if (campo === "galeria") {
                const galeriaAtual = Array.isArray(imagensAtualizadas.galeria)
                    ? [...imagensAtualizadas.galeria]
                    : [];
                if (!galeriaAtual.includes(modalVincularImagem)) {
                    galeriaAtual.push(modalVincularImagem);
                }
                imagensAtualizadas.galeria = galeriaAtual;
            }

            return { ...p, imagens: imagensAtualizadas };
        });

        const sucesso = await salvarNoArquivo(listaAtualizada);
        if (sucesso) {
            exibirNotificacao(
                `Imagem vinculada como ${campo.toUpperCase()} no projeto selecionado!`
            );
            setModalVincularImagem(null);
        }
    };

    // 4. Métricas e Filtros
    const totalVisiveis = useMemo(
        () => projetos.filter((p) => p.status !== "lixeira").length,
        [projetos]
    );
    const totalLixeira = useMemo(
        () => projetos.filter((p) => p.status === "lixeira").length,
        [projetos]
    );

    const projetosFiltrados = useMemo(() => {
        return projetos.filter((p) => {
            // Filtro de status
            const ehLixeira = p.status === "lixeira";
            if (filtroStatus === "visivel" && ehLixeira) return false;
            if (filtroStatus === "lixeira" && !ehLixeira) return false;

            // Filtro de categoria
            if (
                filtroCategoria !== "todas" &&
                (!Array.isArray(p.categorias) || !p.categorias.includes(filtroCategoria))
            ) {
                return false;
            }

            // Busca por texto
            const termo = busca.toLowerCase().trim();
            if (termo) {
                const titulo = (p.titulo || "").toLowerCase();
                const slug = (p.id || "").toLowerCase();
                const desc = (p.descricao || "").toLowerCase();
                const tags = Array.isArray(p.tags) ? p.tags.join(" ").toLowerCase() : "";

                const coincide =
                    titulo.includes(termo) ||
                    slug.includes(termo) ||
                    desc.includes(termo) ||
                    tags.includes(termo);

                if (!coincide) return false;
            }

            return true;
        });
    }, [projetos, filtroStatus, filtroCategoria, busca]);

    return (
        <div className="min-h-screen bg-[#0a0b14] text-slate-100 flex flex-col font-sans">
            {/* Notificação Toast Flutuante */}
            {notificacao && (
                <div
                    className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold backdrop-blur-md transition-all animate-bounce ${
                        notificacao.tipo === "erro"
                            ? "bg-red-500/90 border-red-400 text-white"
                            : "bg-emerald-500/90 border-emerald-400 text-white"
                    }`}
                >
                    {notificacao.tipo === "erro" ? (
                        <AlertCircle className="w-4 h-4" />
                    ) : (
                        <CheckCircle2 className="w-4 h-4" />
                    )}
                    {notificacao.texto}
                </div>
            )}

            {/* Cabeçalho Superior */}
            <header className="border-b border-white/10 bg-[#101120] sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
                            <FolderKanban className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-bold text-white tracking-tight">
                                    Painel Inexus Local
                                </h1>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Vite Node Ativo
                                </span>
                            </div>
                            <p className="text-xs text-slate-400">
                                Gerenciamento e persistência direta em{" "}
                                <span className="text-purple-300 font-mono">
                                    src/data/projetos.js
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Ações do Topo */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        {salvando && (
                            <span className="text-xs text-purple-400 animate-pulse font-medium">
                                Salvando no arquivo...
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={carregarDados}
                            disabled={carregando || salvando}
                            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition text-xs flex items-center gap-1.5"
                            title="Recarregar dados do arquivo"
                        >
                            <RefreshCw className={`w-4 h-4 ${carregando ? "animate-spin" : ""}`} />
                            <span className="hidden md:inline">Recarregar</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setProjetoEmEdicao(null);
                                setModalProjetoAberto(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-purple-600/20 transition"
                        >
                            <Plus className="w-4 h-4" />
                            Novo Projeto
                        </button>
                    </div>
                </div>

                {/* Abas de Navegação */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-6 border-t border-white/5 text-xs font-semibold">
                    <button
                        type="button"
                        onClick={() => setAbaAtiva("projetos")}
                        className={`py-3 flex items-center gap-2 border-b-2 transition ${
                            abaAtiva === "projetos"
                                ? "border-purple-500 text-purple-400"
                                : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                    >
                        <FolderKanban className="w-4 h-4" />
                        Projetos do Portfólio
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px]">
                            {projetos.length}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setAbaAtiva("imagens")}
                        className={`py-3 flex items-center gap-2 border-b-2 transition ${
                            abaAtiva === "imagens"
                                ? "border-purple-500 text-purple-400"
                                : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                    >
                        <IconeImagem className="w-4 h-4" />
                        Monitor de Imagens
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px]">
                            {imagens.length}
                        </span>
                    </button>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
                {abaAtiva === "projetos" ? (
                    <div className="space-y-6">
                        {/* Barra de Filtros e Busca */}
                        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 bg-[#121324] border border-white/10 rounded-2xl shadow-sm">
                            {/* Input de Busca */}
                            <div className="relative flex-1">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    placeholder="Buscar por título, ID slug, tags ou descrição..."
                                    className="w-full pl-10 pr-4 py-2 bg-[#0c0d18] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            {/* Filtro por Categoria */}
                            <div className="flex flex-wrap items-center gap-2">
                                <select
                                    value={filtroCategoria}
                                    onChange={(e) => setFiltroCategoria(e.target.value)}
                                    className="px-3 py-2 bg-[#0c0d18] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                                >
                                    {CATEGORIAS_FILTRO.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.rotulo}
                                        </option>
                                    ))}
                                </select>

                                {/* Filtro por Status */}
                                <div className="flex bg-[#0c0d18] p-1 border border-white/10 rounded-xl text-xs">
                                    <button
                                        type="button"
                                        onClick={() => setFiltroStatus("visivel")}
                                        className={`px-3 py-1.5 rounded-lg font-medium transition ${
                                            filtroStatus === "visivel"
                                                ? "bg-purple-600 text-white"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        Visíveis ({totalVisiveis})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFiltroStatus("lixeira")}
                                        className={`px-3 py-1.5 rounded-lg font-medium transition ${
                                            filtroStatus === "lixeira"
                                                ? "bg-red-600/80 text-white"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        Lixeira ({totalLixeira})
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFiltroStatus("todos")}
                                        className={`px-3 py-1.5 rounded-lg font-medium transition ${
                                            filtroStatus === "todos"
                                                ? "bg-white/10 text-white"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        Todos
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Listagem em Grid de Projetos */}
                        {projetosFiltrados.length === 0 ? (
                            <div className="text-center py-20 bg-[#121324] border border-white/10 rounded-2xl text-slate-400 space-y-3">
                                <FolderKanban className="w-12 h-12 text-slate-500 mx-auto" />
                                <p className="text-sm font-medium">Nenhum projeto encontrado.</p>
                                <p className="text-xs text-slate-500">
                                    Tente ajustar os filtros ou clique em &quot;+ Novo Projeto&quot; para adicionar.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {projetosFiltrados.map((projeto) => {
                                    const ehLixeira = projeto.status === "lixeira";

                                    return (
                                        <div
                                            key={projeto.id}
                                            className={`group bg-[#121324] border rounded-2xl overflow-hidden flex flex-col transition-all duration-200 shadow-xl ${
                                                ehLixeira
                                                    ? "border-red-500/20 opacity-75 hover:opacity-100"
                                                    : "border-white/10 hover:border-purple-500/40"
                                            }`}
                                        >
                                            {/* Imagem de Capa do Card */}
                                            <div className="relative w-full h-44 bg-[#0a0b14] overflow-hidden flex items-center justify-center">
                                                {projeto.imagens?.capa ? (
                                                    <img
                                                        src={projeto.imagens.capa}
                                                        alt={projeto.titulo}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                        onError={(e) => {
                                                            e.target.style.display = "none";
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center text-slate-600 gap-1">
                                                        <IconeImagem className="w-8 h-8" />
                                                        <span className="text-[10px]">Sem capa</span>
                                                    </div>
                                                )}

                                                {/* Badges Superior */}
                                                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                                                    {ehLixeira ? (
                                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600/90 text-white backdrop-blur-md">
                                                            Lixeira
                                                        </span>
                                                    ) : (
                                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600/80 text-white backdrop-blur-md">
                                                            Visível
                                                        </span>
                                                    )}

                                                    {projeto.destaque && (
                                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-black backdrop-blur-md flex items-center gap-1">
                                                            <Star className="w-3 h-3 fill-black" /> Destaque
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Botão de alternar destaque rápido */}
                                                <button
                                                    type="button"
                                                    onClick={() => aoAlternarDestaque(projeto.id)}
                                                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-amber-400 transition backdrop-blur-md"
                                                    title={projeto.destaque ? "Remover destaque" : "Marcar como destaque"}
                                                >
                                                    <Star
                                                        className={`w-4 h-4 ${
                                                            projeto.destaque ? "fill-amber-400 text-amber-400" : ""
                                                        }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Conteúdo do Card */}
                                            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                                                                {projeto.titulo}
                                                            </h3>
                                                            <p className="text-[11px] font-mono text-purple-400/80">
                                                                #{projeto.id}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Breve Descrição */}
                                                    {projeto.breveDescricao && (
                                                        <p className="text-xs text-slate-400 line-clamp-2">
                                                            {projeto.breveDescricao}
                                                        </p>
                                                    )}

                                                    {/* Categorias */}
                                                    {Array.isArray(projeto.categorias) && projeto.categorias.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 pt-1">
                                                            {projeto.categorias.map((cat) => (
                                                                <span
                                                                    key={cat}
                                                                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                                                >
                                                                    {cat}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Tags */}
                                                    {Array.isArray(projeto.tags) && projeto.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1">
                                                            {projeto.tags.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="px-1.5 py-0.5 rounded text-[10px] text-slate-400 bg-white/5"
                                                                >
                                                                    #{tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Rodapé do Card com Ações */}
                                                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setProjetoEmEdicao(projeto);
                                                            setModalProjetoAberto(true);
                                                        }}
                                                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold bg-white/5 hover:bg-purple-600 hover:text-white text-slate-300 border border-white/10 hover:border-purple-500 transition"
                                                    >
                                                        <Edit3 className="w-3.5 h-3.5" /> Editar
                                                    </button>

                                                    {ehLixeira ? (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => aoRestaurarProjeto(projeto.id)}
                                                                className="p-2 text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-600 border border-emerald-500/20 rounded-xl transition"
                                                                title="Restaurar projeto"
                                                            >
                                                                <RotateCcw className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => setProjetoExclusaoId(projeto.id)}
                                                                className="p-2 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 border border-red-500/20 rounded-xl transition"
                                                                title="Excluir definitivamente"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => aoMoverParaLixeira(projeto.id)}
                                                            className="p-2 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition"
                                                            title="Mover para lixeira"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Aba de Monitoramento de Imagens */
                    <GaleriaImagens
                        imagens={imagens}
                        projetos={projetos}
                        aoDefinirImagemEmProjeto={(url) => setModalVincularImagem(url)}
                        aoExibirMensagem={exibirNotificacao}
                    />
                )}
            </main>

            {/* Modal de Criação / Edição de Projeto */}
            {modalProjetoAberto && (
                <ModalProjeto
                    projetoParaEditar={projetoEmEdicao}
                    aoFechar={() => {
                        setModalProjetoAberto(false);
                        setProjetoEmEdicao(null);
                    }}
                    aoSalvar={aoSalvarProjeto}
                    imagensDisponiveis={imagens}
                />
            )}

            {/* Modal de Confirmação de Exclusão Definitiva */}
            {projetoExclusaoId && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#151628] border border-red-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-200 space-y-4">
                        <div className="flex items-center gap-3 text-red-400">
                            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                                <Trash2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-bold text-white">
                                Excluir Definitivamente?
                            </h3>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Tem certeza que deseja apagar o projeto{" "}
                            <span className="font-mono text-red-300 font-bold">
                                {projetoExclusaoId}
                            </span>
                            ? Essa ação removerá o registro do arquivo{" "}
                            <code>src/data/projetos.js</code> e não poderá ser desfeita.
                        </p>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setProjetoExclusaoId(null)}
                                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={() => aoExcluirPermanente(projetoExclusaoId)}
                                className="px-4 py-2 text-xs font-semibold text-white rounded-xl bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30"
                            >
                                Sim, Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Vinculação Rápida de Imagem a um Projeto */}
            {modalVincularImagem && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#151628] border border-white/15 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-slate-200 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <ExternalLink className="w-4 h-4 text-purple-400" />
                                Vincular Imagem a um Projeto
                            </h3>
                            <button
                                type="button"
                                onClick={() => setModalVincularImagem(null)}
                                className="p-1 text-slate-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 p-2 bg-[#0c0d18] rounded-xl border border-white/10">
                            <img
                                src={modalVincularImagem}
                                alt="Prévia"
                                className="w-14 h-14 object-cover rounded-lg border border-white/10"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-mono text-purple-300 truncate">
                                    {modalVincularImagem}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-xs font-semibold text-slate-300">
                                Escolha o projeto de destino:
                            </label>
                            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                                {projetos.map((proj) => (
                                    <div
                                        key={proj.id}
                                        className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-2"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold text-white truncate">
                                                {proj.titulo}
                                            </p>
                                            <p className="text-[10px] font-mono text-slate-400 truncate">
                                                {proj.id}
                                            </p>
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                type="button"
                                                onClick={() => confirmarVinculoImagem(proj.id, "capa")}
                                                className="px-2 py-1 bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-purple-200 text-[10px] font-semibold rounded-lg transition"
                                            >
                                                Definir Capa
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => confirmarVinculoImagem(proj.id, "banner")}
                                                className="px-2 py-1 bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-200 text-[10px] font-semibold rounded-lg transition"
                                            >
                                                Banner
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => confirmarVinculoImagem(proj.id, "galeria")}
                                                className="px-2 py-1 bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-semibold rounded-lg transition"
                                            >
                                                + Galeria
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};