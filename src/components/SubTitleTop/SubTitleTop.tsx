export const SubTitleTop = ({ title }: { title: string }) => {
    return (
        <div className='border  px-4 py-2 rounded-full text-cinza font-corpo text-lg border-roxo-pricipal flex w-auto  items-center gap-2 justify-center'>
            <div className='circle bg-gradient-principal p-2.5 rounded-full'></div>
            <p className='m-0'>{title}</p>
        </div>
    );
};
