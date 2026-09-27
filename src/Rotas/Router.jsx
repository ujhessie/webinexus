import { createBrowserRouter } from "react-router-dom";
import WebiNexusSite from "../sites/WebiNexusSite";
import UjhessieSite from "../sites/UjhessieSite";

const rotasWebinexus = createBrowserRouter([
    {
        path: "/",
        element: <WebiNexusSite />,
    },
]);

const rotasUjhessie = createBrowserRouter([
    {
        path: "/",
        element: <UjhessieSite />,
    },
]);

export const buscarSiteAtual = () => {
    const hostname = window.location.hostname;
    console.log(`Dominio: ${hostname}.`);

    if (hostname == "webinexus.vercel.app") {
        return rotasWebinexus;
    }

    if (hostname == "ujhessie.vercel.app") {
        return rotasUjhessie;
    }

    return rotasUjhessie;
};
