import { createBrowserRouter } from "react-router-dom";
import { WebInexusSite } from "./index";
import { HomePage } from "./pages/HomePage";
import { PortfolioPage } from "./pages/PortfolioPage/PortfolioPage";

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
                element: <h3>Rota quem somos (Em desenvolvimento )</h3>,
            },
             {
                path: "/portfolio",
                element: <PortfolioPage/>,
            },
            {
                path: "*",
                element: <h3>Página 404 (Em desenvolvimento)</h3>,
            },
        ],
    },
]);
