import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Check, Image as IconeImagem, Plus, Trash2, Star, Link as IconeLink, Upload, Loader2 } from "lucide-react";

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

function gerarSlug(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export const ModalProjeto = ({
    projetoParaEditar,
    aoFechar,
    aoSalvar,
    imagensDisponiveis = [],
}) => {
    const ehNovo = !projetoParaEditar;

    const [dados, setDados] = useState({
        id: "",
        titulo: "",
        breveDescricao: "",
        descricao: "",
        categorias: [],
        tags: [],
        destaque: false,
        status: "visivel",
        imagens: {
            capa: "",
            banner: "",
            galeria: [],
        },
        links: [],
    });

    const [novaTag, setNovaTag] = useState("");
    const [seletorImagemAberto, setSeletorImagemAberto] = useState(null); // 'capa' | 'banner' | 'galeria'
    const [erro, setErro] = useState("");
    const [enviandoImagem, setEnviandoImagem] = useState(false);
    const [arrastandoSobre, setArrastandoSobre] = useState(null); // 'capa' | 'banner' | 'galeria' | null

    const inputArquivoCapa = useRef(null);
    const inputArquivoBanner = useRef(null);
    const inputArquivoGaleria = useRef(null);

    // Envia arquivo para o endpoint local do Vite
    const enviarImagem = useCallback(async (arquivo, destino) => {
        const idProjeto = dados.id.trim();
        if (!idProjeto) {
            setErro("Preencha o ID/Slug do projeto antes de enviar imagens.");
            return;
        }

        if (!arquivo || !arquivo.type.startsWith("image/")) {
            setErro("Selecione apenas arquivos de imagem (png, jpg, webp, svg...).");
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

            // Atualizar o campo correto com a URL retornada
            if (destino === "capa") {
                atualizarImagem("capa", resultado.url);
            } else if (destino === "banner") {
                atualizarImagem("banner", resultado.url);
            } else if (destino === "galeria") {
                adicionarImagemGaleria(resultado.url);
            }
        } catch (erroUpload) {
            setErro(`Erro no upload: ${erroUpload.message}`);
        } finally {
            setEnviandoImagem(false);
        }
    }, [dados.id]);

    // Processar arquivos vindos do input ou do drop
    const tratarArquivos = useCallback((arquivos, destino) => {
        if (!arquivos || arquivos.length === 0) return;

        if (destino === "galeria") {
            // Galeria aceita múltiplos
            Array.from(arquivos).forEach((arq) => enviarImagem(arq, "galeria"));
        } else {
            // Capa e Banner aceitam apenas 1
            enviarImagem(arquivos[0], destino);
        }
    }, [enviarImagem]);

    // Handlers de drag-and-drop
    const tratarDragOver = useCallback((e, destino) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastandoSobre(destino);
    }, []);

    const tratarDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastandoSobre(null);
    }, []);

    const tratarDrop = useCallback((e, destino) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastandoSobre(null);
        const arquivos = e.dataTransfer?.files;
        tratarArquivos(arquivos, destino);
    }, [tratarArquivos]);

    useEffect(() => {
        if (projetoParaEditar) {
            setDados({
                id: projetoParaEditar.id || "",
                titulo: projetoParaEditar.titulo || "",
                breveDescricao: projetoParaEditar.breveDescricao || "",
                descricao: projetoParaEditar.descricao || "",
                categorias: Array.isArray(projetoParaEditar.categorias)
                    ? [...projetoParaEditar.categorias]
                    : [],
                tags: Array.isArray(projetoParaEditar.tags)
                    ? [...projetoParaEditar.tags]
                    : [],
                destaque: Boolean(projetoParaEditar.destaque),
                status: projetoParaEditar.status || "visivel",
                imagens: {
                    capa: projetoParaEditar.imagens?.capa || "",
                    banner: projetoParaEditar.imagens?.banner || "",
                    galeria: Array.isArray(projetoParaEditar.imagens?.galeria)
                        ? [...projetoParaEditar.imagens.galeria]
                        : [],
                },
                links: Array.isArray(projetoParaEditar.links)
                    ? projetoParaEditar.links.map((l) => ({ ...l }))
                    : [],
            });
        }
    }, [projetoParaEditar]);

    // Atualiza campo de texto simples
    const atualizarCampo = (campo, valor) => {
        setDados((anterior) => {
            const atualizado = { ...anterior, [campo]: valor };
            // Se for novo projeto e alterar o título, sugere o slug automaticamente
            if (ehNovo && campo === "titulo" && !anterior.idCustomizado) {
                atualizado.id = gerarSlug(valor);
            }
            return atualizado;
        });
    };

    // Alternar categoria
    const alternarCategoria = (idCategoria) => {
        setDados((anterior) => {
            const existe = anterior.categorias.includes(idCategoria);
            const categorias = existe
                ? anterior.categorias.filter((c) => c !== idCategoria)
                : [...anterior.categorias, idCategoria];
            return { ...anterior, categorias };
        });
    };

    // Adicionar tag
    const adicionarTag = () => {
        const tagLimpa = novaTag.trim();
        if (tagLimpa && !dados.tags.includes(tagLimpa)) {
            setDados((anterior) => ({
                ...anterior,
                tags: [...anterior.tags, tagLimpa],
            }));
            setNovaTag("");
        }
    };

    // Remover tag
    const removerTag = (tagParaRemover) => {
        setDados((anterior) => ({
            ...anterior,
            tags: anterior.tags.filter((t) => t !== tagParaRemover),
        }));
    };

    // Atualizar imagem específica
    const atualizarImagem = (tipo, valor) => {
        setDados((anterior) => ({
            ...anterior,
            imagens: {
                ...anterior.imagens,
                [tipo]: valor,
            },
        }));
    };

    // Adicionar item à galeria
    const adicionarImagemGaleria = (url = "") => {
        setDados((anterior) => ({
            ...anterior,
            imagens: {
                ...anterior.imagens,
                galeria: [...anterior.imagens.galeria, url],
            },
        }));
    };

    // Atualizar item da galeria
    const atualizarItemGaleria = (indice, valor) => {
        setDados((anterior) => {
            const novaGaleria = [...anterior.imagens.galeria];
            novaGaleria[indice] = valor;
            return {
                ...anterior,
                imagens: {
                    ...anterior.imagens,
                    galeria: novaGaleria,
                },
            };
        });
    };

    // Remover item da galeria
    const removerItemGaleria = (indice) => {
        setDados((anterior) => ({
            ...anterior,
            imagens: {
                ...anterior.imagens,
                galeria: anterior.imagens.galeria.filter((_, i) => i !== indice),
            },
        }));
    };

    // Links do projeto
    const adicionarLink = () => {
        setDados((anterior) => ({
            ...anterior,
            links: [
                ...anterior.links,
                { texto: "Visitar projeto", url: "https://", principal: anterior.links.length === 0 },
            ],
        }));
    };

    const atualizarLink = (indice, campo, valor) => {
        setDados((anterior) => {
            const novosLinks = [...anterior.links];
            novosLinks[indice] = {
                ...novosLinks[indice],
                [campo]: valor,
            };
            return { ...anterior, links: novosLinks };
        });
    };

    const removerLink = (indice) => {
        setDados((anterior) => ({
            ...anterior,
            links: anterior.links.filter((_, i) => i !== indice),
        }));
    };

    // Submissão do formulário
    const tratarSalvar = (e) => {
        e.preventDefault();
        if (!dados.titulo.trim()) {
            setErro("O título do projeto é obrigatório.");
            return;
        }
        if (!dados.id.trim()) {
            setErro("O identificador único (slug) é obrigatório.");
            return;
        }

        setErro("");
        aoSalvar(dados);
    };

    // Selecionar imagem pelo modal seletor
    const selecionarImagemDoDisco = (url) => {
        if (seletorImagemAberto === "capa") {
            atualizarImagem("capa", url);
        } else if (seletorImagemAberto === "banner") {
            atualizarImagem("banner", url);
        } else if (seletorImagemAberto === "galeria") {
            adicionarImagemGaleria(url);
        }
        setSeletorImagemAberto(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 overflow-y-auto">
            <div data-ui className="bg-preto-fosco border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto text-slate-200">
                {/* Cabeçalho do Modal */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#191b30]">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {ehNovo ? "Criar Novo Projeto" : `Editar: ${dados.titulo || dados.id}`}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Preencha os dados que serão salvos em <code className="text-[#d28bff]">src/data/projetos.js</code>
                        </p>
                    </div>
                    <button
                        onClick={aoFechar}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Fechar modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Corpo com Scroll */}
                <form onSubmit={tratarSalvar} className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
                    {erro && (
                        <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-200 rounded-lg text-xs">
                            {erro}
                        </div>
                    )}

                    {/* Linha 1: Título e ID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Título do Projeto *
                            </label>
                            <input
                                type="text"
                                value={dados.titulo}
                                onChange={(e) => atualizarCampo("titulo", e.target.value)}
                                placeholder="Ex: Loja Virtual Multitech"
                                className="w-full px-3 py-2 bg-preto-escuro border border-white/15 rounded-lg text-white focus:outline-none focus:border-roxo-principal transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                ID / Slug Único *
                            </label>
                            <input
                                type="text"
                                value={dados.id}
                                onChange={(e) => {
                                    setDados((prev) => ({ ...prev, idCustomizado: true }));
                                    atualizarCampo("id", e.target.value);
                                }}
                                placeholder="Ex: loja-virtual-multitech"
                                className="w-full px-3 py-2 bg-preto-escuro border border-white/15 rounded-lg text-[#e3c3ff] text-xs focus:outline-none focus:border-roxo-principal transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {/* Linha 2: Status e Destaque */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <label className="text-xs font-semibold text-slate-300">Status:</label>
                            <select
                                value={dados.status}
                                onChange={(e) => atualizarCampo("status", e.target.value)}
                                className="px-3 py-1.5 bg-preto-escuro border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-roxo-principal transition-colors"
                            >
                                <option value="visivel">Visível (Ativo no portfólio)</option>
                                <option value="lixeira">Lixeira (Oculto)</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => atualizarCampo("destaque", !dados.destaque)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-[background-color,color,border-color] ${
                                    dados.destaque
                                        ? "bg-amber-500/20 border-amber-500 text-amber-300"
                                        : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                                }`}
                            >
                                <Star className={`w-4 h-4 ${dados.destaque ? "fill-amber-400 text-amber-400" : ""}`} />
                                {dados.destaque ? "Projeto em Destaque" : "Marcar como Destaque"}
                            </button>
                        </div>
                    </div>

                    {/* Breve Descrição */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Breve Descrição (1 frase de resumo)
                        </label>
                        <input
                            type="text"
                            value={dados.breveDescricao}
                            onChange={(e) => atualizarCampo("breveDescricao", e.target.value)}
                            placeholder="Ex: E-commerce completo com painel administrativo e pagamentos."
                            className="w-full px-3 py-2 bg-preto-escuro border border-white/15 rounded-lg text-white focus:outline-none focus:border-roxo-principal transition-colors"
                        />
                    </div>

                    {/* Descrição Completa */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Descrição Detalhada
                        </label>
                        <textarea
                            rows={3}
                            value={dados.descricao}
                            onChange={(e) => atualizarCampo("descricao", e.target.value)}
                            placeholder="Descreva as soluções desenvolvidas, tecnologias e diferenciais do projeto..."
                            className="w-full px-3 py-2 bg-preto-escuro border border-white/15 rounded-lg text-white focus:outline-none focus:border-roxo-principal transition-colors resize-none"
                        />
                    </div>

                    {/* Categorias */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2">
                            Categorias
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {LISTA_CATEGORIAS.map((cat) => {
                                const selecionada = dados.categorias.includes(cat.id);
                                return (
                                    <button
                                        type="button"
                                        key={cat.id}
                                        onClick={() => alternarCategoria(cat.id)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-[background-color,color,border-color] flex items-center gap-1.5 ${
                                            selecionada
                                                ? "bg-roxo-principal/30 border-roxo-principal text-white"
                                                : "bg-preto-escuro border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                                        }`}
                                    >
                                        {selecionada && <Check className="w-3 h-3 text-[#d28bff]" />}
                                        {cat.rotulo}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Tags & Tecnologias
                        </label>
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={novaTag}
                                onChange={(e) => setNovaTag(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        adicionarTag();
                                    }
                                }}
                                placeholder="Digite uma tag (ex: React, Tailwind) e pressione Enter"
                                className="flex-1 px-3 py-1.5 bg-preto-escuro border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-roxo-principal transition-colors"
                            />
                            <button
                                type="button"
                                onClick={adicionarTag}
                                className="button-press px-3 py-1.5 grad-btn sombra-btn text-white rounded-lg text-xs font-medium"
                            >
                                Adicionar
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {dados.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-slate-300 flex items-center gap-1.5"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removerTag(tag)}
                                        className="text-slate-400 hover:text-red-400"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Imagens */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase text-[#d28bff] flex items-center gap-2">
                                <IconeImagem className="w-4 h-4" /> Imagens do Projeto
                            </h3>
                            {enviandoImagem && (
                                <span className="flex items-center gap-1.5 text-[11px] text-[#d28bff]">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Enviando...
                                </span>
                            )}
                        </div>

                        {/* Inputs de arquivo ocultos */}
                        <input
                            ref={inputArquivoCapa}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                tratarArquivos(e.target.files, "capa");
                                e.target.value = "";
                            }}
                        />
                        <input
                            ref={inputArquivoBanner}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                tratarArquivos(e.target.files, "banner");
                                e.target.value = "";
                            }}
                        />
                        <input
                            ref={inputArquivoGaleria}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                                tratarArquivos(e.target.files, "galeria");
                                e.target.value = "";
                            }}
                        />

                        {/* Imagem de Capa */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-xs font-semibold text-slate-300">
                                    Imagem de Capa
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => inputArquivoCapa.current?.click()}
                                        disabled={enviandoImagem}
                                        className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                                    >
                                        <Upload className="w-3 h-3" /> Enviar do PC
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSeletorImagemAberto("capa")}
                                        className="text-xs text-[#d28bff] hover:text-white underline"
                                    >
                                        Escolher da pasta
                                    </button>
                                </div>
                            </div>
                            <div
                                onDragOver={(e) => tratarDragOver(e, "capa")}
                                onDragLeave={tratarDragLeave}
                                onDrop={(e) => tratarDrop(e, "capa")}
                                className={`flex gap-3 items-center p-2 rounded-xl border-2 border-dashed transition-[border-color,background-color] ${
                                    arrastandoSobre === "capa"
                                        ? "border-roxo-principal bg-roxo-principal/10"
                                        : "border-white/10 bg-transparent"
                                }`}
                            >
                                <input
                                    type="text"
                                    value={dados.imagens.capa}
                                    onChange={(e) => atualizarImagem("capa", e.target.value)}
                                    placeholder="Arraste uma imagem aqui ou cole o caminho"
                                    className="flex-1 px-3 py-2 bg-preto-escuro border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-roxo-principal transition-colors"
                                />
                                {dados.imagens.capa && (
                                    <div className="w-12 h-10 rounded border border-white/15 overflow-hidden bg-black/40 flex-shrink-0">
                                        <img
                                            src={dados.imagens.capa}
                                            alt="Prévia capa"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Imagem de Banner */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-xs font-semibold text-slate-300">
                                    Banner (Opcional)
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => inputArquivoBanner.current?.click()}
                                        disabled={enviandoImagem}
                                        className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                                    >
                                        <Upload className="w-3 h-3" /> Enviar do PC
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSeletorImagemAberto("banner")}
                                        className="text-xs text-[#d28bff] hover:text-white underline"
                                    >
                                        Escolher da pasta
                                    </button>
                                </div>
                            </div>
                            <div
                                onDragOver={(e) => tratarDragOver(e, "banner")}
                                onDragLeave={tratarDragLeave}
                                onDrop={(e) => tratarDrop(e, "banner")}
                                className={`flex gap-3 items-center p-2 rounded-xl border-2 border-dashed transition-[border-color,background-color] ${
                                    arrastandoSobre === "banner"
                                        ? "border-roxo-principal bg-roxo-principal/10"
                                        : "border-white/10 bg-transparent"
                                }`}
                            >
                                <input
                                    type="text"
                                    value={dados.imagens.banner}
                                    onChange={(e) => atualizarImagem("banner", e.target.value)}
                                    placeholder="Arraste uma imagem aqui ou cole o caminho"
                                    className="flex-1 px-3 py-2 bg-preto-escuro border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-roxo-principal transition-colors"
                                />
                                {dados.imagens.banner && (
                                    <div className="w-12 h-10 rounded border border-white/15 overflow-hidden bg-black/40 flex-shrink-0">
                                        <img
                                            src={dados.imagens.banner}
                                            alt="Prévia banner"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Galeria de Imagens */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-semibold text-slate-300">
                                    Galeria de Fotos ({dados.imagens.galeria.length})
                                </label>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => inputArquivoGaleria.current?.click()}
                                        disabled={enviandoImagem}
                                        className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                                    >
                                        <Upload className="w-3 h-3" /> Enviar do PC
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSeletorImagemAberto("galeria")}
                                        className="text-xs text-[#d28bff] hover:text-white underline"
                                    >
                                        Escolher da pasta
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => adicionarImagemGaleria("")}
                                        className="text-xs text-slate-300 hover:text-white"
                                    >
                                        + Campo manual
                                    </button>
                                </div>
                            </div>

                            {/* Zona de Drop para Galeria */}
                            <div
                                onDragOver={(e) => tratarDragOver(e, "galeria")}
                                onDragLeave={tratarDragLeave}
                                onDrop={(e) => tratarDrop(e, "galeria")}
                                className={`p-3 rounded-xl border-2 border-dashed transition-[border-color,background-color] space-y-2 ${
                                    arrastandoSobre === "galeria"
                                        ? "border-roxo-principal bg-roxo-principal/10"
                                        : "border-white/10 bg-transparent"
                                }`}
                            >
                                {dados.imagens.galeria.length === 0 && (
                                    <p className="text-center text-[11px] text-slate-500 py-3">
                                        Arraste imagens aqui, clique em &quot;Enviar do PC&quot; ou adicione um campo manual.
                                    </p>
                                )}
                                {dados.imagens.galeria.map((urlGaleria, idx) => (
                                    <div key={idx} className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            value={urlGaleria}
                                            onChange={(e) => atualizarItemGaleria(idx, e.target.value)}
                                            placeholder="/imagens_projetos/... ou https://..."
                                            className="flex-1 px-3 py-1.5 bg-preto-escuro border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-roxo-principal transition-colors"
                                        />
                                        {urlGaleria && (
                                            <div className="w-8 h-8 rounded border border-white/15 overflow-hidden bg-black/40 flex-shrink-0">
                                                <img
                                                    src={urlGaleria}
                                                    alt={`Galeria ${idx}`}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = "none";
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removerItemGaleria(idx)}
                                            className="p-1.5 text-slate-400 hover:text-red-400 rounded transition-colors"
                                            title="Remover foto"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase text-[#d28bff] flex items-center gap-2">
                                <IconeLink className="w-4 h-4" /> Links do Projeto ({dados.links.length})
                            </h3>
                            <button
                                type="button"
                                onClick={adicionarLink}
                                className="flex items-center gap-1 text-xs text-[#d28bff] hover:text-white"
                            >
                                <Plus className="w-3.5 h-3.5" /> Adicionar Link
                            </button>
                        </div>

                        {dados.links.map((link, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center p-2.5 bg-white/5 rounded-lg border border-white/5"
                            >
                                <div className="md:col-span-4">
                                    <input
                                        type="text"
                                        value={link.texto}
                                        onChange={(e) => atualizarLink(idx, "texto", e.target.value)}
                                        placeholder="Texto (ex: Visitar site)"
                                        className="w-full px-2.5 py-1.5 bg-preto-escuro border border-white/15 rounded text-xs text-white"
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <input
                                        type="text"
                                        value={link.url}
                                        onChange={(e) => atualizarLink(idx, "url", e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-2.5 py-1.5 bg-preto-escuro border border-white/15 rounded text-xs text-white"
                                    />
                                </div>
                                <div className="md:col-span-2 flex items-center justify-end gap-2">
                                    <label className="text-[11px] text-slate-400 flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(link.principal)}
                                            onChange={(e) => atualizarLink(idx, "principal", e.target.checked)}
                                            className="rounded text-roxo-principal focus:ring-0"
                                        />
                                        Principal
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => removerLink(idx)}
                                        className="text-slate-400 hover:text-red-400 p-1"
                                        title="Remover link"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </form>

                {/* Rodapé com botões de Ação */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#191b30]">
                    <button
                        type="button"
                        onClick={aoFechar}
                        className="px-4 py-2 rounded-xl text-slate-300 hover:bg-white/10 text-xs font-semibold transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={tratarSalvar}
                        className="button-press px-5 py-2 rounded-xl grad-btn sombra-btn text-white text-xs font-semibold flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        {ehNovo ? "Cadastrar Projeto" : "Salvar Alterações"}
                    </button>
                </div>
            </div>

            {/* Modal Seletor de Imagem da Pasta Local */}
            {seletorImagemAberto && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
                    <div data-ui className="bg-preto-fosco border border-white/15 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 bg-[#1e2038]">
                            <div>
                                <h3 className="text-sm font-bold text-white">
                                    Selecione uma Imagem para{" "}
                                    <span className="text-[#d28bff] uppercase">
                                        {seletorImagemAberto}
                                    </span>
                                </h3>
                                <p className="text-[11px] text-slate-400">
                                    Arquivos encontrados na pasta <code>public/imagens_projetos</code>
                                </p>
                            </div>
                            <button
                                onClick={() => setSeletorImagemAberto(null)}
                                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-4 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
                            {imagensDisponiveis.length === 0 ? (
                                <p className="col-span-full text-center text-xs text-slate-400 py-8">
                                    Nenhuma imagem encontrada na pasta <code>public/imagens_projetos</code>.
                                </p>
                            ) : (
                                imagensDisponiveis.map((img) => (
                                    <button
                                        key={img.url}
                                        type="button"
                                        onClick={() => selecionarImagemDoDisco(img.url)}
                                        className="group relative flex flex-col items-center bg-preto-escuro border border-white/10 hover:border-roxo-principal rounded-xl p-2 text-left transition-[border-color] overflow-hidden"
                                    >
                                        <div className="w-full h-24 bg-black/50 rounded-lg overflow-hidden flex items-center justify-center mb-2">
                                            <img
                                                src={img.url}
                                                alt={img.nome}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                onError={(e) => {
                                                    e.target.style.display = "none";
                                                }}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p className="text-xs font-semibold text-white truncate">
                                                {img.nome}
                                            </p>
                                            <p className="text-[10px] text-slate-400 truncate">
                                                {img.pasta !== "raiz" ? `${img.pasta}` : "raiz"}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>

                        <div className="flex justify-end p-3 bg-[#1e2038]">
                            <button
                                type="button"
                                onClick={() => setSeletorImagemAberto(null)}
                                className="px-4 py-1.5 bg-white/10 hover:bg-white/15 text-slate-300 rounded-lg text-xs"
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

