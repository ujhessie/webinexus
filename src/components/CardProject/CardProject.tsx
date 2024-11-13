import "./style.css";
// import { Desc, ImgCapa, Tecnologias, Titulo } from "./components";
import { useProjetos } from "../../contexts/ProjetosContexts";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

const CardProject = ({ id, ClassName }: { id: number; ClassName?: string }) => {
    const { projetos } = useProjetos();

    // Buscar o projeto pelo ID
    const projeto = projetos.find((project) => project.id === id);

    // Renderizar o card apenas se o projeto existir
    if (!projeto) return null;

    return (
        <Link
            to={`projetos/${projeto.id}`}
            className={`reveal card-projeto relative flex h-full flex-col justify-end cursor-pointer z-0 mb-4 w-full overflow-hidden bg-red-400 aspect-[4/3] rounded-xl p-4 ${ClassName}`}
        >
            <div className='div-img bg-blue-300 absolute left-0 top-0 w-full h-full'>
                <img
                    src={projeto.imagens?.imgCapa}
                    className='absolute imagem-capa my-transition top-0 left-0 object-cover w-full h-full'
                    alt=''
                />
            </div>

            <div className='z-30 bg-black/85 rounded-xl p-4 flex justify-between items-center'>
                <p className='text-white text-lg'>{projeto.titulo}</p>
                <MdArrowOutward className='text-[40px] text-white' />
            </div>
        </Link>
    );
};

export default CardProject;

{
    /* <div className='content bg-cinza/50 rounded-xl p-4 pb-5    overflow-hidden w-full flex flex-col gap-4'>
    <ImgCapa url={projeto.imagens?.imgCapa} status={projeto.status} />
    <Titulo titulo={projeto.titulo} />
    <Tecnologias tecnologias={projeto.tecnologias} />
    <Desc desc={projeto.desc} />
    <VerMais />
</div>; */
}
