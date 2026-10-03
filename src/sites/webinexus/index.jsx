import { Header } from "../../componentes/layout/Header";
import { Outlet } from "react-router-dom";

export const WebInexusSite = () => {
    return <HomePage />;
};

const HomePage = () => {
    return (
        <>
            <Header
                logo='/logo.png'
                configCTA={{ textoCTA: "Fale conosco", urlCTA: "#" }}
                links={{
                    "Página Inicial": "/",
                    "Quem Somos": "/quem-somos",
                }}
            />
            <Outlet />
        </>
    );
};
