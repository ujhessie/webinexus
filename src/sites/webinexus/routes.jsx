import { createBrowserRouter } from "react-router-dom";
import { WebInexusSite } from "./index";
import { HomePage } from "./pages/HomePage/HomePage";
import { QuemSomosPage } from "./pages/QuemSomosPage";
import { PortfolioPage } from "./pages/PortfolioPage/PortfolioPage";
import { PaginaProjeto } from "../../componentes/layout/PaginaProjeto/PaginaProjeto";
import { DesignSystemSite } from "../design_system/index";

export const rotasWebInexus = createBrowserRouter([
    {
        path: "/",
        element: <WebInexusSite />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/quem-somos",
                element: <QuemSomosPage />,
            },
            {
                path: "/portfolio",
                element: <PortfolioPage />,
            },
            {
                path: "/projetos/:id",
                element: <PaginaProjeto basePath='/portfolio' />,
            },
            {
                path: "/design-system",
                element: <DesignSystemSite />,
            },
            {
                path: "*",
                element: <h3>Página 404 (Em desenvolvimento)</h3>,
            },
        ],
    },
]);
