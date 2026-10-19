import { Outlet } from "react-router-dom";
import { Header } from "../../componentes/layout/Header";
import {
    RevealObserver,
    ScrollTop,
} from "../../componentes/RevealObserver.jsx";

const linksHeader = {
    Início: "#inicio",
    "Quem eu sou": "#sobre-mim",
    "Meus trabalhos": "#trabalhos",
    Contatos: "#contato",
};

const configCTA = {
    textoCTA: "FALE COMIGO",
    urlCTA: "https://wa.me/5500000000000",
};

export const UjhessieSite = () => {
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
