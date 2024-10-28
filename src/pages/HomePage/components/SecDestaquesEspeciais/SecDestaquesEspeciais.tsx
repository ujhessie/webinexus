import { useEffect } from "react";
import { MaxWidthContainer } from "./../../../../components/MaxWidthContainer/MaxWidthContainer";
import ScrollReveal from "scrollreveal";
import "./secDestaquesEspeciais.css";

export const SecDestaquesEspeciais = () => {

    useEffect(() => {
        const sr = ScrollReveal();

        sr.reveal(".reveal", {
            origin: "bottom", // A direção de onde o elemento vem
            distance: "20px", // A distância que o elemento vai se mover
            duration: 2000, // Duração da animação em milissegundos
            reset: false, // Se deve resetar a animação quando sair de tela
        });
    }, []);

    const CardDestaque = ({
        titulo,
        texto,
        urlImg,
    }: {
        titulo: string;
        texto: string;
        urlImg: string;
    }) => {

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
            <div className='reveal CardDestaque text-white md:flex flex-col justify-start items-start  border bg-cinza/10  border-zinc-800/80 rounded-lg p-8 backdrop-blur-md shadow-lg grid grid-cols-5 gap-4  my-transition hover:cursor-pointer'>

                <div className='bg-cinza/10 p-2 border border-cinza/20 rounded-md mb-4 col-span-1 aspect-square'>
                    <img className='w-20' src={urlImg} alt='' />
                </div>

                <div className='col-span-4'>
                    <h3 className='mb-2'>{titulo}</h3>
                    <p>{texto}</p>
                </div>

            </div>
        );
    };

    return (
        <section className='sec-destaques-especiais pb-24 reveal'>
            <MaxWidthContainer className='content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4'>
                <CardDestaque
                    titulo='Qualidade e personalização'
                    texto='Oferecemos soluções personalizadas para a maior qualidade do seu site.'
                    urlImg='/images/icons/medal-dynamic-gradient.png'
                />
                <CardDestaque
                    titulo='Ótimo desempenho'
                    texto='Otimizamos também o SEO do site, ajudando você a ser encontrado nos mecanismos de buscas'
                    urlImg='/images/icons/rocket-dynamic-gradient.png'
                />
                <CardDestaque
                    titulo='Ótimo Custo Benefício'
                    texto='Sites por um preço acessível e um ótima qualidade'
                    urlImg='/images/icons/wallet-dynamic-gradient.png'
                />
                <CardDestaque
                    titulo='Suporte gratuito'
                    texto='No pacote inicial oferecemos um suporte gratuito de 7 dias.'
                    urlImg='/images/icons/headphone-dynamic-gradient.png'
                />
            </MaxWidthContainer>
        </section>
    );
};
