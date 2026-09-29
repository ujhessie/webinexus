import { RouterProvider } from "react-router-dom";

import { rotasUjhessie } from "./sites/ujhessie/routes.jsx";

const rotasAtual = () => {
    const hostname = window.location.hostname;

    console.log(`Domínio: ${hostname}`);

    if (hostname === "ujhessie.vercel.app") {
        console.log("Rotas ujhessie carregadas");
        return rotasUjhessie;
    }

    return rotasUjhessie;
};

export const App = () => {
    return <RouterProvider router={rotasAtual()} />;
};

export default App;
