import { MdArrowOutward } from "react-icons/md";
import { MaxWidthContainer } from "../../../../components/MaxWidthContainer/MaxWidthContainer";
// import { Botao } from "./../../../../components/Botao/Botao";
import CardProject from "./../../../../components/CardProject/CardProject";
import { Link } from "react-router-dom";

export const SecProjetos = () => {
    return (
        <MaxWidthContainer id='sec-projetos'>
            <section className='mb-8'>
                <HeaderSectionProjetos />
                <DivCards />

                <div className='div-botoes-secprojetos md:hidden my-5'>
                    <Link
                        className='font-corpo text-branco-claro bg-roxo-pricipal py-4 px-10 rounded-md flex gap-1 items-center hover:brightness-125 my-transition'
                        // tipo='padrao'
                        to='/projetos'
                    >
                        <p>Ver portfólio</p>
                        <MdArrowOutward className='text-[25px]' />
                    </Link>
                </div>
            </section>
        </MaxWidthContainer>
    );
};

const HeaderSectionProjetos = () => {
    return (
        <div className='div-header-prjetos md:flex justify-between items-center mb-4 '>
            <div>
                <h2 className='text-branco-claro m-0'>
                    Conheça alguns de <span>nossos trabalhos</span>
                </h2>
            </div>
            <div>
                <Link
                    to='/projetos'
                    className='font-corpo text-branco-claro bg-transparent border-2 border-roxo-pricipal py-4 px-10 rounded-md  gap-1 items-center hover:brightness-125 my-transition hidden md:flex uppercase hover:bg-gradient-principal my-transition '
                >
                    <p>Portfólio completo</p>
                    <MdArrowOutward className='text-[25px]' />
                </Link>
            </div>
        </div>
    );
};

const DivCards = () => {
    return (
        <div className='div-projetos grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CardProject id={2} />
            <CardProject id={1} />
            <CardProject id={10} />
            <CardProject ClassName='hidden md:flex' id={18} />
            <CardProject ClassName='hidden lg:flex' id={4} />
            <CardProject ClassName='hidden lg:flex' id={13} />
        </div>
    );
};
