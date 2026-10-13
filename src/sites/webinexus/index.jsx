import { Header } from "../../componentes/layout/Header";
import { Footer } from "../../componentes/layout/Footer";
import { SmoothScroll } from "../../componentes/layout/SmoothScroll";
import { Outlet } from "react-router-dom";

export const WebInexusSite = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between bg-preto-escuro text-white'>
            <SmoothScroll />
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

