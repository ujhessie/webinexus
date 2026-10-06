import { createBrowserRouter } from "react-router-dom";
import { Admin_local } from "./index";

export const rotasAdmin_local = createBrowserRouter([
    {
        path: "/",
        element: <Admin_local />,
    },
]);
