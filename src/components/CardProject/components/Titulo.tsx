export const Titulo: React.FC<{ titulo: string | undefined }> = ({
    titulo,
}) => {
    return (
        <div>
            <p className='titulo-card-projeto  my-transition opacity-80  text-white leading-tight lett  text-[16px] md:text-[18px] lg:text-[20px] font-semibold'>
                {titulo}
            </p>
        </div>
    );
};