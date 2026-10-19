import { Header } from "../../componentes/layout/Header";
import { Footer } from "../../componentes/layout/Footer";
import {
    RevealObserver,
    ScrollTop,
} from "../../componentes/RevealObserver.jsx";
import { Outlet } from "react-router-dom";

export const WebInexusSite = () => {
    return (
        <div className='min-h-svh flex flex-col justify-between bg-preto-escuro text-white'>
            <ScrollTop />
            <RevealObserver />
            <Header
                logo='/logo.png'
                altLogo='Web iNexus'
                configCTA={{
                    textoCTA: "Fale conosco",
                    urlCTA: "https://wa.me/5598988740103",
                }}
                links={{
                    "Página Inicial": "/",
                    "Serviços": "/servicos",
                    "Quem Somos": "/quem-somos",
                    "Nossos Trabalhos": "/portfolio",
                    "Contato": "/contato",
                }}
            />
            <main className='flex-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

