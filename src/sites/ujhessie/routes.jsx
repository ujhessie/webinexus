import { createBrowserRouter } from "react-router-dom";
import { UjhessieSite } from "./index";
import { HomePage } from "./pages/HomePage/HomePage";
import { PaginaProjeto } from "../../componentes/layout/PaginaProjeto/PaginaProjeto";

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
                path: "*",
                element: <h3>Página 404 (Em desenvolvimento)</h3>,
            },
        ],
    },
]);
