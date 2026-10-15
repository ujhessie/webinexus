import { Header } from "../../componentes/layout/Header";
import { Footer } from "../../componentes/layout/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const WebInexusSite = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className='min-h-screen flex flex-col justify-between bg-preto-escuro text-white'>
            <Header
                logo='/logo.png'
                configCTA={{ textoCTA: "Fale conosco", urlCTA: "#" }}
                links={{
                    "Página Inicial": "/",
                    "Quem Somos": "/quem-somos",
                    "Nossos Trabalhos": "/portfolio",
                }}
            />
            <main className='flex-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

