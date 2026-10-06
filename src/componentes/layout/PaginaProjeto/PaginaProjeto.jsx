import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useProjetos } from "../../../contexts/ProjetosContext.jsx";
import {
    ArrowLeft,
    ExternalLink,
    Image as ImageIcon,
    FolderGit2,
    Sparkles,
    CheckCircle2,
    X,
    ChevronLeft,
    ChevronRight,
    ZoomIn
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Componente Principal: Página Dinâmica do Projeto                  */
/* ------------------------------------------------------------------ */

export const PaginaProjeto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProjetoPorId, getCategoria } = useProjetos();
    const projeto = getProjetoPorId(id);

    // Rola para o topo ao acessar ou trocar de projeto
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [id]);

    const voltarPaginaAnterior = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    if (!projeto) {
        return (
            <main className="min-h-[70vh] flex items-center justify-center animate-fade-in">
                <div className="content-section py-20 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-roxo-principal">
                        <FolderGit2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Projeto não encontrado</h2>
                    <p className="text-gray-400 max-w-md mb-6 text-sm sm:text-base">
                        O projeto que você está procurando pode ter sido removido ou o link está incorreto.
                    </p>
                    <button
                        type="button"
                        onClick={voltarPaginaAnterior}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-roxo-escuro to-roxo-principal text-white font-titulo font-semibold text-sm hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-roxo-principal/25"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para a página anterior
                    </button>
                </div>
            </main>
        );
    }

    const {
        titulo = "Projeto sem título",
        breveDescricao,
        descricao,
        categorias = [],
        tags = [],
        imagens = {},
        links = []
    } = projeto;

    // Normalização das URLs de imagens para evitar strings vazias ou rotas genéricas
    const urlBannerValida = imagens.banner && imagens.banner.trim().length > 18 ? imagens.banner : null;
    const urlCapaValida = imagens.capa && imagens.capa.trim().length > 18 ? imagens.capa : null;
    const bannerFinal = urlBannerValida || urlCapaValida;

    const listaGaleria = Array.isArray(imagens.galeria)
        ? imagens.galeria.filter((img) => img && img.trim().length > 18)
        : [];

    return (
        <article className="w-full animate-fade-in">
            {/* Banner ocupando toda a largura da tela com botão voltar, título e infos */}
            <BannerProjeto
                titulo={titulo}
                banner={bannerFinal}
                breveDescricao={breveDescricao}
                categorias={categorias}
                getCategoria={getCategoria}
                onVoltar={voltarPaginaAnterior}
            />

            {/* Conteúdo abaixo do banner ajustado com content-section */}
            <div className="content-section py-10 sm:py-14 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* No mobile: Informações aparecem primeiro (order-1) / No desktop: direita (lg:order-2) */}
                    <div className="order-1 lg:order-2 lg:col-span-5">
                        <InfoProjeto
                            titulo={titulo}
                            breveDescricao={breveDescricao}
                            descricao={descricao}
                            categorias={categorias}
                            tags={tags}
                            links={links}
                            getCategoria={getCategoria}
                        />
                    </div>

                    {/* No mobile: Galeria aparece depois (order-2) / No desktop: esquerda (lg:order-1) */}
                    <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-6">
                        <GaleriaProjeto
                            galeria={listaGaleria}
                            capa={urlCapaValida}
                            titulo={titulo}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};

/* ------------------------------------------------------------------ */
/* Banner do Projeto (Largura total da tela)                          */
/* ------------------------------------------------------------------ */

const BannerProjeto = ({
    titulo,
    banner,
    breveDescricao,
    categorias,
    getCategoria,
    onVoltar
}) => {
    const [erroImagem, setErroImagem] = useState(false);

    return (
        <section className="relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] bg-preto-escuro flex flex-col justify-between overflow-hidden border-b border-white/10">
            {/* Imagem de fundo ou Placeholder com efeito gradiente escuro de ponta a ponta */}
            {banner && !erroImagem ? (
                <>
                    <img
                        src={banner}
                        alt={titulo}
                        onError={() => setErroImagem(true)}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    {/* Gradiente escuro para contraste do texto e navegação */}
                    <div className="absolute inset-0 bg-linear-to-b from-preto-escuro/90 via-preto-escuro/70 to-preto-escuro" />
                </>
            ) : (
                <div className="absolute inset-0 bg-linear-to-br from-roxo-escuro/30 via-preto-fosco to-preto-escuro overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#b72ffe_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-roxo-principal/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute inset-0 bg-linear-to-t from-preto-escuro via-transparent to-preto-escuro/80" />
                </div>
            )}

            {/* Topo dentro do Banner: Botão de voltar e categoria */}
            <div className="relative z-10 w-full pt-8 sm:pt-10">
                <div className="content-section flex items-center justify-between">
                    <button
                        type="button"
                        onClick={onVoltar}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-preto-escuro/60 hover:bg-preto-escuro/90 border border-white/15 text-white/90 hover:text-white backdrop-blur-md transition-all text-xs sm:text-sm font-medium cursor-pointer group hover:-translate-x-0.5 shadow-lg"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-roxo-claro" />
                        <span>Voltar</span>
                    </button>

                    {categorias.length > 0 && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-titulo text-white/80 bg-white/5 border border-white/10 backdrop-blur-md uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-roxo-principal" />
                            {getCategoria(categorias[0])?.label || categorias[0]}
                        </span>
                    )}
                </div>
            </div>

            {/* Base dentro do Banner: Título, Categorias e Breve Descrição */}
            <div className="relative z-10 w-full pb-10 sm:pb-12 lg:pb-14">
                <div className="content-section flex flex-col gap-3 sm:gap-4">
                    {categorias.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {categorias.map((cat) => (
                                <span
                                    key={cat}
                                    className="px-3 py-1 rounded-full text-xs font-titulo font-semibold bg-roxo-principal/25 border border-roxo-principal/40 text-roxo-claro backdrop-blur-md"
                                >
                                    {getCategoria(cat)?.label || cat}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-titulo tracking-tight">
                        {titulo}
                    </h1>

                    {breveDescricao ? (
                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-3xl font-corpo leading-relaxed">
                            {breveDescricao}
                        </p>
                    ) : (
                        <p className="text-white/50 text-xs sm:text-sm italic font-corpo">
                            Confira as capturas visuais e especificações deste projeto logo abaixo.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

/* ------------------------------------------------------------------ */
/* Galeria de Imagens do Projeto com Lightbox / Modal de Navegação     */
/* ------------------------------------------------------------------ */

const GaleriaProjeto = ({ galeria = [], capa, titulo }) => {
    const imagensExibidas = galeria.length > 0 ? galeria : capa ? [capa] : [];
    const [indiceModal, setIndiceModal] = useState(null);

    const abrirModal = (index) => setIndiceModal(index);
    const fecharModal = () => setIndiceModal(null);

    const imagemAnterior = () => {
        setIndiceModal((prev) => (prev > 0 ? prev - 1 : imagensExibidas.length - 1));
    };

    const proximaImagem = () => {
        setIndiceModal((prev) => (prev < imagensExibidas.length - 1 ? prev + 1 : 0));
    };

    // Navegação via teclado: ESC para fechar, setas esquerda e direita para navegar
    useEffect(() => {
        if (indiceModal === null) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") fecharModal();
            if (e.key === "ArrowLeft") imagemAnterior();
            if (e.key === "ArrowRight") proximaImagem();
        };

        const overflowOriginal = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = overflowOriginal;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [indiceModal, imagensExibidas.length]);

    if (imagensExibidas.length === 0) {
        return (
            <div className="flex flex-col gap-4 animate-fade-in-up">
                <div className="rounded-2xl border border-white/10 bg-preto-fosco/70 p-10 flex flex-col items-center justify-center text-center aspect-16/9">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-3">
                        <ImageIcon className="w-7 h-7" />
                    </div>
                    <p className="text-white/70 font-medium text-sm">Imagens em produção</p>
                    <p className="text-white/40 text-xs max-w-xs mt-1">
                        As capturas e prévias visuais deste projeto estão sendo preparadas.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 animate-fade-in-up">
            <div className="flex flex-col gap-5">
                {imagensExibidas.map((src, index) => (
                    <ItemImagemGaleria
                        key={`${src}-${index}`}
                        src={src}
                        alt={`${titulo} — imagem ${index + 1}`}
                        numero={index + 1}
                        aoClicar={() => abrirModal(index)}
                    />
                ))}
            </div>

            {/* Modal Lightbox de visualização expandida */}
            {indiceModal !== null && (
                <ModalGaleria
                    imagens={imagensExibidas}
                    indice={indiceModal}
                    titulo={titulo}
                    aoFechar={fecharModal}
                    aoAnterior={imagemAnterior}
                    aoProximo={proximaImagem}
                />
            )}
        </div>
    );
};

const ItemImagemGaleria = ({ src, alt, numero, aoClicar }) => {
    const [falhou, setFalhou] = useState(false);

    if (falhou) {
        return (
            <div className="rounded-2xl border border-white/10 bg-preto-fosco p-8 flex flex-col items-center justify-center text-center aspect-16/9">
                <ImageIcon className="w-8 h-8 text-white/20 mb-2" />
                <span className="text-white/40 text-xs">Prévia {numero} indisponível</span>
            </div>
        );
    }

    return (
        <figure
            onClick={aoClicar}
            className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-preto-fosco shadow-lg group relative transition-all duration-300 hover:border-roxo-principal/50 hover:shadow-[0_10px_30px_-10px_rgba(183,47,254,0.25)] cursor-zoom-in"
        >
            <img
                src={src}
                alt={alt}
                onError={() => setFalhou(true)}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                loading="lazy"
            />

            {/* Indicador sutil de clique / ampliação no hover */}
            <div className="absolute inset-0 bg-preto-escuro/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="p-3 rounded-full bg-preto-escuro/70 border border-white/20 text-white backdrop-blur-md shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5 text-roxo-claro" />
                </span>
            </div>

            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-preto-escuro/80 backdrop-blur-md text-[10px] font-mono text-white/70 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                #{numero}
            </div>
        </figure>
    );
};

/* ------------------------------------------------------------------ */
/* Modal Lightbox de Visualização e Navegação (Tela Inteira)           */
/* ------------------------------------------------------------------ */

const ModalGaleria = ({
    imagens,
    indice,
    titulo,
    aoFechar,
    aoAnterior,
    aoProximo
}) => {
    if (indice === null || !imagens[indice]) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in select-none w-screen h-screen overflow-hidden"
            onClick={aoFechar}
        >
            {/* Barra de Ações Superior Flutuante */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-30 pointer-events-none">
                <span className="text-white/80 text-xs sm:text-sm font-titulo tracking-wider pointer-events-auto bg-black/60 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
                    {titulo} {imagens.length > 1 && `(${indice + 1} de ${imagens.length})`}
                </span>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        aoFechar();
                    }}
                    className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer hover:rotate-90 shadow-xl"
                    aria-label="Fechar galeria"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>

            {/* Imagem Ocupando Toda a Tela */}
            <div
                className="w-full h-full flex items-center justify-center p-2 sm:p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={imagens[indice]}
                    alt={`${titulo} — imagem ${indice + 1}`}
                    className="w-full h-full object-contain select-none"
                />
            </div>

            {/* Botões de Navegação Anterior / Próxima Flutuantes */}
            {imagens.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            aoAnterior();
                        }}
                        className="absolute left-3 sm:left-6 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-md z-30 hover:-translate-x-1 shadow-xl"
                        aria-label="Imagem anterior"
                    >
                        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            aoProximo();
                        }}
                        className="absolute right-3 sm:right-6 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-md z-30 hover:translate-x-1 shadow-xl"
                        aria-label="Próxima imagem"
                    >
                        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>
                </>
            )}
        </div>,
        document.body
    );
};

/* ------------------------------------------------------------------ */
/* Informações e Detalhes do Projeto                                  */
/* ------------------------------------------------------------------ */

const InfoProjeto = ({
    titulo,
    breveDescricao,
    descricao,
    categorias = [],
    tags = [],
    links = [],
    getCategoria
}) => {
    return (
        <aside className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col gap-6 lg:sticky lg:top-24 shadow-xl animate-fade-in-up">

            {/* Cabeçalho do Card */}
            <div className="border-b border-white/10 pb-5">
                <span className="text-xs font-titulo uppercase tracking-wider text-roxo-claro font-semibold">
                    Visão Geral
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {titulo}
                </h2>
                {breveDescricao && (
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                        {breveDescricao}
                    </p>
                )}
            </div>

            {/* Descrição Detalhada */}
            <div className="flex flex-col gap-2">
                <h3 className="text-xs font-titulo font-semibold text-white/50 uppercase tracking-wider">
                    Sobre o Projeto
                </h3>
                {descricao ? (
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                        {descricao}
                    </p>
                ) : (
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-white/40 text-xs leading-relaxed italic">
                        Projeto concebido com alto padrão de qualidade e design responsivo. Novas especificações técnicas e detalhes deste trabalho serão adicionados em breve.
                    </div>
                )}
            </div>

            {/* Categorias */}
            {categorias.length > 0 && (
                <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-titulo font-semibold text-white/50 uppercase tracking-wider">
                        Segmentos
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {categorias.map((cat) => (
                            <span
                                key={cat}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-titulo font-medium bg-roxo-escuro/30 border border-roxo-principal/30 text-roxo-claro"
                            >
                                <CheckCircle2 className="w-3 h-3 text-roxo-principal" />
                                {getCategoria(cat)?.label || cat}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Tags / Tecnologias */}
            <div className="flex flex-col gap-2">
                <h3 className="text-xs font-titulo font-semibold text-white/50 uppercase tracking-wider">
                    Tecnologias & Ferramentas
                </h3>
                {tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 rounded-lg text-xs font-titulo bg-white/5 border border-white/10 text-gray-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-1.5">
                        {["Web Development", "UI/UX Design", "Responsividade"].map((item) => (
                            <span
                                key={item}
                                className="px-2.5 py-1 rounded-lg text-xs font-titulo bg-white/5 border border-white/10 text-gray-400"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Links ou CTA de Contato */}
            <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
                {links.length > 0 ? (
                    links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-titulo font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                                link.principal
                                    ? "bg-linear-to-r from-roxo-escuro to-roxo-principal hover:from-roxo-principal hover:to-roxo-claro text-white shadow-[0_8px_25px_-4px_rgba(123,31,225,0.65)] hover:-translate-y-0.5"
                                    : "border border-white/15 text-white/80 hover:text-white hover:bg-white/5 hover:-translate-y-0.5"
                            }`}
                        >
                            <ExternalLink className="w-4 h-4" />
                            {link.texto || "Acessar Projeto"}
                        </a>
                    ))
                ) : (
                    <a
                        href="https://wa.me/5500000000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-titulo font-bold text-xs tracking-wider uppercase bg-linear-to-r from-roxo-escuro to-roxo-principal hover:from-roxo-principal hover:to-roxo-claro text-white shadow-[0_8px_25px_-4px_rgba(123,31,225,0.65)] hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <Sparkles className="w-4 h-4" />
                        Quero um projeto parecido
                    </a>
                )}
            </div>
        </aside>
    );
};
