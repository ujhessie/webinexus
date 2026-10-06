import React, { useState, useEffect } from "react";
import { X, Check, Image as IconeImagem, Plus, Trash2, Star, Link as IconeLink } from "lucide-react";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <div className="bg-[#151628] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto text-slate-200">
                {/* Cabeçalho do Modal */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#191b30]">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {ehNovo ? "Criar Novo Projeto" : `Editar: ${dados.titulo || dados.id}`}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Preencha os dados que serão salvos em <code className="text-purple-400">src/data/projetos.js</code>
                        </p>
                    </div>
                    <button
                        onClick={aoFechar}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
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
                                className="w-full px-3 py-2 bg-[#0d0e1a] border border-white/15 rounded-lg text-white focus:outline-none focus:border-purple-500"
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
                                className="w-full px-3 py-2 bg-[#0d0e1a] border border-white/15 rounded-lg text-purple-300 font-mono text-xs focus:outline-none focus:border-purple-500"
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
                                className="px-3 py-1.5 bg-[#0d0e1a] border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                            >
                                <option value="visivel">Visível (Ativo no portfólio)</option>
                                <option value="lixeira">Lixeira (Oculto)</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => atualizarCampo("destaque", !dados.destaque)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
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
                            className="w-full px-3 py-2 bg-[#0d0e1a] border border-white/15 rounded-lg text-white focus:outline-none focus:border-purple-500"
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
                            className="w-full px-3 py-2 bg-[#0d0e1a] border border-white/15 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
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
                                        className={`px-3 py-1 rounded-full text-xs font-medium border transition flex items-center gap-1.5 ${
                                            selecionada
                                                ? "bg-purple-600/30 border-purple-500 text-purple-200"
                                                : "bg-[#0d0e1a] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                                        }`}
                                    >
                                        {selecionada && <Check className="w-3 h-3 text-purple-400" />}
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
                                className="flex-1 px-3 py-1.5 bg-[#0d0e1a] border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                            <button
                                type="button"
                                onClick={adicionarTag}
                                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium transition"
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
                    <div className="space-y-4 pt-2 border-t border-white/10">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                            <IconeImagem className="w-4 h-4" /> Imagens do Projeto
                        </h3>

                        {/* Imagem de Capa */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-xs font-semibold text-slate-300">
                                    Imagem de Capa (Caminho ou URL)
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setSeletorImagemAberto("capa")}
                                    className="text-xs text-purple-400 hover:text-purple-300 underline"
                                >
                                    Escolher da pasta de imagens
                                </button>
                            </div>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="text"
                                    value={dados.imagens.capa}
                                    onChange={(e) => atualizarImagem("capa", e.target.value)}
                                    placeholder="/imagens_projetos/nome-do-projeto/capa.png"
                                    className="flex-1 px-3 py-2 bg-[#0d0e1a] border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
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
                                <button
                                    type="button"
                                    onClick={() => setSeletorImagemAberto("banner")}
                                    className="text-xs text-purple-400 hover:text-purple-300 underline"
                                >
                                    Escolher da pasta de imagens
                                </button>
                            </div>
                            <div className="flex gap-3 items-center">
                                <input
                                    type="text"
                                    value={dados.imagens.banner}
                                    onChange={(e) => atualizarImagem("banner", e.target.value)}
                                    placeholder="/imagens_projetos/nome-do-projeto/banner.png"
                                    className="flex-1 px-3 py-2 bg-[#0d0e1a] border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
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
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setSeletorImagemAberto("galeria")}
                                        className="text-xs text-purple-400 hover:text-purple-300 underline"
                                    >
                                        + Escolher da pasta
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

                            <div className="space-y-2">
                                {dados.imagens.galeria.map((urlGaleria, idx) => (
                                    <div key={idx} className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            value={urlGaleria}
                                            onChange={(e) => atualizarItemGaleria(idx, e.target.value)}
                                            placeholder="/imagens_projetos/... ou https://..."
                                            className="flex-1 px-3 py-1.5 bg-[#0d0e1a] border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-purple-500"
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
                                            className="p-1.5 text-slate-400 hover:text-red-400 rounded transition"
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
                    <div className="space-y-3 pt-2 border-t border-white/10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                                <IconeLink className="w-4 h-4" /> Links do Projeto ({dados.links.length})
                            </h3>
                            <button
                                type="button"
                                onClick={adicionarLink}
                                className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
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
                                        className="w-full px-2.5 py-1.5 bg-[#0d0e1a] border border-white/15 rounded text-xs text-white"
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <input
                                        type="text"
                                        value={link.url}
                                        onChange={(e) => atualizarLink(idx, "url", e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-2.5 py-1.5 bg-[#0d0e1a] border border-white/15 rounded text-xs text-white"
                                    />
                                </div>
                                <div className="md:col-span-2 flex items-center justify-end gap-2">
                                    <label className="text-[11px] text-slate-400 flex items-center gap-1 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(link.principal)}
                                            onChange={(e) => atualizarLink(idx, "principal", e.target.checked)}
                                            className="rounded text-purple-600 focus:ring-0"
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
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-[#191b30]">
                    <button
                        type="button"
                        onClick={aoFechar}
                        className="px-4 py-2 rounded-xl text-slate-300 hover:bg-white/10 text-xs font-semibold transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={tratarSalvar}
                        className="px-5 py-2 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/20 transition flex items-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        {ehNovo ? "Cadastrar Projeto" : "Salvar Alterações"}
                    </button>
                </div>
            </div>

            {/* Modal Seletor de Imagem da Pasta Local */}
            {seletorImagemAberto && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
                    <div className="bg-[#18192d] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#1e2038]">
                            <div>
                                <h3 className="text-sm font-bold text-white">
                                    Selecione uma Imagem para{" "}
                                    <span className="text-purple-400 uppercase">
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
                                        className="group relative flex flex-col items-center bg-[#0d0e1a] border border-white/10 hover:border-purple-500 rounded-xl p-2 text-left transition overflow-hidden"
                                    >
                                        <div className="w-full h-24 bg-black/50 rounded-lg overflow-hidden flex items-center justify-center mb-2">
                                            <img
                                                src={img.url}
                                                alt={img.nome}
                                                className="w-full h-full object-cover group-hover:scale-105 transition"
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
                                                {img.pasta !== "raiz" ? `📁 ${img.pasta}` : "📁 raiz"}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>

                        <div className="flex justify-end p-3 border-t border-white/10 bg-[#1e2038]">
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

