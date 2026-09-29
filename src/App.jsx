import { RouterProvider } from "react-router-dom";
import { rotasUjhessie } from "./sites/ujhessie/routes.jsx";

// import { rotasWebinexus } from "./sites/webinexus/routes.jsx";

const rotas = {
    "ujhessie.vercel.app": rotasUjhessie,
    localhost: rotasUjhessie,

    // "webinexus.vercel.app": rotasWebinexus,
};

export const App = () => {
    const router = rotas[window.location.hostname];

    return <RouterProvider router={router} />;
};

export default App;
