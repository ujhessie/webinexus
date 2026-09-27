import React from "react";
import { WebiNexusSite } from "../sites/WebiNexusSite";
import { UjhessieSite } from "../sites/UjhessieSite";

/**
 * Mapeamento central de domínios para os respectivos sites.
 * Um mesmo site pode ser associado a múltiplos domínios.
 */
export const sites = {
    localhost: <UjhessieSite />,
    "127.0.0.1": <UjhessieSite />,
    "webinexus.vercel.app": <WebiNexusSite />,
    "ujhessie.vercel.app": <UjhessieSite />,
    fallback: <UjhessieSite />, // Para caso nenhum coincida ou em ambiente local
};

/**
 * Obtém o site correspondente ao domínio atual.
 *
 * Permite também testar localmente passando o parâmetro ?domain= ou ?site= na URL:
 * Exemplo: http://localhost:5173/?domain=webinexus.vercel.app
 */
export const getSiteAtual = () => {
    if (typeof window === "undefined") {
        return sites["fallback"];
    }

    // Suporte a query params para testes em ambiente local
    const urlParams = new URLSearchParams(window.location.search);
    const dominioParam = urlParams.get("domain") || urlParams.get("site");

    const hostname = (dominioParam || window.location.hostname)
        .toLowerCase()
        .replace(/^www\./, "");

    const site = sites[hostname] || sites["fallback"];

    if (React.isValidElement(site)) {
        return site;
    }

    if (typeof site === "function") {
        const Componente = site;
        return <Componente />;
    }

    return site;
};

export default getSiteAtual;
