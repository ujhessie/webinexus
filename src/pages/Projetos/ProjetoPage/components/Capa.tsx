export const Capa: React.FC<{ capa: string; status?: string }> = ({
    capa,
    status,
}) => {
    return (
        <div
            className={`capa  md:block overflow-hidden relative aspect-[4/3] rounded-md `}
        >
            {status == "Em desenvolvimento" ? (
                <p className='text-white z-10 absolute right-2 bottom-2 py-1 px-4 text-[12px] bg-cinza font-bold rounded-full'>
                    Projeto em desenvolvimento
                </p>
            ) : null}
            <img
                src={capa}
                className='absolute  object-cover h-full w-full z-0'
                alt='Imagem de Capa'
            />
        </div>
    );
};
