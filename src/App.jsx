import { RouterProvider } from "react-router-dom";
import { ProjetosProvider } from "./contexts/ProjetosContext.jsx";
import { rotasUjhessie } from "./sites/ujhessie/routes.jsx";
import { rotasWebInexus } from "./sites/webinexus/routes.jsx";
// import { rotasAdmin_local } from "./sites/admin_local/routes.jsx";

const rotas = {
    "ujhessie.vercel.app": rotasUjhessie,
    "webinexus.vercel.app": rotasWebInexus,
    localhost: rotasWebInexus,   
    // localhost: rotasUjhessie,
    // localhost: rotasAdmin_local,
};

export const App = () => {
    const router = rotas[window.location.hostname]
        ? rotas[window.location.hostname]
        : rotas.localhost;
    return (
        <ProjetosProvider>
            <RouterProvider router={router} />{" "}
        </ProjetosProvider>
    );
};

export default App;
