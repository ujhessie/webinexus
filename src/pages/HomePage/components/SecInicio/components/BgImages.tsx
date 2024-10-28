import { useMemo } from "react";
import { useProjetos } from "../../../../../contexts/ProjetosContexts";

export const BgImages = () => {
    const { projetos } = useProjetos();

    // Função para embaralhar um array
    const shuffleArray = (array: string[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    // Mapeia e filtra para garantir que todas as imagens sejam strings válidas e já aplica o shuffle
    const images: string[] = useMemo(() => {
        return projetos
            .map((projeto) => projeto.imagens.imgCapa)
            .filter((img): img is string => img !== undefined);
    }, [projetos]);

    // Função para gerar uma linha de imagens embaralhadas
    const renderImageRow = (className: string) => {
        const shuffledImages = shuffleArray([...images]); // Gera uma nova ordem aleatória para cada linha
        return (
            <div
                className={`row-image ${className} flex justify-center w-full h-1/3 gap-2`}
            >
                {shuffledImages.map((image, index) => (
                    <img
                        key={`${className}-${index}`}
                        className='block h-full'
                        src={image}
                        alt={`Imagem ${index + 1}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className='div-imgs h-full absolute left-1/2 w-[100vw] -translate-x-1/2 flex flex-col gap-2 overflow-hidden -z-20'>
            {renderImageRow("left")}
            {renderImageRow("right")}
            {renderImageRow("left-2")}
        </div>
    );
};
