// import Tags from "../../Tags/Tags";

export const Tecnologias: React.FC<{ tecnologias: string[] | undefined }> = ({
    tecnologias,
}) => {
    return (
        <div className='flex gap-1 flex-wrap'>
            {tecnologias
                ? tecnologias?.map((tecnologia) => (
                      <p
                          key={tecnologia}
                          className={`px-[8px] py-[4px] text-[10px] 
                            
                            md:px-[8px] md:py-[4px]

                            lg:px-[16px] lg:py-[4px]
                            
                            md:text-[12px] lg:text-[12px] 
                            
                            text-white  border inline-block rounded-full opacity-60 `}
                      >
                          {tecnologia}
                      </p>
                  ))
                : null}
        </div>
    );
};
