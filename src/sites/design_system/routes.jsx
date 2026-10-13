import { createBrowserRouter } from "react-router-dom";
import { DesignSystemSite } from "./index";

export const rotasDesignSystem = createBrowserRouter([
    {
        path: "/",
        element: <DesignSystemSite />,
    },
    {
        path: "*",
        element: <DesignSystemSite />,
    },
]);

