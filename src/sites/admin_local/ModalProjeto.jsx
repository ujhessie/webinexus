import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
    X,
    Check,
    Image as IconeImagem,
    Plus,
    Trash2,
    Star,
    Link as IconeLink,
    Upload,
    Loader2,
    Search,
    Folder,
    ArrowLeft,
    ArrowRight,
    GripVertical,
    AlertCircle,
    FileText,
    Images,
    RectangleHorizontal,
} from "lucide-react";

// Categorias disponíveis no sistema
const LISTA_CATEGORIAS = [
    { id: "sites", rotulo: "Sites" },
    { id: "sistemas", rotulo: "Sistemas" },
    { id: "automacoes", rotulo: "Automações" },
    { id: "apis", rotulo: "APIs" },
    { id: "uiux", rotulo: "UI/UX" },
    { id: "identidade", rotulo: "Identidade Visual" },
    { id: "artes", rotulo: "Artes Digitais" },
    { id: "social", rotulo: "Social Media" },
];

const ABAS = [
    { id: "conteudo", rotulo: "Conteúdo", Icone: FileText },
    { id: "imagens", rotulo: "Imagens", Icone: Images },
    { id: "links", rotulo: "Links", Icone: IconeLink },
];

const CLASSE_INPUT =
    "w-full rounded-lg border border-white/10 bg-preto-escuro px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-roxo-principal transition-colors";

function gerarSlug(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function ehUrlValida(url) {
    return /^https?:\/\/.+\..+/i.test((url || "").trim());
}

// Mantém campos desconhecidos do projeto para não perder dados ao salvar
function criarEstadoInicial(projeto) {
    const base = projeto ? { ...projeto } : {};

    return {
        ...base,
        id: projeto?.id || "",
        titulo: projeto?.titulo || "",
        breveDescricao: projeto?.breveDescricao || "",
        descricao: projeto?.descricao || "",
        categorias: Array.isArray(projeto?.categorias)
            ? [...projeto.categorias]
            : [],
        tags: Array.isArray(projeto?.tags) ? [...projeto.tags] : [],
        destaque: Boolean(projeto?.destaque),
        status: projeto?.status || "visivel",
        imagens: {
            capa: projeto?.imagens?.capa || "",
            banner: projeto?.imagens?.banner || "",
            galeria: Array.isArray(projeto?.imagens?.galeria)
                ? [...projeto.imagens.galeria]
                : [],
        },
        links: Array.isArray(projeto?.links)
            ? projeto.links.map((link) => ({ ...link }))
            : [],
    };
}

const Campo = ({ rotulo, dica, obrigatorio, children }) => (
    <div className='space-y-1.5'>
        <label className='flex items-center gap-1 text-xs font-semibold text-slate-300'>
            {rotulo}
            {obrigatorio && <span className='text-red-400'>*</span>}
        </label>
        {children}
        {dica && <p className='text-[10px] text-slate-500'>{dica}</p>}
    </div>
);

export const ModalProjeto = ({
    projetoParaEditar,
    aoFechar,
    aoSalvar,
    imagensDisponiveis = [],
}) => {
    const ehNovo = !projetoParaEditar;

    const [dados, setDados] = useState(() =>
        criarEstadoInicial(projetoParaEditar),
    );
    const [snapshot, setSnapshot] = useState(() =>
        JSON.stringify(criarEstadoInicial(projetoParaEditar)),
    );
    const [abaAtiva, setAbaAtiva] = useState("conteudo");
    const [idTravado, setIdTravado] = useState(Boolean(projetoParaEditar));

    const [novaTag, setNovaTag] = useState("");
    const [seletorImagemAberto, setSeletorImagemAberto] = useState(null); // 'capa' | 'banner' | 'galeria'
    const [buscaImagem, setBuscaImagem] = useState("");
    const [pastaImagemFiltro, setPastaImagemFiltro] = useState("todas");

    const [erro, setErro] = useState("");
    const [enviandoImagem, setEnviandoImagem] = useState(false);
    const [arrastandoSobre, setArrastandoSobre] = useState(null); // 'capa' | 'banner' | 'galeria'
    const [pedirConfirmacao, setPedirConfirmacao] = useState(false);

    // Reordenação da galeria
    const [arrastandoGaleria, setArrastandoGaleria] = useState(null);
    const [sobreGaleria, setSobreGaleria] = useState(null);

    const inputArquivoCapa = useRef(null);
    const inputArquivoBanner = useRef(null);
    const inputArquivoGaleria = useRef(null);

    useEffect(() => {
        if (!projetoParaEditar) return;

        const inicial = criarEstadoInicial(projetoParaEditar);
        setDados(inicial);
        setSnapshot(JSON.stringify(inicial));
        setIdTravado(true);
        setAbaAtiva("conteudo");
        setErro("");
    }, [projetoParaEditar]);

    const sujo = JSON.stringify(dados) !== snapshot;

    /* ---------------------------------------------------------------- */
    /* Fechar com proteção contra perda de alterações                    */
    /* ---------------------------------------------------------------- */
    const tentarFechar = useCallback(() => {
        if (sujo) {
            setPedirConfirmacao(true);
            return;
        }
        aoFechar();
    }, [sujo, aoFechar]);

    useEffect(() => {
        const aoPressionarTecla = (evento) => {
            if (evento.key !== "Escape") return;

            if (seletorImagemAberto) {
                setSeletorImagemAberto(null);
                return;
            }
            if (pedirConfirmacao) {
                setPedirConfirmacao(false);
                return;
            }
            tentarFechar();
        };

        window.addEventListener("keydown", aoPressionarTecla);
        return () =>
            window.removeEventListener("keydown", aoPressionarTecla);
    }, [seletorImagemAberto, pedirConfirmacao, tentarFechar]);

    /* ---------------------------------------------------------------- */
    /* Atualizações de campos                                            */
    /* ---------------------------------------------------------------- */
    const atualizarCampo = (campo, valor) => {
        setDados((anterior) => {
            const atualizado = { ...anterior, [campo]: valor };

            // Sugere o slug automaticamente ao digitar o título (só em novo projeto)
            if (ehNovo && campo === "titulo" && !idTravado) {
                atualizado.id = gerarSlug(valor);
            }

            return atualizado;
        });
    };

    const alternarCategoria = (idCategoria) => {
        setDados((anterior) => {
            const existe = anterior.categorias.includes(idCategoria);
            const categorias = existe
                ? anterior.categorias.filter((cat) => cat !== idCategoria)
                : [...anterior.categorias, idCategoria];

            return { ...anterior, categorias };
        });
    };

    const adicionarTag = () => {
        const tagLimpa = novaTag.trim();
        if (!tagLimpa || dados.tags.includes(tagLimpa)) return;

        setDados((anterior) => ({
            ...anterior,
            tags: [...anterior.tags, tagLimpa],
        }));
        setNovaTag("");
    };

    const removerTag = (tagParaRemover) => {
        setDados((anterior) => ({
            ...anterior,
            tags: anterior.tags.filter((tag) => tag !== tagParaRemover),
        }));
    };

    /* ---------------------------------------------------------------- */
    /* Imagens                                                          */
    /* ---------------------------------------------------------------- */
    const atualizarImagem = useCallback((tipo, valor) => {
        setDados((anterior) => ({
            ...anterior,
            imagens: { ...anterior.imagens, [tipo]: valor },
        }));
    }, []);

    const adicionarImagemGaleria = useCallback((url = "") => {
        setDados((anterior) => ({
            ...anterior,
            imagens: {
                ...anterior.imagens,
                galeria: [...anterior.imagens.galeria, url],
            },
        }));
    }, []);

    const atualizarItemGaleria = (indice, valor) => {
        setDados((anterior) => {
            const novaGaleria = [...anterior.imagens.galeria];
            novaGaleria[indice] = valor;

            return {
                ...anterior,
                imagens: { ...anterior.imagens, galeria: novaGaleria },
            };
        });
    };

    const removerItemGaleria = (indice) => {
        setDados((anterior) => ({
            ...anterior,
            imagens: {
                ...anterior.imagens,
                galeria: anterior.imagens.galeria.filter(
                    (_, i) => i !== indice,
                ),
            },
        }));
    };

    const moverItemGaleria = (origem, destino) => {
        setDados((anterior) => {
            const total = anterior.imagens.galeria.length;
            if (
                origem === destino ||
                origem < 0 ||
                destino < 0 ||
                origem >= total ||
                destino >= total
            ) {
                return anterior;
            }

            const galeria = [...anterior.imagens.galeria];
            const [item] = galeria.splice(origem, 1);
            galeria.splice(destino, 0, item);

            return {
                ...anterior,
                imagens: { ...anterior.imagens, galeria },
            };
        });
    };

    const definirCapa = (url) => atualizarImagem("capa", url);
    const definirBanner = (url) => atualizarImagem("banner", url);

    /* Crises de drag-and-drop da galeria ----------------------------- */
    const iniciarArrasteGaleria = (evento, indice) => {
        // Não deixa arrastar quando o gesto começou num campo ou botão
        if (evento.target.closest("input, button")) {
            evento.preventDefault();
            return;
        }

        setArrastandoGaleria(indice);
        evento.dataTransfer.effectAllowed = "move";
        evento.dataTransfer.setData("text/plain", String(indice));
    };

    const sobreItemGaleria = (evento, indice) => {
        if (arrastandoGaleria === null) return;
        evento.preventDefault();
        evento.stopPropagation();
        setSobreGaleria(indice);
    };

    const soltarItemGaleria = (evento, indice) => {
        if (arrastandoGaleria === null) return;
        evento.preventDefault();
        evento.stopPropagation();

        moverItemGaleria(arrastandoGaleria, indice);
        setArrastandoGaleria(null);
        setSobreGaleria(null);
    };

    const finalizarArrasteGaleria = () => {
        setArrastandoGaleria(null);
        setSobreGaleria(null);
    };

    /* Upload de arquivos -------------------------------------------- */
    const enviarImagem = useCallback(
        async (arquivo, destino) => {
            const idProjeto = dados.id.trim();

            if (!idProjeto) {
                setAbaAtiva("conteudo");
                setErro(
                    "Defina o ID/Slug do projeto na aba Conteúdo antes de enviar imagens.",
                );
                return;
            }

            if (!arquivo || !arquivo.type.startsWith("image/")) {
                setErro(
                    "Selecione apenas arquivos de imagem (png, jpg, webp, svg...).",
                );
                return;
            }

            setEnviandoImagem(true);
            setErro("");

            try {
                const formData = new FormData();
                formData.append("idProjeto", idProjeto);
                formData.append("arquivo", arquivo);

                const resposta = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                });

                const resultado = await resposta.json();
                if (!resultado.sucesso) {
                    throw new Error(resultado.erro || "Falha no upload.");
                }

                if (destino === "capa") {
                    atualizarImagem("capa", resultado.url);
                } else if (destino === "banner") {
                    atualizarImagem("banner", resultado.url);
                } else {
                    adicionarImagemGaleria(resultado.url);
                }
            } catch (erroUpload) {
                setErro(`Erro no upload: ${erroUpload.message}`);
            } finally {
                setEnviandoImagem(false);
            }
        },
        [dados.id, atualizarImagem, adicionarImagemGaleria],
    );

    const tratarArquivos = useCallback(
        (arquivos, destino) => {
            if (!arquivos || arquivos.length === 0) return;

            if (destino === "galeria") {
                Array.from(arquivos).forEach((arquivo) =>
                    enviarImagem(arquivo, "galeria"),
                );
                return;
            }

            enviarImagem(arquivos[0], destino);
        },
        [enviarImagem],
    );

    /* Handlers de drag dos campos fixos (capa/banner/galeria) ------- */
    const tratarDragOver = useCallback(
        (evento, destino) => {
            if (arrastandoGaleria !== null) return;

            evento.preventDefault();
            evento.stopPropagation();
            setArrastandoSobre(destino);
        },
        [arrastandoGaleria],
    );

    const tratarDragLeave = useCallback((evento) => {
        evento.preventDefault();
        evento.stopPropagation();
        setArrastandoSobre(null);
    }, []);

    const tratarDrop = useCallback(
        (evento, destino) => {
            evento.preventDefault();
            evento.stopPropagation();
            setArrastandoSobre(null);

            if (arrastandoGaleria !== null) return;
            if (!evento.dataTransfer?.files?.length) return;

            tratarArquivos(evento.dataTransfer.files, destino);
        },
        [arrastandoGaleria, tratarArquivos],
    );

    /* ---------------------------------------------------------------- */
    /* Links                                                            */
    /* ---------------------------------------------------------------- */
    const adicionarLink = () => {
        setDados((anterior) => ({
            ...anterior,
            links: [
                ...anterior.links,
                {
                    texto: "Visitar projeto",
                    url: "https://",
                    principal: anterior.links.length === 0,
                },
            ],
        }));
    };

    const atualizarLink = (indice, campo, valor) => {
        setDados((anterior) => {
            const novosLinks = [...anterior.links];
            novosLinks[indice] = { ...novosLinks[indice], [campo]: valor };

            return { ...anterior, links: novosLinks };
        });
    };

    const definirLinkPrincipal = (indice) => {
        setDados((anterior) => ({
            ...anterior,
            links: anterior.links.map((link, i) => ({
                ...link,
                principal: i === indice,
            })),
        }));
    };

    const removerLink = (indice) => {
        setDados((anterior) => {
            const links = anterior.links.filter((_, i) => i !== indice);
            // Se o principal foi removido, promove o primeiro que sobrou
            if (links.length > 0 && !links.some((link) => link.principal)) {
                links[0] = { ...links[0], principal: true };
            }

            return { ...anterior, links };
        });
    };

    /* ---------------------------------------------------------------- */
    /* Salvar                                                           */
    /* ---------------------------------------------------------------- */
    const tratarSalvar = (evento) => {
        evento.preventDefault();

        if (!dados.titulo.trim()) {
            setAbaAtiva("conteudo");
            setErro("O título do projeto é obrigatório.");
            return;
        }

        if (!dados.id.trim()) {
            setAbaAtiva("conteudo");
            setErro("O identificador único (slug) é obrigatório.");
            return;
        }

        const linkInvalido = dados.links.find(
            (link) =>
                link.url.trim() &&
                link.url.trim() !== "https://" &&
                !ehUrlValida(link.url),
        );
        if (linkInvalido) {
            setAbaAtiva("links");
            setErro(
                `O link "${linkInvalido.texto || "sem nome"}" precisa de uma URL completa começando com https://`,
            );
            return;
        }

        setErro("");
        aoSalvar({
            ...dados,
            titulo: dados.titulo.trim(),
            id: dados.id.trim(),
        });
    };

    /* ---------------------------------------------------------------- */
    /* Seletor de imagens da pasta local                                */
    /* ---------------------------------------------------------------- */
    const pastasDisponiveis = useMemo(() => {
        const pastas = new Set(imagensDisponiveis.map((img) => img.pasta));
        return Array.from(pastas);
    }, [imagensDisponiveis]);

    const imagensFiltradas = useMemo(() => {
        const termo = buscaImagem.trim().toLowerCase();

        return imagensDisponiveis.filter((img) => {
            const bateTexto =
                !termo ||
                img.nome.toLowerCase().includes(termo) ||
                img.pasta.toLowerCase().includes(termo);
            const batePasta =
                pastaImagemFiltro === "todas" ||
                img.pasta === pastaImagemFiltro;

            return bateTexto && batePasta;
        });
    }, [imagensDisponiveis, buscaImagem, pastaImagemFiltro]);

    const imagemJaUsada = (url) =>
        url === dados.imagens.capa ||
        url === dados.imagens.banner ||
        dados.imagens.galeria.includes(url);

    const selecionarImagemDoDisco = (url) => {
        if (seletorImagemAberto === "capa") {
            atualizarImagem("capa", url);
        } else if (seletorImagemAberto === "banner") {
            atualizarImagem("banner", url);
        } else if (seletorImagemAberto === "galeria") {
            adicionarImagemGaleria(url);
        }

        setSeletorImagemAberto(null);
        setBuscaImagem("");
        setPastaImagemFiltro("todas");
    };

    /* ---------------------------------------------------------------- */
    /* Render                                                           */
    /* ---------------------------------------------------------------- */
    const renderizarImagemFixa = ({
        tipo,
        titulo,
        descricao,
        url,
        aoEscolher,
        inputRef,
    }) => (
        <div className='space-y-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3'>
            <div className='flex items-start justify-between gap-2'>
                <div className='min-w-0'>
                    <p className='text-xs font-semibold text-slate-200'>
                        {titulo}
                    </p>
                    <p className='text-[10px] text-slate-500'>{descricao}</p>
                </div>
                {url && (
                    <button
                        type='button'
                        onClick={() => atualizarImagem(tipo, "")}
                        className='shrink-0 rounded p-1 text-slate-500 hover:text-red-400 transition-colors'
                        title={`Remover ${titulo.toLowerCase()}`}
                    >
                        <Trash2 className='w-3.5 h-3.5' />
                    </button>
                )}
            </div>

            <div
                onDragOver={(e) => tratarDragOver(e, tipo)}
                onDragLeave={tratarDragLeave}
                onDrop={(e) => tratarDrop(e, tipo)}
                onClick={() => !url && inputRef.current?.click()}
                className={`relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-dashed bg-preto-escuro transition-colors ${
                    arrastandoSobre === tipo
                        ? "border-roxo-principal bg-roxo-principal/10"
                        : "border-white/10"
                } ${!url ? "cursor-pointer" : ""}`}
            >
                {url ? (
                    <img
                        src={url}
                        alt={titulo}
                        className='h-full w-full object-cover'
                        onError={(e) => {
                            e.target.style.display = "none";
                        }}
                    />
                ) : (
                    <div className='flex flex-col items-center gap-1 text-slate-600'>
                        <IconeImagem className='w-6 h-6' />
                        <span className='text-[10px]'>
                            Arraste ou clique para enviar
                        </span>
                    </div>
                )}
            </div>

            <input
                type='text'
                value={url}
                onChange={(e) => atualizarImagem(tipo, e.target.value)}
                placeholder='/imagens_projetos/... ou https://...'
                className='w-full rounded-lg border border-white/10 bg-preto-escuro px-2.5 py-1.5 font-mono text-[10px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-roxo-principal transition-colors'
            />

            <div className='flex items-center gap-1.5'>
                <button
                    type='button'
                    onClick={() => inputRef.current?.click()}
                    disabled={enviandoImagem}
                    className='button-press flex flex-1 items-center justify-center gap-1 rounded-lg bg-white/5 px-2 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50'
                >
                    <Upload className='w-3 h-3' /> Enviar
                </button>
                <button
                    type='button'
                    onClick={aoEscolher}
                    className='button-press flex flex-1 items-center justify-center gap-1 rounded-lg bg-white/5 px-2 py-1.5 text-[11px] font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors'
                >
                    <Folder className='w-3 h-3' /> Da pasta
                </button>
            </div>
        </div>
    );

    return (
        <div className='fixed inset-0 z-100000 flex items-center justify-center overflow-y-auto bg-black/80 p-3 sm:p-4'>
            <div
                data-ui
                role='dialog'
                aria-modal='true'
                aria-labelledby='titulo-modal-projeto'
                className='relative my-auto flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-preto-fosco text-slate-200 shadow-2xl sm:min-h-[560px]'
            >
                {/* Cabeçalho */}
                <div className='flex items-start justify-between gap-4 bg-[#191b30] px-5 py-4'>
                    <div className='min-w-0'>
                        <p className='text-[10px] font-semibold uppercase tracking-wider text-[#d28bff]'>
                            Portfólio
                        </p>
                        <p
                            id='titulo-modal-projeto'
                            className='truncate font-titulo text-lg font-bold leading-tight text-white'
                        >
                            {ehNovo
                                ? "Novo projeto"
                                : dados.titulo || "Editar projeto"}
                        </p>
                        <p className='truncate text-[11px] text-slate-400'>
                            {ehNovo
                                ? "O projeto entra no topo do arquivo ao salvar."
                                : `Editando #${dados.id}`}
                        </p>
                    </div>

                    <button
                        type='button'
                        onClick={tentarFechar}
                        className='button-press shrink-0 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors'
                        title='Fechar (Esc)'
                    >
                        <X className='w-5 h-5' />
                    </button>
                </div>

                {/* Abas */}
                <div className='flex items-center gap-1 overflow-x-auto border-b border-white/[0.06] bg-[#191b30] px-3 sm:px-5'>
                    {ABAS.map(({ id, rotulo, Icone }) => {
                        const ativa = abaAtiva === id;
                        const contador =
                            id === "imagens"
                                ? dados.imagens.galeria.length
                                : id === "links"
                                  ? dados.links.length
                                  : 0;

                        return (
                            <button
                                key={id}
                                type='button'
                                onClick={() => setAbaAtiva(id)}
                                aria-current={ativa ? "page" : undefined}
                                className={`button-press -mb-px flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors ${
                                    ativa
                                        ? "border-roxo-principal text-white"
                                        : "border-transparent text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                <Icone
                                    className={`w-3.5 h-3.5 ${ativa ? "text-[#d28bff]" : ""}`}
                                />
                                {rotulo}
                                {contador > 0 && (
                                    <span className='rounded bg-white/10 px-1.5 text-[10px] tabular text-slate-300'>
                                        {contador}
                                    </span>
                                )}
                                {id === "conteudo" && dados.destaque && (
                                    <Star className='w-3 h-3 fill-amber-400 text-amber-400' />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Formulário */}
                <form
                    onSubmit={tratarSalvar}
                    className='flex min-h-0 flex-1 flex-col'
                >
                    <div className='flex-1 space-y-5 overflow-y-auto px-5 py-5'>
                        {erro && (
                            <div className='flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-[11px] text-red-200'>
                                <AlertCircle className='mt-0.5 h-3.5 w-3.5 shrink-0' />
                                <span>{erro}</span>
                            </div>
                        )}

                        {/* -------------------- ABA CONTEÚDO -------------------- */}
                        {abaAtiva === "conteudo" && (
                            <div className='max-w-3xl space-y-5'>
                                {/* Publicação */}
                                <section className='rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5 space-y-2.5'>
                                    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                                        <div>
                                            <p className='text-xs font-semibold text-slate-200'>
                                                Publicação
                                            </p>
                                            <p className='text-[10px] text-slate-500'>
                                                Define se o projeto aparece no
                                                portfólio.
                                            </p>
                                        </div>

                                        <div className='flex flex-wrap items-center gap-2'>
                                            <select
                                                value={dados.status}
                                                onChange={(e) =>
                                                    atualizarCampo(
                                                        "status",
                                                        e.target.value,
                                                    )
                                                }
                                                aria-label='Status do projeto'
                                                className='rounded-lg border border-white/10 bg-preto-escuro px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-roxo-principal transition-colors'
                                            >
                                                <option value='visivel'>
                                                    Visível
                                                </option>
                                                <option value='lixeira'>
                                                    Na lixeira
                                                </option>
                                            </select>

                                            <button
                                                type='button'
                                                onClick={() =>
                                                    atualizarCampo(
                                                        "destaque",
                                                        !dados.destaque,
                                                    )
                                                }
                                                aria-pressed={dados.destaque}
                                                className={`button-press flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                                                    dados.destaque
                                                        ? "border-amber-400/60 bg-amber-500/15 text-amber-200"
                                                        : "border-white/10 bg-preto-escuro text-slate-400 hover:text-white"
                                                }`}
                                            >
                                                <Star
                                                    className={`w-3.5 h-3.5 ${
                                                        dados.destaque
                                                            ? "fill-amber-400 text-amber-400"
                                                            : ""
                                                    }`}
                                                />
                                                {dados.destaque
                                                    ? "Em destaque"
                                                    : "Destacar"}
                                            </button>
                                        </div>
                                    </div>

                                    <p className='flex items-start gap-1.5 border-t border-white/[0.06] pt-2.5 text-[10px] text-slate-500'>
                                        <Star className='mt-px h-3 w-3 shrink-0 text-amber-400' />
                                        Projetos em destaque aparecem primeiro
                                        na galeria da Web iNexus e do Ujhessie.
                                    </p>
                                </section>

                                {/* Título e slug */}
                                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                                    <Campo
                                        rotulo='Título do projeto'
                                        obrigatorio
                                    >
                                        <input
                                            type='text'
                                            value={dados.titulo}
                                            onChange={(e) =>
                                                atualizarCampo(
                                                    "titulo",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder='Ex: Loja Virtual Multitech'
                                            className={CLASSE_INPUT}
                                        />
                                    </Campo>

                                    <Campo
                                        rotulo='ID / slug'
                                        dica='Usado na URL do projeto. Evite mudar depois de publicado.'
                                    >
                                        <input
                                            type='text'
                                            value={dados.id}
                                            onChange={(e) => {
                                                setIdTravado(true);
                                                atualizarCampo(
                                                    "id",
                                                    gerarSlug(e.target.value),
                                                );
                                            }}
                                            placeholder='loja-virtual-multitech'
                                            className={`${CLASSE_INPUT} font-mono text-[#e3c3ff]`}
                                        />
                                    </Campo>
                                </div>

                                <Campo
                                    rotulo='Breve descrição'
                                    dica='Uma frase curta. Aparece no card do portfólio.'
                                >
                                    <input
                                        type='text'
                                        value={dados.breveDescricao}
                                        onChange={(e) =>
                                            atualizarCampo(
                                                "breveDescricao",
                                                e.target.value,
                                            )
                                        }
                                        placeholder='Ex: E-commerce completo com painel administrativo e pagamentos.'
                                        className={CLASSE_INPUT}
                                    />
                                </Campo>

                                <Campo
                                    rotulo='Descrição detalhada'
                                    dica='Texto completo da página do projeto.'
                                >
                                    <textarea
                                        rows={6}
                                        value={dados.descricao}
                                        onChange={(e) =>
                                            atualizarCampo(
                                                "descricao",
                                                e.target.value,
                                            )
                                        }
                                        placeholder='Conte as soluções, tecnologias e diferenciais do projeto...'
                                        className={`${CLASSE_INPUT} resize-y leading-relaxed`}
                                    />
                                </Campo>

                                {/* Categorias */}
                                <Campo
                                    rotulo='Categorias'
                                    dica='Controlam em quais filtros do portfólio o projeto aparece.'
                                >
                                    <div className='flex flex-wrap gap-2'>
                                        {LISTA_CATEGORIAS.map((cat) => {
                                            const selecionada =
                                                dados.categorias.includes(
                                                    cat.id,
                                                );

                                            return (
                                                <button
                                                    type='button'
                                                    key={cat.id}
                                                    onClick={() =>
                                                        alternarCategoria(
                                                            cat.id,
                                                        )
                                                    }
                                                    aria-pressed={selecionada}
                                                    className={`button-press flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                                                        selecionada
                                                            ? "border-roxo-principal bg-roxo-principal/20 text-white"
                                                            : "border-white/10 bg-preto-escuro text-slate-400 hover:border-white/20 hover:text-white"
                                                    }`}
                                                >
                                                    {selecionada && (
                                                        <Check className='w-3 h-3 text-[#d28bff]' />
                                                    )}
                                                    {cat.rotulo}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </Campo>

                                {/* Tags */}
                                <Campo rotulo='Tags e tecnologias'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type='text'
                                            value={novaTag}
                                            onChange={(e) =>
                                                setNovaTag(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    adicionarTag();
                                                }
                                            }}
                                            placeholder='Digite e pressione Enter (ex: React)'
                                            className={CLASSE_INPUT}
                                        />
                                        <button
                                            type='button'
                                            onClick={adicionarTag}
                                            className='button-press shrink-0 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors'
                                        >
                                            Adicionar
                                        </button>
                                    </div>

                                    {dados.tags.length > 0 && (
                                        <div className='flex flex-wrap gap-1.5 pt-1'>
                                            {dados.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className='flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300'
                                                >
                                                    {tag}
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            removerTag(tag)
                                                        }
                                                        className='text-slate-500 hover:text-red-400 transition-colors'
                                                        title={`Remover ${tag}`}
                                                    >
                                                        <X className='w-3 h-3' />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </Campo>
                            </div>
                        )}

                        {/* -------------------- ABA IMAGENS -------------------- */}
                        {abaAtiva === "imagens" && (
                            <div className='space-y-5'>
                                <div className='flex items-start justify-between gap-3'>
                                    <p className='text-[11px] text-slate-500'>
                                        Capa e banner aparecem no card e no topo
                                        da página. A galeria alimenta a página
                                        do projeto.
                                    </p>
                                    {enviandoImagem && (
                                        <span className='flex shrink-0 items-center gap-1.5 text-[11px] text-[#d28bff]'>
                                            <Loader2 className='w-3.5 h-3.5 animate-spin' />
                                            Enviando...
                                        </span>
                                    )}
                                </div>

                                {/* Inputs ocultos */}
                                <input
                                    ref={inputArquivoCapa}
                                    type='file'
                                    accept='image/*'
                                    className='hidden'
                                    onChange={(e) => {
                                        tratarArquivos(e.target.files, "capa");
                                        e.target.value = "";
                                    }}
                                />
                                <input
                                    ref={inputArquivoBanner}
                                    type='file'
                                    accept='image/*'
                                    className='hidden'
                                    onChange={(e) => {
                                        tratarArquivos(
                                            e.target.files,
                                            "banner",
                                        );
                                        e.target.value = "";
                                    }}
                                />
                                <input
                                    ref={inputArquivoGaleria}
                                    type='file'
                                    accept='image/*'
                                    multiple
                                    className='hidden'
                                    onChange={(e) => {
                                        tratarArquivos(
                                            e.target.files,
                                            "galeria",
                                        );
                                        e.target.value = "";
                                    }}
                                />

                                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                                    {renderizarImagemFixa({
                                        tipo: "capa",
                                        titulo: "Capa",
                                        descricao:
                                            "Imagem principal do card no portfólio.",
                                        url: dados.imagens.capa,
                                        inputRef: inputArquivoCapa,
                                        aoEscolher: () =>
                                            setSeletorImagemAberto("capa"),
                                    })}
                                    {renderizarImagemFixa({
                                        tipo: "banner",
                                        titulo: "Banner (opcional)",
                                        descricao:
                                            "Imagem de fundo no topo da página do projeto.",
                                        url: dados.imagens.banner,
                                        inputRef: inputArquivoBanner,
                                        aoEscolher: () =>
                                            setSeletorImagemAberto("banner"),
                                    })}
                                </div>

                                {/* Galeria */}
                                <section
                                    onDragOver={(e) =>
                                        tratarDragOver(e, "galeria")
                                    }
                                    onDragLeave={tratarDragLeave}
                                    onDrop={(e) => tratarDrop(e, "galeria")}
                                    className={`space-y-3 rounded-xl border border-dashed p-3 transition-colors ${
                                        arrastandoSobre === "galeria"
                                            ? "border-roxo-principal bg-roxo-principal/5"
                                            : "border-white/10 bg-white/[0.02]"
                                    }`}
                                >
                                    <div className='flex flex-wrap items-start justify-between gap-2'>
                                        <div>
                                            <p className='flex items-center gap-1.5 text-xs font-semibold text-slate-200'>
                                                <Images className='w-3.5 h-3.5 text-[#d28bff]' />
                                                Galeria
                                                <span className='rounded bg-white/10 px-1.5 text-[10px] tabular text-slate-300'>
                                                    {
                                                        dados.imagens.galeria
                                                            .length
                                                    }
                                                </span>
                                            </p>
                                            <p className='text-[10px] text-slate-500'>
                                                Arraste as imagens para
                                                reordenar. A ordem vale na
                                                página do projeto.
                                            </p>
                                        </div>

                                        <div className='flex flex-wrap items-center gap-1.5'>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    inputArquivoGaleria.current?.click()
                                                }
                                                disabled={enviandoImagem}
                                                className='button-press flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-slate-200 hover:bg-white/10 transition-colors disabled:opacity-50'
                                            >
                                                <Upload className='w-3 h-3' />
                                                Enviar imagens
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    setSeletorImagemAberto(
                                                        "galeria",
                                                    )
                                                }
                                                className='button-press flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-slate-200 hover:bg-white/10 transition-colors'
                                            >
                                                <Folder className='w-3 h-3' />
                                                Da pasta
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    adicionarImagemGaleria("")
                                                }
                                                className='button-press flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-slate-200 hover:bg-white/10 transition-colors'
                                            >
                                                <Plus className='w-3 h-3' />
                                                URL
                                            </button>
                                        </div>
                                    </div>

                                    {dados.imagens.galeria.length === 0 ? (
                                        <div className='flex flex-col items-center justify-center gap-1.5 rounded-lg border border-white/[0.06] bg-preto-escuro py-10 text-center text-slate-600'>
                                            <IconeImagem className='w-6 h-6' />
                                            <p className='text-[11px]'>
                                                Nenhuma imagem na galeria
                                                ainda.
                                            </p>
                                            <p className='text-[10px] text-slate-600'>
                                                Arraste arquivos aqui ou use os
                                                botões acima.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className='grid grid-cols-2 gap-2.5 sm:grid-cols-3'>
                                            {dados.imagens.galeria.map(
                                                (url, indice) => {
                                                    const arrastando =
                                                        arrastandoGaleria ===
                                                        indice;
                                                    const alvo =
                                                        sobreGaleria ===
                                                            indice &&
                                                        arrastandoGaleria !==
                                                            null &&
                                                        arrastandoGaleria !==
                                                            indice;

                                                    return (
                                                        <div
                                                            key={indice}
                                                            draggable
                                                            onDragStart={(e) =>
                                                                iniciarArrasteGaleria(
                                                                    e,
                                                                    indice,
                                                                )
                                                            }
                                                            onDragOver={(e) =>
                                                                sobreItemGaleria(
                                                                    e,
                                                                    indice,
                                                                )
                                                            }
                                                            onDragLeave={() =>
                                                                setSobreGaleria(
                                                                    null,
                                                                )
                                                            }
                                                            onDrop={(e) =>
                                                                soltarItemGaleria(
                                                                    e,
                                                                    indice,
                                                                )
                                                            }
                                                            onDragEnd={
                                                                finalizarArrasteGaleria
                                                            }
                                                            className={`group flex flex-col overflow-hidden rounded-lg border bg-preto-escuro transition-[border-color,opacity] ${
                                                                alvo
                                                                    ? "border-roxo-principal opacity-100"
                                                                    : "border-white/10"
                                                            } ${arrastando ? "opacity-40" : ""}`}
                                                        >
                                                            <div className='relative aspect-[4/3] bg-black/40'>
                                                                <img
                                                                    src={url}
                                                                    alt={`Imagem ${indice + 1} da galeria`}
                                                                    className='pointer-events-none h-full w-full object-cover'
                                                                    onError={(
                                                                        e,
                                                                    ) => {
                                                                        e.target.style.display =
                                                                            "none";
                                                                    }}
                                                                />

                                                                <span className='absolute left-1.5 top-1.5 grid h-5 w-5 place-items-center rounded bg-black/70 text-[10px] font-semibold text-slate-200 tabular'>
                                                                    {indice +
                                                                        1}
                                                                </span>

                                                                <span
                                                                    className='absolute right-1.5 top-1.5 flex h-5 w-5 cursor-grab items-center justify-center rounded bg-black/70 text-slate-300'
                                                                    title='Arraste para reordenar'
                                                                >
                                                                    <GripVertical className='w-3 h-3' />
                                                                </span>
                                                            </div>

                                                            <div className='space-y-1.5 p-1.5'>
                                                                <input
                                                                    type='text'
                                                                    value={url}
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        atualizarItemGaleria(
                                                                            indice,
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder='/imagens_projetos/...'
                                                                    className='w-full rounded border border-white/10 bg-white/[0.03] px-1.5 py-1 font-mono text-[10px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-roxo-principal transition-colors'
                                                                />

                                                                <div className='flex items-center justify-between gap-1'>
                                                                    <div className='flex items-center gap-0.5'>
                                                                        <button
                                                                            type='button'
                                                                            onClick={() =>
                                                                                moverItemGaleria(
                                                                                    indice,
                                                                                    indice -
                                                                                        1,
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                indice ===
                                                                                0
                                                                            }
                                                                            className='button-press rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent'
                                                                            title='Mover para a esquerda'
                                                                        >
                                                                            <ArrowLeft className='w-3.5 h-3.5' />
                                                                        </button>
                                                                        <button
                                                                            type='button'
                                                                            onClick={() =>
                                                                                moverItemGaleria(
                                                                                    indice,
                                                                                    indice +
                                                                                        1,
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                indice ===
                                                                                dados
                                                                                    .imagens
                                                                                    .galeria
                                                                                    .length -
                                                                                    1
                                                                            }
                                                                            className='button-press rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent'
                                                                            title='Mover para a direita'
                                                                        >
                                                                            <ArrowRight className='w-3.5 h-3.5' />
                                                                        </button>
                                                                    </div>

                                                                    <div className='flex items-center gap-0.5'>
                                                                        <button
                                                                            type='button'
                                                                            onClick={() =>
                                                                                definirCapa(
                                                                                    url,
                                                                                )
                                                                            }
                                                                            className='button-press rounded p-1 text-slate-400 hover:bg-white/10 hover:text-[#d28bff] transition-colors'
                                                                            title='Usar como capa'
                                                                        >
                                                                            <IconeImagem className='w-3.5 h-3.5' />
                                                                        </button>
                                                                        <button
                                                                            type='button'
                                                                            onClick={() =>
                                                                                definirBanner(
                                                                                    url,
                                                                                )
                                                                            }
                                                                            className='button-press rounded p-1 text-slate-400 hover:bg-white/10 hover:text-[#d28bff] transition-colors'
                                                                            title='Usar como banner'
                                                                        >
                                                                            <RectangleHorizontal className='w-3.5 h-3.5' />
                                                                        </button>
                                                                        <button
                                                                            type='button'
                                                                            onClick={() =>
                                                                                removerItemGaleria(
                                                                                    indice,
                                                                                )
                                                                            }
                                                                            className='button-press rounded p-1 text-slate-400 hover:bg-red-500/15 hover:text-red-300 transition-colors'
                                                                            title='Remover imagem'
                                                                        >
                                                                            <Trash2 className='w-3.5 h-3.5' />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    )}
                                </section>
                            </div>
                        )}

                        {/* -------------------- ABA LINKS -------------------- */}
                        {abaAtiva === "links" && (
                            <div className='max-w-3xl space-y-4'>
                                <div className='flex flex-wrap items-start justify-between gap-3'>
                                    <div>
                                        <p className='flex items-center gap-1.5 text-xs font-semibold text-slate-200'>
                                            <IconeLink className='w-3.5 h-3.5 text-[#d28bff]' />
                                            Links do projeto
                                        </p>
                                        <p className='text-[11px] text-slate-500'>
                                            O link principal é o que libera o
                                            selo “Ver ao vivo” no card público.
                                        </p>
                                    </div>

                                    <button
                                        type='button'
                                        onClick={adicionarLink}
                                        className='button-press flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors'
                                    >
                                        <Plus className='w-3.5 h-3.5' />
                                        Adicionar link
                                    </button>
                                </div>

                                {dados.links.length === 0 ? (
                                    <div className='flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/10 bg-white/[0.02] py-10 text-center text-slate-600'>
                                        <IconeLink className='w-6 h-6' />
                                        <p className='text-[11px]'>
                                            Nenhum link cadastrado.
                                        </p>
                                        <p className='text-[10px] text-slate-600'>
                                            Sem link principal, o projeto não
                                            ganha o selo “Ver ao vivo”.
                                        </p>
                                    </div>
                                ) : (
                                    <div className='space-y-2.5'>
                                        {dados.links.map((link, indice) => {
                                            const urlInvalida =
                                                link.url.trim() &&
                                                link.url.trim() !== "https://" &&
                                                !ehUrlValida(link.url);

                                            return (
                                                <div
                                                    key={indice}
                                                    className='space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3'
                                                >
                                                    <div className='flex items-center justify-between gap-2'>
                                                        <label className='flex cursor-pointer items-center gap-2 text-[11px] font-semibold text-slate-300'>
                                                            <input
                                                                type='radio'
                                                                name='linkPrincipal'
                                                                checked={Boolean(
                                                                    link.principal,
                                                                )}
                                                                onChange={() =>
                                                                    definirLinkPrincipal(
                                                                        indice,
                                                                    )
                                                                }
                                                                className='accent-[#b72ffe]'
                                                            />
                                                            Link principal
                                                        </label>

                                                        <button
                                                            type='button'
                                                            onClick={() =>
                                                                removerLink(
                                                                    indice,
                                                                )
                                                            }
                                                            className='button-press rounded p-1 text-slate-500 hover:text-red-400 transition-colors'
                                                            title='Remover link'
                                                        >
                                                            <Trash2 className='w-3.5 h-3.5' />
                                                        </button>
                                                    </div>

                                                    <div className='grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1.6fr]'>
                                                        <input
                                                            type='text'
                                                            value={
                                                                link.texto
                                                            }
                                                            onChange={(e) =>
                                                                atualizarLink(
                                                                    indice,
                                                                    "texto",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder='Texto do botão (ex: Visitar site)'
                                                            className={CLASSE_INPUT}
                                                        />
                                                        <input
                                                            type='url'
                                                            value={link.url}
                                                            onChange={(e) =>
                                                                atualizarLink(
                                                                    indice,
                                                                    "url",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder='https://...'
                                                            className={`${CLASSE_INPUT} font-mono ${
                                                                urlInvalida
                                                                    ? "border-red-500/60"
                                                                    : ""
                                                            }`}
                                                        />
                                                    </div>

                                                    {urlInvalida && (
                                                        <p className='text-[10px] text-red-300'>
                                                            Use uma URL completa,
                                                            começando com
                                                            https://
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Rodapé fixo */}
                    <div className='flex items-center justify-between gap-3 border-t border-white/[0.06] bg-[#191b30] px-5 py-3'>
                        <span className='hidden text-[11px] text-slate-500 sm:block'>
                            {sujo
                                ? "Alterações ainda não salvas"
                                : "Tudo salvo no arquivo"}
                        </span>

                        <div className='ml-auto flex w-full items-center gap-2 sm:w-auto'>
                            <button
                                type='button'
                                onClick={tentarFechar}
                                className='button-press flex shrink-0 items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10 transition-colors'
                            >
                                Cancelar
                            </button>
                            <button
                                type='submit'
                                disabled={enviandoImagem}
                                title={
                                    enviandoImagem
                                        ? "Aguarde o upload terminar"
                                        : "Salvar projeto"
                                }
                                className='button-press grad-btn sombra-btn flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold text-white transition-[transform,opacity] disabled:opacity-50 sm:flex-none'
                            >
                                <Check className='w-4 h-4' />
                                {ehNovo
                                    ? "Cadastrar projeto"
                                    : "Salvar alterações"}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Confirmação de descarte */}
                {pedirConfirmacao && (
                    <div className='absolute inset-0 z-20 flex items-center justify-center bg-black/75 p-4'>
                        <div
                            data-ui
                            className='w-full max-w-sm space-y-3 rounded-xl border border-white/10 bg-preto-fosco p-5 shadow-2xl'
                        >
                            <p className='text-sm font-bold text-white'>
                                Descartar alterações?
                            </p>
                            <p className='text-[11px] leading-relaxed text-slate-400'>
                                Você alterou{" "}
                                {ehNovo
                                    ? "o novo projeto"
                                    : `o projeto ${dados.titulo || dados.id}`}{" "}
                                e ainda não salvou. Se fechar agora, essas
                                mudanças se perdem.
                            </p>
                            <div className='flex justify-end gap-2 pt-1'>
                                <button
                                    type='button'
                                    onClick={() =>
                                        setPedirConfirmacao(false)
                                    }
                                    className='button-press rounded-lg bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors'
                                >
                                    Continuar editando
                                </button>
                                <button
                                    type='button'
                                    onClick={aoFechar}
                                    className='button-press rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors'
                                >
                                    Descartar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Seletor de imagem da pasta local */}
            {seletorImagemAberto && (
                <div className='fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4'>
                    <div
                        data-ui
                        className='flex max-h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/10 bg-preto-fosco shadow-2xl'
                    >
                        <div className='flex items-start justify-between gap-3 bg-[#1e2038] px-5 py-3'>
                            <div>
                                <h3 className='text-sm font-bold text-white'>
                                    Escolher imagem para{" "}
                                    <span className='uppercase text-[#d28bff]'>
                                        {seletorImagemAberto}
                                    </span>
                                </h3>
                                <p className='text-[11px] text-slate-400'>
                                    Arquivos em{" "}
                                    <code className='font-mono'>
                                        public/imagens_projetos
                                    </code>
                                </p>
                            </div>
                            <button
                                type='button'
                                onClick={() => setSeletorImagemAberto(null)}
                                className='button-press rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors'
                            >
                                <X className='w-4 h-4' />
                            </button>
                        </div>

                        <div className='flex flex-col gap-2 border-b border-white/[0.06] px-4 py-3 sm:flex-row'>
                            <div className='relative flex-1'>
                                <Search className='absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500' />
                                <input
                                    type='text'
                                    value={buscaImagem}
                                    onChange={(e) =>
                                        setBuscaImagem(e.target.value)
                                    }
                                    placeholder='Buscar por nome ou pasta...'
                                    className='w-full rounded-lg border border-white/10 bg-preto-escuro py-2 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-roxo-principal transition-colors'
                                />
                            </div>

                            <select
                                value={pastaImagemFiltro}
                                onChange={(e) =>
                                    setPastaImagemFiltro(e.target.value)
                                }
                                aria-label='Filtrar por pasta'
                                className='rounded-lg border border-white/10 bg-preto-escuro px-2.5 py-2 text-xs text-white focus:outline-none focus:border-roxo-principal transition-colors'
                            >
                                <option value='todas'>Todas as pastas</option>
                                {pastasDisponiveis.map((pasta) => (
                                    <option key={pasta} value={pasta}>
                                        {pasta}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='grid flex-1 grid-cols-2 gap-2.5 overflow-y-auto p-4 sm:grid-cols-3'>
                            {imagensFiltradas.length === 0 ? (
                                <p className='col-span-full py-10 text-center text-xs text-slate-400'>
                                    Nenhuma imagem encontrada com esses
                                    filtros.
                                </p>
                            ) : (
                                imagensFiltradas.map((img) => {
                                    const jaUsada = imagemJaUsada(img.url);

                                    return (
                                        <button
                                            key={img.url}
                                            type='button'
                                            onClick={() =>
                                                selecionarImagemDoDisco(
                                                    img.url,
                                                )
                                            }
                                            className='group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-preto-escuro text-left transition-colors hover:border-roxo-principal/60'
                                        >
                                            <div className='relative h-24 w-full overflow-hidden bg-black/50'>
                                                <img
                                                    src={img.url}
                                                    alt={img.nome}
                                                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                                                    onError={(e) => {
                                                        e.target.style.display =
                                                            "none";
                                                    }}
                                                />
                                                {jaUsada && (
                                                    <span className='absolute left-1.5 top-1.5 rounded bg-emerald-500/90 px-1.5 py-0.5 text-[9px] font-bold text-white'>
                                                        Já no projeto
                                                    </span>
                                                )}
                                            </div>
                                            <div className='w-full p-2'>
                                                <p className='truncate text-[11px] font-semibold text-white'>
                                                    {img.nome}
                                                </p>
                                                <p className='flex items-center gap-1 truncate text-[10px] text-slate-500'>
                                                    <Folder className='h-2.5 w-2.5 shrink-0' />
                                                    {img.pasta !== "raiz"
                                                        ? img.pasta
                                                        : "raiz"}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        <div className='flex justify-end bg-[#1e2038] px-4 py-2.5'>
                            <button
                                type='button'
                                onClick={() => setSeletorImagemAberto(null)}
                                className='button-press rounded-lg bg-white/10 px-4 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/15 transition-colors'
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
