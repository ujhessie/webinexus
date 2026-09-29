import { createBrowserRouter } from "react-router-dom";
import { UjhessieSite } from "./index";

export const rotasUjhessie = createBrowserRouter([
    {
        path: "/",
        element: <UjhessieSite />,
    },
]);
