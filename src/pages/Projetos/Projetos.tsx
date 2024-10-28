import { Header } from '../../components/Header/Header';
import { MaxWidthContainer } from '../../components/MaxWidthContainer/MaxWidthContainer';
import { Projetos } from './../../components/Projetos/Projetos';

export const ProjetosPage = () => {
    return (<MaxWidthContainer><Header/><div className="div-projetos"><Projetos/></div></MaxWidthContainer>);
}