import React, { useState, useMemo } from "react";
import { Search, Folder, CheckCircle2, AlertTriangle, Copy, Check, ExternalLink, HardDrive } from "lucide-react";

// Formata bytes para KB ou MB legível
function formatarTamanho(bytes) {
    if (!bytes && bytes !== 0) return "0 KB";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const GaleriaImagens = ({
    imagens = [],
    projetos = [],
    aoDefinirImagemEmProjeto,
    aoExibirMensagem,
}) => {
    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("todos"); // 'todos' | 'utilizadas' | 'orfas'
    const [filtroPasta, setFiltroPasta] = useState("todas");
    const [copiadoUrl, setCopiadoUrl] = useState(null);
    const [imagemAmpliada, setImagemAmpliada] = useState(null);

    // Mapeamento cruzado: identifica onde cada imagem está sendo usada
    const imagensComUso = useMemo(() => {
        return imagens.map((img) => {
            const usos = [];

            projetos.forEach((proj) => {
                if (proj.imagens?.capa === img.url) {
                    usos.push({
                        idProjeto: proj.id,
                        tituloProjeto: proj.titulo,
                        campo: "Capa",
                    });
                }
                if (proj.imagens?.banner === img.url) {
                    usos.push({
                        idProjeto: proj.id,
                        tituloProjeto: proj.titulo,
                        campo: "Banner",
                    });
                }
                if (Array.isArray(proj.imagens?.galeria) && proj.imagens.galeria.includes(img.url)) {
                    usos.push({
                        idProjeto: proj.id,
                        tituloProjeto: proj.titulo,
                        campo: "Galeria",
                    });
                }
            });

            return {
                ...img,
                usos,
                estaEmUso: usos.length > 0,
            };
        });
    }, [imagens, projetos]);

    // Pastas únicas encontradas
    const pastasDisponiveis = useMemo(() => {
        const setPastas = new Set(imagens.map((img) => img.pasta));
        return Array.from(setPastas);
    }, [imagens]);

    // Imagens filtradas
    const imagensFiltradas = useMemo(() => {
        return imagensComUso.filter((img) => {
            const termo = busca.toLowerCase();
            const coincideTexto =
                img.nome.toLowerCase().includes(termo) ||
                img.pasta.toLowerCase().includes(termo) ||
                img.url.toLowerCase().includes(termo);

            if (!coincideTexto) return false;

            if (filtroStatus === "utilizadas" && !img.estaEmUso) return false;
            if (filtroStatus === "orfas" && img.estaEmUso) return false;

            if (filtroPasta !== "todas" && img.pasta !== filtroPasta) return false;

            return true;
        });
    }, [imagensComUso, busca, filtroStatus, filtroPasta]);

    // Resumo de contagem
    const totalImagens = imagens.length;
    const totalEmUso = imagensComUso.filter((img) => img.estaEmUso).length;
    const totalOrfas = totalImagens - totalEmUso;
    const tamanhoTotalBytes = imagens.reduce((acc, img) => acc + (img.tamanho || 0), 0);

    const copiarUrl = (url) => {
        navigator.clipboard.writeText(url);
        setCopiadoUrl(url);
        if (aoExibirMensagem) {
            aoExibirMensagem(`Caminho copiado: ${url}`);
        }
        setTimeout(() => setCopiadoUrl(null), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Bloco de Métricas do Armazenamento */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#141527] border border-white/10 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                        <HardDrive className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                            Total de Arquivos
                        </p>
                        <p className="text-xl font-bold text-white">{totalImagens}</p>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141527] border border-white/10 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                            Em Uso
                        </p>
                        <p className="text-xl font-bold text-emerald-400">{totalEmUso}</p>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141527] border border-white/10 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                            Não Utilizadas (Órfãs)
                        </p>
                        <p className="text-xl font-bold text-amber-400">{totalOrfas}</p>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141527] border border-white/10 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                        <Folder className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                            Tamanho em Disco
                        </p>
                        <p className="text-xl font-bold text-white">
                            {formatarTamanho(tamanhoTotalBytes)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Barra de Filtros */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-[#141527] border border-white/10 rounded-2xl">
                {/* Campo de Busca */}
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="Buscar por nome do arquivo ou pasta..."
                        className="w-full pl-10 pr-4 py-2 bg-[#0c0d18] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Filtro por Status */}
                    <div className="flex bg-[#0c0d18] p-1 border border-white/10 rounded-xl text-xs">
                        <button
                            onClick={() => setFiltroStatus("todos")}
                            className={`px-3 py-1.5 rounded-lg font-medium transition ${
                                filtroStatus === "todos"
                                    ? "bg-purple-600 text-white"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Todas ({totalImagens})
                        </button>
                        <button
                            onClick={() => setFiltroStatus("utilizadas")}
                            className={`px-3 py-1.5 rounded-lg font-medium transition ${
                                filtroStatus === "utilizadas"
                                    ? "bg-emerald-600 text-white"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Em uso ({totalEmUso})
                        </button>
                        <button
                            onClick={() => setFiltroStatus("orfas")}
                            className={`px-3 py-1.5 rounded-lg font-medium transition ${
                                filtroStatus === "orfas"
                                    ? "bg-amber-600 text-white"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Órfãs ({totalOrfas})
                        </button>
                    </div>

                    {/* Filtro por Pasta */}
                    <select
                        value={filtroPasta}
                        onChange={(e) => setFiltroPasta(e.target.value)}
                        className="px-3 py-2 bg-[#0c0d18] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                        <option value="todas">Todas as Pastas</option>
                        {pastasDisponiveis.map((pasta) => (
                            <option key={pasta} value={pasta}>
                                📁 {pasta}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grid de Imagens */}
            {imagensFiltradas.length === 0 ? (
                <div className="text-center py-16 bg-[#141527] border border-white/10 rounded-2xl text-slate-400">
                    <p className="text-sm">Nenhuma imagem encontrada com os filtros selecionados.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imagensFiltradas.map((img) => {
                        const ehCopiado = copiadoUrl === img.url;

                        return (
                            <div
                                key={img.url}
                                className="group bg-[#141527] border border-white/10 hover:border-purple-500/50 rounded-2xl overflow-hidden flex flex-col transition shadow-lg"
                            >
                                {/* Imagem com Preview */}
                                <div
                                    className="relative w-full h-44 bg-black/40 overflow-hidden cursor-pointer"
                                    onClick={() => setImagemAmpliada(img.url)}
                                >
                                    <img
                                        src={img.url}
                                        alt={img.nome}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                        }}
                                    />
                                    {/* Badge de Uso */}
                                    <div className="absolute top-2.5 left-2.5">
                                        {img.estaEmUso ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md shadow">
                                                <CheckCircle2 className="w-3 h-3" /> Em Uso
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/90 text-black backdrop-blur-md shadow">
                                                <AlertTriangle className="w-3 h-3" /> Não Utilizada
                                            </span>
                                        )}
                                    </div>

                                    {/* Tamanho da Imagem */}
                                    <div className="absolute bottom-2.5 right-2.5">
                                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/70 text-slate-300 backdrop-blur-md">
                                            {formatarTamanho(img.tamanho)}
                                        </span>
                                    </div>
                                </div>

                                {/* Informações do Arquivo */}
                                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        <h4
                                            className="text-xs font-bold text-white truncate"
                                            title={img.nome}
                                        >
                                            {img.nome}
                                        </h4>
                                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono truncate">
                                            <Folder className="w-3 h-3 text-purple-400" />
                                            {img.pasta !== "raiz" ? img.pasta : "raiz"}
                                        </p>
                                    </div>

                                    {/* Se estiver em uso, lista onde está */}
                                    {img.estaEmUso && (
                                        <div className="p-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-1">
                                            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                                                Vinculada em:
                                            </p>
                                            <div className="space-y-0.5">
                                                {img.usos.map((uso, idx) => (
                                                    <p
                                                        key={idx}
                                                        className="text-[11px] text-slate-300 truncate"
                                                        title={`${uso.tituloProjeto} (${uso.campo})`}
                                                    >
                                                        • <span className="font-medium text-white">{uso.tituloProjeto}</span> ({uso.campo})
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Ações */}
                                    <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => copiarUrl(img.url)}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-medium border transition ${
                                                ehCopiado
                                                    ? "bg-emerald-600 border-emerald-500 text-white"
                                                    : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                                            }`}
                                        >
                                            {ehCopiado ? (
                                                <>
                                                    <Check className="w-3.5 h-3.5" /> Copiado!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-3.5 h-3.5" /> Copiar URL
                                                </>
                                            )}
                                        </button>

                                        {aoDefinirImagemEmProjeto && (
                                            <button
                                                type="button"
                                                onClick={() => aoDefinirImagemEmProjeto(img.url)}
                                                className="p-1.5 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-white rounded-lg transition text-[11px]"
                                                title="Usar em um projeto existente"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal de Zoom da Imagem */}
            {imagemAmpliada && (
                <div
                    className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-zoom-out"
                    onClick={() => setImagemAmpliada(null)}
                >
                    <div className="max-w-4xl max-h-[85vh] relative flex flex-col items-center">
                        <img
                            src={imagemAmpliada}
                            alt="Visualização ampliada"
                            className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl border border-white/10"
                        />
                        <p className="mt-3 text-xs text-slate-300 font-mono bg-black/60 px-3 py-1 rounded-full">
                            {imagemAmpliada} (Clique fora para fechar)
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

