import { Header } from "../../components/Header/Header";
import {
    SecDestaquesEspeciais,
    SecInicio,
    SecProjetos,
} from "./components/intdex";

import "./homePage.css";

export const HomePage = () => {
    return (
        <>
            <Header />
            <SecInicio />
            <SecDestaquesEspeciais />
            <SecProjetos />
        </>
    );
};
