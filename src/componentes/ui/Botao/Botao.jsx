export const Botao = ({texto}) => {
    return (
        <div
            className={`group relative inline-flex items-center justify-between gap-4 px-6 py-4 bg-white rounded-full text-[#7B1FE1] font-titulo font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:bg-slate-50 no-underline cursor-pointer `}
        >
            <span>{texto}</span>
        </div>
    );
};
