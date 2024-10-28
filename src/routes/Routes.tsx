import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, ProjetoPage, ProjetosPage } from "../pages";


export const MyRoutes = () => {
    return (
        <>
            {/* <HomePage /> */}
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/projetos' element={<ProjetosPage />} />
                    <Route path='/projetos/:projeto' element={<ProjetoPage />} />
                </Routes>
            </Router>
        </>
    );
};
