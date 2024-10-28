export const Banner: React.FC<{ banner: string | undefined }> = ({
    banner,
}) => {
    return (
        <div className='banner  relative overflow-hidden aspect-[4/3] md:aspect-[21/9] lg:aspect-[4/1]'>
            <img
                className='absolute object-cover h-full w-full'
                src={banner || "/images/banner.png"}
                alt={banner ? "Banner do projeto" : "Banner de projetos"}
            />
        </div>
    );
};
