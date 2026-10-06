import React, { useState, useRef, useEffect } from "react";
import {
    Globe,
    User,
    LayoutDashboard,
    Check,
    X,
    ChevronUp,
} from "lucide-react";

const SITES_DISPONIVEIS = [
    {
        id: "webinexus",
        nome: "Web Inexus",
        descricao: "Site Institucional & Portfólio",
        icone: Globe,
        corAtiva: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    },
    {
        id: "ujhessie",
        nome: "Ujhessie",
        descricao: "Portfólio Pessoal",
        icone: User,
        corAtiva: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    },
    {
        id: "admin_local",
        nome: "Admin Local",
        descricao: "Painel de Projetos & Imagens",
        icone: LayoutDashboard,
        corAtiva: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    },
];

export const SeletorSiteLocal = ({ siteAtivo, aoTrocarSite }) => {
    const [aberto, setAberto] = useState(false);
    const containerRef = useRef(null);

    // Fecha ao clicar fora
    useEffect(() => {
        const tratarCliqueFora = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setAberto(false);
            }
        };

        if (aberto) {
            document.addEventListener("mousedown", tratarCliqueFora);
        }
        return () => {
            document.removeEventListener("mousedown", tratarCliqueFora);
        };
    }, [aberto]);

    const siteAtualObj = SITES_DISPONIVEIS.find((s) => s.id === siteAtivo) || SITES_DISPONIVEIS[0];
    const IconeAtual = siteAtualObj.icone;

    return (
        <aside
            ref={containerRef}
            aria-label="Alternador de sites local"
            className="fixed bottom-5 right-5 z-99999 font-sans antialiased"
        >
            {/* Menu Flutuante Aberto */}
            {aberto && (
                <div className="mb-3 w-72 rounded-2xl bg-[#121324]/95 border border-white/15 backdrop-blur-xl p-3 shadow-2xl text-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-150">
                    <div className="flex items-center justify-between px-2 py-1.5 mb-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-xs font-bold text-white tracking-wide">
                                Alternar Site Local
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setAberto(false)}
                            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                            title="Fechar menu"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <p className="px-2 mb-2 text-[11px] text-slate-400">
                        Selecione o ambiente para visualizar no <code>localhost</code>:
                    </p>

                    <div className="space-y-1.5">
                        {SITES_DISPONIVEIS.map((site) => {
                            const Icone = site.icone;
                            const ehAtivo = site.id === siteAtivo;

                            return (
                                <button
                                    key={site.id}
                                    type="button"
                                    onClick={() => {
                                        aoTrocarSite(site.id);
                                        setAberto(false);
                                    }}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition ${
                                        ehAtivo
                                            ? `${site.corAtiva} shadow-md`
                                            : "border-white/5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className={`p-1.5 rounded-lg ${
                                                ehAtivo ? "bg-white/15" : "bg-black/30 text-slate-400"
                                            }`}
                                        >
                                            <Icone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold leading-tight">
                                                {site.nome}
                                            </p>
                                            <p className="text-[10px] text-slate-400">
                                                {site.descricao}
                                            </p>
                                        </div>
                                    </div>

                                    {ehAtivo && <Check className="w-4 h-4 text-emerald-400 ml-2" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Botão Flutuante (Pill) */}
            <button
                type="button"
                onClick={() => setAberto((prev) => !prev)}
                className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#121324]/90 hover:bg-[#1a1b32] border border-purple-500/40 hover:border-purple-500 text-white shadow-xl shadow-purple-900/20 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
                title="Clique para alternar o site no localhost"
            >
                <div className="w-6 h-6 rounded-full bg-linear-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                    <IconeAtual className="w-3.5 h-3.5" />
                </div>

                <div className="text-left hidden sm:block">
                    <p className="text-[10px] uppercase font-bold text-purple-400 tracking-wider leading-none">
                        Site Local
                    </p>
                    <p className="text-xs font-semibold text-white leading-tight">
                        {siteAtualObj.nome}
                    </p>
                </div>

                <div className="p-1 rounded-full text-slate-400 group-hover:text-white transition">
                    {aberto ? (
                        <X className="w-3.5 h-3.5" />
                    ) : (
                        <ChevronUp className="w-3.5 h-3.5" />
                    )}
                </div>
            </button>
        </aside>
    );
};
