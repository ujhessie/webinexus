import { MdArrowOutward } from "react-icons/md";
import { MaxWidthContainer } from "../../../../components/MaxWidthContainer/MaxWidthContainer";
import { Botao } from "./../../../../components/Botao/Botao";
import CardProject from "./../../../../components/CardProject/CardProject";

// Alteração no import de Swiper e SwiperSlide
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Grid, Pagination } from "swiper/modules";

export const SecProjetos = () => {
    return (
        <MaxWidthContainer id='sec-projetos'>
            <section>
                <div className='div-header-prjetos md:flex justify-between items-center mb-4'>
                    <div>
                        <h2 className='text-branco-claro m-0'>
                            Conheça alguns de <span>nossos trabalhos</span>
                        </h2>
                    </div>
                    <div>
                        <Botao
                            tipo='padrao'
                            className='font-corpo text-branco-claro bg-transparent border-2 border-roxo-pricipal py-4 px-10 rounded-md  gap-1 items-center hover:brightness-125 my-transition hidden md:flex'
                        >
                            <p>Portfólio completo</p>
                            <MdArrowOutward className='text-[25px]' />
                        </Botao>
                    </div>
                </div>
                {/* <div className='div-projetos grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <CardProject id={2} />
                    <CardProject id={1} />
                    <CardProject id={10} />
                    <CardProject ClassName='hidden md:flex' id={18} />
                    <CardProject ClassName='hidden lg:flex' id={4} />
                    <CardProject ClassName='hidden lg:flex' id={13} />
                </div> */}

                {/* Swiper para a versão React */}
                <Swiper
                    slidesPerView={3} // Mostra 3 slides por linha
                    grid={{
                        rows: 2, // Define duas linhas
                    }}
                    spaceBetween={30} // Espaço entre os slides
                    pagination={{
                        clickable: true, // Habilita a paginação
                    }}
                    modules={[Grid, Pagination]} // Certifique-se de adicionar os módulos corretamente
                    className='mySwiper'
                >
                    <SwiperSlide>
                        <CardProject id={2} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardProject id={1} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardProject id={10} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardProject id={18} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardProject id={4} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardProject id={13} />
                    </SwiperSlide>
                </Swiper>

                <div className='div-botoes-secprojetos md:hidden'>
                    <Botao
                        className='font-corpo text-branco-claro bg-roxo-pricipal py-4 px-10 rounded-md flex gap-1 items-center hover:brightness-125 my-transition'
                        tipo='padrao'
                    >
                        <p>Ver portfólio</p>
                        <MdArrowOutward className='text-[25px]' />
                    </Botao>
                </div>
            </section>
        </MaxWidthContainer>
    );
};
