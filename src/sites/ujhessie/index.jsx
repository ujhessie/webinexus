import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../../componentes/layout/Header";
import {
    RevealObserver,
    ScrollTop,
} from "../../componentes/RevealObserver.jsx";

const linksHeader = {
    Início: "/#inicio",
    "Quem eu sou": "/#sobre-mim",
    "Meus trabalhos": "/portfolio",
    Contatos: "/#contato",
};

const configCTA = {
    textoCTA: "FALE COMIGO",
    urlCTA: "https://wa.me/5500000000000",
};

export const UjhessieSite = () => {
    const { pathname, hash } = useLocation();

    // Menu usa âncoras da Home (/#sobre-mim) — rola até a seção em qualquer página
    useEffect(() => {
        if (!hash) return;
        document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({ behavior: "smooth" });
    }, [pathname, hash]);

    return (
        <div className="min-h-svh bg-[#06010d] text-white">
            <ScrollTop />
            <RevealObserver />
            <Header
                logo="/ujhessie-logo.svg"
                altLogo="Ujhessie"
                links={linksHeader}
                configCTA={configCTA}
            />
            <Outlet />
        </div>
    );
};
