import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ProjetosProvider } from "./contexts/ProjetosContext.jsx";
import { rotasUjhessie } from "./sites/ujhessie/routes.jsx";
import { rotasWebInexus } from "./sites/webinexus/routes.jsx";
import { rotasAdmin_local } from "./sites/admin_local/routes.jsx";
import { SeletorSiteLocal } from "./componentes/ui/SeletorSiteLocal.jsx";

const rotasProducao = {
    "ujhessie.vercel.app": rotasUjhessie,
    "webinexus.vercel.app": rotasWebInexus,
};

const rotasDisponiveis = {
    webinexus: rotasWebInexus,
    ujhessie: rotasUjhessie,
    admin_local: rotasAdmin_local,
};

export const App = () => {
    const ehAmbienteLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

    // Recupera o último site ativo salvo no localStorage (padrão: admin_local)
    const [siteLocalAtivo, setSiteLocalAtivo] = useState(() => {
        return localStorage.getItem("site_local_ativo") || "admin_local";
    });

    const trocarSiteLocal = (novoSite) => {
        setSiteLocalAtivo(novoSite);
        localStorage.setItem("site_local_ativo", novoSite);
    };

    // Define o roteador ativo: se estiver em produção pelo domínio, usa a rota correspondente.
    // Se for localhost, usa a escolha dinâmica do seletor.
    const router = ehAmbienteLocal
        ? (rotasDisponiveis[siteLocalAtivo] || rotasWebInexus)
        : (rotasProducao[window.location.hostname] || rotasWebInexus);

    return (
        <ProjetosProvider>
            <RouterProvider
                router={router}
                key={ehAmbienteLocal ? siteLocalAtivo : window.location.hostname}
            />
            {ehAmbienteLocal && (
                <SeletorSiteLocal
                    siteAtivo={siteLocalAtivo}
                    aoTrocarSite={trocarSiteLocal}
                />
            )}
        </ProjetosProvider>
    );
};

export default App;

