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
    ArrowUpDown,
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

const OPCOES_ORDENACAO = [
    { id: "destaque", rotulo: "Destaques primeiro" },
    { id: "az", rotulo: "Título (A-Z)" },
    { id: "arquivo", rotulo: "Ordem do arquivo" },
];

const TONS_RESUMO = {
    neutro: {
        icone: "bg-white/5 text-slate-300",
        valor: "text-white",
    },
    roxo: {
        icone: "bg-roxo-principal/10 text-roxo-claro",
        valor: "text-white",
    },
    esmeralda: {
        icone: "bg-emerald-500/10 text-emerald-400",
        valor: "text-emerald-300",
    },
    ambar: {
        icone: "bg-amber-500/10 text-amber-400",
        valor: "text-amber-300",
    },
    vermelho: {
        icone: "bg-red-500/10 text-red-400",
        valor: "text-red-300",
    },
};

const ehUrlDeSite = (url) =>
    typeof url === "string" && /^https?:\/\/.+\..+/i.test(url);

// Link principal com URL real = projeto publicado no ar
function obterLinkAoVivo(projeto) {
    return (projeto.links || []).find(
        (link) => link.principal && ehUrlDeSite(link.url),
    );
}

// Ordenação da listagem (não mexe no array original)
function ordenarProjetos(lista, modo) {
    const copia = [...lista];

    if (modo === "az") {
        return copia.sort((a, b) =>
            (a.titulo || "").localeCompare(b.titulo || "", "pt-BR", {
                sensitivity: "base",
            }),
        );
    }

    if (modo === "destaque") {
        return copia.sort(
            (a, b) =>
                Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)),
        );
    }

    return copia;
}

const CartaoResumo = ({
    rotulo,
    valor,
    Icone,
    tom = "neutro",
    ativo = false,
    aoClicar,
    descricao,
}) => {
    const estilo = TONS_RESUMO[tom] ?? TONS_RESUMO.neutro;

    return (
        <button
            type='button'
            onClick={aoClicar}
            aria-pressed={ativo}
            title={descricao}
            className={`button-press flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                ativo
                    ? "border-roxo-principal/60 bg-white/[0.06]"
                    : "border-white/[0.06] bg-preto-fosco hover:border-white/15"
            }`}
        >
            <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${estilo.icone}`}
            >
                <Icone className='h-4 w-4' />
            </span>
            <span className='min-w-0'>
                <span className='block truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500'>
                    {rotulo}
                </span>
                <span
                    className={`block text-lg font-bold leading-tight tabular ${estilo.valor}`}
                >
                    {valor}
                </span>
            </span>
        </button>
    );
};

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
    const [filtroDestaque, setFiltroDestaque] = useState(false);
    const [ordenacao, setOrdenacao] = useState("destaque");

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
                "erro",
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
                exibirNotificacao(
                    "Alterações salvas com sucesso em src/data/projetos.js!",
                );
                return true;
            } else {
                throw new Error(
                    resultado.erro || "Falha ao salvar no arquivo.",
                );
            }
        } catch (erro) {
            console.error("Erro ao salvar:", erro);
            exibirNotificacao(
                `Erro ao persistir arquivo: ${erro.message}`,
                "erro",
            );
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
                p.id === projetoEmEdicao.id ? dadosProjeto : p,
            );
        } else {
            // Verificação de ID duplicado
            const idExiste = projetos.some((p) => p.id === dadosProjeto.id);
            if (idExiste) {
                exibirNotificacao(
                    "Já existe um projeto com este ID/Slug!",
                    "erro",
                );
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
            p.id === id ? { ...p, status: "lixeira" } : p,
        );
        const sucesso = await salvarNoArquivo(listaAtualizada);
        if (sucesso) {
            exibirNotificacao("Projeto movido para a lixeira.");
        }
    };

    const aoRestaurarProjeto = async (id) => {
        const listaAtualizada = projetos.map((p) =>
            p.id === id ? { ...p, status: "visivel" } : p,
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
        const projeto = projetos.find((p) => p.id === id);
        const listaAtualizada = projetos.map((p) =>
            p.id === id ? { ...p, destaque: !p.destaque } : p,
        );
        const sucesso = await salvarNoArquivo(listaAtualizada);
        if (sucesso && projeto) {
            exibirNotificacao(
                projeto.destaque
                    ? "Destaque removido do projeto."
                    : "Projeto marcado como destaque!",
            );
        }
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
                `Imagem vinculada como ${campo.toUpperCase()} no projeto selecionado!`,
            );
            setModalVincularImagem(null);
        }
    };

    // 4. Métricas e Filtros
    const totalVisiveis = useMemo(
        () => projetos.filter((p) => p.status !== "lixeira").length,
        [projetos],
    );
    const totalLixeira = useMemo(
        () => projetos.filter((p) => p.status === "lixeira").length,
        [projetos],
    );
    const totalDestaques = useMemo(
        () =>
            projetos.filter((p) => p.destaque && p.status !== "lixeira")
                .length,
        [projetos],
    );

    const projetosFiltrados = useMemo(() => {
        const termo = busca.toLowerCase().trim();

        const filtrados = projetos.filter((p) => {
            // Filtro de status
            const ehLixeira = p.status === "lixeira";
            if (filtroStatus === "visivel" && ehLixeira) return false;
            if (filtroStatus === "lixeira" && !ehLixeira) return false;

            // Filtro de destaque
            if (filtroDestaque && !p.destaque) return false;

            // Filtro de categoria
            if (
                filtroCategoria !== "todas" &&
                (!Array.isArray(p.categorias) ||
                    !p.categorias.includes(filtroCategoria))
            ) {
                return false;
            }

            // Busca por texto
            if (termo) {
                const titulo = (p.titulo || "").toLowerCase();
                const slug = (p.id || "").toLowerCase();
                const desc = (p.descricao || "").toLowerCase();
                const tags = Array.isArray(p.tags)
                    ? p.tags.join(" ").toLowerCase()
                    : "";

                const coincide =
                    titulo.includes(termo) ||
                    slug.includes(termo) ||
                    desc.includes(termo) ||
                    tags.includes(termo);

                if (!coincide) return false;
            }

            return true;
        });

        return ordenarProjetos(filtrados, ordenacao);
    }, [
        projetos,
        filtroStatus,
        filtroDestaque,
        filtroCategoria,
        busca,
        ordenacao,
    ]);

    const temFiltroAtivo =
        Boolean(busca.trim()) ||
        filtroCategoria !== "todas" ||
        filtroStatus !== "visivel" ||
        filtroDestaque ||
        ordenacao !== "destaque";

    const limparFiltros = () => {
        setBusca("");
        setFiltroCategoria("todas");
        setFiltroStatus("visivel");
        setFiltroDestaque(false);
        setOrdenacao("destaque");
    };

    const abrirEdicao = (projeto) => {
        setProjetoEmEdicao(projeto);
        setModalProjetoAberto(true);
    };

    return (
        <div className='min-h-svh bg-preto-escuro text-slate-100 flex flex-col'>
            {/* Notificação Toast Flutuante */}
            {notificacao && (
                <div
                    data-ui
                    className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl text-xs font-semibold animate-fade-in-up transition-[transform,opacity] ${
                        notificacao.tipo === "erro"
                            ? "bg-red-500/90 border-red-400 text-white"
                            : "bg-emerald-500/90 border-emerald-400 text-white"
                    }`}
                >
                    {notificacao.tipo === "erro" ? (
                        <AlertCircle className='w-4 h-4' />
                    ) : (
                        <CheckCircle2 className='w-4 h-4' />
                    )}
                    {notificacao.texto}
                </div>
            )}

            {/* Cabeçalho Superior */}
            <header className='bg-preto-fosco sticky top-0 z-30 border-b border-white/5'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                    <div className='flex items-center gap-3'>
                        <div className='grad-icon w-9 h-9 rounded-xl flex items-center justify-center shrink-0'>
                            <FolderKanban className='w-4.5 h-4.5 text-white' />
                        </div>
                        <div className='min-w-0'>
                            <div className='flex items-center gap-2 flex-wrap'>
                                <h1 className='text-base font-bold text-white tracking-tight font-titulo'>
                                    Painel Inexus Local
                                </h1>
                                <span className='inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
                                    Vite Node Ativo
                                </span>
                            </div>
                            <p className='text-[11px] text-slate-400 truncate'>
                                Edição direta em{" "}
                                <code className='text-[#d28bff] font-mono'>
                                    src/data/projetos.js
                                </code>
                            </p>
                        </div>
                    </div>

                    {/* Ações do Topo */}
                    <div className='flex items-center gap-2 w-full sm:w-auto justify-end'>
                        {salvando && (
                            <span className='text-[11px] text-[#d28bff] font-medium'>
                                Salvando...
                            </span>
                        )}
                        <button
                            type='button'
                            onClick={carregarDados}
                            disabled={carregando || salvando}
                            className='button-press flex items-center gap-1.5 px-3 py-2 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50'
                            title='Recarregar dados do arquivo'
                        >
                            <RefreshCw
                                className={`w-4 h-4 ${carregando ? "animate-spin" : ""}`}
                            />
                            <span className='hidden md:inline'>Recarregar</span>
                        </button>

                        <button
                            type='button'
                            onClick={() => {
                                setProjetoEmEdicao(null);
                                setModalProjetoAberto(true);
                            }}
                            className='button-press sombra-btn grad-btn flex items-center gap-1.5 px-3.5 py-2 text-white rounded-lg text-xs font-semibold hover:-translate-y-0.5 transition-[transform,box-shadow]'
                        >
                            <Plus className='w-4 h-4' />
                            Novo Projeto
                        </button>
                    </div>
                </div>

                {/* Abas de Navegação */}
                <div className='max-w-7xl mx-auto px-4 sm:px-6 flex gap-5 text-xs font-semibold'>
                    <button
                        type='button'
                        onClick={() => setAbaAtiva("projetos")}
                        className={`button-press py-2.5 flex items-center gap-2 border-b-2 transition-[border-color,color] ${
                            abaAtiva === "projetos"
                                ? "border-roxo-principal text-[#d28bff]"
                                : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                    >
                        <FolderKanban className='w-4 h-4' />
                        Projetos
                        <span className='px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] tabular'>
                            {projetos.length}
                        </span>
                    </button>

                    <button
                        type='button'
                        onClick={() => setAbaAtiva("imagens")}
                        className={`button-press py-2.5 flex items-center gap-2 border-b-2 transition-[border-color,color] ${
                            abaAtiva === "imagens"
                                ? "border-roxo-principal text-[#d28bff]"
                                : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                    >
                        <IconeImagem className='w-4 h-4' />
                        Monitor de Imagens
                        <span className='px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] tabular'>
                            {imagens.length}
                        </span>
                    </button>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className='max-w-7xl mx-auto px-4 sm:px-6 py-5 flex-1 w-full'>
                {abaAtiva === "projetos" ? (
                    <div className='space-y-4'>
                        {/* Resumo clicável */}
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-2.5'>
                            <CartaoResumo
                                rotulo='Total'
                                valor={projetos.length}
                                Icone={FolderKanban}
                                tom='neutro'
                                ativo={
                                    filtroStatus === "todos" && !filtroDestaque
                                }
                                descricao='Ver todos os projetos, inclusive os da lixeira'
                                aoClicar={() => {
                                    setFiltroStatus("todos");
                                    setFiltroDestaque(false);
                                }}
                            />
                            <CartaoResumo
                                rotulo='Visíveis'
                                valor={totalVisiveis}
                                Icone={CheckCircle2}
                                tom='esmeralda'
                                ativo={
                                    filtroStatus === "visivel" &&
                                    !filtroDestaque
                                }
                                descricao='Projetos publicados no portfólio'
                                aoClicar={() => {
                                    setFiltroStatus("visivel");
                                    setFiltroDestaque(false);
                                }}
                            />
                            <CartaoResumo
                                rotulo='Destaques'
                                valor={totalDestaques}
                                Icone={Star}
                                tom='ambar'
                                ativo={filtroDestaque}
                                descricao='Aparecem primeiro na galeria dos sites'
                                aoClicar={() => {
                                    setFiltroStatus("visivel");
                                    setFiltroDestaque(true);
                                }}
                            />
                            <CartaoResumo
                                rotulo='Lixeira'
                                valor={totalLixeira}
                                Icone={Trash2}
                                tom='vermelho'
                                ativo={filtroStatus === "lixeira"}
                                descricao='Projetos ocultos do portfólio'
                                aoClicar={() => {
                                    setFiltroStatus("lixeira");
                                    setFiltroDestaque(false);
                                }}
                            />
                        </div>

                        <p className='flex items-center gap-1.5 px-1 text-[11px] text-slate-500'>
                            <Star className='w-3 h-3 text-amber-400' />
                            Projetos em destaque aparecem primeiro na galeria
                            da Web iNexus e do Ujhessie.
                        </p>

                        {/* Barra de Filtros e Busca */}
                        <div className='bg-preto-fosco rounded-xl border border-white/[0.06] p-3 sm:p-4 space-y-2.5'>
                            <div className='flex flex-col md:flex-row gap-2.5'>
                                {/* Input de Busca */}
                                <div className='relative flex-1'>
                                    <Search className='w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2' />
                                    <input
                                        type='text'
                                        value={busca}
                                        onChange={(e) =>
                                            setBusca(e.target.value)
                                        }
                                        placeholder='Buscar por título, slug, tags ou descrição...'
                                        className='w-full pl-9 pr-9 py-2.5 bg-preto-escuro rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-roxo-principal border border-white/5 transition-colors'
                                    />
                                    {busca && (
                                        <button
                                            type='button'
                                            onClick={() => setBusca("")}
                                            className='absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-500 hover:text-white rounded'
                                            title='Limpar busca'
                                        >
                                            <X className='w-3.5 h-3.5' />
                                        </button>
                                    )}
                                </div>

                                {/* Ordenação */}
                                <div className='relative'>
                                    <ArrowUpDown className='w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none' />
                                    <select
                                        value={ordenacao}
                                        onChange={(e) =>
                                            setOrdenacao(e.target.value)
                                        }
                                        aria-label='Ordenar projetos'
                                        className='w-full md:w-48 appearance-none pl-9 pr-8 py-2.5 bg-preto-escuro rounded-lg text-xs text-white focus:outline-none focus:border-roxo-principal border border-white/5 transition-colors'
                                    >
                                        {OPCOES_ORDENACAO.map((opcao) => (
                                            <option
                                                key={opcao.id}
                                                value={opcao.id}
                                            >
                                                {opcao.rotulo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-wrap items-center gap-2'>
                                {/* Filtro por Status */}
                                <div className='flex bg-preto-escuro p-1 rounded-lg text-xs'>
                                    <button
                                        type='button'
                                        onClick={() =>
                                            setFiltroStatus("visivel")
                                        }
                                        className={`button-press px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                                            filtroStatus === "visivel"
                                                ? "bg-white/10 text-white"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        Visíveis
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() =>
                                            setFiltroStatus("lixeira")
                                        }
                                        className={`button-press px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                                            filtroStatus === "lixeira"
                                                ? "bg-red-500/20 text-red-200"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        Lixeira
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setFiltroStatus("todos")}
                                        className={`button-press px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                                            filtroStatus === "todos"
                                                ? "bg-white/10 text-white"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        Todos
                                    </button>
                                </div>

                                {/* Filtro por Categoria */}
                                <select
                                    value={filtroCategoria}
                                    onChange={(e) =>
                                        setFiltroCategoria(e.target.value)
                                    }
                                    aria-label='Filtrar por categoria'
                                    className='px-3 py-2 bg-preto-escuro rounded-lg text-xs text-white focus:outline-none focus:border-roxo-principal border border-white/5 transition-colors'
                                >
                                    {CATEGORIAS_FILTRO.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.rotulo}
                                        </option>
                                    ))}
                                </select>

                                {/* Filtro de Destaques */}
                                <button
                                    type='button'
                                    onClick={() =>
                                        setFiltroDestaque((v) => !v)
                                    }
                                    aria-pressed={filtroDestaque}
                                    title='Mostrar apenas projetos em destaque'
                                    className={`button-press flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                                        filtroDestaque
                                            ? "bg-amber-500/15 border-amber-400/60 text-amber-200"
                                            : "bg-preto-escuro border-white/5 text-slate-400 hover:text-white hover:border-white/20"
                                    }`}
                                >
                                    <Star
                                        className={`w-3.5 h-3.5 ${
                                            filtroDestaque
                                                ? "fill-amber-400 text-amber-400"
                                                : ""
                                        }`}
                                    />
                                    Só destaques
                                    <span
                                        className={`px-1.5 rounded text-[10px] tabular ${
                                            filtroDestaque
                                                ? "bg-amber-400/20 text-amber-100"
                                                : "bg-white/5 text-slate-400"
                                        }`}
                                    >
                                        {totalDestaques}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Contagem + Limpar filtros */}
                        <div className='flex flex-wrap items-center justify-between gap-2 px-1'>
                            <p className='text-[11px] text-slate-500'>
                                <strong className='text-slate-200 tabular'>
                                    {projetosFiltrados.length}
                                </strong>{" "}
                                de {projetos.length} projeto
                                {projetos.length === 1 ? "" : "s"}
                                {filtroDestaque && " · só destaques"}
                            </p>

                            {temFiltroAtivo && (
                                <button
                                    type='button'
                                    onClick={limparFiltros}
                                    className='button-press flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-white'
                                >
                                    <X className='w-3 h-3' />
                                    Limpar filtros
                                </button>
                            )}
                        </div>

                        {/* Listagem em Grade */}
                        {projetosFiltrados.length === 0 ? (
                            <div className='text-center py-16 bg-preto-fosco rounded-xl border border-white/[0.06] text-slate-400 space-y-3'>
                                <FolderKanban className='w-10 h-10 text-slate-600 mx-auto' />
                                <div className='space-y-1'>
                                    <p className='text-sm font-medium text-slate-200'>
                                        Nenhum projeto com esses filtros.
                                    </p>
                                    <p className='text-xs text-slate-500'>
                                        Ajuste a busca ou limpe os filtros para
                                        ver a lista completa.
                                    </p>
                                </div>
                                <button
                                    type='button'
                                    onClick={limparFiltros}
                                    className='button-press px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors'
                                >
                                    Limpar filtros
                                </button>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5'>
                                {projetosFiltrados.map((projeto) => {
                                    const ehLixeira =
                                        projeto.status === "lixeira";
                                    const linkAoVivo =
                                        obterLinkAoVivo(projeto);
                                    const categorias = Array.isArray(
                                        projeto.categorias,
                                    )
                                        ? projeto.categorias
                                        : [];

                                    return (
                                        <article
                                            key={projeto.id}
                                            className={`group flex flex-col overflow-hidden rounded-xl border bg-preto-fosco transition-colors ${
                                                ehLixeira
                                                    ? "border-red-500/20 opacity-80 hover:opacity-100"
                                                    : projeto.destaque
                                                      ? "border-amber-400/25 hover:border-amber-400/50"
                                                      : "border-white/[0.06] hover:border-roxo-principal/40"
                                            }`}
                                        >
                                            {/* Capa */}
                                            <div
                                                className='relative aspect-[16/10] overflow-hidden bg-preto-escuro cursor-pointer'
                                                onClick={() =>
                                                    abrirEdicao(projeto)
                                                }
                                                title={`Editar ${projeto.titulo}`}
                                            >
                                                {projeto.imagens?.capa ? (
                                                    <img
                                                        src={
                                                            projeto.imagens.capa
                                                        }
                                                        alt={projeto.titulo}
                                                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                                                        onError={(e) => {
                                                            e.target.style.display =
                                                                "none";
                                                        }}
                                                    />
                                                ) : (
                                                    <div className='flex h-full flex-col items-center justify-center gap-1 text-slate-600'>
                                                        <IconeImagem className='w-7 h-7' />
                                                        <span className='text-[10px]'>
                                                            Sem capa
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Status + destaque */}
                                                <div className='absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5'>
                                                    {ehLixeira ? (
                                                        <span className='px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-600/90 text-white'>
                                                            Lixeira
                                                        </span>
                                                    ) : (
                                                        <span className='px-2 py-0.5 rounded-md text-[10px] font-semibold bg-preto-escuro/85 text-slate-300'>
                                                            Visível
                                                        </span>
                                                    )}
                                                    {projeto.destaque && (
                                                        <span className='px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-black flex items-center gap-1'>
                                                            <Star className='w-2.5 h-2.5 fill-black' />
                                                            Destaque
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Alternar destaque */}
                                                <button
                                                    type='button'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        aoAlternarDestaque(
                                                            projeto.id,
                                                        );
                                                    }}
                                                    className={`absolute top-2.5 right-2.5 button-press flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
                                                        projeto.destaque
                                                            ? "bg-amber-500/20 border-amber-400/50 text-amber-300"
                                                            : "bg-preto-escuro/85 border-white/10 text-slate-400 hover:text-amber-300 hover:border-amber-400/40"
                                                    }`}
                                                    title={
                                                        projeto.destaque
                                                            ? "Remover destaque"
                                                            : "Marcar como destaque"
                                                    }
                                                >
                                                    <Star
                                                        className={`w-3.5 h-3.5 ${
                                                            projeto.destaque
                                                                ? "fill-amber-400"
                                                                : ""
                                                        }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Conteúdo */}
                                            <div className='flex flex-1 flex-col gap-2 p-3.5'>
                                                <h3 className='text-[13px] font-bold leading-snug text-white group-hover:text-[#d28bff] transition-colors line-clamp-1'>
                                                    {projeto.titulo}
                                                </h3>

                                                <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-slate-500'>
                                                    <code className='font-mono truncate max-w-full'>
                                                        #{projeto.id}
                                                    </code>
                                                    {linkAoVivo && (
                                                        <span className='inline-flex items-center gap-1 text-emerald-400'>
                                                            <span className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
                                                            No ar
                                                        </span>
                                                    )}
                                                </div>

                                                {projeto.breveDescricao && (
                                                    <p className='text-[11px] leading-relaxed text-slate-400 line-clamp-2'>
                                                        {projeto.breveDescricao}
                                                    </p>
                                                )}

                                                {categorias.length > 0 && (
                                                    <div className='flex flex-wrap items-center gap-1 pt-0.5'>
                                                        {categorias
                                                            .slice(0, 3)
                                                            .map((cat) => (
                                                                <span
                                                                    key={cat}
                                                                    className='px-1.5 py-0.5 rounded text-[10px] font-medium bg-roxo-principal/10 text-[#d28bff]'
                                                                >
                                                                    {cat}
                                                                </span>
                                                            ))}
                                                        {categorias.length >
                                                            3 && (
                                                            <span className='text-[10px] text-slate-500'>
                                                                +
                                                                {categorias.length -
                                                                    3}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Ações */}
                                            <div className='flex items-center gap-1.5 border-t border-white/[0.06] px-3 py-2.5'>
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        abrirEdicao(projeto)
                                                    }
                                                    className='button-press flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/5 py-1.5 px-3 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors'
                                                >
                                                    <Edit3 className='w-3.5 h-3.5' />
                                                    Editar
                                                </button>

                                                {ehLixeira ? (
                                                    <>
                                                        <button
                                                            type='button'
                                                            onClick={() =>
                                                                aoRestaurarProjeto(
                                                                    projeto.id,
                                                                )
                                                            }
                                                            className='button-press p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors'
                                                            title='Restaurar projeto'
                                                        >
                                                            <RotateCcw className='w-3.5 h-3.5' />
                                                        </button>
                                                        <button
                                                            type='button'
                                                            onClick={() =>
                                                                setProjetoExclusaoId(
                                                                    projeto.id,
                                                                )
                                                            }
                                                            className='button-press p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white transition-colors'
                                                            title='Excluir definitivamente'
                                                        >
                                                            <Trash2 className='w-3.5 h-3.5' />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            aoMoverParaLixeira(
                                                                projeto.id,
                                                            )
                                                        }
                                                        className='button-press p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-red-500/20 hover:text-red-300 transition-colors'
                                                        title='Mover para lixeira'
                                                    >
                                                        <Trash2 className='w-3.5 h-3.5' />
                                                    </button>
                                                )}
                                            </div>
                                        </article>
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
                        aoDefinirImagemEmProjeto={(url) =>
                            setModalVincularImagem(url)
                        }
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
                <div className='fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80'>
                    <div
                        data-ui
                        className='bg-preto-fosco border border-red-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-200 space-y-4'
                    >
                        <div className='flex items-center gap-3 text-red-400'>
                            <div className='p-2.5 rounded-xl bg-red-500/10 border border-red-500/20'>
                                <Trash2 className='w-6 h-6' />
                            </div>
                            <h3 className='text-base font-bold text-white'>
                                Excluir Definitivamente?
                            </h3>
                        </div>
                        <p className='text-xs text-slate-400 leading-relaxed'>
                            Tem certeza que deseja apagar o projeto{" "}
                            <code className='font-mono text-red-300 font-bold'>
                                {projetoExclusaoId}
                            </code>
                            ? Essa ação removerá o registro do arquivo{" "}
                            <code>src/data/projetos.js</code> e não poderá ser
                            desfeita.
                        </p>
                        <div className='flex justify-end gap-3 pt-2'>
                            <button
                                type='button'
                                onClick={() => setProjetoExclusaoId(null)}
                                className='button-press px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-[background-color,color]'
                            >
                                Cancelar
                            </button>
                            <button
                                type='button'
                                onClick={() =>
                                    aoExcluirPermanente(projetoExclusaoId)
                                }
                                className='button-press px-4 py-2 text-xs font-semibold text-white rounded-xl bg-red-600 hover:bg-red-700 transition-[background-color,color]'
                            >
                                Sim, Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Vinculação Rápida de Imagem a um Projeto */}
            {modalVincularImagem && (
                <div className='fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80'>
                    <div
                        data-ui
                        className='bg-preto-fosco border border-white/15 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-slate-200 space-y-4'
                    >
                        <div className='flex items-center justify-between pb-3'>
                            <h3 className='text-sm font-bold text-white flex items-center gap-2'>
                                <ExternalLink className='w-4 h-4 text-[#d28bff]' />
                                Vincular Imagem a um Projeto
                            </h3>
                            <button
                                type='button'
                                onClick={() => setModalVincularImagem(null)}
                                className='button-press p-1 text-slate-400 hover:text-white'
                            >
                                <X className='w-4 h-4' />
                            </button>
                        </div>

                        <div className='flex items-center gap-3 p-2 bg-preto-escuro rounded-xl'>
                            <img
                                src={modalVincularImagem}
                                alt='Prévia'
                                className='w-14 h-14 object-cover rounded-lg'
                            />
                            <div className='flex-1 min-w-0'>
                                <code className='block text-xs font-mono text-[#d28bff] truncate'>
                                    {modalVincularImagem}
                                </code>
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <label className='block text-xs font-semibold text-slate-300'>
                                Escolha o projeto de destino:
                            </label>
                            <div className='max-h-56 overflow-y-auto space-y-1.5 pr-1'>
                                {projetos.map((proj) => (
                                    <div
                                        key={proj.id}
                                        className='p-2.5 rounded-xl bg-white/5 flex items-center justify-between gap-2'
                                    >
                                        <div className='min-w-0 flex-1'>
                                            <p className='text-xs font-bold text-white truncate'>
                                                {proj.titulo}
                                            </p>
                                            <code className='block text-[10px] font-mono text-slate-400 truncate'>
                                                {proj.id}
                                            </code>
                                        </div>
                                        <div className='flex gap-1'>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    confirmarVinculoImagem(
                                                        proj.id,
                                                        "capa",
                                                    )
                                                }
                                                className='button-press px-2 py-1 bg-roxo-escuro/60 hover:bg-roxo-principal border border-roxo-principal/40 text-white text-[11px] font-semibold rounded-lg transition-[background-color,color]'
                                            >
                                                Definir Capa
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    confirmarVinculoImagem(
                                                        proj.id,
                                                        "banner",
                                                    )
                                                }
                                                className='button-press px-2 py-1 bg-transparent hover:bg-white/10 border border-white/25 text-slate-200 text-[11px] font-semibold rounded-lg transition-[background-color,color]'
                                            >
                                                Banner
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    confirmarVinculoImagem(
                                                        proj.id,
                                                        "galeria",
                                                    )
                                                }
                                                className='button-press px-2 py-1 bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-semibold rounded-lg transition-[background-color,color]'
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
