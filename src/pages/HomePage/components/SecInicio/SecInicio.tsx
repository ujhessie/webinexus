import { MaxWidthContainer } from "../../../../components/MaxWidthContainer/MaxWidthContainer";
// import { Botao } from "../../../../components/Botao/Botao";
import { MdArrowOutward } from "react-icons/md";
// import { BgImages } from "./components/BgImages";

import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { SubTitleTop } from '../../../../components/SubTitleTop/SubTitleTop';

export const SecInicio = () => {
    useEffect(() => {
        const sr = ScrollReveal();

        sr.reveal(".reveal", {
            origin: "bottom", // A direção de onde o elemento vem
            distance: "20px", // A distância que o elemento vai se mover
            duration: 2000, // Duração da animação em milissegundos
            reset: false, // Se deve resetar a animação quando sair de tela
        });
    }, []);

    
    return (
        <section className='py-32 reveal '>
            <MaxWidthContainer className='  text-center flex flex-col gap-2'>
                <div className='flex justify-center'>
                    <SubTitleTop title='Precisa aumentar sua visibilidade?' />
                </div>
                <h1 className=' text-branco-claro lg:w-[90%] mx-auto mb-4'>
                    Vamos desenvolver um <span>site incrível</span> para o seu
                    negócio.
                </h1>

                <p className='text-branco-claro  lg:w-[60%] mx-auto text-[16px] md:text-[17px] lg:text-[18px] font opacity-80'>
                    Hoje, um site profissional é essencial. Oferecemos criação
                    de sites WordPress sob medida, com design responsivo, SEO
                    integrado e fácil gerenciamento. Vamos construir uma
                    presença digital que traga resultados reais para o seu
                    negócio!
                </p>
                <div className='botoes  flex justify-center py-4 gap-4'>
                    <a
                        href='#sec-projetos'
                        className='font-corpo text-branco-claro bg-roxo-pricipal py-4 px-10 rounded-md flex gap-1 items-center hover:brightness-125 my-transition'
                    >
                        <p>Ver portfólio</p>
                        <MdArrowOutward className='text-[25px]' />
                    </a>
                </div>
            </MaxWidthContainer>
        </section>
    );
};
