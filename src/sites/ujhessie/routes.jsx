import { createBrowserRouter } from "react-router-dom";
import { UjhessieSite } from "./index";
import { HomePage } from "./pages/HomePage/HomePage";
import { PaginaProjeto } from "../../componentes/layout/PaginaProjeto/PaginaProjeto";
import { DesignSystemSite } from "../design_system/index";

export const rotasUjhessie = createBrowserRouter([
    {
        path: "/",
        element: <UjhessieSite />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/projetos/:id",
                element: <PaginaProjeto basePath="/" />,
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
