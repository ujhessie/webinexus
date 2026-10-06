import { Outlet } from "react-router-dom";
import { Header } from "../../componentes/layout/Header";

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
        <div className="min-h-screen bg-[#06010d] text-white">
            <Header
                logo="/ujhessie-logo.svg"
                links={linksHeader}
                configCTA={configCTA}
            />
            <Outlet />
        </div>
    );
};
