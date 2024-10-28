import { MaxWidthContainer } from "../../../components/MaxWidthContainer/MaxWidthContainer";
import { useProjetos } from "../../../contexts/ProjetosContexts";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import { Capa, Informacoes } from "./components";
import { Header } from '../../../components/Header/Header';

export const ProjetoPage = () => {
    const { projeto: projetoId } = useParams<{ projeto: string }>();
    const navigate = useNavigate();
    const { projetos } = useProjetos();
    const projeto = projetos.find(
        (projeto) => projeto.id === Number(projetoId)
    );

    // Checa se o projeto foi encontrado
    if (!projeto) {
        return (
            <div className='text-center p-8'>
                <h2>Projeto não encontrado</h2>
                <button
                    onClick={() => navigate(-1)}
                    className='mt-4 px-4 py-2 bg-gray-700 text-white rounded'
                >
                    Voltar
                </button>
            </div>
        );
    }

    // Define imgsProjeto como um array vazio se for undefined
    const imgsProjeto = projeto.imagens.imgsProjeto || [];

    return (
        <main>
            <Header/>
            <MaxWidthContainer>
                <section className='content py-4 relative rounded-2xl shadow-sm text-center md:text-start flex flex-col-reverse md:grid md:grid-cols-5 gap-4 mb-2 text-white cursor-pointer'>
                    <div className='col-span-3'>
                        <Capa
                            status={projeto.status}
                            capa={projeto.imagens.imgCapa || ""}
                        />
                        <div className='my-4 flex flex-wrap gap-2'>
                            {imgsProjeto.map((imagem, index) => (
                                <img
                                    key={index}
                                    src={imagem}
                                    alt={`Imagem do projeto ${index}`}
                                    className='max-w-full w-full rounded-md shadow-md'
                                />
                            ))}
                        </div>
                    </div>

                    <div className='col-span-2 '>
                        <Informacoes
                            titulo={projeto.titulo || ""}
                            descricao={projeto.desc || ""}
                            linkVisitar={projeto.links.linkVisitarProjeto}
                            linkDeploy={projeto.links.linkDeploy}
                        />
                    </div>
                </section>
            </MaxWidthContainer>
        </main>
    );
};
